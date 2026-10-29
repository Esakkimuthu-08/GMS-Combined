using Grievance_Management_System.Constants;

namespace Grievance_Management_System_Project.Exceptions
{
    public class AccountExistsException : AppException
    {
        public AccountExistsException()
            : base(ErrorConstant.AccountExist, 409) { }
    }
}
