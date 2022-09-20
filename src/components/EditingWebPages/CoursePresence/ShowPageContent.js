import React from 'react'
import Divider from '@material-ui/core/Divider';
import ConstructSentenceWithLinks from '../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';

const ShowPageContent = ({ data }) => {
  const { moreThan30Min, lessThan30Min } = data

  // lessThan30Min section has a Form with a title
  // if that title contains [break] characters, it means we need to break it on 2 rows.
  const formTitle = lessThan30Min.formTitle.split('[break]')

  return (
    <section className='right-section me-2 mt-2 pb-5'>

      {/* More than 30min. Before Course Start Section */}
      <div className='text-center mb-2'>
        <h6 className='mb-4'>INFO ACCES PAGINA CU MAI MULT DE 30min. ÎNAINTEA ÎNCEPERII CURSULUI: </h6>
        <p>
          { moreThan30Min.paragraph1 }
        </p>
        <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1659034754/restartcamp/countdown_b1pzzk.png"
          alt="countdown" />
        <p>
          { moreThan30Min.paragraph2 }
        </p>
      </div>

      <Divider style={{background: 'black'}} className='mt-5' />

      {/* Less than 30min. Before Course Start Section */}
      <div className='text-center'>
        <h6 className='mb-4'>INFO ACCES PAGINA CU MAI PUȚIN DE 30min. ÎNAINTEA ÎNCEPERII CURSULUI: </h6>
        <div className='col-xl-10' style={{ margin: '0 auto'}}>
          <p>
            <span style={{color: '#fd5c4a', fontSize: '1.2rem', fontWeight: 'bold'}}>
              {formTitle[0]}
            </span>
            <br />
              {formTitle[1]}
          </p>
          <p className='fw-bold'>
            {lessThan30Min.paragraph1}
          </p>
          <div style={{border: '4px solid red',}} className='p-2'>
            <ConstructSentenceWithLinks 
              sentence={lessThan30Min.paragraph2}
              words={lessThan30Min.linkWords.paragraph2}
            />
          </div>

          <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1659035377/restartcamp/presence-confirmation-form_eyx8l8.png" alt="form" />
        </div>
      </div>
    </section>
  )
}

export default ShowPageContent