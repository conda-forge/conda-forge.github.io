"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[7914],{19797:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var s=t(85893),o=t(11151);const a={title:"2016-04-15"},i="2016-04-15",r={id:"orga/minutes/2016-04-15",title:"2016-04-15",description:"How to manage agendas & meetings?",source:"@site/docs/orga/minutes/2016-04-15.md",sourceDirName:"orga/minutes",slug:"/orga/minutes/2016-04-15",permalink:"/docs/orga/minutes/2016-04-15",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/orga/minutes/2016-04-15.md",tags:[],version:"current",lastUpdatedAt:1710088023,formattedLastUpdatedAt:"Mar 10, 2024",frontMatter:{title:"2016-04-15"},sidebar:"docs",previous:{title:"2016-04-22",permalink:"/docs/orga/minutes/2016-04-22"},next:{title:"Glossary",permalink:"/docs/glossary"}},d={},c=[{value:"How to manage agendas &amp; meetings?",id:"how-to-manage-agendas--meetings",level:2},{value:"Stats on conda-forge",id:"stats-on-conda-forge",level:2},{value:"Next meeting",id:"next-meeting",level:2},{value:"External developers to github.com/continuum repos",id:"external-developers-to-githubcomcontinuum-repos",level:2},{value:"Centos5 vs Centos6",id:"centos5-vs-centos6",level:2},{value:"Features and feedstocks",id:"features-and-feedstocks",level:2},{value:"NetCDF",id:"netcdf",level:2},{value:"Windows VC feature",id:"windows-vc-feature",level:2},{value:"Documentation",id:"documentation",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"2016-04-15",children:"2016-04-15"}),"\n",(0,s.jsx)(n.h2,{id:"how-to-manage-agendas--meetings",children:"How to manage agendas & meetings?"}),"\n",(0,s.jsx)(n.p,{children:"use hackpad for agenda, repo for minutes"}),"\n",(0,s.jsxs)(n.p,{children:["Agenda hackpad: ",(0,s.jsx)(n.a,{href:"https://hackpad.com/conda-forge-meeting-notes-WZIa4PBQ6sz",children:"https://hackpad.com/conda-forge-meeting-notes-WZIa4PBQ6sz"})]}),"\n",(0,s.jsx)(n.h2,{id:"stats-on-conda-forge",children:"Stats on conda-forge"}),"\n",(0,s.jsx)(n.p,{children:"google analytics says 500 unique visitors to conda-forge\nPackaging\n300-ish feedstocks in conda-forge\n600-ish packages at continuum"}),"\n",(0,s.jsx)(n.p,{children:"1126 packages on conda-recipes (918 non-r), though some are repeats (e.g. python2 vs python3)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"import os\npackages = [f1 for f1, f2, f3, in os.walk('conda-recipes') if 'meta.yaml' in f3]\nprint(len(packages))\n\n$ find . -name \"meta.yaml\" | wc -l\n    1126\n"})}),"\n",(0,s.jsx)(n.h2,{id:"next-meeting",children:"Next meeting"}),"\n",(0,s.jsx)(n.p,{children:"2016-04-29 14:00 UTC"}),"\n",(0,s.jsx)(n.h2,{id:"external-developers-to-githubcomcontinuum-repos",children:"External developers to github.com/continuum repos"}),"\n",(0,s.jsxs)(n.p,{children:["In particular, the heroku build pack. ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-webservices",children:"https://github.com/conda-forge/conda-forge-webservices"})," is using neither the Continuum one, nor the one written by the Heroku product owner."]}),"\n",(0,s.jsx)(n.p,{children:"No precedent for non Continuum contributors yet. We would love to have a canonical conda buildpack."}),"\n",(0,s.jsx)(n.h2,{id:"centos5-vs-centos6",children:"Centos5 vs Centos6"}),"\n",(0,s.jsx)(n.p,{children:"conda and conda-build are hopefully to be upgraded to understand the glibc version"}),"\n",(0,s.jsx)(n.p,{children:"conda will be upgraded to provide analytics to anaconda.org on the glibc version of the requestor to feed information about the systems people are installing onto"}),"\n",(0,s.jsx)(n.p,{children:"Suggested that one standardizes the syntax on the build commands, not the images that are used to build"}),"\n",(0,s.jsx)(n.h2,{id:"features-and-feedstocks",children:"Features and feedstocks"}),"\n",(0,s.jsx)(n.p,{children:"figuring out how you select a library that implements a common features set"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["single repo for numpy and use selectors/features/branches to control how things get built\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"mild-preference for single repo with selectors to toggle"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"netcdf",children:"NetCDF"}),"\n",(0,s.jsx)(n.p,{children:'Q: How should we manage multiple "features" within it (e.g. compiled with/without OpenDAP)'}),"\n",(0,s.jsx)(n.p,{children:"If possible, build as much as possible, but only provide the sensible run-time dependencies. Adding further dependencies would enable more functionality."}),"\n",(0,s.jsx)(n.p,{children:'In practice, that is sometimes not possible (e.g. a required .so is missing), in which case, we will need to be able toggle different build "variants". @msarahan suggested that the conda features concept may not  be the best way of solving this.'}),"\n",(0,s.jsx)(n.h2,{id:"windows-vc-feature",children:"Windows VC feature"}),"\n",(0,s.jsx)(n.p,{children:"There is no strong candidate for going forwards at this point. Suggestion is to investigate some more, and @msarahan, @jakirkham and @pelson to reconvene on 2016-04-22 at 14:00 UTC (though previously advertised for the 21st) to discuss specifically this issue."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Features are intended to standardize packages that need certain things across your installed packages"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"if you install a package that tracks the vc9 feature and one that tracks the vc10 feature and both get installed, conda will fall over and forget how to resolve dependencies and both will get installed?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"vc## features should never be added as a runtime requirement?"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,s.jsx)(n.p,{children:"add a folder in the conda-forge.github.io git repo"}),"\n",(0,s.jsx)(n.p,{children:"A: John to add guidelines"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.p,{children:"Next planned meeting is 2016-04-29 at 14:00 UTC"})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var s=t(67294);const o={},a=s.createContext(o);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);