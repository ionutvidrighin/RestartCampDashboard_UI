import React from 'react'
import EmailTemplatesFooter from '../ReusableComponents/EmailTemplatesManipulation/ShowEmailTemplatesFooter'

const ShowEmailTemplateContent = ({ data }) => {
  const { topSection, centerSection, contactSection } = data
  const emailTemplateTitle = topSection.emailTitle.split('[break]')

  return (
    <div className='email-template-content'>

      {/* start top section content */}
      <section className='email-3days-top-section'>
        <img src={topSection.templateLogo} alt="template-logo" />

        <br />
        <br />
        <br />

        { emailTemplateTitle.map((string, index) => (
          <h5 key={index} className="m-0 text-center">
            {string}
          </h5>
        ))
        }

        <br />
        <br />

        <p className='m-0 text-left'> { topSection.paragraph } </p>

        <br />
        <br />
        <div className='divider' />
        <br />
        <br />
      </section>
      {/* end top section content */}

      {/* start center section content */}
      <section className='email-3days-center-section'>
        <div className='paragraph-row'>
          <div>
            <img src={centerSection.logoLink} alt="paragraph-logo" />
          </div>
          <div>
            <p className='mb-1 fw-bold fs-6 paragraph-title' style={{color: '#fd5c4a'}}> { centerSection.title } </p>
            <p className='m-0'> { centerSection.paragraph } </p>
          </div>
        </div>

        <br />
        <br />

        <h6 className='text-center'> { centerSection.title2 } </h6>
      </section>

      <br />
      <br />

      <EmailTemplatesFooter data={contactSection} />
  
    </div>
  )
}

export default ShowEmailTemplateContent