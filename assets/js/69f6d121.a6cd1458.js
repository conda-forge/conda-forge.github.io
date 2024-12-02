"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[12474],{38526:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"minutes/2017-01-06","title":"2017-01-06","description":"Time00 (UTC)","source":"@site/community/minutes/2017-01-06.md","sourceDirName":"minutes","slug":"/minutes/2017-01-06","permalink":"/community/minutes/2017-01-06","draft":false,"unlisted":false,"editUrl":"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2017-01-06.md","tags":[],"version":"current","lastUpdatedAt":1733141367000,"frontMatter":{"title":"2017-01-06"},"sidebar":"community","previous":{"title":"2017-04-26","permalink":"/community/minutes/2017-04-26"},"next":{"title":"2016-11-24","permalink":"/community/minutes/2016-11-24"}}');var t=i(74848),l=i(28453);const o={title:"2017-01-06"},r="2017-01-06: General Discussion",c={},d=[];function a(n){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"2017-01-06-general-discussion",children:"2017-01-06: General Discussion"})}),"\n",(0,t.jsx)(e.p,{children:"Time: 20:00 (UTC)"}),"\n",(0,t.jsxs)(e.p,{children:["Hangout link: ",(0,t.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"}),(0,t.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie",children:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"})]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Attendees"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/wv6uvIZX6h0",children:"John Kirkham"})}),"\n",(0,t.jsx)(e.li,{children:"Ray Donnelly"}),"\n",(0,t.jsx)(e.li,{children:"Filipe Fernandes"}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/yHQTJXZ4gyS",children:"Michael Sarahan"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/Gxz5eDxqYrB",children:"Peter Williams"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/yJqDqpPqJyz",children:"Eric Dill"})}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Standing Items"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"How many repos? ~1400"}),"\n",(0,t.jsx)(e.li,{children:"How many contributors? ~300"}),"\n",(0,t.jsx)(e.li,{children:"CFEP status"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Notes"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Options for packaging X.org libraries."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"*   Bundle them together [PR#2068](https://github.com/conda-forge/staged-recipes/pull/2068).\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Use build customization to do one build and split out multiple packages."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Drop numpy 1.10 but leave Python 3.4 for a while longer."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"John will build Qt 4 on OS X."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Ray will build Qt 5 with jpeg 9* soon on defaults and our problem will go away."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"conda-build 2"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"*   do not wait for the remaining packages that needs long prefix\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["merge ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-build-setup-feedstock/issues/40",children:"conda forge/conda forge build setup feedstock#40"})]}),"\n",(0,t.jsx)(e.li,{children:"investigate why pestc is not uploading"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Move MACOSX_DEPLOYMENT_TARGET variable to conda-build-setup and modify the CFEP to reflect that."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"Agenda"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["pkgw would like to discuss bundling X.org client libraries in the conda-forge stack, as per ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/staged-recipes/pull/2068",children:"PR#2068"}),". The PR has everything bundled into a giant tarball for simplicity; gqmelo posted ",(0,t.jsx)(e.a,{href:"https://github.com/ESSS/xorg-recipes",children:"a set of recipes"})," that splits each library out."]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Defaults  channel libpng and jpeg updates: scheduled for 1Q 2017.  Continuum  requests closer collaboration on future api/abi incompatible updates to  core libraries."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"One pinning scheme for both defaults and conda-forge?"}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"That would be ideal.  Hopefully we can head that way."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Drop  Python 3.4. Now that conda-forge have Qt 4+jpeg9* on Windows the Python  3.5+Windows users can migrate from Python 3.4 to 3.5."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["Do MinGW compile things that play well with Python 3.5/MSVC 2015 yet? AFAICT this is still an ",(0,t.jsx)(e.a,{href:"http://bugs.python.org/issue4709",children:"issue"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Drop numpy 110"}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Upload of Qt 4 for OS X"}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["Have a VM I'm willing to use to do this. Details ",(0,t.jsx)(e.a,{href:"https://github.com/boxcutter/macos",children:"here"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"Build and upload of Qt 5+jpeg 9* for all platforms"}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"PyCon  2017. Just submitted a place holder talk as we lost the tutorial  deadline and the talk deadline is today. Anyone interested in  participating please get in touch."}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["Re-rendering channel improvements. ( ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/conda-smithy/pull/401",children:"conda forge/conda smithy#401"})," )"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["conda-build 2 ( ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-build-setup-feedstock/issues/40",children:"conda forge/conda forge build setup feedstock#40"})," )"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["Travis CI image change. ( ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/6",children:"conda forge/conda forge enhancement proposals#6"})," )"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsxs)(e.p,{children:["conda-smithy and conda 4.2 ( ",(0,t.jsx)(e.a,{href:"https://github.com/conda-forge/conda-smithy/pull/394",children:"conda forge/conda smithy#394"})," )"]}),"\n"]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>o,x:()=>r});var s=i(96540);const t={},l=s.createContext(t);function o(n){const e=s.useContext(l);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);