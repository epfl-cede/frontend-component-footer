var _excluded = ["intl", "options", "onSubmit"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { Language } from '@openedx/paragon/icons';
var LanguageSelector = function LanguageSelector(_ref) {
  var intl = _ref.intl,
    options = _ref.options,
    onSubmit = _ref.onSubmit,
    props = _objectWithoutProperties(_ref, _excluded);
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var languageCode = e.target.value;
    onSubmit(languageCode);
  };
  options.sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
  return /*#__PURE__*/React.createElement("form", _extends({
    className: "form-inline"
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "site-footer-language-select",
    className: "d-inline-block m-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    src: Language
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.languageForm.select.label",
    defaultMessage: "Choose Language",
    description: "The label for the laguage select part of the language selection form."
  }))), /*#__PURE__*/React.createElement("select", {
    id: "site-footer-language-select",
    className: "form-control-sm mx-2",
    name: "site-footer-language-select",
    defaultValue: intl.locale,
    onChange: handleSubmit
  }, options.map(function (_ref2) {
    var value = _ref2.value,
      label = _ref2.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  }))));
};
LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired
};
export default injectIntl(LanguageSelector);
//# sourceMappingURL=LanguageSelector.js.map