import React from 'react';
import InputWithScroll from '../components/inputWithScroll/index';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';

export default function InputF({
  className, label, parametres, isSubmitting, firstError,
  handleOnChangeInput, handleOnInputPhone
}) {
  console.log(firstError);
  return (
    <>
      {label && <h2>{label}</h2>}
      {parametres.map((el, index) => (
        el.name !== "phone" ?
          <InputWithScroll
            key={index}
            className={`${className}-${el.name}`}
            errorText="Заполните поле"
            error={el.error && isSubmitting}
            firstError={firstError}
            handleOnChange={handleOnChangeInput}
            label={el.label}
            name={el.name}
            value={el.value}
            />
          :
          <ScrollIntoViewIfNeeded
            key={index}
            active={firstError === "phone"}
            options={{block: "start"}}
            className={`${className}-${el.name} ${el.error && isSubmitting ? "error" : ""}`}
            >
            <PhoneInput
              country={"ru"}
              value={el.value}
              placeholder=""
              countryCodeEditable={false}
              onlyCountries={["ru"]}
              onChange={handleOnInputPhone}
              inputProps={{name:"phone"}}
            />
            {el.error && isSubmitting &&
              <p className={`react-tel-input__error`}>
                Заполните поле
              </p>
            }
          </ScrollIntoViewIfNeeded>
        )
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
  handleOnChangeInput: PropTypes.func.isRequired,
  handleOnInputPhone: PropTypes.func.isRequired

}

InputF.defaultProps = {
  label: ''
}
