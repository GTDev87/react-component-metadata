import * as t from 'babel-types';
let isReactImport = require('./isReactImport');
let _ = require('lodash');

module.exports = function isCompiledReactClass(node) {
	return (t.isFunctionDeclaration(node) || t.isFunctionExpression(node)) &&
		!!_.find(node.params, (param) => param.name === "_Component");
};
