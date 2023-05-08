import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';

const LanguageSelector = ({
  intl, options, onSubmit, ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const languageCode = e.target.elements['site-footer-language-select'].value;
    onSubmit(languageCode);
  };

  return (
    <form
      className="form-inline"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="form-group">
        <select
          id="site-footer-language-select"
          className="form-control-sm mx-2"
          name="site-footer-language-select"
          defaultValue={intl.locale}
        >
          {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button data-testid="site-footer-submit-btn" className="btn btn-outline-primary btn-sm" type="submit">
          <FormattedMessage
            id="footer.languageForm.submit.label"
            defaultMessage="Apply"
            description="The label for button to submit the language selection form."
          />
        </button>
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
