(self.webpackChunk_uiengine_ui=self.webpackChunk_uiengine_ui||[]).push([[262],{6502:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l}});var n=r(8522),i=r(9105),s=r(2241),a=r(7390),o=r(8271),c=r(7970);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={components:{ContentHeader:s.Z,ContentText:a.Z,ContentTag:o.Z},mixins:[c.Z],props:{id:{type:String,required:!0}},computed:f(f(f({},(0,i.Se)("state",["config","pages"])),(0,i.Se)("preferences",["currentTheme"])),{},{page:function(){return this.pages[this.id]},iframeSrc:function(){return"".concat(window.UIengine.base,"_tokens/").concat(this.currentTheme.id,"/").concat(this.page.id,".html")}}),mounted:function(){this.mountResizableIframe(this.$refs.iframe)},beforeDestroy:function(){this.unmountResizableIframe(this.$refs.iframe)}},l=(0,r(5129).Z)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("section",{staticClass:"page"},[r("ContentHeader",{attrs:{title:e.page.title}},e._l(e.page.tags,(function(e){return r("ContentTag",{key:e,staticClass:"uie-sob-m",attrs:{tag:e}})})),1),e._v(" "),r("ContentText",{staticClass:"uie-sot-xs uie-sob-xxxl",attrs:{item:e.page}})],1),e._v(" "),r("hr",{staticClass:"sections-divider"}),e._v(" "),r("iframe",{ref:"iframe",attrs:{src:e.iframeSrc,title:e.page.title,frameborder:"0",scrolling:"no","data-test-tokens-iframe":""}})])}),[],!1,null,"06a66f48",null).exports}}]);