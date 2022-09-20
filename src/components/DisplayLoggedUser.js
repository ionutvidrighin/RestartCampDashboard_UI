import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { capitalizeWord, isAdmin, displayAccountTypeIcon } from "../utils/helperFunctions";
import Avatar from '@material-ui/core/Avatar';

const DisplayLoggedUser = () => {

  const getUserFromStore = useSelector(state => state.authReducer.username)
  const getUserAccessFromStore = useSelector(state => state.authReducer.access)
  const [accountTypeIcon, setAccountTypeIcon] = useState("")

  useEffect(() => {
    setAccountTypeIcon(displayAccountTypeIcon(getUserAccessFromStore))
  }, [])

  return (
    <div className="d-flex align-items-center pb-3 pt-3 ps-2" style={{width: '100%', position: 'relative'}}>
      <Avatar style={{backgroundColor: '#509ecc'}}> { getUserFromStore.charAt(0).toUpperCase() } </Avatar>

      <div className="d-flex flex-column p-0 ms-2 mb-0 fs-6 fw-bold">
        <p className='m-0'> Bun venit,
          <span className="ms-2" style={{color: 'white'}}>
            { capitalizeWord(getUserFromStore) }
          </span>
        </p>
        <p className='m-0' style={{ color: isAdmin(getUserAccessFromStore) && "#e66cb1" }}> ({ getUserAccessFromStore }) </p>
      </div>

      <div style={{ 
        position: 'absolute', 
        top: 12, 
        right: 3, 
        padding: '.8rem' ,
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0px 0px 26px -6px rgba(0,0,0,0.75)'
      }}>
        <img src={accountTypeIcon} alt="account-type-icon" style={{width: 30}} />
      </div>
    </div>
  )
}

export default DisplayLoggedUser