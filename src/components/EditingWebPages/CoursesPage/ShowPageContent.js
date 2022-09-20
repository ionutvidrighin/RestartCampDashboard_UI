import React from 'react';
import Divider from '@material-ui/core/Divider';
import ConstructSentenceWithLinks from '../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';

const ShowPageContent = ({ data }) => {
  const coursesModule1Title = data.infoCoursesModule1.title.split('[break]')
  const coursesModule2Title = data.infoCoursesModule2.title.split('[break]')

  return (
    <section className='right-section me-2 mt-2'>

      {/* =========================================================== */}
      {/* Stripe Info Courses */}
      <h6 className='ps-2'>STRIPE INFO CURSURI</h6>
      <div className='upper-stripe d-flex align-items-center justify-content-center'>
        <img src={data.stripeInfoCoursesLink} alt="stripe-info-courses" />
      </div>

      {/* =========================================================== */}
      {/* Info Courses Module 1 */}
      <Divider style={{background: 'black'}} className='mt-5' />
      <h6 className='ps-2'>INFO CURSURI MODUL 1</h6>
      <div className='coursesModule1Text'>
        <h4 className='mb-4'>
          <span style={{color: '#38b6ff'}}>{ coursesModule1Title[0] }</span> 
          <br /> { coursesModule1Title[1] }
        </h4>

        <ConstructSentenceWithLinks
          sentence={data.infoCoursesModule1.paragraph1}
          words={data.infoCoursesModule1.linkWords.paragraph1}
        />

        <ConstructSentenceWithLinks
          sentence={data.infoCoursesModule1.paragraph2}
          words={data.infoCoursesModule1.linkWords.paragraph2}
        />
      </div>

      {/* =========================================================== */}
      {/* Stripe Info Practice */}
      <Divider style={{background: 'black'}} className='mt-5' />
      <h6 className='ps-2'>STRIPE INFO PRACTICA</h6>
      <div className='lower-stripe d-flex align-items-center justify-content-center'>
        <img src={data.stripeInfoPracticeLink} alt="stripe-info-practice" />
      </div>

      {/* =========================================================== */}
      {/* Info Courses Module 2 */}
      <Divider style={{background: 'black'}} className='mt-5' />
      <h6 className='ps-2'>INFO CURSURI MODUL 2</h6>
      <div className='coursesModule2Text mb-4'>
        <h4 className='mb-4'>
          <span style={{color: '#38b6ff'}}>{ coursesModule2Title[0] }</span> 
          <br /> { coursesModule2Title[1] }
        </h4>

        <ConstructSentenceWithLinks
          sentence={data.infoCoursesModule2?.paragraph}
          words={data.infoCoursesModule2.linkWords.paragraph}
        />

      </div>
    </section>
  )
}

export default ShowPageContent