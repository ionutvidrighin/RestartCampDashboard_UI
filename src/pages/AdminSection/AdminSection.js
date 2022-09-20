import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { isAdmin } from '../../utils/helperFunctions';
import CreateUserAccountDialog from '../../components/AdminSection/Dialogs/CreateUserAccountDialog';
import DashboardUsersTable from '../../components/AdminSection/DashboardUsersTable';
import usersIcon from "../../assets/users.png";
import addUserIcon from "../../assets/add-user.png";
import NoAccessPage from '../../components/NoAccessPage';

const AdminSection = ({ setShowPlaceholder }) => {
  const getUserAccessFromStore = useSelector(state => state.authReducer.access)

  useEffect(() => {
    setShowPlaceholder(false)
  }, [])

  const [createUserAccount, setCreateUserAccount] = useState(false)
  const handleOpenCreateUserAccount = () => {
    setCreateUserAccount(true)
  }

  return (
    <>
    { isAdmin(getUserAccessFromStore) ?
      <div className='admin-section'>
        <div className='d-flex align-items-center justify-content-center'>
          <img src={usersIcon} alt="users-icon" style={{width: '150px'}} className='mt-3' />
        </div>

        <div className='mt-3 mb-4'>
          <div className='divider'> </div>
        </div>

        <div className='add-new-user-container'>
          <div className='add-new-user-btn d-flex align-items-center' onClick={handleOpenCreateUserAccount}>
            <img src={addUserIcon} alt="add-user" style={{width: '50px'}} />
            <div className='ms-2 text-center'>
              <p className='m-0'>Crează</p>
              <p className='m-0'>User Nou</p>
            </div>
          </div>
        </div>

        { createUserAccount && 
          <CreateUserAccountDialog 
            openDialog={createUserAccount}
            closeDialog={setCreateUserAccount}
          /> 
        }

        <DashboardUsersTable />
      </div>
      :
      <NoAccessPage />
    }
    </>
  )
}

export default AdminSection
