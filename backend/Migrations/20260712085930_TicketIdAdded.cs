using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grievance_Management_System_Project.Migrations
{
    /// <inheritdoc />
    public partial class TicketIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TicketId",
                table: "RaiseGrievances",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "RaiseGrievances");
        }
    }
}
