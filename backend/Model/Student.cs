using Grievence_Management_System_Project.Model;
using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System_Project.Model
{
    [Index(nameof(Email), IsUnique = true)]
    public class Student
    {
        public int Id { get; set; }
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int StaffId { get; set; }
        public Staff Staff { get; set; }
    }

}
