var e;(e=exports.Type||(exports.Type={})).array="array",e.bigint="bigint",e.boolean="boolean",e.date="date",e.error="error",e.function="function",e.nan="nan",e.null="null",e.number="number",e.object="object",e.promise="promise",e.regexp="regexp",e.string="string",e.symbol="symbol",e[void 0]="undefined",e.unset="unset";var r=function(e){if(null==e)return String(e);var r=typeof e;return"object"===r?Object.prototype.toString.call(e).replace(/\[object (.*)]/,"$1").toLowerCase():"number"===r&&Number.isNaN(e)?"nan":r},t=function(e,r){switch(r){case exports.Type.array:return 0===e.length;case exports.Type.object:return function(e){for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r))return!1;return!0}(e);case exports.Type.string:return""===e;case exports.Type.regexp:return e.toString()===new RegExp("").toString();case exports.Type.function:return function(e){var r=e.toString().replace(/(\s|\n|=>)/g,"");return/^(function)?([a-zA-Z_$][0-9a-zA-Z_$]*)?\(\){}$/.test(r)}(e);case exports.Type.error:return""===e.message;case exports.Type[void 0]:case exports.Type.null:return!0}return!1};exports.typeOf=r,exports.isTypeOf=function(e,t){for(var n=[],o=arguments.length-2;o-- >0;)n[o]=arguments[o+2];var s=r(e);return[t].concat(n).reduce(function(e,r){return e||!(r!==exports.Type.unset||![exports.Type.nan,exports.Type.null,exports.Type[void 0]].includes(s))||s===r},!1)},exports.isEmpty=function(e,n){for(var o=[],s=arguments.length-2;s-- >0;)o[s]=arguments[s+2];var p=[n].concat(o),u=r(e);return!!p.includes(u)&&!!u&&t(e,u)},exports.isFilled=function(e){for(var n=[],o=arguments.length-1;o-- >0;)n[o]=arguments[o+1];var s=r(e);return!!n.includes(s)&&!!s&&!t(e,s)};
//# sourceMappingURL=index.js.map
