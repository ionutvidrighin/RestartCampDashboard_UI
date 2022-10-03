import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { clearStudentData } from '../../../redux/actions/studentsActions/searchStudent';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import SearchStudentSection from '../../../components/SearchStudentData/SearchStudentSection';
import SearchedStudentSection from '../../../components/SearchStudentData/SearchedStudentSection';

const useStyles = makeStyles({
  textField: {
    width: '100%',
    marginBottom: '.5rem !important',
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

const CautaCursantInscris = ({setShowPlaceholder}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)

    // clear Student Data store at component destroy
    return () => dispatch(clearStudentData())
  }, [])

  return (
    <>
      { userHasPermission ?
        <div className='administrare-cursanti'>
          <div className='d-flex cauta-cursant-inscris'>
            <div className='search-student-section'>
              <h6 className='ms-3 page-title'> CAUTĂ CURSANT </h6>

              <Divider style={{background: 'white'}} className='mt-3 mb-4' />

              <SearchStudentSection localStyles={localStyles} />
            </div>

            <div className='show-searched-student-section'>
              <SearchedStudentSection />
            </div>
          </div>
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default CautaCursantInscris