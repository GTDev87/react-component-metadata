import * as t from 'babel-types';
import methodData from './component-body-visitor';
var _ = require("lodash");
let {
    parsePropTypes
  , parseDefaultProps } = require('./parseProps')
  , resolveToValue = require('./util/resolveToValue')
  , isReactFunction = require('./util/isReactFunction')
  , isCompiledReactClass = require('./util/isCompiledReactClass')
  , find = require('lodash/collection/find')
  , uuid = require('lodash/utility/uniqueId')
  , doc = require('./util/comments')


function getClassInitializerPropTypes(classBody, scope){
  var type = find(classBody, node => t.isClassProperty(node) && node.key.name === 'propTypes' && node.static);
  return type && resolveToValue(type.value, scope)
}

function getClassInitializerDefaults(classBody, scope){
  var type = find(classBody, node => t.isClassProperty(node) && node.key.name === 'defaultProps' && node.static);
  return type && resolveToValue(type.value, scope)
}


// this is getting all functions...
module.exports = function ClassVisitor(state, opts) {
  var json = state.result
    , components = state.seen

  return {
    enter(path) {
    	const { node, scope  } = path;
    	
      var isKnownComponent = isReactFunction(node, scope)

      if(isCompiledReactClass(node)){
      	const ggGrandParentPath = path.parentPath.parentPath.parentPath.parentPath;
      	const ggGrandParentNode = ggGrandParentPath.node;
      	//sadly the valu is on the great great grand parent
      	//this is a sequence expression

      	const proptypeAssignment = _.find(ggGrandParentNode.expressions, (exp) => {
      		return exp && exp.left && exp.left.property && exp.left.property.name === "propTypes";
      	});
      	const defaultPropsAssignment = _.find(ggGrandParentNode.expressions, (exp) => {
      		return exp && exp.left && exp.left.property && exp.left.property.name === "defaultProps";
      	});

      	var component = _.find(node.body.body, (body) => body.type === "ReturnStatement").argument.name || uuid('AnonymousComponent')
          , classBody = node.body.body //untrue
          , comment   = doc.parseCommentBlock(doc.findLeadingCommentNode(ggGrandParentPath.parentPath))
          , propTypes = resolveToValue(proptypeAssignment, scope)
          , defaultProps = resolveToValue(defaultPropsAssignment, scope);

        components.push(component)

        json[component] = {
          props: {},
          composes: [],
          methods: methodData(classBody),
          desc: comment || '',
          ...json[component]
        }

        parsePropTypes(resolveToValue(proptypeAssignment.right, scope), json[component], scope);
        parseDefaultProps(resolveToValue(defaultPropsAssignment), json[component], state.file, scope)

      }else if (isKnownComponent) {
        var component = node.id ? node.id.name : uuid('AnonymousComponent')
          , classBody = node.body.body
          , comment   = doc.parseCommentBlock(doc.findLeadingCommentNode(path))
          , propTypes = getClassInitializerPropTypes(classBody, scope)
          , defaultProps = getClassInitializerDefaults(classBody, scope);

        components.push(component)

        json[component] = {
          props: {},
          composes: [],
          methods: methodData(classBody),
          desc: comment || '',
          ...json[component]
        }
      }
    }
  }
}
