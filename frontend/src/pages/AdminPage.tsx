import EmployeeAdmin from "../components/admin/EmployeeAdmin";
import ChecklistAdmin from "../components/admin/ChecklistAdmin";

function AdminPage() {
    return (
        <div>
            <h2> Admin Panel </h2>
            <EmployeeAdmin />
            <ChecklistAdmin />
        </div>
    );
}

export default AdminPage;