import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { appPagesConstants } from '../../../constants/userPermissions';
import { doesUserHaveViewPermission, doesUserHaveEditPermission } from "../../../utils/helperFunctions";
import { fetchHeaderFooterData, 
  updateHeaderFooterData,
  clearHeaderFooterDataState } from '../../../redux/actions/webPagesDataActions/headerFooterDataActions';
import { clearServerResponse } from '../../../redux/actions/clearServerResponseAction';
import { formValues, formValidation } from './formValuesAndValidation';
import { Formik, Form } from "formik";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import HowToOperateOnPage from '../../../components/EditingWebPages/Header&Footer/HowToOperateOnPage';
import EditWebPageHeader from '../../../components/EditingWebPages/Header&Footer/EditWebPageHeader';
import EditContactInformation from '../../../components/EditingWebPages/Header&Footer/EditContactInformation';
import EditWebPageFooter from '../../../components/EditingWebPages/Header&Footer/EditWebPageFooter';
import ShowPageContent from '../../../components/EditingWebPages/Header&Footer/ShowPageContent';
import RingBellAndPageInstructionsBanner from '../../../components/ReusableComponents/Banners/RingBellAndPageInstructionsBanner';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';


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
  submitButton: {
    margin: 'auto 0',
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  },
})

const HeaderFooter = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.CONTENT_HEADER_FOOTER, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CURSURI, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}
  
  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchHeaderFooterData())
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearHeaderFooterDataState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // grab the Page data object from Redux
  const coursesPageData = useSelector(state => {
    const dataObject = state.headerFooterReducer.data
    const serverResponse = state.headerFooterReducer.success
    const serverMessage = state.headerFooterReducer?.serverMessage
    return { dataObject, serverResponse, serverMessage }
  })
  const { dataObject, serverResponse, serverMessage } = coursesPageData

  const formInitialValues = formValues(dataObject)
  const FORM_VALIDATION = formValidation

  const handleShowLoadingPageData = () => {
    if (dataObject || serverResponse) {
      setLoadingData({...loadingData, showCircle: false})
      setSnackBar({
        background: '#28cc95', 
        open: true,
        upDuration: 1000,
        text: 'Data Loaded Successfully'
      })
    } else {
      setLoadingData({...loadingData, showCircle: true})
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        text: serverMessage
      })
    }
  }
    
  useEffect( () => {
    handleShowLoadingPageData()
  }, [dataObject])

  const handleFormSubmit = (values) => {
    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateHeaderFooterData(values))
  }

  const displaySnackBar = () => {
    if (serverMessage === 'Registration Form Alerts Updated Successfully') {
      setSnackBar({
        ...snackBar,
        background: '#28cc95',
        open: true,
        success: true,
        upDuration: 12000,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }

    if (serverMessage === 'Registration Form Alerts could not be updated') {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 12000,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }
  }

  // watch Redux updates for back-end response
  // on updating the page data information
  useEffect(() => {
    displaySnackBar()
  }, [serverMessage])

  return (
    <>
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='header-footer d-flex'>
            
            {/* show page when data is fully loaded */}
            { dataObject &&
            <>
              {/* Display Page Instructions Banner */}
              { hasEditPermission ?
                <RingBellAndPageInstructionsBanner Component={HowToOperateOnPage} />
                :
                <NoPermissionBanner permissions={permissions} /> }

              <section className='left-section me-2'>
                <h6> EDITARE CONTENT HEADER & FOOTER </h6>
                <Divider style={{background: 'white'}} className="mb-5" />

                <Formik
                  initialValues={formInitialValues}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={values => handleFormSubmit(values)}>
                {(props) => (
                  <Form>
                    <EditWebPageHeader localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />
                    <EditContactInformation localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />
                    <EditWebPageFooter localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />

                    <div className='d-flex justify-content-center'>
                      <Button variant='contained'
                        type="submit"
                        className={localStyles.submitButton}
                        disabled={!hasEditPermission}> 
                        Confirmă modificările
                      </Button>
                    </div>
                  </Form>
                )}
                </Formik>
              </section>
              
              {/* Showing Edited Header&Footer Content */}
              <ShowPageContent data={dataObject} />
            </>
            }

            { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
          </div>
        </>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default HeaderFooter
