import Ml from "core/ajax";
import * as jl from "core/config";
import Fl from "core/notification";
var Xi = {};
/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function bt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ie = Xi.NODE_ENV !== "production" ? Object.freeze({}) : {}, nn = Xi.NODE_ENV !== "production" ? Object.freeze([]) : [], me = () => {
}, Zi = () => !1, jn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), so = (e) => e.startsWith("onUpdate:"), pe = Object.assign, Er = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ll = Object.prototype.hasOwnProperty, te = (e, t) => Ll.call(e, t), j = Array.isArray, Ht = (e) => Fn(e) === "[object Map]", fn = (e) => Fn(e) === "[object Set]", qr = (e) => Fn(e) === "[object Date]", B = (e) => typeof e == "function", ae = (e) => typeof e == "string", lt = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", yr = (e) => (oe(e) || B(e)) && B(e.then) && B(e.catch), es = Object.prototype.toString, Fn = (e) => es.call(e), br = (e) => Fn(e).slice(8, -1), ts = (e) => Fn(e) === "[object Object]", Nr = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nn = /* @__PURE__ */ bt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Hl = /* @__PURE__ */ bt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Oo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Ul = /-\w/g, Ue = Oo(
  (e) => e.replace(Ul, (t) => t.slice(1).toUpperCase())
), Kl = /\B([A-Z])/g, yt = Oo(
  (e) => e.replace(Kl, "-$1").toLowerCase()
), wo = Oo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Mt = Oo(
  (e) => e ? `on${wo(e)}` : ""
), Pt = (e, t) => !Object.is(e, t), Zt = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, lo = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, co = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let zr;
const Ln = () => zr || (zr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Or(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = ae(o) ? ql(o) : Or(o);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (ae(e) || oe(e))
    return e;
}
const Bl = /;(?![^(]*\))/g, Wl = /:([^]+)/, Gl = /\/\*[^]*?\*\//g;
function ql(e) {
  const t = {};
  return e.replace(Gl, "").split(Bl).forEach((n) => {
    if (n) {
      const o = n.split(Wl);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function xo(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const o = xo(e[n]);
      o && (t += o + " ");
    }
  else if (oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const zl = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Jl = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Yl = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Ql = /* @__PURE__ */ bt(zl), Xl = /* @__PURE__ */ bt(Jl), Zl = /* @__PURE__ */ bt(Yl), ec = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", tc = /* @__PURE__ */ bt(ec);
function ns(e) {
  return !!e || e === "";
}
function nc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = Gt(e[o], t[o]);
  return n;
}
function Gt(e, t) {
  if (e === t) return !0;
  let n = qr(e), o = qr(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = lt(e), o = lt(t), n || o)
    return e === t;
  if (n = j(e), o = j(t), n || o)
    return n && o ? nc(e, t) : !1;
  if (n = oe(e), o = oe(t), n || o) {
    if (!n || !o)
      return !1;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i)
      return !1;
    for (const s in e) {
      const l = e.hasOwnProperty(s), c = t.hasOwnProperty(s);
      if (l && !c || !l && c || !Gt(e[s], t[s]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function wr(e, t) {
  return e.findIndex((n) => Gt(n, t));
}
const os = (e) => !!(e && e.__v_isRef === !0), ht = (e) => ae(e) ? e : e == null ? "" : j(e) || oe(e) && (e.toString === es || !B(e.toString)) ? os(e) ? ht(e.value) : JSON.stringify(e, rs, 2) : String(e), rs = (e, t) => os(t) ? rs(e, t.value) : Ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], i) => (n[Mo(o, i) + " =>"] = r, n),
    {}
  )
} : fn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Mo(n))
} : lt(t) ? Mo(t) : oe(t) && !j(t) && !ts(t) ? String(t) : t, Mo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    lt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var le = {};
function We(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Se;
class oc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Se, !t && Se && (this.index = (Se.scopes || (Se.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Se;
      try {
        return Se = this, t();
      } finally {
        Se = n;
      }
    } else le.NODE_ENV !== "production" && We("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Se, Se = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Se = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function rc() {
  return Se;
}
let re;
const jo = /* @__PURE__ */ new WeakSet();
class is {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Se && Se.active && Se.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, jo.has(this) && (jo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ls(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Jr(this), cs(this);
    const t = re, n = Ke;
    re = this, Ke = !0;
    try {
      return this.fn();
    } finally {
      le.NODE_ENV !== "production" && re !== this && We(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), as(this), re = t, Ke = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Sr(t);
      this.deps = this.depsTail = void 0, Jr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? jo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Qo(this) && this.run();
  }
  get dirty() {
    return Qo(this);
  }
}
let ss = 0, On, wn;
function ls(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = wn, wn = e;
    return;
  }
  e.next = On, On = e;
}
function xr() {
  ss++;
}
function Dr() {
  if (--ss > 0)
    return;
  if (wn) {
    let t = wn;
    for (wn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; On; ) {
    let t = On;
    for (On = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function cs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function as(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const r = o.prevDep;
    o.version === -1 ? (o === n && (n = r), Sr(o), ic(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = r;
  }
  e.deps = t, e.depsTail = n;
}
function Qo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (us(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function us(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Rn) || (e.globalVersion = Rn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Qo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = re, o = Ke;
  re = e, Ke = !0;
  try {
    cs(e);
    const r = e.fn(e._value);
    (t.version === 0 || Pt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    re = n, Ke = o, as(e), e.flags &= -3;
  }
}
function Sr(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: r } = e;
  if (o && (o.nextSub = r, e.prevSub = void 0), r && (r.prevSub = o, e.nextSub = void 0), le.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Sr(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ic(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ke = !0;
const fs = [];
function Ge() {
  fs.push(Ke), Ke = !1;
}
function qe() {
  const e = fs.pop();
  Ke = e === void 0 ? !0 : e;
}
function Jr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = re;
    re = void 0;
    try {
      t();
    } finally {
      re = n;
    }
  }
}
let Rn = 0;
class sc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Vr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, le.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!re || !Ke || re === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== re)
      n = this.activeLink = new sc(re, this), re.deps ? (n.prevDep = re.depsTail, re.depsTail.nextDep = n, re.depsTail = n) : re.deps = re.depsTail = n, ds(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = re.depsTail, n.nextDep = void 0, re.depsTail.nextDep = n, re.depsTail = n, re.deps === n && (re.deps = o);
    }
    return le.NODE_ENV !== "production" && re.onTrack && re.onTrack(
      pe(
        {
          effect: re
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Rn++, this.notify(t);
  }
  notify(t) {
    xr();
    try {
      if (le.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            pe(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Dr();
    }
  }
}
function ds(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        ds(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), le.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Xo = /* @__PURE__ */ new WeakMap(), Ut = Symbol(
  le.NODE_ENV !== "production" ? "Object iterate" : ""
), Zo = Symbol(
  le.NODE_ENV !== "production" ? "Map keys iterate" : ""
), $n = Symbol(
  le.NODE_ENV !== "production" ? "Array iterate" : ""
);
function he(e, t, n) {
  if (Ke && re) {
    let o = Xo.get(e);
    o || Xo.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || (o.set(n, r = new Vr()), r.map = o, r.key = n), le.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function nt(e, t, n, o, r, i) {
  const s = Xo.get(e);
  if (!s) {
    Rn++;
    return;
  }
  const l = (c) => {
    c && (le.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: r,
      oldTarget: i
    }) : c.trigger());
  };
  if (xr(), t === "clear")
    s.forEach(l);
  else {
    const c = j(e), p = c && Nr(n);
    if (c && n === "length") {
      const u = Number(o);
      s.forEach((a, h) => {
        (h === "length" || h === $n || !lt(h) && h >= u) && l(a);
      });
    } else
      switch ((n !== void 0 || s.has(void 0)) && l(s.get(n)), p && l(s.get($n)), t) {
        case "add":
          c ? p && l(s.get("length")) : (l(s.get(Ut)), Ht(e) && l(s.get(Zo)));
          break;
        case "delete":
          c || (l(s.get(Ut)), Ht(e) && l(s.get(Zo)));
          break;
        case "set":
          Ht(e) && l(s.get(Ut));
          break;
      }
  }
  Dr();
}
function zt(e) {
  const t = J(e);
  return t === e ? t : (he(t, "iterate", $n), Oe(e) ? t : t.map(_e));
}
function Do(e) {
  return he(e = J(e), "iterate", $n), e;
}
const lc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fo(this, Symbol.iterator, _e);
  },
  concat(...e) {
    return zt(this).concat(
      ...e.map((t) => j(t) ? zt(t) : t)
    );
  },
  entries() {
    return Fo(this, "entries", (e) => (e[1] = _e(e[1]), e));
  },
  every(e, t) {
    return ft(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ft(this, "filter", e, t, (n) => n.map(_e), arguments);
  },
  find(e, t) {
    return ft(this, "find", e, t, _e, arguments);
  },
  findIndex(e, t) {
    return ft(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ft(this, "findLast", e, t, _e, arguments);
  },
  findLastIndex(e, t) {
    return ft(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ft(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Lo(this, "includes", e);
  },
  indexOf(...e) {
    return Lo(this, "indexOf", e);
  },
  join(e) {
    return zt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Lo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ft(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return mn(this, "pop");
  },
  push(...e) {
    return mn(this, "push", e);
  },
  reduce(e, ...t) {
    return Yr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Yr(this, "reduceRight", e, t);
  },
  shift() {
    return mn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ft(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return mn(this, "splice", e);
  },
  toReversed() {
    return zt(this).toReversed();
  },
  toSorted(e) {
    return zt(this).toSorted(e);
  },
  toSpliced(...e) {
    return zt(this).toSpliced(...e);
  },
  unshift(...e) {
    return mn(this, "unshift", e);
  },
  values() {
    return Fo(this, "values", _e);
  }
};
function Fo(e, t, n) {
  const o = Do(e), r = o[t]();
  return o !== e && !Oe(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const cc = Array.prototype;
function ft(e, t, n, o, r, i) {
  const s = Do(e), l = s !== e && !Oe(e), c = s[t];
  if (c !== cc[t]) {
    const a = c.apply(e, i);
    return l ? _e(a) : a;
  }
  let p = n;
  s !== e && (l ? p = function(a, h) {
    return n.call(this, _e(a), h, e);
  } : n.length > 2 && (p = function(a, h) {
    return n.call(this, a, h, e);
  }));
  const u = c.call(s, p, o);
  return l && r ? r(u) : u;
}
function Yr(e, t, n, o) {
  const r = Do(e);
  let i = n;
  return r !== e && (Oe(e) ? n.length > 3 && (i = function(s, l, c) {
    return n.call(this, s, l, c, e);
  }) : i = function(s, l, c) {
    return n.call(this, s, _e(l), c, e);
  }), r[t](i, ...o);
}
function Lo(e, t, n) {
  const o = J(e);
  he(o, "iterate", $n);
  const r = o[t](...n);
  return (r === -1 || r === !1) && ao(n[0]) ? (n[0] = J(n[0]), o[t](...n)) : r;
}
function mn(e, t, n = []) {
  Ge(), xr();
  const o = J(e)[t].apply(e, n);
  return Dr(), qe(), o;
}
const ac = /* @__PURE__ */ bt("__proto__,__v_isRef,__isVue"), ps = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lt)
);
function uc(e) {
  lt(e) || (e = String(e));
  const t = J(this);
  return he(t, "has", e), t.hasOwnProperty(e);
}
class hs {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return o === (r ? i ? ys : Es : i ? vs : _s).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const s = j(t);
    if (!r) {
      let c;
      if (s && (c = lc[n]))
        return c;
      if (n === "hasOwnProperty")
        return uc;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      de(t) ? t : o
    );
    if ((lt(n) ? ps.has(n) : ac(n)) || (r || he(t, "get", n), i))
      return l;
    if (de(l)) {
      const c = s && Nr(n) ? l : l.value;
      return r && oe(c) ? tr(c) : c;
    }
    return oe(l) ? r ? tr(l) : sn(l) : l;
  }
}
class ms extends hs {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let i = t[n];
    if (!this._isShallow) {
      const c = ct(i);
      if (!Oe(o) && !ct(o) && (i = J(i), o = J(o)), !j(t) && de(i) && !de(o))
        return c ? (le.NODE_ENV !== "production" && We(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (i.value = o, !0);
    }
    const s = j(t) && Nr(n) ? Number(n) < t.length : te(t, n), l = Reflect.set(
      t,
      n,
      o,
      de(t) ? t : r
    );
    return t === J(r) && (s ? Pt(o, i) && nt(t, "set", n, o, i) : nt(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = te(t, n), r = t[n], i = Reflect.deleteProperty(t, n);
    return i && o && nt(t, "delete", n, void 0, r), i;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!lt(n) || !ps.has(n)) && he(t, "has", n), o;
  }
  ownKeys(t) {
    return he(
      t,
      "iterate",
      j(t) ? "length" : Ut
    ), Reflect.ownKeys(t);
  }
}
class gs extends hs {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return le.NODE_ENV !== "production" && We(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return le.NODE_ENV !== "production" && We(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const fc = /* @__PURE__ */ new ms(), dc = /* @__PURE__ */ new gs(), pc = /* @__PURE__ */ new ms(!0), hc = /* @__PURE__ */ new gs(!0), er = (e) => e, qn = (e) => Reflect.getPrototypeOf(e);
function mc(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, i = J(r), s = Ht(i), l = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, p = r[e](...o), u = n ? er : t ? uo : _e;
    return !t && he(
      i,
      "iterate",
      c ? Zo : Ut
    ), {
      // iterator protocol
      next() {
        const { value: a, done: h } = p.next();
        return h ? { value: a, done: h } : {
          value: l ? [u(a[0]), u(a[1])] : u(a),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function zn(e) {
  return function(...t) {
    if (le.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      We(
        `${wo(e)} operation ${n}failed: target is readonly.`,
        J(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function gc(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, s = J(i), l = J(r);
      e || (Pt(r, l) && he(s, "get", r), he(s, "get", l));
      const { has: c } = qn(s), p = t ? er : e ? uo : _e;
      if (c.call(s, r))
        return p(i.get(r));
      if (c.call(s, l))
        return p(i.get(l));
      i !== s && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && he(J(r), "iterate", Ut), r.size;
    },
    has(r) {
      const i = this.__v_raw, s = J(i), l = J(r);
      return e || (Pt(r, l) && he(s, "has", r), he(s, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const s = this, l = s.__v_raw, c = J(l), p = t ? er : e ? uo : _e;
      return !e && he(c, "iterate", Ut), l.forEach((u, a) => r.call(i, p(u), p(a), s));
    }
  };
  return pe(
    n,
    e ? {
      add: zn("add"),
      set: zn("set"),
      delete: zn("delete"),
      clear: zn("clear")
    } : {
      add(r) {
        !t && !Oe(r) && !ct(r) && (r = J(r));
        const i = J(this);
        return qn(i).has.call(i, r) || (i.add(r), nt(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !Oe(i) && !ct(i) && (i = J(i));
        const s = J(this), { has: l, get: c } = qn(s);
        let p = l.call(s, r);
        p ? le.NODE_ENV !== "production" && Qr(s, l, r) : (r = J(r), p = l.call(s, r));
        const u = c.call(s, r);
        return s.set(r, i), p ? Pt(i, u) && nt(s, "set", r, i, u) : nt(s, "add", r, i), this;
      },
      delete(r) {
        const i = J(this), { has: s, get: l } = qn(i);
        let c = s.call(i, r);
        c ? le.NODE_ENV !== "production" && Qr(i, s, r) : (r = J(r), c = s.call(i, r));
        const p = l ? l.call(i, r) : void 0, u = i.delete(r);
        return c && nt(i, "delete", r, void 0, p), u;
      },
      clear() {
        const r = J(this), i = r.size !== 0, s = le.NODE_ENV !== "production" ? Ht(r) ? new Map(r) : new Set(r) : void 0, l = r.clear();
        return i && nt(
          r,
          "clear",
          void 0,
          void 0,
          s
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = mc(r, e, t);
  }), n;
}
function So(e, t) {
  const n = gc(e, t);
  return (o, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    te(n, r) && r in o ? n : o,
    r,
    i
  );
}
const _c = {
  get: /* @__PURE__ */ So(!1, !1)
}, vc = {
  get: /* @__PURE__ */ So(!1, !0)
}, Ec = {
  get: /* @__PURE__ */ So(!0, !1)
}, yc = {
  get: /* @__PURE__ */ So(!0, !0)
};
function Qr(e, t, n) {
  const o = J(n);
  if (o !== n && t.call(e, o)) {
    const r = br(e);
    We(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const _s = /* @__PURE__ */ new WeakMap(), vs = /* @__PURE__ */ new WeakMap(), Es = /* @__PURE__ */ new WeakMap(), ys = /* @__PURE__ */ new WeakMap();
function bc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Nc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bc(br(e));
}
function sn(e) {
  return ct(e) ? e : Vo(
    e,
    !1,
    fc,
    _c,
    _s
  );
}
function bs(e) {
  return Vo(
    e,
    !1,
    pc,
    vc,
    vs
  );
}
function tr(e) {
  return Vo(
    e,
    !0,
    dc,
    Ec,
    Es
  );
}
function rt(e) {
  return Vo(
    e,
    !0,
    hc,
    yc,
    ys
  );
}
function Vo(e, t, n, o, r) {
  if (!oe(e))
    return le.NODE_ENV !== "production" && We(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Nc(e);
  if (i === 0)
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const l = new Proxy(
    e,
    i === 2 ? o : n
  );
  return r.set(e, l), l;
}
function Kt(e) {
  return ct(e) ? Kt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
function ao(e) {
  return e ? !!e.__v_raw : !1;
}
function J(e) {
  const t = e && e.__v_raw;
  return t ? J(t) : e;
}
function Oc(e) {
  return !te(e, "__v_skip") && Object.isExtensible(e) && lo(e, "__v_skip", !0), e;
}
const _e = (e) => oe(e) ? sn(e) : e, uo = (e) => oe(e) ? tr(e) : e;
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function jt(e) {
  return Ns(e, !1);
}
function wc(e) {
  return Ns(e, !0);
}
function Ns(e, t) {
  return de(e) ? e : new xc(e, t);
}
class xc {
  constructor(t, n) {
    this.dep = new Vr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : J(t), this._value = n ? t : _e(t), this.__v_isShallow = n;
  }
  get value() {
    return le.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Oe(t) || ct(t);
    t = o ? t : J(t), Pt(t, n) && (this._rawValue = t, this._value = o ? t : _e(t), le.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Lt(e) {
  return de(e) ? e.value : e;
}
const Dc = {
  get: (e, t, n) => t === "__v_raw" ? e : Lt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return de(r) && !de(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Os(e) {
  return Kt(e) ? e : new Proxy(e, Dc);
}
class Sc {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Vr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Rn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    re !== this)
      return ls(this, !0), !0;
  }
  get value() {
    const t = le.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return us(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : le.NODE_ENV !== "production" && We("Write operation failed: computed value is readonly");
  }
}
function Vc(e, t, n = !1) {
  let o, r;
  return B(e) ? o = e : (o = e.get, r = e.set), new Sc(o, r, n);
}
const Jn = {}, fo = /* @__PURE__ */ new WeakMap();
let Ft;
function Cc(e, t = !1, n = Ft) {
  if (n) {
    let o = fo.get(n);
    o || fo.set(n, o = []), o.push(e);
  } else le.NODE_ENV !== "production" && !t && We(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Pc(e, t, n = ie) {
  const { immediate: o, deep: r, once: i, scheduler: s, augmentJob: l, call: c } = n, p = (I) => {
    (n.onWarn || We)(
      "Invalid watch source: ",
      I,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = (I) => r ? I : Oe(I) || r === !1 || r === 0 ? vt(I, 1) : vt(I);
  let a, h, m, x, O = !1, F = !1;
  if (de(e) ? (h = () => e.value, O = Oe(e)) : Kt(e) ? (h = () => u(e), O = !0) : j(e) ? (F = !0, O = e.some((I) => Kt(I) || Oe(I)), h = () => e.map((I) => {
    if (de(I))
      return I.value;
    if (Kt(I))
      return u(I);
    if (B(I))
      return c ? c(I, 2) : I();
    le.NODE_ENV !== "production" && p(I);
  })) : B(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (m) {
      Ge();
      try {
        m();
      } finally {
        qe();
      }
    }
    const I = Ft;
    Ft = a;
    try {
      return c ? c(e, 3, [x]) : e(x);
    } finally {
      Ft = I;
    }
  } : (h = me, le.NODE_ENV !== "production" && p(e)), t && r) {
    const I = h, z = r === !0 ? 1 / 0 : r;
    h = () => vt(I(), z);
  }
  const L = rc(), $ = () => {
    a.stop(), L && L.active && Er(L.effects, a);
  };
  if (i && t) {
    const I = t;
    t = (...z) => {
      I(...z), $();
    };
  }
  let A = F ? new Array(e.length).fill(Jn) : Jn;
  const W = (I) => {
    if (!(!(a.flags & 1) || !a.dirty && !I))
      if (t) {
        const z = a.run();
        if (r || O || (F ? z.some((w, U) => Pt(w, A[U])) : Pt(z, A))) {
          m && m();
          const w = Ft;
          Ft = a;
          try {
            const U = [
              z,
              // pass undefined as the old value when it's changed for the first time
              A === Jn ? void 0 : F && A[0] === Jn ? [] : A,
              x
            ];
            A = z, c ? c(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            Ft = w;
          }
        }
      } else
        a.run();
  };
  return l && l(W), a = new is(h), a.scheduler = s ? () => s(W, !1) : W, x = (I) => Cc(I, !1, a), m = a.onStop = () => {
    const I = fo.get(a);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const z of I) z();
      fo.delete(a);
    }
  }, le.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? W(!0) : A = a.run() : s ? s(W.bind(null, !0), !0) : a.run(), $.pause = a.pause.bind(a), $.resume = a.resume.bind(a), $.stop = $, $;
}
function vt(e, t = 1 / 0, n) {
  if (t <= 0 || !oe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, de(e))
    vt(e.value, t, n);
  else if (j(e))
    for (let o = 0; o < e.length; o++)
      vt(e[o], t, n);
  else if (fn(e) || Ht(e))
    e.forEach((o) => {
      vt(o, t, n);
    });
  else if (ts(e)) {
    for (const o in e)
      vt(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && vt(e[o], t, n);
  }
  return e;
}
var g = {};
const Bt = [];
function Xn(e) {
  Bt.push(e);
}
function Zn() {
  Bt.pop();
}
let Ho = !1;
function V(e, ...t) {
  if (Ho) return;
  Ho = !0, Ge();
  const n = Bt.length ? Bt[Bt.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Tc();
  if (o)
    dn(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((i) => {
          var s, l;
          return (l = (s = i.toString) == null ? void 0 : s.call(i)) != null ? l : JSON.stringify(i);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: i }) => `at <${Ao(n, i.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    r.length && i.push(`
`, ...Rc(r)), console.warn(...i);
  }
  qe(), Ho = !1;
}
function Tc() {
  let e = Bt[Bt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Rc(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...$c(n));
  }), t;
}
function $c({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${Ao(
    e.component,
    e.type,
    o
  )}`, i = ">" + n;
  return e.props ? [r, ...Ac(e.props), i] : [r + i];
}
function Ac(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...ws(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ws(e, t, n) {
  return ae(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : de(t) ? (t = ws(e, J(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : B(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = J(t), n ? t : [`${e}=`, t]);
}
const Cr = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function dn(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    Hn(r, t, n);
  }
}
function at(e, t, n, o) {
  if (B(e)) {
    const r = dn(e, t, n, o);
    return r && yr(r) && r.catch((i) => {
      Hn(i, t, n);
    }), r;
  }
  if (j(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(at(e[i], t, n, o));
    return r;
  } else g.NODE_ENV !== "production" && V(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Hn(e, t, n, o = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: s } = t && t.appContext.config || ie;
  if (t) {
    let l = t.parent;
    const c = t.proxy, p = g.NODE_ENV !== "production" ? Cr[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let a = 0; a < u.length; a++)
          if (u[a](e, c, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Ge(), dn(i, null, 10, [
        e,
        c,
        p
      ]), qe();
      return;
    }
  }
  Ic(e, n, r, o, s);
}
function Ic(e, t, n, o = !0, r = !1) {
  if (g.NODE_ENV !== "production") {
    const i = Cr[t];
    if (n && Xn(n), V(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Zn(), o)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const be = [];
let tt = -1;
const on = [];
let St = null, en = 0;
const xs = /* @__PURE__ */ Promise.resolve();
let po = null;
const kc = 100;
function Pr(e) {
  const t = po || xs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Mc(e) {
  let t = tt + 1, n = be.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = be[o], i = An(r);
    i < e || i === e && r.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Co(e) {
  if (!(e.flags & 1)) {
    const t = An(e), n = be[be.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= An(n) ? be.push(e) : be.splice(Mc(t), 0, e), e.flags |= 1, Ds();
  }
}
function Ds() {
  po || (po = xs.then(Cs));
}
function Ss(e) {
  j(e) ? on.push(...e) : St && e.id === -1 ? St.splice(en + 1, 0, e) : e.flags & 1 || (on.push(e), e.flags |= 1), Ds();
}
function Xr(e, t, n = tt + 1) {
  for (g.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < be.length; n++) {
    const o = be[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || g.NODE_ENV !== "production" && Tr(t, o))
        continue;
      be.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function Vs(e) {
  if (on.length) {
    const t = [...new Set(on)].sort(
      (n, o) => An(n) - An(o)
    );
    if (on.length = 0, St) {
      St.push(...t);
      return;
    }
    for (St = t, g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), en = 0; en < St.length; en++) {
      const n = St[en];
      g.NODE_ENV !== "production" && Tr(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    St = null, en = 0;
  }
}
const An = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Cs(e) {
  g.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = g.NODE_ENV !== "production" ? (n) => Tr(e, n) : me;
  try {
    for (tt = 0; tt < be.length; tt++) {
      const n = be[tt];
      if (n && !(n.flags & 8)) {
        if (g.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), dn(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; tt < be.length; tt++) {
      const n = be[tt];
      n && (n.flags &= -2);
    }
    tt = -1, be.length = 0, Vs(e), po = null, (be.length || on.length) && Cs(e);
  }
}
function Tr(e, t) {
  const n = e.get(t) || 0;
  if (n > kc) {
    const o = t.i, r = o && al(o.type);
    return Hn(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let it = !1;
const eo = /* @__PURE__ */ new Map();
g.NODE_ENV !== "production" && (Ln().__VUE_HMR_RUNTIME__ = {
  createRecord: Uo(Ps),
  rerender: Uo(Lc),
  reload: Uo(Hc)
});
const qt = /* @__PURE__ */ new Map();
function jc(e) {
  const t = e.type.__hmrId;
  let n = qt.get(t);
  n || (Ps(t, e.type), n = qt.get(t)), n.instances.add(e);
}
function Fc(e) {
  qt.get(e.type.__hmrId).instances.delete(e);
}
function Ps(e, t) {
  return qt.has(e) ? !1 : (qt.set(e, {
    initialDef: ho(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ho(e) {
  return ul(e) ? e.__vccOpts : e;
}
function Lc(e, t) {
  const n = qt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, ho(o.type).render = t), o.renderCache = [], it = !0, o.job.flags & 8 || o.update(), it = !1;
  }));
}
function Hc(e, t) {
  const n = qt.get(e);
  if (!n) return;
  t = ho(t), Zr(n.initialDef, t);
  const o = [...n.instances];
  for (let r = 0; r < o.length; r++) {
    const i = o[r], s = ho(i.type);
    let l = eo.get(s);
    l || (s !== n.initialDef && Zr(s, t), eo.set(s, l = /* @__PURE__ */ new Set())), l.add(i), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (l.add(i), i.ceReload(t.styles), l.delete(i)) : i.parent ? Co(() => {
      i.job.flags & 8 || (it = !0, i.parent.update(), it = !1, l.delete(i));
    }) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), i.root.ce && i !== i.root && i.root.ce._removeChildStyle(s);
  }
  Ss(() => {
    eo.clear();
  });
}
function Zr(e, t) {
  pe(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Uo(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ot, yn = [], nr = !1;
function Un(e, ...t) {
  ot ? ot.emit(e, ...t) : nr || yn.push({ event: e, args: t });
}
function Ts(e, t) {
  var n, o;
  ot = e, ot ? (ot.enabled = !0, yn.forEach(({ event: r, args: i }) => ot.emit(r, ...i)), yn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
    Ts(i, t);
  }), setTimeout(() => {
    ot || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, nr = !0, yn = []);
  }, 3e3)) : (nr = !0, yn = []);
}
function Uc(e, t) {
  Un("app:init", e, t, {
    Fragment: Le,
    Text: Kn,
    Comment: Re,
    Static: Vn
  });
}
function Kc(e) {
  Un("app:unmount", e);
}
const Bc = /* @__PURE__ */ Rr(
  "component:added"
  /* COMPONENT_ADDED */
), Rs = /* @__PURE__ */ Rr(
  "component:updated"
  /* COMPONENT_UPDATED */
), Wc = /* @__PURE__ */ Rr(
  "component:removed"
  /* COMPONENT_REMOVED */
), Gc = (e) => {
  ot && typeof ot.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ot.cleanupBuffer(e) && Wc(e);
};
// @__NO_SIDE_EFFECTS__
function Rr(e) {
  return (t) => {
    Un(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const qc = /* @__PURE__ */ $s(
  "perf:start"
  /* PERFORMANCE_START */
), zc = /* @__PURE__ */ $s(
  "perf:end"
  /* PERFORMANCE_END */
);
function $s(e) {
  return (t, n, o) => {
    Un(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Jc(e, t, n) {
  Un(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Ne = null, As = null;
function mo(e) {
  const t = Ne;
  return Ne = e, As = e && e.type.__scopeId || null, t;
}
function Yc(e, t = Ne, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && yo(-1);
    const i = mo(t);
    let s;
    try {
      s = e(...r);
    } finally {
      mo(i), o._d && yo(1);
    }
    return g.NODE_ENV !== "production" && Rs(t), s;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Is(e) {
  Hl(e) && V("Do not use built-in directive ids as custom directive id: " + e);
}
function Jt(e, t) {
  if (Ne === null)
    return g.NODE_ENV !== "production" && V("withDirectives can only be used inside render functions."), e;
  const n = $o(Ne), o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, s, l, c = ie] = t[r];
    i && (B(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && vt(s), o.push({
      dir: i,
      instance: n,
      value: s,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function It(e, t, n, o) {
  const r = e.dirs, i = t && t.dirs;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    i && (l.oldValue = i[s].value);
    let c = l.dir[o];
    c && (Ge(), at(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), qe());
  }
}
const Qc = Symbol("_vte"), Xc = (e) => e.__isTeleport, Zc = Symbol("_leaveCb");
function $r(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, $r(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
  return B(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    pe({ name: e.name }, t, { setup: e })
  ) : e;
}
function ks(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ei = /* @__PURE__ */ new WeakSet(), go = /* @__PURE__ */ new WeakMap();
function xn(e, t, n, o, r = !1) {
  if (j(e)) {
    e.forEach(
      (O, F) => xn(
        O,
        t && (j(t) ? t[F] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (Dn(o) && !r) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && xn(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? $o(o.component) : o.el, s = r ? null : i, { i: l, r: c } = e;
  if (g.NODE_ENV !== "production" && !l) {
    V(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, u = l.refs === ie ? l.refs = {} : l.refs, a = l.setupState, h = J(a), m = a === ie ? Zi : (O) => g.NODE_ENV !== "production" && (te(h, O) && !de(h[O]) && V(
    `Template ref "${O}" used on a non-ref value. It will not work in the production build.`
  ), ei.has(h[O])) ? !1 : te(h, O), x = (O) => g.NODE_ENV === "production" || !ei.has(O);
  if (p != null && p !== c) {
    if (ti(t), ae(p))
      u[p] = null, m(p) && (a[p] = null);
    else if (de(p)) {
      x(p) && (p.value = null);
      const O = t;
      O.k && (u[O.k] = null);
    }
  }
  if (B(c))
    dn(c, l, 12, [s, u]);
  else {
    const O = ae(c), F = de(c);
    if (O || F) {
      const L = () => {
        if (e.f) {
          const $ = O ? m(c) ? a[c] : u[c] : x(c) || !e.k ? c.value : u[e.k];
          if (r)
            j($) && Er($, i);
          else if (j($))
            $.includes(i) || $.push(i);
          else if (O)
            u[c] = [i], m(c) && (a[c] = u[c]);
          else {
            const A = [i];
            x(c) && (c.value = A), e.k && (u[e.k] = A);
          }
        } else O ? (u[c] = s, m(c) && (a[c] = s)) : F ? (x(c) && (c.value = s), e.k && (u[e.k] = s)) : g.NODE_ENV !== "production" && V("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (s) {
        const $ = () => {
          L(), go.delete(e);
        };
        $.id = -1, go.set(e, $), Pe($, n);
      } else
        ti(e), L();
    } else g.NODE_ENV !== "production" && V("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function ti(e) {
  const t = go.get(e);
  t && (t.flags |= 8, go.delete(e));
}
Ln().requestIdleCallback;
Ln().cancelIdleCallback;
const Dn = (e) => !!e.type.__asyncLoader, Ir = (e) => e.type.__isKeepAlive;
function ea(e, t) {
  Ms(e, "a", t);
}
function ta(e, t) {
  Ms(e, "da", t);
}
function Ms(e, t, n = ve) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Po(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Ir(r.parent.vnode) && na(o, t, n, r), r = r.parent;
  }
}
function na(e, t, n, o) {
  const r = Po(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Fs(() => {
    Er(o[t], r);
  }, n);
}
function Po(e, t, n = ve, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...s) => {
      Ge();
      const l = Bn(n), c = at(t, n, e, s);
      return l(), qe(), c;
    });
    return o ? r.unshift(i) : r.push(i), i;
  } else if (g.NODE_ENV !== "production") {
    const r = Mt(Cr[e].replace(/ hook$/, ""));
    V(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Nt = (e) => (t, n = ve) => {
  (!kn || e === "sp") && Po(e, (...o) => t(...o), n);
}, oa = Nt("bm"), js = Nt("m"), ra = Nt(
  "bu"
), ia = Nt("u"), sa = Nt(
  "bum"
), Fs = Nt("um"), la = Nt(
  "sp"
), ca = Nt("rtg"), aa = Nt("rtc");
function ua(e, t = ve) {
  Po("ec", e, t);
}
const fa = Symbol.for("v-ndc");
function da(e, t, n, o) {
  let r;
  const i = n, s = j(e);
  if (s || ae(e)) {
    const l = s && Kt(e);
    let c = !1, p = !1;
    l && (c = !Oe(e), p = ct(e), e = Do(e)), r = new Array(e.length);
    for (let u = 0, a = e.length; u < a; u++)
      r[u] = t(
        c ? p ? uo(_e(e[u])) : _e(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    g.NODE_ENV !== "production" && !Number.isInteger(e) && V(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (oe(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, p = l.length; c < p; c++) {
        const u = l[c];
        r[c] = t(e[u], u, c, i);
      }
    }
  else
    r = [];
  return r;
}
const or = (e) => e ? ll(e) ? $o(e) : or(e.parent) : null, Wt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ pe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => g.NODE_ENV !== "production" ? rt(e.props) : e.props,
    $attrs: (e) => g.NODE_ENV !== "production" ? rt(e.attrs) : e.attrs,
    $slots: (e) => g.NODE_ENV !== "production" ? rt(e.slots) : e.slots,
    $refs: (e) => g.NODE_ENV !== "production" ? rt(e.refs) : e.refs,
    $parent: (e) => or(e.parent),
    $root: (e) => or(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Us(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Co(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Pr.bind(e.proxy)),
    $watch: (e) => Wa.bind(e)
  })
), kr = (e) => e === "_" || e === "$", Ko = (e, t) => e !== ie && !e.__isScriptSetup && te(e, t), Ls = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: r, props: i, accessCache: s, type: l, appContext: c } = e;
    if (g.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let p;
    if (t[0] !== "$") {
      const m = s[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Ko(o, t))
          return s[t] = 1, o[t];
        if (r !== ie && te(r, t))
          return s[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && te(p, t)
        )
          return s[t] = 3, i[t];
        if (n !== ie && te(n, t))
          return s[t] = 4, n[t];
        rr && (s[t] = 0);
      }
    }
    const u = Wt[t];
    let a, h;
    if (u)
      return t === "$attrs" ? (he(e.attrs, "get", ""), g.NODE_ENV !== "production" && Eo()) : g.NODE_ENV !== "production" && t === "$slots" && he(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== ie && te(n, t))
      return s[t] = 4, n[t];
    if (
      // global properties
      h = c.config.globalProperties, te(h, t)
    )
      return h[t];
    g.NODE_ENV !== "production" && Ne && (!ae(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== ie && kr(t[0]) && te(r, t) ? V(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Ne && V(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: i } = e;
    return Ko(r, t) ? (r[t] = n, !0) : g.NODE_ENV !== "production" && r.__isScriptSetup && te(r, t) ? (V(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== ie && te(o, t) ? (o[t] = n, !0) : te(e.props, t) ? (g.NODE_ENV !== "production" && V(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (g.NODE_ENV !== "production" && V(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (g.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(i, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: i, type: s }
  }, l) {
    let c, p;
    return !!(n[l] || e !== ie && l[0] !== "$" && te(e, l) || Ko(t, l) || (c = i[0]) && te(c, l) || te(o, l) || te(Wt, l) || te(r.config.globalProperties, l) || (p = s.__cssModules) && p[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
g.NODE_ENV !== "production" && (Ls.ownKeys = (e) => (V(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function pa(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Wt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => Wt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: me
    });
  }), t;
}
function ha(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: me
    });
  });
}
function ma(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(J(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (kr(o[0])) {
        V(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: me
      });
    }
  });
}
function ni(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ga() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? V(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let rr = !0;
function _a(e) {
  const t = Us(e), n = e.proxy, o = e.ctx;
  rr = !1, t.beforeCreate && oi(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: s,
    watch: l,
    provide: c,
    inject: p,
    // lifecycle
    created: u,
    beforeMount: a,
    mounted: h,
    beforeUpdate: m,
    updated: x,
    activated: O,
    deactivated: F,
    beforeDestroy: L,
    beforeUnmount: $,
    destroyed: A,
    unmounted: W,
    render: I,
    renderTracked: z,
    renderTriggered: w,
    errorCaptured: U,
    serverPrefetch: ue,
    // public API
    expose: Ae,
    inheritAttrs: Fe,
    // assets
    components: we,
    directives: ze,
    filters: Wn
  } = t, Ie = g.NODE_ENV !== "production" ? ga() : null;
  if (g.NODE_ENV !== "production") {
    const [Y] = e.propsOptions;
    if (Y)
      for (const Q in Y)
        Ie("Props", Q);
  }
  if (p && va(p, o, Ie), s)
    for (const Y in s) {
      const Q = s[Y];
      B(Q) ? (g.NODE_ENV !== "production" ? Object.defineProperty(o, Y, {
        value: Q.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[Y] = Q.bind(n), g.NODE_ENV !== "production" && Ie("Methods", Y)) : g.NODE_ENV !== "production" && V(
        `Method "${Y}" has type "${typeof Q}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    g.NODE_ENV !== "production" && !B(r) && V(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const Y = r.call(n, n);
    if (g.NODE_ENV !== "production" && yr(Y) && V(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !oe(Y))
      g.NODE_ENV !== "production" && V("data() should return an object.");
    else if (e.data = sn(Y), g.NODE_ENV !== "production")
      for (const Q in Y)
        Ie("Data", Q), kr(Q[0]) || Object.defineProperty(o, Q, {
          configurable: !0,
          enumerable: !0,
          get: () => Y[Q],
          set: me
        });
  }
  if (rr = !0, i)
    for (const Y in i) {
      const Q = i[Y], ke = B(Q) ? Q.bind(n, n) : B(Q.get) ? Q.get.bind(n, n) : me;
      g.NODE_ENV !== "production" && ke === me && V(`Computed property "${Y}" has no getter.`);
      const At = !B(Q) && B(Q.set) ? Q.set.bind(n) : g.NODE_ENV !== "production" ? () => {
        V(
          `Write operation failed: computed property "${Y}" is readonly.`
        );
      } : me, Ot = Ve({
        get: ke,
        set: At
      });
      Object.defineProperty(o, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Ot.value,
        set: (Je) => Ot.value = Je
      }), g.NODE_ENV !== "production" && Ie("Computed", Y);
    }
  if (l)
    for (const Y in l)
      Hs(l[Y], o, n, Y);
  if (c) {
    const Y = B(c) ? c.call(n) : c;
    Reflect.ownKeys(Y).forEach((Q) => {
      to(Q, Y[Q]);
    });
  }
  u && oi(u, e, "c");
  function ge(Y, Q) {
    j(Q) ? Q.forEach((ke) => Y(ke.bind(n))) : Q && Y(Q.bind(n));
  }
  if (ge(oa, a), ge(js, h), ge(ra, m), ge(ia, x), ge(ea, O), ge(ta, F), ge(ua, U), ge(aa, z), ge(ca, w), ge(sa, $), ge(Fs, W), ge(la, ue), j(Ae))
    if (Ae.length) {
      const Y = e.exposed || (e.exposed = {});
      Ae.forEach((Q) => {
        Object.defineProperty(Y, Q, {
          get: () => n[Q],
          set: (ke) => n[Q] = ke,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === me && (e.render = I), Fe != null && (e.inheritAttrs = Fe), we && (e.components = we), ze && (e.directives = ze), ue && ks(e);
}
function va(e, t, n = me) {
  j(e) && (e = ir(e));
  for (const o in e) {
    const r = e[o];
    let i;
    oe(r) ? "default" in r ? i = Be(
      r.from || o,
      r.default,
      !0
    ) : i = Be(r.from || o) : i = Be(r), de(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (s) => i.value = s
    }) : t[o] = i, g.NODE_ENV !== "production" && n("Inject", o);
  }
}
function oi(e, t, n) {
  at(
    j(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Hs(e, t, n, o) {
  let r = o.includes(".") ? Zs(n, o) : () => n[o];
  if (ae(e)) {
    const i = t[e];
    B(i) ? Sn(r, i) : g.NODE_ENV !== "production" && V(`Invalid watch handler specified by key "${e}"`, i);
  } else if (B(e))
    Sn(r, e.bind(n));
  else if (oe(e))
    if (j(e))
      e.forEach((i) => Hs(i, t, n, o));
    else {
      const i = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(i) ? Sn(r, i, e) : g.NODE_ENV !== "production" && V(`Invalid watch handler specified by key "${e.handler}"`, i);
    }
  else g.NODE_ENV !== "production" && V(`Invalid watch option: "${o}"`, e);
}
function Us(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: s }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !o ? c = t : (c = {}, r.length && r.forEach(
    (p) => _o(c, p, s, !0)
  ), _o(c, t, s)), oe(t) && i.set(t, c), c;
}
function _o(e, t, n, o = !1) {
  const { mixins: r, extends: i } = t;
  i && _o(e, i, n, !0), r && r.forEach(
    (s) => _o(e, s, n, !0)
  );
  for (const s in t)
    if (o && s === "expose")
      g.NODE_ENV !== "production" && V(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Ea[s] || n && n[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const Ea = {
  data: ri,
  props: ii,
  emits: ii,
  // objects
  methods: bn,
  computed: bn,
  // lifecycle
  beforeCreate: ye,
  created: ye,
  beforeMount: ye,
  mounted: ye,
  beforeUpdate: ye,
  updated: ye,
  beforeDestroy: ye,
  beforeUnmount: ye,
  destroyed: ye,
  unmounted: ye,
  activated: ye,
  deactivated: ye,
  errorCaptured: ye,
  serverPrefetch: ye,
  // assets
  components: bn,
  directives: bn,
  // watch
  watch: ba,
  // provide / inject
  provide: ri,
  inject: ya
};
function ri(e, t) {
  return t ? e ? function() {
    return pe(
      B(e) ? e.call(this, this) : e,
      B(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ya(e, t) {
  return bn(ir(e), ir(t));
}
function ir(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function bn(e, t) {
  return e ? pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ii(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : pe(
    /* @__PURE__ */ Object.create(null),
    ni(e),
    ni(t ?? {})
  ) : t;
}
function ba(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = pe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = ye(e[o], t[o]);
  return n;
}
function Ks() {
  return {
    app: null,
    config: {
      isNativeTag: Zi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Na = 0;
function Oa(e, t) {
  return function(o, r = null) {
    B(o) || (o = pe({}, o)), r != null && !oe(r) && (g.NODE_ENV !== "production" && V("root props passed to app.mount() must be an object."), r = null);
    const i = Ks(), s = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const p = i.app = {
      _uid: Na++,
      _component: o,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: gi,
      get config() {
        return i.config;
      },
      set config(u) {
        g.NODE_ENV !== "production" && V(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...a) {
        return s.has(u) ? g.NODE_ENV !== "production" && V("Plugin has already been applied to target app.") : u && B(u.install) ? (s.add(u), u.install(p, ...a)) : B(u) ? (s.add(u), u(p, ...a)) : g.NODE_ENV !== "production" && V(
          'A plugin must either be a function or an object with an "install" function.'
        ), p;
      },
      mixin(u) {
        return i.mixins.includes(u) ? g.NODE_ENV !== "production" && V(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : i.mixins.push(u), p;
      },
      component(u, a) {
        return g.NODE_ENV !== "production" && ur(u, i.config), a ? (g.NODE_ENV !== "production" && i.components[u] && V(`Component "${u}" has already been registered in target app.`), i.components[u] = a, p) : i.components[u];
      },
      directive(u, a) {
        return g.NODE_ENV !== "production" && Is(u), a ? (g.NODE_ENV !== "production" && i.directives[u] && V(`Directive "${u}" has already been registered in target app.`), i.directives[u] = a, p) : i.directives[u];
      },
      mount(u, a, h) {
        if (c)
          g.NODE_ENV !== "production" && V(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          g.NODE_ENV !== "production" && u.__vue_app__ && V(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const m = p._ceVNode || Ce(o, r);
          return m.appContext = i, h === !0 ? h = "svg" : h === !1 && (h = void 0), g.NODE_ENV !== "production" && (i.reload = () => {
            const x = Tt(m);
            x.el = null, e(x, u, h);
          }), e(m, u, h), c = !0, p._container = u, u.__vue_app__ = p, g.NODE_ENV !== "production" && (p._instance = m.component, Uc(p, gi)), $o(m.component);
        }
      },
      onUnmount(u) {
        g.NODE_ENV !== "production" && typeof u != "function" && V(
          `Expected function as first argument to app.onUnmount(), but got ${typeof u}`
        ), l.push(u);
      },
      unmount() {
        c ? (at(
          l,
          p._instance,
          16
        ), e(null, p._container), g.NODE_ENV !== "production" && (p._instance = null, Kc(p)), delete p._container.__vue_app__) : g.NODE_ENV !== "production" && V("Cannot unmount an app that is not mounted.");
      },
      provide(u, a) {
        return g.NODE_ENV !== "production" && u in i.provides && (te(i.provides, u) ? V(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ) : V(
          `App already provides property with key "${String(u)}" inherited from its parent element. It will be overwritten with the new value.`
        )), i.provides[u] = a, p;
      },
      runWithContext(u) {
        const a = rn;
        rn = p;
        try {
          return u();
        } finally {
          rn = a;
        }
      }
    };
    return p;
  };
}
let rn = null;
function to(e, t) {
  if (!ve)
    g.NODE_ENV !== "production" && V("provide() can only be used inside setup().");
  else {
    let n = ve.provides;
    const o = ve.parent && ve.parent.provides;
    o === n && (n = ve.provides = Object.create(o)), n[e] = t;
  }
}
function Be(e, t, n = !1) {
  const o = Ro();
  if (o || rn) {
    let r = rn ? rn._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && B(t) ? t.call(o && o.proxy) : t;
    g.NODE_ENV !== "production" && V(`injection "${String(e)}" not found.`);
  } else g.NODE_ENV !== "production" && V("inject() can only be used inside setup() or functional components.");
}
const Bs = {}, Ws = () => Object.create(Bs), Gs = (e) => Object.getPrototypeOf(e) === Bs;
function wa(e, t, n, o = !1) {
  const r = {}, i = Ws();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), qs(e, t, r, i);
  for (const s in e.propsOptions[0])
    s in r || (r[s] = void 0);
  g.NODE_ENV !== "production" && Js(t || {}, r, e), n ? e.props = o ? r : bs(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function xa(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Da(e, t, n, o) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: s }
  } = e, l = J(r), [c] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(g.NODE_ENV !== "production" && xa(e)) && (o || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        let h = u[a];
        if (To(e.emitsOptions, h))
          continue;
        const m = t[h];
        if (c)
          if (te(i, h))
            m !== i[h] && (i[h] = m, p = !0);
          else {
            const x = Ue(h);
            r[x] = sr(
              c,
              l,
              x,
              m,
              e,
              !1
            );
          }
        else
          m !== i[h] && (i[h] = m, p = !0);
      }
    }
  } else {
    qs(e, t, r, i) && (p = !0);
    let u;
    for (const a in l)
      (!t || // for camelCase
      !te(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = yt(a)) === a || !te(t, u))) && (c ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[a] = sr(
        c,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete r[a]);
    if (i !== l)
      for (const a in i)
        (!t || !te(t, a)) && (delete i[a], p = !0);
  }
  p && nt(e.attrs, "set", ""), g.NODE_ENV !== "production" && Js(t || {}, r, e);
}
function qs(e, t, n, o) {
  const [r, i] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let c in t) {
      if (Nn(c))
        continue;
      const p = t[c];
      let u;
      r && te(r, u = Ue(c)) ? !i || !i.includes(u) ? n[u] = p : (l || (l = {}))[u] = p : To(e.emitsOptions, c) || (!(c in o) || p !== o[c]) && (o[c] = p, s = !0);
    }
  if (i) {
    const c = J(n), p = l || ie;
    for (let u = 0; u < i.length; u++) {
      const a = i[u];
      n[a] = sr(
        r,
        c,
        a,
        p[a],
        e,
        !te(p, a)
      );
    }
  }
  return s;
}
function sr(e, t, n, o, r, i) {
  const s = e[n];
  if (s != null) {
    const l = te(s, "default");
    if (l && o === void 0) {
      const c = s.default;
      if (s.type !== Function && !s.skipFactory && B(c)) {
        const { propsDefaults: p } = r;
        if (n in p)
          o = p[n];
        else {
          const u = Bn(r);
          o = p[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        o = c;
      r.ce && r.ce._setProp(n, o);
    }
    s[
      0
      /* shouldCast */
    ] && (i && !l ? o = !1 : s[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === yt(n)) && (o = !0));
  }
  return o;
}
const Sa = /* @__PURE__ */ new WeakMap();
function zs(e, t, n = !1) {
  const o = n ? Sa : t.propsCache, r = o.get(e);
  if (r)
    return r;
  const i = e.props, s = {}, l = [];
  let c = !1;
  if (!B(e)) {
    const u = (a) => {
      c = !0;
      const [h, m] = zs(a, t, !0);
      pe(s, h), m && l.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !c)
    return oe(e) && o.set(e, nn), nn;
  if (j(i))
    for (let u = 0; u < i.length; u++) {
      g.NODE_ENV !== "production" && !ae(i[u]) && V("props must be strings when using array syntax.", i[u]);
      const a = Ue(i[u]);
      si(a) && (s[a] = ie);
    }
  else if (i) {
    g.NODE_ENV !== "production" && !oe(i) && V("invalid props options", i);
    for (const u in i) {
      const a = Ue(u);
      if (si(a)) {
        const h = i[u], m = s[a] = j(h) || B(h) ? { type: h } : pe({}, h), x = m.type;
        let O = !1, F = !0;
        if (j(x))
          for (let L = 0; L < x.length; ++L) {
            const $ = x[L], A = B($) && $.name;
            if (A === "Boolean") {
              O = !0;
              break;
            } else A === "String" && (F = !1);
          }
        else
          O = B(x) && x.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = O, m[
          1
          /* shouldCastTrue */
        ] = F, (O || te(m, "default")) && l.push(a);
      }
    }
  }
  const p = [s, l];
  return oe(e) && o.set(e, p), p;
}
function si(e) {
  return e[0] !== "$" && !Nn(e) ? !0 : (g.NODE_ENV !== "production" && V(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Va(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Js(e, t, n) {
  const o = J(t), r = n.propsOptions[0], i = Object.keys(e).map((s) => Ue(s));
  for (const s in r) {
    let l = r[s];
    l != null && Ca(
      s,
      o[s],
      l,
      g.NODE_ENV !== "production" ? rt(o) : o,
      !i.includes(s)
    );
  }
}
function Ca(e, t, n, o, r) {
  const { type: i, required: s, validator: l, skipCheck: c } = n;
  if (s && r) {
    V('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !s)) {
    if (i != null && i !== !0 && !c) {
      let p = !1;
      const u = j(i) ? i : [i], a = [];
      for (let h = 0; h < u.length && !p; h++) {
        const { valid: m, expectedType: x } = Ta(t, u[h]);
        a.push(x || ""), p = m;
      }
      if (!p) {
        V(Ra(e, t, a));
        return;
      }
    }
    l && !l(t, o) && V('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Pa = /* @__PURE__ */ bt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Ta(e, t) {
  let n;
  const o = Va(t);
  if (o === "null")
    n = e === null;
  else if (Pa(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else o === "Object" ? n = oe(e) : o === "Array" ? n = j(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function Ra(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(wo).join(" | ")}`;
  const r = n[0], i = br(t), s = li(t, r), l = li(t, i);
  return n.length === 1 && ci(r) && !$a(r, i) && (o += ` with value ${s}`), o += `, got ${i} `, ci(i) && (o += `with value ${l}.`), o;
}
function li(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function ci(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function $a(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Mr = (e) => e === "_" || e === "_ctx" || e === "$stable", jr = (e) => j(e) ? e.map(He) : [He(e)], Aa = (e, t, n) => {
  if (t._n)
    return t;
  const o = Yc((...r) => (g.NODE_ENV !== "production" && ve && !(n === null && Ne) && !(n && n.root !== ve.root) && V(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), jr(t(...r))), n);
  return o._c = !1, o;
}, Ys = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (Mr(r)) continue;
    const i = e[r];
    if (B(i))
      t[r] = Aa(r, i, o);
    else if (i != null) {
      g.NODE_ENV !== "production" && V(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const s = jr(i);
      t[r] = () => s;
    }
  }
}, Qs = (e, t) => {
  g.NODE_ENV !== "production" && !Ir(e.vnode) && V(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = jr(t);
  e.slots.default = () => n;
}, lr = (e, t, n) => {
  for (const o in t)
    (n || !Mr(o)) && (e[o] = t[o]);
}, Ia = (e, t, n) => {
  const o = e.slots = Ws();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (lr(o, t, n), n && lo(o, "_", r, !0)) : Ys(t, o);
  } else t && Qs(e, t);
}, ka = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let i = !0, s = ie;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? g.NODE_ENV !== "production" && it ? (lr(r, t, n), nt(e, "set", "$slots")) : n && l === 1 ? i = !1 : lr(r, t, n) : (i = !t.$stable, Ys(t, r)), s = t;
  } else t && (Qs(e, t), s = { default: 1 });
  if (i)
    for (const l in r)
      !Mr(l) && s[l] == null && delete r[l];
};
let gn, gt;
function Yt(e, t) {
  e.appContext.config.performance && vo() && gt.mark(`vue-${t}-${e.uid}`), g.NODE_ENV !== "production" && qc(e, t, vo() ? gt.now() : Date.now());
}
function Qt(e, t) {
  if (e.appContext.config.performance && vo()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", r = `<${Ao(e, e.type)}> ${t}`;
    gt.mark(o), gt.measure(r, n, o), gt.clearMeasures(r), gt.clearMarks(n), gt.clearMarks(o);
  }
  g.NODE_ENV !== "production" && zc(e, t, vo() ? gt.now() : Date.now());
}
function vo() {
  return gn !== void 0 || (typeof window < "u" && window.performance ? (gn = !0, gt = window.performance) : gn = !1), gn;
}
function Ma() {
  const e = [];
  if (g.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Pe = Za;
function ja(e) {
  return Fa(e);
}
function Fa(e, t) {
  Ma();
  const n = Ln();
  n.__VUE__ = !0, g.NODE_ENV !== "production" && Ts(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: i,
    createElement: s,
    createText: l,
    createComment: c,
    setText: p,
    setElementText: u,
    parentNode: a,
    nextSibling: h,
    setScopeId: m = me,
    insertStaticContent: x
  } = e, O = (f, d, _, y = null, E = null, b = null, C = void 0, S = null, D = g.NODE_ENV !== "production" && it ? !1 : !!d.dynamicChildren) => {
    if (f === d)
      return;
    f && !_n(f, d) && (y = R(f), Me(f, E, b, !0), f = null), d.patchFlag === -2 && (D = !1, d.dynamicChildren = null);
    const { type: N, ref: K, shapeFlag: P } = d;
    switch (N) {
      case Kn:
        F(f, d, _, y);
        break;
      case Re:
        L(f, d, _, y);
        break;
      case Vn:
        f == null ? $(d, _, y, C) : g.NODE_ENV !== "production" && A(f, d, _, C);
        break;
      case Le:
        ze(
          f,
          d,
          _,
          y,
          E,
          b,
          C,
          S,
          D
        );
        break;
      default:
        P & 1 ? z(
          f,
          d,
          _,
          y,
          E,
          b,
          C,
          S,
          D
        ) : P & 6 ? Wn(
          f,
          d,
          _,
          y,
          E,
          b,
          C,
          S,
          D
        ) : P & 64 || P & 128 ? N.process(
          f,
          d,
          _,
          y,
          E,
          b,
          C,
          S,
          D,
          Z
        ) : g.NODE_ENV !== "production" && V("Invalid VNode type:", N, `(${typeof N})`);
    }
    K != null && E ? xn(K, f && f.ref, b, d || f, !d) : K == null && f && f.ref != null && xn(f.ref, null, b, f, !0);
  }, F = (f, d, _, y) => {
    if (f == null)
      o(
        d.el = l(d.children),
        _,
        y
      );
    else {
      const E = d.el = f.el;
      d.children !== f.children && p(E, d.children);
    }
  }, L = (f, d, _, y) => {
    f == null ? o(
      d.el = c(d.children || ""),
      _,
      y
    ) : d.el = f.el;
  }, $ = (f, d, _, y) => {
    [f.el, f.anchor] = x(
      f.children,
      d,
      _,
      y,
      f.el,
      f.anchor
    );
  }, A = (f, d, _, y) => {
    if (d.children !== f.children) {
      const E = h(f.anchor);
      I(f), [d.el, d.anchor] = x(
        d.children,
        _,
        E,
        y
      );
    } else
      d.el = f.el, d.anchor = f.anchor;
  }, W = ({ el: f, anchor: d }, _, y) => {
    let E;
    for (; f && f !== d; )
      E = h(f), o(f, _, y), f = E;
    o(d, _, y);
  }, I = ({ el: f, anchor: d }) => {
    let _;
    for (; f && f !== d; )
      _ = h(f), r(f), f = _;
    r(d);
  }, z = (f, d, _, y, E, b, C, S, D) => {
    d.type === "svg" ? C = "svg" : d.type === "math" && (C = "mathml"), f == null ? w(
      d,
      _,
      y,
      E,
      b,
      C,
      S,
      D
    ) : Ae(
      f,
      d,
      E,
      b,
      C,
      S,
      D
    );
  }, w = (f, d, _, y, E, b, C, S) => {
    let D, N;
    const { props: K, shapeFlag: P, transition: H, dirs: G } = f;
    if (D = f.el = s(
      f.type,
      b,
      K && K.is,
      K
    ), P & 8 ? u(D, f.children) : P & 16 && ue(
      f.children,
      D,
      null,
      y,
      E,
      Bo(f, b),
      C,
      S
    ), G && It(f, null, y, "created"), U(D, f, f.scopeId, C, y), K) {
      for (const ce in K)
        ce !== "value" && !Nn(ce) && i(D, ce, null, K[ce], b, y);
      "value" in K && i(D, "value", null, K.value, b), (N = K.onVnodeBeforeMount) && Ze(N, y, f);
    }
    g.NODE_ENV !== "production" && (lo(D, "__vnode", f, !0), lo(D, "__vueParentComponent", y, !0)), G && It(f, null, y, "beforeMount");
    const ee = La(E, H);
    ee && H.beforeEnter(D), o(D, d, _), ((N = K && K.onVnodeMounted) || ee || G) && Pe(() => {
      N && Ze(N, y, f), ee && H.enter(D), G && It(f, null, y, "mounted");
    }, E);
  }, U = (f, d, _, y, E) => {
    if (_ && m(f, _), y)
      for (let b = 0; b < y.length; b++)
        m(f, y[b]);
    if (E) {
      let b = E.subTree;
      if (g.NODE_ENV !== "production" && b.patchFlag > 0 && b.patchFlag & 2048 && (b = Lr(b.children) || b), d === b || nl(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const C = E.vnode;
        U(
          f,
          C,
          C.scopeId,
          C.slotScopeIds,
          E.parent
        );
      }
    }
  }, ue = (f, d, _, y, E, b, C, S, D = 0) => {
    for (let N = D; N < f.length; N++) {
      const K = f[N] = S ? Vt(f[N]) : He(f[N]);
      O(
        null,
        K,
        d,
        _,
        y,
        E,
        b,
        C,
        S
      );
    }
  }, Ae = (f, d, _, y, E, b, C) => {
    const S = d.el = f.el;
    g.NODE_ENV !== "production" && (S.__vnode = d);
    let { patchFlag: D, dynamicChildren: N, dirs: K } = d;
    D |= f.patchFlag & 16;
    const P = f.props || ie, H = d.props || ie;
    let G;
    if (_ && kt(_, !1), (G = H.onVnodeBeforeUpdate) && Ze(G, _, d, f), K && It(d, f, _, "beforeUpdate"), _ && kt(_, !0), g.NODE_ENV !== "production" && it && (D = 0, C = !1, N = null), (P.innerHTML && H.innerHTML == null || P.textContent && H.textContent == null) && u(S, ""), N ? (Fe(
      f.dynamicChildren,
      N,
      S,
      _,
      y,
      Bo(d, E),
      b
    ), g.NODE_ENV !== "production" && no(f, d)) : C || ke(
      f,
      d,
      S,
      null,
      _,
      y,
      Bo(d, E),
      b,
      !1
    ), D > 0) {
      if (D & 16)
        we(S, P, H, _, E);
      else if (D & 2 && P.class !== H.class && i(S, "class", null, H.class, E), D & 4 && i(S, "style", P.style, H.style, E), D & 8) {
        const ee = d.dynamicProps;
        for (let ce = 0; ce < ee.length; ce++) {
          const se = ee[ce], xe = P[se], De = H[se];
          (De !== xe || se === "value") && i(S, se, xe, De, E, _);
        }
      }
      D & 1 && f.children !== d.children && u(S, d.children);
    } else !C && N == null && we(S, P, H, _, E);
    ((G = H.onVnodeUpdated) || K) && Pe(() => {
      G && Ze(G, _, d, f), K && It(d, f, _, "updated");
    }, y);
  }, Fe = (f, d, _, y, E, b, C) => {
    for (let S = 0; S < d.length; S++) {
      const D = f[S], N = d[S], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === Le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !_n(D, N) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 198) ? a(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      O(
        D,
        N,
        K,
        null,
        y,
        E,
        b,
        C,
        !0
      );
    }
  }, we = (f, d, _, y, E) => {
    if (d !== _) {
      if (d !== ie)
        for (const b in d)
          !Nn(b) && !(b in _) && i(
            f,
            b,
            d[b],
            null,
            E,
            y
          );
      for (const b in _) {
        if (Nn(b)) continue;
        const C = _[b], S = d[b];
        C !== S && b !== "value" && i(f, b, S, C, E, y);
      }
      "value" in _ && i(f, "value", d.value, _.value, E);
    }
  }, ze = (f, d, _, y, E, b, C, S, D) => {
    const N = d.el = f ? f.el : l(""), K = d.anchor = f ? f.anchor : l("");
    let { patchFlag: P, dynamicChildren: H, slotScopeIds: G } = d;
    g.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (it || P & 2048) && (P = 0, D = !1, H = null), G && (S = S ? S.concat(G) : G), f == null ? (o(N, _, y), o(K, _, y), ue(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      _,
      K,
      E,
      b,
      C,
      S,
      D
    )) : P > 0 && P & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (Fe(
      f.dynamicChildren,
      H,
      _,
      E,
      b,
      C,
      S
    ), g.NODE_ENV !== "production" ? no(f, d) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (d.key != null || E && d === E.subTree) && no(
        f,
        d,
        !0
        /* shallow */
      )
    )) : ke(
      f,
      d,
      _,
      K,
      E,
      b,
      C,
      S,
      D
    );
  }, Wn = (f, d, _, y, E, b, C, S, D) => {
    d.slotScopeIds = S, f == null ? d.shapeFlag & 512 ? E.ctx.activate(
      d,
      _,
      y,
      C,
      D
    ) : Ie(
      d,
      _,
      y,
      E,
      b,
      C,
      D
    ) : ge(f, d, D);
  }, Ie = (f, d, _, y, E, b, C) => {
    const S = f.component = cu(
      f,
      y,
      E
    );
    if (g.NODE_ENV !== "production" && S.type.__hmrId && jc(S), g.NODE_ENV !== "production" && (Xn(f), Yt(S, "mount")), Ir(f) && (S.ctx.renderer = Z), g.NODE_ENV !== "production" && Yt(S, "init"), uu(S, !1, C), g.NODE_ENV !== "production" && Qt(S, "init"), g.NODE_ENV !== "production" && it && (f.el = null), S.asyncDep) {
      if (E && E.registerDep(S, Y, C), !f.el) {
        const D = S.subTree = Ce(Re);
        L(null, D, d, _), f.placeholder = D.el;
      }
    } else
      Y(
        S,
        f,
        d,
        _,
        E,
        b,
        C
      );
    g.NODE_ENV !== "production" && (Zn(), Qt(S, "mount"));
  }, ge = (f, d, _) => {
    const y = d.component = f.component;
    if (Qa(f, d, _))
      if (y.asyncDep && !y.asyncResolved) {
        g.NODE_ENV !== "production" && Xn(d), Q(y, d, _), g.NODE_ENV !== "production" && Zn();
        return;
      } else
        y.next = d, y.update();
    else
      d.el = f.el, y.vnode = d;
  }, Y = (f, d, _, y, E, b, C) => {
    const S = () => {
      if (f.isMounted) {
        let { next: P, bu: H, u: G, parent: ee, vnode: ce } = f;
        {
          const Qe = Xs(f);
          if (Qe) {
            P && (P.el = ce.el, Q(f, P, C)), Qe.asyncDep.then(() => {
              f.isUnmounted || S();
            });
            return;
          }
        }
        let se = P, xe;
        g.NODE_ENV !== "production" && Xn(P || f.vnode), kt(f, !1), P ? (P.el = ce.el, Q(f, P, C)) : P = ce, H && Zt(H), (xe = P.props && P.props.onVnodeBeforeUpdate) && Ze(xe, ee, P, ce), kt(f, !0), g.NODE_ENV !== "production" && Yt(f, "render");
        const De = ui(f);
        g.NODE_ENV !== "production" && Qt(f, "render");
        const Ye = f.subTree;
        f.subTree = De, g.NODE_ENV !== "production" && Yt(f, "patch"), O(
          Ye,
          De,
          // parent may have changed if it's in a teleport
          a(Ye.el),
          // anchor may have changed if it's in a fragment
          R(Ye),
          f,
          E,
          b
        ), g.NODE_ENV !== "production" && Qt(f, "patch"), P.el = De.el, se === null && Xa(f, De.el), G && Pe(G, E), (xe = P.props && P.props.onVnodeUpdated) && Pe(
          () => Ze(xe, ee, P, ce),
          E
        ), g.NODE_ENV !== "production" && Rs(f), g.NODE_ENV !== "production" && Zn();
      } else {
        let P;
        const { el: H, props: G } = d, { bm: ee, m: ce, parent: se, root: xe, type: De } = f, Ye = Dn(d);
        kt(f, !1), ee && Zt(ee), !Ye && (P = G && G.onVnodeBeforeMount) && Ze(P, se, d), kt(f, !0);
        {
          xe.ce && // @ts-expect-error _def is private
          xe.ce._def.shadowRoot !== !1 && xe.ce._injectChildStyle(De), g.NODE_ENV !== "production" && Yt(f, "render");
          const Qe = f.subTree = ui(f);
          g.NODE_ENV !== "production" && Qt(f, "render"), g.NODE_ENV !== "production" && Yt(f, "patch"), O(
            null,
            Qe,
            _,
            y,
            f,
            E,
            b
          ), g.NODE_ENV !== "production" && Qt(f, "patch"), d.el = Qe.el;
        }
        if (ce && Pe(ce, E), !Ye && (P = G && G.onVnodeMounted)) {
          const Qe = d;
          Pe(
            () => Ze(P, se, Qe),
            E
          );
        }
        (d.shapeFlag & 256 || se && Dn(se.vnode) && se.vnode.shapeFlag & 256) && f.a && Pe(f.a, E), f.isMounted = !0, g.NODE_ENV !== "production" && Bc(f), d = _ = y = null;
      }
    };
    f.scope.on();
    const D = f.effect = new is(S);
    f.scope.off();
    const N = f.update = D.run.bind(D), K = f.job = D.runIfDirty.bind(D);
    K.i = f, K.id = f.uid, D.scheduler = () => Co(K), kt(f, !0), g.NODE_ENV !== "production" && (D.onTrack = f.rtc ? (P) => Zt(f.rtc, P) : void 0, D.onTrigger = f.rtg ? (P) => Zt(f.rtg, P) : void 0), N();
  }, Q = (f, d, _) => {
    d.component = f;
    const y = f.vnode.props;
    f.vnode = d, f.next = null, Da(f, d.props, y, _), ka(f, d.children, _), Ge(), Xr(f), qe();
  }, ke = (f, d, _, y, E, b, C, S, D = !1) => {
    const N = f && f.children, K = f ? f.shapeFlag : 0, P = d.children, { patchFlag: H, shapeFlag: G } = d;
    if (H > 0) {
      if (H & 128) {
        Ot(
          N,
          P,
          _,
          y,
          E,
          b,
          C,
          S,
          D
        );
        return;
      } else if (H & 256) {
        At(
          N,
          P,
          _,
          y,
          E,
          b,
          C,
          S,
          D
        );
        return;
      }
    }
    G & 8 ? (K & 16 && v(N, E, b), P !== N && u(_, P)) : K & 16 ? G & 16 ? Ot(
      N,
      P,
      _,
      y,
      E,
      b,
      C,
      S,
      D
    ) : v(N, E, b, !0) : (K & 8 && u(_, ""), G & 16 && ue(
      P,
      _,
      y,
      E,
      b,
      C,
      S,
      D
    ));
  }, At = (f, d, _, y, E, b, C, S, D) => {
    f = f || nn, d = d || nn;
    const N = f.length, K = d.length, P = Math.min(N, K);
    let H;
    for (H = 0; H < P; H++) {
      const G = d[H] = D ? Vt(d[H]) : He(d[H]);
      O(
        f[H],
        G,
        _,
        null,
        E,
        b,
        C,
        S,
        D
      );
    }
    N > K ? v(
      f,
      E,
      b,
      !0,
      !1,
      P
    ) : ue(
      d,
      _,
      y,
      E,
      b,
      C,
      S,
      D,
      P
    );
  }, Ot = (f, d, _, y, E, b, C, S, D) => {
    let N = 0;
    const K = d.length;
    let P = f.length - 1, H = K - 1;
    for (; N <= P && N <= H; ) {
      const G = f[N], ee = d[N] = D ? Vt(d[N]) : He(d[N]);
      if (_n(G, ee))
        O(
          G,
          ee,
          _,
          null,
          E,
          b,
          C,
          S,
          D
        );
      else
        break;
      N++;
    }
    for (; N <= P && N <= H; ) {
      const G = f[P], ee = d[H] = D ? Vt(d[H]) : He(d[H]);
      if (_n(G, ee))
        O(
          G,
          ee,
          _,
          null,
          E,
          b,
          C,
          S,
          D
        );
      else
        break;
      P--, H--;
    }
    if (N > P) {
      if (N <= H) {
        const G = H + 1, ee = G < K ? d[G].el : y;
        for (; N <= H; )
          O(
            null,
            d[N] = D ? Vt(d[N]) : He(d[N]),
            _,
            ee,
            E,
            b,
            C,
            S,
            D
          ), N++;
      }
    } else if (N > H)
      for (; N <= P; )
        Me(f[N], E, b, !0), N++;
    else {
      const G = N, ee = N, ce = /* @__PURE__ */ new Map();
      for (N = ee; N <= H; N++) {
        const Ee = d[N] = D ? Vt(d[N]) : He(d[N]);
        Ee.key != null && (g.NODE_ENV !== "production" && ce.has(Ee.key) && V(
          "Duplicate keys found during update:",
          JSON.stringify(Ee.key),
          "Make sure keys are unique."
        ), ce.set(Ee.key, N));
      }
      let se, xe = 0;
      const De = H - ee + 1;
      let Ye = !1, Qe = 0;
      const hn = new Array(De);
      for (N = 0; N < De; N++) hn[N] = 0;
      for (N = G; N <= P; N++) {
        const Ee = f[N];
        if (xe >= De) {
          Me(Ee, E, b, !0);
          continue;
        }
        let Xe;
        if (Ee.key != null)
          Xe = ce.get(Ee.key);
        else
          for (se = ee; se <= H; se++)
            if (hn[se - ee] === 0 && _n(Ee, d[se])) {
              Xe = se;
              break;
            }
        Xe === void 0 ? Me(Ee, E, b, !0) : (hn[Xe - ee] = N + 1, Xe >= Qe ? Qe = Xe : Ye = !0, O(
          Ee,
          d[Xe],
          _,
          null,
          E,
          b,
          C,
          S,
          D
        ), xe++);
      }
      const Br = Ye ? Ha(hn) : nn;
      for (se = Br.length - 1, N = De - 1; N >= 0; N--) {
        const Ee = ee + N, Xe = d[Ee], Wr = d[Ee + 1], Gr = Ee + 1 < K ? (
          // #13559, fallback to el placeholder for unresolved async component
          Wr.el || Wr.placeholder
        ) : y;
        hn[N] === 0 ? O(
          null,
          Xe,
          _,
          Gr,
          E,
          b,
          C,
          S,
          D
        ) : Ye && (se < 0 || N !== Br[se] ? Je(Xe, _, Gr, 2) : se--);
      }
    }
  }, Je = (f, d, _, y, E = null) => {
    const { el: b, type: C, transition: S, children: D, shapeFlag: N } = f;
    if (N & 6) {
      Je(f.component.subTree, d, _, y);
      return;
    }
    if (N & 128) {
      f.suspense.move(d, _, y);
      return;
    }
    if (N & 64) {
      C.move(f, d, _, Z);
      return;
    }
    if (C === Le) {
      o(b, d, _);
      for (let P = 0; P < D.length; P++)
        Je(D[P], d, _, y);
      o(f.anchor, d, _);
      return;
    }
    if (C === Vn) {
      W(f, d, _);
      return;
    }
    if (y !== 2 && N & 1 && S)
      if (y === 0)
        S.beforeEnter(b), o(b, d, _), Pe(() => S.enter(b), E);
      else {
        const { leave: P, delayLeave: H, afterLeave: G } = S, ee = () => {
          f.ctx.isUnmounted ? r(b) : o(b, d, _);
        }, ce = () => {
          b._isLeaving && b[Zc](
            !0
            /* cancelled */
          ), P(b, () => {
            ee(), G && G();
          });
        };
        H ? H(b, ee, ce) : ce();
      }
    else
      o(b, d, _);
  }, Me = (f, d, _, y = !1, E = !1) => {
    const {
      type: b,
      props: C,
      ref: S,
      children: D,
      dynamicChildren: N,
      shapeFlag: K,
      patchFlag: P,
      dirs: H,
      cacheIndex: G
    } = f;
    if (P === -2 && (E = !1), S != null && (Ge(), xn(S, null, _, f, !0), qe()), G != null && (d.renderCache[G] = void 0), K & 256) {
      d.ctx.deactivate(f);
      return;
    }
    const ee = K & 1 && H, ce = !Dn(f);
    let se;
    if (ce && (se = C && C.onVnodeBeforeUnmount) && Ze(se, d, f), K & 6)
      xt(f.component, _, y);
    else {
      if (K & 128) {
        f.suspense.unmount(_, y);
        return;
      }
      ee && It(f, null, d, "beforeUnmount"), K & 64 ? f.type.remove(
        f,
        d,
        _,
        Z,
        y
      ) : N && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !N.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Le || P > 0 && P & 64) ? v(
        N,
        d,
        _,
        !1,
        !0
      ) : (b === Le && P & 384 || !E && K & 16) && v(D, d, _), y && wt(f);
    }
    (ce && (se = C && C.onVnodeUnmounted) || ee) && Pe(() => {
      se && Ze(se, d, f), ee && It(f, null, d, "unmounted");
    }, _);
  }, wt = (f) => {
    const { type: d, el: _, anchor: y, transition: E } = f;
    if (d === Le) {
      g.NODE_ENV !== "production" && f.patchFlag > 0 && f.patchFlag & 2048 && E && !E.persisted ? f.children.forEach((C) => {
        C.type === Re ? r(C.el) : wt(C);
      }) : Gn(_, y);
      return;
    }
    if (d === Vn) {
      I(f);
      return;
    }
    const b = () => {
      r(_), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (f.shapeFlag & 1 && E && !E.persisted) {
      const { leave: C, delayLeave: S } = E, D = () => C(_, b);
      S ? S(f.el, b, D) : D();
    } else
      b();
  }, Gn = (f, d) => {
    let _;
    for (; f !== d; )
      _ = h(f), r(f), f = _;
    r(d);
  }, xt = (f, d, _) => {
    g.NODE_ENV !== "production" && f.type.__hmrId && Fc(f);
    const { bum: y, scope: E, job: b, subTree: C, um: S, m: D, a: N } = f;
    ai(D), ai(N), y && Zt(y), E.stop(), b && (b.flags |= 8, Me(C, f, d, _)), S && Pe(S, d), Pe(() => {
      f.isUnmounted = !0;
    }, d), g.NODE_ENV !== "production" && Gc(f);
  }, v = (f, d, _, y = !1, E = !1, b = 0) => {
    for (let C = b; C < f.length; C++)
      Me(f[C], d, _, y, E);
  }, R = (f) => {
    if (f.shapeFlag & 6)
      return R(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const d = h(f.anchor || f.el), _ = d && d[Qc];
    return _ ? h(_) : d;
  };
  let T = !1;
  const M = (f, d, _) => {
    f == null ? d._vnode && Me(d._vnode, null, null, !0) : O(
      d._vnode || null,
      f,
      d,
      null,
      null,
      null,
      _
    ), d._vnode = f, T || (T = !0, Xr(), Vs(), T = !1);
  }, Z = {
    p: O,
    um: Me,
    m: Je,
    r: wt,
    mt: Ie,
    mc: ue,
    pc: ke,
    pbc: Fe,
    n: R,
    o: e
  };
  return {
    render: M,
    hydrate: void 0,
    createApp: Oa(M)
  };
}
function Bo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function kt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function La(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function no(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (j(o) && j(r))
    for (let i = 0; i < o.length; i++) {
      const s = o[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Vt(r[i]), l.el = s.el), !n && l.patchFlag !== -2 && no(s, l)), l.type === Kn && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = s.el), l.type === Re && !l.el && (l.el = s.el), g.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function Ha(e) {
  const t = e.slice(), n = [0];
  let o, r, i, s, l;
  const c = e.length;
  for (o = 0; o < c; o++) {
    const p = e[o];
    if (p !== 0) {
      if (r = n[n.length - 1], e[r] < p) {
        t[o] = r, n.push(o);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        l = i + s >> 1, e[n[l]] < p ? i = l + 1 : s = l;
      p < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; )
    n[i] = s, s = t[s];
  return n;
}
function Xs(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Xs(t);
}
function ai(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Ua = Symbol.for("v-scx"), Ka = () => {
  {
    const e = Be(Ua);
    return e || g.NODE_ENV !== "production" && V(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Ba(e, t) {
  return Fr(e, null, t);
}
function Sn(e, t, n) {
  return g.NODE_ENV !== "production" && !B(t) && V(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Fr(e, t, n);
}
function Fr(e, t, n = ie) {
  const { immediate: o, deep: r, flush: i, once: s } = n;
  g.NODE_ENV !== "production" && !t && (o !== void 0 && V(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && V(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && V(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = pe({}, n);
  g.NODE_ENV !== "production" && (l.onWarn = V);
  const c = t && o || !t && i !== "post";
  let p;
  if (kn) {
    if (i === "sync") {
      const m = Ka();
      p = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = me, m.resume = me, m.pause = me, m;
    }
  }
  const u = ve;
  l.call = (m, x, O) => at(m, u, x, O);
  let a = !1;
  i === "post" ? l.scheduler = (m) => {
    Pe(m, u && u.suspense);
  } : i !== "sync" && (a = !0, l.scheduler = (m, x) => {
    x ? m() : Co(m);
  }), l.augmentJob = (m) => {
    t && (m.flags |= 4), a && (m.flags |= 2, u && (m.id = u.uid, m.i = u));
  };
  const h = Pc(e, t, l);
  return kn && (p ? p.push(h) : c && h()), h;
}
function Wa(e, t, n) {
  const o = this.proxy, r = ae(e) ? e.includes(".") ? Zs(o, e) : () => o[e] : e.bind(o, o);
  let i;
  B(t) ? i = t : (i = t.handler, n = t);
  const s = Bn(this), l = Fr(r, i.bind(o), n);
  return s(), l;
}
function Zs(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
const Ga = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${yt(t)}Modifiers`];
function qa(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ie;
  if (g.NODE_ENV !== "production") {
    const {
      emitsOptions: u,
      propsOptions: [a]
    } = e;
    if (u)
      if (!(t in u))
        (!a || !(Mt(Ue(t)) in a)) && V(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Mt(Ue(t))}" prop.`
        );
      else {
        const h = u[t];
        B(h) && (h(...n) || V(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const i = t.startsWith("update:"), s = i && Ga(o, t.slice(7));
  if (s && (s.trim && (r = n.map((u) => ae(u) ? u.trim() : u)), s.number && (r = n.map(co))), g.NODE_ENV !== "production" && Jc(e, t, r), g.NODE_ENV !== "production") {
    const u = t.toLowerCase();
    u !== t && o[Mt(u)] && V(
      `Event "${u}" is emitted in component ${Ao(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${yt(
        t
      )}" instead of "${t}".`
    );
  }
  let l, c = o[l = Mt(t)] || // also try camelCase event handler (#2249)
  o[l = Mt(Ue(t))];
  !c && i && (c = o[l = Mt(yt(t))]), c && at(
    c,
    e,
    6,
    r
  );
  const p = o[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, at(
      p,
      e,
      6,
      r
    );
  }
}
const za = /* @__PURE__ */ new WeakMap();
function el(e, t, n = !1) {
  const o = n ? za : t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let s = {}, l = !1;
  if (!B(e)) {
    const c = (p) => {
      const u = el(p, t, !0);
      u && (l = !0, pe(s, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (oe(e) && o.set(e, null), null) : (j(i) ? i.forEach((c) => s[c] = null) : pe(s, i), oe(e) && o.set(e, s), s);
}
function To(e, t) {
  return !e || !jn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, yt(t)) || te(e, t));
}
let cr = !1;
function Eo() {
  cr = !0;
}
function ui(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    propsOptions: [i],
    slots: s,
    attrs: l,
    emit: c,
    render: p,
    renderCache: u,
    props: a,
    data: h,
    setupState: m,
    ctx: x,
    inheritAttrs: O
  } = e, F = mo(e);
  let L, $;
  g.NODE_ENV !== "production" && (cr = !1);
  try {
    if (n.shapeFlag & 4) {
      const I = r || o, z = g.NODE_ENV !== "production" && m.__isScriptSetup ? new Proxy(I, {
        get(w, U, ue) {
          return V(
            `Property '${String(
              U
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(w, U, ue);
        }
      }) : I;
      L = He(
        p.call(
          z,
          I,
          u,
          g.NODE_ENV !== "production" ? rt(a) : a,
          m,
          h,
          x
        )
      ), $ = l;
    } else {
      const I = t;
      g.NODE_ENV !== "production" && l === a && Eo(), L = He(
        I.length > 1 ? I(
          g.NODE_ENV !== "production" ? rt(a) : a,
          g.NODE_ENV !== "production" ? {
            get attrs() {
              return Eo(), rt(l);
            },
            slots: s,
            emit: c
          } : { attrs: l, slots: s, emit: c }
        ) : I(
          g.NODE_ENV !== "production" ? rt(a) : a,
          null
        )
      ), $ = t.props ? l : Ja(l);
    }
  } catch (I) {
    Cn.length = 0, Hn(I, e, 1), L = Ce(Re);
  }
  let A = L, W;
  if (g.NODE_ENV !== "production" && L.patchFlag > 0 && L.patchFlag & 2048 && ([A, W] = tl(L)), $ && O !== !1) {
    const I = Object.keys($), { shapeFlag: z } = A;
    if (I.length) {
      if (z & 7)
        i && I.some(so) && ($ = Ya(
          $,
          i
        )), A = Tt(A, $, !1, !0);
      else if (g.NODE_ENV !== "production" && !cr && A.type !== Re) {
        const w = Object.keys(l), U = [], ue = [];
        for (let Ae = 0, Fe = w.length; Ae < Fe; Ae++) {
          const we = w[Ae];
          jn(we) ? so(we) || U.push(we[2].toLowerCase() + we.slice(3)) : ue.push(we);
        }
        ue.length && V(
          `Extraneous non-props attributes (${ue.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), U.length && V(
          `Extraneous non-emits event listeners (${U.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (g.NODE_ENV !== "production" && !fi(A) && V(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), A = Tt(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs), n.transition && (g.NODE_ENV !== "production" && !fi(A) && V(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), $r(A, n.transition)), g.NODE_ENV !== "production" && W ? W(A) : L = A, mo(F), L;
}
const tl = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Lr(t, !1);
  if (o) {
    if (g.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return tl(o);
  } else return [e, void 0];
  const r = t.indexOf(o), i = n ? n.indexOf(o) : -1, s = (l) => {
    t[r] = l, n && (i > -1 ? n[i] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [He(o), s];
};
function Lr(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (ln(r)) {
      if (r.type !== Re || r.children === "v-if") {
        if (n)
          return;
        if (n = r, g.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Lr(n.children);
      }
    } else
      return;
  }
  return n;
}
const Ja = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || jn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ya = (e, t) => {
  const n = {};
  for (const o in e)
    (!so(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, fi = (e) => e.shapeFlag & 7 || e.type === Re;
function Qa(e, t, n) {
  const { props: o, children: r, component: i } = e, { props: s, children: l, patchFlag: c } = t, p = i.emitsOptions;
  if (g.NODE_ENV !== "production" && (r || l) && it || t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return o ? di(o, s, p) : !!s;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        const h = u[a];
        if (s[h] !== o[h] && !To(p, h))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : o === s ? !1 : o ? s ? di(o, s, p) : !0 : !!s;
  return !1;
}
function di(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const i = o[r];
    if (t[i] !== e[i] && !To(n, i))
      return !0;
  }
  return !1;
}
function Xa({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const nl = (e) => e.__isSuspense;
function Za(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : Ss(e);
}
const Le = Symbol.for("v-fgt"), Kn = Symbol.for("v-txt"), Re = Symbol.for("v-cmt"), Vn = Symbol.for("v-stc"), Cn = [];
let Te = null;
function et(e = !1) {
  Cn.push(Te = e ? null : []);
}
function eu() {
  Cn.pop(), Te = Cn[Cn.length - 1] || null;
}
let In = 1;
function yo(e, t = !1) {
  In += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function ol(e) {
  return e.dynamicChildren = In > 0 ? Te || nn : null, eu(), In > 0 && Te && Te.push(e), e;
}
function dt(e, t, n, o, r, i) {
  return ol(
    k(
      e,
      t,
      n,
      o,
      r,
      i,
      !0
    )
  );
}
function tu(e, t, n, o, r) {
  return ol(
    Ce(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function ln(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function _n(e, t) {
  if (g.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = eo.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const nu = (...e) => il(
  ...e
), rl = ({ key: e }) => e ?? null, oo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || de(e) || B(e) ? { i: Ne, r: e, k: t, f: !!n } : e : null);
function k(e, t = null, n = null, o = 0, r = null, i = e === Le ? 0 : 1, s = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && rl(t),
    ref: t && oo(t),
    scopeId: As,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return l ? (Hr(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ae(n) ? 8 : 16), g.NODE_ENV !== "production" && c.key !== c.key && V("VNode created with invalid key (NaN). VNode type:", c.type), In > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Te.push(c), c;
}
const Ce = g.NODE_ENV !== "production" ? nu : il;
function il(e, t = null, n = null, o = 0, r = null, i = !1) {
  if ((!e || e === fa) && (g.NODE_ENV !== "production" && !e && V(`Invalid vnode type when creating vnode: ${e}.`), e = Re), ln(e)) {
    const l = Tt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Hr(l, n), In > 0 && !i && Te && (l.shapeFlag & 6 ? Te[Te.indexOf(e)] = l : Te.push(l)), l.patchFlag = -2, l;
  }
  if (ul(e) && (e = e.__vccOpts), t) {
    t = ou(t);
    let { class: l, style: c } = t;
    l && !ae(l) && (t.class = xo(l)), oe(c) && (ao(c) && !j(c) && (c = pe({}, c)), t.style = Or(c));
  }
  const s = ae(e) ? 1 : nl(e) ? 128 : Xc(e) ? 64 : oe(e) ? 4 : B(e) ? 2 : 0;
  return g.NODE_ENV !== "production" && s & 4 && ao(e) && (e = J(e), V(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), k(
    e,
    t,
    n,
    o,
    r,
    s,
    i,
    !0
  );
}
function ou(e) {
  return e ? ao(e) || Gs(e) ? pe({}, e) : e : null;
}
function Tt(e, t, n = !1, o = !1) {
  const { props: r, ref: i, patchFlag: s, children: l, transition: c } = e, p = t ? iu(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && rl(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? j(i) ? i.concat(oo(t)) : [i, oo(t)] : oo(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: g.NODE_ENV !== "production" && s === -1 && j(l) ? l.map(sl) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Le ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Tt(e.ssContent),
    ssFallback: e.ssFallback && Tt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && o && $r(
    u,
    c.clone(u)
  ), u;
}
function sl(e) {
  const t = Tt(e);
  return j(e.children) && (t.children = e.children.map(sl)), t;
}
function ro(e = " ", t = 0) {
  return Ce(Kn, null, e, t);
}
function ru(e, t) {
  const n = Ce(Vn, null, e);
  return n.staticCount = t, n;
}
function Wo(e = "", t = !1) {
  return t ? (et(), tu(Re, null, e)) : Ce(Re, null, e);
}
function He(e) {
  return e == null || typeof e == "boolean" ? Ce(Re) : j(e) ? Ce(
    Le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ln(e) ? Vt(e) : Ce(Kn, null, String(e));
}
function Vt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Tt(e);
}
function Hr(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Hr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Gs(t) ? t._ctx = Ne : r === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else B(t) ? (t = { default: t, _ctx: Ne }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [ro(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function iu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = xo([t.class, o.class]));
      else if (r === "style")
        t.style = Or([t.style, o.style]);
      else if (jn(r)) {
        const i = t[r], s = o[r];
        s && i !== s && !(j(i) && i.includes(s)) && (t[r] = i ? [].concat(i, s) : s);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function Ze(e, t, n, o = null) {
  at(e, t, 7, [
    n,
    o
  ]);
}
const su = Ks();
let lu = 0;
function cu(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || su, i = {
    uid: lu++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new oc(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: zs(o, r),
    emitsOptions: el(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ie,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: ie,
    data: ie,
    props: ie,
    attrs: ie,
    slots: ie,
    refs: ie,
    setupState: ie,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return g.NODE_ENV !== "production" ? i.ctx = pa(i) : i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = qa.bind(null, i), e.ce && e.ce(i), i;
}
let ve = null;
const Ro = () => ve || Ne;
let bo, ar;
{
  const e = Ln(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (i) => {
      r.length > 1 ? r.forEach((s) => s(i)) : r[0](i);
    };
  };
  bo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ve = n
  ), ar = t(
    "__VUE_SSR_SETTERS__",
    (n) => kn = n
  );
}
const Bn = (e) => {
  const t = ve;
  return bo(e), e.scope.on(), () => {
    e.scope.off(), bo(t);
  };
}, pi = () => {
  ve && ve.scope.off(), bo(null);
}, au = /* @__PURE__ */ bt("slot,component");
function ur(e, { isNativeTag: t }) {
  (au(e) || t(e)) && V(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function ll(e) {
  return e.vnode.shapeFlag & 4;
}
let kn = !1;
function uu(e, t = !1, n = !1) {
  t && ar(t);
  const { props: o, children: r } = e.vnode, i = ll(e);
  wa(e, o, i, t), Ia(e, r, n || t);
  const s = i ? fu(e, t) : void 0;
  return t && ar(!1), s;
}
function fu(e, t) {
  var n;
  const o = e.type;
  if (g.NODE_ENV !== "production") {
    if (o.name && ur(o.name, e.appContext.config), o.components) {
      const i = Object.keys(o.components);
      for (let s = 0; s < i.length; s++)
        ur(i[s], e.appContext.config);
    }
    if (o.directives) {
      const i = Object.keys(o.directives);
      for (let s = 0; s < i.length; s++)
        Is(i[s]);
    }
    o.compilerOptions && du() && V(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ls), g.NODE_ENV !== "production" && ha(e);
  const { setup: r } = o;
  if (r) {
    Ge();
    const i = e.setupContext = r.length > 1 ? hu(e) : null, s = Bn(e), l = dn(
      r,
      e,
      0,
      [
        g.NODE_ENV !== "production" ? rt(e.props) : e.props,
        i
      ]
    ), c = yr(l);
    if (qe(), s(), (c || e.sp) && !Dn(e) && ks(e), c) {
      if (l.then(pi, pi), t)
        return l.then((p) => {
          hi(e, p, t);
        }).catch((p) => {
          Hn(p, e, 0);
        });
      if (e.asyncDep = l, g.NODE_ENV !== "production" && !e.suspense) {
        const p = (n = o.name) != null ? n : "Anonymous";
        V(
          `Component <${p}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      hi(e, l, t);
  } else
    cl(e, t);
}
function hi(e, t, n) {
  B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) ? (g.NODE_ENV !== "production" && ln(t) && V(
    "setup() should not return VNodes directly - return a render function instead."
  ), g.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Os(t), g.NODE_ENV !== "production" && ma(e)) : g.NODE_ENV !== "production" && t !== void 0 && V(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), cl(e, n);
}
const du = () => !0;
function cl(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || me);
  {
    const r = Bn(e);
    Ge();
    try {
      _a(e);
    } finally {
      qe(), r();
    }
  }
  g.NODE_ENV !== "production" && !o.render && e.render === me && !t && (o.template ? V(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : V("Component is missing template or render function: ", o));
}
const mi = g.NODE_ENV !== "production" ? {
  get(e, t) {
    return Eo(), he(e, "get", ""), e[t];
  },
  set() {
    return V("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return V("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return he(e, "get", ""), e[t];
  }
};
function pu(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return he(e, "get", "$slots"), t[n];
    }
  });
}
function hu(e) {
  const t = (n) => {
    if (g.NODE_ENV !== "production" && (e.exposed && V("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (j(n) ? o = "array" : de(n) && (o = "ref")), o !== "object" && V(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (g.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, mi));
      },
      get slots() {
        return o || (o = pu(e));
      },
      get emit() {
        return (r, ...i) => e.emit(r, ...i);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, mi),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function $o(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Os(Oc(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Wt)
        return Wt[n](e);
    },
    has(t, n) {
      return n in t || n in Wt;
    }
  })) : e.proxy;
}
const mu = /(?:^|[-_])\w/g, gu = (e) => e.replace(mu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function al(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ao(e, t, n = !1) {
  let o = al(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (i) => {
      for (const s in i)
        if (i[s] === t)
          return s;
    };
    o = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? gu(o) : n ? "App" : "Anonymous";
}
function ul(e) {
  return B(e) && "__vccOpts" in e;
}
const Ve = (e, t) => {
  const n = Vc(e, t, kn);
  if (g.NODE_ENV !== "production") {
    const o = Ro();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function fl(e, t, n) {
  try {
    yo(-1);
    const o = arguments.length;
    return o === 2 ? oe(t) && !j(t) ? ln(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && ln(n) && (n = [n]), Ce(e, t, n));
  } finally {
    yo(1);
  }
}
function _u() {
  if (g.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!oe(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (de(a)) {
        Ge();
        const h = a.value;
        return qe(), [
          "div",
          {},
          ["span", e, u(a)],
          "<",
          l(h),
          ">"
        ];
      } else {
        if (Kt(a))
          return [
            "div",
            {},
            ["span", e, Oe(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${ct(a) ? " (readonly)" : ""}`
          ];
        if (ct(a))
          return [
            "div",
            {},
            ["span", e, Oe(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...i(a.$)
        ];
    }
  };
  function i(a) {
    const h = [];
    a.type.props && a.props && h.push(s("props", J(a.props))), a.setupState !== ie && h.push(s("setup", a.setupState)), a.data !== ie && h.push(s("data", J(a.data)));
    const m = c(a, "computed");
    m && h.push(s("computed", m));
    const x = c(a, "inject");
    return x && h.push(s("injected", x)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), h;
  }
  function s(a, h) {
    return h = pe({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((m) => [
          "div",
          {},
          ["span", o, m + ": "],
          l(h[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, h = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : oe(a) ? ["object", { object: h ? J(a) : a }] : ["span", n, String(a)];
  }
  function c(a, h) {
    const m = a.type;
    if (B(m))
      return;
    const x = {};
    for (const O in a.ctx)
      p(m, O, h) && (x[O] = a.ctx[O]);
    return x;
  }
  function p(a, h, m) {
    const x = a[m];
    if (j(x) && x.includes(h) || oe(x) && h in x || a.extends && p(a.extends, h, m) || a.mixins && a.mixins.some((O) => p(O, h, m)))
      return !0;
  }
  function u(a) {
    return Oe(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const gi = "3.5.22", st = g.NODE_ENV !== "production" ? V : me;
var ut = {};
let fr;
const _i = typeof window < "u" && window.trustedTypes;
if (_i)
  try {
    fr = /* @__PURE__ */ _i.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    ut.NODE_ENV !== "production" && st(`Error creating trusted types policy: ${e}`);
  }
const dl = fr ? (e) => fr.createHTML(e) : (e) => e, vu = "http://www.w3.org/2000/svg", Eu = "http://www.w3.org/1998/Math/MathML", mt = typeof document < "u" ? document : null, vi = mt && /* @__PURE__ */ mt.createElement("template"), yu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? mt.createElementNS(vu, e) : t === "mathml" ? mt.createElementNS(Eu, e) : n ? mt.createElement(e, { is: n }) : mt.createElement(e);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => mt.createTextNode(e),
  createComment: (e) => mt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => mt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, i) {
    const s = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      vi.innerHTML = dl(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = vi.content;
      if (o === "svg" || o === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, bu = Symbol("_vtc");
function Nu(e, t, n) {
  const o = e[bu];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ei = Symbol("_vod"), Ou = Symbol("_vsh"), wu = Symbol(ut.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), xu = /(?:^|;)\s*display\s*:/;
function Du(e, t, n) {
  const o = e.style, r = ae(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (ae(t))
        for (const s of t.split(";")) {
          const l = s.slice(0, s.indexOf(":")).trim();
          n[l] == null && io(o, l, "");
        }
      else
        for (const s in t)
          n[s] == null && io(o, s, "");
    for (const s in n)
      s === "display" && (i = !0), io(o, s, n[s]);
  } else if (r) {
    if (t !== n) {
      const s = o[wu];
      s && (n += ";" + s), o.cssText = n, i = xu.test(n);
    }
  } else t && e.removeAttribute("style");
  Ei in e && (e[Ei] = i ? o.display : "", e[Ou] && (o.display = "none"));
}
const Su = /[^\\];\s*$/, yi = /\s*!important$/;
function io(e, t, n) {
  if (j(n))
    n.forEach((o) => io(e, t, o));
  else if (n == null && (n = ""), ut.NODE_ENV !== "production" && Su.test(n) && st(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Vu(e, t);
    yi.test(n) ? e.setProperty(
      yt(o),
      n.replace(yi, ""),
      "important"
    ) : e[o] = n;
  }
}
const bi = ["Webkit", "Moz", "ms"], Go = {};
function Vu(e, t) {
  const n = Go[t];
  if (n)
    return n;
  let o = Ue(t);
  if (o !== "filter" && o in e)
    return Go[t] = o;
  o = wo(o);
  for (let r = 0; r < bi.length; r++) {
    const i = bi[r] + o;
    if (i in e)
      return Go[t] = i;
  }
  return t;
}
const Ni = "http://www.w3.org/1999/xlink";
function Oi(e, t, n, o, r, i = tc(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ni, t.slice(6, t.length)) : e.setAttributeNS(Ni, t, n) : n == null || i && !ns(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : lt(n) ? String(n) : n
  );
}
function wi(e, t, n, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? dl(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = ns(n) : n == null && l === "string" ? (n = "", s = !0) : l === "number" && (n = 0, s = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    ut.NODE_ENV !== "production" && !s && st(
      `Failed setting prop "${t}" on <${i.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  s && e.removeAttribute(r || t);
}
function Et(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Cu(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const xi = Symbol("_vei");
function Pu(e, t, n, o, r = null) {
  const i = e[xi] || (e[xi] = {}), s = i[t];
  if (o && s)
    s.value = ut.NODE_ENV !== "production" ? Si(o, t) : o;
  else {
    const [l, c] = Tu(t);
    if (o) {
      const p = i[t] = Au(
        ut.NODE_ENV !== "production" ? Si(o, t) : o,
        r
      );
      Et(e, l, p, c);
    } else s && (Cu(e, l, s, c), i[t] = void 0);
  }
}
const Di = /(?:Once|Passive|Capture)$/;
function Tu(e) {
  let t;
  if (Di.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Di); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : yt(e.slice(2)), t];
}
let qo = 0;
const Ru = /* @__PURE__ */ Promise.resolve(), $u = () => qo || (Ru.then(() => qo = 0), qo = Date.now());
function Au(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    at(
      Iu(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = $u(), n;
}
function Si(e, t) {
  return B(e) || j(e) ? e : (st(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), me);
}
function Iu(e, t) {
  if (j(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (r) => !r._stopped && o && o(r)
    );
  } else
    return t;
}
const Vi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ku = (e, t, n, o, r, i) => {
  const s = r === "svg";
  t === "class" ? Nu(e, o, s) : t === "style" ? Du(e, n, o) : jn(t) ? so(t) || Pu(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mu(e, t, o, s)) ? (wi(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Oi(e, t, o, s, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ae(o)) ? wi(e, Ue(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Oi(e, t, o, s));
};
function Mu(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Vi(t) && B(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Vi(t) && ae(n) ? !1 : t in e;
}
const Rt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return j(t) ? (n) => Zt(t, n) : t;
};
function ju(e) {
  e.target.composing = !0;
}
function Ci(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const je = Symbol("_assign"), tn = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e[je] = Rt(r);
    const i = o || r.props && r.props.type === "number";
    Et(e, t ? "change" : "input", (s) => {
      if (s.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = co(l)), e[je](l);
    }), n && Et(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Et(e, "compositionstart", ju), Et(e, "compositionend", Ci), Et(e, "change", Ci));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: r, number: i } }, s) {
    if (e[je] = Rt(s), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? co(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (o && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, pl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[je] = Rt(n), Et(e, "change", () => {
      const o = e._modelValue, r = cn(e), i = e.checked, s = e[je];
      if (j(o)) {
        const l = wr(o, r), c = l !== -1;
        if (i && !c)
          s(o.concat(r));
        else if (!i && c) {
          const p = [...o];
          p.splice(l, 1), s(p);
        }
      } else if (fn(o)) {
        const l = new Set(o);
        i ? l.add(r) : l.delete(r), s(l);
      } else
        s(ml(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Pi,
  beforeUpdate(e, t, n) {
    e[je] = Rt(n), Pi(e, t, n);
  }
};
function Pi(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let r;
  if (j(t))
    r = wr(t, o.props.value) > -1;
  else if (fn(t))
    r = t.has(o.props.value);
  else {
    if (t === n) return;
    r = Gt(t, ml(e, !0));
  }
  e.checked !== r && (e.checked = r);
}
const Fu = {
  created(e, { value: t }, n) {
    e.checked = Gt(t, n.props.value), e[je] = Rt(n), Et(e, "change", () => {
      e[je](cn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, o) {
    e[je] = Rt(o), t !== n && (e.checked = Gt(t, o.props.value));
  }
}, hl = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const r = fn(t);
    Et(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (s) => s.selected).map(
        (s) => n ? co(cn(s)) : cn(s)
      );
      e[je](
        e.multiple ? r ? new Set(i) : i : i[0]
      ), e._assigning = !0, Pr(() => {
        e._assigning = !1;
      });
    }), e[je] = Rt(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ti(e, t);
  },
  beforeUpdate(e, t, n) {
    e[je] = Rt(n);
  },
  updated(e, { value: t }) {
    e._assigning || Ti(e, t);
  }
};
function Ti(e, t) {
  const n = e.multiple, o = j(t);
  if (n && !o && !fn(t)) {
    ut.NODE_ENV !== "production" && st(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let r = 0, i = e.options.length; r < i; r++) {
    const s = e.options[r], l = cn(s);
    if (n)
      if (o) {
        const c = typeof l;
        c === "string" || c === "number" ? s.selected = t.some((p) => String(p) === String(l)) : s.selected = wr(t, l) > -1;
      } else
        s.selected = t.has(l);
    else if (Gt(cn(s), t)) {
      e.selectedIndex !== r && (e.selectedIndex = r);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function cn(e) {
  return "_value" in e ? e._value : e.value;
}
function ml(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Rp = {
  created(e, t, n) {
    Yn(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Yn(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, o) {
    Yn(e, t, n, o, "beforeUpdate");
  },
  updated(e, t, n, o) {
    Yn(e, t, n, o, "updated");
  }
};
function Lu(e, t) {
  switch (e) {
    case "SELECT":
      return hl;
    case "TEXTAREA":
      return tn;
    default:
      switch (t) {
        case "checkbox":
          return pl;
        case "radio":
          return Fu;
        default:
          return tn;
      }
  }
}
function Yn(e, t, n, o, r) {
  const s = Lu(
    e.tagName,
    n.props && n.props.type
  )[r];
  s && s(e, t, n, o);
}
const Hu = ["ctrl", "shift", "alt", "meta"], Uu = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Hu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ri = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((r, ...i) => {
    for (let s = 0; s < t.length; s++) {
      const l = Uu[t[s]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, Ku = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Bu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((r) => {
    if (!("key" in r))
      return;
    const i = yt(r.key);
    if (t.some(
      (s) => s === i || Ku[s] === i
    ))
      return e(r);
  }));
}, Wu = /* @__PURE__ */ pe({ patchProp: ku }, yu);
let $i;
function Gu() {
  return $i || ($i = ja(Wu));
}
const qu = ((...e) => {
  const t = Gu().createApp(...e);
  ut.NODE_ENV !== "production" && (Ju(t), Yu(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = Qu(o);
    if (!r) return;
    const i = t._component;
    !B(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const s = n(r, !1, zu(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), s;
  }, t;
});
function zu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ju(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Ql(t) || Xl(t) || Zl(t),
    writable: !1
  });
}
function Yu(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        st(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return st(o), n;
      },
      set() {
        st(o);
      }
    });
  }
}
function Qu(e) {
  if (ae(e)) {
    const t = document.querySelector(e);
    return ut.NODE_ENV !== "production" && !t && st(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return ut.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && st(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
var Xu = {};
function Zu() {
  _u();
}
Xu.NODE_ENV !== "production" && Zu();
function ef() {
  return gl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function gl() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const tf = typeof Proxy == "function", nf = "devtools-plugin:setup", of = "plugin:settings:set";
let Xt, dr;
function rf() {
  var e;
  return Xt !== void 0 || (typeof window < "u" && window.performance ? (Xt = !0, dr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Xt = !0, dr = globalThis.perf_hooks.performance) : Xt = !1), Xt;
}
function sf() {
  return rf() ? dr.now() : Date.now();
}
class lf {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const s in t.settings) {
        const l = t.settings[s];
        o[s] = l.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, o);
    try {
      const s = localStorage.getItem(r), l = JSON.parse(s);
      Object.assign(i, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(s) {
        try {
          localStorage.setItem(r, JSON.stringify(s));
        } catch {
        }
        i = s;
      },
      now() {
        return sf();
      }
    }, n && n.on(of, (s, l) => {
      s === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (s, l) => this.target ? this.target.on[l] : (...c) => {
        this.onQueue.push({
          method: l,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (s, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...c) => (this.targetQueue.push({
        method: l,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[l](...c)) : (...c) => new Promise((p) => {
        this.targetQueue.push({
          method: l,
          args: c,
          resolve: p
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function cf(e, t) {
  const n = e, o = gl(), r = ef(), i = tf && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    r.emit(nf, e, t);
  else {
    const s = i ? new lf(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: s
    }), s && t(s.proxiedTarget);
  }
}
var q = {};
const _t = typeof document < "u";
function _l(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function af(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  e.default && _l(e.default);
}
const ne = Object.assign;
function zo(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = $e(r) ? r.map(e) : e(r);
  }
  return n;
}
const Pn = () => {
}, $e = Array.isArray;
function X(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const vl = /#/g, uf = /&/g, ff = /\//g, df = /=/g, pf = /\?/g, El = /\+/g, hf = /%5B/g, mf = /%5D/g, yl = /%5E/g, gf = /%60/g, bl = /%7B/g, _f = /%7C/g, Nl = /%7D/g, vf = /%20/g;
function Ur(e) {
  return encodeURI("" + e).replace(_f, "|").replace(hf, "[").replace(mf, "]");
}
function Ef(e) {
  return Ur(e).replace(bl, "{").replace(Nl, "}").replace(yl, "^");
}
function pr(e) {
  return Ur(e).replace(El, "%2B").replace(vf, "+").replace(vl, "%23").replace(uf, "%26").replace(gf, "`").replace(bl, "{").replace(Nl, "}").replace(yl, "^");
}
function yf(e) {
  return pr(e).replace(df, "%3D");
}
function bf(e) {
  return Ur(e).replace(vl, "%23").replace(pf, "%3F");
}
function Nf(e) {
  return e == null ? "" : bf(e).replace(ff, "%2F");
}
function an(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    q.NODE_ENV !== "production" && X(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Of = /\/$/, wf = (e) => e.replace(Of, "");
function Jo(e, t, n = "/") {
  let o, r = {}, i = "", s = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return l < c && l >= 0 && (c = -1), c > -1 && (o = t.slice(0, c), i = t.slice(c + 1, l > -1 ? l : t.length), r = e(i)), l > -1 && (o = o || t.slice(0, l), s = t.slice(l, t.length)), o = Sf(o ?? t, n), {
    fullPath: o + (i && "?") + i + s,
    path: o,
    query: r,
    hash: an(s)
  };
}
function xf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ai(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ii(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && $t(t.matched[o], n.matched[r]) && Ol(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function $t(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ol(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Df(e[n], t[n]))
      return !1;
  return !0;
}
function Df(e, t) {
  return $e(e) ? ki(e, t) : $e(t) ? ki(t, e) : e === t;
}
function ki(e, t) {
  return $e(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Sf(e, t) {
  if (e.startsWith("/"))
    return e;
  if (q.NODE_ENV !== "production" && !t.startsWith("/"))
    return X(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/"), r = o[o.length - 1];
  (r === ".." || r === ".") && o.push("");
  let i = n.length - 1, s, l;
  for (s = 0; s < o.length; s++)
    if (l = o[s], l !== ".")
      if (l === "..")
        i > 1 && i--;
      else
        break;
  return n.slice(0, i).join("/") + "/" + o.slice(s).join("/");
}
const Dt = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var Mn;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Mn || (Mn = {}));
var Tn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Tn || (Tn = {}));
function Vf(e) {
  if (!e)
    if (_t) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), wf(e);
}
const Cf = /^[^#]+#/;
function Pf(e, t) {
  return e.replace(Cf, "#") + t;
}
function Tf(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const Io = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Rf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (q.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const i = document.querySelector(e.el);
        if (o && i) {
          X(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        X(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      q.NODE_ENV !== "production" && X(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Tf(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Mi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const hr = /* @__PURE__ */ new Map();
function $f(e, t) {
  hr.set(e, t);
}
function Af(e) {
  const t = hr.get(e);
  return hr.delete(e), t;
}
let If = () => location.protocol + "//" + location.host;
function wl(e, t) {
  const { pathname: n, search: o, hash: r } = t, i = e.indexOf("#");
  if (i > -1) {
    let l = r.includes(e.slice(i)) ? e.slice(i).length : 1, c = r.slice(l);
    return c[0] !== "/" && (c = "/" + c), Ai(c, "");
  }
  return Ai(n, e) + o + r;
}
function kf(e, t, n, o) {
  let r = [], i = [], s = null;
  const l = ({ state: h }) => {
    const m = wl(e, location), x = n.value, O = t.value;
    let F = 0;
    if (h) {
      if (n.value = m, t.value = h, s && s === x) {
        s = null;
        return;
      }
      F = O ? h.position - O.position : 0;
    } else
      o(m);
    r.forEach((L) => {
      L(n.value, x, {
        delta: F,
        type: Mn.pop,
        direction: F ? F > 0 ? Tn.forward : Tn.back : Tn.unknown
      });
    });
  };
  function c() {
    s = n.value;
  }
  function p(h) {
    r.push(h);
    const m = () => {
      const x = r.indexOf(h);
      x > -1 && r.splice(x, 1);
    };
    return i.push(m), m;
  }
  function u() {
    const { history: h } = window;
    h.state && h.replaceState(ne({}, h.state, { scroll: Io() }), "");
  }
  function a() {
    for (const h of i)
      h();
    i = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: p,
    destroy: a
  };
}
function ji(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? Io() : null
  };
}
function Mf(e) {
  const { history: t, location: n } = window, o = {
    value: wl(e, n)
  }, r = { value: t.state };
  r.value || i(o.value, {
    back: null,
    current: o.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function i(c, p, u) {
    const a = e.indexOf("#"), h = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + c : If() + e + c;
    try {
      t[u ? "replaceState" : "pushState"](p, "", h), r.value = p;
    } catch (m) {
      q.NODE_ENV !== "production" ? X("Error with push/replace State", m) : console.error(m), n[u ? "replace" : "assign"](h);
    }
  }
  function s(c, p) {
    const u = ne({}, t.state, ji(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), p, { position: r.value.position });
    i(c, u, !0), o.value = c;
  }
  function l(c, p) {
    const u = ne(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: Io()
      }
    );
    q.NODE_ENV !== "production" && !t.state && X(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`), i(u.current, u, !0);
    const a = ne({}, ji(o.value, c, null), { position: u.position + 1 }, p);
    i(c, a, !1), o.value = c;
  }
  return {
    location: o,
    state: r,
    push: l,
    replace: s
  };
}
function jf(e) {
  e = Vf(e);
  const t = Mf(e), n = kf(e, t.state, t.location, t.replace);
  function o(i, s = !0) {
    s || n.pauseListeners(), history.go(i);
  }
  const r = ne({
    // it's overridden right after
    location: "",
    base: e,
    go: o,
    createHref: Pf.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function No(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function xl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const mr = Symbol(q.NODE_ENV !== "production" ? "navigation failure" : "");
var Fi;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Fi || (Fi = {}));
const Ff = {
  1({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  2({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Hf(t)}" via a navigation guard.`;
  },
  4({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  8({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  16({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function un(e, t) {
  return q.NODE_ENV !== "production" ? ne(new Error(Ff[e](t)), {
    type: e,
    [mr]: !0
  }, t) : ne(new Error(), {
    type: e,
    [mr]: !0
  }, t);
}
function pt(e, t) {
  return e instanceof Error && mr in e && (t == null || !!(e.type & t));
}
const Lf = ["params", "query", "hash"];
function Hf(e) {
  if (typeof e == "string")
    return e;
  if (e.path != null)
    return e.path;
  const t = {};
  for (const n of Lf)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Li = "[^/]+?", Uf = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Kf = /[.+*?^${}()[\]/\\]/g;
function Bf(e, t) {
  const n = ne({}, Uf, t), o = [];
  let r = n.start ? "^" : "";
  const i = [];
  for (const p of e) {
    const u = p.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !p.length && (r += "/");
    for (let a = 0; a < p.length; a++) {
      const h = p[a];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        a || (r += "/"), r += h.value.replace(Kf, "\\$&"), m += 40;
      else if (h.type === 1) {
        const { value: x, repeatable: O, optional: F, regexp: L } = h;
        i.push({
          name: x,
          repeatable: O,
          optional: F
        });
        const $ = L || Li;
        if ($ !== Li) {
          m += 10;
          try {
            new RegExp(`(${$})`);
          } catch (W) {
            throw new Error(`Invalid custom RegExp for param "${x}" (${$}): ` + W.message);
          }
        }
        let A = O ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
        a || (A = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        F && p.length < 2 ? `(?:/${A})` : "/" + A), F && (A += "?"), r += A, m += 20, F && (m += -8), O && (m += -20), $ === ".*" && (m += -50);
      }
      u.push(m);
    }
    o.push(u);
  }
  if (n.strict && n.end) {
    const p = o.length - 1;
    o[p][o[p].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && !r.endsWith("/") && (r += "(?:/|$)");
  const s = new RegExp(r, n.sensitive ? "" : "i");
  function l(p) {
    const u = p.match(s), a = {};
    if (!u)
      return null;
    for (let h = 1; h < u.length; h++) {
      const m = u[h] || "", x = i[h - 1];
      a[x.name] = m && x.repeatable ? m.split("/") : m;
    }
    return a;
  }
  function c(p) {
    let u = "", a = !1;
    for (const h of e) {
      (!a || !u.endsWith("/")) && (u += "/"), a = !1;
      for (const m of h)
        if (m.type === 0)
          u += m.value;
        else if (m.type === 1) {
          const { value: x, repeatable: O, optional: F } = m, L = x in p ? p[x] : "";
          if ($e(L) && !O)
            throw new Error(`Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`);
          const $ = $e(L) ? L.join("/") : L;
          if (!$)
            if (F)
              h.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : a = !0);
            else
              throw new Error(`Missing required param "${x}"`);
          u += $;
        }
    }
    return u || "/";
  }
  return {
    re: s,
    score: o,
    keys: i,
    parse: l,
    stringify: c
  };
}
function Wf(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function Dl(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const i = Wf(o[n], r[n]);
    if (i)
      return i;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (Hi(o))
      return 1;
    if (Hi(r))
      return -1;
  }
  return r.length - o.length;
}
function Hi(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Gf = {
  type: 0,
  value: ""
}, qf = /[a-zA-Z0-9_]/;
function zf(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Gf]];
  if (!e.startsWith("/"))
    throw new Error(q.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${p}": ${m}`);
  }
  let n = 0, o = n;
  const r = [];
  let i;
  function s() {
    i && r.push(i), i = [];
  }
  let l = 0, c, p = "", u = "";
  function a() {
    p && (n === 0 ? i.push({
      type: 0,
      value: p
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${p}) must be alone in its segment. eg: '/:ids+.`), i.push({
      type: 1,
      value: p,
      regexp: u,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), p = "");
  }
  function h() {
    p += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (p && a(), s()) : c === ":" ? (a(), n = 1) : h();
        break;
      case 4:
        h(), n = o;
        break;
      case 1:
        c === "(" ? n = 2 : qf.test(c) ? h() : (a(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + c : n = 3 : u += c;
        break;
      case 3:
        a(), n = 0, c !== "*" && c !== "?" && c !== "+" && l--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${p}"`), a(), s(), r;
}
function Jf(e, t, n) {
  const o = Bf(zf(e.path), n);
  if (q.NODE_ENV !== "production") {
    const i = /* @__PURE__ */ new Set();
    for (const s of o.keys)
      i.has(s.name) && X(`Found duplicated params with name "${s.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), i.add(s.name);
  }
  const r = ne(o, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Yf(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Wi({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(a) {
    return o.get(a);
  }
  function i(a, h, m) {
    const x = !m, O = Ki(a);
    q.NODE_ENV !== "production" && ed(O, h), O.aliasOf = m && m.record;
    const F = Wi(t, a), L = [O];
    if ("alias" in a) {
      const W = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const I of W)
        L.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          Ki(ne({}, O, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: m ? m.record.components : O.components,
            path: I,
            // we might be the child of an alias
            aliasOf: m ? m.record : O
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
    }
    let $, A;
    for (const W of L) {
      const { path: I } = W;
      if (h && I[0] !== "/") {
        const z = h.record.path, w = z[z.length - 1] === "/" ? "" : "/";
        W.path = h.record.path + (I && w + I);
      }
      if (q.NODE_ENV !== "production" && W.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.`);
      if ($ = Jf(W, h, F), q.NODE_ENV !== "production" && h && I[0] === "/" && nd($, h), m ? (m.alias.push($), q.NODE_ENV !== "production" && Zf(m, $)) : (A = A || $, A !== $ && A.alias.push($), x && a.name && !Bi($) && (q.NODE_ENV !== "production" && td(a, h), s(a.name))), Sl($) && c($), O.children) {
        const z = O.children;
        for (let w = 0; w < z.length; w++)
          i(z[w], $, m && m.children[w]);
      }
      m = m || $;
    }
    return A ? () => {
      s(A);
    } : Pn;
  }
  function s(a) {
    if (xl(a)) {
      const h = o.get(a);
      h && (o.delete(a), n.splice(n.indexOf(h), 1), h.children.forEach(s), h.alias.forEach(s));
    } else {
      const h = n.indexOf(a);
      h > -1 && (n.splice(h, 1), a.record.name && o.delete(a.record.name), a.children.forEach(s), a.alias.forEach(s));
    }
  }
  function l() {
    return n;
  }
  function c(a) {
    const h = od(a, n);
    n.splice(h, 0, a), a.record.name && !Bi(a) && o.set(a.record.name, a);
  }
  function p(a, h) {
    let m, x = {}, O, F;
    if ("name" in a && a.name) {
      if (m = o.get(a.name), !m)
        throw un(1, {
          location: a
        });
      if (q.NODE_ENV !== "production") {
        const A = Object.keys(a.params || {}).filter((W) => !m.keys.find((I) => I.name === W));
        A.length && X(`Discarded invalid param(s) "${A.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      F = m.record.name, x = ne(
        // paramsFromLocation is a new object
        Ui(
          h.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          m.keys.filter((A) => !A.optional).concat(m.parent ? m.parent.keys.filter((A) => A.optional) : []).map((A) => A.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        a.params && Ui(a.params, m.keys.map((A) => A.name))
      ), O = m.stringify(x);
    } else if (a.path != null)
      O = a.path, q.NODE_ENV !== "production" && !O.startsWith("/") && X(`The Matcher cannot resolve relative paths but received "${O}". Unless you directly called \`matcher.resolve("${O}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), m = n.find((A) => A.re.test(O)), m && (x = m.parse(O), F = m.record.name);
    else {
      if (m = h.name ? o.get(h.name) : n.find((A) => A.re.test(h.path)), !m)
        throw un(1, {
          location: a,
          currentLocation: h
        });
      F = m.record.name, x = ne({}, h.params, a.params), O = m.stringify(x);
    }
    const L = [];
    let $ = m;
    for (; $; )
      L.unshift($.record), $ = $.parent;
    return {
      name: F,
      path: O,
      params: x,
      matched: L,
      meta: Xf(L)
    };
  }
  e.forEach((a) => i(a));
  function u() {
    n.length = 0, o.clear();
  }
  return {
    addRoute: i,
    resolve: p,
    removeRoute: s,
    clearRoutes: u,
    getRoutes: l,
    getRecordMatcher: r
  };
}
function Ui(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function Ki(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Qf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", {
    value: {}
  }), t;
}
function Qf(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function Bi(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Xf(e) {
  return e.reduce((t, n) => ne(t, n.meta), {});
}
function Wi(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function gr(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Zf(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(gr.bind(null, n)))
      return X(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(gr.bind(null, n)))
      return X(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function ed(e, t) {
  t && t.record.name && !e.name && !e.path && X(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function td(e, t) {
  for (let n = t; n; n = n.parent)
    if (n.record.name === e.name)
      throw new Error(`A route named "${String(e.name)}" has been added as a ${t === n ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function nd(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(gr.bind(null, n)))
      return X(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function od(e, t) {
  let n = 0, o = t.length;
  for (; n !== o; ) {
    const i = n + o >> 1;
    Dl(e, t[i]) < 0 ? o = i : n = i + 1;
  }
  const r = rd(e);
  return r && (o = t.lastIndexOf(r, o - 1), q.NODE_ENV !== "production" && o < 0 && X(`Finding ancestor route "${r.record.path}" failed for "${e.record.path}"`)), o;
}
function rd(e) {
  let t = e;
  for (; t = t.parent; )
    if (Sl(t) && Dl(e, t) === 0)
      return t;
}
function Sl({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function id(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const i = o[r].replace(El, " "), s = i.indexOf("="), l = an(s < 0 ? i : i.slice(0, s)), c = s < 0 ? null : an(i.slice(s + 1));
    if (l in t) {
      let p = t[l];
      $e(p) || (p = t[l] = [p]), p.push(c);
    } else
      t[l] = c;
  }
  return t;
}
function Gi(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = yf(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    ($e(o) ? o.map((i) => i && pr(i)) : [o && pr(o)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i));
    });
  }
  return t;
}
function sd(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = $e(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const ld = Symbol(q.NODE_ENV !== "production" ? "router view location matched" : ""), qi = Symbol(q.NODE_ENV !== "production" ? "router view depth" : ""), ko = Symbol(q.NODE_ENV !== "production" ? "router" : ""), Kr = Symbol(q.NODE_ENV !== "production" ? "route location" : ""), _r = Symbol(q.NODE_ENV !== "production" ? "router view location" : "");
function vn() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function Ct(e, t, n, o, r, i = (s) => s()) {
  const s = o && // name is defined if record is because of the function overload
  (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((l, c) => {
    const p = (h) => {
      h === !1 ? c(un(4, {
        from: n,
        to: t
      })) : h instanceof Error ? c(h) : No(h) ? c(un(2, {
        from: t,
        to: h
      })) : (s && // since enterCallbackArray is truthy, both record and name also are
      o.enterCallbacks[r] === s && typeof h == "function" && s.push(h), l());
    }, u = i(() => e.call(o && o.instances[r], t, n, q.NODE_ENV !== "production" ? cd(p, t, n) : p));
    let a = Promise.resolve(u);
    if (e.length < 3 && (a = a.then(p)), q.NODE_ENV !== "production" && e.length > 2) {
      const h = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u)
        a = a.then((m) => p._called ? m : (X(h), Promise.reject(new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !p._called) {
        X(h), c(new Error("Invalid navigation guard"));
        return;
      }
    }
    a.catch((h) => c(h));
  });
}
function cd(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && X(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function Yo(e, t, n, o, r = (i) => i()) {
  const i = [];
  for (const s of e) {
    q.NODE_ENV !== "production" && !s.components && !s.children.length && X(`Record with path "${s.path}" is either missing a "component(s)" or "children" property.`);
    for (const l in s.components) {
      let c = s.components[l];
      if (q.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw X(`Component "${l}" in record with path "${s.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          X(`Component "${l}" in record with path "${s.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const p = c;
          c = () => p;
        } else c.__asyncLoader && // warn only once per component
        !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, X(`Component "${l}" in record with path "${s.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !s.instances[l]))
        if (_l(c)) {
          const u = (c.__vccOpts || c)[t];
          u && i.push(Ct(u, n, o, s, l, r));
        } else {
          let p = c();
          q.NODE_ENV !== "production" && !("catch" in p) && (X(`Component "${l}" in record with path "${s.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), p = Promise.resolve(p)), i.push(() => p.then((u) => {
            if (!u)
              throw new Error(`Couldn't resolve component "${l}" at "${s.path}"`);
            const a = af(u) ? u.default : u;
            s.mods[l] = u, s.components[l] = a;
            const m = (a.__vccOpts || a)[t];
            return m && Ct(m, n, o, s, l, r)();
          }));
        }
    }
  }
  return i;
}
function zi(e) {
  const t = Be(ko), n = Be(Kr);
  let o = !1, r = null;
  const i = Ve(() => {
    const u = Lt(e.to);
    return q.NODE_ENV !== "production" && (!o || u !== r) && (No(u) || (o ? X(`Invalid value for prop "to" in useLink()
- to:`, u, `
- previous to:`, r, `
- props:`, e) : X(`Invalid value for prop "to" in useLink()
- to:`, u, `
- props:`, e)), r = u, o = !0), t.resolve(u);
  }), s = Ve(() => {
    const { matched: u } = i.value, { length: a } = u, h = u[a - 1], m = n.matched;
    if (!h || !m.length)
      return -1;
    const x = m.findIndex($t.bind(null, h));
    if (x > -1)
      return x;
    const O = Ji(u[a - 2]);
    return (
      // we are dealing with nested routes
      a > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Ji(h) === O && // avoid comparing the child with its parent
      m[m.length - 1].path !== O ? m.findIndex($t.bind(null, u[a - 2])) : x
    );
  }), l = Ve(() => s.value > -1 && pd(n.params, i.value.params)), c = Ve(() => s.value > -1 && s.value === n.matched.length - 1 && Ol(n.params, i.value.params));
  function p(u = {}) {
    if (dd(u)) {
      const a = t[Lt(e.replace) ? "replace" : "push"](
        Lt(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(Pn);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => a), a;
    }
    return Promise.resolve();
  }
  if (q.NODE_ENV !== "production" && _t) {
    const u = Ro();
    if (u) {
      const a = {
        route: i.value,
        isActive: l.value,
        isExactActive: c.value,
        error: null
      };
      u.__vrl_devtools = u.__vrl_devtools || [], u.__vrl_devtools.push(a), Ba(() => {
        a.route = i.value, a.isActive = l.value, a.isExactActive = c.value, a.error = No(Lt(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: i,
    href: Ve(() => i.value.href),
    isActive: l,
    isExactActive: c,
    navigate: p
  };
}
function ad(e) {
  return e.length === 1 ? e[0] : e;
}
const ud = /* @__PURE__ */ Ar({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: zi,
  setup(e, { slots: t }) {
    const n = sn(zi(e)), { options: o } = Be(ko), r = Ve(() => ({
      [Yi(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Yi(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const i = t.default && ad(t.default(n));
      return e.custom ? i : fl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, i);
    };
  }
}), fd = ud;
function dd(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function pd(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!$e(r) || r.length !== o.length || o.some((i, s) => i !== r[s]))
      return !1;
  }
  return !0;
}
function Ji(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Yi = (e, t, n) => e ?? t ?? n, hd = /* @__PURE__ */ Ar({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    q.NODE_ENV !== "production" && gd();
    const o = Be(_r), r = Ve(() => e.route || o.value), i = Be(qi, 0), s = Ve(() => {
      let p = Lt(i);
      const { matched: u } = r.value;
      let a;
      for (; (a = u[p]) && !a.components; )
        p++;
      return p;
    }), l = Ve(() => r.value.matched[s.value]);
    to(qi, Ve(() => s.value + 1)), to(ld, l), to(_r, r);
    const c = jt();
    return Sn(() => [c.value, l.value, e.name], ([p, u, a], [h, m, x]) => {
      u && (u.instances[a] = p, m && m !== u && p && p === h && (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards), u.updateGuards.size || (u.updateGuards = m.updateGuards))), p && u && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !$t(u, m) || !h) && (u.enterCallbacks[a] || []).forEach((O) => O(p));
    }, { flush: "post" }), () => {
      const p = r.value, u = e.name, a = l.value, h = a && a.components[u];
      if (!h)
        return Qi(n.default, { Component: h, route: p });
      const m = a.props[u], x = m ? m === !0 ? p.params : typeof m == "function" ? m(p) : m : null, F = fl(h, ne({}, x, t, {
        onVnodeUnmounted: (L) => {
          L.component.isUnmounted && (a.instances[u] = null);
        },
        ref: c
      }));
      if (q.NODE_ENV !== "production" && _t && F.ref) {
        const L = {
          depth: s.value,
          name: a.name,
          path: a.path,
          meta: a.meta
        };
        ($e(F.ref) ? F.ref.map((A) => A.i) : [F.ref.i]).forEach((A) => {
          A.__vrv_devtools = L;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Qi(n.default, { Component: F, route: p }) || F
      );
    };
  }
});
function Qi(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const md = hd;
function gd() {
  const e = Ro(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    X(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function En(e, t) {
  const n = ne({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((o) => Sd(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function Qn(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let _d = 0;
function vd(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = _d++;
  cf({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((u, a) => {
      u.instanceData && u.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: En(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: u, componentInstance: a }) => {
      if (a.__vrv_devtools) {
        const h = a.__vrv_devtools;
        u.tags.push({
          label: (h.name ? `${h.name.toString()}: ` : "") + h.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Vl
        });
      }
      $e(a.__vrl_devtools) && (a.__devtoolsApi = r, a.__vrl_devtools.forEach((h) => {
        let m = h.route.path, x = Tl, O = "", F = 0;
        h.error ? (m = h.error, x = Od, F = wd) : h.isExactActive ? (x = Pl, O = "This is exactly active") : h.isActive && (x = Cl, O = "This link is active"), u.tags.push({
          label: m,
          textColor: F,
          tooltip: O,
          backgroundColor: x
        });
      }));
    }), Sn(t.currentRoute, () => {
      c(), r.notifyComponentUpdate(), r.sendInspectorTree(l), r.sendInspectorState(l);
    });
    const i = "router:navigations:" + o;
    r.addTimelineLayer({
      id: i,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((u, a) => {
      r.addTimelineEvent({
        layerId: i,
        event: {
          title: "Error during Navigation",
          subtitle: a.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: u },
          groupId: a.meta.__navigationId
        }
      });
    });
    let s = 0;
    t.beforeEach((u, a) => {
      const h = {
        guard: Qn("beforeEach"),
        from: En(a, "Current Location during this navigation"),
        to: En(u, "Target location")
      };
      Object.defineProperty(u.meta, "__navigationId", {
        value: s++
      }), r.addTimelineEvent({
        layerId: i,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: u.fullPath,
          data: h,
          groupId: u.meta.__navigationId
        }
      });
    }), t.afterEach((u, a, h) => {
      const m = {
        guard: Qn("afterEach")
      };
      h ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: h ? h.message : "",
          tooltip: "Navigation Failure",
          value: h
        }
      }, m.status = Qn("❌")) : m.status = Qn("✅"), m.from = En(a, "Current Location during this navigation"), m.to = En(u, "Target location"), r.addTimelineEvent({
        layerId: i,
        event: {
          title: "End of navigation",
          subtitle: u.fullPath,
          time: r.now(),
          data: m,
          logType: h ? "warning" : "default",
          groupId: u.meta.__navigationId
        }
      });
    });
    const l = "router-inspector:" + o;
    r.addInspector({
      id: l,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function c() {
      if (!p)
        return;
      const u = p;
      let a = n.getRoutes().filter((h) => !h.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !h.parent.record.components);
      a.forEach(Al), u.filter && (a = a.filter((h) => (
        // save matches state based on the payload
        vr(h, u.filter.toLowerCase())
      ))), a.forEach((h) => $l(h, t.currentRoute.value)), u.rootNodes = a.map(Rl);
    }
    let p;
    r.on.getInspectorTree((u) => {
      p = u, u.app === e && u.inspectorId === l && c();
    }), r.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const h = n.getRoutes().find((m) => m.record.__vd_id === u.nodeId);
        h && (u.state = {
          options: yd(h)
        });
      }
    }), r.sendInspectorTree(l), r.sendInspectorState(l);
  });
}
function Ed(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function yd(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${Ed(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const Vl = 15485081, Cl = 2450411, Pl = 8702998, bd = 2282478, Tl = 16486972, Nd = 6710886, Od = 16704226, wd = 12131356;
function Rl(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: bd
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Tl
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Vl
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Pl
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: Cl
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Nd
  });
  let o = n.__vd_id;
  return o == null && (o = String(xd++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Rl)
  };
}
let xd = 0;
const Dd = /^\/(.*)\/([a-z]*)$/;
function $l(e, t) {
  const n = t.matched.length && $t(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => $t(o, e.record))), e.children.forEach((o) => $l(o, t));
}
function Al(e) {
  e.__vd_match = !1, e.children.forEach(Al);
}
function vr(e, t) {
  const n = String(e.re).match(Dd);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((s) => vr(s, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), i = an(r);
  return !t.startsWith("/") && (i.includes(t) || r.includes(t)) || i.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((s) => vr(s, t));
}
function Sd(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function Vd(e) {
  const t = Yf(e.routes, e), n = e.parseQuery || id, o = e.stringifyQuery || Gi, r = e.history;
  if (q.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const i = vn(), s = vn(), l = vn(), c = wc(Dt);
  let p = Dt;
  _t && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = zo.bind(null, (v) => "" + v), a = zo.bind(null, Nf), h = (
    // @ts-expect-error: intentionally avoid the type check
    zo.bind(null, an)
  );
  function m(v, R) {
    let T, M;
    return xl(v) ? (T = t.getRecordMatcher(v), q.NODE_ENV !== "production" && !T && X(`Parent route "${String(v)}" not found when adding child route`, R), M = R) : M = v, t.addRoute(M, T);
  }
  function x(v) {
    const R = t.getRecordMatcher(v);
    R ? t.removeRoute(R) : q.NODE_ENV !== "production" && X(`Cannot remove non-existent route "${String(v)}"`);
  }
  function O() {
    return t.getRoutes().map((v) => v.record);
  }
  function F(v) {
    return !!t.getRecordMatcher(v);
  }
  function L(v, R) {
    if (R = ne({}, R || c.value), typeof v == "string") {
      const d = Jo(n, v, R.path), _ = t.resolve({ path: d.path }, R), y = r.createHref(d.fullPath);
      return q.NODE_ENV !== "production" && (y.startsWith("//") ? X(`Location "${v}" resolved to "${y}". A resolved location cannot start with multiple slashes.`) : _.matched.length || X(`No match found for location with path "${v}"`)), ne(d, _, {
        params: h(_.params),
        hash: an(d.hash),
        redirectedFrom: void 0,
        href: y
      });
    }
    if (q.NODE_ENV !== "production" && !No(v))
      return X(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, v), L({});
    let T;
    if (v.path != null)
      q.NODE_ENV !== "production" && "params" in v && !("name" in v) && // @ts-expect-error: the type is never
      Object.keys(v.params).length && X(`Path "${v.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), T = ne({}, v, {
        path: Jo(n, v.path, R.path).path
      });
    else {
      const d = ne({}, v.params);
      for (const _ in d)
        d[_] == null && delete d[_];
      T = ne({}, v, {
        params: a(d)
      }), R.params = a(R.params);
    }
    const M = t.resolve(T, R), Z = v.hash || "";
    q.NODE_ENV !== "production" && Z && !Z.startsWith("#") && X(`A \`hash\` should always start with the character "#". Replace "${Z}" with "#${Z}".`), M.params = u(h(M.params));
    const fe = xf(o, ne({}, v, {
      hash: Ef(Z),
      path: M.path
    })), f = r.createHref(fe);
    return q.NODE_ENV !== "production" && (f.startsWith("//") ? X(`Location "${v}" resolved to "${f}". A resolved location cannot start with multiple slashes.`) : M.matched.length || X(`No match found for location with path "${v.path != null ? v.path : v}"`)), ne({
      fullPath: fe,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: Z,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        o === Gi ? sd(v.query) : v.query || {}
      )
    }, M, {
      redirectedFrom: void 0,
      href: f
    });
  }
  function $(v) {
    return typeof v == "string" ? Jo(n, v, c.value.path) : ne({}, v);
  }
  function A(v, R) {
    if (p !== v)
      return un(8, {
        from: R,
        to: v
      });
  }
  function W(v) {
    return w(v);
  }
  function I(v) {
    return W(ne($(v), { replace: !0 }));
  }
  function z(v) {
    const R = v.matched[v.matched.length - 1];
    if (R && R.redirect) {
      const { redirect: T } = R;
      let M = typeof T == "function" ? T(v) : T;
      if (typeof M == "string" && (M = M.includes("?") || M.includes("#") ? M = $(M) : (
        // force empty params
        { path: M }
      ), M.params = {}), q.NODE_ENV !== "production" && M.path == null && !("name" in M))
        throw X(`Invalid redirect found:
${JSON.stringify(M, null, 2)}
 when navigating to "${v.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return ne({
        query: v.query,
        hash: v.hash,
        // avoid transferring params if the redirect has a path
        params: M.path != null ? {} : v.params
      }, M);
    }
  }
  function w(v, R) {
    const T = p = L(v), M = c.value, Z = v.state, fe = v.force, f = v.replace === !0, d = z(T);
    if (d)
      return w(
        ne($(d), {
          state: typeof d == "object" ? ne({}, Z, d.state) : Z,
          force: fe,
          replace: f
        }),
        // keep original redirectedFrom if it exists
        R || T
      );
    const _ = T;
    _.redirectedFrom = R;
    let y;
    return !fe && Ii(o, M, T) && (y = un(16, { to: _, from: M }), Ot(
      M,
      M,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (y ? Promise.resolve(y) : Ae(_, M)).catch((E) => pt(E) ? (
      // navigation redirects still mark the router as ready
      pt(
        E,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? E : At(E)
    ) : (
      // reject any unknown error
      Q(E, _, M)
    )).then((E) => {
      if (E) {
        if (pt(
          E,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return q.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          Ii(o, L(E.to), _) && // and we have done it a couple of times
          R && // @ts-expect-error: added only in dev
          (R._count = R._count ? (
            // @ts-expect-error
            R._count + 1
          ) : 1) > 30 ? (X(`Detected a possibly infinite redirection in a navigation guard when going from "${M.fullPath}" to "${_.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : w(
            // keep options
            ne({
              // preserve an existing replacement but allow the redirect to override it
              replace: f
            }, $(E.to), {
              state: typeof E.to == "object" ? ne({}, Z, E.to.state) : Z,
              force: fe
            }),
            // preserve the original redirectedFrom if any
            R || _
          );
      } else
        E = we(_, M, !0, f, Z);
      return Fe(_, M, E), E;
    });
  }
  function U(v, R) {
    const T = A(v, R);
    return T ? Promise.reject(T) : Promise.resolve();
  }
  function ue(v) {
    const R = wt.values().next().value;
    return R && typeof R.runWithContext == "function" ? R.runWithContext(v) : v();
  }
  function Ae(v, R) {
    let T;
    const [M, Z, fe] = Cd(v, R);
    T = Yo(M.reverse(), "beforeRouteLeave", v, R);
    for (const d of M)
      d.leaveGuards.forEach((_) => {
        T.push(Ct(_, v, R));
      });
    const f = U.bind(null, v, R);
    return T.push(f), xt(T).then(() => {
      T = [];
      for (const d of i.list())
        T.push(Ct(d, v, R));
      return T.push(f), xt(T);
    }).then(() => {
      T = Yo(Z, "beforeRouteUpdate", v, R);
      for (const d of Z)
        d.updateGuards.forEach((_) => {
          T.push(Ct(_, v, R));
        });
      return T.push(f), xt(T);
    }).then(() => {
      T = [];
      for (const d of fe)
        if (d.beforeEnter)
          if ($e(d.beforeEnter))
            for (const _ of d.beforeEnter)
              T.push(Ct(_, v, R));
          else
            T.push(Ct(d.beforeEnter, v, R));
      return T.push(f), xt(T);
    }).then(() => (v.matched.forEach((d) => d.enterCallbacks = {}), T = Yo(fe, "beforeRouteEnter", v, R, ue), T.push(f), xt(T))).then(() => {
      T = [];
      for (const d of s.list())
        T.push(Ct(d, v, R));
      return T.push(f), xt(T);
    }).catch((d) => pt(
      d,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? d : Promise.reject(d));
  }
  function Fe(v, R, T) {
    l.list().forEach((M) => ue(() => M(v, R, T)));
  }
  function we(v, R, T, M, Z) {
    const fe = A(v, R);
    if (fe)
      return fe;
    const f = R === Dt, d = _t ? history.state : {};
    T && (M || f ? r.replace(v.fullPath, ne({
      scroll: f && d && d.scroll
    }, Z)) : r.push(v.fullPath, Z)), c.value = v, Ot(v, R, T, f), At();
  }
  let ze;
  function Wn() {
    ze || (ze = r.listen((v, R, T) => {
      if (!Gn.listening)
        return;
      const M = L(v), Z = z(M);
      if (Z) {
        w(ne(Z, { replace: !0, force: !0 }), M).catch(Pn);
        return;
      }
      p = M;
      const fe = c.value;
      _t && $f(Mi(fe.fullPath, T.delta), Io()), Ae(M, fe).catch((f) => pt(
        f,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? f : pt(
        f,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (w(
        ne($(f.to), {
          force: !0
        }),
        M
        // avoid an uncaught rejection, let push call triggerError
      ).then((d) => {
        pt(
          d,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !T.delta && T.type === Mn.pop && r.go(-1, !1);
      }).catch(Pn), Promise.reject()) : (T.delta && r.go(-T.delta, !1), Q(f, M, fe))).then((f) => {
        f = f || we(
          // after navigation, all matched components are resolved
          M,
          fe,
          !1
        ), f && (T.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !pt(
          f,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-T.delta, !1) : T.type === Mn.pop && pt(
          f,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), Fe(M, fe, f);
      }).catch(Pn);
    }));
  }
  let Ie = vn(), ge = vn(), Y;
  function Q(v, R, T) {
    At(v);
    const M = ge.list();
    return M.length ? M.forEach((Z) => Z(v, R, T)) : (q.NODE_ENV !== "production" && X("uncaught error during route navigation:"), console.error(v)), Promise.reject(v);
  }
  function ke() {
    return Y && c.value !== Dt ? Promise.resolve() : new Promise((v, R) => {
      Ie.add([v, R]);
    });
  }
  function At(v) {
    return Y || (Y = !v, Wn(), Ie.list().forEach(([R, T]) => v ? T(v) : R()), Ie.reset()), v;
  }
  function Ot(v, R, T, M) {
    const { scrollBehavior: Z } = e;
    if (!_t || !Z)
      return Promise.resolve();
    const fe = !T && Af(Mi(v.fullPath, 0)) || (M || !T) && history.state && history.state.scroll || null;
    return Pr().then(() => Z(v, R, fe)).then((f) => f && Rf(f)).catch((f) => Q(f, v, R));
  }
  const Je = (v) => r.go(v);
  let Me;
  const wt = /* @__PURE__ */ new Set(), Gn = {
    currentRoute: c,
    listening: !0,
    addRoute: m,
    removeRoute: x,
    clearRoutes: t.clearRoutes,
    hasRoute: F,
    getRoutes: O,
    resolve: L,
    options: e,
    push: W,
    replace: I,
    go: Je,
    back: () => Je(-1),
    forward: () => Je(1),
    beforeEach: i.add,
    beforeResolve: s.add,
    afterEach: l.add,
    onError: ge.add,
    isReady: ke,
    install(v) {
      const R = this;
      v.component("RouterLink", fd), v.component("RouterView", md), v.config.globalProperties.$router = R, Object.defineProperty(v.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Lt(c)
      }), _t && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !Me && c.value === Dt && (Me = !0, W(r.location).catch((Z) => {
        q.NODE_ENV !== "production" && X("Unexpected error when starting the router:", Z);
      }));
      const T = {};
      for (const Z in Dt)
        Object.defineProperty(T, Z, {
          get: () => c.value[Z],
          enumerable: !0
        });
      v.provide(ko, R), v.provide(Kr, bs(T)), v.provide(_r, c);
      const M = v.unmount;
      wt.add(v), v.unmount = function() {
        wt.delete(v), wt.size < 1 && (p = Dt, ze && ze(), ze = null, c.value = Dt, Me = !1, Y = !1), M();
      }, q.NODE_ENV !== "production" && _t && vd(v, R, t);
    }
  };
  function xt(v) {
    return v.reduce((R, T) => R.then(() => ue(T)), Promise.resolve());
  }
  return Gn;
}
function Cd(e, t) {
  const n = [], o = [], r = [], i = Math.max(t.matched.length, e.matched.length);
  for (let s = 0; s < i; s++) {
    const l = t.matched[s];
    l && (e.matched.find((p) => $t(p, l)) ? o.push(l) : n.push(l));
    const c = e.matched[s];
    c && (t.matched.find((p) => $t(p, c)) || r.push(c));
  }
  return [n, o, r];
}
function Pd() {
  return Be(ko);
}
function Td(e) {
  return Be(Kr);
}
const Rd = (e) => ({
  cohorts: Array.isArray(e.cohorts) ? e.cohorts : [],
  total: e.total || 0
}), $d = (e) => ({
  cohorts: Array.isArray(e.cohorts) ? e.cohorts : []
}), Ad = (e) => ({
  cohorts: Array.isArray(e.cohorts) ? e.cohorts : []
}), Id = (e) => ({
  cohorts: Array.isArray(e.cohorts) ? e.cohorts : []
}), kd = (e) => Array.isArray(e) ? e : [], Md = (e) => typeof e == "object" && e !== null ? e : {}, jd = jl.developerdebug, pn = async (e, t) => {
  const n = {
    methodname: e,
    args: Object.assign({}, t)
  };
  try {
    return await Ml.call([n]);
  } catch (o) {
    throw jd && Fl.exception(o), o;
  }
}, Fd = async (e) => {
  const t = await pn("core_cohort_search_cohorts", e);
  return Rd(t).cohorts;
}, Ld = async (e) => {
  const t = await pn("core_cohort_create_cohorts", e);
  return $d(t).cohorts;
}, Hd = async (e) => {
  const t = await pn("core_cohort_update_cohorts", e);
  return Ad(t).cohorts;
}, Ud = async (e) => {
  const t = await pn("core_cohort_delete_cohorts", e);
  return Id(t).cohorts;
}, $p = async (e) => {
  const t = await pn("core_cohort_get_cohorts", e);
  return kd(t);
}, Ap = async (e) => {
  const t = await pn("core_cohort_get_cohort_members", e);
  return Md(t);
}, Kd = { class: "cohort-manager" }, Bd = { class: "header" }, Wd = { class: "header-actions" }, Gd = { class: "search-bar" }, qd = { class: "search-input-group" }, zd = {
  key: 0,
  class: "error-message"
}, Jd = {
  key: 1,
  class: "loading"
}, Yd = {
  key: 2,
  class: "cohort-list"
}, Qd = { class: "cohort-table" }, Xd = { class: "cohort-table-body" }, Zd = { class: "cohort-table-cell cohort-name" }, ep = ["onClick"], tp = { class: "cohort-table-cell" }, np = { class: "cohort-table-cell cohort-description" }, op = { class: "cohort-table-cell" }, rp = { class: "cohort-table-cell cohort-actions" }, ip = ["onClick"], sp = ["onClick"], lp = { class: "pagination" }, cp = ["disabled"], ap = { class: "pagination-info" }, up = ["disabled"], fp = {
  key: 3,
  class: "empty-state"
}, dp = { key: 0 }, pp = { class: "modal-header" }, hp = { class: "modal-body" }, mp = { class: "form-group" }, gp = { class: "form-group" }, _p = { class: "form-group" }, vp = { class: "form-group" }, Ep = { class: "form-group" }, yp = { class: "modal-footer" }, bp = /* @__PURE__ */ Ar({
  __name: "App",
  setup(e) {
    const t = Pd(), n = Td(), o = jt([]), r = jt(!1), i = jt(""), s = jt(""), l = sn({
      page: 1,
      perPage: 10,
      total: 0
    }), c = Ve(() => n?.path === "/");
    js(async () => {
      c.value && await p();
    });
    const p = async () => {
      r.value = !0, i.value = "";
      try {
        const z = await Fd({
          query: s.value,
          context: {
            contextlevel: "system"
          },
          includes: "all",
          limitfrom: (l.page - 1) * l.perPage,
          limitnum: l.perPage
        });
        o.value = z || [], l.total = z?.length || 0;
      } catch (z) {
        console.error("Error loading cohorts:", z), i.value = "Failed to load cohorts. Please try again.";
      } finally {
        r.value = !1;
      }
    }, u = () => {
      l.page = 1, p();
    }, a = (z) => {
      l.page = z, p();
    }, h = () => {
      l.page > 1 && a(l.page - 1);
    }, m = () => {
      const z = Math.ceil(l.total / l.perPage);
      l.page < z && a(l.page + 1);
    }, x = async (z) => {
      if (confirm(`Are you sure you want to delete "${z.name}"?`))
        try {
          await Ud({
            cohortids: [z.id]
          }), await p();
        } catch (w) {
          console.error("Error deleting cohort:", w), i.value = "Failed to delete cohort. Please try again.";
        }
    }, O = (z) => {
      t.push(`/cohort/${z.id}`);
    }, F = jt(!1), L = jt(!1), $ = Ve(() => F.value || L.value), A = Ve(() => F.value ? "Create New Cohort" : "Edit Cohort"), W = sn({
      id: 0,
      name: "",
      idnumber: "",
      description: "",
      descriptionformat: 1,
      visible: !0,
      theme: "",
      customfields: []
    }), I = async () => {
      try {
        F.value ? await Ld({
          cohorts: [W]
        }) : await Hd({
          cohorts: [W]
        }), Object.assign(W, {
          id: 0,
          name: "",
          idnumber: "",
          description: "",
          descriptionformat: 1,
          visible: !0,
          theme: "",
          customfields: []
        }), F.value = !1, L.value = !1, await p();
      } catch (z) {
        console.error("Error saving cohort:", z), i.value = "Failed to save cohort. Please try again.";
      }
    };
    return (z, w) => (et(), dt("div", Kd, [
      k("div", Bd, [
        w[13] || (w[13] = k("h1", null, "Cohort Manager", -1)),
        k("div", Wd, [
          k("button", {
            onClick: w[0] || (w[0] = (U) => F.value = !0),
            class: "btn btn-primary"
          }, [...w[12] || (w[12] = [
            k("i", { class: "icon fa fa-plus" }, null, -1),
            ro(" New Cohort ", -1)
          ])])
        ])
      ]),
      k("div", Gd, [
        k("div", qd, [
          Jt(k("input", {
            "onUpdate:modelValue": w[1] || (w[1] = (U) => s.value = U),
            type: "text",
            placeholder: "Search cohorts...",
            class: "search-input",
            onKeyup: Bu(u, ["enter"])
          }, null, 544), [
            [tn, s.value]
          ]),
          k("button", {
            onClick: u,
            class: "btn btn-search"
          }, [...w[14] || (w[14] = [
            k("i", { class: "icon fa fa-search" }, null, -1)
          ])])
        ])
      ]),
      i.value ? (et(), dt("div", zd, ht(i.value), 1)) : Wo("", !0),
      r.value ? (et(), dt("div", Jd, [...w[15] || (w[15] = [
        k("i", { class: "icon fa fa-spinner fa-spin" }, null, -1),
        ro(" Loading cohorts... ", -1)
      ])])) : o.value.length > 0 ? (et(), dt("div", Yd, [
        k("div", Qd, [
          w[18] || (w[18] = ru('<div class="cohort-table-header" data-v-6a92ec45><div class="cohort-table-cell" data-v-6a92ec45>Name</div><div class="cohort-table-cell" data-v-6a92ec45>ID Number</div><div class="cohort-table-cell" data-v-6a92ec45>Description</div><div class="cohort-table-cell" data-v-6a92ec45>Visible</div><div class="cohort-table-cell" data-v-6a92ec45>Actions</div></div>', 1)),
          k("div", Xd, [
            (et(!0), dt(Le, null, da(o.value, (U) => (et(), dt("div", {
              key: U.id,
              class: "cohort-row"
            }, [
              k("div", Zd, [
                k("a", {
                  href: "#",
                  onClick: Ri((ue) => O(U), ["prevent"]),
                  class: "cohort-link"
                }, ht(U.name), 9, ep)
              ]),
              k("div", tp, ht(U.idnumber), 1),
              k("div", np, ht(U.description || "No description"), 1),
              k("div", op, [
                k("span", {
                  class: xo(["badge", U.visible ? "badge-success" : "badge-secondary"])
                }, ht(U.visible ? "Visible" : "Hidden"), 3)
              ]),
              k("div", rp, [
                k("button", {
                  onClick: (ue) => {
                    L.value = !0, W.id = U.id, W.name = U.name, W.idnumber = U.idnumber, W.description = U.description, W.visible = U.visible, W.theme = U.theme || "";
                  },
                  class: "btn btn-sm btn-edit",
                  title: "Edit"
                }, [...w[16] || (w[16] = [
                  k("i", { class: "icon fa fa-edit" }, null, -1)
                ])], 8, ip),
                k("button", {
                  onClick: (ue) => x(U),
                  class: "btn btn-sm btn-delete",
                  title: "Delete"
                }, [...w[17] || (w[17] = [
                  k("i", { class: "icon fa fa-trash" }, null, -1)
                ])], 8, sp)
              ])
            ]))), 128))
          ])
        ]),
        k("div", lp, [
          k("button", {
            onClick: h,
            disabled: l.page === 1,
            class: "btn btn-pagination"
          }, [...w[19] || (w[19] = [
            k("i", { class: "icon fa fa-chevron-left" }, null, -1)
          ])], 8, cp),
          k("div", ap, " Page " + ht(l.page) + " of " + ht(Math.ceil(l.total / l.perPage) || 1), 1),
          k("button", {
            onClick: m,
            disabled: l.page >= Math.ceil(l.total / l.perPage),
            class: "btn btn-pagination"
          }, [...w[20] || (w[20] = [
            k("i", { class: "icon fa fa-chevron-right" }, null, -1)
          ])], 8, up)
        ])
      ])) : (et(), dt("div", fp, [
        w[21] || (w[21] = k("i", { class: "icon fa fa-users fa-3x" }, null, -1)),
        w[22] || (w[22] = k("h3", null, "No cohorts found", -1)),
        !r.value && !i.value ? (et(), dt("p", dp, " Create your first cohort to get started. ")) : Wo("", !0),
        k("button", {
          onClick: w[2] || (w[2] = (U) => F.value = !0),
          class: "btn btn-primary"
        }, " Create New Cohort ")
      ])),
      $.value ? (et(), dt("div", {
        key: 4,
        class: "modal-overlay",
        onClick: w[11] || (w[11] = (U) => $.value = !1)
      }, [
        k("div", {
          class: "modal-content",
          onClick: w[10] || (w[10] = Ri(() => {
          }, ["stop"]))
        }, [
          k("div", pp, [
            k("h2", null, ht(A.value), 1),
            k("button", {
              onClick: w[3] || (w[3] = (U) => $.value = !1),
              class: "btn btn-close"
            }, [...w[23] || (w[23] = [
              k("i", { class: "icon fa fa-times" }, null, -1)
            ])])
          ]),
          k("div", hp, [
            k("div", mp, [
              w[24] || (w[24] = k("label", { for: "name" }, "Cohort Name *", -1)),
              Jt(k("input", {
                id: "name",
                "onUpdate:modelValue": w[4] || (w[4] = (U) => W.name = U),
                type: "text",
                class: "form-control",
                placeholder: "Enter cohort name"
              }, null, 512), [
                [tn, W.name]
              ])
            ]),
            k("div", gp, [
              w[25] || (w[25] = k("label", { for: "idnumber" }, "ID Number *", -1)),
              Jt(k("input", {
                id: "idnumber",
                "onUpdate:modelValue": w[5] || (w[5] = (U) => W.idnumber = U),
                type: "text",
                class: "form-control",
                placeholder: "Enter ID number"
              }, null, 512), [
                [tn, W.idnumber]
              ])
            ]),
            k("div", _p, [
              w[26] || (w[26] = k("label", { for: "description" }, "Description", -1)),
              Jt(k("textarea", {
                id: "description",
                "onUpdate:modelValue": w[6] || (w[6] = (U) => W.description = U),
                class: "form-control",
                rows: "3",
                placeholder: "Enter cohort description"
              }, null, 512), [
                [tn, W.description]
              ])
            ]),
            k("div", vp, [
              k("label", null, [
                Jt(k("input", {
                  "onUpdate:modelValue": w[7] || (w[7] = (U) => W.visible = U),
                  type: "checkbox",
                  class: "form-checkbox"
                }, null, 512), [
                  [pl, W.visible]
                ]),
                w[27] || (w[27] = ro(" Visible ", -1))
              ])
            ]),
            k("div", Ep, [
              w[29] || (w[29] = k("label", { for: "theme" }, "Theme", -1)),
              Jt(k("select", {
                id: "theme",
                "onUpdate:modelValue": w[8] || (w[8] = (U) => W.theme = U),
                class: "form-control"
              }, [...w[28] || (w[28] = [
                k("option", { value: "" }, "Default Theme", -1),
                k("option", { value: "boost" }, "Boost", -1),
                k("option", { value: "boost-clean" }, "Boost Clean", -1)
              ])], 512), [
                [hl, W.theme]
              ])
            ])
          ]),
          k("div", yp, [
            k("button", {
              onClick: w[9] || (w[9] = (U) => $.value = !1),
              class: "btn btn-secondary"
            }, " Cancel "),
            k("button", {
              onClick: I,
              class: "btn btn-primary"
            }, " Save ")
          ])
        ])
      ])) : Wo("", !0)
    ]));
  }
}), Np = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Il = /* @__PURE__ */ Np(bp, [["__scopeId", "data-v-6a92ec45"]]), Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Il
}, Symbol.toStringTag, { value: "Module" })), wp = () => Promise.resolve().then(() => Op), xp = () => import("./CohortDetail-C3OCaToD.mjs"), Dp = () => import("./CohortEdit-BLCPzT05.mjs"), Sp = () => import("./CohortCreate-CJxcFIus.mjs"), Vp = [
  {
    path: "/",
    name: "CohortList",
    component: wp,
    meta: {
      title: "Cohort Manager"
    }
  },
  {
    path: "/cohort/:id",
    name: "CohortDetail",
    component: xp,
    meta: {
      title: "Cohort Details"
    },
    props: !0
  },
  {
    path: "/cohort/:id/edit",
    name: "CohortEdit",
    component: Dp,
    meta: {
      title: "Edit Cohort"
    },
    props: !0
  },
  {
    path: "/cohort/create",
    name: "CohortCreate",
    component: Sp,
    meta: {
      title: "Create Cohort"
    }
  }
], kl = Vd({
  history: jf(),
  routes: Vp
});
kl.beforeEach((e, t, n) => {
  document.title = e.meta.title ? `${e.meta.title} - Cohort Manager` : "Cohort Manager", n();
});
const Cp = async (e) => {
  const t = qu(Il);
  return t.use(kl), t.mount(e), t;
}, Ip = { init: Cp };
export {
  Le as F,
  Np as _,
  k as a,
  ro as b,
  dt as c,
  Ar as d,
  Wo as e,
  da as f,
  $p as g,
  Ap as h,
  Ud as i,
  et as j,
  pl as k,
  hl as l,
  Ri as m,
  xo as n,
  js as o,
  Rp as p,
  Hd as q,
  jt as r,
  Fu as s,
  ht as t,
  Pd as u,
  tn as v,
  Jt as w,
  Ld as x,
  Ip as y
};
//# sourceMappingURL=main-CYti1L7s.mjs.map
