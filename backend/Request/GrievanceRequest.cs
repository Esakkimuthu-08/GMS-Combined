using Grievance_Management_System_Project.Enum;
using System.ComponentModel.DataAnnotations;

namespace Grievence_Management_System_Project.Request
{
    public class GrievanceRequest
    {
        [Required]
        public GrievanceCategory GrievanceCategory { get; set; }
        [Required]

        public string Subject { get; set; }
        [Required]

        public string Description { get; set; }
    }
}
