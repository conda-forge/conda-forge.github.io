"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[24997],{58873:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var o=t(33267),r=t(74848),a=t(28453);const s={},i="Appveyor Deprecation",c={authorsImageUrls:[]},p=[];function l(e){const n={code:"code",p:"p",...(0,a.R)(),...e.components};return(0,r.jsxs)(n.p,{children:["We are now starting to formally deprecate Appveyor in favor of Azure for\nbuilds on the ",(0,r.jsx)(n.code,{children:"win"})," platform. Note that we have not been adding appveyor\nto new feedstocks for a while, so this is not a completely new change in\npolicy. We will now, however, begin to actively disable Appveyor builds\non feedstocks not using it by turning off builds for GitHub ",(0,r.jsx)(n.code,{children:"push"}),"\nevents. Additionally, we have been issuing PRs to any remaining\nfeedstocks to move them to Azure. We are aware that some packages built\nwith ",(0,r.jsx)(n.code,{children:"msbuild"})," cannot yet be moved to Azure and so are leaving Appveyor\non for those feedstocks for now."]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var o=t(96540);const r={},a=o.createContext(r);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:n},e.children)}},33267:e=>{e.exports=JSON.parse('{"permalink":"/news/2020/03/23/appveyor-deprecation","source":"@site/news/2020-03-23-appveyor-deprecation.md","title":"Appveyor Deprecation","description":"We are now starting to formally deprecate Appveyor in favor of Azure for","date":"2020-03-23T00:00:00.000Z","tags":[],"hasTruncateMarker":false,"authors":[],"frontMatter":{},"unlisted":false,"prevItem":{"title":"vs2015 to vs2017 Transition","permalink":"/news/2020/03/24/vs2015-to-vs2017-transition"},"nextItem":{"title":"Python 2.7 Admin Command Available","permalink":"/news/2020/03/21/python-27-admin-command-available"}}')}}]);