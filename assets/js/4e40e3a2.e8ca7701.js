"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[7538],{13831:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>a});var s=i(85893),l=i(11151);const t={title:"2019-10-30"},o="2019-10-30 conda-forge core meeting",r={id:"orga/minutes/2019-10-30",title:"2019-10-30",description:"Attendees",source:"@site/docs/orga/minutes/2019-10-30.md",sourceDirName:"orga/minutes",slug:"/orga/minutes/2019-10-30",permalink:"/docs/orga/minutes/2019-10-30",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/orga/minutes/2019-10-30.md",tags:[],version:"current",lastUpdatedAt:1710088023,formattedLastUpdatedAt:"Mar 10, 2024",frontMatter:{title:"2019-10-30"},sidebar:"docs",previous:{title:"2019-11-12",permalink:"/docs/orga/minutes/2019-11-12"},next:{title:"2019-10-16",permalink:"/docs/orga/minutes/2019-10-16"}},d={},a=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"cfep-03 Manual upload of builds",id:"cfep-03-manual-upload-of-builds",level:4},{value:"cfep-04 X11 and CDT policy",id:"cfep-04-x11-and-cdt-policy",level:4},{value:"cfep-05 dev/rc builds",id:"cfep-05-devrc-builds",level:4},{value:"cfep-06 Staged-recipes review lifecycle",id:"cfep-06-staged-recipes-review-lifecycle",level:4},{value:"cfep-08 Too Big To Fail",id:"cfep-08-too-big-to-fail",level:4},{value:"cfep-10 Feedstock statuses, unmaintained",id:"cfep-10-feedstock-statuses-unmaintained",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"4 meetings ago",id:"4-meetings-ago",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",input:"input",li:"li",p:"p",ul:"ul",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"2019-10-30-conda-forge-core-meeting",children:"2019-10-30 conda-forge core meeting"}),"\n",(0,s.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Eric D."}),"\n",(0,s.jsx)(n.li,{children:"Marcel"}),"\n",(0,s.jsx)(n.li,{children:"Filipe"}),"\n",(0,s.jsx)(n.li,{children:"Jonathan"}),"\n",(0,s.jsx)(n.li,{children:"Sophia C."}),"\n",(0,s.jsx)(n.li,{children:"John K."}),"\n",(0,s.jsx)(n.li,{children:"Dougal"}),"\n",(0,s.jsx)(n.li,{children:"Marius"}),"\n",(0,s.jsx)(n.li,{children:"Mike S."}),"\n",(0,s.jsx)(n.li,{children:"CJ"}),"\n",(0,s.jsx)(n.li,{children:"Lori"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,s.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Eric) What's everyone going to be for Halloween?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Game of Thornes end episode writter (Filipe)"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Eric) Scheduling a time that's more convienent for folks in other time zones. Quick vote and I'll schedule it"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"10:00 UTC (6:00 EDT)"}),"\n",(0,s.jsx)(n.li,{children:"12:00 UTC (8:00 EDT)"}),"\n",(0,s.jsx)(n.li,{children:"17:00 UTC (13:00 EDT) (current meeting time)"}),"\n",(0,s.jsx)(n.li,{children:"We don't need to reschedule to accomodate. Filipe wanted to accomodate some others in other time zones but they've sort of disappeared"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Filipe) Discussion NumFOCUS PEX cards. Do we need it? Should we order one?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Opinion: we should avoid these and just do better planning. Worst case"}),"\n",(0,s.jsx)(n.li,{children:"What about recurring costs? For recurring costs, NumFocus can pay these for us so we should plan ahead and get them to do that."}),"\n",(0,s.jsx)(n.li,{children:"Conclusion: Better planning."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Filipe) Updated on the new SGD submission."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Small Grants Development (SGD)"}),"\n",(0,s.jsx)(n.li,{children:"to foster some work on conda-skeleton and regenerating recipes. This is to do what bioconda folks are already doing. This will help us be better about dependency tracking and metadata updates"}),"\n",(0,s.jsx)(n.li,{children:"Filipe is planning on paying someone to do this work (Marcelo Trevisani)"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Filipe) Strategies to catch up with Qt releases."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(Isuru) Qt 5.12 is an LTS release with EOL in Dec 2021. This is what is packaged in conda-forge."}),"\n",(0,s.jsx)(n.li,{children:"(Isuru) Qt 5.13 is a regular release with EOL in one year usually. (June 2020)"}),"\n",(0,s.jsxs)(n.li,{children:["We should be building Qt more regularly. How do we achieve this? Provisioning Windows Azure VMs seems like the best path forward.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"We'd need to make an Azure org (or whatever their term is) and then distribute credentials"}),"\n",(0,s.jsx)(n.li,{children:"We should consider talking to Microsoft about help doing this on Azure."}),"\n",(0,s.jsx)(n.li,{children:"Marius will run point on these conversations this week at NumFocus Summit and PyData."}),"\n",(0,s.jsx)(n.li,{children:"Get updates from Marius at next dev meeting."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(CJ) Any NumFOCUS summit things: (from NumFOCUS) We ask that our more senior projects come prepared to briefly share any recent project news or experiences that would be of value for others to learn about. Things like:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Funding successes or failures"}),"\n",(0,s.jsx)(n.li,{children:"Major governance changes and their impact"}),"\n",(0,s.jsx)(n.li,{children:"Initiatives taken to increase diversity and inclusion in your project and their results"}),"\n",(0,s.jsx)(n.li,{children:"Any experiences that other projects could learn from"}),"\n",(0,s.jsx)(n.li,{children:"(Eric) Send out email to conda-forge group asking for feedback on these points."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(CJ) pydata nyc lightning talk for CF, Tom asked for a short something"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Anthony said he'd take this"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(John) Aligning on GPU packages between CF and defaults"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["NCCL\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(pronounced: Nickel)"}),"\n",(0,s.jsxs)(n.li,{children:["Defaults is still on 1\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will likely update when one of our deps needs it."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Many things don't work without 2 (or even newer)"}),"\n",(0,s.jsx)(n.li,{children:"Now in CF at version 2.4"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["CuPy\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Recently added to conda-forge"}),"\n",(0,s.jsx)(n.li,{children:"PfN (Preferred Networks) taking over maintenance of the feedstock"}),"\n",(0,s.jsxs)(n.li,{children:["Defaults is still on 6.0.0 (latest is 6.5.0)\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Building is really hard on windows and this is what the hold-up is on the Anaconda side."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["xgboost\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Currently CPU only in conda-forge"}),"\n",(0,s.jsxs)(n.li,{children:["Would like to add GPU builds to conda-forge\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/xgboost-feedstock/issues/26",children:"https://github.com/conda-forge/xgboost-feedstock/issues/26"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Selection between CPU/GPU can be simplified\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/xgboost-feedstock/issues/23",children:"https://github.com/conda-forge/xgboost-feedstock/issues/23"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/xgboost-feedstock/pull/35",children:"https://github.com/conda-forge/xgboost-feedstock/pull/35"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["ppc64le and aarch64\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Currently no aarch64 cudatoolkit packages"}),"\n",(0,s.jsxs)(n.li,{children:["ppc64le cudatoolkit packages out-of-date (currently at 9.0)\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Anaconda would have much more success getting newer packages out if the recipe was updated -- the holdup is finding where all the shared libraries moved to."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"NVIDIA Docker images exist for ppc64le"}),"\n",(0,s.jsx)(n.li,{children:"NVIDIA Docker images in the works for aarch64"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Marius) Kubernetes build update"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Can build cupy on a transient kubernetes gpu cluster."}),"\n",(0,s.jsx)(n.li,{children:"Preliminary results feel positive."}),"\n",(0,s.jsx)(n.li,{children:"maybe we have blog post #2 right here?"}),"\n",(0,s.jsx)(n.li,{children:"All of this work is happening on GKE. Would be good to try and\nget this ported over to Azure, maybe."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(CJ) Should conda-forge ship ARM / aarch64 conda-forge miniconda installers?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Anaconda builds ppc packages and provides anaconda / miniconda installer"}),"\n",(0,s.jsxs)(n.li,{children:["Should conda-forge build these?\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"There's no one on this conda-forge call that actually wants to own\nthe maintenance burden of this."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"(Filipe) Python 3.8 made it to defaults"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'(Mike): "sort of" made it to defaults. We only have py3.8 available right now.'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,s.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(CJ) ROS (robot operating system) integrated with auto tick bot (mostly, they didn't jinja2 their urls causing problems)"}),"\n",(0,s.jsx)(n.li,{children:"(CJ) The bot now handles multi-output recipes properly, should make migrations go better"}),"\n",(0,s.jsx)(n.li,{children:"(CJ) CircleCI run URLs are now in bot commits, and comments making debug easier"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,s.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,s.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,s.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,s.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,s.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,s.jsx)(n.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,s.jsx)(n.p,{children:"How do we start getting traction on these?"}),"\n",(0,s.jsxs)(n.h4,{id:"cfep-03-manual-upload-of-builds",children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/5",children:"cfep-03"})," Manual upload of builds"]}),"\n",(0,s.jsxs)(n.h4,{id:"cfep-04-x11-and-cdt-policy",children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,s.jsxs)(n.h4,{id:"cfep-05-devrc-builds",children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3",children:"cfep-05"})," dev/rc builds"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(Eric) I think there's been some discussion on cfep-05 recently. Maybe @cj can give us an update"}),"\n",(0,s.jsxs)(n.li,{children:["(CJ) I think the main stall here is if we can get ",(0,s.jsx)(n.code,{children:".../label/rc/matplotlib"})," to be a valid anaconda.org path"]}),"\n",(0,s.jsxs)(n.li,{children:["(CJ, John K.) also are dev labels provided on a per package or per feedstock level (should we have a ",(0,s.jsx)(n.code,{children:".../rc/gdal"})," and ",(0,s.jsx)(n.code,{children:".../rc/libgdal"}),")\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(Eric) We should implement this in whatever way is as simple as possible for the conda-forge tooling ecosystem. If there is enough of sentiment that they want"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.h4,{id:"cfep-06-staged-recipes-review-lifecycle",children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,s.jsx)(n.h4,{id:"cfep-08-too-big-to-fail",children:"cfep-08 Too Big To Fail"}),"\n",(0,s.jsxs)(n.h4,{id:"cfep-10-feedstock-statuses-unmaintained",children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,s.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,s.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,s.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,s.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Filipe) CFEP-03: Review, fix any text and merge it in.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Minor updates that are needed. This will likely get done in December."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) CFEP-08: Merge in with deferred status\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will check in next meeting."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,s.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Email out to see if we can get more engagement on regular dev meetings."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Sophia) Set up meeting to talk about Condafile stuff.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will punt on this until she's working on this actively again"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Filipe) Ping Bjorn to try and get Debian community more involved with conda-forge\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Going to drop this from our tracker"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"4-meetings-ago",children:"4 meetings ago"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Filipe) Progress on setting up a self-hosted blog\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Medium seems to be generally downvoted"}),"\n",(0,s.jsx)(n.li,{children:"Host your own blog seems to be generally positive"}),"\n",(0,s.jsxs)(n.li,{children:["Can we mimic what Dask does for their dev blog? ",(0,s.jsx)(n.a,{href:"https://github.com/dask/dask-blog",children:"https://github.com/dask/dask-blog"})]}),"\n",(0,s.jsxs)(n.li,{children:["Moved to github issue ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/916",children:"https://github.com/conda-forge/conda-forge.github.io/issues/916"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Needs Owner) Searching on our website is a little difficult"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0}),' (Filipe, Anthony) Improve docs on releasing conda-smithy. Currently says "use rever". Would be good to fill out more info there for those of us that are unfamiliar with rever.']}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>o});var s=i(67294);const l={},t=s.createContext(l);function o(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);