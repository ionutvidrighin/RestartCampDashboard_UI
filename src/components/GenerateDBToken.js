import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGenerateDBTokenDialog, generateDataBaseToken } from '../redux/actions/generateDBToken';
import { motion } from "framer-motion";
import backgroundImage from '../assets/db-access-background.png';
import successCheckmark from '../assets/success-checkmark.png';
import errorCross from '../assets/error-cross.png';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import successTone from '../assets/ringtones/success-token.mp3';
import errorTone from '../assets/ringtones/error-token.mp3';

const GenerateDBToken = () => {
  const dispatch = useDispatch()
  const successToneRef = useRef(null)
  const errorToneRef = useRef(null)

  const currentlyLoggedUser = useSelector(state => state.authReducer.username)
  const DBtoken = useSelector(state => {
    return {
      isGenerated: state.generateDBTokenReducer.isTokenGenerated,
      tokenValue: state.generateDBTokenReducer.value,
      error: state.generateDBTokenReducer?.error
    }
  })
  const { isGenerated, tokenValue, error } = DBtoken

  const handleCloseDialog = () => dispatch(toggleGenerateDBTokenDialog())
  const handleGenerateToken = () => dispatch(generateDataBaseToken(currentlyLoggedUser))

  useEffect(() => {
    if (isGenerated && tokenValue !== null) {
      successToneRef.current.play()
    }
    if (!isGenerated && error) {
      errorToneRef.current.play()
    }
  }, [isGenerated])


  return (
    <div className='generate-db-token-overlay'>
      <div className='generate-token-box d-flex flex-column align-items-center'>
        <img src={backgroundImage} alt="background" className='generate-token-bg-img'/>
        <div className='d-flex align-self-end pe-1 pt-1' style={{zIndex: 1}}>
          <CancelRoundedIcon style={{color: 'black', cursor: 'pointer'}} onClick={handleCloseDialog} />
        </div>

        <div className='generate-token-container'>
          { (isGenerated && !error) &&
            <>
              <Button variant="contained" className='success-granted-banner'>
                Acum ai acces la baza de date !
              </Button>

              <motion.div initial={{y: 500, scale: 0.1}} animate={{rotate: 360, y: 0, scale: 1.5}} transition={{duration: .5}}>
                <motion.div animate={{scale: [1, 1.2, 1, 1.2, 1, 1]}} transition={{delay: .5}}>
                  <img src={successCheckmark} alt="error-cross" className='success-checkmark' />
                </motion.div>
              </motion.div>
            </>
          }

          { (!isGenerated && !error) &&
            <Button 
              onClick={handleGenerateToken}
              size="small"
              className="generate-token-all-routes-btn"
              variant="contained">
            Genereaza Token Access Baza de Date
            </Button>
          }

          { (!isGenerated && error) &&
            <>
              <Button variant="contained" className='db-token-error-banner'>
                { error }
              </Button>

              <motion.div initial={{y: 500, scale: 0.1}} animate={{rotate: 360, y: 0, scale: 1.5}} transition={{duration: .5}}>
                <motion.div animate={{scale: [1, 1.2, 1, 1.2, 1, 1]}} transition={{delay: .5}}>
                  <img src={errorCross} alt="success-checkmark" className='error-cross' />
                </motion.div>
              </motion.div>

              <Button 
                onClick={handleGenerateToken}
                size="small"
                className="generate-token-all-routes-btn"
                style={{position: 'absolute', bottom: '5px'}}
                variant="contained">
              Re-Genereaza Token Access Baza de Date
              </Button>
            </>
          }
        </div>

        <audio ref={successToneRef}>
          <source src={successTone} type="audio/mp3" />
        </audio>
        
        <audio ref={errorToneRef}>
          <source src={errorTone} type="audio/mp3" />
        </audio>
      </div>
    </div>
  )
}

export default GenerateDBToken