using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class NotFoundException : AppException
    {
        public NotFoundException()
            : base(ErrorConstant.NotFound, 404) { }
    }
}
