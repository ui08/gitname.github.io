import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import Newscard from "../../assets/img/NewsCard.png"

const NewsCard = () => {
  return (
      <Card className="d-flex">
        <Card.Img
          variant="bottom"
          src={Newscard} // Replace with your image URL
          alt="News Image"
        />
        <Card.Body>
          <Card.Title>Top News</Card.Title>
          <Card.Text>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
        {/* <Card.Footer>
          <Button variant="outline-primary" className="w-100">
            Add Watchlist
          </Button>
        </Card.Footer> */}
      </Card>
  );
};

export default NewsCard;
