import React from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import classNames from 'classnames';

const InputWithScroll = ({
  className, error, errorText, firstError, handleOnChange, label, name,
  value, placeholder, ...atrts
})  => {
  const classes = classNames (
    'inputWithScroll',
    {[`inputWithScroll-${className}`]: className},
    {[`error`]: error}
  )

  return (
    <ScrollIntoViewIfNeeded
      options={{block: "start"}}
      active={firstError === name}
      className={classes}
    >

      <div className="inputWithScroll__input">
        <label htmlFor={name}>
          {label}
        </label>

        <input
          type="text"
          name={name}
          value={value}
          onChange={handleOnChange}
        />
      </div>

      {error &&
        <p className={`inputWithScroll__error inputWithScroll__error-${name}`}>
          { errorText }
        </p>
      }
    </ScrollIntoViewIfNeeded>
  )
}

export default React.memo(InputWithScroll);
// InputField.propTypes = {
//     className: PropTypes.string,
//     label: PropTypes.string,
//     error: PropTypes.string,
//     func: PropTypes.func,
//     lel9: PropTypes.string,
//     required: PropTypes.bool,
//     disabled: PropTypes.bool,
//     reference: PropTypes.object,
//     tag: PropTypes.string,
//     placeholder: PropTypes.string,
//     type: PropTypes.string
// }
//
// InputField.defaultProps = {
//     className: '',
//     label: '',
//     error: '',
//     func: () => {},
//     lel9: '',
//     required: false,
//     disabled: false,
//     reference: null,
//     tag: 'textarea',
//     placeholder: '',
//     type: ''
// }
//
// export default InputField;
