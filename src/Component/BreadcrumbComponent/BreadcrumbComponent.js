import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import "./Breadcrumb.scss";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="app_breadcrumb">
      <ol className="app_breadcrumb_ol">
        {items.map((item, index) => (
          <li key={item.label} className="app_breadcrumb_li">
            &nbsp;{index > 0 && <FontAwesomeIcon icon={faChevronRight} />}&nbsp;
            {item.patth ? (
              <Link to={item.patth} className="activeLink">
                {item.icon ? item.icon : ""}
                {item.label ? item.label : ""}
              </Link>
            ) : (
              <Link className="li_Link">
                {item.icon ? item.icon : ""} {item.label ? item.label : ""}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Prop types validation
Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumb;
