"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[107],{84023:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>u});var r=n(74848),o=n(28453);const s={authors:["beckermr"],tags:["security"]},i="Travis CI Security Incident",a={permalink:"/blog/2021/09/24/travis-security",editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/blog/2021-09-24-travis-security.md",source:"@site/blog/2021-09-24-travis-security.md",title:"Travis CI Security Incident",description:"On September 9, 2021 one of our core devs discovered that artifacts",date:"2021-09-24T00:00:00.000Z",tags:[{inline:!0,label:"security",permalink:"/blog/tags/security"}],readingTime:1.82,hasTruncateMarker:!0,authors:[{name:"Matthew R. Becker",title:"Member of conda-forge/core",url:"https://github.com/beckermr",imageURL:"https://github.com/beckermr.png",key:"beckermr",page:null}],frontMatter:{authors:["beckermr"],tags:["security"]},unlisted:!1,prevItem:{title:"GPU enabled TensorFlow builds on conda-forge",permalink:"/blog/2021/11/03/tensorflow-gpu"},nextItem:{title:"Contributing Packages To conda-forge Using Grayskull",permalink:"/blog/2021/06/16/graykull-step-by-step"}},c={authorsImageUrls:[void 0]},u=[];function l(e){const t={a:"a",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(t.p,{children:["On September 9, 2021 one of our core devs discovered that artifacts\nbuilding on Travis CI were being uploaded to our conda channel from PRs\nrunning on forked repositories. A quick investigation revealed that\nTravis CI was passing encrypted secrets to PR builds on forks. Further\nexamination of our logs and artifacts indicated that this had been\nhappening since about September 3, 2021. This security bug was\nsubsequently confirmed by Travis CI. See this\n",(0,r.jsx)(t.a,{href:"https://nvd.nist.gov/vuln/detail/CVE-2021-41077",children:"CVE"})," for more details\non this incident. ",(0,r.jsx)(t.strong,{children:"As far as we know, there were no actual exploits\nagainst conda-forge which used this vulnerability."})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var r=n(96540);const o={},s=r.createContext(o);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);