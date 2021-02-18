(this.webpackJsonpchallenges=this.webpackJsonpchallenges||[]).push([[0],{18:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),l=n(8),o=n.n(l),r=(n(18),n(13)),i=n(12),s=n(5);function u(e){var t=document.getElementById("modal-root"),n=document.createElement("div");return Object(a.useEffect)((function(){return t.appendChild(n),function(){t.removeChild(n)}})),o.a.createPortal(e.children,n)}var d=n(3),h=n(4),g=n(0);function v(e){return Object(g.jsx)("div",{className:"Modal-container",children:Object(g.jsxs)("div",{className:"Modal-content",children:[Object(g.jsx)("div",{className:"Modal-title",children:e.title}),Object(g.jsxs)("button",{className:"Log-button",onClick:function(){return e.handleUpdate()},children:[Object(g.jsx)("div",{children:"Done"}),Object(g.jsx)(d.a,{icon:h.a})]}),Object(g.jsxs)("button",{className:"Delete-button",onClick:function(){return e.handleDelete()},children:[Object(g.jsx)("span",{children:"Delete challenge"}),Object(g.jsx)(d.a,{icon:h.f})]})]})})}function f(e){var t=e.status,n=function(){var n,a=0;if(null!==t.max){n=e.value>t.min?e.value-t.min:e.value;for(var c=t.min;c<=t.max;c++)a+=1;return n/a*100}return 100}();return Object(g.jsxs)("div",{children:[function(){var e=[];if(4!==t.statusArea)for(var n=Object(g.jsx)(d.a,{className:"Icon",icon:h.b,style:t.status}),a=0;a<t.statusArea;a++)e.push(n);else e.push(Object(g.jsx)(d.a,{className:"Icon",icon:h.c,style:t.status}));return e}().map((function(e,t){return Object(g.jsx)("span",{children:e},t)})),Object(g.jsx)("p",{children:"".concat(t.status.name," - ").concat(t.statusArea)}),Object(g.jsx)("div",{className:"Progress-bar",children:Object(g.jsx)("span",{style:function(e){return{position:"absolute",zIndex:10,left:0,backgroundColor:"green",width:"".concat(e,"%"),maxWidth:"100%",height:"10px",borderRadius:0}}(n)})})]})}function j(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),c=n[0],l=n[1],o={name:"Bronze",statusMark:"&#x2160",color:"#cd7f32",margin:"10px"},r={name:"Silver",statusMark:"&#x2160",color:"#C0C0C0",margin:"10px"},i={name:"Gold",statusMark:"&#x21604",color:"#FFDF00",margin:"10px"},d={name:"diamond",statusMark:"&#x2160",color:"#66ccff",margin:"10px"};return Object(g.jsxs)("div",{onClick:function(){return l(!c)},className:"Card",style:e.index%2===0?{backgroundColor:"#ffffff"}:{backgroundColor:"#626262",color:"white"},children:[Object(g.jsxs)("span",{children:["Started ",e.startDate," - ",e.value," days"]}),Object(g.jsx)("h3",{className:"Card-title",children:e.title}),Object(g.jsx)(f,{status:function(){var t,n,a,c;return e.value>=0&&e.value<=40?(t=o,n=1,a=0,c=40):e.value>=40&&e.value<=80?(t=o,n=2,a=40,c=80):e.value>=80&&e.value<=120?(t=o,n=3,a=80,c=120):e.value>=120&&e.value<=160?(t=r,n=1,a=120,c=160):e.value>=160&&e.value<=200?(t=r,n=2,a=160,c=200):e.value>=200&&e.value<=240?(t=r,n=3,a=200,c=240):e.value>=240&&e.value<=280?(t=i,n=1,a=240,c=280):e.value>=280&&e.value<=320?(t=i,n=2,a=280,c=320):e.value>=320&&e.value<=365?(t=i,n=3,a=320,c=365):e.value>365&&(t=d,n=4,a=365,c=null),{status:t,statusArea:n,min:a,max:c}}(),value:e.value}),c?Object(g.jsx)(u,{children:Object(g.jsx)(v,{title:e.title,handleUpdate:function(){!1===e.updated&&e.update()},handleDelete:function(){return function(){var t=JSON.parse(localStorage.getItem("challenges")).filter((function(t){return t.id!==e.id}));localStorage.setItem("challenges",JSON.stringify(t))}()}})}):null]})}n(25);var b=[{quote:"The way to get started is to quit talking and begin doing.",name:"Walt Disney"},{quote:"Just do it.",name:"Nike"},{quote:"The pessimist sees difficulty in every opportunity. The optimist sees the opportunity in every difficulty.",name:"Winston Churchill"}];function m(){var e=Object(a.useState)(null),t=Object(s.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(null),o=Object(s.a)(l,2),u=o[0],v=o[1],f=Object(a.useState)(""),m=Object(s.a)(f,2),p=m[0],O=m[1],x=Object(a.useState)(null),w=Object(s.a)(x,2),S=w[0],N=w[1];return Object(a.useEffect)((function(){!function(){var e=Math.floor(Math.random()*b.length);b.map((function(t,n){n===e&&c(t)}))}();var e=JSON.parse(localStorage.getItem("challenges"));N(e)}),[]),Object(g.jsxs)("div",{className:"App",children:[Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("h1",{className:"Header-title",children:"Challenges"}),null!==n?Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{className:"Quote-title",children:n.quote}),Object(g.jsx)("p",{className:"Quote-name",children:n.name})]}):null]}),null!==S?S.map((function(e,t){return Object(g.jsx)(j,{index:t,id:e.id,title:e.title,startDate:e.startDate,lastLoggedDate:e.lastLoggedDate,value:e.value,updated:e.updated,update:function(){return function(e){var t=new Date,n=("".concat(t.getDate(),".").concat(t.getMonth()+1,".").concat(t.getFullYear()),JSON.parse(localStorage.getItem("challenges")).map((function(n){return n.id===e?Object(r.a)(Object(r.a)({},n),{},{value:n.value+1,lastLoggedDate:t,updated:!0}):n})));localStorage.setItem("challenges",JSON.stringify(n)),N(n)}(e.id)}},t)})):null,Object(g.jsxs)("div",{className:"Add-challenge-container",children:[u?Object(g.jsxs)("div",{className:"Add-challenge",children:[Object(g.jsx)("input",{type:"text",placeholder:"Add challenge",onChange:function(e){return O(e.target.value)}}),Object(g.jsx)("button",{type:"button",className:"Save-button",onClick:function(){return function(){var e=new Date,t="".concat(e.getDate(),".").concat(e.getMonth()+1,".").concat(e.getFullYear());if(""!==p){var n=JSON.parse(localStorage.getItem("challenges"));if(null!==n){var a={id:Date.now(),title:p,startDate:t,lastLoggedDate:e,value:0,updated:!1};localStorage.setItem("challenges",JSON.stringify([].concat(Object(i.a)(n),[a]))),N([].concat(Object(i.a)(n),[a]))}else{var c=[{id:Date.now(),title:p,startDate:t,lastLoggedDate:e,value:0,updated:!1}];localStorage.setItem("challenges",JSON.stringify(c)),N(c)}}v(!1)}()},children:"Save"})]}):null,Object(g.jsx)("button",{"aria-label":"button",className:"Plus-button",onClick:function(){return v(!u)},children:!0===u?Object(g.jsx)(d.a,{icon:h.e}):Object(g.jsx)(d.a,{icon:h.d})})]})]})}var p=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,l=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),l(e),o(e)}))};o.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(m,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Challenges",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/Challenges","/service-worker.js");p?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):O(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):O(t,e)}))}}(),x()}},[[26,1,2]]]);
//# sourceMappingURL=main.88c918ce.chunk.js.map