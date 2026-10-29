import StaffAdminLayout from "../../layouts/StaffAdminLayout";

export default function AdminUsers() {
  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          User Management
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage departments, staff, and admin users
        </p>

        <div className="bg-white rounded-lg shadow-md border border-border p-12">
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-2xl font-bold mb-2">
              User Management Page
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Create, edit, and assign roles to staff and administrators.
            </p>
            <p className="text-sm text-muted-foreground">
              Ready for CRUD implementation.
            </p>
          </div>
        </div>
      </div>
    </StaffAdminLayout>
  );
}
