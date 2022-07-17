using blogBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace blogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private DBContext dBContext;
        public StatisticsController()
        {
            this.dBContext = new DBContext();
        }

        
        [HttpGet]
        public object Get()
        {
            var countriesOfComments =
            (
                from c in this.dBContext.UserComments
                group c by c.Country into info
                orderby info.Key ascending
                select new
                {
                    country = info.Key,
                    commentsCount = info.Count()
                }
            );

            var numberOfCommentsPerMonth =
            (
                from c in this.dBContext.UserComments
                let commentsMonth = c.CommentDate.Month
                //let commentsYear = c.CommentDate.Year
                group c by new { commentsMonth = commentsMonth} into info  //, commentsYear = commentsYear 
                orderby info.Key.commentsMonth ascending//, info.Key.commentsYear
                select new
                {
                    commentsMonth = info.Key.commentsMonth,
                    //commentsYear = info.Key.commentsYear,
                    commentsCount = info.Count()
                }
            );

            var topCommentersNicks =
            (
                from c in this.dBContext.UserComments
                group c by c.Nick into info
                orderby info.Count() descending
                select new
                {
                    nick = info.Key,
                    commentsCount = info.Count()
                }
            ).Take(5);

            var topCommentedPosts = 
            (
                from p in this.dBContext.Posts
                let commentsCount = 
                (
                    from c in this.dBContext.UserComments
                    where c.PostId == p.Id
                    select 1
                ).Count()
                where !p.Category.Equals("Private")
                orderby commentsCount descending
                select new 
                {
                    title = p.Title,
                    id = p.Id,
                    commentsCount = commentsCount
                }
            ).Take(5);
                
            var statistics = new
            {
                countriesOfComments = countriesOfComments,
                numberOfCommentsPerMonth = numberOfCommentsPerMonth,
                topCommentersNicks = topCommentersNicks,
                topCommentedPosts = topCommentedPosts,
            };

            return statistics;
        }
    }
}
