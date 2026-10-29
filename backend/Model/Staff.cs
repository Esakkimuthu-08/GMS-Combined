using Grievance_Management_System.Enum;
using Grievance_Management_System_Project.Enum;
using Grievance_Management_System_Project.Model;
using Microsoft.EntityFrameworkCore;

namespace Grievence_Management_System_Project.Model
{
    [Index(nameof(Email), IsUnique = true)]
    public class Staff
    {
        public int Id { get; set; }
        public string StaffCode { get; set; }
        public string Name { get; set; } = string.Empty;    
        public string Email { get; set; }
        public RoleEnum Role { get; set; }
        public string PhoneNumber { get; set; }
        public GrievanceCategory InchargeOf { get; set; }

        public ICollection<Student> Students { get; set; }
    }

}
