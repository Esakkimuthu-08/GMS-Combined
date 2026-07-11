using Grievance_Management_System_Project.Enum;
using Grievance_Management_System_Project.Model;
using Grievence_Management_System_Project.Enum;

namespace Grievence_Management_System_Project.Model
{
    public class RaiseGrievances
    {
        public int Id { get; set; }
        public GrievanceCategory GrievanceCategory { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public GrievanceStatus Status { get; set; }
        public int? AssignedToStaffId { get; set; }
        public Staff AssignedToStaff { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
