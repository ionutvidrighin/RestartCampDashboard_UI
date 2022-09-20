import React from 'react';
import { useSelector } from 'react-redux';
import ShowEmailTemplatesFooter from '../ReusableComponents/EmailTemplatesManipulation/ShowEmailTemplatesFooter'

const ShowEmailTemplateContent = () => {

  const emailTemplateContent = useSelector(state => state.emailConfirmationRegistrationTemplate.template)

  let emailTemplateTitle
  if (emailTemplateContent) {
    const templateTitle = emailTemplateContent.topSection.emailTitle
    emailTemplateTitle = templateTitle.split('[break]')
  }

  return (
    <> 
      { emailTemplateContent &&
        <div className='email-template-content'>

          {/* start top section */}
          <div className='email-confirmation-top-section'>
            <p className='section-title'>TOP SECTION</p>
            <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1661946290/restartcamp/unnamed_2_tak4qi.png" alt="restartcamp-logo" />
            <br />
            { emailTemplateTitle.map((string, index) => (
              <h6 key={index} className="m-0">
                {string}
              </h6>
            ))
            }
            <br />
            <br />

            <h6 style={{color: '#ff5757', fontSize: '1.2rem'}}>
              {emailTemplateContent.topSection.subtitle}
            </h6>

            <p className='text-left paragraph-text'>
              {emailTemplateContent.topSection.paragraph}
            </p>
          </div>
          {/* end top section */}

          <br />
          <br />

          {/* start center section */}
          <div className='email-confirmation-center-section'>
            <p className='section-title'>CENTER SECTION</p>
            {/* table ROW 1 */}
            <div className='d-flex justify-content-between table-row'>
              <p className='row-title'>ROW 1</p>
              <div className='table-cell'> {/* table cell 1 */} 
                <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1661946791/restartcamp/unnamed_3_nukt9m.png" alt="course-logo" />
              </div> {/* end table cell 1 */} 

              <div className='table-cell d-flex flex-column ms-5'> {/* table cell 2 */} 
                <div>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row1.title1} </p>
                  <p className='paragraph-text'>
                    {emailTemplateContent.centerSection.row1.paragraph1}
                  </p>
                </div>

                <div className='mt-4'>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row1.title2} </p>
                  <p className='paragraph-text'>
                  {emailTemplateContent.centerSection.row1.paragraph2}
                  </p>
                </div>
              </div> {/* end table cell 2 */} 
            </div>
            {/* end first table row */}

            <br />

             {/* table ROW 2 */}
            <div className='d-flex justify-content-between table-row'>
              <p className='row-title'>ROW 2</p>
              <div className='table-cell'> {/* table cell 1 */}
                <div>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row2.title1} </p>
                  <p className='paragraph-text'>
                    {emailTemplateContent.centerSection.row2.paragraph1}
                  </p>
                </div>

                <div className='mt-4'>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row2.title2} </p>
                  <p className='paragraph-text'>
                    {emailTemplateContent.centerSection.row2.paragraph2}
                  </p>
                </div>
              </div> {/* end table cell 1 */}

              <div className='table-cell ms-5'> {/* table cell 2 */}
                <div>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row2.title3} </p>
                  <p className='paragraph-text'>
                    {emailTemplateContent.centerSection.row2.paragraph3}
                  </p>
                </div>

                <div className='mt-4'>
                  <p className='paragraph-title'> {emailTemplateContent.centerSection.row2.title4} </p>
                  <p className='paragraph-text'>
                    {emailTemplateContent.centerSection.row2.paragraph4}
                  </p>
                </div>
              </div> {/* end table cell 2 */}
            </div>
          </div> 
          {/* end center section */}

          <br />

          {/* start buttons section */}
          <div className='email-confirmation-buttons-section'>
            <p className='section-title'>BUTTONS SECTION</p>
            <div className='buttons-wrapper'>
              <a href={emailTemplateContent.buttonsSection.button1.link} className='darkblue-btn'>
                <div className='buttons-section-btn'> {emailTemplateContent.buttonsSection.button1.text} </div>
              </a>
              <a href={emailTemplateContent.buttonsSection.button2.link} className='red-btn'>
                <div className='buttons-section-btn'> {emailTemplateContent.buttonsSection.button2.text} </div>
              </a>
            </div>
          </div>
          {/* end buttons section */}

          <br />
          <br />

          <div className='email-confirmation-contest-logo-section d-flex align-items-center justify-content-center'>
            <p className='section-title'>CONTEST LOGO SECTION</p>
            <img src={emailTemplateContent.contestLogoSection} alt="contest" />
          </div>

          <br />
          <br />
          <br />
          
          {/* start contact section */}
          <ShowEmailTemplatesFooter data={emailTemplateContent.contactSection} />

        </div>
      }
    </>
  )
}

export default ShowEmailTemplateContent