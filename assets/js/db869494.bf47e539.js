"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[88807],{43122:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=t(74848),s=t(28453);const i={},a="Sunsetting Mambaforge",o={permalink:"/news/2024/07/29/sunsetting-mambaforge",source:"@site/news/2024-07-29-sunsetting-mambaforge.md",title:"Sunsetting Mambaforge",description:"With the Miniforge 23.3.1 release,",date:"2024-07-29T00:00:00.000Z",tags:[],hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"Sunsetting PyPy support",permalink:"/news/2024/08/14/sunsetting-pypy"},nextItem:{title:"NumPy 2 Migration",permalink:"/news/2024/05/15/numpy-2-migration"}},l={authorsImageUrls:[]},c=[];function u(e){const n={a:"a",em:"em",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["With the ",(0,r.jsx)(n.a,{href:"https://github.com/conda-forge/miniforge/releases/tag/23.3.1-0",children:"Miniforge 23.3.1 release"}),",\nthe Miniforge and Mambaforge installers became essentially ",(0,r.jsx)(n.strong,{children:"identical"}),". The only difference\nbetween the two was their name and, subsequently, the default installation directory."]}),"\n",(0,r.jsxs)(n.p,{children:["Maintaining both installers adds unnecessary burden to our support infrastructure and creates\nconfusion among end users. As a result, last year we decided to ",(0,r.jsx)(n.em,{children:"discourage"})," the usage of\nMambaforge in favor of Miniforge."]}),"\n",(0,r.jsx)(n.p,{children:"A year later, we would like to formally sunset Mambaforge. All users are encouraged to switch to\nMiniforge. Remember they contain the same packages, so the only difference is the default\ninstallation directory."}),"\n",(0,r.jsx)(n.p,{children:"The deprecation process will roughly follow this calendar:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"August 2024: The Mambaforge installers will warn about the deprecation and make the user wait 30\nseconds before continuing."}),"\n",(0,r.jsxs)(n.li,{children:["October 2024: The Mambaforge installers will refuse to install during several pre-specified date ranges (i.e., ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Brownout_(software_engineering)",children:'"brownouts"'}),") in order to encourage users to switch to Miniforge. These dates are\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Every two weeks in October 2024 (2024-10-01, 2024-10-15)"}),"\n",(0,r.jsx)(n.li,{children:"Every ten days in November 2024 (2024-11-01, 2024-11-10, 2024-11-20, 2024-11-30)"}),"\n",(0,r.jsx)(n.li,{children:"Every five days in December 2024 (2024-12-05, 2024-12-10, 2024-12-15, 2024-12-20, 2024-12-25, 2024-12-30, 2024-12-31)"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"January 2025: The Mambaforge installers will stop being built and distributed."}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var r=t(96540);const s={},i=r.createContext(s);function a(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);