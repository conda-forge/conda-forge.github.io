"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[5141],{31972:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var t=s(85893),i=s(11151);const o={title:"2018-03-20"},a="2018-03-20 conda-forge meeting",r={id:"minutes/2018-03-20",title:"2018-03-20",description:"Attendence: Eric, CJ, John, Michael, Jonathan, Filipe",source:"@site/community/minutes/2018-03-20.md",sourceDirName:"minutes",slug:"/minutes/2018-03-20",permalink:"/community/minutes/2018-03-20",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2018-03-20.md",tags:[],version:"current",lastUpdatedAt:1714652140,formattedLastUpdatedAt:"May 2, 2024",frontMatter:{title:"2018-03-20"},sidebar:"community",previous:{title:"2018-04-03",permalink:"/community/minutes/2018-04-03"},next:{title:"2018-03-06",permalink:"/community/minutes/2018-03-06"}},l={},c=[];function h(e){const n={a:"a",h1:"h1",hr:"hr",img:"img",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"2018-03-20-conda-forge-meeting",children:"2018-03-20 conda-forge meeting"}),"\n",(0,t.jsx)(n.p,{children:"Attendence: Eric, CJ, John, Michael, Jonathan, Filipe"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Policy for pulling/moving packages to broken"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Okay with current setup but when package is part of the stack should be more careful."}),"\n",(0,t.jsx)(n.li,{children:"Use conda verify to catch some of the issue that cause us to pull packages."}),"\n",(0,t.jsxs)(n.li,{children:["pip 9.0.2 ",(0,t.jsx)(n.a,{href:"https://github.com/pypa/pip/issues/5081",children:"https://github.com/pypa/pip/issues/5081"})," and ",(0,t.jsx)(n.a,{href:"https://gitter.im/conda-forge/conda-forge.github.io?at=5ab12c6b6f8b4b99464b3c37",children:"https://gitter.im/conda-forge/conda-forge.github.io?at=5ab12c6b6f8b4b99464b3c37"})]}),"\n",(0,t.jsx)(n.li,{children:"Should new version of packages with API incompatible changes should we hold off upgrades for the benefit of the ecosystem?"}),"\n",(0,t.jsx)(n.li,{children:"Many linux distributions avoid this by having a testing vs stable"}),"\n",(0,t.jsxs)(n.li,{children:["Document policy, open issue to track long term plan  Eric/Jonathan/John\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"stable repository of packages or latest versions that might be broken?"}),"\n",(0,t.jsxs)(n.li,{children:["Related (old) proposal: ",(0,t.jsx)(n.a,{href:"https://paper.dropbox.com/doc/Staged-Releases-r9My2gvS5vb2VMIlf3xue",children:"+Staged Releases"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"Is conda forge a place where we make a good-faith effort to have interoperable packages or a place where we allow developers to release their code without as much concern for how well those packages interoperate? (This feels like a CFEP)"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Policy for orphan packages (packages with no maintainer)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"archive the repository (this blocks pull requests)"}),"\n",(0,t.jsxs)(n.li,{children:["what do we do with the packages ?\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"They are unmaintained and are not getting security updates."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Options:\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Have the core team maintain the package indefinitely"}),"\n",(0,t.jsx)(n.li,{children:"Have a group of foster maintainers who can help."}),"\n",(0,t.jsx)(n.li,{children:'Have the bot look for recipes that have no maintainers, add an issue to that repo that says "this package is unmaintained and will be archived in 90 days. post here if you want to be a maintainer or submit a PR that adds you as a maintainer blah blah blah"'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["ref: ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/539",children:"https://github.com/conda-forge/conda-forge.github.io/issues/539"})]}),"\n",(0,t.jsx)(n.li,{children:'All the bob-feedstocks are archived and the bob-packages were moved to "broken" label.'}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Creation of staged-recipes subteams for different languages"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["TODOs\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"PR template that enumerates who to ping for each team"}),"\n",(0,t.jsx)(n.li,{children:"Add to the docs on conda-forge.orgT"}),"\n",(0,t.jsx)(n.li,{children:"Make the subteams [Done]"}),"\n",(0,t.jsx)(n.li,{children:"Make issue for people to tell us which subteams they want to be on [Done]"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"We\u2019ll try zoom for the next meeting:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Zoom can handle more people than Hangouts"}),"\n",(0,t.jsxs)(n.li,{children:["Zoom needs native client, does include linux (linux: ",(0,t.jsx)(n.a,{href:"https://support.zoom.us/hc/en-us/articles/204206269-Linux-Installation",children:"https://support.zoom.us/hc/en-us/articles/204206269-Linux-Installation"}),")"]}),"\n",(0,t.jsx)(n.li,{children:"Try Zoom next week, see which is better"}),"\n",(0,t.jsxs)(n.li,{children:['join the "ericdill" meeting\n',(0,t.jsx)(n.img,{src:"https://d2mxuefqeaa7sj.cloudfront.net/s_57464F4B7415C9BBE96DB47EA828626069A32FB50D4583E364666C6B96187A80_1520365117191_Screen+Shot+2018-03-06+at+2.34.23+PM.png",alt:""}),"\n",(0,t.jsx)(n.img,{src:"https://d2mxuefqeaa7sj.cloudfront.net/s_57464F4B7415C9BBE96DB47EA828626069A32FB50D4583E364666C6B96187A80_1520365117172_Screen+Shot+2018-03-06+at+2.34.32+PM.png",alt:""})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Go over ",(0,t.jsx)(n.a,{href:"https://paper.dropbox.com/doc/AnacondaCon-agenda-uBSJ4E3ZOVWMkej0w6zfe",children:"+AnacondaCon agenda"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Win32 poll results: ",(0,t.jsx)(n.a,{href:"https://docs.google.com/forms/d/1DbPWfHw1AhYWNsfsYzEo1AxZzKOpxoc-b7zaqY_AMls/edit?usp=sharing",children:"https://docs.google.com/forms/d/1DbPWfHw1AhYWNsfsYzEo1AxZzKOpxoc-b7zaqY_AMls/edit?usp=sharing"}),"\n91 responses, 5 are using Win32, only 1 is using Win32 exclusively."]}),"\n",(0,t.jsx)(n.li,{children:"Collaboration (or at least communication) with the pypi/warehouse devs"}),"\n",(0,t.jsxs)(n.li,{children:["How do we want the bot to handle non-release releases (alpha/beta/dev/pre/etc.) ",(0,t.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/86",children:"https://github.com/regro/cf-scripts/issues/86"})," and ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3",children:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3"})," and ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/matplotlib-feedstock/pull/24#issuecomment-221496870",children:"https://github.com/conda-forge/matplotlib-feedstock/pull/24#issuecomment-221496870"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"conda-forge-pre?"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"John suggested (on gitter) that we reach out to intel and NVIDIA to get copies of their toolchains and development libraries."}),"\n",(0,t.jsxs)(n.li,{children:["Adding people to cf/staged-recipes\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Marius van Niekerk offered to help review on staged-recipes"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Optionally building wheels for some packages. ( ",(0,t.jsx)(n.a,{href:"https://github.com/conda-forge/conda-smithy/issues/608",children:"https://github.com/conda-forge/conda-smithy/issues/608"})," )"]}),"\n",(0,t.jsx)(n.li,{children:"flit install as build step?"}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var t=s(67294);const i={},o=t.createContext(i);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);