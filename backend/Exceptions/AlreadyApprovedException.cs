using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class AlreadyApprovedException : AppException
    {
        public AlreadyApprovedException()
            : base(ErrorConstant.AlreadyApproved, 400)
        {
        }
    }
}
