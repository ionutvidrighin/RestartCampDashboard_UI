import React from 'react';
import { Button } from '@material-ui/core';

const NoPermissionBanner = ({ permissions }) => {

  return (
    <div className='no-permission-banner d-flex flex-column'>
      { !permissions.edit &&
        <Button variant='contained' style={{backgroundColor: '#e53c5d', fontWeight: 'bold', color: 'white', marginBottom: 5}}>
          Acces de editare restricționat
        </Button>
      }

      { permissions.hasOwnProperty('export') &&
        !permissions.export &&
        <Button variant='contained' style={{backgroundColor: '#e53c5d', fontWeight: 'bold', color: 'white', marginBottom: 5}}>
          Acces Export CSV restricționat
        </Button>
      }
    </div>
  )
}

export default NoPermissionBanner