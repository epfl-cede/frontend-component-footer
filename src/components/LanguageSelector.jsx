import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';

const LanguageSelector = ({
  intl, options, onSubmit, ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const languageCode = e.target.value;
    onSubmit(languageCode);
  };

  return (
    <form
      className="form-inline"
      {...props}
    >
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="site-footer-language-select" className="d-inline-block m-0">
          <FormattedMessage
            id="footer.languageForm.select.label"
            defaultMessage="Choose Language"
            description="The label for the laguage select part of the language selection form."
          />
        </label>
        <select
          id="site-footer-language-select"
          className="form-control-sm mx-2"
          name="site-footer-language-select"
          defaultValue={intl.locale}
          onChange={handleSubmit}
        >
          {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
    </form>
  );
};

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default injectIntl(LanguageSelector);
