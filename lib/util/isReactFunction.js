'use strict';

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var isReactImport = require('./isReactImport');

function extendsReactFunction(node, scope) {
  return t.isFunctionDeclaration(node) || t.isFunctionExpression(node);
  // && node.property.name === 'PropTypes'
  // && isReactImport(resolveToModule(node.superClass, scope), scope)
}

module.exports = function isReactComponentClass(node, scope) {
  return extendsReactFunction(node, scope);
};