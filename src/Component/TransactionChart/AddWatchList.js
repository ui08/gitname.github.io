import React from 'react';
import { Button, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddWatchlist = () => {
  return (
    <Col>
      <InputGroup className="" style={{ borderRadius: '25px', overflow: 'hidden' }}>
        <div 
          style={{
            // backgroundColor: '#f0f4ff',
            padding: '10px 10px',
            flexGrow: 1,
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          Add Watchlist
        </div>
        <Button
          variant="primary"
          style={{
            borderRadius: '50%',
            backgroundColor: '#4d69e1',
            borderColor: '#4d69e1',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '20px', lineHeight: '20px' }}>+</span>
        </Button>
      </InputGroup>
    </Col>
  );
};

export default AddWatchlist;
