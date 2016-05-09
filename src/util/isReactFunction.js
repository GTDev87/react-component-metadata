import * as t from 'babel-types';
let isReactImport = require('./isReactImport');


function extendsReactFunction(node, scope) {
  return (t.isFunctionDeclaration(node) || t.isFunctionExpression(node))
  	// && node.property.name === 'PropTypes'
    // && isReactImport(resolveToModule(node.superClass, scope), scope)
}

module.exports = function isReactComponentClass(node, scope) {
  return extendsReactFunction(node, scope)
};
