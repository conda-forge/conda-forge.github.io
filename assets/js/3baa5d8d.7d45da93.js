"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[1521],{53016:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>r});var i=n(74848),t=n(28453);const l={title:"2021-07-14"},a="2021-07-14 conda-forge core meeting",c={id:"minutes/2021-07-14",title:"2021-07-14",description:"hackmd",source:"@site/community/minutes/2021-07-14.md",sourceDirName:"minutes",slug:"/minutes/2021-07-14",permalink:"/community/minutes/2021-07-14",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2021-07-14.md",tags:[],version:"current",lastUpdatedAt:172583119e4,frontMatter:{title:"2021-07-14"},sidebar:"community",previous:{title:"2021-07-28",permalink:"/community/minutes/2021-07-28"},next:{title:"2021-06-16",permalink:"/community/minutes/2021-06-16"}},o={},r=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Standing items",id:"standing-items",level:3},{value:"From previous meeting(s)",id:"from-previous-meetings",level:4},{value:"Your <strong>new</strong>() agenda items",id:"your-new-agenda-items",level:3},{value:"Pushed to next meeting",id:"pushed-to-next-meeting",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"This meeting",id:"this-meeting",level:3},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://hackmd.io/ILafTVysTIeIIv_imcHAoQ",children:"hackmd"})}),"\n",(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"2021-07-14-conda-forge-core-meeting",children:"2021-07-14 conda-forge core meeting"})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://flatiron.zoom.us/j/93242638216?pwd=bjRCWmVJRW1oTGJhN09VUmxtTTJOUT09",children:"Zoom link"}),"\n",(0,i.jsx)(s.a,{href:"https://arewemeetingyet.com/UTC/2020-08-26/17:00/w/Conda-forge%20dev%20meeting#eyJ1cmwiOiJodHRwczovL2hhY2ttZC5pby9wUk15dFVKV1FmU3NJM2xvMGlqQzJRP2VkaXQifQ==",children:"What time is the meeting in my time zone"}),"\n",(0,i.jsx)(s.a,{href:"https://hackmd.io/gb3Rqs_iSWSCl2FvrBVrvA",children:"last weeks meeting"})]}),"\n",(0,i.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(s.h3,{id:"standing-items",children:"Standing items"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," intros for new folks on the call"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Jannis"}),"\n",(0,i.jsx)(s.li,{children:"Alex - engineer working on installer"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) budget"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"current approvals?"}),"\n",(0,i.jsxs)(s.li,{children:["Whenever updated numbers land, please screenshare and show the budget.\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Link is in Keybase (numfocus_spreadsheets.txt)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," open votes"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"from-previous-meetings",children:"From previous meeting(s)"}),"\n",(0,i.jsxs)(s.h3,{id:"your-new-agenda-items",children:["Your ",(0,i.jsx)(s.strong,{children:"new"}),"() agenda items"]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (IF): NumFOCUS Small Development Grant"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Update GCC compilers and support cross-compiling scenarios."}),"\n",(0,i.jsx)(s.li,{children:"Got approved by university last week. Can start working now."}),"\n",(0,i.jsx)(s.li,{children:"First thing is going to be moving away from crosstools-ng."}),"\n",(0,i.jsx)(s.li,{children:"going to be building GCC directly with their configure scripts."}),"\n",(0,i.jsx)(s.li,{children:"Work has started now and lets see how it goes"}),"\n",(0,i.jsx)(s.li,{children:"Anaconda may want to have a look. Will send WIP PR and tag Anaconda folks"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (IF): CUDA 11.3, 11.4"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"(IF) Adding CUDA 11.3, 11.4 will add 30 more jobs (3 platforms * 5 python * 2 cuda)"}),"\n",(0,i.jsx)(s.li,{children:"(IF) This will add to already big matrices with ~60 jobs making it a\ndenial of service to other feedstocks"}),"\n",(0,i.jsxs)(s.li,{children:["(IF) There's a way to reduce the matrix by building for only one CUDA 11.x version\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"This would reduce CI time"}),"\n",(0,i.jsx)(s.li,{children:"Avoid rebuilding heavy packages like pytorch which has to be done manually."}),"\n",(0,i.jsx)(s.li,{children:"almost all libs in 11.x depends only on major version except for 2-3 libs (e.g., nvrtc)"}),"\n",(0,i.jsxs)(s.li,{children:["Can we rate limit the Azure workers on a per-feedstock basis?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Maybe limiting to 50 parallel builds would be sufficient to not hog the queue"}),"\n",(0,i.jsx)(s.li,{children:"long running jobs like pytorch is an issue."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["we could use ",(0,i.jsx)(s.a,{href:"https://cirun.io/auth/login",children:"https://cirun.io/auth/login"})," w/ aws and GHA"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["(JK) ",(0,i.jsx)(s.code,{children:"cudatoolkit"})," packaging plans"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (IF): Drop numpy 1.17 on July 26"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://numpy.org/neps/nep-0029-deprecation_policy.html",children:"https://numpy.org/neps/nep-0029-deprecation_policy.html"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK): CUDA ARM packaging"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cudatoolkit-feedstock/pull/59",children:"https://github.com/conda-forge/cudatoolkit-feedstock/pull/59"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"pushed-to-next-meeting",children:"Pushed to next meeting"}),"\n",(0,i.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:'Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020\nSolved: Let\'s defer and keep the "mixed model" we have now.'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,i.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently.\nSolved: defer in favor of the stale bot for now."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-15"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020\nPending: re-pinged pkgw for a second review."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Stalled since May 26, 2020"}),"\n",(0,i.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(s.li,{children:"Did we hear back from NumFOCUS? they did the legal seminar which is recorded"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/32",children:"cfep-17"})," Handling pin backports and dependency rebuilds"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Stalled debate about implementation details between Isuru, CJ and Matt"}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"UPDATE 2020-07-22"}),": We in principle have agreement to render the extra pinnings needed directly in the feedstock\non a temporary basis (i.e., until the migration has ended)."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/35",children:"cfep-19"})," Pinning epochs"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Stalled since July"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/39",children:"cfep-20"})," Package split"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"No updates for ~1 month"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(s.h3,{id:"this-meeting",children:"This meeting"}),"\n",(0,i.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsx)(s.p,{children:"2020-11-18"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (IF/MRB/MV) intel oneAPI\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["todo\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Nikolay) licensing for opencl_rt"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Nikolay) intelmpi ABI compat w/ mpich"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MRB/IF) figure out how exactly to package C/C++ compilers"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MRB/IF) think about fortran ABI"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) make conda-forge compilers room (add people including keith)"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0}),' (MB) asking core members to move to "emeritus" status\n',(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0}),' TODO: Eric to set up quarterly check-in for all core members to see if they\'re interested in remaining "active" or if they want to move to emeritus\n',(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Remove emeritus folks from having access to various credentials (api tokens, twitter password, etc.)? This would require a change to the governance doc."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-11-11"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"TODO: Think about bringing in JOSS to provide context around how we might best write papers"}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-11-03"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsx)(s.li,{children:"TODO: Check on Forrest Watters permissions for core"}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Outreachy would cost 6500 USD.\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Next steps: write abstract and vote on spending of funds."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-10-28\n2020-10-21"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Marius?) Python 2.7 migration\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"( ) [ ] make a hint"}),"\n",(0,i.jsx)(s.li,{children:"( ) [ ] make an announcement"}),"\n",(0,i.jsx)(s.li,{children:"( ) [ ] make the hint a lint"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-10-07"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Make sure to add the NVBug info to the cudatoolkit package that conda-forge makes (if we make one)"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-09-09"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Update governance docs with similar voting model as what got put into conda-tools (+3 with no -1 is a pass)"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (SC) Write jinja template to turn institutional partners yaml into a website ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml",children:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml"})]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (SC) Document what needs to be done to create an OVH account and get access"]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["2020-08-26\n",(0,i.jsx)(s.strong,{children:"Docker hub"})]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers to see if they have the docker hub limitation."]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) work with dockerhub to see if we can get OSS status\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Check in again at some point. We haven't heard back as of 2020-09-23"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"OVH"})}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0}),' Shout-out on twitter at some point. "Thanks forOVHCloud for providing a VM", etc. (maybe after we ship qt on windows with it?)']}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Figure out how to communicate breaking changes to users. Likely should open up an issue immediately for futher discussion. Ping @kkraus, plus capture notes from further up in these meeting notes"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will review this ",(0,i.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"PR"})]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff"]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>c});var i=n(96540);const t={},l=i.createContext(t);function a(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);