using Grievence_Management_System_Project.Enum;
using System.ComponentModel.DataAnnotations;

namespace Grievence_Management_System_Project.Request
{
    public class UpdateStatusDto
    {
        [Required]
        public int GrievanceId { get; set; }
        [Required]
        public GrievanceStatus GrievanceStatus { get; set; }
    }
}
