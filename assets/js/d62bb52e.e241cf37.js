"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[78929],{95831:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>l});var o=t(74848),s=t(28453);const i={},a="New Staging Process for anaconda.org Uploads",r={permalink:"/news/2020/05/09/new-staging-process-for-anacondaorg-uploads",source:"@site/news/2020-05-09-new-staging-process-for-anacondaorg-uploads.md",title:"New Staging Process for anaconda.org Uploads",description:"Starting this week, we are changing the way we upload packages to anaconda.org. We will move from",date:"2020-05-09T00:00:00.000Z",tags:[],hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"New Process for Marking Packages as Broken",permalink:"/news/2020/05/28/new-process-for-marking-packages-as-broken"},nextItem:{title:"vs2015 to vs2017 Transition",permalink:"/news/2020/03/24/vs2015-to-vs2017-transition"}},c={authorsImageUrls:[]},l=[];function d(e){const n={code:"code",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["Starting this week, we are changing the way we upload packages to ",(0,o.jsx)(n.code,{children:"anaconda.org"}),". We will move from\ndirect uploads to the conda-forge ",(0,o.jsx)(n.code,{children:"main"})," channel to using a staging organization/channel combined\nwith a copy request from the staging channel to the production channel. This new process will allow\nus to perform some validation on the outputs of feedstocks before they are released."]}),"\n",(0,o.jsx)(n.p,{children:"What will you see as a feedstock maintainer?"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Starting this week, the ",(0,o.jsx)(n.code,{children:"admin-migrations"})," service will be making commits to all feedstocks to\nprovision them with the necessary configuration, API keys, and tokens."]}),"\n",(0,o.jsx)(n.li,{children:"Each feedstock will now be provisioned with a secret token. This token should not be shared or\ntaken out of the CI services. It is used to identify the feedstock during the upload process."}),"\n",(0,o.jsxs)(n.li,{children:["The ",(0,o.jsx)(n.code,{children:"admin-migrations"})," service will be setting a new top-level key in the ",(0,o.jsx)(n.code,{children:"conda-forge.yml"}),",\n",(0,o.jsx)(n.code,{children:"conda_forge_output_validation: true"}),". This key indicates to ",(0,o.jsx)(n.code,{children:"conda-smithy"})," that it should\ninclude the output validation calls in the feedstock CI scripts."]}),"\n",(0,o.jsx)(n.li,{children:"Currently open PRs will need to have this key added by hand and then rerendered."}),"\n",(0,o.jsxs)(n.li,{children:["When PRs are running the CI scripts, they will do some initial validation of the feedstock\noutputs. If this validation fails, the CI job will fail. Please see the CI logs for the error\nmessage which is printed after ",(0,o.jsx)(n.code,{children:"conda-build"})," runs."]}),"\n",(0,o.jsx)(n.li,{children:"Once a PR is merged to master, the copy from the staging channel to the production channel will\nhappen automatically."}),"\n",(0,o.jsx)(n.li,{children:"Should a copy request fail, you will get a notification via a comment on the commit to master."}),"\n",(0,o.jsxs)(n.li,{children:["As part of this process, uploads from ",(0,o.jsx)(n.code,{children:"appveyor"})," will no longer be allowed unless there is a\nsignificant barrier to using ",(0,o.jsx)(n.code,{children:"azure"}),". We have recently upgraded the compiler infrastructure on\n",(0,o.jsx)(n.code,{children:"azure"})," to support this change in policy."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Despite our extensive testing, we do not expect this change to be completely smooth, so please bear\nwith us. As always, if you have any questions, concerns, or trouble, you can find us on Gitter or\nbump us directly on Github!"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var o=t(96540);const s={},i=o.createContext(s);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);