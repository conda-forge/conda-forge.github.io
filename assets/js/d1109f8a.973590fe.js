"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[67461],{94912:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>c,metadata:()=>a,toc:()=>l});var a=r(66019),n=r(74848),o=r(28453);const c={authors:["core"],tags:["security"]},s="CircleCI Security Incident",i={authorsImageUrls:[void 0]},l=[];function u(e){const t={a:"a",code:"code",p:"p",...(0,o.R)(),...e.components};return(0,n.jsxs)(t.p,{children:["In early January 2023, CircleCI informed us that they had a large\n",(0,n.jsx)(t.a,{href:"https://circleci.com/blog/jan-4-2023-incident-report/",children:"security breach"}),"\nwhere a third party had gained access to all the environment secrets\nstored in the service. For ",(0,n.jsx)(t.code,{children:"conda-forge"}),", these secrets are the API\ntoken used to upload built packages to our staging area on\n",(0,n.jsx)(t.code,{children:"anaconda.org"})," and the unique token we generate for each feedstock. The\nfeedstock tokens are used as part of our artifact staging process to\nensure that only the maintainers of a given feedstock can upload\npackages built by that feedstock. Later in January, we were informed by\nCircleCI that their security breach started on December 19, 2022, with\nthe bulk of the secrets being exfiltrated in plain text from their\nservers a few days later. A malicious third-party with access to these\nsecrets could potentially upload compromised versions of any package on\n",(0,n.jsx)(t.code,{children:"conda-forge"}),' in a so-called "supply chain" attack.']})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},28453:(e,t,r)=>{r.d(t,{R:()=>c,x:()=>s});var a=r(96540);const n={},o=a.createContext(n);function c(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),a.createElement(o.Provider,{value:t},e.children)}},66019:e=>{e.exports=JSON.parse('{"permalink":"/blog/2023/03/12/circle-ci-security-breach","editUrl":"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/blog/2023-03-12-circle-ci-security-breach.md","source":"@site/blog/2023-03-12-circle-ci-security-breach.md","title":"CircleCI Security Incident","description":"In early January 2023, CircleCI informed us that they had a large","date":"2023-03-12T00:00:00.000Z","tags":[{"inline":true,"label":"security","permalink":"/blog/tags/security"}],"readingTime":4.045,"hasTruncateMarker":true,"authors":[{"name":"conda-forge/core","title":"The conda-forge core team","url":"https://github.com/orgs/conda-forge/teams/core","imageURL":"https://github.com/conda-forge.png","key":"core","page":null}],"frontMatter":{"authors":["core"],"tags":["security"]},"unlisted":false,"prevItem":{"title":"Security updates to our installers","permalink":"/blog/2023/07/13/installer-security-fixes"},"nextItem":{"title":"Outreachy 2022 Wrap-up Blog","permalink":"/blog/2022/08/26/outreachy-wrap-up-blog-2022"}}')}}]);