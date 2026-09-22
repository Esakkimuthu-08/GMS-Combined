namespace Grievence_Management_System_Project.Response
{

    public class GrievanceMessageResponseDto
    {
        public int Id { get; set; }
        public int GrievanceId { get; set; }
        public string Sender { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
