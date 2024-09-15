"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3835],{87123:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>r});var i=n(74848),t=n(28453);const l={title:"2020-06-22"},a="2020-06-22 conda-forge core meeting",o={id:"minutes/2020-06-22",title:"2020-06-22",description:"Attendees",source:"@site/community/minutes/2020-06-22.md",sourceDirName:"minutes",slug:"/minutes/2020-06-22",permalink:"/community/minutes/2020-06-22",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-06-22.md",tags:[],version:"current",lastUpdatedAt:1726389641e3,frontMatter:{title:"2020-06-22"},sidebar:"community",previous:{title:"2020-07-01",permalink:"/community/minutes/2020-07-01"},next:{title:"2020-05-27",permalink:"/community/minutes/2020-05-27"}},c={},r=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"Stuff from last week that we didnt get to",id:"stuff-from-last-week-that-we-didnt-get-to",level:5},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",input:"input",li:"li",p:"p",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"2020-06-22-conda-forge-core-meeting",children:"2020-06-22 conda-forge core meeting"})}),"\n",(0,i.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Eric D"}),"\n",(0,i.jsx)(s.li,{children:"Filipe"}),"\n",(0,i.jsx)(s.li,{children:"Uwe"}),"\n",(0,i.jsx)(s.li,{children:"Jonathan Helmus"}),"\n",(0,i.jsx)(s.li,{children:"Kirkham"}),"\n",(0,i.jsx)(s.li,{children:"Matt B."}),"\n",(0,i.jsx)(s.li,{children:"Anthony Scopatz"}),"\n",(0,i.jsx)(s.li,{children:"Lori"}),"\n",(0,i.jsx)(s.li,{children:"Cheng Lee"}),"\n",(0,i.jsx)(s.li,{children:"Ray Douglass"}),"\n",(0,i.jsx)(s.li,{children:"Keith Kraus"}),"\n",(0,i.jsx)(s.li,{children:"Sylvain"}),"\n",(0,i.jsx)(s.li,{children:"Mike Sarahan"}),"\n",(0,i.jsx)(s.li,{children:"Wolf"}),"\n",(0,i.jsx)(s.li,{children:"Isuru"}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(s.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (anyone) intros for new people on the line?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) NumFOCUS updates on GH 2FA, Google Drive, and AWS"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"GitHub 2FA issue has been resolved (only needed for core members)"}),"\n",(0,i.jsx)(s.li,{children:"Donors names and addresses are in NumFocus Google Drive"}),"\n",(0,i.jsxs)(s.li,{children:["Need to respond to NumFocus on possible AWS usage, deadline has passed. The purpose here was to get credits for CF to use on AWS\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Can send a note to Leah"}),"\n",(0,i.jsx)(s.li,{children:"maybe get credits for AWS workspaces for windows machines? This would help with debugging windows stuff. Also have aarch64 machines. Edit the following doc if you've got ideas for how do to stuff with AWS. Next week Filipe will send an email to Leah / NumFocus"}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://hackmd.io/bXUZ8a08SBeTs4t9fVXR4A?edit",children:"https://hackmd.io/bXUZ8a08SBeTs4t9fVXR4A?edit"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Scipy BoF, sprint, and members attendance/presentations."]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"CJ/Marius will be handling packaging BoF."}),"\n",(0,i.jsx)(s.li,{children:"Anyone to handle sprints?"}),"\n",(0,i.jsxs)(s.li,{children:["Anyone submitting talks / tutorials?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"John to give talk on GPU packaging"}),"\n",(0,i.jsx)(s.li,{children:"wolf giving talk on scikit-geometry"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) standing budget item"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Waiting on follow up on existing AWS charges"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ/Anthony/MRB) making a conda-tools org for tooling (conda-smithy, conda, mamba, grayskull, boa, etc.)"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Bit of an existential threat of forking the community of conda package users. Would be good to try and avoid that."}),"\n",(0,i.jsxs)(s.li,{children:["Centralize tools under one github org\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["conda-forge org?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"benefit: already a NumFocus project.\nGet a lot of admin overhead for free\n(governance model, community participation, etc.)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["conda-tools or new other org?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"putting tooling org under conda-forge raises\nquestions with some enterprise users and some\nother users. Separate org may be easier"}),"\n",(0,i.jsx)(s.li,{children:"Form new org, apply as new NumFocus project.\nAccomplishes same goal of bringing together single\nset of community led tools and projects for this ecosystem."}),"\n",(0,i.jsx)(s.li,{children:"Proposal: If we form new org just copy the conda-forge governance model"}),"\n",(0,i.jsx)(s.li,{children:"This could also be a good place to have the specification\ndiscussions that we've been talking about for a while\n(conda, conda-build meta.yaml, etc.)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["(WV) Having specs in a centralized community-owned place would be\ngreat - makes planning for the future feasible.\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["(JH) there's a specs repo in the conda org, ",(0,i.jsx)(s.a,{href:"https://github.com/conda/schemas",children:"https://github.com/conda/schemas"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["(FF) How do we avoid stifling innovation?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:'pypa sort of has a "Graduate into top level org" policy.'}),"\n",(0,i.jsx)(s.li,{children:"need to be a welcoming org. More along the lines of pyvis"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:['(SC) What is considered "core" to jupyter is not the implementations,\nbut the protocols / file formats / etc. If you write a tool in Jupyter\nthat supports these then you have immediate access to a wide variety\nof tooling\n',(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"What is the analog of this for the conda ecosystem? package specs\n(meta.yaml), package formats, etc.?"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.li,{children:'Need to be careful about naming. Don\'t want to become another\n"python packaging authority"'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (WV) Quick announce of micromamba (",(0,i.jsx)(s.a,{href:"https://gist.github.com/wolfv/fe1ea521979973ab1d016d95a589dcde",children:"https://gist.github.com/wolfv/fe1ea521979973ab1d016d95a589dcde"}),")"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (WV) Update on standardization of next gen package format from ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/pull/1087/files#diff-22b0eaa2e5f72f138d4b095f7a87853fR52-R77",children:"last meeting"}),"?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MRB/Isuru) cos7 and CDTs plans"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["merge this PR: ",(0,i.jsx)(s.a,{href:"https://github.com/conda/conda-build/pull/3969",children:"https://github.com/conda/conda-build/pull/3969"})]}),"\n",(0,i.jsx)(s.li,{children:"move all cos6/cos7 CDT packages from defaults to conda-forge"}),"\n",(0,i.jsxs)(s.li,{children:["update builds with ",(0,i.jsx)(s.code,{children:"no_hoist"})," and run constrained on the sysroot packages"]}),"\n",(0,i.jsx)(s.li,{children:"migrate all of them to new sysroot and add dep on sysroot package"}),"\n",(0,i.jsx)(s.li,{children:"remove shims in compilers"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (FF) Should we do Outreachy as part of an effort to support diversity in tech? Advantages are low cost and high impact. Dissdvantages are the time effort from the mentors."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) CFEP-18: Packaging static libraries"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (IF) cf-mark-broken: Marking not broken packages as broken"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (KK) CUDA 11 support"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"CUDA 11 dropped CentOS 6 support"}),"\n",(0,i.jsx)(s.li,{children:"Ties into CentOS 7 migration above"}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"cudatoolkit"})," 11 - ",(0,i.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) Status of openjdk, r-java stalled out"]}),"\n"]}),"\n",(0,i.jsx)(s.h5,{id:"stuff-from-last-week-that-we-didnt-get-to",children:"Stuff from last week that we didnt get to"}),"\n",(0,i.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"still need to finish CFEP-13"}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,i.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(s.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/34",children:"cfep-18"})," Packaging static libraries"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) Form finance subteam"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," document how users are supposed to interpret broken label"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," update how we, as core, are supposed to mark packages as broken"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,i.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>o});var i=n(96540);const t={},l=i.createContext(t);function a(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);