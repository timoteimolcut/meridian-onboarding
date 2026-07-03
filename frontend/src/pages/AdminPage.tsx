import EmployeeAdmin from "../components/admin/EmployeeAdmin";
import ChecklistAdmin from "../components/admin/ChecklistAdmin";
import ResourceAdmin from "../components/admin/ResourceAdmin";

function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
      <div className="flex flex-col gap-12">
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <EmployeeAdmin />
        </section>
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <ChecklistAdmin />
        </section>
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <ResourceAdmin />
        </section>
      </div>
    </div>
  );
}

export default AdminPage;