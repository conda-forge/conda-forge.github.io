"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3411],{28542:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var o=t(74848),i=t(28453);const r={authors:["core"],tags:["security"]},s="Security updates to our installers",a={permalink:"/blog/2023/07/13/installer-security-fixes",editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/blog/2023-07-13-installer-security-fixes.md",source:"@site/blog/2023-07-13-installer-security-fixes.md",title:"Security updates to our installers",description:"In June 2023, software engineers from",date:"2023-07-13T00:00:00.000Z",tags:[{inline:!0,label:"security",permalink:"/blog/tags/security"}],readingTime:1.18,hasTruncateMarker:!0,authors:[{name:"conda-forge/core",title:"The conda-forge core team",url:"https://github.com/orgs/conda-forge/teams/core",imageURL:"https://github.com/conda-forge.png",key:"core",page:null}],frontMatter:{authors:["core"],tags:["security"]},unlisted:!1,prevItem:{title:"About the xz backdoor",permalink:"/blog/2024/04/02/xz-backdoor"},nextItem:{title:"CircleCI Security Incident",permalink:"/blog/2023/03/12/circle-ci-security-breach"}},c={authorsImageUrls:[void 0]},l=[];function d(e){const n={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["In June 2023, software engineers from\n",(0,o.jsx)(n.a,{href:"https://www.anaconda.com",children:"Anaconda"})," have reported a security issue in\nthe uninstallers that are included in the Windows versions of the\n",(0,o.jsx)(n.a,{href:"https://github.com/conda-forge/miniforge",children:"miniforge and mambaforge\ninstallers"}),", one of the main\nways to bootstrap conda-forge based conda and mamba distributions."]}),"\n",(0,o.jsxs)(n.p,{children:["The issue could, under specific conditions, unintentionally delete files\nfrom your system during the uninstallation process. Anaconda has\npublished more details in the related\n",(0,o.jsx)(n.a,{href:"https://www.anaconda.com/blog/windows-installer-security-fix",children:"blogpost"}),"\nabout the security fix for the miniconda and Anaconda Distribution\nWindows installers as well."]}),"\n",(0,o.jsx)(n.p,{children:"conda-forge is committed to fix the miniforge and mambaforge installers\nequally to reduce the possible impact on conda-forge users and has\nworked with Anaconda to mitigate the issue."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["As such, we are strongly recommending all users of miniforge and\nmambaforge to ",(0,o.jsx)(n.strong,{children:"update immediately"})," to the latest versions of\nminiforge and mambaforge. Please download them from the ",(0,o.jsx)(n.a,{href:"https://github.com/conda-forge/miniforge",children:"miniforge\nrepository's main page"}),"\nor the ",(0,o.jsx)(n.a,{href:"https://github.com/conda-forge/miniforge/releases/tag/23.1.0-4",children:"release specific\npage"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["For older versions, we are providing a ",(0,o.jsx)(n.strong,{children:"security patch for already\ninstalled miniforge and mambaforge installations"}),". You can download\nthese from ",(0,o.jsx)(n.a,{href:"https://github.com/conda-forge/miniforge/releases/tag/23.1.0-4",children:"release specific\npage"}),"\nas well, under the names\n",(0,o.jsx)(n.code,{children:"Miniforge3-uninstaller-patch-Windows-x86_64.exe"})," and\n",(0,o.jsx)(n.code,{children:"Mambaforge-uninstaller-patch-Windows-x86_64.exe"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"To uninstall older versions of miniforge and mambaforge released before\nJuly 1, 2023, please download the security patch fix prior to\nuninstallation."})}),"\n",(0,o.jsx)(n.p,{children:"In order for this flaw to be triggered, a specific combination of\nfactors must align, including uninstallation permissions, system access,\nusage of Windows, and an existing installation of miniforge or\nmambaforge."})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(96540);const i={},r=o.createContext(i);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);