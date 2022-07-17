
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace blogBackend.Models
{
    public partial class Category
    {
        public Category()
        {
            Posts = new HashSet<Post>();
        }

        public string NameOfCategory { get; set; } = null!;


        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; }
    }
}
