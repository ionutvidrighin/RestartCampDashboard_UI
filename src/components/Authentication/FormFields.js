import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  textField: {
    "& .MuiOutlinedInput-multiline": {
      padding: '10px !important'
    },
    "& .MuiInputBase-input": {
      height: '60px !important'
    },
    "& .MuiInputBase-root": {
      fontSize: '.7rem !important'
    }
  }
})

const EmailTextField = (props) => (
  <TextField
    {...props}
    className={''}
    fullWidth={true}
    label="E-mail"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon style={{color: '#e43d6f'}} />
        </InputAdornment>
      )
    }} 
  />
)

const PasswordTextField = (props) => (
  <TextField
    {...props}
    className={''}
    fullWidth={true}
    label="Parolă"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon style={{color: '#e43d6f'}} />
        </InputAdornment>
      )
    }
  } 
  />
)

const AccessTokenTextField = (props) => {
  const styles = useStyles()
  return (
    <TextField
    {...props} 
    className={styles.textField}
    fullWidth={true}
    multiline={true}
    maxRows={2}
    minRows={2}
    variant="outlined"
    InputProps={{
      startAdornment: (
          <InputAdornment position="start">
            <VpnKeyIcon style={{color: '#e43d6f'}} />
          </InputAdornment>
        )
      }
    } 
  />
  )
}

export { EmailTextField, PasswordTextField, AccessTokenTextField }