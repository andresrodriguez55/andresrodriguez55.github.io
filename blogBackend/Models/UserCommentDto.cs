using System;
using System.Collections.Generic;

namespace blogBackend.Models
{
    public partial class UserCommentDto
    {
        public UserCommentDto()
        {

        }
        public int Id { get; set; }
        public int PostId { get; set; }
        public string? PostName { get; set; }
        public string? Email { get; set; } 

        public string Nick { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CommentDate { get; set; }

        public string? Country { get; set; }

    }
}
