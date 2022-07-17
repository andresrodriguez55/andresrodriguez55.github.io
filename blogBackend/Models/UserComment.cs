
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Net;
using System.Net.Mail;


namespace blogBackend.Models
{
    public partial class UserComment
    {
        public UserComment()
        {
            InverseParent = new List<UserComment>();
        }

        public int? ParentId { get; set; }
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Nick { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CommentDate { get; set; }

      
        public string? Country { get; set; }

        [JsonIgnore]
        public string Email { get; set; } = null!;

        [JsonIgnore]
        public short? NotifyReply { get; set; }

        [JsonIgnore]
        public virtual UserComment? Parent { get; set; }

        [JsonIgnore]
        public virtual Post Post { get; set; } = null!;

        public virtual List<UserComment> InverseParent { get; set; }
        
        public void sendReplyNotification(UserComment reply, Post post)
        {
            string email = Environment.GetEnvironmentVariable("EMAIL");
            string password = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");

            ICredentialsByHost credentials = new NetworkCredential(email, password);

            SmtpClient smtpClient = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                Credentials = credentials
            };

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(email, "Andres Personal Website");

            msg.To.Add(this.Email);
            msg.Subject = $"You received a reply of {reply.Nick} in the post '{post.Title}'";
            msg.IsBodyHtml = true;
            string postUrl = Environment.GetEnvironmentVariable("PAGE_URL") + "post/" + post.Id.ToString() + "/" +
                post.Title.Replace(" ", "%20");
            msg.Body = @$"<p>You comment: <b>{this.Nick}: </b> {this.Content}</p>
                <p>Reply: <b>{reply.Nick}: </b> {reply.Content}</p>
                <br><br>
                <a href='{postUrl}'>Post link.</a>";

            try
            {
                smtpClient.Send(msg);
            }
            catch (SmtpException e)
            {
                Console.WriteLine("Error: {0}", e.StatusCode);
            }
        }
    }
}
