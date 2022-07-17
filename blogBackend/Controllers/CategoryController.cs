using blogBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogBackend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private DBContext dBContext;
        public CategoryController() 
        {
            this.dBContext = new DBContext();
        }

        
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<object> Get()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return (
                    from category in this.dBContext.Categories
                    let count = 
                    (
                        from post in this.dBContext.Posts
                        where post.Category == category.NameOfCategory
                        select 1
                    ).Count()
                    where !category.NameOfCategory.Equals("Private") && !category.NameOfCategory.Equals("Projects")
                    orderby category.NameOfCategory ascending
                    select new
                    {
                        nameOfCategory = category.NameOfCategory,
                        count = count
                    }
                );
            }
            else 
            {
                return (
                    from category in this.dBContext.Categories
                    let count =
                    (
                        from post in this.dBContext.Posts
                        where post.Category == category.NameOfCategory
                        select 1
                    ).Count()
                    orderby category.NameOfCategory ascending
                    select new
                    {
                        nameOfCategory = category.NameOfCategory,
                        count = count
                    }
                );
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpPost]
        public ActionResult Post([FromBody] string nameOfCategory)
        {
            try
            {
                Category category = new Category();
                category.NameOfCategory = nameOfCategory;

                this.dBContext.Categories.Add(category);
                this.dBContext.SaveChanges();
                return Ok(category);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException?.Message ?? error.Message);
            }
        }

        /* Arreglar
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }*/
        

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [HttpDelete("{categoryName}")]
        public ActionResult Delete(string categoryName)
        {
            var category = this.dBContext.Categories.Where(c => c.NameOfCategory.Equals(categoryName)).FirstOrDefault();

            if (category == null)
                return BadRequest("Category not found...");

            if(category.NameOfCategory.Equals("Private") || category.NameOfCategory.Equals("Projects"))
                return BadRequest($"{category.NameOfCategory} must does not be deleted!");

            this.dBContext.Categories.Remove(category);
            this.dBContext.SaveChanges();
            return Ok(category);
        }
    }
}
