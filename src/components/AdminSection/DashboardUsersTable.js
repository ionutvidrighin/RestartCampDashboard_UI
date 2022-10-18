import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { isAdmin, displayAccountTypeIcon } from '../../utils/helperFunctions';
import { fetchDashboardUsers } from "../../redux/actions/dashboardUsersActions";
import ChangeUserPermissionsDialog from './Dialogs/ChangeUserPermissionsDialog';
import DeleteUserAccountDialog from './Dialogs/DeleteUserAccountDialog';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  tableHeader: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    backgroundColor: '#dbdbdb'
  },
  tableBody: {
    width: '100%',
    height: 'fit-content',
    maxHeight: '380px',
    marginTop: '.5rem',
    padding: '0 1rem .7rem 1rem',
    backgroundColor: '#dbdbdb',
    overflow: 'auto'
  },
  changeAccessBtn: {
    height: '25px',
    backgroundColor: '#49917a',
    fontWeight: 'bold'
  },
  deleteAccount: {
    color: '#e53c5d'
  },
  eye: {
    color: '#e53c5d',
    cursor: 'pointer'
  },
  bullet: {
    width: '10px',
    height: '10px'
  }
})

const DashboardUsersTable = () => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDashboardUsers())
  }, []) 

  const [showPassword, setShowPassword] = useState({ id: null, reveal: false })
  const [changeUserPermissions, setChangeUserPermissions] = useState(false)
  const [deleteUserAccount, setDeleteUserAccount] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [onIconHover, setOnIconHover] = useState({rotate: false, id: null})
  
  const currentlyLoggedUser = useSelector(state => state.authReducer)
  const dashboardUsers = useSelector(state => {
    let users = state.dashboardUserAccounts.users
    users = users.map(user => {
      let passwordLength = []
      for (let i = 0; i < user.password.length; i++) {
        passwordLength = [...passwordLength, i]
      }

      return {
        ...user,
        icon: displayAccountTypeIcon(user.role),
        hiddenPassword: passwordLength
      }
    })

    return users.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()))
  })
  
  const openUserPermissionsDialog = (user) => {
    setChangeUserPermissions(true)
    setSelectedUser(user)
  }

  const openDeleteUserAccountDialog = (user) => {
    setDeleteUserAccount(true)
    setSelectedUser(user)
  }

  return (
    <div className='dashboard-users'>

      <div className={localStyles.tableContainer}>
        <h4 style={{alignSelf: 'flex-start'}}>Listă useri Dashboard:</h4>
        {/* Table header */}
        <Paper className={localStyles.tableHeader}>
          <div className='table-header-item smallest-cell'>
            ICON
          </div>
          <div className='table-header-item'>
            USERNAME
          </div>
          <div className='table-header-item'>
            PAROLĂ
          </div>
          <div className='table-header-item'>
            ROL
          </div>
          <div className='table-header-item medium-cell'>
            MODIFICĂ ACCES
          </div>
          <div className='table-header-item small-cell'>
            ȘTERGE CONT
          </div>
        </Paper>

        {/* Table body */}
        <Paper className={localStyles.tableBody}>
          { dashboardUsers.length > 0 &&
            dashboardUsers.map(user => {
              return (
                <div key={user.id} className='table-row'>
                  <div className='table-body-cell smallest-cell'>
                    <div style={{
                      borderRadius: '30%',
                      boxShadow: '0px 0px 26px -6px rgba(0,0,0,0.75)',
                      padding: '.4rem'  
                    }}
                      onMouseEnter={() => setOnIconHover({rotate: true, id: user.id})}
                      onMouseLeave={() => setOnIconHover({rotate: false, id: user.id})}
                      className={(onIconHover.rotate && onIconHover.id === user.id) ? 'rotate-icon' : ""}>
                      <img src={user.icon} alt="account-icon" style={{width: 30, cursor: 'pointer'}} />
                    </div>
                  </div>

                  <div className='table-body-cell'>
                    {user.username}
                  </div>

                  <div className='table-body-cell dashboard-user-password'>
                    <div id="show-hide-password">
                      { showPassword.reveal && (showPassword.id === user.id) ?
                        <VisibilityOffIcon
                          className={localStyles.eye} 
                          fontSize='small'
                          onClick={() => setShowPassword({id: user.id, reveal: !showPassword.reveal})} 
                        />
                        :
                        <VisibilityIcon
                          className={localStyles.eye} 
                          fontSize='small'
                          onClick={() => setShowPassword({id: user.id, reveal: !showPassword.reveal})} 
                        />
                      }
                    </div>

                    { showPassword.reveal && (showPassword.id === user.id) ?
                      <span> {user.password} </span>
                      :
                      <span>
                        { user.hiddenPassword.map(el => (
                          <FiberManualRecordIcon key={el} className={localStyles.bullet} />
                        ))} 
                      </span>
                    }

                  </div>

                  <div className='table-body-cell' style={{color: isAdmin(user.role) && '#e66cb1'}}>
                    { user.role }
                  </div>

                  <div className='table-body-cell medium-cell'>
                    <Button 
                      variant="contained" 
                      className={localStyles.changeAccessBtn}
                      onClick={() => openUserPermissionsDialog(user)}
                      disabled={user.id === currentlyLoggedUser.id}>
                      Modifică
                    </Button>
                  </div>
                  
                  { (user.id === currentlyLoggedUser.id) ?
                    <div className='table-body-cell small-cell delete-account-cell'> </div>
                    :
                    <div className='table-body-cell small-cell delete-account-cell'
                      onClick={() => openDeleteUserAccountDialog(user)}>
                        <DeleteForeverIcon className={localStyles.deleteAccount} />
                    </div>
                  }
                </div>
              )
            })
          }
        </Paper>
      </div>

      { changeUserPermissions && 
        <ChangeUserPermissionsDialog
          openDialog={changeUserPermissions}
          closeDialog={setChangeUserPermissions}
          user={selectedUser}
        /> 
      }

      { deleteUserAccount &&
        <DeleteUserAccountDialog
          openDialog={deleteUserAccount}
          closeDialog={setDeleteUserAccount}
          user={selectedUser} 
        />
      }
      
    </div>
  )
}

export default DashboardUsersTable
