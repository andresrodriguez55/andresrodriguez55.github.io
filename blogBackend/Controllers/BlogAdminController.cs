using blogBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace blogBackend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class BlogAdminController : ControllerBase
    {
        private DBContext dBContext;
        public BlogAdminController()
        {
            this.dBContext = new DBContext();
        }

   
        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] BlogAdmin blogAdmin)
        {
            var user = this.dBContext.BlogAdmins.Where(a =>
                a.AdminPassword.Equals(blogAdmin.AdminPassword) && 
                a.AdminUsername.Equals(blogAdmin.AdminUsername)).FirstOrDefault();

            if (user == null) 
                return Unauthorized();

            var token = GenerateKey(blogAdmin);
            return Ok(token);
        }

        private string GenerateKey(BlogAdmin blogAdmin) 
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, blogAdmin.AdminUsername),
                new Claim(ClaimTypes.Role, "Administrator"),
            };

            var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddHours(3), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
