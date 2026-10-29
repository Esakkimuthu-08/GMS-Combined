using Grievance_Management_System.Enum;
using Grievance_Management_System_Project.Enum;
using System.ComponentModel.DataAnnotations;

namespace Grievance_Management_System.Request
{
    public class ApproveStaffDto
    {
        [Required]
        public int SignupRequestId { get; set; }
        [Required]
        public RoleEnum Role { get; set; }
        [Required]
        public string StaffCode { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public GrievanceCategory InchargeOf { get; set; }
    }
}
