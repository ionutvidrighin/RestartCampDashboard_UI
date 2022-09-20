import React from 'react'

const styling = {
  width: "100%",
  position: "relative",
  border: "1px solid #509ecc",
  padding: "1.5rem .5rem .5rem .5rem",
  borderRadius: "5px",

  sectionTitle: {
    position: "absolute",
    top: "-18px",
    left: "25px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#509ecc",
    borderRadius: "5px",
    padding: ".3rem",
    margin: "0",
  }
}

const EmailTemplatesFooter = ({ data }) => {
  return (
    <>
      { data &&
        <div className='email-templates-footer' style={styling}>
          <p style={styling.sectionTitle}>CONTACT SECTION</p>

          <h6 className='text-center mt-3 mb-5 fw-bold'> {data.title} </h6>

          <div className='social-media-icons'>
            <a href="/">
              <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1643657841/restartcamp/facebook_e1qtfm.png" alt="facebook" className='social-media-icon' />
            </a>

            <a href="/">
              <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1643657841/restartcamp/instagram_oc4fcv.png" alt="instagram" className='social-media-icon' />
            </a>

            <a href="/">
              <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1643657842/restartcamp/youtube_u5heks.png" alt="youtube" className='social-media-icon' />
            </a>

            <a href="/">
              <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1643657841/restartcamp/linkedin_rxohpg.png" alt="linkedin" className='social-media-icon' />
            </a>
          </div>

          <br />
          <br />

          <div className='contact-section'>
            <div className='phone-contact'>
              <p className='m-0 fw-bold' style={{color: '#48b6ff'}}>
                Telefon, Whatsapp & Telegram:
              </p>
              <p className='m-0'> 
                {data.phone}
              </p>
            </div>

            <div className='email-contact'>
              <p className='m-0 fw-bold' style={{color: '#48b6ff'}}>
                Email:
              </p>
              <p className='m-0'> 
                {data.email}
              </p>
            </div>
          </div>

          <br />
          <br />

          <div className='unsubscribe-section'>
            <p>
              {data.paragraph}
            </p>
          </div>

          <br />
          <br />

          <a className='about-restartcamp-section' href={data.aboutRestartCamp.link}>
            <div className='about-restartcamp-section'>
              <p className='m-0'>
                {data.aboutRestartCamp.text}
              </p>
              <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1661931446/restartcamp/pngwing.com_1_treoaa.png" alt="circle-arrow" className='circle-arrow' />
            </div>
          </a>
        </div>
      }
    </>
  )
}

export default EmailTemplatesFooter