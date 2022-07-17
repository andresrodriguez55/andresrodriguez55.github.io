using System;
using System.Collections.Generic;
using SendGrid;
using SendGrid.Helpers.Mail;


namespace blogBackend.Models
{
    public partial class SubscribedEmail
    {
        public string Email { get; set; } = null!;
        public DateTime SubscriptionDate { get; set; }
        
        private string buildNotificationEmailContent(Post post) 
        {
            string newPostUrl = Environment.GetEnvironmentVariable("PAGE_URL") + "post/" + post.Id.ToString() + "/" +
                post.Title.Replace(" ", "%20");

            string unsubscribeUrl = Environment.GetEnvironmentVariable("PAGE_URL") + "unsubscribe/" + this.Email;

            string htmlMessage = @"<html>
                    <head>
                        <style>
                            .postGrid
                            {
                                background-color: rgba(230, 230, 230, 0.308);
                                position: relative;
                                -webkit-transition: all 400ms;
                            }

                            .postGridImage
                            {
                                display: block;
                                margin-left:auto;
                                margin-right:auto;
                                width: 50%;
                                filter: brightness(70%);
                            }

                            .postGridInformation
                            {
                                background-color: #000000;
                                color: white;
                                text-shadow: 2px 2px 2px #000000;
                                position: absolute;
                                bottom: 15%;
                                padding-left: 2%;
                                padding-right: 2%;
                                padding-top: 10px;
                                padding-bottom: 10px;
                                width: 48%;
                            }

                            .postGridTitle
                            {
                                font-size: 135%;
                                margin: 0;
                            }

                            .postGridDate
                            {
                                font-size: 82%;
                            }

                            .postGridCategory
                            {
                                font-size: 90%;
                            }

                        </style>
                    </head>
                    <body>
                        <div class='postGrid'> 
                            <img class='postGridImage' src='" + post.CoverPhotoLink + @"' />
                            <center>
                                <div class='postGridInformation'>
                                    <h2 class='postGridTitle'>" + post.Title + @"</h2>
                                    <p class='postGridCategory'>Category: " + post.Category + @"</p>
                                    <p class='postGridDate'>" + post.PostDate + @"</p>
                                </div>  
                            </center>
                        </div>
                        <a href = '" + newPostUrl + @"' > Post link.</a>
                        <br><br>
                        <a href='" + unsubscribeUrl + @"' >
                            Unsubscribe 
                        </a>
                    </body>
                </html>";

            return htmlMessage;
        }

        public async Task<bool> notify(Post post)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var hostEmail = Environment.GetEnvironmentVariable("EMAIL");
            var from = new EmailAddress(hostEmail, "Andres Personal Website");
            var to = new EmailAddress(this.Email, "User");
            var subject = "New Post of Andres's Blog!";
            var plainTextContent = "Click to see!";
            var htmlContent = buildNotificationEmailContent(post);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg);
            Console.WriteLine(response);
            Console.WriteLine(response.StatusCode);
            Console.WriteLine(response.ToString());
            Console.WriteLine(response.Headers);
            return response.IsSuccessStatusCode;

        }
    }
}
