import { useState } from "react";
import axios from "axios";
import EmployeesCSS from "../Style/employees.module.css";

const EditButton = ({ userId, onClick }) => {
  const [editedData, setEditedData] = useState({
    email: "",
    password: "",
    role: "",
    username: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8080/users/${userId}`, editedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      onClick(userId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleEdit();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({
      email: "",
      password: "",
      role: "",
      username: ""
    });
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            name="username"
            value={editedData.username}
            onChange={handleFieldChange}
            placeholder="Nombre de usuario"
          />
          <input
            type="text"
            name="email"
            value={editedData.email}
            onChange={handleFieldChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={editedData.password}
            onChange={handleFieldChange}
            placeholder="Contraseña"
          />
          <input
            type="text"
            name="role"
            value={editedData.role}
            onChange={handleFieldChange}
            placeholder="Rol"
          />
          <button className={EmployeesCSS.btnKeep} onClick={handleSaveClick}>Guardar</button>
          <button className={EmployeesCSS.btnCancel} onClick={handleCancelClick}>Cancelar</button>
        </>
      ) : (
        <button className={EmployeesCSS.btnUser}  onClick={handleEditClick}>✏️</button>
      )}
    </div>
  );
};

export default EditButton;
