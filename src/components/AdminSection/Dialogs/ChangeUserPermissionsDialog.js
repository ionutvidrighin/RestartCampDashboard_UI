import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateDashboardUserPermissions,
  clearDashboardUserServerResponse } from '../../../redux/actions/dashboardUserAccountsActions'
import { makeStyles } from '@material-ui/styles';
import { userRoles, viewTimeLimit } from '../../../constants/userPermissions';
import { nanoid } from 'nanoid';
import pageAccessLogo from "../../../assets/change-access.png";
import Dialog from '@material-ui/core/Dialog';
import NativeSelect from '@material-ui/core/NativeSelect';
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

  const {id, username, role, permissions } = user 
  const [currentRole, setCurrentRole] = useState(userRoles)
  const [userPermissions, setUserPermissions] = useState(permissions)
  const [selectRestrictedColumns, setSelectRestrictedColumns] = useState({
    sectionId: null,
    open: false
  })
  const [snackBar, setSnackBar] = useState({})

  useEffect(() => {
    const updatedUserRolesList = []
    userRoles.forEach(({name}) => {
      if (name === role) {
        updatedUserRolesList.push({ name, selected: true })
      } else {
        updatedUserRolesList.push({ name, selected: false })
      }
    })
    setCurrentRole(updatedUserRolesList)
  }, [])


  const handleCloseDialog = () => {
    closeDialog(false)
  }

  const handleSelectUserRole = (event) => {
    const selectedRole = event.target.name
    
    let updatedRoles = currentRole.map(element => ({...element, selected: false}))
    updatedRoles = updatedRoles.map(role => {
      if (role.name === selectedRole) {
        return {...role, selected: true}
      }
      return role
    })
    setCurrentRole(updatedRoles)
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
    const newUserRole = currentRole.find(role => role.selected).name
    const newSectionsPermissions = []
    userPermissions.forEach(section => {
      const viewAccess = section.access.view
      const editAccess = section.access.edit
      const downloadAccess = section.access?.download
      const downloadWhatsappAccess = section.access?.downloadWhatsapp
      newSectionsPermissions.push(viewAccess, editAccess, downloadAccess, downloadWhatsappAccess)
    })

    if (!newSectionsPermissions.includes(true)) {
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
        role: newUserRole,
        permissions: userPermissions
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
          <div className='d-flex justify-content-end' onClick={handleCloseDialog}>
            <CancelRoundedIcon style={{cursor: 'pointer'}} />
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
            <h6 className='m-0 mb-3 mt-5'>Rol actual: </h6>
            { currentRole.map((role, index) => (
              <FormControl component="fieldset" key={index}>
                <RadioGroup
                  aria-label="roleName"
                  name={role.name}
                  value={role.selected}
                  onChange={(event) => handleSelectUserRole(event)}
                >
                  <FormControlLabel 
                    value={role.selected}
                    control={
                      <Radio
                        name={role.name}
                        checked={role.selected}
                        style={{color: 'green'}} 
                      />
                    } 
                    label={role.name}
                  />
                </RadioGroup>
              </FormControl>
            ))}
          </div>

          <div className={styles.pagesAccess}>
            <h6 className='text-center pt-2 pb-2'> Sectiuni cu acces: </h6>

            <div className={`ps-3 ${styles.pagesAccessWrapper}`}>
              { userPermissions.map(section => {
                const { access: { view, edit } } = section
                return (
                  <>
                    <p className='m-0 fw-bold' key={nanoid(6)}> { section.label }: </p>
                    <div className='d-flex flex-column ms-4 mb-3'>
                      <FormControlLabel
                        key={nanoid(5)}
                        control={
                          <Checkbox
                            checked={view}
                            onChange={(event) => handleSelectPagesPermission(event, section.id)} 
                            name={'view'}
                            style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                          }
                        label="Vizualizare Sectiune" />
                      <FormControlLabel
                        key={nanoid(5)}
                        control={
                          <Checkbox
                            checked={edit}
                            onChange={(event) => handleSelectPagesPermission(event, section.id)} 
                            name={'edit'}
                            style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                        }
                        label="Editare Sectiune" />

                      { section.access.hasOwnProperty('download') &&
                        <FormControlLabel
                          key={nanoid(4)}
                          control={
                            <Checkbox
                              checked={section.access.download}
                              onChange={(event) => handleSelectPagesPermission(event, section.id)} 
                              name={'download'}
                              style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                            }
                          label="Export/Download CSV"
                        />
                      }
                        
                      { section.access.hasOwnProperty('downloadWhatsapp') &&
                        <FormControlLabel
                          key={nanoid(4)}
                          control={
                            <Checkbox
                              checked={section.access.downloadWhatsapp}
                              onChange={(event) => handleSelectPagesPermission(event, section.id)} 
                              name={'downloadWhatsapp'}
                              style={{color: 'green', padding: '3px', marginLeft: '4px'}} />
                            }
                          label="Export/Download CSV Nr. Tel. Whatsapp"
                        />
                      }

                      { section.access.hasOwnProperty('viewTimeLimit') &&
                        <div key={nanoid(4)}>
                          <label key={nanoid(9)} style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'", marginRight: 5 }}>
                            Vizualizare date pe (n) luni în urmă:
                          </label>
                          <NativeSelect
                            key={nanoid(8)}
                            value={section.access.viewTimeLimit.label}
                            name={'viewTimeLimit'}
                            onChange={(event) => handleSelectPagesPermission(event, section.id)}>

                            { viewTimeLimit.map(element => (
                              <option key={nanoid(3)} value={element.label} style={{textAlign: 'center'}}> 
                                {element.label}
                              </option>
                            ))}

                          </NativeSelect>
                        </div>
                      }

                      { section.access.hasOwnProperty('viewDataLimit') &&
                        <div key={nanoid(4)}>
                          <p key={nanoid(9)} className='m-0' style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'"}}>
                            Vizualizare/Export restricționat pentru:
                          </p>

                          <div className='restricted-table-columns'>
                            <div className='show-restricted-columns' onClick={() => handleOpenSelectRestrictedColumns(section.id)}>
                              { section.access.viewDataLimit.map(element => (
                                  <>
                                    {element.selected && <span key={element.id}> {element.label} </span>}
                                  </>
                                ))
                              }
                            </div>

                            { (selectRestrictedColumns.open && selectRestrictedColumns.sectionId === section.id) && 
                              <div className='select-columns'>
                                { section.access.viewDataLimit.map(element => (
                                  <div key={element.id}
                                    name={'viewDataLimit'}
                                    onClick={(event) => handleSelectPagesPermission(event, section.id, element.id)}
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
