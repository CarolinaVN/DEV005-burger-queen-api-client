import React, { useState } from "react";
import ApiAdminUser from "../../Utilities/ApiAdminUser";
import CreateUserTable from "../../components/AddToEmployees";
import Header from "../../components/Header";
import TopBarAdmin from "../../components/topBarAdmin";

const AdminEmployees = () => {
  const [user, setUser] = useState([]);
  const [addUser, setAddUser] = useState({
    email: "",
    password: "",
    role: "",
    username: "",
  });

  const [editUser, setEditUser] = useState({
    email: "",
    password: "",
    role: "",
    username: "",
  });

  const handleUserCreated = (newUser) => {
    setUser([...user, newUser]);
  };

  return (
    <>
      adminEmployees
      <Header />
      <TopBarAdmin />
      <ApiAdminUser />
      <CreateUserTable addUser={addUser} onUserCreated={handleUserCreated} />
    </>
  );
};

export default AdminEmployees;
