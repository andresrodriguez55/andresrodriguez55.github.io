using System;
using System.Collections.Generic;

namespace blogBackend.Models
{
    public partial class UserCommentDtoForPostAction
    {
        public UserCommentDtoForPostAction()
        {

        }
        public int? ParentId { get; set; }
        public int PostId { get; set; }
        public string Nick { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string? Country { get; set; }
        public string Email { get; set; } = null!;
        public short NotifyReply { get; set; }

    }
}
