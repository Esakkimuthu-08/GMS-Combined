using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System.Model.Auth
{
    [Index(nameof(Email), IsUnique = true)]
    public class StudentSignUp
    {
        public int Id { get; set; }
        public string RollNo { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string StaffCode { get; set; }

        public bool IsApproved { get; set; } = false;
    }
}
