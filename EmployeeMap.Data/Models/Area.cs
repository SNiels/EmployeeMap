using System.Collections.Generic;

namespace EmployeeMap.Data.Models
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Employee> Employees { get; set; }
    }
}