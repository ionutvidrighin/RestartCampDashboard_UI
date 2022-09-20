import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    '& .MuiDialog-paperWidthSm': {
      width: 500,
      height: 600,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: 15,
      position: 'relative'
    }
  },
  header: {
    borderBottom: '1px solid #cfcfcf',
    backgroundColor: '#e1e2e3'
  },
  closeDialogIcon: {
    color: 'black',
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    top: 10
  }
})

const PageInstructionsDialog = ({openDialog, closeDialog, Component}) => {
  const styles = useStyles()

  const handleCloseDialog = () => {
    closeDialog(false)
  }

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openDialog} className={styles.container}>
      <div className={styles.header}>
        <h6 className='fw-bold mt-3 text-center'> INSTRUCȚIUNI OPERARE PAGINĂ </h6>
        <CancelRoundedIcon className={styles.closeDialogIcon} onClick={handleCloseDialog} />
      </div>
      <p className='m-0 p-1 pe-2 ps-2 text-center'>
      Pentru o editare de success a conținutului, este esențială citirea cu atenție și urmarea cu strictețe a instrucțiunilor de mai jos
      </p>

      <div className='instructions-container' style={{width: '100%', height: '100%'}}>
        { <Component/> }
      </div>
    </Dialog>
  )
}

export default PageInstructionsDialog