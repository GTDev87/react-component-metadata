'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ui = require('../ui');

require('./Tooltip.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Tooltip, _Component);

  function Tooltip() {
    var _Object$getPrototypeO;

    (0, _classCallCheck3.default)(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Tooltip)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.state = { visible: false };
    return _this;
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this is for a transition
      this.setState({ visible: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var title = _props.title;
      var description = _props.description;
      var header = _props.header;
      var footer = _props.footer;
      var className = _props.className;
      var visible = this.state.visible;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('Tooltip', { 'Tooltip--visible': visible }, className) },
        header,
        _react2.default.createElement(_ui.TooltipContent, { title: title, description: description }),
        footer
      );
    }
  }]);
  return Tooltip;
}(_react.Component), _class.propTypes = {
  title: _react.PropTypes.string,
  description: _react.PropTypes.string.isRequired,
  header: _react.PropTypes.node,
  footer: _react.PropTypes.node,
  className: _react.PropTypes.string
}, _temp);
exports.default = Tooltip;