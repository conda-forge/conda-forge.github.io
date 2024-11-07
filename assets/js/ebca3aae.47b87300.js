"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[4424],{86714:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var a=i(74848),t=i(28453);const s={title:"Pinned dependencies"},o="Pinned dependencies",r={id:"maintainer/pinning_deps",title:"Pinned dependencies",description:"Globally pinned packages",source:"@site/docs/maintainer/pinning_deps.md",sourceDirName:"maintainer",slug:"/maintainer/pinning_deps",permalink:"/docs/maintainer/pinning_deps",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/maintainer/pinning_deps.md",tags:[],version:"current",lastUpdatedAt:173097955e4,frontMatter:{title:"Pinned dependencies"},sidebar:"docs",previous:{title:"Maintaining packages",permalink:"/docs/maintainer/updating_pkgs"},next:{title:"Configuring conda-forge.yml",permalink:"/docs/maintainer/conda_forge_yml"}},d={},c=[{value:"Globally pinned packages",id:"globally-pinned-packages",level:2},{value:"Specifying run_exports",id:"specifying-run_exports",level:2},{value:"Updating package pins",id:"updating-package-pins",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"pinned-deps"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"pinned-dependencies"})}),"\n",(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"pinned-dependencies",children:"Pinned dependencies"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"globally-pinned-packages"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"id1"})}),"\n",(0,a.jsx)(n.h2,{id:"globally-pinned-packages",children:"Globally pinned packages"}),"\n",(0,a.jsx)(n.p,{children:"Maintaining a large collection of packages with different requirements poses the danger of producing islands of packages with mutually exclusive dependencies.\nEspecially widely used libraries with restricted version compatibilities increase the danger of fractioning the package space.\nBy fixing crucial libraries to specific dependency version shared by all packages in conda-forge, we avoid fractioning of our packages in incompatible islands.\nThe following paragraphs give a short introduction about how this global version pinning is realized in conda-forge."}),"\n",(0,a.jsxs)(n.p,{children:["The current versions of globally pinned packages are defined in the ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml",children:"conda_build_config.yaml"})," file located in the ",(0,a.jsx)(n.code,{children:"conda-forge-pinning"})," feedstock.\nThese pinned versions represent the ABIs that conda-forge is currently supporting, with almost all available packages built against that version."]}),"\n",(0,a.jsxs)(n.p,{children:["When a rerendering happens, conda-smithy will render the recipe using conda-build and output configuration files for each job and save them in a yaml file in ",(0,a.jsx)(n.code,{children:".ci_support"})," folder. For example, there's an output configuration file for each OS, each python version, etc."]}),"\n",(0,a.jsxs)(n.p,{children:["These output configuration files are stripped to options that are used in the build and therefore a change in the config files in ",(0,a.jsx)(n.code,{children:".ci_support"})," folder implies that a new build is needed there."]}),"\n",(0,a.jsx)(n.p,{children:"Pinning of packages are handled by the same configuration file and conda-build. This means that packages need not be pinned manually."}),"\n",(0,a.jsx)(n.p,{children:"E.g."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"requirements:\n  host:\n    - gmp 6.1.*\n  run:\n    - gmp 6.1.*\n"})}),"\n",(0,a.jsx)(n.p,{children:"Should be replaced by"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"requirements:\n  host:\n    - gmp\n  run:\n    - gmp\n"})}),"\n",(0,a.jsx)(n.p,{children:"When there's a new ABI version of gmp (say 7.0), then conda-forge-pinning will be updated. A re-rendering of a package using gmp will change. Therefore to check that a recipe needs to be rebuilt for updated pinnings, you only need to check if the package needs a rerender."}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"NumPy"})," is an exception to this (See ",(0,a.jsx)(n.a,{href:"/docs/maintainer/knowledge_base#linking-numpy",children:"Building Against NumPy"}),")."]})}),"\n",(0,a.jsxs)(n.p,{children:["If a package is not pinned in ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml",children:"conda-forge-pinning"}),", then the pinning needs to be done manually. If the package is a ",(0,a.jsx)(n.code,{children:"C/C++"})," library with a ",(0,a.jsx)(n.code,{children:"C/C++"})," API that is consumed and linked to by other libraries, then that package is a candidate to be added to ",(0,a.jsx)(n.code,{children:"conda-forge-pinning"}),". Please open an issue in ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock",children:"conda-forge-pinning-feedstock"})," for discussion."]}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.p,{children:["If the constraints in ",(0,a.jsx)(n.code,{children:"conda-forge-pinning"})," are not strict enough, you can override them by changing back to pinning the package with a version manually. You can make a pinning stricter by adding ",(0,a.jsx)(n.code,{children:"{{ pin_compatible('gmp', max_pin='x.x.x') }}"})," to run requirements."]})}),"\n",(0,a.jsxs)(n.admonition,{type:"note",children:[(0,a.jsxs)(n.p,{children:["If you need to remove a pinning in rare cases like linking the package statically or if the package is used with ",(0,a.jsx)(n.code,{children:"dlopen"})," instead of linking, then you can do,"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"build:\n  ignore_run_exports:\n    - gmp\n"})})]}),"\n",(0,a.jsxs)(n.p,{children:["There is additional documentation on this pinning scheme in ",(0,a.jsx)(n.a,{href:"https://docs.conda.io/projects/conda-build/en/stable/resources/variants.html#build-variants",children:"the conda docs"}),"."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"run-exports"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"specifying-run-exports"})}),"\n",(0,a.jsx)(n.h2,{id:"specifying-run_exports",children:"Specifying run_exports"}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"run_exports"})," feature can be used to specify the versions that are ",(0,a.jsx)(n.a,{href:"/docs/glossary#abi",children:"ABI"})," compatible with the built version. This leads to higher flexibility of choosable packages, without breakages due to incompatibilities."]}),"\n",(0,a.jsxs)(n.p,{children:["Packages that depend on a package with ",(0,a.jsx)(n.code,{children:"run_exports"})," can choose to overwrite this behavior using the ",(0,a.jsx)(n.code,{children:"build/ignore_run_exports"})," key."]}),"\n",(0,a.jsxs)(n.admonition,{type:"note",children:[(0,a.jsxs)(n.p,{children:["It is not always completely clear how a given package is going to be used.\nFor example, numpy may be used either as a python package, and it also has a C library that can be linked against.\nThe former usage would not require ",(0,a.jsx)(n.code,{children:"run_exports"}),", but the latter would."]}),(0,a.jsxs)(n.p,{children:["In this scenario, it may be advantageous to split the package into distinct metapackages that may share a common parent containing the actual files, but with each metapackage defining different pinning behavior.\nAnaconda does this for numpy (see the ",(0,a.jsx)(n.a,{href:"https://github.com/AnacondaRecipes/numpy-feedstock/blob/master/recipe/meta.yaml",children:"recipe"}),")."]}),(0,a.jsxs)(n.p,{children:["The general idea is that the ",(0,a.jsx)(n.code,{children:"numpy-devel"})," package should be used when a package is building against the C interface (i.e. it needs the compatibility bound), and the numpy package should be used when a package is using only the python interface."]}),(0,a.jsx)(n.p,{children:"In general, it is not necessary to split up packages. At conda-forge, we only advise it when it greatly reduces package size, or when it helps remove dependencies that would otherwise be unnecessarily included."})]}),"\n",(0,a.jsxs)(n.p,{children:["The global pins and ",(0,a.jsx)(n.code,{children:"run_exports"})," are two sides of the same coin.\nIf there is an ABI break, as determined by the ",(0,a.jsx)(n.code,{children:"run_exports"}),", then the global pins ",(0,a.jsx)(n.em,{children:"may"})," need to be updated. It is possible that conda-forge skips that ABI.\nOnce the pins are updated, via a migration yaml, then all the packages that are linked are rebuilt."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"update-pins"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{id:"updating-package-pins"})}),"\n",(0,a.jsx)(n.h2,{id:"updating-package-pins",children:"Updating package pins"}),"\n",(0,a.jsx)(n.p,{children:"Changing global pins requires rerendering all packages that depend on the package with the changed pin. Doing this manually\ncan be tedious, especially when many packages are involved. Migrators are used to automatically generate pull requests\nfor the affected packages in conda-forge."}),"\n",(0,a.jsx)(n.p,{children:"Usually, the bot will generate these migrations automatically. However, when a pin is first made or added, one may need to\nbe added by hand. To do this, follow these steps:"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["Create a new migration yaml by copying ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/example.exyaml",children:"example.exyaml"})," in the ",(0,a.jsx)(n.code,{children:"conda-forge/conda-forge-pinning"})," repository."]}),"\n",(0,a.jsx)(n.li,{children:"Change the migration yaml to reflect the package and version to be migrated"}),"\n",(0,a.jsx)(n.li,{children:"Write a migrator for propagating the pin changes."}),"\n",(0,a.jsxs)(n.li,{children:["Propose the changes as a ",(0,a.jsx)(n.a,{href:"/docs/glossary#pr",children:"PR"})," to ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock",children:"conda-forge/conda-forge-pinning-feedstock"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["Once accepted the migration will begin. The migration status can be monitored at ",(0,a.jsx)(n.a,{href:"https://conda-forge.org/status",children:"https://conda-forge.org/status"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["After the migration is complete, a new PR can be issued to ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock",children:"conda-forge/conda-forge-pinning-feedstock"})," to:\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Remove the migrator yaml for the completed migration"}),"\n",(0,a.jsxs)(n.li,{children:["If the version of the package is pinned in the global conda_build_config.yaml, this PR should also:\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Update the version in conda_build_config.yaml"}),"\n",(0,a.jsx)(n.li,{children:"Bump the version in meta.yaml to the current date"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Details of how the migration yaml is setup are provided in an ",(0,a.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-pinning-feedstock/tree/master/recipe/migrations/example.exyaml",children:"example"}),"\nand documentation ",(0,a.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/blob/master/README.md#making-migrators",children:"here"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>r});var a=i(96540);const t={},s=a.createContext(t);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);