using Grievance_Management_System.Auth;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System_Project.Model;
using Grievence_Management_System_Project.Model;
using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System_Project.AppDbContext
{
    public class GrievanceDbContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
    {
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Student> Students { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<StaffSignUp> StaffSignUp { get; set; }
        public DbSet<StudentSignUp> StudentSignUp { get; set; }
        public DbSet<RaiseGrievances> RaiseGrievances { get; set; }
        public DbSet<GrievanceMessage> GrievanceMessages { get; set; }
    }
}
