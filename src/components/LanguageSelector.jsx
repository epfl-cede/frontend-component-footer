import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { Language } from '@openedx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import Cookies from 'universal-cookie';

const LanguageSelector = ({
  intl, options, onSubmit, ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const languageCode = e.target.value;
    onSubmit(languageCode);
  };
  const cookies = new Cookies();
  const cookieLanguage = cookies.get(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME);
  options.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <form
      className="form-inline"
      {...props}
    >
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="site-footer-language-select" className="d-inline-block m-0">
          <Icon src={Language}/>
          <span className="sr-only">
            <FormattedMessage
              id="footer.languageForm.select.label"
              defaultMessage="Choose Language"
              description="The label for the laguage select part of the language selection form."
            />
          </span>
        </label>
        <select
          id="site-footer-language-select"
          className="form-control-sm mx-2"
          name="site-footer-language-select"
          defaultValue={cookieLanguage || intl.locale}
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
