import EmployeesCSS from "../Style/employees.module.css";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/editButtonEmployes";

const EmployeeTable = ({ user, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };
  const handleEdit = () => {
    onEdit(user.id);
  };

  return (
    <div className={EmployeesCSS.tableUser}>
      <table>
        <thead className={EmployeesCSS.tableHeader}>
          <tr>
            <th colSpan="3">{user.username}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email: {user.email}</td>
          </tr>
          <tr>
            <td>Role: {user.role}</td>
          </tr>
          <tr>
            <td className={EmployeesCSS.btnFlex}>
              <DeleteButton userId={user.id} onClick={handleDelete} />
              <EditButton userId={user.id} onClick={handleEdit} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const EmployeesTable = ({ users, onDeleteUser }) => {
  const handleDeleteUser = (userId) => {
    onDeleteUser(userId);
  };
  const handleEditUser = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  return (
    <div className={EmployeesCSS.tableContainer}>
      {users.map((user) => (
        <EmployeeTable
          key={user.id}
          user={user}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />
      ))}
    </div>
  );
};

export default EmployeesTable;
