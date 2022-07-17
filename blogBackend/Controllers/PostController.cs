using blogBackend.Parameters;
using blogBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private DBContext dBContext;
        public PostController() 
        {
            this.dBContext = new DBContext();
        }

        [HttpGet]
        public IEnumerable<object> Get([FromQuery] PostSearchParameters postSearchParameters, 
            [FromQuery] PagingParameter pagingParameter)
        {
            if (!User.Identity.IsAuthenticated)
            {
                var posts = this.dBContext.Posts.Where(p =>
                    (!p.Category.Equals("Private")) &&
                    (   
                        ( postSearchParameters.Category == null && !p.Category.Equals("Projects") ) ||
                        ( postSearchParameters.Category != null && p.Category.Equals(postSearchParameters.Category)) 
                    ) &&
                    ( postSearchParameters.Contains == null || p.Title.Contains(postSearchParameters.Contains) || 
                        p.Content.Contains(postSearchParameters.Contains))).Select(p =>
                        new
                        {
                            Id = p.Id,
                            Title = p.Title,
                            Category = p.Category,
                            CoverPhotoLink = p.CoverPhotoLink,
                            PostDate = p.PostDate,
                        }).OrderByDescending(p => p.PostDate).ToList();

                int currentPage = pagingParameter.pageNumber;
                int pageSize = pagingParameter.pageSize;
                int count = posts.Count;

                int totalPages = (int)Math.Ceiling(count / (double)pageSize);
                var postsToReturn = posts.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
                var previousPage = currentPage > 1 ? "Yes" : "No";
                var nextPage = currentPage < totalPages ? "Yes" : "No";

                var paginationMetaData = new
                {
                    totalCount = count,
                    pageSize = pageSize,
                    currentPage = currentPage,
                    totalPages = totalPages,
                    previousPage,
                    nextPage
                };

                HttpContext.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetaData));
                return postsToReturn;
            }
            else
            {
                var postsWithInfo = (
                    from p in this.dBContext.Posts
                    let commentsCount =
                    (
                      from c in this.dBContext.UserComments
                      where c.PostId == p.Id
                      select 1
                    ).Count()
                    orderby p.PostDate descending
                    where (postSearchParameters.Category == null || p.Category.Equals(postSearchParameters.Category)) &&
                        (postSearchParameters.Contains == null || p.Title.Equals(postSearchParameters.Contains) ||
                        p.Content.Contains(postSearchParameters.Contains))
                    select new
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Category = p.Category,
                        PostDate = p.PostDate,
                        CommentsCount = commentsCount
                    }
                );

                int currentPage = pagingParameter.pageNumber;
                int pageSize = pagingParameter.pageSize;
                int count = postsWithInfo.Count();

                int totalPages = (int)Math.Ceiling(count / (double)pageSize);
                var postsWithInfoToReturn = postsWithInfo.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
                var previousPage = currentPage > 1 ? "Yes" : "No";
                var nextPage = currentPage < totalPages ? "Yes" : "No";

                var paginationMetaData = new
                {
                    totalCount = count,
                    pageSize = pageSize,
                    currentPage = currentPage,
                    totalPages = totalPages,
                    previousPage,
                    nextPage
                };

                HttpContext.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetaData));
                return postsWithInfoToReturn;
            }
        }

        [HttpGet("{id}")]
        public Post Get(int id)
        {
            Post post; 
            if(User.Identity.IsAuthenticated)
                post = this.dBContext.Posts.FirstOrDefault(p => p.Id == id);
            else
                post = this.dBContext.Posts.FirstOrDefault(p => p.Id == id && !p.Category.Equals("Private"));

            if (post == null) 
                return post;

            var disorderedUserComments = 
            (
                from c in this.dBContext.UserComments
                where c.PostId == post.Id
                orderby c.CommentDate ascending
                select c
            ).ToList();

            List<UserComment> userComments = new List<UserComment>(disorderedUserComments.Count);
            foreach(var userComment in disorderedUserComments) 
            {
                userComment.InverseParent.Clear();

                if (userComment.ParentId == null)
                {
                    userComments.Add(userComment);
                }
                else
                {
                    userComment.InverseParent = null;

                    foreach (var parentUserComment in userComments)
                    {
                        if (parentUserComment.Id == userComment.ParentId) 
                        {
                            parentUserComment.InverseParent.Add(userComment);
                            break;
                        }
                        else 
                        {
                            bool stop = false;
                            for(int z=0; z<parentUserComment.InverseParent.Count; z++) 
                            {
                                var childUserComment = parentUserComment.InverseParent.ElementAt(z);
                                if (childUserComment.Id == userComment.ParentId)
                                {
                                    parentUserComment.InverseParent.Add(userComment);
                                    stop = true;
                                    break;
                                }
                            }
                            if (stop)
                                break;
                        }
                    }
                }
            }

            post.UserComments = userComments;
            return post;
        }

        //notify users if category is not equal to private
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpPost]
        public ActionResult Post([FromBody] PostDto p)
        {
            try
            {
                Post post = new Post();
                post.Title = p.Title;
                post.Content = p.Content;
                DateTime turkeyActualDateTime = System.TimeZoneInfo.ConvertTimeFromUtc(
                    p.PostDate, TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
                post.PostDate = p.PostDate;
                post.Category = p.Category;
                post.CoverPhotoLink = p.CoverPhotoLink;

                this.dBContext.Posts.Add(post);
                this.dBContext.SaveChanges();

                if (post.Category.Equals("Private"))
                    return Ok("Posted saved!");

                var subscriptions = (from s in this.dBContext.SubscribedEmails select s).ToList();
                foreach (var subscription in subscriptions) 
                {
                    bool sent = subscription.notify(post).Result;
                    if (!sent)
                        return StatusCode(500);
                }

                return Ok("Posted saved and users are notified!");
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PostDto p)
        {
            var post = this.dBContext.Posts.Where(x => x.Id.Equals(id)).FirstOrDefault();

            if (post == null)
                return BadRequest("Post not found...");

            try
            {
                post.Title = p.Title;
                post.Content = p.Content;
                DateTime turkeyActualDateTime = System.TimeZoneInfo.ConvertTimeFromUtc(
                    p.PostDate, TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
                post.PostDate = p.PostDate;
                post.Category = p.Category;
                post.CoverPhotoLink = p.CoverPhotoLink;

                this.dBContext.SaveChanges();
                return Ok("Posted saved!");
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var post = this.dBContext.Posts.Where(p => p.Id == id).FirstOrDefault();

            if (post == null)
                return BadRequest("Post not found...");

            this.dBContext.Posts.Remove(post);
            this.dBContext.SaveChanges();
            return Ok(post);
        }
    }
}
