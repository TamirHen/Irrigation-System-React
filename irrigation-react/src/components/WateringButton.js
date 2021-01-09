import React from 'react';

import Button from '@material-ui/core/Button';

const WatermingButton = (props) => {
  const {
    isBreathing,
    textButton,
    isSubmitDisabled,
    onClick,
    height,
    width,
  } = props;

  const style = {
    height: height || '100px',
    width: width || '100px',
  };
  return (
    <div className="breathing-button-wrapper">
      <Button
        id="breathing-button"
        className={`manual-button ${isBreathing ? 'breathing' : ''}`}
        variant="contained"
        color={isBreathing ? 'secondary' : 'primary'}
        type="submit"
        disabled={isSubmitDisabled}
        onClick={onClick}
        style={style}
      >
        {textButton}
      </Button>
    </div>
  );
};

export default WatermingButton;
