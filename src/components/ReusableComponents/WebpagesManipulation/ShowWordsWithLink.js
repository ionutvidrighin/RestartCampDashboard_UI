import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '.5rem',
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
      color: 'white'
    }
  }
})

const ShowWordsWithLink = ({editPermission, data, removeWordAction, objectKeyLocation, paragraphNumber}) => {
  /** Props Explanation:
   * data -> type Array of Objects [{id: '', word: '', link: ''}] to be rendered in this component
   * removeWordAction -> type Function; Redux Action to remove the element from the Store
   * objectKeyLocation -> type String; represents the key name inside the Object where we remove the element
   * paragraphNumber -> type String; represents the key name inside the above "objectKeyLocation" where we remove the element 
   */

  const localStyles = useStyles()
  const dispatch = useDispatch()

  const handleRemoveRow = wordId => {
    const payload = {
      wordId, 
      location: objectKeyLocation,
      paragraphNumber
    }
    dispatch(removeWordAction(payload))
  }

  return (
    <div className='words-with-links'>
      { data && data.length !== 0 &&
        <>
          <p className='title m-0'> Cuvinte cu link </p>
          { data.map((element, index) => {
              return (
                <div key={element.id} className='d-flex justify-content-between align-items-center' style={{width: '260px'}}>
                  <span className='me-1 fw-bold' style={{color: 'white', fontSize: '.8rem'}}>
                    {index + 1}
                  </span>
                  <TextField
                    autoComplete="off"
                    variant='filled'
                    type="text"
                    style={{width: '120px'}}
                    className={`${localStyles.textField} me-1`}
                    size="small" 
                    label="Cuvânt"
                    id='element'
                    name="element"
                    value={element.word}
                    disabled={editPermission}
                  />
              
                  <TextField
                    autoComplete="off"
                    variant='filled'
                    type="text"
                    style={{width: '125px'}}
                    className={localStyles.textField}
                    size="small" 
                    label="Link"
                    id="element.link"
                    name="element.link"
                    value={element.link}
                    disabled={editPermission}
                  />

                  { !editPermission &&
                    <DeleteForeverIcon 
                      fontSize='medium'
                      style={{color: 'white', cursor: 'pointer', alignSelf: 'flex-start'}}
                      onClick={() => handleRemoveRow(element.id)}
                    />
                  }
                </div>
              )
            })
          }
        </>
      }
    </div>
  )
}

export default ShowWordsWithLink
