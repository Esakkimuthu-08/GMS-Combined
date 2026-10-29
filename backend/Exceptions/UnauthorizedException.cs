using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class UnauthorizedException : AppException
    {
        public UnauthorizedException()
            : base(ErrorConstant.Unauthorized, 401) { }
    }
}
