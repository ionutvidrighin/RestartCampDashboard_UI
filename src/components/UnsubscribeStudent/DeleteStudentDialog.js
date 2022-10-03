// import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { removeStudent } from '../../redux/actions/unsubscribeOrRemoveStudentActions';
// import { getStudentReferenceIDsByEmail } from './helperMethods'
// import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';

// const DeleteStudentDialog = ({openDialog, setOpenDialog, studentNameAndEmail}) => {
//   const dispatch = useDispatch()

//   const studentEmail = studentNameAndEmail.split("-")[1].trim() // extract student e-mail from this String
//   const studentData = useSelector(state => state.unsubscribeOrRemoveStudentReducer.studentData)
//   const databaseCollectionsAndRefIDs = getStudentReferenceIDsByEmail(studentData, studentEmail)

//   const deleteUserAccount = () => {
//     dispatch(removeStudent(databaseCollectionsAndRefIDs))
//     setOpenDialog(false)
//   }

//   return (
//     <div>
//       <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
//         <div style={{width: '350px', height: '180px', padding: '1rem'}}>
//           <h6 className='text-center'> Confirm ștergerea datelor personale pentru </h6>
//           <p style={{fontStyle: 'italic', fontWeight: 600, margin: '1rem', color: '#e53c5d', textAlign: 'center'}}> 
//             {studentNameAndEmail}
//           </p>
//           <div className='d-flex justify-content-evenly mt-4'>
//             <Button
//               className='fw-bold'
//               variant='contained'
//               onClick={deleteUserAccount}>
//               DA
//             </Button>

//             <Button
//               className='fw-bold'
//               variant='contained'
//               onClick={() => setOpenDialog(false)}>
//               NU
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   )
// }

// export default DeleteStudentDialog
