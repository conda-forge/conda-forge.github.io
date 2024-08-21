"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3998],{48789:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var o=t(85893),s=t(11151);const r={},i="Sunsetting PyPy support",a={permalink:"/news/2024/08/14/sunsetting-pypy",source:"@site/news/2024-08-14-sunsetting-pypy.md",title:"Sunsetting PyPy support",description:"TL;DR: We are planning to remove PyPy from conda-forge feedstock recipes in a",date:"2024-08-14T00:00:00.000Z",tags:[],hasTruncateMarker:!0,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"Removing wheel and setuptools as Dependencies for pip",permalink:"/news/2024/08/21/sunsetting-pip-deps"},nextItem:{title:"Sunsetting Mambaforge",permalink:"/news/2024/07/29/sunsetting-mambaforge"}},p={authorsImageUrls:[]},l=[];function c(e){const n={a:"a",p:"p",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"TL;DR: We are planning to remove PyPy from conda-forge feedstock recipes in a\nfew weeks (and thus to stop building new releases of packages for PyPy), unless\nthere is substantial enough interest to justify the continued maintenance effort."}),"\n",(0,o.jsxs)(n.p,{children:["Conda-forge introduced ",(0,o.jsx)(n.a,{href:"https://conda-forge.org/blog/2020/03/10/pypy/",children:"support"}),"\nfor ",(0,o.jsx)(n.a,{href:"https://pypy.org/index.html",children:"PyPy"})," as an alternative implementation of\nPython about 4.5 years ago."]}),"\n",(0,o.jsx)(n.p,{children:"In that time we have worked hard together with developers from PyPy to provide\neasily installable pre-compiled builds of the most common libraries also for PyPy."}),"\n",(0,o.jsx)(n.p,{children:"As a very positive side-effect, the infrastructure of conda-forge is now fully\nequipped to deal with alternative implementations of the Python interpreter,\nwhich will continue to be useful (for example for supporting the experimental\nfree-threading builds of CPython 3.13)."}),"\n",(0,o.jsx)(n.p,{children:"However, due to a lack of resources \u2013 both in terms of expertise for PyPy, as\nwell as available time of those who can help \u2013 the conda-forge builds for PyPy\npackages have been in minimal maintenance for a while (for example, we never\nmigrated for PyPy 3.10, nor did PyPy participate in the NumPy 2.0 migration)."}),"\n",(0,o.jsx)(n.p,{children:"As a consequence, we unfortunately need to announce that we are sunsetting\nsupport for PyPy. This means we will stop the long-running migrator to add\nPyPy to new feedstocks, and we will begin removing PyPy builds from feedstocks\nat the latest on October 1st, or when we begin migrating for CPython 3.13\n(whichever comes earlier)."}),"\n",(0,o.jsxs)(n.p,{children:["If you are depending on PyPy builds in some way, please let us know about the\nspecifics of your situation in the discussion issue for the\n",(0,o.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/2255",children:"RFC"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"There is a possibility that we receive the necessary support from the PyPy\ndevelopers, if it turns out that enough people depend on PyPy support in\nconda-forge for it to be worth their time. As such, please speak up if you\nfall into this category!"}),"\n",(0,o.jsx)(n.p,{children:"Finally, no matter the outcome, we want to congratulate the PyPy developers\nfor their important contributions and exploration of what is possible in the\nPython ecosystem! \ud83d\udc4f"}),"\n",(0,o.jsx)(n.p,{children:"It has been a pleasure to collaborate!"})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>i});var o=t(67294);const s={},r=o.createContext(s);function i(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);