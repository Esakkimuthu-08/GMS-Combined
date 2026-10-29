using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class AccountDisabledException : AppException
    {
        public AccountDisabledException()
            : base(ErrorConstant.AccountDisabled, 403)
        {
        }
    }
}
