var D=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var v=(e,t,r)=>(D(e,t,"read from private field"),r?r.call(e):t.get(e)),j=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},C=(e,t,r,n)=>(D(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r);var{max:S,min:x}=Math;function b(e,t){return x(e<0?S(0,t+e):e,t-1)}function c(e,t,r){if(e.length==0||t==0&&r==e.length)return e;if(e.data){let n=new _;return n.off=t+e.off,n.length=r,n.data=e.data,Object.freeze(n),n}else{let{left:n,right:i}=e;if(!(n instanceof _&&i instanceof _))throw new TypeError;if(t>n.length)return c(i,t-n.length,r);if(t+r<n.length)return c(n,t,r);let s=new _,a=n.length-t;return s.left=c(n,t,a),s.right=c(i,0,r-a),s.length=r,s}}function L(e,t){let r=new _;return r.left=e,r.right=t,r.length=t.length+e.length,r}function w(...e){let t=new _;return t.data=e,t.length=e.length,t}var _=class e{constructor(){this.length=0;this.off=0}subarray(t,r){return t=b(t,this.length),r=x(this.length-t,r),c(this,t,r)}unshift(...t){return t.length<=0?this:w(...t).concat(this)}push(...t){return t.length<=0?this:this.concat(w(...t))}concat(t){return L(this,t)}insert(t,...r){return t=b(t,this.length),t==0?this.unshift(...r):t==this.length?this.push(...r):c(this,0,t).concat(c(this,t,this.length-t).unshift(...r))}delete(t,r){t=b(t,this.length);let n=t+r,i=t==0,s=n>=this.length;return i&&s?R:i?c(this,n,this.length-n):s?c(this,0,t):c(this,0,t).concat(c(this,n,this.length-n))}splice(t,r,...n){t=b(t,this.length);let i=t+r,s=t==0,a=i>=this.length;return s&&a?R:s?c(this,i,this.length-i).unshift(...n):a?c(this,0,t).push(...n):c(this,0,t).push(...n).concat(c(this,i,this.length-i))}set(t,r){return this.splice(t,1,r)}at(t){let r=this;if(t<0){if(t+=r.length,t<0)return}else if(t>=r.length)return;for(;r.left instanceof e;){let{left:n,right:i}=r;n.length>t?r=n:(r=i,t-=n.length)}if(!r.data)throw new Error;return r.data[t+r.off]}forEach(t){let r=0;function n(i){if(i.data)for(let s=i.off,a=s+i.length;s<a;s++)t(i.data[s],r++);else{if(!(i.left instanceof e&&i.right instanceof e))throw new TypeError;n(i.left),n(i.right)}}n(this)}every(t){let r=0,n=!1;function i(s){if(s.data){for(let a=s.off,h=a+s.length;a<h;a++)if(t(s.data[a],r++)==!1){n=!0;return}}else{if(!(s.left instanceof e&&s.right instanceof e))throw new TypeError;i(s.left),n||i(s.right)}}return i(this),!n}forEachInRange(t,r,n){t=b(t,this.length),r=x(this.length-t,r);let i=t,s=!1;function a(h,f,u){if(f!=u)if(h.data){let o=h.off,T=o+u;for(o+=f;o<T;o++)if(n(h.data[o],i++)==k){s=!0;return}}else{if(!(h.left instanceof e&&h.right instanceof e))throw new TypeError;let o=h.left,T=h.right,g=o.length;f>=g?a(T,f-g,u-g):u<=g?a(o,f,u):(a(o,f,g),s||a(T,0,u-g))}}a(this,t,t+r)}forEachInRangeReversed(t,r,n){t=b(t,this.length)+1;let i=S(t-r,0),s=t,a=!1;function h(f,u,o){if(u!=o)if(f.data){for(u+=f.off,o+=f.off-1;o>=u;o--)if(n(f.data[o],s--)==k){a=!0;return}}else{if(!(f.left instanceof e&&f.right instanceof e))throw new TypeError;let T=f.left,g=f.right,y=T.length;u>=y?h(g,u-y,o-y):o<=y?h(T,u,o):(h(g,0,o-y),a||h(T,u,y))}}h(this,i,t)}map(t){let r=[];r.length=this.length;let n=0;function i(s){if(s.data)for(let a=s.off,h=a+s.length;a<h;a++)r[n++]=t(s.data[a],a);else{if(!(s.left instanceof e&&s.right instanceof e))throw new TypeError;i(s.left),i(s.right)}}return i(this),w(...r)}flat(){let t=[];t.length=this.length;let r=0;function n(i){if(i.data)for(let s=i.off,a=s+i.length;s<a;s++)t[r++]=i.data[s];else{if(!(i.left instanceof e&&i.right instanceof e))throw new TypeError;n(i.left),n(i.right)}}return n(this),w(...t)}sort(t){let r=this.flat();return r.data.sort(t),r}},R=w(),k=Symbol("Stop");var p=class extends Error{},l;function P(e){var n;let t=e._Consumer;for(let i of t){if(i==l){let s=new p("Detected cycle in computations. ");throw s.cycle=[i,e],s}i._Dirty||(i._Dirty=!0,P(i))}let r=e._Watchers;r&&(r instanceof Array?r.forEach(i=>{var s;return(s=i._Func)==null?void 0:s.call(i,e)}):(n=r._Func)==null||n.call(r,e))}var d,W=class{constructor(t){this._Consumer=[];j(this,d,void 0);C(this,d,t),this.v=t}get v(){return l&&l._GetCallback(this),v(this,d)}set v(t){v(this,d)!=t&&(C(this,d,t),P(this))}};d=new WeakMap;function O(e){if(!(e instanceof m)||!e._Dirty)return;let t=l;l=e;try{e._v=e._Func(),e._Err=void 0}catch(r){e._Err=r}e._Dirty=!1,l=t}var m=class{constructor(t){this._Consumer=[];this._Dirty=!0;this._Producer=[];this._Func=t}_GetCallback(t){let r=t._Consumer;r.indexOf(this)<0&&(r.push(this),this._Producer.push(t))}get v(){if(l&&l._GetCallback(this),O(this),this._Err)throw this._Err;return this._v}get error(){return this._Err}get computation(){return this._Func}},E=class{constructor(t,r){this._Consumer=[];this._Dirty=!0;this._tracking=!1;this._Func=t,this._Producer=r}get v(){if(l instanceof m&&l._GetCallback(this),I(this),this._Dirty){try{this._v=this._Func(),this._Err=void 0}catch(t){this._Err=t}this._Dirty=!1}if(this._Err)throw this._Err;return this._v}get error(){return this._Err}get computation(){return this._Func}};function I(e){if(!e._tracking){e._tracking=!0;for(let t of e._Producer)t._Consumer.push(e)}}function G(e){if(!(e instanceof m||e instanceof E))return;let t=e._Producer;for(let r of t){let n=r._Consumer.indexOf(e);r._Consumer.splice(n,1),!r._Watchers&&r._Consumer.length==0&&G(r)}e._Dirty=!0,e instanceof m?t.length=0:e instanceof E&&(e._tracking=!1)}var F=class{constructor(){this.watchList=new Set}watch(...t){for(let r of t){let n=r._Watchers;if(!n)r._Watchers=this;else if(n instanceof Array){if(n.indexOf(this)>-1)continue;n.push(this)}else n!=this&&(r._Watchers=[this,n]);r instanceof m&&O(r),r instanceof E&&r.v,this.watchList.add(r)}}unwatch(...t){for(let r of t.length>0?t:this.watchList.values()){let n=r._Watchers;if(n){if(this.watchList.delete(r),n instanceof Array){let i=n.indexOf(this);if(i>-1&&n.splice(i,1),n.length>0)continue}else r._Watchers=void 0;G(r)}}}set callback(t){this._Func=typeof t=="function"?t:void 0}get callback(){return this._Func}};function H(e){return new W(e)}function J(e,...t){return t.length>0?new E(e,t):new m(e)}function K(e){let t=new F;return t.callback=e,t}export{m as Compute,W as State,k as Stop,F as Watcher,J as compute,w as makeArr,H as state,E as untrackCompute,K as watcher};
//# sourceMappingURL=index.js.map
