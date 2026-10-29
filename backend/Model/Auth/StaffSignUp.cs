using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System.Auth
{
    [Index(nameof(Email), IsUnique = true)]
    public class StaffSignUp
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public bool IsApproved { get; set; } = false;

    }
}
