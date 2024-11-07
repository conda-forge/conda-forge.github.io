"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3299],{13089:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>r});var n=i(74848),t=i(28453);const l={title:"2020-08-26"},a="2020-08-26 conda-forge core meeting",c={id:"minutes/2020-08-26",title:"2020-08-26",description:"Zoom link",source:"@site/community/minutes/2020-08-26.md",sourceDirName:"minutes",slug:"/minutes/2020-08-26",permalink:"/community/minutes/2020-08-26",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-08-26.md",tags:[],version:"current",lastUpdatedAt:173097955e4,frontMatter:{title:"2020-08-26"},sidebar:"community",previous:{title:"2020-09-02",permalink:"/community/minutes/2020-09-02"},next:{title:"2020-08-19",permalink:"/community/minutes/2020-08-19"}},o={},r=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Standing items",id:"standing-items",level:3},{value:"Your new agenda items",id:"your-new-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"This meeting",id:"this-meeting",level:3},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const s={a:"a",blockquote:"blockquote",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"2020-08-26-conda-forge-core-meeting",children:"2020-08-26 conda-forge core meeting"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://flatiron.zoom.us/j/93242638216?pwd=bjRCWmVJRW1oTGJhN09VUmxtTTJOUT09",children:"Zoom link"}),"\n",(0,n.jsx)(s.a,{href:"https://arewemeetingyet.com/UTC/2020-08-26/17:00/w/Conda-forge%20dev%20meeting#eyJ1cmwiOiJodHRwczovL2hhY2ttZC5pby9wUk15dFVKV1FmU3NJM2xvMGlqQzJRP2VkaXQifQ==",children:"What time is the meeting in my time zone"}),"\n",(0,n.jsx)(s.a,{href:"https://hackmd.io/uoxd_bzSRie5Dq1ZrMSvhA",children:"last weeks meeting"})]}),"\n",(0,n.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,n.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,n.jsx)(s.h3,{id:"standing-items",children:"Standing items"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," intros for new folks on the call"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) budget\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"current approvals are all up to date."}),"\n",(0,n.jsx)(s.li,{children:"screenshare and show the doc monthly?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"your-new-agenda-items",children:"Your new agenda items"}),"\n",(0,n.jsx)(s.p,{children:"stuff from last time"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) shall we merge this (",(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/pull/1139",children:"https://github.com/conda-forge/conda-forge.github.io/pull/1139"}),")?"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"PR is on supported python versions"}),"\n",(0,n.jsx)(s.li,{children:"waiting on isuru"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (ED) Sylvain: Any updates from OVH on the windows VM?"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"TODO: keep checking in on this"}),"\n",(0,n.jsx)(s.li,{children:"OVH will want their brand on our page somewhere."}),"\n",(0,n.jsxs)(s.li,{children:["TODO\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) build webpage to credit them (and others)"]}),"\n",(0,n.jsx)(s.li,{children:"If we're adding a logo, will want to make sure that we have permission to use it."}),"\n",(0,n.jsx)(s.li,{children:'Shout-out on twitter at some point. "Thanks forOVHCloud for providing a VM", etc. (maybe after we ship qt on windows with it?)'}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (AS) qgpu - GPU build agents."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Drone or Azure? Drone is a simple go executable and you can run it in docker. Azure build agent is heavy weight?"}),"\n",(0,n.jsx)(s.li,{children:"Pick one and go"}),"\n",(0,n.jsx)(s.li,{children:"Waiting on Anthony to have some spare time."}),"\n",(0,n.jsx)(s.li,{children:"JH: Github actions has a runner"}),"\n",(0,n.jsx)(s.li,{children:"AS: Happy to try any and all solutions"}),"\n",(0,n.jsx)(s.li,{children:"MRB: Rerendering can't push changes to workflow files in feedstocks. There's not a feasible workaround for this atm. Currently working with github on trying to fix this, but it's not going quickly."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"new stuff"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB, John) docker hub changes"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["by default they will limit pulls of our images to a few hundred per hour for anonymous users\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/",children:"https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/"})}),"\n",(0,n.jsxs)(s.li,{children:["HN: ",(0,n.jsx)(s.a,{href:"https://news.ycombinator.com/item?id=24262757",children:"https://news.ycombinator.com/item?id=24262757"})]}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://news.ycombinator.com/item?id=24268336",children:"https://news.ycombinator.com/item?id=24268336"})}),"\n"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:"Github Docker Registry is a mess and should be avoided at all costs."}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsx)(s.li,{children:"It is broken and unusable on Kubernetes and Docker Swarm."}),"\n",(0,n.jsx)(s.li,{children:"It is flaky often returning 500 type errors."}),"\n",(0,n.jsx)(s.li,{children:"It is expensive as the amount of pull bandwidth is very limited."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.li,{children:"this is based on the user pulling the image, not the user hosting the image"}),"\n",(0,n.jsxs)(s.li,{children:["John put in an application for their open source program. Once we are accepted, they will work with\nus hopefully.\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"(JK) Check in on Azure build workers and see if they have the docker hub limitation"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["For now, we should start trying to host our images elsewhere\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Isuru suggested using github packages"}),"\n",(0,n.jsx)(s.li,{children:"we have used quay in the past"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["going to take a many pronged approach\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers and see if they have the docker hub limitation"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) work with dockerhub"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) start pushing images to quay (github?)"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) put changes in smithy to make sure we can use those other image locations"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) AWS stuff submitted"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"we asked for 2k total from NumFocus through their pool of credits."}),"\n",(0,n.jsx)(s.li,{children:"working through back and forth..."}),"\n",(0,n.jsx)(s.li,{children:"NumFocus is going to put our AWS account under theirs"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (KK) Conda virtual packages plugin"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["From the NVIDIA / RAPIDS side, desire to build more conda packages on things that depend on drivers with kernel modules, i.e. MOFED\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"(KK) MOFED is basically infiniband drivers. This is not the only case for this"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["Work to do on conda side to build plugin architecture to support this\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda/conda/issues/10131",children:"https://github.com/conda/conda/issues/10131"})," (currently slated for 5.0.0 release)"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.li,{children:"Could potentially explode build matrices for certain projects, what is our stance from the conda-forge side?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,n.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,n.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,n.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,n.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,n.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,n.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,n.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,n.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,n.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,n.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,n.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,n.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,n.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,n.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Stalled since May 26, 2020"}),"\n",(0,n.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,n.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,n.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,n.jsx)(s.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/32",children:"cfep-17"})," Handling pin backports and dependency rebuilds"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Stalled debate about implementation details between Isuru, CJ and Matt"}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.strong,{children:"UPDATE 2020-07-22"}),": We in principle have agreement to render the extra pinnings needed directly in the feedstock\non a temporary basis (i.e., until the migration has ended)."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,n.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,n.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,n.jsx)(s.h3,{id:"this-meeting",children:"This meeting"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"Docker hub"})}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers to see if they have the docker hub limitation. Maybe Azure and docker hub"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers and see if they have the docker hub limitation"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) work with dockerhub to see if we can get OSS status"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) start pushing images to quay (github?)"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) put changes in smithy to make sure we can use those other image locations"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:"OVH"})}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) build webpage to credit them (and others)"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," If we're adding a logo, will want to make sure that we have permission to use it."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0}),' Shout-out on twitter at some point. "Thanks forOVHCloud for providing a VM", etc. (maybe after we ship qt on windows with it?)']}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,n.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Figure out how to communicate breaking changes to users. Likely should open up an issue immediately for futher discussion. Ping @kkraus, plus capture notes from further up in these meeting notes"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (Eric) TODO: Make strict an option in conda_forge.yaml and turn it on by default. Open issue in conda-smithy"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Eric to add a new page to our docs around how to engage with conda-forge and affiliated in a commercial relationship."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Eric will get the NVBug link from Keith and archive it in the conda-forge google drive."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will review this ",(0,n.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"PR"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,n.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,n.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,n.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,n.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,n.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,n.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,n.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) Form finance subteam"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,s,i)=>{i.d(s,{R:()=>a,x:()=>c});var n=i(96540);const t={},l=n.createContext(t);function a(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);