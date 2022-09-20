import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '1rem',
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
  },
  narrowTextfield: {
    width: '100px',
    marginBottom: '1rem',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'yellow'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  },
  addWord: {
    cursor: 'pointer',
    marginRight: '1rem'
  }
})

const TextWithLinkSection = ({ templateName, paragraphNumber, removeWord }) => {
  //********************************************//
  // Props explanations: 
  // templateName: String(constant value) representing the name of the Redux Reducer, containing the values needed to be rendered in this component
  // paragraphNumber: String representing the paragraph number from inside the Email template
  // removeWord: Redux action to dispatch to manipulate the store (removing items from the array)
  //********************************************//

  const localStyles = useStyles()
  const dispatch = useDispatch()

  const linkWordsList = useSelector(state => state[templateName].linkWords[paragraphNumber])

  const handleRemoveRow = wordId => dispatch(removeWord(wordId))

  return (
    <div className='words-with-links'>
      <div className='title'>Cuvinte cu link</div>
      { 
        linkWordsList.map((element, index) => {
          return (
            <div key={element.id} className='d-flex justify-content-between' style={{width: '280px'}}>
              <TextField
                autoComplete="off"
                variant='filled'
                type="text"
                style={{width: '120px'}}
                className={localStyles.textField}
                size="small" 
                label="Șir"
                id="logoSection.word"
                name="logoSection.word"
                value={element.word}
              />
          
              <TextField
                autoComplete="off"
                variant='filled'
                type="text"
                style={{width: '125px'}}
                className={localStyles.textField}
                size="small" 
                label="Link"
                id="logoSection.wordLink"
                name="logoSection.wordLink"
                value={element.link}
              />

              <DeleteForeverIcon 
                fontSize='medium'
                style={{color: 'white', cursor: 'pointer'}}
                onClick={() => handleRemoveRow(element.id)}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default TextWithLinkSection
