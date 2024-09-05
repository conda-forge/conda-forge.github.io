"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[1295],{84749:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>r,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var t=o(74848),a=o(28453);const s={authors:["wolfv"],tags:["conda-forge"],image:"https://i.imgur.com/pRdJaYw.png"},i="GPU enabled TensorFlow builds on conda-forge",l={permalink:"/blog/2021/11/03/tensorflow-gpu",editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/blog/2021-11-03-tensorflow-gpu.md",source:"@site/blog/2021-11-03-tensorflow-gpu.md",title:"GPU enabled TensorFlow builds on conda-forge",description:"Tensorflow on Anvil",date:"2021-11-03T00:00:00.000Z",tags:[{inline:!0,label:"conda-forge",permalink:"/blog/tags/conda-forge"}],readingTime:3.545,hasTruncateMarker:!0,authors:[{name:"Wolf Vollprecht",title:"Member of conda-forge/core",url:"https://github.com/wolfv",imageURL:"https://github.com/wolfv.png",key:"wolfv",page:null}],frontMatter:{authors:["wolfv"],tags:["conda-forge"],image:"https://i.imgur.com/pRdJaYw.png"},unlisted:!1,prevItem:{title:"Outreachy 2022 Wrap-up Blog",permalink:"/blog/2022/08/26/outreachy-wrap-up-blog-2022"},nextItem:{title:"Travis CI Security Incident",permalink:"/blog/2021/09/24/travis-security"}},r={authorsImageUrls:[void 0]},c=[{value:"Installation",id:"installation",level:2},{value:"Thanks to",id:"thanks-to",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://i.imgur.com/pRdJaYw.png",alt:"Tensorflow on Anvil"})}),"\n",(0,t.jsxs)(n.p,{children:["Recently we've been able to add GPU-enabled TensorFlow builds to\nconda-forge! This was quite a journey, with multiple contributors trying\ndifferent ways to convince the Bazel-based build system of TensorFlow to\nbuild CUDA-enabled packages. But we managed, ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/tensorflow-feedstock/pull/157",children:"and the pull request got\nmerged"}),"."]}),"\n",(0,t.jsx)(n.p,{children:'We now have a configuration in place that creates CUDA-enabled\nTensorFlow builds for all conda-forge supported configurations (CUDA\n10.2, 11.0, 11.1, and 11.2+). Building out the CUDA packages requires\nbeefy machines -- on a 32 core machine it still takes around 3 hours to\nbuild a single package. Our build matrix now includes 12 CUDA-enabled\npackages & 3 CPU packages (because we need separate packages per Python\nversion). As one can imagine, this isn\'t easily possible on an average\n"home computer".'}),"\n",(0,t.jsxs)(n.p,{children:["For this purpose, we have written an Ansible playbook that lets us boot\nup cloud machines which then build the feedstock (using the\n",(0,t.jsx)(n.code,{children:"build-locally.py"})," script). Thanks to the generous support\nof OVH we were able to boot multiple 32-core virtual machines\nsimultaneously to build the different TensorFlow variants."]}),"\n",(0,t.jsxs)(n.p,{children:["We have open-sourced the ",(0,t.jsx)(n.a,{href:"https://github.com/mamba-org/build-locally-ansible",children:"Ansible playbook in\nGitHub"})," and we're\nworking towards making it (more) generally useful for other long-running\nbuilds!"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://i.imgur.com/nvV6izV.jpg",alt:"Running 3 builds in parallel on 32 cores ... still takes around 3 hours to finish"})}),"\n",(0,t.jsx)(n.p,{children:"With the TensorFlow builds in place, conda-forge now has CUDA-enabled\nbuilds for PyTorch and Tensorflow, the two most popular deep learning\nlibraries."}),"\n",(0,t.jsxs)(n.p,{children:["We are still missing Windows builds for TensorFlow (CPU & CUDA,\nunfortunately) and would love the community to help us out with that.\nThere is an open PR, but it probably needs some poking in Bazel to get\nit to pass: ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/tensorflow-feedstock/pull/111",children:"conda-forge/tensorflow-feedstock#111"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"We hope that these new GPU builds will enable many more packages to be\nadded to the conda-forge channel! We are already looking forward to the\n2.6.2 and 2.7 releases of TensorFlow and to adding Windows support in\nthe future. We hope you enjoy this work."}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsxs)(n.p,{children:["You can now select between GPU enabled (default) and CPU packages using\nthe ",(0,t.jsx)(n.code,{children:"tensorflow-gpu"})," and ",(0,t.jsx)(n.code,{children:"tensorflow-cpu"})," packages. Just run"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mamba install tensorflow-gpu -c conda-forge\n# OR\nconda install tensorflow-gpu -c conda-forge\n"})}),"\n",(0,t.jsxs)(n.p,{children:["When installing the ",(0,t.jsx)(n.code,{children:"tensorflow"}),' package, the package resolution will\nnow default to the GPU-enabled builds of tensorflow if the local machine\nhas a GPU (these builds can be identified by "cuda" at the beginning\nof the version number). Note that GPU-enabled packages can also work on\nCPU-only machines, but one would need to override the enviornment\nvariable ',(0,t.jsx)(n.code,{children:"CONDA_OVERRIDE_CUDA"})," like below. This could be handy if you\nare in a situation where your current node (e.g. login node) on an HPC\ndoes not have GPUs, but the compute nodes with GPUs do not have internet\naccess."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'CONDA_OVERRIDE_CUDA="11.2" conda install tensorflow cudatoolkit>=11.2 -c conda-forge\n# OR\nCONDA_OVERRIDE_CUDA="11.2" mamba install tensorflow cudatoolkit>=11.2 -c conda-forge\n'})}),"\n",(0,t.jsxs)(n.p,{children:['Note that you should select the cudatoolkit version most appropraite for\nyour GPU; currently, we have "10.2", "11.0", "11.1", and "11.2"\nbuilds available where the the "11.2" builds are compatible with all\ncudatoolkits>=11.2. You could also force a specific version of\n',(0,t.jsx)(n.code,{children:"cudatoolkit"})," by specifying it like above. Moreover, you could ensure\nyou get a sepcific build of tensorflow by appending the package name\nlike ",(0,t.jsx)(n.code,{children:"tensorflow==2.7.0=cuda*"})," or ",(0,t.jsx)(n.code,{children:"tensorflow==2.7.0=cuda112*"}),'. If you\nwant the slimmer "cpu-only" package, then you can install\n',(0,t.jsx)(n.code,{children:"tensorflow-cpu"})," directly or equivalently ",(0,t.jsx)(n.code,{children:"tensorflow==2.7.0=cpu*"}),". At\nthe time of writing (February 2022), on a machine without a GPU, one\nwould always get the ",(0,t.jsx)(n.code,{children:"-cpu"})," variant unless overriden like\nabove. This decision has been made to allow greater accessibility for\nusers with limited bandwidth and resources."]}),"\n",(0,t.jsx)(n.h2,{id:"thanks-to",children:"Thanks to"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Mark Harfouche (@hmaarrfk) & Ista Zahn (@izahn) for their initial\nwork on the TensorFlow GPU builds, and all other TensorFlow\nmaintainers. Uwe Korn (@xhochy) for his work on the Bazel scripts &\nTensorFlow -- and all the other maintainers of the ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/tensorflow-feedstock",children:"TensorFlow\nfeedstock"}),"!"]}),"\n",(0,t.jsx)(n.li,{children:"NVIDIA for pushing cudatoolkit and cudnn on conda-forge that makes\nthis possible"}),"\n",(0,t.jsx)(n.li,{children:"OVH for their generous sponsoring of large build machines that we\ncould use to build the recipes"}),"\n",(0,t.jsx)(n.li,{children:"Bloomberg for their sponsorship of QuantStack's involvement with\nconda-forge"}),"\n",(0,t.jsx)(n.li,{children:"Andreas Trawoger (@atrawog) for the Ansible scripts that this is\nbased on"}),"\n",(0,t.jsx)(n.li,{children:"Thorsten Beier (@derthorsten) and Adrien Delsalle (@adriendelsalle)\nfor their contributions to the recipe"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>l});var t=o(96540);const a={},s=t.createContext(a);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);