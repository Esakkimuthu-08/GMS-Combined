using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class BadRequestException : AppException
    {
        public BadRequestException()
            : base(ErrorConstant.BadRequest, 400)
        {
        }

        public BadRequestException(string message)
            : base(message, 400)
        {
        }
    }
}
