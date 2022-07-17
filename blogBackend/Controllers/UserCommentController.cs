
using blogBackend.Models;
using blogBackend.Parameters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCommentController : ControllerBase
    {
        private DBContext dBContext;
        public UserCommentController() 
        {
            this.dBContext = new DBContext();
        }

        
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpGet]
        public IEnumerable<object> Get([FromQuery] PagingParameter pagingParameter, 
            [FromQuery] UserCommentSearchParameters userCommentSearchParameters)
        {
            var userComments = 
            (
                from uC in this.dBContext.UserComments
                join p in this.dBContext.Posts
                on uC.PostId equals p.Id
                where (userCommentSearchParameters.Nick == null || uC.Nick.Contains(userCommentSearchParameters.Nick)) &&
                    (userCommentSearchParameters.Email == null || uC.Email.Contains(userCommentSearchParameters.Email)) &&
                    (userCommentSearchParameters.Content == null || uC.Content.Contains(userCommentSearchParameters.Content))
                orderby uC.CommentDate descending
                select new 
                {
                    Id = uC.Id,
                    PostId = uC.PostId,
                    PostTitle = p.Title,
                    Email = uC.Email,
                    NotifyReply = uC.NotifyReply,
                    Nick = uC.Nick,
                    Content = uC.Content,
                    CommentDate = uC.CommentDate,
                    Country = uC.Country,
                }
            ).ToList();

            int currentPage = pagingParameter.pageNumber;
            int pageSize = pagingParameter.pageSize;
            int count = userComments.Count;

            int totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var userCommentsToReturn = userComments.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
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

            return userCommentsToReturn;
        }

        //Mandar reply a parent por email
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Post([FromBody] UserCommentDtoForPostAction userComment)
        {   
            UserComment u = new UserComment();
            u.ParentId = userComment.ParentId;
            u.PostId = userComment.PostId;
            u.Nick = userComment.Nick;
            u.Content = userComment.Content;
            DateTime turkeyActualDateTime = System.TimeZoneInfo.ConvertTimeFromUtc(
                DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
            u.CommentDate = turkeyActualDateTime;
            u.Country = userComment.Country;
            u.NotifyReply = userComment.NotifyReply;
            u.Email = userComment.Email;
            
            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(u.Email))
                return BadRequest("Invalid email...");

            try
            {
                this.dBContext.UserComments.Add(u);
                this.dBContext.SaveChanges();

                if(u.ParentId != null) 
                {
                    var parent = (from p in this.dBContext.UserComments where p.Id == u.ParentId select p).FirstOrDefault();
                    if(parent != null) 
                    {
                        if(parent.NotifyReply == 1) 
                        {
                            Post post = (from p in this.dBContext.Posts where p.Id == u.PostId select p).FirstOrDefault();
                            parent.sendReplyNotification(u, post);
                        }
                    }
                }

                return Ok(u);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpPut]
        public ActionResult Put([FromBody] UserCommentDtoForPutAction userComment)
        {
            var u = this.dBContext.UserComments.Where(u => u.Id.Equals(userComment.Id)).FirstOrDefault();

            if (u == null)
                return BadRequest("User comment not found...");

            u.Nick = userComment.Nick;
            u.Content = userComment.Content;
            u.NotifyReply = userComment.NotifyReply;
            u.Email = userComment.Email;

            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(u.Email))
                return BadRequest("Invalid email...");

            try
            {
                this.dBContext.SaveChanges();
                return Ok(u);
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
            var userComment = dBContext.UserComments.Where(c => c.Id.Equals(id)).FirstOrDefault();
            if (userComment == null)
                return BadRequest("Comment not exists...");

            dBContext.Remove(userComment);
            dBContext.SaveChanges();
            return Ok();
        }
    }
}
