import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid';
import { createDashboardUser, clearDashboardUserServerResponse } from "../../../redux/actions/dashboardUserAccountsActions";
import { permissions, userRoles, viewTimeLimit } from '../../../constants/userPermissions'; 
import { makeStyles } from '@material-ui/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SnackBar from '../../ReusableComponents/SnackBar';

const EMAIL_REGEX = "^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$"

const useStyles = makeStyles({
  container: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 800,
      width: 800,
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

  const [newUser, setNewUser] = useState({id: nanoid(5), username: "", password: "", role: ""})
  const [userPermissions, setUserPermissions] = useState(permissions)
  const [selectRestrictedColumns, setSelectRestrictedColumns] = useState({
    sectionId: null,
    open: false
  })
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

  const handleGetUsernameAndPassword = (event) => {
    const name = event.target.name
    const value = event.target.value
    setNewUser(values => ({...values, [name]: value, id: nanoid(5)}))
  }

  const handleSelectUserRole = (event) => {
    setNewUser({...newUser, role: event.target.value})
  }

  const handleOpenSelectRestrictedColumns = (sectionId) => {
    setSelectRestrictedColumns({
      sectionId,
      open: !selectRestrictedColumns.open
    })
  }

  const handleSelectPagesPermission = (event, sectionId, viewDataLimitId) => {
    const selectedSection = event.target?.name || event.target.getAttribute('name')
    const selectedViewTimeLimit = event.target.value

    let allUserPermissions = userPermissions
    const sectionToUpdate = allUserPermissions.findIndex(section => section.id === sectionId)
    const updatedPermissions = [...allUserPermissions]

    if (selectedSection === 'view') {
      updatedPermissions[sectionToUpdate].access.view = !allUserPermissions[sectionToUpdate].access.view
    }
    if (selectedSection === 'edit') {
      updatedPermissions[sectionToUpdate].access.edit = !allUserPermissions[sectionToUpdate].access.edit
    }
    if (selectedSection === 'download') {
      updatedPermissions[sectionToUpdate].access.download = !updatedPermissions[sectionToUpdate].access.download
    }
    if (selectedSection === 'downloadWhatsapp') {
      updatedPermissions[sectionToUpdate].access.downloadWhatsapp = !updatedPermissions[sectionToUpdate].access.downloadWhatsapp
    }
    if (selectedSection === 'viewTimeLimit') {
      updatedPermissions[sectionToUpdate].access.viewTimeLimit = {label: selectedViewTimeLimit, value: selectedViewTimeLimit}
    }
    if (selectedSection === 'viewDataLimit') {
      const foundSection = updatedPermissions[sectionToUpdate].access.viewDataLimit
      const tableColumnToUpdate = foundSection.findIndex(column => column.id === viewDataLimitId)
      const updatedRestrictedTableColumns = [...foundSection]
      updatedRestrictedTableColumns[tableColumnToUpdate].selected = !foundSection[tableColumnToUpdate].selected
    }

    setUserPermissions(updatedPermissions)
  }

  const saveAndCloseDialog = () => {
    if (newUser.username === "" || newUser.password === "") {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog completează ambele câmpuri pentru *Username* si *Parolă*"
      })
      return
    } 
    
    if ( !newUser.username.match(EMAIL_REGEX) ) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Username-ul trebuie să conțină o adresă de e-mail validă"
      })
      return
    }

    if (newUser.role === "") {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Te rog selectează rolul noului cont."
      })
      return
    }

    const allSectionsPermissions = []
    userPermissions.forEach(section => {
      const viewAccess = section.access.view
      const editAccess = section.access.edit
      const downloadAccess = section.access?.download
      const downloadWhatsappAccess = section.access?.downloadWhatsapp
      allSectionsPermissions.push(viewAccess, editAccess, downloadAccess, downloadWhatsappAccess)
    })

    if (!allSectionsPermissions.includes(true)) {
      setSnackBar({
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
      role: newUser.role,
      permissions: userPermissions
    }

    dispatch(createDashboardUser(payload))
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
                onChange={handleGetUsernameAndPassword}
              />
              <TextField 
                type='text'
                name="password"
                label="PAROLĂ"
                value={newUser.password}
                onChange={handleGetUsernameAndPassword}
              />
              <div className='mt-5 d-flex flex-column'>
                <h6 className='m-0'>Rol User: </h6>

                { userRoles.map(role => (
                  <FormControl component="fieldset" key={nanoid(5)}>
                    <RadioGroup
                      aria-label="role"
                      name="role"
                      value={newUser.role}
                      onChange={handleSelectUserRole}>
                      <FormControlLabel 
                        value={role.name}
                        control={<Radio style={{color: 'green'}} />} 
                        label={role.name}
                      />
                    </RadioGroup>
                  </FormControl>
                ))}
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
                { userPermissions.map(page => {
                  const { access: { view, edit } } = page
                  return (
                    <>
                      <p className='m-0 fw-bold' key={nanoid(6)}> { page.label }: </p>
                      <div className='d-flex flex-column ms-4 mb-3'>
                        <FormControlLabel
                          key={nanoid(5)}
                          control={
                            <Checkbox
                              checked={view}
                              onChange={(event) => handleSelectPagesPermission(event, page.id)} 
                              name={'view'}
                              style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                            }
                          label="Vizualizare Sectiune"
                        />
                        <FormControlLabel
                          key={nanoid(5)}
                          control={
                            <Checkbox
                              checked={edit}
                              onChange={(event) => handleSelectPagesPermission(event, page.id)} 
                              name={'edit'}
                              style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                          }
                          label="Editare Sectiune"
                        />

                        { page.access.hasOwnProperty('download') &&
                          <FormControlLabel
                            key={nanoid(4)}
                            control={
                              <Checkbox
                                checked={page.access.download}
                                onChange={(event) => handleSelectPagesPermission(event, page.id)} 
                                name={'download'}
                                style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                              }
                            label="Export/Download CSV"
                          />
                        }
                        
                        { page.access.hasOwnProperty('downloadWhatsapp') &&
                          <FormControlLabel
                            key={nanoid(4)}
                            control={
                              <Checkbox
                                checked={page.access.downloadWhatsapp}
                                onChange={(event) => handleSelectPagesPermission(event, page.id)} 
                                name={'downloadWhatsapp'}
                                style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                              }
                            label="Export/Download CSV Nr. Tel. Whatsapp"
                          />
                        }

                        { page.access.hasOwnProperty('viewTimeLimit') &&
                          <div key={nanoid(4)}>
                            <label key={nanoid(9)} style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'", marginRight: 5 }}>
                              Vizualizare date pe (n) luni în urmă:
                            </label>
                            <NativeSelect
                              key={nanoid(8)}
                              value={page.access.viewTimeLimit.label}
                              name={'viewTimeLimit'}
                              onChange={(event) => handleSelectPagesPermission(event, page.id)}>

                              { viewTimeLimit.map(element => (
                                <option key={nanoid(3)} value={element.label} style={{textAlign: 'center'}}> 
                                  {element.label}
                                </option>
                              ))}

                            </NativeSelect>
                          </div>
                        }

                        { page.access.hasOwnProperty('viewDataLimit') &&
                          <div key={nanoid(4)}>
                            <p key={nanoid(9)} className='m-0' style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'"}}>
                              Vizualizare/Export restricționat pentru:
                            </p>

                            <div className='restricted-table-columns'>
                              <div className='show-restricted-columns' onClick={() => handleOpenSelectRestrictedColumns(page.id)}>
                                { page.access.viewDataLimit.map(element => (
                                    <>
                                      {element.selected && <span key={element.id}> {element.label} </span>}
                                    </>
                                  ))
                                }
                              </div>

                              { (selectRestrictedColumns.open && selectRestrictedColumns.sectionId === page.id) && 
                                <div className='select-columns'>
                                  { page.access.viewDataLimit.map(element => (
                                    <div key={element.id}
                                      name={'viewDataLimit'}
                                      onClick={(event) => handleSelectPagesPermission(event, page.id, element.id)}
                                      className={`data-element ${element.selected && 'selected'}`}>
                                      {element.label}
                                    </div>
                                  ))}
                                </div>
                              }
                            </div>
                          </div>
                        }
                      </div>
                    </>
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
