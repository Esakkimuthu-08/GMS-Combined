using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Grievance_Management_System_Project.Migrations
{
    /// <inheritdoc />
    public partial class GrievanceMessageAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GrievanceMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GrievanceId = table.Column<int>(type: "int", nullable: false),
                    Sender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrievanceMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrievanceMessages_RaiseGrievances_GrievanceId",
                        column: x => x.GrievanceId,
                        principalTable: "RaiseGrievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GrievanceMessages_GrievanceId",
                table: "GrievanceMessages",
                column: "GrievanceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GrievanceMessages");
        }
    }
}
