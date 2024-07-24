"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[1769],{41903:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>t,contentTitle:()=>c,default:()=>a,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=s(85893),o=s(11151);const r={title:"2016-09-23"},c="2016-09-23 (postponed from 16th): General Discussion",l={id:"minutes/2016-09-23",title:"2016-09-23",description:"Time00 UTC (Doodle poll for time preferences//doodle.com/poll/qeubq3sn6rk66hz5)",source:"@site/community/minutes/2016-09-23.md",sourceDirName:"minutes",slug:"/minutes/2016-09-23",permalink:"/community/minutes/2016-09-23",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2016-09-23.md",tags:[],version:"current",lastUpdatedAt:1721834395e3,frontMatter:{title:"2016-09-23"},sidebar:"community",previous:{title:"2016-10-07",permalink:"/community/minutes/2016-10-07"},next:{title:"2016-09-09",permalink:"/community/minutes/2016-09-09"}},t={},d=[];function h(n){const e={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",s:"s",strong:"strong",ul:"ul",...(0,o.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"2016-09-23-postponed-from-16th-general-discussion",children:"2016-09-23 (postponed from 16th): General Discussion"}),"\n",(0,i.jsxs)(e.p,{children:["Time: 14:00 UTC (",(0,i.jsx)(e.s,{children:"Doodle poll for time preferences: "}),(0,i.jsx)(e.a,{href:"http://doodle.com/poll/qeubq3sn6rk66hz5"}),")",(0,i.jsxs)(e.s,{children:[(0,i.jsx)(e.a,{href:"http://doodle.com/poll/qeubq3sn6rk66hz5",children:"http://doodle.com/poll/qeubq3sn6rk66hz5"}),")"]})]}),"\n",(0,i.jsxs)(e.p,{children:["Hangout link: ",(0,i.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"}),(0,i.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie",children:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"})]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"Attendees"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Jonathan, Phil, John, Filipe,  Eric, Sylvain"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.strong,{children:"Apologies"})}),"\n",(0,i.jsx)(e.li,{children:"Michael (re 16th): wife's water broke. Probably not going to make this one."}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"Standing Items"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"How many repos? ~1200"}),"\n",(0,i.jsx)(e.li,{children:"How many contributors? ~230"}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"Notes"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Recipe license to include in feedstock?"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Where to include?  In recipe? Should not be license for the package but rather for the **recipe.**\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Not many"}),"\n",(0,i.jsx)(e.li,{children:"Deal with on-case-by case basis as extra commit on feedstock."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Moving to conda build 2.0 requires rebuilding ~35 packages."}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Rebuilding should be done before moving all feedstocks to new version\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Not backwards incompatible.  Mixing short and long prefix will results in short prefixes."}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Filipe has done this with his own build system, maybe some issues on Windows."}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["This is the issue our Windows tech is seeing ",(0,i.jsx)(e.a,{href:"https://github.com/conda/conda-build/pull/1383",children:"conda/conda build#1383"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Conclusion: start rebuilding packages that use short binary prefix, then flip switch on all recipes."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Phil will be in Oz for next 6 months (Melbourne: UTC +10)"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Next meeting schedule with doodle"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Sylvain -- mixing VC runtimes"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Recommend that these be placed in a different channel\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Python 2.7 with VC 14/2015 should be considered a new version."}),"\n",(0,i.jsx)(e.li,{children:"Proposal is to build extensions with VC 14 not Python itself"}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/feather-format-feedstock/pull/7",children:"conda forge/feather format feedstock#7"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/feather-format-feedstock/pull/6",children:"conda forge/feather format feedstock#6"})}),"\n",(0,i.jsx)(e.li,{children:"CFEP -- with types of errors we can see"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"conda-smithy release -- Maybe Monday?"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Do not know why rerendering is happening slowly"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Rerendering happens on Heroku, max 5 PR but can up limit\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"CFEP -- if you have not looked at them CFEP 01 do so soon:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   [conda forge/conda forge enhancement proposals#1](https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/1)\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Can CFEPs change after the fact"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"What is consensus?  BDFL, vote, vetos (like NumPy?), other?"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"    *   majority of  core member -- at meetings\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Formal Government document, which includes how consensus is reached. -- or should this be seperate"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Start repo with"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Have a look at"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   [conda forge/conda forge enhancement proposals#3](https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3)\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Labels for Python 3.6 -- Jonathan will add comment"}),"\n",(0,i.jsx)(e.li,{children:"Offer ability to build against Python 3.6?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"Agenda"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Recipe licenses, see ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-smithy/pull/230",children:"conda forge/conda smithy#230"})," and ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-smithy/issues/229",children:"conda forge/conda smithy#229"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Moving to conda build 2.0"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Meeting time roadblock Oct-May ;)"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Next meeting: 2016-09-30 @ 14:00 UTC"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"CUDA/cuDNN update -- delay until Michael is back"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Dev releases: Where do they happen? ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3",children:"conda forge/conda forge enhancement proposals#3"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["CFEPs - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/1",children:"conda forge/conda forge enhancement proposals#1"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Binary data in recipes"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"conda-forge installer (our own Miniconda)"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Name? - [conda forge/conda forge anvil#1](https://github.com/conda-forge/conda-forge-anvil/issues/1)\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["Included channels? - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-anvil/issues/5",children:"conda forge/conda forge anvil#5"})]}),"\n",(0,i.jsxs)(e.li,{children:["Included packages? - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-anvil/issues/8",children:"conda forge/conda forge anvil#8"})]}),"\n",(0,i.jsxs)(e.li,{children:["Versioning? - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-anvil/issues/9",children:"conda forge/conda forge anvil#9"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"https://conda-forge.hackpad.com/DZNKZdgiMbF",children:"Staged Releases"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Smoothly handling CI registration failures during conversion - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/staged-recipes/pull/1466",children:"conda forge/staged recipes#1466"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Handling broken packages"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"*   Whether to delete or not\n\n        *   Relabeling instead - [conda forge/conda forge.github.io#181](https://github.com/conda-forge/conda-forge.github.io/issues/181)\n*   Deletion controversy - [conda forge/conda forge.github.io#220](https://github.com/conda-forge/conda-forge.github.io/issues/220)\n*   Retention Policy CFEP? - [conda forge/conda forge.github.io#220](https://github.com/conda-forge/conda-forge.github.io/issues/220)#issuecomment-245478336\n\n*   Hot fixing - [conda forge/conda forge.github.io#170](https://github.com/conda-forge/conda-forge.github.io/pull/170)\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Mention ",(0,i.jsx)(e.a,{href:"https://conda-forge.hackpad.com/N5evEX7bZAf",children:"conda forge upload service"})," idea"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Build infrastructure status - ",(0,i.jsx)(e.a,{href:"https://github.com/conda/build_infrastructure/issues/1",children:"conda/build_infrastructure#1"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Team update web service - ",(0,i.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-webservices/issues/63",children:"conda forge/conda forge webservices#63"})]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Windows BLAS Solutions"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Modern C++ , MSVC and Python < 3.5"}),"\n"]}),"\n"]})]})}function a(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},11151:(n,e,s)=>{s.d(e,{Z:()=>l,a:()=>c});var i=s(67294);const o={},r=i.createContext(o);function c(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:c(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);