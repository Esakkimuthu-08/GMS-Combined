namespace Grievence_Management_System_Project.Model
{
    public class GrievanceMessage
    {
        public int Id { get; set; }
        public int GrievanceId { get; set; }
        public string Sender { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; } = false;
        public RaiseGrievances Grievance { get; set; }
    }
}
