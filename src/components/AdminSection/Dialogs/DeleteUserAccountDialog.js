import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteDashboardUserAccount,
  clearDashboardUserServerResponse } from "../../../redux/actions/dashboardUsersActions"
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const DeleteUserAccountDialog = ({openDialog, closeDialog, user}) => {
  const dispatch = useDispatch()
  const { id, username } = user

  const [snackBar, setSnackBar] = useState({})
  const currentlyLoggedUser = useSelector(state => state.authReducer.email)
  const serverMessageOnUpdateUser = useSelector(state => ({
    error: state.dashboardUserAccounts?.error,
    success: state.dashboardUserAccounts?.success
  }))
  const {error, success} = serverMessageOnUpdateUser

  const handleCloseDialog = () => closeDialog(false)

  const displaySnackbar = () => {
    dispatch(clearDashboardUserServerResponse()) 
    if (error) {
      setSnackBar({
        background: '#e53c5d', 
        open: true, 
        success: false,
        text: error
      })
    }
  
    if (success) {
      setSnackBar({
        background: '#28cc95', 
        open: true, 
        success: true,
        text: `Contul - ${username} - a fost sters!` 
      })
      setTimeout(() => handleCloseDialog(), 5000)
    }
  }

  useEffect(() => {
    displaySnackbar()
    return () => dispatch(clearDashboardUserServerResponse()) 
  }, [error, success])

  const deleteUserAccount = () => {
    const payload = {
      id,
      username
    }
    
    if (username === currentlyLoggedUser) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 12000,
        text: 'Eroare! Nu îți poți șterge propriul cont.'
      })
      setTimeout(() => handleCloseDialog(), 2500)
      return
    }
    dispatch(deleteDashboardUserAccount(payload))
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
        <div style={{width: '200px', height: '180px', padding: '1rem'}}>
          <h6 className='text-center'> Confirm ștergerea contului pentru </h6>
          <p style={{fontStyle: 'italic', fontWeight: 600, margin: 0, color: '#e53c5d', textAlign: 'center'}}> 
            {username}
          </p>
          <div className='d-flex justify-content-evenly mt-4'>
            <Button
              className='fw-bold'
              variant='contained'
              onClick={deleteUserAccount}>
              DA
            </Button>

            <Button
              className='fw-bold'
              variant='contained'
              onClick={handleCloseDialog}>
              NU
            </Button>
          </div>
        </div>
      </Dialog>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default DeleteUserAccountDialog
