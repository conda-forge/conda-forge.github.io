"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[5230],{26894:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var s=i(74848),t=i(28453);const o={title:"2018-04-17"},r="2018-04-17 conda-forge meeting",c={id:"minutes/2018-04-17",title:"2018-04-17",description:"- Zoom instructions: +How to connect to zoom",source:"@site/community/minutes/2018-04-17.md",sourceDirName:"minutes",slug:"/minutes/2018-04-17",permalink:"/community/minutes/2018-04-17",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2018-04-17.md",tags:[],version:"current",lastUpdatedAt:172596839e4,frontMatter:{title:"2018-04-17"},sidebar:"community",previous:{title:"2018-05-01",permalink:"/community/minutes/2018-05-01"},next:{title:"2018-04-03",permalink:"/community/minutes/2018-04-03"}},l={},d=[];function a(e){const n={a:"a",del:"del",h1:"h1",header:"header",hr:"hr",li:"li",p:"p",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"2018-04-17-conda-forge-meeting",children:"2018-04-17 conda-forge meeting"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Zoom instructions: ",(0,s.jsx)(n.a,{href:"https://paper.dropbox.com/doc/How-to-connect-to-zoom-odl94oveHyiRv6UqTtZE5",children:"+How to connect to zoom"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Debriefing on the AnacondaCon meeting (for those that weren\u2019t there)"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"conda-smithy 3 and conda-build 3 move"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"issue the releases for conda-smithy 3 and conda-forge-pinning"}),"\n",(0,s.jsxs)(n.li,{children:["review the list from packages that must be rebuilt with the new compilers\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Look for packages that have toolchain in their deps"}),"\n",(0,s.jsx)(n.li,{children:"MichaelS to document and give demo on how to transition old recipes to new style"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/AnacondaRecipesSync",children:"https://github.com/conda-forge/AnacondaRecipesSync"})}),"\n",(0,s.jsxs)(n.li,{children:['CJ reports ~763 packages that use "toolchain" in build deps.  MichaelS to get that list from CJ, and will divide into two sets:\n',(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"recipes that have already been done in AnacondaRecipes and should be PR\u2019ed to Conda-forge"}),"\n",(0,s.jsx)(n.li,{children:"recipes that need modification for new compilers and remove python as mechanism for activating VC features"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["How do we want the bot to handle non-release releases (alpha/beta/dev/pre/etc.) ",(0,s.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/86",children:"https://github.com/regro/cf-scripts/issues/86"})," and ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3",children:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3"})," and ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/matplotlib-feedstock/pull/24#issuecomment-221496870",children:"https://github.com/conda-forge/matplotlib-feedstock/pull/24#issuecomment-221496870"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"conda-forge-pre?"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["John suggested (on gitter) that we reach out to intel and NVIDIA to get copies of their toolchains and development libraries.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Intel\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Chatting in the background with Intel about using their compilers on the CI services"}),"\n",(0,s.jsxs)(n.li,{children:["defaults uses:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"intel fortran compiler to build SciPy (fortran only; VS used for C/C++)"}),"\n",(0,s.jsx)(n.li,{children:"defaults to visual studio compilers for all appropriate versions of python"}),"\n",(0,s.jsx)(n.li,{children:"mingw on py27/vs2008 for exceptional cases"}),"\n",(0,s.jsxs)(n.li,{children:["Julia discussion around MKL, ",(0,s.jsx)(n.a,{href:"https://github.com/JuliaLang/julia/issues/18374",children:"https://github.com/JuliaLang/julia/issues/18374"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Nvidia\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"pygdf - gpu only package that works on the nvidia GPU Jenkins stack"}),"\n",(0,s.jsx)(n.li,{children:"John: Get a pygdf-feedstock on conda-forge and ping the Nvidia folks"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Adding people to cf/staged-recipes\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.del,{children:"Marius van Niekerk offered to help review on staged-recipes"})," Invited to staged recipes"]}),"\n",(0,s.jsx)(n.li,{children:"Igor T. Ghisi (igortg) was also interested in helping"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Adding people to core\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Invite one or more from bioconda.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Bjorn (Filipe will invite)"}),"\n",(0,s.jsx)(n.li,{children:"Marcel Bargull, @mbargull has been a very involved conda contributor and may be interested."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Optionally building wheels for some packages. ( ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-smithy/issues/608",children:"https://github.com/conda-forge/conda-smithy/issues/608"})," )"]}),"\n",(0,s.jsxs)(n.li,{children:["Making the agenda and notes public again.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"John will see if we can make dropbox paper readable by the world"}),"\n",(0,s.jsx)(n.li,{children:"other options are to just post the notes somewhere public after the meeting"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Governance, CoD, and NumFOCUS affiliation.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["numfocus affiliation: ",(0,s.jsx)(n.a,{href:"https://github.com/numfocus/projects-director/blob/master/projects/Matplotlib.md",children:"https://github.com/numfocus/projects-director/blob/master/projects/Matplotlib.md"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"conda-forge blog"}),"\n",(0,s.jsxs)(n.li,{children:["Video conferencing solution?\n",(0,s.jsx)(n.a,{href:"https://docs.google.com/document/d/10dxX0Zse0Rx1HqsxC73Wfsghmy5m8PP8cHuBIOhWKpc/edit",children:"https://docs.google.com/document/d/10dxX0Zse0Rx1HqsxC73Wfsghmy5m8PP8cHuBIOhWKpc/edit"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://docs.google.com/document/d/10dxX0Zse0Rx1HqsxC73Wfsghmy5m8PP8cHuBIOhWKpc/edit",children:"https://docs.google.com/document/d/10dxX0Zse0Rx1HqsxC73Wfsghmy5m8PP8cHuBIOhWKpc/edit"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var s=i(96540);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);