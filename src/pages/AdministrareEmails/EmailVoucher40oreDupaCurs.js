import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { appPagesConstants } from '../../constants/userPermissions';
import { doesUserHaveViewPermission } from '../../utils/helperFunctions';
import { emailTemplatesEndpoints } from '../../constants/emailTemplatesEndpoints';
import { getEmailTemplateHTML } from '../../api/callEmailTemplates';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../components/NoAccessPage';
import DownloadEmailTemplateFile from '../../components/ReusableComponents/EmailTemplatesManipulation/DownloadEmailTemplate';
import UploadEmailTemplateFile from '../../components/ReusableComponents/EmailTemplatesManipulation/UploadEmailTemplateFile';
import SendTestEmailTemplate from '../../components/ReusableComponents/EmailTemplatesManipulation/SendTestEmailTemplate';
import ShowEmailTemplateContent from '../../components/ReusableComponents/EmailTemplatesManipulation/ShowEmailTemplateContent';
import HowToOperateOnPage from '../../components/EmailConfirmationTemplate/HowToOperateOnPage';
import OverlayProgressCircle from '../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import RingBellAndPageInstructionsBanner from '../../components/ReusableComponents/Banners/RingBellAndPageInstructionsBanner';
import SnackBar from '../../components/ReusableComponents/SnackBar';

const EmailVoucher40oreDupaCurs = ({ setShowPlaceholder }) => {

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.EMAIL_VOUCHER_40_ORE, userPagesAccessFromStore)
  
  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 2000})
  
  const DBtoken = useSelector(state => state.generateDBTokenReducer.value)
  const uploadTemplateURL = emailTemplatesEndpoints.emailVoucher40HoursUpload
  const downloadTemplateURL = emailTemplatesEndpoints.emailVoucher40HoursDownload
  const sendTestEmailURL = emailTemplatesEndpoints.testEmailVoucher40Hours
  const callHTMLtemplateURL = emailTemplatesEndpoints.renderEmailVoucher40Hours
  const templateName = 'emailVoucher40hours.handlebars'

  const [HTMLtemplate, setHTMLtemplate] = useState(null)

  const callEmailTemplateHTML = async () => {
    try {
      const response = await getEmailTemplateHTML(callHTMLtemplateURL, DBtoken)
      setHTMLtemplate({__html: response.data})
      setLoadingData({...loadingData, showCircle: false})
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Server Error - No response'
      setLoadingData({...loadingData, showCircle: true})
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        upDuration: 5500,
        text: errorMessage
      })
    }
  }

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      setLoadingData({...loadingData, showCircle: true})
      callEmailTemplateHTML()
    }
  }, [])

  return (
    <>
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='editare-email-template' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>
            <div className='manipulare-template'>
              <div className='text-center title-section'>
                <h6 className='pt-3 fw-bold title'> EDITARE E-MAIL TEMPLATE </h6>
                <h6 className='ps-5 pe-5 subtitle'> E-mail voucher trimis la 40 ore dupa participarea la curs </h6>
                <Divider style={{background: 'white'}} className="mb-5 ms-2" />
              </div>

              <div className='d-flex flex-column justify-content-space-around' style={{marginTop: '5rem'}}>
                <UploadEmailTemplateFile url={uploadTemplateURL} token={DBtoken} />

                <SendTestEmailTemplate url={sendTestEmailURL} token={DBtoken} />

                <DownloadEmailTemplateFile url={downloadTemplateURL} token={DBtoken} templateName={templateName} />
              </div>
            </div>

            <ShowEmailTemplateContent content={HTMLtemplate} />

            { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
          </div>
        </>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default EmailVoucher40oreDupaCurs