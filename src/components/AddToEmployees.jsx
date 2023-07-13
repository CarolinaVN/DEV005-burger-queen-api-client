import { useState } from "react";
import axios from "axios";
import EmployeesCSS from "../Style/employees.module.css";

const CreateUserTable = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleCreateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const newUser = {
          email: email,
          password: password,
          role: role,
          username: username,
        };
        const response = await axios.post(
          "http://localhost:8080/users",
          newUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("Usuario creado exitosamente:", response.data);
        setSuccessMessage("Usuario creado exitosamente");
        setEmail("");
        setPassword("");
        setRole("");
        setUsername("");
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }
    };

  return (
    <section className={EmployeesCSS.tableContainer}>
            
    <table className={EmployeesCSS.tableUser}>
        <thead className={EmployeesCSS.tableHeader}>
          <tr>
            <th colSpan="2">
              <p>Crear Nuevo Usuario</p>
              {successMessage && <p>{successMessage}</p>}
            </th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td>Nombre de Colaborador:</td>
          <td>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </td>
        </tr>
        <tr>
          <td>Correo:</td>
          <td>
            <input type="text" value={email} onChange={handleEmailChange} />
          </td>
        </tr>
        <tr>
          <td>Contraseña:</td>
          <td>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </td>
        </tr>
        <tr>
          <td>Rol:</td>
          <td>
            <input type="text" value={role} onChange={handleRoleChange} />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button onClick={handleCreateUser}>incorporar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </section>
  );
};

export default CreateUserTable;
