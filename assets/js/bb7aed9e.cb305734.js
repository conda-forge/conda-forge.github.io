"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[8778],{60696:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>l,frontMatter:()=>s,metadata:()=>r,toc:()=>i});var o=n(74848),a=n(28453);const s={},d="Changes to the Feedstock Output Validation Procedure",r={permalink:"/news/2024/09/08/output-validation-changes",source:"@site/news/2024-09-08-output-validation-changes.md",title:"Changes to the Feedstock Output Validation Procedure",description:"We have changed our feedstock output validation procedure. Instead of automatically",date:"2024-09-08T00:00:00.000Z",tags:[],hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,nextItem:{title:"Removing build in favor of python-build",permalink:"/news/2024/08/21/remove-build"}},c={authorsImageUrls:[]},i=[];function u(e){const t={a:"a",code:"code",p:"p",...(0,a.R)(),...e.components};return(0,o.jsxs)(t.p,{children:["We have changed our feedstock output validation procedure. Instead of automatically\nadding new packages to existing feedstocks (e.g., when a new output is added), we will now\nrequire that maintainers submit a PR to add the new output via our\n",(0,o.jsx)(t.a,{href:"https://github.com/conda-forge/admin-requests?tab=readme-ov-file#add-a-package-output-to-a-feedstock",children:"admin-requests repository"}),".\nNew feedstocks created via ",(0,o.jsx)(t.code,{children:"staged-recipes"})," will have their outputs added automatically. If you maintain a feedstock\nthat regularly adds new outputs (e.g., ",(0,o.jsx)(t.code,{children:"llvmdev"})," has ",(0,o.jsx)(t.code,{children:"libllvm18"}),", ",(0,o.jsx)(t.code,{children:"libllvm19"}),", etc.), you can use the ",(0,o.jsx)(t.code,{children:"admin-requsts"})," repo\nto add a glob pattern that matches the pattern of your new outputs. We test these patterns aginst new outputs from the feedstock\nusing the Python ",(0,o.jsx)(t.code,{children:"fnmatch"})," module. Outputs from the feedstock that match a glob pattern will added automatically. Further\ndetails on package output validation can be found in our ",(0,o.jsx)(t.a,{href:"https://conda-forge.org/docs/maintainer/infrastructure/#output-validation-and-feedstock-tokens",children:"documentation"}),"."]})}function l(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>r});var o=n(96540);const a={},s=o.createContext(a);function d(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:d(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);