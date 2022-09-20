import React from 'react'
import Divider from '@material-ui/core/Divider';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import facebook from './icons/facebook.webp';
import instagram from './icons/instagram.webp';
import linkedin from './icons/linkedin.webp';
import whatsapp from './icons/whatsapp.png';
import email from './icons/email.png';

const ShowPageContent = ({ data }) => {

  const contactInformationSectionTitle = data.contactInformation.title.split('[break]')
  return (
    <section className='right-section me-2 mt-5'>

      {/* Header Section */}
      <div className='header-section'>
        <h6 className='ps-2'>HEADER PAGINA CURSURI</h6>
        <nav className='nav-bar'>
          <a href={data.pageHeader.backButtonLink} target="_blank" rel="noreferrer">
            <div className="back-to-site-btn">
              <ArrowLeftIcon />
              înapoi la site
            </div>
          </a>
          <div>
            <img src={data.pageHeader.companyLogoLink} alt="logo" width="150px" /> 
          </div>
        </nav>
      </div>

      {/* Contact Information Section */}
      <Divider style={{background: 'black'}} className='mt-5' />
      <h6 className='ps-2'>INFORMATII DE CONTACT</h6>
      <div className='contactInformation mb-5'>
        <h4 className='mb-4'>
          <span style={{color: '#38b6ff'}}>{ contactInformationSectionTitle[0] }</span> 
          <br /> { contactInformationSectionTitle[1] }
        </h4>
        <p className='m-0'>
          { data.contactInformation.paragraph }
        </p>
      </div>

    {/* Footer Section */}
    <Divider style={{background: 'black'}} className='mt-4' />
    <h6 className='ps-2'>FOOTER PAGINA CURSURI</h6>
    <div className='webPageFooter mb-3'>
      <div className='social-media-icons'>
        <a href={data.pageFooter.facebookPageLink} target="_blank" rel="noreferrer">
          <img src={facebook} alt="facebook" />
        </a>
        <a href={data.pageFooter.linkedinPageLink} target="_blank" rel="noreferrer">
          <img src={linkedin} alt="linkedin" />
        </a>
        <a href={data.pageFooter.instagramPageLink} target="_blank" rel="noreferrer">
          <img src={instagram} alt="instagram" />
        </a>
        <a href={data.pageFooter.whatsappNumber} target="_blank" rel="noreferrer">
          <img src={whatsapp} alt="whatsapp" />
        </a>
        <a href={data.pageFooter.emailAddress} target="_blank" rel="noreferrer">
          <img src={email} alt="email" />
        </a>
      </div>
      <div className="terms-and-conditions me-2">
        <a href={data.pageFooter.newsLetterLink} target="_blank" rel="noreferrer">
          <div className="terms-gdpr d-flex align-items-center">
            ABONARE NEWSLETER
          </div>
        </a>
        <a href={data.pageFooter.termsConditionsLink} target="_blank" rel="noreferrer">
          <div className="terms-gdpr d-flex align-items-center">
            TERMENI ȘI CONDIȚII
          </div>
        </a>
        <a href={data.pageFooter.gdprLink} target="_blank" rel="noreferrer">
          <div className="terms-gdpr d-flex align-items-center">
            GDPR
          </div>
        </a>
      </div>
    </div>
    </section>
  )
}

export default ShowPageContent