"use strict";Object.defineProperty(exports,"__esModule",{value:true});var typeof_1=require("./typeof");var type_model_1=require("./type.model");exports.isEmpty=function(obj,type){if(type&&!typeof_1.isTypeOf(obj,type)){return false}var typeToCheck=type||typeof_1.typeOf(obj);if(typeToCheck){return exports.isEmptyCheck(obj,typeToCheck)}return false};var isObjectEmpty=function(obj){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){return false}}return true};var isFunctionEmpty=function(obj){var nonArrowString=obj.toString().replace(/(\s|\n|=>)/g,"");return/^(function)?([a-zA-Z_$][0-9a-zA-Z_$]*)?\(\){}$/.test(nonArrowString)};exports.isEmptyCheck=function(obj,type){switch(type){case type_model_1.Type.array:return obj.length===0;case type_model_1.Type.object:return isObjectEmpty(obj);case type_model_1.Type.string:return obj==="";case type_model_1.Type.regexp:return obj.toString()===new RegExp("").toString();case type_model_1.Type.function:return isFunctionEmpty(obj);case type_model_1.Type.undefined:case type_model_1.Type.null:return true}return false};"use strict";Object.defineProperty(exports,"__esModule",{value:true});var typeof_1=require("./typeof");var empty_1=require("./empty");function isFilled(obj,type){if(type&&!typeof_1.isTypeOf(obj,type)){return false}var typeToCheck=type||typeof_1.typeOf(obj);if(typeToCheck){return!empty_1.isEmptyCheck(obj,typeToCheck)}return false}exports.isFilled=isFilled;"use strict";Object.defineProperty(exports,"__esModule",{value:true});var remedial_1=require("remedial");exports.typeOf=function(obj){var type=remedial_1.typeOf(obj);return type==="object"?typeof obj:type};exports.isTypeOf=function(obj,type){return exports.typeOf(obj)===type};"use strict";Object.defineProperty(exports,"__esModule",{value:true});var type_model_1=require("./type.model");exports.Type=type_model_1.Type;var typeof_1=require("./typeof");exports.typeOf=typeof_1.typeOf;exports.isTypeOf=typeof_1.isTypeOf;var empty_1=require("./empty");exports.isEmpty=empty_1.isEmpty;var filled_1=require("./filled");exports.isFilled=filled_1.isFilled;