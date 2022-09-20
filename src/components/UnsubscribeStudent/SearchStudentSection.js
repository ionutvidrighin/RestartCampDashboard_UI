import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux";
import { getStudentNameAndEmail } from './helperMethods';
import Button from '@material-ui/core/Button';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import UnsubscribeStudentDialog from './UnsubscribeStudentDialog';
import DeleteStudentDialog from './DeleteStudentDialog';
import { searchStudentForUnsubscribeByEmail, 
  searchStudentForUnsubscribeByName } from '../../redux/actions/unsubscribeOrRemoveStudentActions';
import SnackBar from "../ReusableComponents/SnackBar"

const SearchStudentSection = ({localStyles}) => {
  const dispatch = useDispatch()

  const [snackBar, setSnackBar] = useState({})
  const [studentEmail, setStudentEmail] = useState("")
  const [studentName, setStudentName] = useState("")
  const [unsubscribeStudent, setUnsubscribeStudent] = useState(false)
  const [deleteStudent, setDeleteStudent] = useState(false)

  const studentData = useSelector(state => state.unsubscribeOrRemoveStudentReducer.studentData)
  const studentNameAndEmail = getStudentNameAndEmail(studentData)

  const handleGetStudentDataByEmail = () => {
    if (studentEmail === "") {
      setSnackBar({
        ...snackBar,
        background: '#ff564a', 
        open: true,
        success: false,
        text: "Te rog introdu adresa de e-mail a cursantului."
      })
      return
    }
    if ( !(studentEmail.includes("@", 1) && studentEmail.includes(".", 3)) ) {
      setSnackBar({
        ...snackBar,
        background: '#ff564a', 
        open: true,
        success: false,
        text: "Format greșit al adresei de e-mail."
      })
      return
    }
    dispatch(searchStudentForUnsubscribeByEmail({studentEmail}))
    setStudentEmail("")
  }

  const handleGetStudentDataByName = () => {
    if (studentName === "") {
      setSnackBar({
        ...snackBar,
        background: '#ff564a', 
        open: true,
        success: false,
        text: "Te rog introdu adresa de e-mail a cursantului."
      })
      return
    }
    dispatch(searchStudentForUnsubscribeByName({studentName}))
    setStudentName("")
  }

  return (
    <div className='search-student d-flex flex-column'>
      <div className='d-flex'>
        <PermDataSettingIcon />
        <h6 className='ms-3'> CAUTĂ CURSANT </h6>
      </div>

      <div className='search-student-options d-flex align-items-center justify-content-center'>
        { !(studentName.length > 1) &&
          <div className="search-by-email d-flex flex-column align-items-center">
            <h6 className='search-option-title'>Pentru Dezabonare</h6>
            <TextField
              autoComplete="off"
              variant='filled'
              type="text"
              className={`${localStyles.textField} mt-2`}
              size="small" 
              label="Adresă e-mail cursant"
              value={studentEmail}
              onChange={e => setStudentEmail(e.target.value)}
            />
            <Button
              variant='contained' 
              type="submit" 
              className={localStyles.submitButton}
              onClick={handleGetStudentDataByEmail}> 
              Caută cursant
            </Button>
          </div>
        }
        { !(studentEmail.length > 1) &&
          <div className="search-by-name ms-2 d-flex flex-column align-items-center"> 
            <h6 className='search-option-title'>Pentru Ștergere</h6>
            <TextField
              autoComplete="off"
              variant='filled'
              type="text"
              className={`${localStyles.textField} mt-2`}
              size="small" 
              label="Nume și Prenume cursant"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <Button
              variant='contained' 
              type="submit" 
              className={localStyles.submitButton}
              onClick={handleGetStudentDataByName}> 
              Caută cursant
            </Button>
          </div>
        }
      </div>

      {/* Reveal the Action Buttons if there's Student Data in Store */}
      { Object.keys(studentData).length !== 0 && !studentData.hasOwnProperty('error') &&
        <div className='unsubscribe-or-remove-action'>
          <Button
            variant='contained' 
            type="submit"
            className={localStyles.submitButton}
            onClick={() => {
              setUnsubscribeStudent(true)
              setDeleteStudent(false)
            }}> 
            Dezabonează cursant
          </Button>
          <Button
            variant='contained' 
            type="submit" 
            className={localStyles.submitButton}
            onClick={() => {
              setUnsubscribeStudent(false)
              setDeleteStudent(true)
            }}> 
            Șterge cursant
          </Button>
        </div>
      }

      { unsubscribeStudent && 
        <UnsubscribeStudentDialog 
          openDialog={unsubscribeStudent}
          setOpenDialog={setUnsubscribeStudent}
          studentNameAndEmail={studentNameAndEmail}
        /> 
      }

      { deleteStudent &&
        <DeleteStudentDialog 
          openDialog={deleteStudent}
          setOpenDialog={setDeleteStudent}
          studentNameAndEmail={studentNameAndEmail}
        /> 
      }

      { snackBar.open &&
        <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} />
      }

    </div>
  )
}

export default SearchStudentSection
