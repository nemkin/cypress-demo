using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CypressDemo.Api.ViewModels
{
    public class TodoViewModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Deadline { get; set; }
        public bool IsCompleted { get; set; }
    }
}
