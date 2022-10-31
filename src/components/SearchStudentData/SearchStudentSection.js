import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import { fetchSingleStudentByEmail, 
  fetchSingleStudentByFullName } from '../../redux/actions/studentsActions';
import Button from '@material-ui/core/Button';
import SnackBar from "../ReusableComponents/SnackBar"

const SearchStudentSection = ({localStyles, editPermission}) => {
  const dispatch = useDispatch()

  const [snackBar, setSnackBar] = useState({})
  const [studentEmail, setStudentEmail] = useState("")
  const [studentName, setStudentName] = useState("")

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
        background: '#e53c5d',
        open: true,
        success: false,
        text: "Format greșit al adresei de e-mail."
      })
      return
    }
    const payload = studentEmail.toLowerCase()
    dispatch(fetchSingleStudentByEmail({studentEmail: payload}))
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
    const payload = studentName.toUpperCase()
    dispatch(fetchSingleStudentByFullName({studentName: payload}))
    setStudentName("")
  }

  return (
    <div className='searching-criteria'>
      <div className="search-by-email ms-4 me-4 d-flex flex-column">
        <h6 className='mb-0 search-option-title text-left'>Căutare după adresa de email:</h6>
        <TextField
          autoComplete="off"
          variant='filled'
          type="text"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Adresă e-mail cursant"
          value={studentEmail}
          onChange={e => setStudentEmail(e.target.value)}
          disabled={editPermission}
        />
        <Button
          variant='contained' 
          type="submit" 
          className={localStyles.submitButton}
          onClick={handleGetStudentDataByEmail}
          disabled={editPermission}> 
          Caută cursant
        </Button>
      </div>

      <div className="search-by-name ms-4 me-4 d-flex flex-column"> 
        <h6 className='search-option-title mb-0'>Căutare după nume:</h6>
        <TextField
          autoComplete="off"
          variant='filled'
          type="text"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Nume și Prenume cursant"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          disabled={editPermission}
        />
        <Button
          variant='contained' 
          type="submit" 
          className={localStyles.submitButton}
          onClick={handleGetStudentDataByName}
          disabled={editPermission}> 
          Caută cursant
        </Button>
      </div>
  
      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default SearchStudentSection
