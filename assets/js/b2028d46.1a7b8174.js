"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[9555],{43448:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var s=i(74848),t=i(28453);const o={title:"2018-06-26"},r="2018-06-26 conda-forge meeting",c={id:"minutes/2018-06-26",title:"2018-06-26",description:"Pinned Items",source:"@site/community/minutes/2018-06-26.md",sourceDirName:"minutes",slug:"/minutes/2018-06-26",permalink:"/community/minutes/2018-06-26",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2018-06-26.md",tags:[],version:"current",lastUpdatedAt:172596839e4,frontMatter:{title:"2018-06-26"},sidebar:"community",previous:{title:"2018-07-17",permalink:"/community/minutes/2018-07-17"},next:{title:"2018-06-12",permalink:"/community/minutes/2018-06-12"}},l={},a=[];function h(e){const n={a:"a",code:"code",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"2018-06-26-conda-forge-meeting",children:"2018-06-26 conda-forge meeting"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Pinned Items"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Zoom instructions: ",(0,s.jsx)(n.a,{href:"https://paper.dropbox.com/doc/How-to-connect-to-zoom-odl94oveHyiRv6UqTtZE5",children:"+How to connect to zoom"})]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"New items"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["CJ: report on June 18-20 NYC sprint\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Sprint in NYC June 18th through 20th for REST API for conda-forge graph and better inspection of CLI/imports/includes for conda-forge packages."}),"\n",(0,s.jsxs)(n.li,{children:["Potential place for additional metadata in conda recipes?\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(from @Jonathan H ) you can clobber/append portions of a recipe with an extra file with conda-build 3"}),"\n",(0,s.jsxs)(n.li,{children:["recipe_url info for recording repo where a recipe came from: ",(0,s.jsx)(n.a,{href:"https://github.com/conda/conda-build/pull/2489",children:"https://github.com/conda/conda-build/pull/2489"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Moving compiler syntax\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Run syntax in topo order ",(0,s.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/214",children:"https://github.com/regro/cf-scripts/issues/214"})]}),"\n",(0,s.jsx)(n.li,{children:"Run compiler move as soon as syntax has moved"}),"\n",(0,s.jsxs)(n.li,{children:["Formalize pushing to different label (maybe as optional arg to ",(0,s.jsx)(n.code,{children:"conda-smithy"}),"?) (this would also help with RC releases)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Existing Items"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Finding a good solution to sharing passwords among core"}),"\n",(0,s.jsxs)(n.li,{children:["Run_exports etc: ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/58",children:"https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/58"})]}),"\n",(0,s.jsxs)(n.li,{children:["Michael Sarahan to document and give demo on how to transition old recipes to new style\n- ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/AnacondaRecipesSync",children:"https://github.com/conda-forge/AnacondaRecipesSync"}),"\n- 5/1: Will wait for more people on the dev call before Mike talks about this"]}),"\n",(0,s.jsxs)(n.li,{children:["Build packages on C3I and upload to conda-forge\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Make is missing from the base image for PowerPC internal to Anaconda. Fun times!"}),"\n",(0,s.jsx)(n.li,{children:"Mike is open to other people helping with this.  If interested, reach out!  Helping means trying recipes, debugging any issues, and resolving any merge conflicts that have happened since Mike pulled them in last.  Moving target."}),"\n",(0,s.jsxs)(n.li,{children:["Packages that have been built ",(0,s.jsx)(n.a,{href:"https://anaconda.org/cf-cb3",children:"https://anaconda.org/cf-cb3"})," - these may need more work regarding versions.  The graph was computed with the versions, but probably should have ignored them.  When a pin is older than a newer recipe, the upstream recipe gets missed as a real dependency because of the version mismatch."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["switch to cb3\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["what kind of things are going to break when we change compilers?\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(@Jonathan H had a great response that I hope he\u2019ll clarify here:) tl;dr C++ ABI"}),"\n",(0,s.jsxs)(n.li,{children:["Some details on libstdc++ dual ABI, ",(0,s.jsx)(n.a,{href:"https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_dual_abi.html",children:"https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_dual_abi.html"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Making the agenda and notes public again.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"John will see if we can make dropbox paper readable by the world"}),"\n",(0,s.jsx)(n.li,{children:"other options are to just post the notes somewhere public after the meeting"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"conda-forge blog"}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Discussed Items"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Done"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["add something to the bot to add new PRs that manage the cb2 \u2192 cb3\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["e.g., if a compiler is detected, add the right compilers for the right files (Justin, nominally \u2014 @Christopher W @Mike S and @Anthony S will probably be reviewing those PRs) See issue: ",(0,s.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/162",children:"https://github.com/regro/cf-scripts/issues/162"})]}),"\n"]}),"\n"]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var s=i(96540);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);