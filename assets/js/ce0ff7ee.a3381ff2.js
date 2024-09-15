"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[2586],{4788:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var i=s(74848),t=s(28453);const l={title:"2020-05-13"},a="2020-05-13 conda-forge core meeting",r={id:"minutes/2020-05-13",title:"2020-05-13",description:"Attendees",source:"@site/community/minutes/2020-05-13.md",sourceDirName:"minutes",slug:"/minutes/2020-05-13",permalink:"/community/minutes/2020-05-13",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-05-13.md",tags:[],version:"current",lastUpdatedAt:1726389641e3,frontMatter:{title:"2020-05-13"},sidebar:"community",previous:{title:"2020-05-27",permalink:"/community/minutes/2020-05-27"},next:{title:"2020-04-29",permalink:"/community/minutes/2020-04-29"}},o={},c=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"STUFF FOR THIS MEETING BETWEEN THESE HEADINGS",id:"stuff-for-this-meeting-between-these-headings",level:3},{value:"STUFF FOR THIS MEETING BETWEEN THESE HEADINGS",id:"stuff-for-this-meeting-between-these-headings-1",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"Stuff from last week that we didnt get to",id:"stuff-from-last-week-that-we-didnt-get-to",level:5},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",input:"input",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"2020-05-13-conda-forge-core-meeting",children:"2020-05-13 conda-forge core meeting"})}),"\n",(0,i.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"* Jonathan Helmus\n* Filipe Fernandes\n* Eric Dill\n* Michael Sarahan\n* Marcel Bargull\n* CJ Wright\n* Wolf Vollprecht\n* Ray Douglass\n* Keith Kraus\n* Cheng Lee\n* DJ Sutherland\n* Matthew Becker\n* Patrick Sodre\n* Lori Burns\n* Josh Adelman\n* Uwe Korn\n"})}),"\n",(0,i.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"(all) intros for new people on the line?"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Stuff from 2 meetings ago we didn't get to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["[CJ/Matt] R 4.0.0 migration is done\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"worked really well with automerge and mamba solvability checks"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["[CJ] Better understanding/handling of run_exports\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Particularly applicable to issues involving boost and header only deps ",(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/960",children:"https://github.com/regro/cf-scripts/issues/960"})]}),"\n",(0,i.jsx)(n.li,{children:"numpy too at some level"}),"\n",(0,i.jsx)(n.li,{children:"[FF] I asked Isuru about numpy and he mentioned that he does not have any technical problems with this but he believes it is confusing."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Stuff from last week we didn't get to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(CJ) adding a standing budget item to the agenda\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hackmd.io/LJ0qevsoQnKAMwBlQ1YQYA",children:"https://hackmd.io/LJ0qevsoQnKAMwBlQ1YQYA"})}),"\n",(0,i.jsx)(n.li,{children:"CJ owns this moving forward"}),"\n",(0,i.jsx)(n.li,{children:"Setup finance team to own this in the future"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["(Filipe) Enforce 2FA for GH / NF donations? bot / donations discussion in core gitter\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsx)(n.li,{children:"(Becker/Isuru) Stuff about bots and 2fa and phone numbers"}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Patrick TODO: figure out who needs to turn on 2fa and publicly shame them in core gitter channel."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["(eric) Quick chat about stuff from last time\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"do we need a follow-on more focused group for mingw stuff?"}),"\n",(0,i.jsx)(n.li,{children:"any other questions about Anaconda's TOS changes for repo.anaconda.com?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"stuff-for-this-meeting-between-these-headings",children:"STUFF FOR THIS MEETING BETWEEN THESE HEADINGS"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(CJ) instiutional partners metadata (",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/pull/1028",children:"https://github.com/conda-forge/conda-forge.github.io/pull/1028"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"(Filipe) GSOC student - CJ / Jonathan / Isuru are noted as mentored. Doing meetings with bot team."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"stuff-for-this-meeting-between-these-headings-1",children:"STUFF FOR THIS MEETING BETWEEN THESE HEADINGS"}),"\n",(0,i.jsx)(n.p,{children:"low-ish priority stuff to get to if we have time"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(n.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(n.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(n.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(n.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(n.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(n.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(n.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsx)(n.h5,{id:"stuff-from-last-week-that-we-didnt-get-to",children:"Stuff from last week that we didnt get to"}),"\n",(0,i.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(n.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(n.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(n.p,{children:"[MRB] FYI the blog pages got spruced up"}),"\n",(0,i.jsx)(n.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsx)(n.p,{children:"[MRB] FYI CFEP-13 roll out on ice until I can make the web server faster or switch to something else"}),"\n",(0,i.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(n.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(n.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(n.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(n.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(n.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (ED) schedule mirroring conversation"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) Merge all the pinnings PRs"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) Institutional Partners page in docs\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," TODO: Submit skeleton for PR into conda-forge.github.io repo"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Matt Becker) Update the docs with our current thinking / principles."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,i.jsx)(n.li,{children:"Remove conda forge readthedocs."}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>r});var i=s(96540);const t={},l=i.createContext(t);function a(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);