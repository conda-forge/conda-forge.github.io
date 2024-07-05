"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[2189],{3675:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=i(85893),o=i(11151);const r={title:"2016-10-07"},t="2016-10-07: General Discussion",c={id:"minutes/2016-10-07",title:"2016-10-07",description:"Time00 UTC",source:"@site/community/minutes/2016-10-07.md",sourceDirName:"minutes",slug:"/minutes/2016-10-07",permalink:"/community/minutes/2016-10-07",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2016-10-07.md",tags:[],version:"current",lastUpdatedAt:172016683e4,frontMatter:{title:"2016-10-07"},sidebar:"community",previous:{title:"2016-11-17",permalink:"/community/minutes/2016-11-17"},next:{title:"2016-09-23",permalink:"/community/minutes/2016-09-23"}},l={},d=[];function a(n){const e={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"2016-10-07-general-discussion",children:"2016-10-07: General Discussion"}),"\n",(0,s.jsx)(e.p,{children:"Time: 14:00 UTC"}),"\n",(0,s.jsxs)(e.p,{children:["Hangout link: ",(0,s.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"}),(0,s.jsx)(e.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie",children:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"})]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Attendees"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Jonathan Helmus, Eric Dill, ",(0,s.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/yHQTJXZ4gyS",children:"Michael Sarahan"}),", Phil Elson, ",(0,s.jsx)(e.a,{href:"https://twitter.com/ocefpaf",children:"Filipe Fernandes"}),"**, **",(0,s.jsx)(e.a,{href:"https://conda-forge.hackpad.com/ep/profile/wv6uvIZX6h0",children:"John Kirkham"}),", Ray Donnelly"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Standing Items"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"How many repos? ~1250"}),"\n",(0,s.jsx)(e.li,{children:"How many contributors? ~240"}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Notes"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"conda build 2.0"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"*   cmake seems to be having issue\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Patch? the packages which need to be rebuilt with conda build 2.0 before switching all feedstocks to 2.0"}),"\n",(0,s.jsx)(e.li,{children:"conda-build-setup should have whitelist to do something else?"}),"\n",(0,s.jsx)(e.li,{children:"Only need to rebuild packages with short prefixes, shouldn't need to do anything special"}),"\n",(0,s.jsxs)(e.li,{children:["Packages that need to be rebuilt ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/171",children:"conda forge/conda forge.github.io#171"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"conda & conda-env (conda-build?)"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"*   conda-env is rolled into conda in recent versions, conda-env package now a placeholder\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Need to pin older version of conda with conda-env<2.6 and newer version with conda-env > 2.6"}),"\n",(0,s.jsx)(e.li,{children:"Get rid of conda-env recipe?"}),"\n",(0,s.jsx)(e.li,{children:"Currently not building conda-build, need conda-build 2.0 to build"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Travis CI VM changes"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"*   Changed default OS X image to 10.11 with XCode 7.3\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Fixed in conda-smithy by specifying what image to use"}),"\n",(0,s.jsx)(e.li,{children:"Travis will drop image at end of the month... we need a solution"}),"\n",(0,s.jsx)(e.li,{children:"Should look at new image and see if it meets our needs."}),"\n",(0,s.jsx)(e.li,{children:"May need to set environment variable to continue to target 10.9, but may need to install own SDK"}),"\n",(0,s.jsx)(e.li,{children:"What versions of OS X are being used and what should we support? 10.9 good choice for minimum?"}),"\n",(0,s.jsx)(e.li,{children:"Enhancement proposal to outline how we manage changes to what we support (3.4, numpy 1.10, etc)"}),"\n",(0,s.jsx)(e.li,{children:"jpeg8 to jpeg9"}),"\n",(0,s.jsx)(e.li,{children:"Discuss on GitHub issue until 21st then decide."}),"\n",(0,s.jsx)(e.li,{children:"Ray will try to get Anaconda.org usage stats."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Updates from Michael on GitLab based CI"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Agenda"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Moving to conda build 2.0"}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"The conda & conda-env (conda-build?) recipes"}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Travis CI VM changes - ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/249",children:"conda forge/conda forge.github.io#249"})]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Binary data in recipes"}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"conda-forge installer (our own Miniconda)"}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.a,{href:"https://conda-forge.hackpad.com/DZNKZdgiMbF",children:"Staged Releases"})}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Smoothly handling CI registration failures during conversion - ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/staged-recipes/pull/1466",children:"conda forge/staged recipes#1466"})]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Handling broken packages"}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Mention ",(0,s.jsx)(e.a,{href:"https://conda-forge.hackpad.com/N5evEX7bZAf",children:"conda forge upload service"})," idea"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Build infrastructure status - ",(0,s.jsx)(e.a,{href:"https://github.com/conda/build_infrastructure/issues/1",children:"conda/build_infrastructure#1"})]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Team update web service - ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-webservices/issues/63",children:"conda forge/conda forge webservices#63"})]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Windows BLAS Solutions"}),"\n"]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},11151:(n,e,i)=>{i.d(e,{Z:()=>c,a:()=>t});var s=i(67294);const o={},r=s.createContext(o);function t(n){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:t(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);