import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid';
import { addDashboardUser, clearDashboardUserServerResponse } from "../../../redux/actions/dashboardUserAccountsActions";
import { permissionsList, pagesAccess } from '../../../constants/userPermissions';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import SnackBar from '../../ReusableComponents/SnackBar';

const EMAIL_REGEX = "^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$"

const useStyles = makeStyles({
  container: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 800,
      height: 600
    }
  },
  permissionSelection: {
    width: '40%',
    justifyContent: 'space-around'
  },
  pagesAccessWrapper: {
    height: 480,
    overflowY: 'auto'
  },
  pagesAccess: {
    width: '57%',
    marginLeft: '.7rem',
    border: '1px solid #bfbfbf',
    borderRadius: '10px'
  },
})

const CreateUserAccountDialog = ({openDialog, closeDialog}) => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const [newUser, setNewUser] = useState({id: nanoid(5), username: "", password: "", permissionName: ""})
  const [selectPagesAccess, setSelectPagesAccess] = useState(pagesAccess)
  const [snackBar, setSnackBar] = useState({})

  const serverMessageOnCreateUser = useSelector(state => ({
    error: state.dashboardUserAccounts?.error,
    success: state.dashboardUserAccounts?.success
  }))
  const {error, success} = serverMessageOnCreateUser

  const displaySnackbar = () => {
    dispatch(clearDashboardUserServerResponse()) 
    if (error) {
      if (error === "instance not unique") {
        setSnackBar({
          background: '#e53c5d', 
          open: true, 
          success: false,
          text: `Există deja un cont creat cu adresa de e-mail ${newUser.username}` 
        })
      } else {
        setSnackBar({
          background: '#e53c5d', 
          open: true, 
          success: false,
          text: error + " - DabaBase Error"
        })
      }
    }
  
    if (success) {
      setSnackBar({
        ...snackBar,
        background: '#28cc95', 
        open: true, 
        success: true,
        text: `Cont nou creat cu succes pentru ${newUser.username}` 
      })
      setTimeout(() => handleCloseDialog(), 5000)
    }
  }

  useEffect(() => {
    displaySnackbar()
    return () => dispatch(clearDashboardUserServerResponse()) 
  }, [error, success])

  const handleCloseDialog = () => {
    closeDialog(false)
    setNewUser({username: '', password: ''})
  } 

  const handleInputs = (event) => {
    const name = event.target.name
    const value = event.target.value
    setNewUser(values => ({...values, [name]: value, id: nanoid(5)}))
  }

  const handleSelectPermission = (event) => {
    setNewUser({...newUser, permissionName: event.target.value})
  }

  const handleSelectPagesPermission = (event) => {
    const pageName = event.target.name
    const newPermissionValue = event.target.checked

    let updatedPagesPermission = selectPagesAccess.map(page => {
      if (page.name === pageName) {
        return {...page, hasPermission: newPermissionValue}
      }
      return page
    })
    setSelectPagesAccess(updatedPagesPermission)
  }

  const saveAndCloseDialog = () => {
    if (newUser.username === "" || newUser.password === "") {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog completează ambele câmpuri pentru *Username* si *Parolă*"
      })
      return
    } 
    
    if ( !newUser.username.match(EMAIL_REGEX) ) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Username-ul trebuie să conțină o adresă de e-mail validă"
      })
      return
    }

    if (newUser.permissionName === "") {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog selectează accesul"
      })
      return
    }

    const allPagesPermission = []
    const pagesPermission = []
    selectPagesAccess.forEach(element => {
      allPagesPermission.push(element.hasPermission)
      if (element.hasPermission) {
        pagesPermission.push(element)
      }
    })

    if (!allPagesPermission.includes(true)) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog acordă cel puțin un acces"
      })
      return
    }

    const payload = {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      access: newUser.permissionName,
      pagesPermission
    }

    dispatch(addDashboardUser(payload))  
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog} className={styles.container}>
        <div className="p-3">
          <div className='d-flex justify-content-between'>
            <h6>Crează cont nou: </h6>
            <CancelRoundedIcon onClick={handleCloseDialog} style={{cursor: 'pointer'}} />
          </div>
          <div className='d-flex'>
            <div className={`d-flex flex-column mt-1 ${styles.permissionSelection}`}>
              <TextField
                type='email'
                name="username"
                label="USERNAME"
                value={newUser.username}
                onChange={handleInputs}
              />
              <TextField 
                type='text'
                name="password"
                label="PAROLĂ"
                value={newUser.password}
                onChange={handleInputs}
              />
              <div className='mt-5 d-flex flex-column'>
                <h6 className='m-0'>Acces: </h6>

                { permissionsList.map((permission, index) => {
                  return (
                    <FormControl component="fieldset" key={index}>
                      <RadioGroup
                        aria-label="permissionName"
                        name="permissionName"
                        value={newUser.permissionName}
                        onChange={handleSelectPermission}
                      >
                        <FormControlLabel 
                          value={permission.name}
                          control={<Radio style={{color: 'green'}} />} 
                          label={permission.name}
                        />
                      </RadioGroup>
                    </FormControl>
                  )
                })}

              </div>
              <Button 
                className='mt-5 fw-bold'
                variant='contained' 
                autoFocus 
                onClick={saveAndCloseDialog}>
                Crează
              </Button>
            </div>

            <div className={styles.pagesAccess}>
              <h6 className='text-center pt-2 pb-2'> Acordă access la următoarele sectiuni: </h6>

              <div className={`ps-3 ${styles.pagesAccessWrapper}`}>
                { selectPagesAccess.map((page, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={page.hasPermission}
                          onChange={handleSelectPagesPermission} 
                          name={page.name}
                          style={{color: 'green'}}
                        />
                      }
                      label={page.label}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }

    </div>
  )
}

export default CreateUserAccountDialog
