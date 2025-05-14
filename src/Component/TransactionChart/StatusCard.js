import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsFillPeopleFill } from 'react-icons/bs'; // Example icon from react-icons

const StatsCard = () => {
  return (
    <Card style={{ width: '24rem',padding: '20px' }}>
      <Card.Body>
        <Row className="text-center">
          <Col>
            <BsFillPeopleFill size={30} color="#3A8DFF" />
            <Card.Text style={{ fontSize: '1.2em' }}>RM Under me</Card.Text>
            <Card.Title style={{ fontSize: '2em' }}>12</Card.Title>
          </Col>
        </Row>
        <Row className="text-center mb-4">
          <Col>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#3A8DFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            />
            <Card.Text style={{ fontSize: '1.2em' }}>New Revenue (MTD)</Card.Text>
            <Card.Title style={{ fontSize: '2em' }}>24 L</Card.Title>
          </Col>
        </Row>
        <Row className="text-center mb-4">
          <Col>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#3A8DFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            />
            <Card.Text style={{ fontSize: '1.2em' }}>Net New Assets (MTD) (Held)</Card.Text>
            <Card.Title style={{ fontSize: '2em' }}>34 L</Card.Title>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
