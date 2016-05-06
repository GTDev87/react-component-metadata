'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require('./AssignedComponent.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssignedComponent = function AssignedComponent(props) {
  var onItemClick = props.onItemClick;
  var className = props.className;
  var children = props.children;
  var _props$selectedValues = props.selectedValues;
  var selectedValues = _props$selectedValues === undefined ? [] : _props$selectedValues;
  var selectedValue = props.selectedValue;


  if (selectedValue) {
    selectedValues.push(selectedValue);
  }

  return _react2.default.createElement(
    'ul',
    (0, _extends3.default)({}, props, { className: (0, _classnames2.default)('AssignedComponent', className) }),
    _react.Children.toArray(children).map(function (item) {
      var value = (0, _typeof3.default)(item.props.value) === 'object' ? (0, _stringify2.default)(item.props.value) : item.props.value;

      return _react2.default.cloneElement(item, (0, _extends3.default)({}, item.props, {
        value: value,
        onClick: item.props.onClick || onItemClick,
        selected: selectedValues.includes(value)
      }));
    })
  );
};

AssignedComponent.propTypes = {
  /**
   * An object hash of field errors for the form.
   */
  objProp: React.PropTypes.object,

  reqProp: React.PropTypes.object.isRequired,

  /**
   * Callback **that** is called when a validation error occurs.
   */
  funcProp:   React.PropTypes.func,

  stringProp: React.PropTypes.string,

  boolProp:   React.PropTypes.bool,

  'aria-property': React.PropTypes.string,

  enumProp:   React.PropTypes.oneOf([true, 'john', 5]),

  otherProp:  React.PropTypes.instanceOf(Message),

  shapeProp:  React.PropTypes.shape({
                setter: React.PropTypes.func,
                name: React.PropTypes.string
              }),

  unionProp: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string
  ]),

  reqUnionProp: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string
  ]).isRequired,

  customProp(props, name, componentName) {
    return React.PropTypes.any.isRequired(props, name, componentName)	
  },

  customIdentifier: someValidator,

  customCallExpression: someValidator()
};

AssignedComponent.defaultProps = {
  'aria-property': 'aria-value',
  stringProp: 'form',
  boolProp: true,
  funcProp: (path, model) => getter(path)(model),
  shapeProp: { setter: ()=>{}, name: 'John' }
}

AssignedComponent.MenuItem = _MenuItem2.default;

exports.default = AssignedComponent;


