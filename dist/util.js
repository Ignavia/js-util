!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.util={})}(this,function(a){"use strict";var b=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},c=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),d=function(){function a(c){var d=arguments.length<=1||void 0===arguments[1]?1:arguments[1];b(this,a),this.hex=c,this.alpha=d}return c(a,null,[{key:"fromRGBA",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]?1:arguments[3],f=(b<<8|c)<<8|d;return new a(f,e)}},{key:"fromHSLA",value:function(b,c,d,e){b/=360;var f=void 0,g=void 0,h=void 0;if(0===c)f=g=h=d;else{var i=.5>=d?d*(c+1):d+c-d*c,j=2*d-i;f=a.hueToRGB(j,i,b+1/3),g=a.hueToRGB(j,i,b),h=a.hueToRGB(j,i,b-1/3)}f=Math.round(255*f),g=Math.round(255*g),h=Math.round(255*h);var k=(f<<8|g)<<8|h;return new a(k,e)}},{key:"hueToRGB",value:function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a}}]),c(a,[{key:"toRGBA",value:function(){var a=this.hex>>16&255,b=this.hex>>8&255,c=255&this.hex;return{r:a,g:b,b:c,a:this.alpha}}},{key:"toHSLA",value:function(){var a=(this.hex>>16&255)/255,b=(this.hex>>8&255)/255,c=(255&this.hex)/255,d=Math.max(a,b,c),e=Math.min(a,b,c),f=void 0,g=void 0,h=void 0;if(h=(d+e)/2,d===e)f=g=0;else{var i=d-e;switch(g=h>.5?i/(2-d-e):i/(d+e),d){case a:f=(b-c)/i+(c>b?6:0);break;case b:f=(c-a)/i+2;break;case c:f=(a-b)/i+4}f/=6}return{h:f,s:g,l:h,a:this.alpha}}},{key:"toString",value:function(){"#"+this.hex.toString(16)}}]),a}(),e={black:new d(0),silver:new d(12632256),gray:new d(8421504),white:new d(16777215),maroon:new d(8388608),red:new d(16711680),purple:new d(8388736),fuchsia:new d(16711935),green:new d(32768),lime:new d(65280),olive:new d(8421376),yellow:new d(16776960),navy:new d(128),blue:new d(255),teal:new d(32896),aqua:new d(65535),orange:new d(16753920),aliceblue:new d(15792383),antiquewhite:new d(16444375),aquamarine:new d(8388564),azure:new d(15794175),beige:new d(16119260),bisque:new d(16770244),blanchedalmond:new d(16770244),blueviolet:new d(9055202),brown:new d(10824234),burlywood:new d(14596231),cadetblue:new d(6266528),chartreuse:new d(8388352),chocolate:new d(13789470),coral:new d(16744272),cornflowerblue:new d(6591981),cornsilk:new d(16775388),crimson:new d(14423100),darkblue:new d(139),darkcyan:new d(35723),darkgoldenrod:new d(12092939),darkgray:new d(11119017),darkgreen:new d(25600),darkgrey:new d(11119017),darkkhaki:new d(12433259),darkmagenta:new d(9109643),darkolivegreen:new d(5597999),darkorange:new d(16747520),darkorchid:new d(10040012),darkred:new d(9109504),darksalmon:new d(15308410),darkseagreen:new d(9419919),darkslateblue:new d(4734347),darkslategray:new d(3100495),darkslategrey:new d(3100495),darkturquoise:new d(52945),darkviolet:new d(9699539),deeppink:new d(16716947),deepskyblue:new d(49151),dimgray:new d(6908265),dimgrey:new d(6908265),dodgerblue:new d(2003199),firebrick:new d(11674146),floralwhite:new d(16775920),forestgreen:new d(2263842),gainsboro:new d(14474460),ghostwhite:new d(16316671),gold:new d(16766720),goldenrod:new d(14329120),greenyellow:new d(11403055),grey:new d(8421504),honeydew:new d(15794160),hotpink:new d(16738740),indianred:new d(13458524),indigo:new d(4915330),ivory:new d(16777200),khaki:new d(15787660),lavender:new d(15132410),lavenderblush:new d(16773365),lawngreen:new d(8190976),lemonchiffon:new d(16775885),lightblue:new d(11393254),lightcoral:new d(15761536),lightcyan:new d(14745599),lightgoldenrodyellow:new d(16448210),lightgray:new d(13882323),lightgreen:new d(9498256),lightgrey:new d(13882323),lightpink:new d(16758465),lightsalmon:new d(16752762),lightseagreen:new d(2142890),lightskyblue:new d(8900346),lightslategray:new d(7833753),lightslategrey:new d(7833753),lightsteelblue:new d(11584734),lightyellow:new d(16777184),limegreen:new d(3329330),linen:new d(16445670),mediumaquamarine:new d(6737322),mediumblue:new d(205),mediumorchid:new d(12211667),mediumpurple:new d(9662683),mediumseagreen:new d(3978097),mediumslateblue:new d(8087790),mediumspringgreen:new d(64154),mediumturquoise:new d(4772300),mediumvioletred:new d(13047173),midnightblue:new d(1644912),mintcream:new d(16121850),mistyrose:new d(16770273),moccasin:new d(16770229),navajowhite:new d(16768685),oldlace:new d(16643558),olivedrab:new d(7048739),orangered:new d(16729344),orchid:new d(14315734),palegoldenrod:new d(15657130),palegreen:new d(10025880),paleturquoise:new d(11529966),palevioletred:new d(14381203),papayawhip:new d(16773077),peachpuff:new d(16767673),peru:new d(13468991),pink:new d(16761035),plum:new d(14524637),powderblue:new d(11591910),rosybrown:new d(12357519),royalblue:new d(4286945),saddlebrown:new d(9127187),salmon:new d(16416882),sandybrown:new d(16032864),seagreen:new d(3050327),seashell:new d(16774638),sienna:new d(10506797),skyblue:new d(8900331),slateblue:new d(6970061),slategray:new d(7372944),slategrey:new d(7372944),snow:new d(16775930),springgreen:new d(65407),steelblue:new d(4620980),tan:new d(13808780),thistle:new d(14204888),tomato:new d(16737095),turquoise:new d(4251856),violet:new d(15631086),wheat:new d(16113331),whitesmoke:new d(16119285),yellowgreen:new d(10145074),transparent:new d(0,0)},f=function(){function a(){b(this,a)}return c(a,[{key:"clone",value:function(){}}]),a}(),g={clone:function(){return this}},h=function p(a,c,d){b(this,p),this.source=a,this.type=c,this.data=d},i=function(){function a(){b(this,a),this.listeners=new Map}return c(a,null,[{key:"makeEvent",value:function(a,b,c){return new h(a,b,c)}}]),c(a,[{key:"addListener",value:function(a,b,c){"string"==typeof a&&(a=[a]),c&&(b=b.bind(c));var d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done);d=!0){var i=g.value;this.listeners.has(i)||this.listeners.set(i,[]),this.listeners.get(i).push(b)}}catch(j){e=!0,f=j}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return this}},{key:"fireEvent",value:function(a){var b=this.listeners.get(a.type)||[],c=!0,d=!1,e=void 0;try{for(var f,g=b[Symbol.iterator]();!(c=(f=g.next()).done);c=!0){var h=f.value;h(a)}}catch(i){d=!0,e=i}finally{try{!c&&g["return"]&&g["return"]()}finally{if(d)throw e}}return this}}]),a}(),j=function(){function a(){b(this,a)}return c(a,[{key:"addMethod",value:function(a,b,c){}},{key:"addPlugins",value:function(a){}}]),a}(),k={addMethod:function(a,b,c){var d=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];if(c&&(b=b.bind(c)),!d&&this[a])throw new Error("A property "+a+" exists already on "+this+".");return this[a]=b,this},addPlugins:function(a){a instanceof Plugin&&(a=[a]);var b=!0,c=!1,d=void 0;try{for(var e,f=a[Symbol.iterator]();!(b=(e=f.next()).done);b=!0){var g=e.value;g.register(this)}}catch(h){c=!0,d=h}finally{try{!b&&f["return"]&&f["return"]()}finally{if(c)throw d}}return this}},l=function(){function a(){var c=arguments.length<=0||void 0===arguments[0]?"":arguments[0];b(this,a),this.prefix=c,this.counter=0}return c(a,[{key:"next",value:function(){return this.prefix+this.counter++}}]),a}(),m=function(){function a(){b(this,a)}return c(a,[{key:"addListener",value:function(a,b,c){}}]),a}(),n={addListener:function(a,b,c){return this.eventManager.addListener(a,b,c),this},fireEvent:function(a,b){var c=i.makeEvent(this,a,b);this.eventManager.fireEvent(c)},bubbleEvent:function(a,b){b&&(a=i.makeEvent(a.source,b,a.data)),this.eventManager.fireEvent(a)}},o=function(){function a(){b(this,a)}return c(a,[{key:"register",value:function(a){}},{key:"clone",value:function(){return this}}]),a}();a.Color=d,a.predefinedColors=e,a.Cloneable=f,a.cloneableMixin=g,a.Event=h,a.EventManager=i,a.Extensible=j,a.extensibleMixin=k,a.IDGenerator=l,a.Observable=m,a.observableMixin=n,a.Plugin=o});