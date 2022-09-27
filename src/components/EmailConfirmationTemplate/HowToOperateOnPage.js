import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const componentStyles = {
  container: {
    height: '500px',
    overflow: 'auto',
    color: 'black',
    padding: '1rem 1rem'
  }
}

const HowToOperateOnPage = () => {

  const dinamicWordCourseName = "{nume_curs}"
  const dinamicWordCourseDate = "{data_curs}"
  const dinamicWordCourseHour = "{ora_curs}"

  return (
    <div style={componentStyles.container}>
      <div data-info="about-email-title">
        <p className='m-0 fw-bold'>Titlul template-ului</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Titlul template-ului va conține caracterele "[break]" (fără ghilimele), marcând locul/locurile din care se va separa pe mai multe rânduri.
        </span>
        <p> <span style={{color: 'tomato', fontWeight: 'bold'}}>*** </span>suplimentar, se va bifa căsuța "Titlu E-mail pe mai multe rânduri".</p>
        <p className='mb-0 mt-2 text-decoration-underline'>Exemplu:</p>
        <p className='m-0 mb-2 fst-italic'>
          Vești bune! TE-AI ÎNSCRIS CU SUCCES la modulul 1 al cursului {dinamicWordCourseName} din programul Restart Camp! :) 
        </p>
        <p className='m-0'>se va nota astfel: </p>
        <p className='m-0'>
          Vești bune! <span className='fw-bold'>[break]</span> TE-AI ÎNSCRIS CU SUCCES
          la <span className='fw-bold'>[break]</span>  modulul 1 al cursului {dinamicWordCourseName}
          <span className='fw-bold'> [break]</span> din programul Restart Camp! :) 
        </p>
        <p className='mt-2 mb-0 text-decoration-underline'>Cum se va afișa titlul în e-mail:</p>
        <p className='mb-0 text-center'>
          Vești bune! <br />
          TE-AI ÎNSCRIS CU SUCCES <br />
          la <br /> 
          modulul 1 al cursului {dinamicWordCourseName} <br /> 
          din programul Restart Camp! :)
        </p>
        <br />
      </div>

      <p className='mb-3'>-----------------------------------------------------------------</p>
      
      <div data-info="about-titles-paragraphs-with-dynamic-words">
        <p className='m-0 fw-bold'>Titlul si Paragrafe cu cuvinte dinamice</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Titlul și unele paragrafe pot conține cuvinte dinamice, mai exact, cuvinte care vor fi introduse în conținutul textului, în mod automat și dinamic de către server-ul aplicației. 
        </span>
        <p className='m-0 mt-2'>Cuvintele dinamice sunt:</p>
        <p className='m-0'>
          <span style={{color: 'red'}}> nume_curs </span>, 
          <span style={{color: 'red'}}> data_curs</span> și 
          <span style={{color: 'red'}}> ora_curs</span>.
        </p>
        <p className='m-0'>
          Așadar, ele vor fi încadrate între acolade, și vor lua forma: {dinamicWordCourseName}, {dinamicWordCourseDate} și {dinamicWordCourseHour}
        </p>
        <p className='mt-3 mb-0 text-decoration-underline'>Exemplu:</p>
        <p className='fst-italic'>
          Modulul 1 al cursului Bazele Social Media are loc pe 12 Septembrie 2022, ora 18:30 și va dura 3 ore.
        </p>
        <p className='m-0'>se va nota astfel: </p>
        <p> 
          Modulul 1 al cursului {dinamicWordCourseName} are loc pe {dinamicWordCourseDate}, ora {dinamicWordCourseHour} și va dura 3 ore.
        </p>
      </div>
    </div>
  )
}

export default HowToOperateOnPage