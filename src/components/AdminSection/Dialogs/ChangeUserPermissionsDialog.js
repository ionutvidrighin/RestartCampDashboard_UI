import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateDashboardUserPermissions,
  clearDashboardUserServerResponse } from '../../../redux/actions/dashboardUserAccountsActions'
import { makeStyles } from '@material-ui/styles';
import { pagesAccess, permissionsList } from '../../../constants/userPermissions';
import pageAccessLogo from "../../../assets/change-access.png";
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const useStyles = makeStyles({
  container: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 800,
      width: 750,
      height: 600
    }
  },
  permissionsWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  permissionSelection: {
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 40,
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: -80,
    left: 25,
    width: '180px'
  },
  pagesAccessWrapper: {
    height: 350,
    overflowY: 'auto'
  },
  pagesAccess: {
    width: '60%',
    height: '100%',
    marginRight: '1rem',
    border: '1px solid #bfbfbf',
    borderRadius: '10px'
  }
})

const ChangeUserPermissionsDialog = ({openDialog, closeDialog, user}) => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const {id, username, access, pagesPermission} = user 
  const [userPermissionList, setUserPermissionList] = useState(permissionsList)
  const [userPagesAccess, setUserPagesAccess] = useState(pagesAccess)
  const [snackBar, setSnackBar] = useState({})

  useEffect(() => {
    const updatedUserAccessList = []
    userPermissionList.forEach(({name}) => {
      if (name === access) {
        updatedUserAccessList.push({ name, selected: true })
      } else {
        updatedUserAccessList.push({ name, selected: false })
      }
    })
    setUserPermissionList(updatedUserAccessList)

    const pagesWithAccess = pagesPermission
    const pagesNameWithAccess = pagesPermission.map(page => page.name)
    const pagesWithNoAccess = userPagesAccess.filter(access => !pagesNameWithAccess.includes(access.name))
    const updatedUserPagesAccess = [...pagesWithNoAccess, ...pagesWithAccess]
    updatedUserPagesAccess.sort((a, b) => a.id - b.id)

    setUserPagesAccess(updatedUserPagesAccess)
  }, [])

  const handleCloseDialog = () => {
    console.log('triggered')
    closeDialog(false)
  }

  const handleSelectUserPermission = (event) => {
    const permissionName = event.target.name
    const selectedPermission = event.target.checked

    let updatedUserAccessList = userPermissionList.map(element => {
      return {...element, selected: false}
    })

    updatedUserAccessList = updatedUserAccessList.map(element => {
      if (element.name === permissionName) {
        return {...element, selected: selectedPermission}
      }
      return element
    })
    setUserPermissionList(updatedUserAccessList)
  }

  const handleChangeUserPagesAccess = (event) => {
    const pageName = event.target.name
    const newPermissionValue = event.target.checked

    let updatedPagesPermission = userPagesAccess.map(page => {
      if (page.name === pageName) {
        return {...page, hasPermission: newPermissionValue}
      }
      return page
    })
    setUserPagesAccess(updatedPagesPermission)
  }

  const saveAndCloseDialog = () => {
    const newUserAccess = userPermissionList.find(permission => permission.selected).name
    const newUserPagesAccess = []
    userPagesAccess.forEach(pageAccess => {
      if (pageAccess.hasPermission) {
        newUserPagesAccess.push(pageAccess)
      }
    })
  
    if (newUserPagesAccess.length === 0) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog acordă cel puțin un acces"
      })
    } else {
      const payload = {
        id,
        username,
        access: newUserAccess,
        pagesPermission: newUserPagesAccess
      }
  
      dispatch(updateDashboardUserPermissions(payload))
    }
  }

  const serverMessageOnUpdateUser = useSelector(state => ({
    error: state.dashboardUserAccounts?.error,
    success: state.dashboardUserAccounts?.success
  }))
  const {error, success} = serverMessageOnUpdateUser

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
        text: `Permisiuni Cont pentru ${username} actualizate cu succes!` 
      })
      setTimeout(() => handleCloseDialog(), 5000)
    }
  }

  useEffect(() => {
    displaySnackbar()
    return () => dispatch(clearDashboardUserServerResponse()) 
  }, [error, success])

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog} className={styles.container}>
        <div className='pt-1 pe-2 pb-4'>
          <div className='d-flex justify-content-end'>
            <CancelRoundedIcon onClick={handleCloseDialog} style={{cursor: 'pointer'}} />
          </div>

          <div className='text-center' style={{width: '100%'}}>
            <h6 className='mb-0'>Modifică acces</h6>
            <p className='m-0'> 
              pentru contul
              <span style={{fontStyle: 'italic', fontWeight: 600, color: "#c23a6a"}}> {username} </span> 
            </p>
          </div>
        </div>

        <div className={styles.permissionsWrapper}>
          <div className={styles.permissionSelection}>
            <img src={pageAccessLogo} alt="permissionLogo" className={styles.logo} />
            <h6 className='m-0 mb-3 mt-5'>Acces actual: </h6>
            { userPermissionList.map((permission, index) => {
              return (
                <FormControl component="fieldset" key={index}>
                  <RadioGroup
                    aria-label="permissionName"
                    name={permission.name}
                    value={permission.selected}
                    onChange={handleSelectUserPermission}
                  >
                    <FormControlLabel 
                      value={permission.selected}
                      control={
                        <Radio
                          name={permission.name}
                          checked={permission.selected}
                          style={{color: 'green'}} 
                        />
                      } 
                      label={permission.name}
                    />
                  </RadioGroup>
                </FormControl>
              )
            })}
          </div>

          <div className={styles.pagesAccess}>
            <h6 className='text-center pt-2 pb-2'> Sectiuni cu access: </h6>

            <div className={`ps-3 ${styles.pagesAccessWrapper}`}>
              { userPagesAccess.map((page, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={page.hasPermission}
                        onChange={handleChangeUserPagesAccess} 
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

        <div className='text-center mt-4 mb-4'>
          <Button 
            className='fw-bold'
            variant='contained' 
            autoFocus 
            onClick={saveAndCloseDialog}>
            Modifică
          </Button>
        </div>
      </Dialog>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default ChangeUserPermissionsDialog
