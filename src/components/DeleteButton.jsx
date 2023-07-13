import axios from "axios";

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

  return <button onClick={handleDelete}>Eliminar</button>;
};

export default DeleteButton;
