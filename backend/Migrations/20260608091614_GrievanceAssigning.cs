using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grievance_Management_System_Project.Migrations
{
    /// <inheritdoc />
    public partial class GrievanceAssigning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InchargeOf",
                table: "Staffs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AssignedToStaffId",
                table: "RaiseGrievances",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RaiseGrievances",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RaiseGrievances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "RaiseGrievances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RaiseGrievances_AssignedToStaffId",
                table: "RaiseGrievances",
                column: "AssignedToStaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_RaiseGrievances_Staffs_AssignedToStaffId",
                table: "RaiseGrievances",
                column: "AssignedToStaffId",
                principalTable: "Staffs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RaiseGrievances_Staffs_AssignedToStaffId",
                table: "RaiseGrievances");

            migrationBuilder.DropIndex(
                name: "IX_RaiseGrievances_AssignedToStaffId",
                table: "RaiseGrievances");

            migrationBuilder.DropColumn(
                name: "InchargeOf",
                table: "Staffs");

            migrationBuilder.DropColumn(
                name: "AssignedToStaffId",
                table: "RaiseGrievances");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RaiseGrievances");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RaiseGrievances");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "RaiseGrievances");
        }
    }
}
