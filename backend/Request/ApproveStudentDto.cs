using Grievance_Management_System.Enum;
using System.ComponentModel.DataAnnotations;

namespace Grievance_Management_System.Request
{
    public class ApproveStudentDto
    {
        [Required]
        public int StudentSignUpId { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
      

    }
}
