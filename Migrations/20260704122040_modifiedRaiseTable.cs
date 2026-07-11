using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grievance_Management_System_Project.Migrations
{
    /// <inheritdoc />
    public partial class modifiedRaiseTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RaiseGrievances_StudentId",
                table: "RaiseGrievances",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_RaiseGrievances_Students_StudentId",
                table: "RaiseGrievances",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RaiseGrievances_Students_StudentId",
                table: "RaiseGrievances");

            migrationBuilder.DropIndex(
                name: "IX_RaiseGrievances_StudentId",
                table: "RaiseGrievances");
        }
    }
}
