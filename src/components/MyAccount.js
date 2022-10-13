import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut, clearAllState } from '../redux/actions/authenticationActions';
import { isAdmin } from '../utils/helperFunctions';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
  myAccountBtn: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#c23a6a'
    }
  },
  myAccountIcon: {
    width: '100% !important',
    "&:hover": {
      backgroundColor: 'rgba(255, 255, 255, 0.3);'
    },
    "&.MuiButtonBase-root": {
      "&:hover": {
        color: 'white'
      },
      justifyContent: 'flex-start'
    },
    "&.MuiButton-label": {
      textAlign: 'left'
    }
  }
})

const MyAccount = () => {
  const dispatch = useDispatch()
  const localStyles = useStyles()
  const history = useHistory()

  const [showProfileAccountMenu, setShowProfileAccountMenu] = useState(false)
  const getUserAccessFromStore = useSelector(state => state.authReducer.role)

  const logout = () => {
    dispatch(logUserOut())
    dispatch(clearAllState())
    history.push('/') 
    setShowProfileAccountMenu(!showProfileAccountMenu)
  }

  return (
    <>
      <Button
        aria-controls="fade-menu" 
        aria-haspopup="true" 
        onClick={() => setShowProfileAccountMenu(!showProfileAccountMenu)}
        size="small"
        color="secondary"
        className={`account-profile-btn ${localStyles.myAccountBtn}`}
        variant="contained"
        startIcon={<AccountBoxIcon className={localStyles.myAccountIcon} />} 
        >
      Contul Meu
      </Button>

      { showProfileAccountMenu && 
        <Paper elevation={5} className='profile-acccount-menu'>
          { isAdmin(getUserAccessFromStore) &&
            <Button
              onClick={() =>  {history.push('/sectiune-admin'); setShowProfileAccountMenu(!showProfileAccountMenu)} }
              startIcon={<SupervisorAccountIcon />}
              className={localStyles.myAccountIcon}
            > 
            <span className='fw-bold' style={{color: 'white'}}>
              Sectiune ADMIN
            </span>
            </Button>
          }
          
          <Button
            onClick={() =>  {history.push('/schimbare-parola'); setShowProfileAccountMenu(!showProfileAccountMenu)} }
            startIcon={<LockTwoToneIcon />}
            className={localStyles.myAccountIcon}
          >
            Schimba Parola
          </Button>
          <Button
            onClick={() => { history.push('/schimbare-email'); setShowProfileAccountMenu(!showProfileAccountMenu)} }
            startIcon={<MailTwoToneIcon />}
            className={localStyles.myAccountIcon}
          >
            Schimba Adresa Mail
          </Button>
          <Button
            onClick={logout}
            startIcon={<ExitToAppRoundedIcon />}
            className={localStyles.myAccountIcon}
          >
            Deconectare
          </Button>
        </Paper>
      }
    </> 
  )
}

export default MyAccount
