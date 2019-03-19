import React from 'react';
import PropTypes from 'prop-types';


export const Header = (props) => {
  return(
    <h1 className={props.type === 'outerHeader' ? 'outerHeader' : 'innerHeader'}>
      {props.content}
    </h1> 
  );
};

Header.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};