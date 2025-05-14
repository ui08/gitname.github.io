// WatchlistModal.js
import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Badge } from "react-bootstrap";
import Select from "react-select";

const WatchlistModal = ({ show, handleClose, watchlists }) => {
  const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0]);
  const [filterText, setFilterText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredItems, setFilteredItems] = useState(selectedWatchlist.items);

  const options = [
    { value: "mutual_fund", label: "Mutual Fund" },
    { value: "stocks", label: "Stocks" },
  ];

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);

    // Filter items based on search text
    setFilteredItems(
      selectedWatchlist.items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleTagSelect = (selectedOption) => {
    setSelectedTags(selectedOption || "");

    // Filter items based on selected tags
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    if (selectedValues.length > 0) {
      setFilteredItems(
        selectedWatchlist.items.filter((item) =>
          selectedValues.includes(item.type)
        )
      );
    } else {
      setFilteredItems(selectedWatchlist.items);
    }
  };

  const handleWatchlistChange = (index) => {
    setSelectedWatchlist(watchlists[index]);
    setFilteredItems(watchlists[index].items);
    setFilterText("");
    setSelectedTags([]);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedWatchlist.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <div>
            {watchlists.map((watchlist, index) => (
              <Button
                key={index}
                variant={
                  selectedWatchlist.name === watchlist.name
                    ? "primary"
                    : "secondary"
                }
                onClick={() => handleWatchlistChange(index)}
                className="me-2"
              >
                {watchlist.name}
              </Button>
            ))}
          </div>
          <div>
            <InputGroup>
              <Form.Control
                placeholder="Enter text to search"
                value={filterText}
                onChange={handleFilterChange}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-filter"></i>
              </Button>
            </InputGroup>
          </div>
        </div>
        <div className="mb-3">
          <Select
            isMulti
            options={options}
            value={selectedTags}
            onChange={handleTagSelect}
            placeholder="Filter by type..."
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Display selected tags below the Select input */}
        <div className="selected-tags mb-3">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.value}
              bg={tag.value === "mutual_fund" ? "info" : "success"}
              className="me-2"
            >
              {tag.label}
            </Badge>
          ))}
        </div>

        <div>
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center p-2 mb-2"
              style={{ border: "1px solid #ddd", borderRadius: "5px" }}
            >
              <span>{item.name}</span>
              <Badge bg={item.type === "mutual_fund" ? "info" : "success"}>
                {item.type === "mutual_fund" ? "Mutual Fund" : "Stocks"}
              </Badge>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WatchlistModal;
