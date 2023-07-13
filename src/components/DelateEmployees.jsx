import React, { useEffect } from "react";
import axios from "axios";

export const DeleteEmployees = () => {
  useEffect(() => {
    deleteData();
  }, []);

  const deleteData = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:8080/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log("Usuarios eliminados exitosamente");
    } catch (error) {
      console.error("Error al eliminar los usuarios:", error);
    }
  };

  return
};
