"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[10932],{28994:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=t(74848),o=t(28453);const s={},r='Upcoming migration for stdlib("c")',a={permalink:"/news/2024/03/24/stdlib-migration",source:"@site/news/2024-03-24-stdlib-migration.md",title:'Upcoming migration for stdlib("c")',description:"Almost since the inception of conda-forge, the baseline version of our standard",date:"2024-03-24T00:00:00.000Z",tags:[],hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"The new conda-forge.org",permalink:"/news/2024/04/09/new-website"},nextItem:{title:"Dropping CUDA 11.2 on 2024 April 22",permalink:"/news/2024/03/06/dropping-cuda-112"}},c={authorsImageUrls:[]},l=[];function d(e){const n={a:"a",code:"code",em:"em",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:'Almost since the inception of conda-forge, the baseline version of our standard\nlibrary ("stdlib") for C has not changed. This library comes with extra\ncomplications because it is an essential part of the operating system, and one\nof the few things that conda/mamba/etc. cannot ship safely.'}),"\n",(0,i.jsx)(n.p,{children:"As the ecosystem has moved on and many packages are starting to require newer\nbaseline versions, we need to follow suit at some point. However, to avoid\nbreaking users on older systems, we need to have infrastructure in place that\nallows our packages to have sufficiently accurate metadata, such that conda can\navoid the installation of a package requiring a newer stdlib on an old system."}),"\n",(0,i.jsxs)(n.p,{children:["After many discussions across conda-forge stakeholders, the solution we arrived\nat is the introduction of a new Jinja2-function ",(0,i.jsx)(n.code,{children:'{{ stdlib("c") }}'}),", which\nreflects that a given recipe requires a C stdlib. Making this relationship\nexplicit will make it easy to correctly reflect the requirement for newer\nstdlib versions per feedstock, as well as in our global pinning."]}),"\n",(0,i.jsxs)(n.p,{children:["Up until now, the stdlib was handled implicitly as part of the compiler stack.\nIn order to allow this transition to happen, we need to introduce this function\nto essentially all compiled recipes. This will be done in stages, first for a\nsingle migration, and then attached to ",(0,i.jsx)(n.em,{children:"all"})," ongoing migrations in conda-forge."]}),"\n",(0,i.jsx)(n.p,{children:"The logic of the piggyback migrator tries to correctly handle most scenarios,\nbut it is impossible to cover all corner cases. As for some general rules that\nall feedstock maintainers are free to apply independently:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["if a feedstock uses a ",(0,i.jsx)(n.code,{children:"- {{ compiler(...) }}"})," jinja in the build section,\nadd a line with ",(0,i.jsx)(n.code,{children:'- {{ stdlib("c") }}'})," to the build environment."]}),"\n",(0,i.jsxs)(n.li,{children:["if a feedstock uses ",(0,i.jsx)(n.code,{children:"- sysroot_linux-64 2.17  # [linux64]"})," (or a variation),\nremove this line and add the following to your ",(0,i.jsx)(n.code,{children:"conda_build_config.yaml"}),":\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"c_stdlib_version:              # [linux]\n  - 2.17                       # [linux]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["if a feedstock sets ",(0,i.jsx)(n.code,{children:"MACOSX_DEPLOYMENT_TARGET"})," in ",(0,i.jsx)(n.code,{children:"conda_build_config.yaml"}),",\nfor example to 10.13 for ",(0,i.jsx)(n.code,{children:"x86_64"}),", replace that section with the following\n(note, this does ",(0,i.jsx)(n.em,{children:"not"})," apply to ",(0,i.jsx)(n.code,{children:"MACOSX_SDK_VERSION"}),"!):\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"c_stdlib_version:              # [osx and x86_64]\n  - 10.13                      # [osx and x86_64]\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.code,{children:"meta.yaml"}),", you can then remove any variations of ",(0,i.jsx)(n.code,{children:"- __glibc >=2.17"})," or\n",(0,i.jsx)(n.code,{children:"- __osx >={{ MACOSX_DEPLOYMENT_TARGET }}  # [osx and x86_64]"}),", as this will\nhenceforth be handled through ",(0,i.jsx)(n.code,{children:'- {{ stdlib("c") }}'}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Following the application of any of the above changes, the feedstock should be\n",(0,i.jsx)(n.a,{href:"https://conda-forge.org/docs/maintainer/updating_pkgs/#rerendering-feedstocks",children:"rerendered"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["As these mechanisms begin rolling out, we will also update the maintainer\ndocumentation in the conda-forge knowledge base. For more details, see this\n",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/2102",children:"issue"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(96540);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);