import PropTypes from "prop-types";

export default function KWEDefaultCheckbox({
  name,
  className,
  checked,
  label,
  inline,
  disabled: disabledProps,
  onChange,
  onFocus,
  checkboxClassName,
  labelClassName,
  requiredField,
  onBlur,
  tabIndex,
  convertToText: convertToTextProps,
  summary,
}) {
  let disabled = disabledProps;
  let convertToText = convertToTextProps;
  if (summary) {
    disabled = true;
    convertToText = true;
  }

  if (disabled && convertToText) {
    return (
      <span className="text-data-general">
        {TextFormatter.trimAndTooltip(checked)}
      </span>
    );
  }
  return (
    <label
      htmlFor={true.toString()}
      className={`kwe-checkbox-wrap ${
        inline ? "display-inline" : ""
      } ${labelClassName}`}
    >
      <input
        type="checkbox"
        className={`k-checkbox kwe-checkbox ${checkboxClassName}`}
        name={name}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        disabled={disabled}
        onBlur={onBlur}
        tabIndex={tabIndex}
      />
      <span className={`pl-1 ${className}`}>
        {label}{" "}
        {requiredField ? <span className="ted-required"> *</span> : null}{" "}
      </span>
    </label>
  );
}

KWEDefaultCheckbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  checkboxClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  requiredField: PropTypes.bool,
  tabIndex: PropTypes.number,
  convertToText: PropTypes.bool,
  summary: PropTypes.bool,
};

KWEDefaultCheckbox.defaultProps = {
  name: "",
  checked: false,
  label: "",
  inline: false,
  disabled: undefined,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  className: "",
  checkboxClassName: "",
  labelClassName: "",
  requiredField: false,
  tabIndex: undefined,
  convertToText: false,
  summary: false,
};
