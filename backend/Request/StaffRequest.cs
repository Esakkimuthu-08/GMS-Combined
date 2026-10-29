using System.ComponentModel.DataAnnotations;

namespace Grievance_Management_System.Request
{
    public class StaffRequest
    {
        [Required]
        public string StaffCode { get; set; }
        [Required(ErrorMessage = "Name is Required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone Number Must be 10 digit")]
        public string PhoneNumber { get; set; }
    }
}
