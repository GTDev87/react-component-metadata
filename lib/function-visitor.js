'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _componentBodyVisitor = require('./component-body-visitor');

var _componentBodyVisitor2 = _interopRequireDefault(_componentBodyVisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _ = require("lodash");

var _require = require('./parseProps');

var parsePropTypes = _require.parsePropTypes;
var parseDefaultProps = _require.parseDefaultProps;
var resolveToValue = require('./util/resolveToValue');
var isReactFunction = require('./util/isReactFunction');
var isCompiledReactClass = require('./util/isCompiledReactClass');
var find = require('lodash/collection/find');
var uuid = require('lodash/utility/uniqueId');
var doc = require('./util/comments');

function getClassInitializerPropTypes(classBody, scope) {
  var type = find(classBody, function (node) {
    return t.isClassProperty(node) && node.key.name === 'propTypes' && node.static;
  });
  return type && resolveToValue(type.value, scope);
}

function getClassInitializerDefaults(classBody, scope) {
  var type = find(classBody, function (node) {
    return t.isClassProperty(node) && node.key.name === 'defaultProps' && node.static;
  });
  return type && resolveToValue(type.value, scope);
}

// this is getting all functions...
module.exports = function ClassVisitor(state, opts) {
  var json = state.result,
      components = state.seen;

  return {
    enter: function enter(path) {
      var node = path.node;
      var scope = path.scope;


      var isKnownComponent = isReactFunction(node, scope);

      if (isCompiledReactClass(node)) {
        var ggGrandParentPath = path.parentPath.parentPath.parentPath.parentPath;
        var ggGrandParentNode = ggGrandParentPath.node;
        //sadly the valu is on the great great grand parent
        //this is a sequence expression

        var proptypeAssignment = _.find(ggGrandParentNode.expressions, function (exp) {
          return exp && exp.left && exp.left.property && exp.left.property.name === "propTypes";
        });
        var defaultPropsAssignment = _.find(ggGrandParentNode.expressions, function (exp) {
          return exp && exp.left && exp.left.property && exp.left.property.name === "defaultProps";
        });

        var component = _.find(node.body.body, function (body) {
          return body.type === "ReturnStatement";
        }).argument.name || uuid('AnonymousComponent'),
            classBody = node.body.body //untrue
        ,
            comment = doc.parseCommentBlock(doc.findLeadingCommentNode(ggGrandParentPath.parentPath)),
            propTypes = resolveToValue(proptypeAssignment, scope),
            defaultProps = resolveToValue(defaultPropsAssignment, scope);

        components.push(component);

        json[component] = _extends({
          props: {},
          composes: [],
          methods: (0, _componentBodyVisitor2.default)(classBody),
          desc: comment || ''
        }, json[component]);

        parsePropTypes(resolveToValue(proptypeAssignment.right, scope), json[component], scope);
        parseDefaultProps(resolveToValue(defaultPropsAssignment), json[component], state.file, scope);
      } else if (isKnownComponent) {
        var component = node.id ? node.id.name : uuid('AnonymousComponent'),
            classBody = node.body.body,
            comment = doc.parseCommentBlock(doc.findLeadingCommentNode(path)),
            propTypes = getClassInitializerPropTypes(classBody, scope),
            defaultProps = getClassInitializerDefaults(classBody, scope);

        components.push(component);

        json[component] = _extends({
          props: {},
          composes: [],
          methods: (0, _componentBodyVisitor2.default)(classBody),
          desc: comment || ''
        }, json[component]);
      }
    }
  };
};