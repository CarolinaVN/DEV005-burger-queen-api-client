import EmployeesCSS from "../Style/employees.module.css";
import DeleteButton from "../components/DeleteButton";

const EmployeeTable = ({ user, onDelete }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className={EmployeesCSS.tableUser}>
      <table>
        <thead className={EmployeesCSS.tableHeader}>
          <tr>
            <th colSpan="3">Nombre: {user.name}</th>
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
            <td>ID: {user.id}</td>
          </tr>
          <tr>
            <td>
              <DeleteButton userId={user.id} onClick={handleDelete} />
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

  return (
    <div className={EmployeesCSS.tableContainer}>
      {users.map((user) => (
        <EmployeeTable
          key={user.id}
          user={user}
          onDelete={handleDeleteUser}
        />
      ))}
    </div>
  );
};

export default EmployeesTable;
