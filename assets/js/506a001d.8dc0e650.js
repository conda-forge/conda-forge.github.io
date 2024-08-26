"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[1496],{50655:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>a,toc:()=>r});var s=i(85893),t=i(11151);const l={title:"2019-09-18"},o="2019-09-18 conda-forge core meeting",a={id:"minutes/2019-09-18",title:"2019-09-18",description:"Attendees",source:"@site/community/minutes/2019-09-18.md",sourceDirName:"minutes",slug:"/minutes/2019-09-18",permalink:"/community/minutes/2019-09-18",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2019-09-18.md",tags:[],version:"current",lastUpdatedAt:172470405e4,frontMatter:{title:"2019-09-18"},sidebar:"community",previous:{title:"2019-10-02",permalink:"/community/minutes/2019-10-02"},next:{title:"2019-09-04",permalink:"/community/minutes/2019-09-04"}},c={},r=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"Make missing license_file an error",id:"make-missing-license_file-an-error",level:4},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"New Action items",id:"new-action-items",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",input:"input",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"2019-09-18-conda-forge-core-meeting",children:"2019-09-18 conda-forge core meeting"}),"\n",(0,s.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"CJ"}),"\n",(0,s.jsx)(n.li,{children:"Eric"}),"\n",(0,s.jsx)(n.li,{children:"Filipe"}),"\n",(0,s.jsx)(n.li,{children:"John K."}),"\n",(0,s.jsx)(n.li,{children:"Jonathan"}),"\n",(0,s.jsx)(n.li,{children:"Sophia C."}),"\n",(0,s.jsx)(n.li,{children:"Anthony"}),"\n",(0,s.jsx)(n.li,{children:"Ray D."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,s.jsx)(n.p,{children:"Pre-arranged stuff to talk about.\nEmail core team on Monday of the week of the dev meeting to ask for things to talk about."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["(CJ) CFEP5. Updated the proposal to reflect the desire for a ",(0,s.jsx)(n.code,{children:"rc_<packagename>"})," or ",(0,s.jsx)(n.code,{children:"<packagename>_rc"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Filipe: Update the issue with discussion during call when finished with conference."}),"\n",(0,s.jsx)(n.li,{children:"CJ: Hot potato! you own this cfep now"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,s.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(CJ) updates to the bot database structure"}),"\n",(0,s.jsxs)(n.li,{children:["(CJ) piggy back migrations proposal\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["e.g., Converting python package installs from ",(0,s.jsx)(n.code,{children:"python setup.py install"})," to ",(0,s.jsx)(n.code,{children:"pip install <more stuff>"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"(CJ) cfep9 update"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,s.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,s.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,s.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["(Filipe, Dougal) How can we get users to engage us and open issues?\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/852",children:"https://github.com/conda-forge/conda-forge.github.io/issues/852"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(Marius, Isuru) Azure migration update?"}),"\n",(0,s.jsxs)(n.li,{children:["Do we want to roll out ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-smithy/issues/1131",children:"https://github.com/conda-forge/conda-smithy/issues/1131"})," to all feedstocks?"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Update to clang 8.0.1 and gfortran 7.3.0 on OSX\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"No rebuild necessary. (Rebuild for gfortran 7.3.0 is already done. We build with 7.3.0 and 4.8.5)"}),"\n",(0,s.jsx)(n.li,{children:"This should be pain free except for some packages that do -Wall -Werror."}),"\n",(0,s.jsx)(n.li,{children:"We get better compilers."}),"\n",(0,s.jsx)(n.li,{children:"We don't have to rely on defaults as we build these in conda-forge CI."}),"\n",(0,s.jsx)(n.li,{children:"We get a linker that supports .tbds .\n(new linker might work with older compiler, but not sure about packages compiled with -flto)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"make-missing-license_file-an-error",children:"Make missing license_file an error"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["We merged ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-smithy/pull/1102",children:"https://github.com/conda-forge/conda-smithy/pull/1102"})," in the feedstock\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(Isuru) - It's illegal to not package the license file in most licenses, so we should strictly enforce this."}),"\n",(0,s.jsxs)(n.li,{children:["1268 feedstocks with no license files (some may not require a license file)\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["(Isuru) - PR to conda-smithy was to enforce this for GPL, BSD, MIT, Apache only\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-smithy/pull/1098",children:"https://github.com/conda-forge/conda-smithy/pull/1098"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"(Scopatz) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["(John K.) Three hard problems regarding licensing\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"not all packages even include a license file"}),"\n",(0,s.jsx)(n.li,{children:"people in the community are resistant to packaging license files"}),"\n",(0,s.jsx)(n.li,{children:"we already have packges in our ecosystem that do not have"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Eric) Scheduling Anaconda <> conda-forge sync on anaconda.org requirements gathering"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["(Sophia) New conda environments. What do you like? What do you hate? What are we still missing? ",(0,s.jsx)(n.a,{href:"https://docs.google.com/document/d/1-XNmPJJ0XqNW5CZm7nHwCzOSOs3PdiuOCUmJ8Yuimz0/edit?usp=sharing",children:"Workflows"}),", ",(0,s.jsx)(n.a,{href:"https://docs.google.com/document/d/1eV4fRezxHu2lg-foVRv2gq56KEbrnaA8J_14uX31ja0/edit?usp=sharing",children:"Condafile"}),", ",(0,s.jsx)(n.a,{href:"https://docs.google.com/document/d/17gum3j1DKcy2ygapP982879NAa7sM9ihLQ-sPOdzRVc/edit?usp=sharing",children:"CLI"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Filipe) A closer collaboration with other packaging communities would be awesome. I guess that we don't have a good means for that kind of communication at the moment. Gitter is high volume, our mailing list never cought on, and an email thread may get stale quickly or we may drop people accidentally. TL;DR maybe we should invite them to our meeting call. Filipe to ping Bjorn -- maybe we can get both Bjorn and debian on a dev meeting"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Eric) Email out to see if we can get more engagement on regular dev meetings."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,s.jsx)(n.p,{children:"Notes from todays dev meeting"}),"\n",(0,s.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,s.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,s.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Filipe) Progress on setting up a self-hosted blog"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Medium seems to be generally downvoted"}),"\n",(0,s.jsx)(n.li,{children:"Host your own blog seems to be generally positive"}),"\n",(0,s.jsxs)(n.li,{children:["Can we mimic what Dask does for their dev blog? ",(0,s.jsx)(n.a,{href:"https://github.com/dask/dask-blog",children:"https://github.com/dask/dask-blog"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Needs Owner) Searching on our website is a little difficult"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0}),' (Filipe, Anthony) Improve docs on releasing conda-smithy. Currently says "use rever". Would be good to fill out more info there for those of us that are unfamiliar with rever.']}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Filipe, Anthony) conda-smithy release."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," John K: Create, or link, google doc with survey questions"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Anthony and Filipe: conda smithy release for linux-armv7l"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,s.jsx)(n.p,{children:"Unresolved action items in this heading will be moved to issues on conda-forge.github.io"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Mike S.:  pypy Next steps: Say yes / no to the spec, point out potential pitfalls, give it back to (Matti?) and say here's the work that needs to be done.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["(Eric) Opened up issue: ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/867",children:"https://github.com/conda-forge/conda-forge.github.io/issues/867"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Marius: Open issue on conda-forge.github.io noting work done on the kubernetes cluster. Did some kubernetes work at scipy.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["(Eric) Opened up issue: ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/868",children:"https://github.com/conda-forge/conda-forge.github.io/issues/868"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Marius: reach out to internal IT to clean up some Zoom hiccups. Still in progress 2019-09-04"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"new-action-items",children:"New Action items"}),"\n",(0,s.jsx)(n.p,{children:"Copy new action items to next meetings agenda so we can check in.\nMake sure each action item is assigned to someone or it will likely not get done."}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Email out to see if we can get more engagement on regular dev meetings."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Sophia) Set up meeting to talk about Condafile stuff."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) write blog post on bot work and compiler migration"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Filipe) Ping Bjorn to try and get Debian community more involved with conda-forge"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <> conda-forge sync on anaconda.org requirements gathering"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>o});var s=i(67294);const t={},l=s.createContext(t);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);