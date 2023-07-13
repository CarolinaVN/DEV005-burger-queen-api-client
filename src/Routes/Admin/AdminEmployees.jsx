import React from 'react'
import ApiAdminUser  from '../../Utilities/ApiAdminUser';
import Header from "../../components/Header";
import TopBarAdmin from '../../components/topBarAdmin';

const AdminEmployees = () => {
  return (
    <>

     adminEmployees
     <Header />
     <TopBarAdmin/>
     <ApiAdminUser refresh={refresh} />
      <CreateUserTable onUserCreated={handleUserCreated} />
    </>
  );
};

export default AdminEmployees;