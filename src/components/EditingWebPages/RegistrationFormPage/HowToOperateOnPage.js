import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const componentStyles = {
  container: {
    height: '500px',
    overflow: 'auto',
    color: 'black',
    padding: '0 1rem'
  }
}

const HowToOperateOnPage = () => {

  const dinamicWordCourseName = "{nume_curs}"
  const dinamicWordCourseDate = "{data_curs}"

  return (
    <div style={componentStyles.container} className='d-flex align-items-center justify-content-center'>
      <div className='pt-3 pb-4'>
        <p className='m-0 fw-bold'>Alerte cu cuvinte dinamice:</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Unele dintre alertele de informare conțin cuvinte dinamice, mai exact, cuvinte care vor fi introduse în conținutul textului, în mod automat și dinamic de către server-ul aplicației. 
        </span>
        <br />
        <br />
        <span>
          Cuvintele dinamice sunt:
          <span style={{color: 'red'}}> nume_curs </span>
          si 
          <span style={{color: 'red'}}> data_curs</span>
          .
        </span>
        <br />
        <span>
          Astfel, ele vor fi încadrate între acolade, și vor lua forma: {dinamicWordCourseName} și {dinamicWordCourseDate}
        </span>
        <p className='m-0 text-decoration-underline mt-2'>Exemplu:</p>
        <span className='fw-bold'> 
          Alertă avertizare înscriere deja efectuată: 
        </span>
        <br />
        <span className='fst-italic'>
          Te-ai înscris deja la cursul {dinamicWordCourseName} din data de {dinamicWordCourseDate}.
        </span>
        <br />
        <br />
        <span className='fw-bold'>
          Utilizatorul va vedea mesajul sub forma:
        </span>
        <br />
        <span className='fst-italic'>
          Te-ai înscris deja la cursul Bazele HR: Recrutare și Selectie din data de 15 August 2022.
        </span>
      </div>
    </div>
  )
}

export default HowToOperateOnPage