import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import { fetchSingleStudentByEmail } from '../../redux/actions/studentsActions';
import Button from '@material-ui/core/Button';
import SnackBar from "../ReusableComponents/SnackBar"

const SearchStudent = ({localStyles}) => {
  const dispatch = useDispatch()

  const [snackBar, setSnackBar] = useState({})
  const [studentEmail, setStudentEmail] = useState("")

  const handleGetStudentDataByEmail = () => {
    if (studentEmail === "") {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        text: "Te rog introdu adresa de e-mail a cursantului."
      })
      return
    }
    if ( !(studentEmail.includes("@", 1) && studentEmail.includes(".", 3)) ) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        text: "Format greșit al adresei de e-mail."
      })
      return
    }
    const payload = studentEmail.toLowerCase()
    dispatch(fetchSingleStudentByEmail({studentEmail: payload}))
    setStudentEmail("")
  }

  return (
    <div className='search-student'>
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
        />
        <Button
          variant='contained' 
          type="submit" 
          className={localStyles.submitButton}
          onClick={handleGetStudentDataByEmail}> 
          Caută cursant
        </Button>
  
      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default SearchStudent
