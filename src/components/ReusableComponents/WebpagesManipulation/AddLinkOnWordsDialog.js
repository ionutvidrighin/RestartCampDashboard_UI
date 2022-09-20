import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import SnackBar from '../SnackBar';
import { nanoid } from 'nanoid';

const AddLinkOnWordsDialog = ({openDialog, closeDialog, storeDataAction, objectKeyLocation, childObjectKey}) => {
  /** Props Explanation:
   * storeDataAction -> type Function; Redux Action to add the element to the Store
   * objectKeyLocation -> type String; represents the key name inside the Object where we add the element
   * childObjectKey -> type String; represents the key name inside the above "objectKeyLocation" where we add the element 
   */

  const dispatch = useDispatch()

  const [wordsWithLink, setWordsWithLink] = useState({})
  const [snackBar, setSnackBar] = useState({})

  const handleCloseDialog = () => {
    closeDialog(false)
    setWordsWithLink({})
  }

  const handleChangeDialogInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setWordsWithLink(values => ({...values, [name]: value, id: nanoid(4)}))
  }

  const saveAndCloseDialog = () => {
    if (Object.keys(wordsWithLink).length < 3) {
      setSnackBar({
        ...snackBar,
        background: '#ff564a', 
        open: true,
        success: false,
        text: "Te rog completeaza ambele câmpuri"
      })
    } else {
      if (wordsWithLink.word === "" || wordsWithLink.link === "") {
        setSnackBar({
          ...snackBar,
          background: '#ff564a', 
          open: true, 
          success: false,
          text: "Te rog completeaza ambele câmpuri"
        })
        return
      } 
      if (!wordsWithLink.link.includes('https://')) {
        setSnackBar({
          ...snackBar,
          background: '#ff564a', 
          open: true, 
          success: false,
          text: "Format link incorect. Asigura-te ca este sub forma 'https://adresalink.com' sau 'http://adresalink.com'"
        })
        return
      }
      closeDialog(false)
      const payload = {
        data: wordsWithLink,
        location: objectKeyLocation,
        childLocation: childObjectKey
      }
      dispatch(storeDataAction(payload))
      setWordsWithLink({})
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

export default AddLinkOnWordsDialog
