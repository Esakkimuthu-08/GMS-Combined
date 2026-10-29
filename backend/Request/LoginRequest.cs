using System.ComponentModel.DataAnnotations;

namespace Grievance_Management_System.Request
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
     }
}
