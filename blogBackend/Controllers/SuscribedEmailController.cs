using blogBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using blogBackend.Parameters;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace blogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscribedEmailController : ControllerBase
    {
        private DBContext dBContext;
        public SuscribedEmailController()
        {
            this.dBContext = new DBContext();
        }

        
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpGet]
        public IEnumerable<SubscribedEmail> Get([FromQuery] PagingParameter pagingParameter)
        {
            var subscribedEmails = this.dBContext.SubscribedEmails.OrderByDescending(e => e.SubscriptionDate).ToList();

            int currentPage = pagingParameter.pageNumber;
            int pageSize = pagingParameter.pageSize;
            int count = subscribedEmails.Count;

            int totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var subscribedEmailsToReturn = subscribedEmails.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
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

            return subscribedEmails;
        }


        //check spam
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Post([FromBody] SubscribedEmailForPostAction subscription)
        {
            SubscribedEmail subscribedEmail = new SubscribedEmail();

            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(subscription.Email))
                return BadRequest("Invalid email...");

            subscribedEmail.Email = subscription.Email;
            DateTime turkeyActualDateTime = System.TimeZoneInfo.ConvertTimeFromUtc(
                DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time"));
            subscribedEmail.SubscriptionDate = turkeyActualDateTime;

            try
            {
                this.dBContext.SubscribedEmails.Add(subscribedEmail);
                this.dBContext.SaveChanges();
                return Ok(subscribedEmail);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        // debe hacer update
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpPut]
        public ActionResult Put(string e, [FromBody] string email)
        {
            var subscribedEmail = this.dBContext.SubscribedEmails.Where(e => e.Email.Equals(e)).FirstOrDefault();

            if (subscribedEmail == null)
                return BadRequest("Subscription not found...");

            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(email))
                return BadRequest("Invalid email...");

            this.dBContext.SubscribedEmails.Remove(subscribedEmail);
            this.dBContext.SaveChanges();

            try
            {
                subscribedEmail.Email = email;
                this.dBContext.SubscribedEmails.Add(subscribedEmail);
                this.dBContext.SaveChanges();
                return Ok(subscribedEmail);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        [AllowAnonymous]
        [HttpDelete("{email}")]
        public ActionResult Delete(string email)
        {
            var subscribedEmail = this.dBContext.SubscribedEmails.Where(e => e.Email.Equals(email)).FirstOrDefault();

            if (subscribedEmail == null)
                return BadRequest("Subscription not found...");

            this.dBContext.SubscribedEmails.Remove(subscribedEmail);
            this.dBContext.SaveChanges();
            return Ok("Email deleted successfully...");
        }
    }
}
