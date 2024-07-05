"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3355],{26217:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var s=i(85893),t=i(11151);const o={title:"2018-05-29"},r="2018-05-29 conda-forge meeting",l={id:"minutes/2018-05-29",title:"2018-05-29",description:"Pinned Items",source:"@site/community/minutes/2018-05-29.md",sourceDirName:"minutes",slug:"/minutes/2018-05-29",permalink:"/community/minutes/2018-05-29",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2018-05-29.md",tags:[],version:"current",lastUpdatedAt:172016683e4,frontMatter:{title:"2018-05-29"},sidebar:"community",previous:{title:"2018-06-12",permalink:"/community/minutes/2018-06-12"},next:{title:"2018-05-01",permalink:"/community/minutes/2018-05-01"}},a={},c=[];function d(n){const e={a:"a",h1:"h1",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"2018-05-29-conda-forge-meeting",children:"2018-05-29 conda-forge meeting"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Pinned Items"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Zoom instructions: ",(0,s.jsx)(e.a,{href:"https://paper.dropbox.com/doc/How-to-connect-to-zoom-odl94oveHyiRv6UqTtZE5",children:"+How to connect to zoom"})]}),"\n"]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"New items"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Run_exports etc: ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/58",children:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/58"})]}),"\n",(0,s.jsxs)(e.li,{children:["Michael Sarahan to document and give demo on how to transition old recipes to new style\n- ",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/AnacondaRecipesSync",children:"https://github.com/conda-forge/AnacondaRecipesSync"}),"\n- 5/1: Will wait for more people on the dev call before Mike talks about this"]}),"\n",(0,s.jsxs)(e.li,{children:["Build packages on C3I and upload to conda-forge\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Make is missing from the base image for PowerPC internal to Anaconda. Fun times!"}),"\n",(0,s.jsx)(e.li,{children:"Mike is open to other people helping with this.  If interested, reach out!  Helping means trying recipes, debugging any issues, and resolving any merge conflicts that have happened since Mike pulled them in last.  Moving target."}),"\n",(0,s.jsxs)(e.li,{children:["Packages that have been built ",(0,s.jsx)(e.a,{href:"https://anaconda.org/cf-cb3",children:"https://anaconda.org/cf-cb3"})," - these may need more work regarding versions.  The graph was computed with the versions, but probably should have ignored them.  When a pin is older than a newer recipe, the upstream recipe gets missed as a real dependency because of the version mismatch."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Finding a good solution to sharing passwords among core"}),"\n",(0,s.jsxs)(e.li,{children:["switch to cb3\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["what kind of things are going to break when we change compilers?\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"(@Jonathan H had a great response that I hope he\u2019ll clarify here:) tl;dr C++ ABI"}),"\n",(0,s.jsxs)(e.li,{children:["Some details on libstdc++ dual ABI, ",(0,s.jsx)(e.a,{href:"https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_dual_abi.html",children:"https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_dual_abi.html"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Sprint in NYC June 18th through 20th for REST API for conda-forge graph and better inspection of CLI/imports/includes for conda-forge packages."}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Actionable things to check in at the June 12 meeting"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["add something to the bot to add new PRs that manage the cb2 \u2192 cb3\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"e.g., if a compiler is detected, add the right compilers for the right files (Justin, nominally \u2014 @Christopher W @Mike S and @Anthony S will probably be reviewing those PRs)"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"@Mike S is working on a secondary channel to push the rebuilt cb3 packages"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Existing Items"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Making the agenda and notes public again.\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["John will see if we can make dropbox paper readable by the world\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"It\u2019s easy to do this per doc with a link"}),"\n",(0,s.jsxs)(e.li,{children:["This is less clear to accomplish with a folder of docs\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Could add all share links into one Dropbox paper doc that is world readable"}),"\n",(0,s.jsx)(e.li,{children:"Could add all share links in some file in some repo (webpage repo?)"}),"\n",(0,s.jsx)(e.li,{children:"Some other aggregation solution?"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"other options are to just post the notes somewhere public after the meeting"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Governance, CoD, and NumFOCUS affiliation.\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["numfocus affiliation: ",(0,s.jsx)(e.a,{href:"https://github.com/numfocus/projects-director/blob/master/projects/Matplotlib.md",children:"https://github.com/numfocus/projects-director/blob/master/projects/Matplotlib.md"})]}),"\n",(0,s.jsx)(e.li,{children:"Scopatz said he was interested in pushing this forward :)"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"conda-forge blog"}),"\n",(0,s.jsxs)(e.li,{children:["discuss numpy pinning (",(0,s.jsx)(e.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/44",children:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/44"}),")\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Merged!"}),"\n",(0,s.jsx)(e.li,{children:"Michael working on different scheme.  numpy-base has all files.  numpy is metapackage that implies only python API usage.  numpy-devel is metapackage that implies C API linkage, and imposes run_exports"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.strong,{children:"Done"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Adding new members (email sent on 5/29. Thanks @Filipe F )\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Adding people to cf/staged-recipes\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Igor T. Ghisi (igortg) was also interested in helping"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"Adding people to core\n- Joshua Adelman @synapticarbors\n- Marcel Bargull, @mbargull has been a very involved conda contributor and may be interested.\n- Marius van Niekerk has been very involved recently"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Video conferencing solution?\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["We\u2019ll lose Eric\u2019s zoom, but we gained Marius\u2019 zoom! ",(0,s.jsx)(e.a,{href:"https://flatiron.zoom.us/j/3620044703",children:"https://flatiron.zoom.us/j/3620044703"})]}),"\n"]}),"\n"]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},11151:(n,e,i)=>{i.d(e,{Z:()=>l,a:()=>r});var s=i(67294);const t={},o=s.createContext(t);function r(n){const e=s.useContext(o);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:r(n.components),s.createElement(o.Provider,{value:e},n.children)}}}]);