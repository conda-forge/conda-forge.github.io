"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[4597],{485:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>a,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=i(85893),r=i(11151);const l={title:"2016-04-29"},t="2016-04-29",c={id:"minutes/2016-04-29",title:"2016-04-29",description:"14:00 UTC",source:"@site/community/minutes/2016-04-29.md",sourceDirName:"minutes",slug:"/minutes/2016-04-29",permalink:"/community/minutes/2016-04-29",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2016-04-29.md",tags:[],version:"current",lastUpdatedAt:1721834395e3,frontMatter:{title:"2016-04-29"},sidebar:"community",previous:{title:"2016-05-09",permalink:"/community/minutes/2016-05-09"},next:{title:"2016-04-22",permalink:"/community/minutes/2016-04-22"}},o={},d=[];function h(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"2016-04-29",children:"2016-04-29"}),"\n",(0,s.jsx)(n.p,{children:"14:00 UTC"}),"\n",(0,s.jsxs)(n.p,{children:["Hangout link: ",(0,s.jsx)(n.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"}),(0,s.jsx)(n.a,{href:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie",children:"https://hangouts.google.com/call/v5olhwzpfzgzpoq5i3wthjpqpie"})]}),"\n",(0,s.jsx)(n.p,{children:"Agenda:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Dependency tracking (I know this has jumped the order, but this has become extremely pressing.)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'*   Proposed fixes to conda-build. There are many and this is pretty slow moving.\n\n        *   Question about conda-smithy/conda-build-all requirements. Please see reference to "Question 4.5" in [this comment](https://github.com/conda/conda-build/pull/848#issuecomment-215523101) \n\n*   Internal pinning mechanism. [Phil Elson](https://conda-forge.hackpad.com/ep/profile/AviM60TiesB) wrote some nice scripts here and they are very helpful.\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Questions:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"    *   How can we figure out what things need pinning?\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"When do we rollback a pinning?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"How can we handle pinning in a more automated manner?"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"        *   What things should be pinned?\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"How to handle version updates?"}),"\n",(0,s.jsx)(n.li,{children:"How to identify problem areas (packages that can't accept a pin)?"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"PyPI metadata redundancy"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Prototype tool to convert pure Python wheels directly to conda packages: [](https://github.com/takluyver/wheel2conda)https://github.com/takluyver/wheel2conda\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Automated feedstock maintenance."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Python3 vs Python==3"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   How to depend (inc build depend) on applications which require Python 3, from a Python==2 env\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"'Subenvironment dependencies' are a possible alternative"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Complex licenses (e.g. MKL, CUDA, cuDNN, etc.)"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Packaging python itself"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"VC features (what more needs discussing for the general meeting?)"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"yum requirements (partially resolved)"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Low level packaging"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"NetCDF (also curl/ca-certificates and Perl packages)"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Adding a devtoolset to the container (for now)."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Movement of Docker images to common spaces (Docker Hub org, GitHub org)."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"MSYS2 integrated into conda. How do we want to use this? Do we still want VC?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"GitHub rate limitations. How can we further mitigate these?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Add namespace to packages ",(0,s.jsx)(n.code,{children:"node-"}),", ",(0,s.jsx)(n.code,{children:"ruby-"}),", ",(0,s.jsx)(n.code,{children:"perl-"}),", ",(0,s.jsx)(n.code,{children:"why not python-"})," ;-)"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Dropping py34 ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/staged-recipes/pull/465",children:"conda forge/staged recipes#465"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Notes:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Let's give webex a shot"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Dependency tracking"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Currently baking in versions into the recipe, automated with script from [Phil Elson](https://conda-forge.hackpad.com/ep/profile/AviM60TiesB)\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Version choices are decided manually at the moment"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/staged-recipes/wiki/Pinned-dependencies"}),(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/staged-recipes/wiki/Pinned-dependencies",children:"https://github.com/conda-forge/staged-recipes/wiki/Pinned-dependencies"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"What if we want to change a pinned version, say zlib 1.2 to 1.3?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Shared VM which performs automated and semi-automated tasks which multiple contributors have access too"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"    *   Look into setting up a lightweight host/VM, heroku\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"How to decide when to update pinned dependecy"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Proposed fixes to conda-build, ",(0,s.jsx)(n.a,{href:"https://github.com/conda/conda-build/pull/848",children:"conda/conda build#848"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Will these brake conda-build-all, do we care?\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Micheal is working on conda-render tool to try to fill in as much jinja template as possible"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Talk about this specific topic, plan agenda in advance"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"    *   Plan time using emai/GitHub\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Sticking point are build matrix and validiatable"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Complex licensing, ie MKL, CUDA, CuDNN"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   MKL runtimes are spelled out, headers more complex\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"CUDA seems better, CentOS 6 images available"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Micheal not aware of CuDNN requirements"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"    *   Micheal will look into cuDNN license constraints.\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Python package"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Windows needs some files moved.\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Features or vc package?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"xz 5.0 or 5.2?  Start with 5.0, then do 5.2 build"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Branding?"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"    *   Easy to implement, but is it wanted?\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Not major concern for Continuum"}),"\n",(0,s.jsx)(n.li,{children:"Helpful when resolving problems, detecting when system Python"}),"\n",(0,s.jsx)(n.li,{children:"Put it in, not too hard and will help downstream organizations"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["All of the contents below were discussed between ",(0,s.jsx)(n.a,{href:"https://conda-forge.hackpad.com/ep/profile/AviM60TiesB",children:"Phil Elson"})," and ",(0,s.jsx)(n.a,{href:"https://conda-forge.hackpad.com/ep/profile/wv6uvIZX6h0",children:"John Kirkham"}),". Many of the items have already been planned before and just need the details ironed out. Anything that required large group discussion was not decided in anyway."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Yum requirements"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Decided to go with this PR ( [conda forge/conda smithy#135](https://github.com/conda-forge/conda-smithy/pull/135) ).\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Current use case is still VTK and freeglut (forgot to mention this). Though VTK is proceeding through a new PR ( ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/staged-recipes/pull/453",children:"conda forge/staged recipes#453"})," ). freeglut is still in this PR ( ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/staged-recipes/pull/373",children:"conda forge/staged recipes#373"})," )."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Low level packaging"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   Some brief discussion about using different subchannels for these to avoid dependency clashes (e.g. compiler components).\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["There are some gray areas that will eventually be encountered, but no examples were fleshed out. Though a few might be ",(0,s.jsx)(n.code,{children:"gmp"})," and ",(0,s.jsx)(n.code,{children:"mpfr"})," as they are both compiler dependencies and used by other packages like symbolic math packages (e.g. SymPy)."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Adding a devtoolset to the container (for now)."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   This was already merged (adds devtoolset-2).\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://conda-forge.hackpad.com/ep/profile/AviM60TiesB",children:"Phil"})," has rebuilt this."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://conda-forge.hackpad.com/ep/profile/wv6uvIZX6h0",children:"John"})," tested the image with a trivial C++11 ",(0,s.jsx)(n.a,{href:"https://github.com/jakirkham/hello_tests/blob/5b2f6b0c5682ecd84bee3be9cb73d790265f6002/hello.cxx",children:"program"})," and that worked fine."]}),"\n",(0,s.jsx)(n.li,{children:"Automatic builds are not working. Will likely contact Docker to fix. However, this only matters if this problem still happens after moving the images."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Movement of Docker images to common spaces (Docker Hub org, GitHub org)."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"*   [John](https://conda-forge.hackpad.com/ep/profile/wv6uvIZX6h0) will add the PRs to move Obvious-CI's Docker image to the org and from Obvious-CI.\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Docker Hub org is already setup"}),"\n",(0,s.jsx)(n.li,{children:"Repo on GitHub is ready to go."}),"\n",(0,s.jsx)(n.li,{children:"Need to setup autobuilds for the image(s)."}),"\n",(0,s.jsx)(n.li,{children:"Also, need to switch everything to using the Docker image from the org repo."}),"\n"]}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>t});var s=i(67294);const r={},l=s.createContext(r);function t(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);