import StaffAdminLayout from "../../layouts/StaffAdminLayout";

export default function AdminSettings() {
  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          System Settings
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage categories, statuses, and notifications
        </p>

        <div className="bg-white rounded-lg shadow-md border border-border p-12">
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold mb-2">
              System Settings Page
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Configure grievance categories, workflow statuses, and alerts.
            </p>
            <p className="text-sm text-muted-foreground">
              Ready to add real settings.
            </p>
          </div>
        </div>
      </div>
    </StaffAdminLayout>
  );
}
