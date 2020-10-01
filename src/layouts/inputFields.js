import React from 'react';
import InputWithScroll from '../components/InputWithScroll';
import PropTypes from 'prop-types';


export default function InputF({ className, label, parametres, isSubmitting, firstError, handleOnChangeInput }) {
  return (
    <>
      {label && <h2>{label}</h2>}
      {parametres.map((el, index) =>
        <InputWithScroll
          key={index}
          className={`${className}-el.name`}
          errorText="Заполните поле"
          error={el.error && isSubmitting}
          firstError={firstError}
          handleOnChange={handleOnChangeInput}
          label={el.label}
          name={el.name}
          value={el.value}
          />
      )}
    </>
  );
}

InputF.propTypes = {
  label: PropTypes.string,
  parametres: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  firstError: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleOnChangeInput: PropTypes.func.isRequired
}

InputF.defaultProps = {
  label: ''
}
