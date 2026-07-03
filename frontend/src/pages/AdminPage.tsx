import EmployeeAdmin from "../components/admin/EmployeeAdmin";
import ChecklistAdmin from "../components/admin/ChecklistAdmin";
import ResourceAdmin from "../components/admin/ResourceAdmin";

function AdminPage() {
    return (
        <div>
            <h2> Admin Panel </h2>
            <EmployeeAdmin />
            <ChecklistAdmin />
            <ResourceAdmin />
        </div>
    );
}

export default AdminPage;