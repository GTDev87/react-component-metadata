'use strict';

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var isReactImport = require('./isReactImport');
var _ = require('lodash');

module.exports = function isCompiledReactClass(node) {
	return (t.isFunctionDeclaration(node) || t.isFunctionExpression(node)) && !!_.find(node.params, function (param) {
		return param.name === "_Component";
	});
};