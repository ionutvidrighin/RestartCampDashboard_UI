import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGenerateDBTokenDialog } from '../redux/actions/generateDBToken';
import { motion } from 'framer-motion'
import Button from '@material-ui/core/Button';
import databaseIcon from "../assets/database-icon.png";

const AccessDataBaseButton = () => {
  const dispatch = useDispatch()

  const isButtonVisible = useSelector(state => {
    return {
      isDialogOpen: state.generateDBTokenReducer.isDialogOpen,
      isTokenGenerated: state.generateDBTokenReducer.isTokenGenerated
    }
  })
  const { isDialogOpen, isTokenGenerated } = isButtonVisible


  return (
    <>
      { (!isDialogOpen && !isTokenGenerated) &&
        <motion.div animate={{scale: [0.9, 1, 0.9, 1, 0.9]}} transition={{duration: 1.2, repeat: Infinity}}>
          <Button
            aria-controls="fade-menu" 
            aria-haspopup="true" 
            onClick={() => dispatch(toggleGenerateDBTokenDialog())}
            size="small"
            className="generate-db-token-btn"
            variant="contained"
            startIcon={<img className="generate-token-icon" src={databaseIcon} alt="" />} 
            >
          Activeaza Accesul la Baza de Date
          </Button>
        </motion.div>
      }
    </>
  )
}

export default AccessDataBaseButton