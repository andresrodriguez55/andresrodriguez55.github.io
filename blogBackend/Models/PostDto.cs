using System;
using System.Collections.Generic;

namespace blogBackend.Models
{
    public class PostDto
    {
        public PostDto()
        {
        }

        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime PostDate { get; set; }
        public string? Category { get; set; }
        public string? CoverPhotoLink { get; set; }
    }
}
