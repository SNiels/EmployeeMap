using EmployeeMap.Data.Helpers;

namespace EmployeeMap.Data.Models
{
    [ExportToTypeScript]
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? AreaId { get; set; }
        public virtual Area Area { get; set; }
        public string Location { get; set; }
    }
}
