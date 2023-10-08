using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoTest.Models.Models
{
    public class TodoDTO
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
    }
}
