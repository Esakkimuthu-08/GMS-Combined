using System.ComponentModel.DataAnnotations;

namespace Grievance_Management_System.Request
{
    public class StudentSignUpRequest
    {
        [Required]
        public string RollNo { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string StaffCode { get; set; }
    }
}
