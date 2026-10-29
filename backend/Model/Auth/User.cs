using Grievance_Management_System.Enum;
using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System.Auth
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public RoleEnum Role { get; set; }
        public bool IsActive { get; set; }
    }
}
