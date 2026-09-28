using Grievance_Management_System.Constants;
using Grievance_Management_System_Project.Exceptions;

namespace Grievence_Management_System_Project.Exceptions
{
    public class ForbiddenException : AppException
    {
        public ForbiddenException()
            : base(ErrorConstant.FORBIDDEN_MESSAGE,403)
        {

        }
    }
}
