import React from "react";

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

  return (
    <div style={componentStyle} className="placeholder-component d-flex flex-column align-items-center justify-content-center">
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
