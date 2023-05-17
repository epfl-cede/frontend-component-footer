import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  getLocalePrefix(locale) {
    const twoLetterPrefix = locale.substring(0, 2).toLowerCase();
    if (twoLetterPrefix === 'en') {
      return '';
    }
    return `/${twoLetterPrefix}`;
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    if (config.CATALOG_BASE_URL) {
      const tos_url = `${config.CATALOG_BASE_URL}general-terms-and-conditions/`
      const privacy_url = `${config.CATALOG_BASE_URL}privacy-policy/`
    } else {
      const tos_url = `https://swissmooc.ch/general-terms-and-conditions/`
      const privacy_url = `https://swissmooc.ch/privacy-policy/`
    }

    return (
      <footer
        role="contentinfo"
        className="footer d-flex border-top py-3 px-4"
      >
        <div className="container-fluid d-flex">
          <ul className="list-unstyled">
            <li>
              {showLanguageSelector && (
                  <LanguageSelector
                    options={supportedLanguages}
                    onSubmit={onLanguageSelected}
                  />
              )}
            </li>
            <li style={{ fontSize: "0.6875em" }} className="pt-1">
              © {config.SITE_NAME}. All rights reserved except where noted.  edX, Open edX and their respective logos are registered trademarks of edX Inc.
            </li>
            <li style={{ fontSize: "0.6875em" }} className="pt-1">
              <a className="text-primary-500 mr-1" href={tos_url}>{intl.formatMessage(messages['footer.catalogLinks.tos'])}</a>
              <a className="text-primary-500 ml-1" href={privacy_url}>{intl.formatMessage(messages['footer.catalogLinks.privacy'])}</a>
            </li>
          </ul>
          <div className="flex-grow-1" />
          <a
            className="d-block"
            href={config.LMS_BASE_URL}
            aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
          >
            <img
              style={{ maxHeight: 45 }}
              src={logo || config.LOGO_TRADEMARK_URL}
              alt={intl.formatMessage(messages['footer.logo.altText'])}
            />
          </a>
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
