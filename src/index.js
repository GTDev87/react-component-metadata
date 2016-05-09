import * as babylon from 'babylon';
import traverse from 'babel-traverse';
import docs from './util/comments'
var _ = require("lodash");

function metadata(file, opts = {}) {
  var state = {
    file,
    result: {},
    seen: []
  }

  var visitor = {

    AssignmentExpression: require('./assignment-visitor')(state, opts),

    Function: require('./function-visitor')(state, opts),

    Class: require('./class-visitor')(state, opts),

    CallExpression: require('./createClass-visitor')(state, opts)
  }

  if (opts.mixins) {
    visitor.VariableDeclarator = require('./mixin-visitor')(state, opts)
  }

  let ast = babylon.parse(file, {
    sourceType: 'module',
    plugins: [
      'asyncFunctions',
      'jsx',
      'flow',
      'classConstructorCall',
      'doExpressions',
      'trailingFunctionCommas',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'exponentiationOperator',
      'asyncGenerators',
      'functionBind',
      'functionSent'
    ]
  })

  traverse(ast, visitor)

  const res = _.chain(state.result)
    .pairs()
    .filter(pair => !_.isEqual(pair[1].props, {}))
    .object()
    .value();

  return res
}

metadata.parseDoclets = docs.getDoclets

module.exports = metadata
