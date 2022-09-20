import React from "react";
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';

const componentStyle = {
  flex: 1,
  height: "100%",
  backgroundColor: "#3e5676",
  position: 'relative',
  noDBaccessBanner: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '.7rem 1rem',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#f52574',
    boxShadow: '5px 5px 14px -7px rgba(0,0,0,0.75)',
    borderRadius: '5px'
  }
}

const Placeholder = () => {
  const isDBTokenGenerated = useSelector(state => state.generateDBTokenReducer.isTokenGenerated)

  return (
    <div style={componentStyle} className="placeholder-component d-flex flex-column align-items-center justify-content-center">
      { !isDBTokenGenerated &&
        <div style={componentStyle.noDBaccessBanner}>
          ÎN ACEST MOMENT ACCESUL LA BAZA DE DATE ESTE RESTRICȚIONAT
        </div>
      }
      
      <div>
        <h2 className="fw-bold" style={{color: 'white'}}>Welcome</h2>
      </div>
      <div className="app-logo pb-1">
        <img src="./imgs/logo.png" alt="logo" width="400" /> 
      </div>
    </div>
  )
};

export default Placeholder;
