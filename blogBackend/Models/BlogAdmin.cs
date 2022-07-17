using System;
using System.Collections.Generic;

namespace blogBackend.Models
{
    public partial class BlogAdmin
    {
        public string AdminUsername { get; set; } = null!;
        public string? AdminPassword { get; set; }
    }
}
