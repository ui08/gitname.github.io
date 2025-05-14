import PropTypes from 'prop-types';
import React from 'react';

function ContainerFunction(ValueContainer, Placeholder) {
  const WrappedComponent = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };

  WrappedComponent.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool,
    selectProps: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
  };

  WrappedComponent.defaultProps = {
    isFocused: false,
    selectProps: {
      placeholder: '',
    },
  };

  return WrappedComponent;
}

export default ContainerFunction;
