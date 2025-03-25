var V=n=>{throw TypeError(n)};var W=(n,t,e)=>t.has(n)||V("Cannot "+e);var _=(n,t,e)=>(W(n,t,"read from private field"),e?e.call(n):t.get(n)),g=(n,t,e)=>t.has(n)?V("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e);import{compute as p,State as N,Compute as D,Watcher as R,watcher as G,state as U}from"belling";var w=class{constructor(t,e){this.name=t,this.children=e}style(t){return this._style=t,this}attr(t){return this._attr=t,this}on(t){return this._events=t,this}ref(t){return this._ref=t,this}render(t){var o;let e=document.createElement(this.name);if(this.dom=e,this._events)for(let s in this._events){let i=this._events[s];s==="unmount"?t._addDestroyCallback(i):e.addEventListener(s,i)}if(this._attr)for(let s in this._attr){let i=this._attr[s];typeof i=="function"?t._watch(p(()=>{e.setAttribute(s,i())})):i instanceof D||i instanceof N?t._watch(p(()=>{e.setAttribute(s,i.v)})):e.setAttribute(s,i)}if(this._style)for(let s in this._style){let i=s,r=this._style[i];typeof r=="function"?t._watch(p(()=>{e.style[i]=r()})):r instanceof D||r instanceof N?t._watch(p(()=>{e.style[i]=r.v})):e.style[i]=r}if(this.children)for(let s of this.children)if(typeof s=="string"){let i=document.createTextNode(s);e.appendChild(i)}else if(typeof s=="function"){let i=document.createTextNode("");t._watch(p(()=>i.nodeValue=s())),e.appendChild(i)}else if(s instanceof N||s instanceof D){let i=document.createTextNode("");t._watch(p(()=>i.nodeValue=s.v)),e.appendChild(i)}else e.appendChild(s.render(t));return(o=this._ref)==null||o.call(this,e),e}},j=new Set,F=new Set,M=!1;function z(){F.forEach(n=>n()),j.forEach(n=>n.v),j.clear(),F.clear(),M=!1}function H(n){M||(M=!0,requestAnimationFrame(z)),typeof n=="function"?F.add(n):j.add(n)}var m,T,S=class{constructor(t,e){g(this,m,new R);g(this,T,[]);this._whenDestroy=[];_(this,m).callback=H,this.dom=e.render(this),t==null||t.appendChild(this.dom)}_watch(t){_(this,T).push(t),_(this,m).watch(t)}_addDestroyCallback(t){this._whenDestroy.push(t)}_destroy(){_(this,m).unwatch(),this._whenDestroy.forEach(t=>t())}};m=new WeakMap,T=new WeakMap;function J(n,t,e){if(e.length=0,t.length=0,n.length<1)return e;function o(l,c){for(let d=t.length;d<l;d++)t.push(-1);t[l]=c}let s=0,i=n.length;for(;s<i&&n[s]==-1;s++);for(e[0]=s;s<i;s++){let l=n[s];if(l==-1)continue;let c=e[e.length-1];if(n[c]<l){o(s,c),e.push(s);continue}let d=0,h=e.length-1,y;for(;d<h;)y=d+h>>1,n[e[y]]<l?d=y+1:h=y;let f=d;l<n[e[f]]&&(f>0&&o(s,e[f-1]),e[f]=s)}s=e.length;let r=e[e.length-1];if(r>n.length)return e;for(;s-- >0;)e[s]=n[r],r=t[r];return e}var q=[],L=[],B=[],K=[],x,v,b=class extends w{constructor(e,o,s){super(e);g(this,x,new Map);g(this,v,new Map);this.list=o,this.f=s}render(e){let o=super.render(e),s=this.list,i=_(this,x),r=this.f,l=_(this,v);function c(){let h=q;h.length=0;let y=s.v;y.forEach(a=>{let u=i.get(a);typeof u=="number"?(i.set(a,-1),h.push(u)):h.push(-1)}),K.length=0;let f=K;o.childNodes.forEach(a=>f.push(a)),i.forEach((a,u)=>{a!=-1&&(l.get(u)._destroy(),l.delete(u),i.delete(u),o.removeChild(f[a]))});let I=J(h,L,B),P=0;y.forEach((a,u)=>{let C=h[u],k=I[P];if(C==-1){let A=new S(void 0,r(a));l.set(a,A),u==y.length-1?o.appendChild(A.dom):o.insertBefore(A.dom,f[k])}else C==k?P++:o.insertBefore(f[C],f[k]);i.set(a,u)}),q.length=0,L.length=0,B.length=0,K.length=0}let d=G(()=>{H(c)});return d.watch(s),e._addDestroyCallback(()=>{d.unwatch(),_(this,v).forEach(h=>h._destroy())}),c(),o}};x=new WeakMap,v=new WeakMap;var E=class extends w{constructor(t){super(""),this._node=t,this._ele=t.v;let e=()=>{var s;let o=t.v;if(this._ele=o,this.name=o.name,this._events=o._events,this._attr=o._attr,this._style=o._style,this._ref=o._ref,this.children=o.children,(s=this._root)==null||s._destroy(),this._root=new S(void 0,o),this.dom){let i=this.dom.parentNode;i&&i.replaceChild(this._root.dom,this.dom)}this.dom=o.dom};this._watcher=G(e),this._watcher.watch(t),e()}render(t){return t._addDestroyCallback(()=>{var e;(e=this._root)==null||e._destroy(),this._watcher.unwatch()}),this.dom}};function $(n,...t){return new w(n,t)}function tt(n,t,e){return new b(n,t,e)}function et(n,t,e){let o=new WeakMap;return new b(n,p(()=>{let i=t.v;return i.forEach((r,l)=>{let c=o.get(r);c?c.v=l:o.set(r,U(l))}),i}),i=>e(o.get(i),i))}function nt(n){return typeof n=="function"?new E(p(n)):new E(n)}export{tt as ForEach,et as ForIn,nt as dynNode,$ as h,S as root};
//# sourceMappingURL=index.js.map
