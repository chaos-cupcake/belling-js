var q=e=>{throw TypeError(e)};var G=(e,n,o)=>n.has(e)||q("Cannot "+o);var x=(e,n,o)=>(G(e,n,"read from private field"),o?o.call(e):n.get(e)),g=(e,n,o)=>n.has(e)?q("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,o);import{compute as m,State as N,Compute as H,Watcher as I,watcher as W,state as R}from"belling";var t=class{constructor(n,o){this.name=n,this.children=o}style(n){return this._style?Object.assign(this._style,n):this._style=n,this}attr(n){return this._attr?Object.assign(this._attr,n):this._attr=n,this}on(n){return this._events?Object.assign(this._events,n):this._events=n,this}ref(n){return this._ref=n,this}render(n,o=document.createElement(this.name)){var u;let i=o;if(this.dom=i,this._events)for(let r in this._events){let c=this._events[r];r==="unmount"?n._addDestroyCallback(c):i.addEventListener(r,c)}if(this._attr)for(let r in this._attr){let c=this._attr[r];typeof c=="function"?n._watch(m(()=>{i.setAttribute(r,c())})):c instanceof H||c instanceof N?n._watch(m(()=>{i.setAttribute(r,c.v)})):i.setAttribute(r,c)}if(this._style)for(let r in this._style){let c=r,l=this._style[c];typeof l=="function"?n._watch(m(()=>{i.style[c]=l()})):l instanceof H||l instanceof N?n._watch(m(()=>{i.style[c]=l.v})):i.style[c]=l}if(this.children)for(let r of this.children)if(typeof r=="string"){let c=document.createTextNode(r);i.appendChild(c)}else if(typeof r=="function"){let c=document.createTextNode("");n._watch(m(()=>c.nodeValue=r())),i.appendChild(c)}else if(r instanceof N||r instanceof H){let c=document.createTextNode("");n._watch(m(()=>c.nodeValue=r.v)),i.appendChild(c)}else i.appendChild(r.render(n));return(u=this._ref)==null||u.call(this,i),i}},C=new Set,D=new Set,j=!1;function U(){D.forEach(e=>e()),C.forEach(e=>e.v),C.clear(),D.clear(),j=!1}function O(e){j||(j=!0,requestAnimationFrame(U)),typeof e=="function"?D.add(e):C.add(e)}var y,E,_=class{constructor(n,o){g(this,y,new I);g(this,E,[]);this._whenDestroy=[];x(this,y).callback=O,this.dom=o.render(this),n==null||n.appendChild(this.dom)}_watch(n){x(this,E).push(n),x(this,y).watch(n)}_addDestroyCallback(n){this._whenDestroy.push(n)}_destroy(){x(this,y).unwatch(),this._whenDestroy.forEach(n=>n())}};y=new WeakMap,E=new WeakMap;function z(e,n,o){if(o.length=0,n.length=0,e.length<1)return o;function i(l,a){for(let h=n.length;h<l;h++)n.push(-1);n[l]=a}let u=0,r=e.length;for(;u<r&&e[u]==-1;u++);for(o[0]=u;u<r;u++){let l=e[u];if(l==-1)continue;let a=o[o.length-1];if(e[a]<l){i(u,a),o.push(u);continue}let h=0,s=o.length-1,w;for(;h<s;)w=h+s>>1,e[o[w]]<l?h=w+1:s=w;let f=h;l<e[o[f]]&&(f>0&&i(u,o[f-1]),o[f]=u)}u=o.length;let c=o[o.length-1];if(c>e.length)return o;for(;u-- >0;)o[u]=e[c],c=n[c];return o}var V=[],F=[],P=[],K=[],M,T,b=class extends t{constructor(o,i,u){super(o);g(this,M,new Map);g(this,T,new Map);this.list=i,this.f=u}render(o){let i=super.render(o),u=this.list,r=x(this,M),c=this.f,l=x(this,T);function a(){let s=V;s.length=0;let w=u.v;w.forEach(d=>{let p=r.get(d);typeof p=="number"?(r.set(d,-1),s.push(p)):s.push(-1)}),K.length=0;let f=K;i.childNodes.forEach(d=>f.push(d)),r.forEach((d,p)=>{d!=-1&&(l.get(p)._destroy(),l.delete(p),r.delete(p),i.removeChild(f[d]))});let B=z(s,F,P),A=0;w.forEach((d,p)=>{let k=s[p],L=B[A];if(k==-1){let S=new _(void 0,c(d));l.set(d,S),p==w.length-1?i.appendChild(S.dom):i.insertBefore(S.dom,f[L])}else k==L?A++:i.insertBefore(f[k],f[L]);r.set(d,p)}),V.length=0,F.length=0,P.length=0,K.length=0}let h=W(()=>{O(a)});return h.watch(u),o._addDestroyCallback(()=>{h.unwatch(),x(this,T).forEach(s=>s._destroy())}),a(),i}};M=new WeakMap,T=new WeakMap;var v=class extends t{constructor(o){super("div");this.dom=void 0;this._node=o}render(o){let i=this._node;this._ele=i.v;let u=()=>{var c;let r=i.v;if(this._ele=r,this._events=r._events,this._attr=r._attr,this._style=r._style,this._ref=r._ref,this.children=r.children,(c=this._root)==null||c._destroy(),this._root=new _(void 0,r),this.dynDom){let l=this.dynDom.parentNode;l&&l.replaceChild(this._root.dom,this.dynDom)}this.dynDom=r.dom};return this._watcher=W(u),this._watcher.watch(i),u(),o._addDestroyCallback(()=>{var r;(r=this._root)==null||r._destroy(),this._watcher.unwatch()}),this.dynDom}};function $(e,...n){return new t(e,n)}function ee(e,n,o){return new b(e,n,o)}function te(e,n,o){let i=new WeakMap;return new b(e,m(()=>{let r=n.v;return r.forEach((c,l)=>{let a=i.get(c);a?a.v=l:i.set(c,R(l))}),r}),r=>o(i.get(r),r))}function ne(e){return typeof e=="function"?new v(m(e)):new v(e)}function re(...e){return new t("address",e)}function oe(...e){return new t("article",e)}function ie(...e){return new t("aside",e)}function ce(...e){return new t("footer",e)}function ue(...e){return new t("header",e)}function le(...e){return new t("h1",e)}function se(...e){return new t("h2",e)}function de(...e){return new t("h3",e)}function ae(...e){return new t("h4",e)}function he(...e){return new t("h5",e)}function fe(...e){return new t("h6",e)}function pe(...e){return new t("main",e)}function we(...e){return new t("nav",e)}function xe(...e){return new t("section",e)}function me(...e){return new t("blockquote",e)}function ye(...e){return new t("dd",e)}function ge(...e){return new t("div",e)}function Te(...e){return new t("dl",e)}function _e(...e){return new t("dt",e)}function be(...e){return new t("figcaption",e)}function ve(...e){return new t("figure",e)}function Ee(){return new t("hr")}function Me(...e){return new t("li",e)}function ke(...e){return new t("menu",e)}function Le(...e){return new t("ol",e)}function Se(...e){return new t("p",e)}function Ne(...e){return new t("pre",e)}function He(...e){return new t("ul",e)}function Ke(...e){return new t("a",e)}function Ce(...e){return new t("abbr",e)}function De(...e){return new t("b",e)}function je(...e){return new t("bdi",e)}function Ae(...e){return new t("bdo",e)}function qe(){return new t("br")}function Ve(...e){return new t("cite",e)}function Fe(...e){return new t("code",e)}function Pe(...e){return new t("data",e)}function We(...e){return new t("dfn",e)}function Oe(...e){return new t("em",e)}function Be(...e){return new t("i",e)}function Ge(...e){return new t("kbd",e)}function Ie(...e){return new t("mark",e)}function Re(...e){return new t("q",e)}function Ue(...e){return new t("rp",e)}function ze(...e){return new t("rt",e)}function Je(...e){return new t("ruby",e)}function Qe(...e){return new t("s",e)}function Xe(...e){return new t("samp",e)}function Ye(...e){return new t("small",e)}function Ze(...e){return new t("span",e)}function $e(...e){return new t("strong",e)}function et(...e){return new t("sub",e)}function tt(...e){return new t("sup",e)}function nt(...e){return new t("time",e)}function rt(...e){return new t("u",e)}function ot(...e){return new t("var",e)}function it(){return new t("wbr")}function ct(){return new t("area")}function ut(...e){return new t("audio",e)}function lt(){return new t("img")}function st(...e){return new t("map",e)}function dt(){return new t("track")}function at(...e){return new t("video",e)}function ht(){return new t("embed")}function ft(...e){return new t("iframe",e)}function pt(...e){return new t("object",e)}function wt(...e){return new t("picture",e)}function xt(){return new t("source")}function mt(...e){return new t("canvas",e)}function yt(...e){return new t("ins",e)}function gt(...e){return new t("del",e)}function Tt(...e){return new t("caption",e)}function _t(){return new t("col")}function bt(...e){return new t("colgroup",e)}function vt(...e){return new t("table",e)}function Et(...e){return new t("tbody",e)}function Mt(...e){return new t("td",e)}function kt(...e){return new t("tfoot",e)}function Lt(...e){return new t("th",e)}function St(...e){return new t("thead",e)}function Nt(...e){return new t("tr",e)}function Ht(...e){return new t("button",e)}function Kt(...e){return new t("datalist",e)}function Ct(...e){return new t("fieldset",e)}function Dt(...e){return new t("form",e)}function jt(){return new t("input")}function At(...e){return new t("label",e)}function qt(...e){return new t("legend",e)}function Vt(...e){return new t("meter",e)}function Ft(...e){return new t("optgroup",e)}function Pt(...e){return new t("option",e)}function Wt(...e){return new t("output",e)}function Ot(...e){return new t("progress",e)}function Bt(...e){return new t("select",e)}function Gt(...e){return new t("textarea",e)}function It(...e){return new t("details",e)}function Rt(...e){return new t("dialog",e)}function Ut(...e){return new t("summary",e)}function zt(...e){return new t("slot",e)}function Jt(...e){return new t("template",e)}export{ee as ForEach,te as ForIn,ot as Var,Ke as a,Ce as abbr,re as address,ct as area,oe as article,ie as aside,ut as audio,De as b,je as bdi,Ae as bdo,me as blockquote,qe as br,Ht as button,mt as canvas,Tt as caption,Ve as cite,Fe as code,_t as col,bt as colgroup,Pe as data,Kt as datalist,ye as dd,gt as del,It as details,We as dfn,Rt as dialog,ge as div,Te as dl,_e as dt,ne as dynNode,Oe as em,ht as embed,Ct as fieldset,be as figcaption,ve as figure,ce as footer,Dt as form,$ as h,le as h1,se as h2,de as h3,ae as h4,he as h5,fe as h6,ue as header,Ee as hr,Be as i,ft as iframe,lt as img,jt as input,yt as ins,Ge as kbd,At as label,qt as legend,Me as li,pe as main,st as map,Ie as mark,ke as menu,Vt as meter,we as nav,pt as object,Le as ol,Ft as optgroup,Pt as option,Wt as output,Se as p,wt as picture,Ne as pre,Ot as progress,Re as q,_ as root,Ue as rp,ze as rt,Je as ruby,Qe as s,Xe as samp,xe as section,Bt as select,zt as slot,Ye as small,xt as source,Ze as span,$e as strong,et as sub,Ut as summary,tt as sup,vt as table,Et as tbody,Mt as td,Jt as template,Gt as textarea,kt as tfoot,Lt as th,St as thead,nt as time,Nt as tr,dt as track,rt as u,He as ul,at as video,it as wbr};
//# sourceMappingURL=index.js.map
