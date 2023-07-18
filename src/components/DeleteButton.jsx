import axios from "axios";
import EmployeesCSS from "../Style/employees.module.css";

const DeleteButton = ({ userId, onClick }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log("Usuario eliminado exitosamente");
      onClick();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return <button className={EmployeesCSS.btnUser} onClick={handleDelete}>❌</button>;
};

export default DeleteButton;
