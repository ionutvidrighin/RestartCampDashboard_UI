import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import NoAccessPage from '../../../components/NoAccessPage';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/dayjs';

const useStyles = makeStyles({
  textFiled: {
    width: '250px',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiInputLabel-animated, .MuiInputBase-root": {
      color: 'white !important'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
  },
  datePicker: {
    marginRight: '.3rem',
    '& .MuiInputLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-input': {
      color: 'white'
    }
  },
  button: {
    height: '2.2rem',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#509ecc'
    },
    marginLeft: '.5rem'
  }
})

const InscriereCursantiModul2 = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => setShowPlaceholder(false), [])
  
  const [ addRow, setAddRow ] = useState([
    {
      id: nanoid(3),
      fullName: '',
      emailAddress: '',
      courseName: '',
      date: new Date()
    }
  ])
  const [popUpDialog, setPopUpDialog] = useState({})

  const handleAddNewRow = () => {
    setAddRow([...addRow, {
        id: nanoid(3),
        fullName: '',
        emailAddress: '',
        courseName: '',
        date: new Date()
    }])
  }

  const handleRemoveRow = (rowId) => {
    if (addRow.length === 1) return
    setAddRow(addRow.filter(item => item.id !== rowId))
  }

  const updateFullName = (id, newValue) => {
    let updatedRow = addRow.map(row => {
      if (row.id === id) {
        return {...row, fullName: newValue }
      }
      return row
    })
    setAddRow(updatedRow)
  }

  const updateEmailAddress = (id, newValue) => {
    let updatedRow = addRow.map(row => {
      if (row.id === id) {
        return {...row, emailAddress: newValue }
      }
      return row
    })
    setAddRow(updatedRow)
  }

  const updateCourseName = (id, newValue) => {
    let updatedRow = addRow.map(row => {
      if (row.id === id) {
        return {...row, courseName: newValue }
      }
      return row
    })
    setAddRow(updatedRow)
  }

  const updateRegistrationDate = (id, newValue) => {
    let updatedRow = addRow.map(row => {
      if (row.id === id) {
        return {...row, date: newValue }
      }
      return row
    })
    setAddRow(updatedRow)
  }

  const handleStoreStudents = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let values = []

    addRow.forEach(row => {
      const emailAddressValue = row.emailAddress 
      Object.values(row).forEach(elem => values.push(elem))

      if (!emailAddressValue.match(emailRegex)) {
        setPopUpDialog({
          open: true, 
          text: "Eroare! Format greşit al adresei de e-mail.",
          background: '#e53c5d'
        })
        return
      }
    })

    if (values.includes('')) {
      setPopUpDialog({
        open: true, 
        text: "Eroare! Unul sau mai multe câmpuri nu sunt completate.",
        background: '#e53c5d'
      })
      return
    }
  }

  return (
    <>
      { userHasPermission ?
        <div className='inscriere-cursanti-modul2'>
          <h4 className='text-center'>Înscriere cursanți MODUL 2</h4>

          <div className='add-student-container'>
            { addRow.map( element => (
              <div key={element.id} className='ms-3 d-flex justify-content-start align-items-center'>
                <DeleteForeverIcon className="add-remove-row" onClick={() => handleRemoveRow(element.id)} />
                <AddBoxIcon className="add-remove-row me-2" onClick={handleAddNewRow} />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={localStyles.datePicker}
                    disableToolbar
                    variant="inline"
                    format="DD/MM/YYYY"
                    label="Data înscrierii"
                    value={element.date}
                    onChange={e => updateRegistrationDate(element.id, e.$d.toString()) }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>

                <TextField
                  autoComplete="off"
                  variant='filled'
                  type="input"
                  className={`${localStyles.textFiled} mt-3 me-1`}
                  size="small" 
                  label="Nume complet"
                  onChange={e => updateFullName(element.id, e.target.value)}
                />
          
                <TextField
                  autoComplete="off"
                  variant='filled'
                  type="input"
                  className={`${localStyles.textFiled} mt-3 me-1`}
                  size="small" 
                  label="Adresa e-mail"
                  onChange={e => updateEmailAddress(element.id, e.target.value)}
                />
          
                <TextField
                  autoComplete="off"
                  variant='filled'
                  type="input"
                  className={`${localStyles.textFiled} mt-3`}
                  size="small" 
                  label="Denumire curs MODUL 2"
                  onChange={e => updateCourseName(element.id, e.target.value)}
                />
              </div>
            ))}

            <SnackBar snackbarData={popUpDialog} setSnackBar={setPopUpDialog} />
          </div>
          <Button
            variant='contained'
            onClick={handleStoreStudents}
            className={localStyles.button}>
              Confirm înscrierea
          </Button>
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default InscriereCursantiModul2
