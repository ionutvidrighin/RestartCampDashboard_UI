import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { storeLinkWordsEmailReminder1HourPar1,
         storeLinkWordsEmailReminder1HourPar2,
         removeLinkWordEmailReminder1HourPar1,
         removeLinkWordEmailReminder1HourPar2 } from '../../redux/actions/emailTemplatesActions/emailReminder1Hour'
import { emailTemplatesReduxReducersConstants } from '../../constants/reduxReducersConstants';
import AddLinkOnTextDialog from '../ReusableComponents/AddLinkOnTextDialog';
import TextWithLinkSection from '../ReusableComponents/TextWithLinkSection';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '1rem !important',
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
    marginBottom: '1rem !important',
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

const LogoSection = ({ FormikProps }) => {
  const localStyles = useStyles()

  const [addLinkWordDialogParagraph1, setAddLinkWordDialogParagraph1] = useState(false)
  const [addLinkWordDialogParagraph2, setAddLinkWordDialogParagraph2] = useState(false)

  const handleOpenDialog1 = () => {
    setAddLinkWordDialogParagraph1(true)
  }

  const handleOpenDialog2 = () => {
    setAddLinkWordDialogParagraph2(true)
  }

  const { values, handleChange, errors, touched } = FormikProps
  const { logoSection } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE LOGO</p>
      {/* Link Logo */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link logo"
        id="logoSection.logoLink"
        name="logoSection.logoLink"
        value={logoSection.logoLink}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      {/* Titlu 1 */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Titlu 1"
        id="logoSection.title1"
        name="logoSection.title1"
        value={logoSection.title1}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      {/* Paragraf 1 */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={`${localStyles.textField} mb-0`}
        size="small" 
        label="Paragraf 1"
        id="logoSection.paragraph1"
        name="logoSection.paragraph1"
        value={logoSection.paragraph1}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <h6
        className='subsection mb-0' 
        onClick={handleOpenDialog1}> 
        Adauga cuvinte cu link
      </h6>

      <AddLinkOnTextDialog 
        openDialog={addLinkWordDialogParagraph1}
        setOpenDialog={setAddLinkWordDialogParagraph1}
        addLinkWords={storeLinkWordsEmailReminder1HourPar1}
      />

      <TextWithLinkSection
        templateName={emailTemplatesReduxReducersConstants.emailReminder1Hour}
        paragraphNumber='paragraph1' 
        removeWord={removeLinkWordEmailReminder1HourPar1}
      />

      {/* Titlu 2 */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu 2"
        id="logoSection.title2"
        name="logoSection.title2"
        value={logoSection.title2}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      {/* Paragraf 2 */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 2"
        id="logoSection.paragraph2"
        name="logoSection.paragraph2"
        value={logoSection.paragraph2}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <h6
        className='subsection mb-0' 
        onClick={handleOpenDialog2}>
        Adauga cuvinte cu link
      </h6> 

      <AddLinkOnTextDialog 
        openDialog={addLinkWordDialogParagraph2}
        setOpenDialog={setAddLinkWordDialogParagraph2}
        addLinkWords={storeLinkWordsEmailReminder1HourPar2}
      />

      <TextWithLinkSection 
        templateName="emailReminder1Hour"
        paragraphNumber='paragraph2' 
        removeWord={removeLinkWordEmailReminder1HourPar2}
      />

      <Divider style={{background: 'white'}} />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-3`}
        size="small" 
        label="Buton 1"
        id="logoSection.button1"
        name="logoSection.button1"
        value={logoSection.button1}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Buton 2"
        id="logoSection.button2"
        name="logoSection.button2"
        value={logoSection.button2}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
    </div>
  )
}

export default LogoSection
