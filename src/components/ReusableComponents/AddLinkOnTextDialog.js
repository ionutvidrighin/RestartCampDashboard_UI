import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import SnackBar from './SnackBar';
import { nanoid } from 'nanoid';

const AddLinkOnTextDialog = ({openDialog, setOpenDialog, addLinkWords}) => {
  /**
   * Props explanation:
   * openDialog - Boolean value deciding if Dialog is open or closed
   * setOpenDialog - Manipulate the Boolean value above
   * addLinkWords - the actual Redux Action to be dispatched that stores to values to Store, in Object form
   *     {id: "", word: "", link: "https://"  } 
   */
  const dispatch = useDispatch()

  const [linkWords, setLinkWords] = useState({})
  const [snackBar, setSnackBar] = useState({})

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setLinkWords({})
  }

  const handleChangeDialogInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLinkWords(values => ({...values, [name]: value, id: nanoid(3)}))
  }

  const saveAndCloseDialog = () => {
    if (Object.keys(linkWords).length < 3) {
      setSnackBar({
        ...snackBar,
        background: '#ff564a', 
        open: true, 
        text: "Te rog completeaza ambele câmpuri"
      })
    } else {
      if (linkWords.word === "" || linkWords.link === "") {
        setSnackBar({
          ...snackBar,
          background: '#ff564a', 
          open: true, 
          text: "Te rog completeaza ambele câmpuri"
        })
        return
      } 
      if (!linkWords.link.includes('https://')) {
        setSnackBar({
          ...snackBar,
          background: '#ff564a', 
          open: true, 
          text: "Format link incorect. Asigura-te ca este sub forma 'https://adresalink.com' sau 'http://adresalink.com'"
        })
        return
      }
      setOpenDialog(false)
      dispatch(addLinkWords(linkWords))
      setLinkWords({})
    }
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
        <div className='p-3' style={{width: '300px'}}>
          <div className='d-flex justify-content-between'>
            <h6>Adaugă cuvânt cu link: </h6>
            <CancelRoundedIcon onClick={handleCloseDialog} style={{cursor: 'pointer'}} />
          </div>
          <div className='d-flex flex-column'>
            <TextField
              type='text'
              name="word"
              label="Cuvânt/Șir Cuvinte" 
              onChange={handleChangeDialogInputs}
            />
            <TextField 
              type='text'
              name="link"
              label="Link" 
              onChange={handleChangeDialogInputs}
            />
            <Button autoFocus onClick={saveAndCloseDialog} className='mt-2 fw-bold'>
              Adaugă
            </Button>
          </div>
        </div>
      </Dialog>

      { snackBar.open &&
        <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} />
      }

    </div>
  )
}

export default AddLinkOnTextDialog
