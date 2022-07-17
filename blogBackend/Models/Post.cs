using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace blogBackend.Models
{
    public partial class Post
    {
        public Post()
        {
            UserComments = new HashSet<UserComment>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime PostDate { get; set; }
        public string? Category { get; set; }
        public string? CoverPhotoLink { get; set; }

        [JsonIgnore]
        public virtual Category? CategoryNavigation { get; set; }

        public virtual ICollection<UserComment> UserComments { get; set; }
    }
}
