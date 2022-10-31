import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  button: {
    color: 'white',
    margin: '.4rem 0',
    width: ({width}) => width ? width : '250px',
    padding: '6px',
    backgroundColor: '#509ecc',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#509ecc',
    }
  }
}) 

const ApplicationSubMenuButton = ({ appRoute, buttonLabel, buttonWidth }) => {
  const localStyles = useStyles({width: buttonWidth})
  const history = useHistory()
  const route = useLocation()
  const { pathname } = route

  const handleOnClick = () => history.push(appRoute)

  return (
    <Button
      variant="contained"
      className={localStyles.button}
      style={ (pathname === appRoute) ? { background: '#c23a6a'} : {background: ''} }
      onClick={handleOnClick} > 
      { buttonLabel }
    </Button>
  )
}

export default ApplicationSubMenuButton