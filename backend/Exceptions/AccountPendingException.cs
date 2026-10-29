using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class AccountPendingException : AppException
    {
        public AccountPendingException()
            : base(ErrorConstant.AccountPending, 400)
        {
        }
    }

}
