import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { doesUserHavePermission } from '../../utils/helperFunctions';
import { makeStyles } from '@material-ui/styles';
import { clearUnscribeOrRemoveStudentState } from "../../redux/actions/unsubscribeOrRemoveStudentActions";
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../components/NoAccessPage';
import SearchStudentSection from '../../components/UnsubscribeStudent/SearchStudentSection';
import SearchedStudentSection from '../../components/UnsubscribeStudent/SearchedStudentSection';

const useStyles = makeStyles({
  textField: {
    width: '100%',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiInputBase-root": {
      color: 'black'
    }
  },
  submitButton: {
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  },
})

const DezabonareCursanti = ({setShowPlaceholder}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)

    // reset server response + clear state when leaving the page
    return () => dispatch(clearUnscribeOrRemoveStudentState())
  }, [])

  return (
    <> 
      { userHasPermission ?
        <div className='dezabonare-cursanti'>

          <div className='top-section'>
            <h6>DEZABONARE / ȘTERGERE CURSANȚI</h6>
            <p className='m-0 fw-bold'>!!!</p>
            <p className='m-0'>
              Dezabonarea unui cursant se va efectua prin înlocuirea adresei sale de e-mail în baza de date, cu o adresa de e-mail fictivă, sub forma: 
              <br />
              <span style={{color: 'black', fontWeight: 'bold'}}> FAKE_EMAIL_ADDRESS@replaced.r </span>
            </p>

            <br />

            <p className='m-0 fw-bold'>!!!</p>
            <p className='m-0'>
              Cererea cursantului de ștergere a datelor sale personale (conform GDPR) din baza de date, se va efectua prin înlocuirea datelor sale personale, cu date fictive, pentru a nu impacta negativ datele statistice pe termen lung.
            </p>
          </div>

          <Divider style={{background: 'black'}} />

          <div className='bottom-section'>
            <SearchStudentSection localStyles={localStyles} />
            <SearchedStudentSection />
          </div>
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default DezabonareCursanti
