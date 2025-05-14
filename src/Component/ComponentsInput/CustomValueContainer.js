import PropTypes from "prop-types";
import React from "react";
import { components } from "react-select"; // Adjust the import according to your setup

const CustomValueContainer = ({
  children,
  isFocused,
  selectProps,
  ...props
}) => {
    const { ValueContainer, Placeholder } = components;

  return (
    <ValueContainer {...props}>
      <Placeholder isFocused={isFocused}>{selectProps.placeholder}</Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

// Prop types validation
CustomValueContainer.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  selectProps: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
};

export default CustomValueContainer;
