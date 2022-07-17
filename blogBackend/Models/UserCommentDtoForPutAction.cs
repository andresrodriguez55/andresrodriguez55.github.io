using System;
using System.Collections.Generic;

namespace blogBackend.Models
{
    public partial class UserCommentDtoForPutAction
    {
        public UserCommentDtoForPutAction()
        {

        }
        public int Id { get; set; }
        public string Nick { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string Email { get; set; } = null!;
        public short NotifyReply { get; set; }

    }
}
