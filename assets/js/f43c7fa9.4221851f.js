"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[7778],{78674:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>a,toc:()=>r});var i=s(74848),t=s(28453);const l={title:"2022-02-23"},c="conda-forge core meeting 2022-02-23",a={id:"minutes/2022-02-23",title:"2022-02-23",description:"last weeks meeting",source:"@site/community/minutes/2022-02-23.md",sourceDirName:"minutes",slug:"/minutes/2022-02-23",permalink:"/community/minutes/2022-02-23",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2022-02-23.md",tags:[],version:"current",lastUpdatedAt:1731071307e3,frontMatter:{title:"2022-02-23"},sidebar:"community",previous:{title:"2022-03-09",permalink:"/community/minutes/2022-03-09"},next:{title:"2022-02-09",permalink:"/community/minutes/2022-02-09"}},d={},r=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Standing items",id:"standing-items",level:3},{value:"From previous meeting(s)",id:"from-previous-meetings",level:3},{value:"Your <strong>new</strong>() agenda items",id:"your-new-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"CFEPs",id:"cfeps",level:3},{value:"TODOs",id:"todos",level:3}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",input:"input",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"conda-forge-core-meeting-2022-02-23",children:"conda-forge core meeting 2022-02-23"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://hackmd.io/yeTyZCnzT6Oc4XE21uW5AQ?edit",children:"last weeks meeting"}),"\n",(0,i.jsx)(n.a,{href:"https://arewemeetingyet.com/UTC/2020-08-26/17:00/w/Conda-forge%20dev%20meeting#eyJ1cmwiOiJodHRwczovL2hhY2ttZC5pby9wUk15dFVKV1FmU3NJM2xvMGlqQzJRP2VkaXQifQ==",children:"What time is the meeting in my time zone"}),"\nMeeting info:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["To join the video meeting, click this link: ",(0,i.jsx)(n.a,{href:"https://zoom.us/j/9138593505?pwd=SWh3dE1IK05LV01Qa0FJZ1ZpMzJLZz09",children:"https://zoom.us/j/9138593505?pwd=SWh3dE1IK05LV01Qa0FJZ1ZpMzJLZz09"})]}),"\n",(0,i.jsx)(n.li,{children:"Otherwise, to join by phone, dial +1 347-384-8597 and enter this PIN: 828 997 153#"}),"\n",(0,i.jsxs)(n.li,{children:["To view more phone numbers, click this link: ",(0,i.jsx)(n.a,{href:"https://tel.meet/ijv-qsvm-tvn?hs=5",children:"https://tel.meet/ijv-qsvm-tvn?hs=5"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Name"}),(0,i.jsx)(n.th,{children:"Initials"}),(0,i.jsx)(n.th,{children:"GitHub ID"}),(0,i.jsx)(n.th,{children:"Affiliation"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Matthew Becker"}),(0,i.jsx)(n.td,{children:"MRB"}),(0,i.jsx)(n.td,{children:"beckermr"}),(0,i.jsx)(n.td,{children:"cf"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Jaime R.Guerra"}),(0,i.jsx)(n.td,{children:"JRG"}),(0,i.jsx)(n.td,{children:"jaimergp"}),(0,i.jsx)(n.td,{children:"Quansight/cf"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Filipe Fernandes"}),(0,i.jsx)(n.td,{children:"FF"}),(0,i.jsx)(n.td,{children:"ocefpaf"}),(0,i.jsx)(n.td,{children:"CF"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Cheng H. Lee"}),(0,i.jsx)(n.td,{children:"CHL"}),(0,i.jsx)(n.td,{children:"chenghlee"}),(0,i.jsx)(n.td,{children:"Anaconda/cf"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Dave Clements"}),(0,i.jsx)(n.td,{children:"DPC"}),(0,i.jsx)(n.td,{children:"tnabtaf"}),(0,i.jsx)(n.td,{children:"Anaconda"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Jannis Leidel"}),(0,i.jsx)(n.td,{children:"JL"}),(0,i.jsx)(n.td,{children:"jezdez"}),(0,i.jsx)(n.td,{children:"Anaconda/cf"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Marcelo Trevisani"}),(0,i.jsx)(n.td,{children:"MDT"}),(0,i.jsx)(n.td,{children:"marcelotrevisani"}),(0,i.jsx)(n.td,{children:"CF"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"John Kirkham"}),(0,i.jsx)(n.td,{children:"JK"}),(0,i.jsx)(n.td,{children:"jakirkham."}),(0,i.jsx)(n.td,{children:"NVIDIA"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Ivan Yashchuk"}),(0,i.jsx)(n.td,{children:"IY"}),(0,i.jsx)(n.td,{children:"ivanyashchuk"}),(0,i.jsx)(n.td,{children:"Quansight"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Wolf Vollprecht"}),(0,i.jsx)(n.td,{children:"WV"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{children:"QuantStack"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Katherine Kinnaman"}),(0,i.jsx)(n.td,{children:"KK"}),(0,i.jsx)(n.td,{children:"kathatherine"}),(0,i.jsx)(n.td,{children:"Anaconda"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Chris Burr"}),(0,i.jsx)(n.td,{children:"CB"}),(0,i.jsx)(n.td,{}),(0,i.jsx)(n.td,{})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Sylvain Corlay"}),(0,i.jsx)(n.td,{children:"SC"}),(0,i.jsx)(n.td,{children:"SylvainCorlay"}),(0,i.jsx)(n.td,{children:"QuantStack"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Isuru Fernando"}),(0,i.jsx)(n.td,{children:"IF"}),(0,i.jsx)(n.td,{children:"isuruf"}),(0,i.jsx)(n.td,{children:"CF/UIUC"})]})]})]}),"\n",(0,i.jsx)(n.p,{children:"25 people total"}),"\n",(0,i.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(n.h3,{id:"standing-items",children:"Standing items"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," intros for new folks on the call"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (FF) budget"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"current approvals?"}),"\n",(0,i.jsxs)(n.li,{children:["Whenever updated numbers land, please screenshare and show the budget.\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Link is in Keybase (numfocus_spreadsheets.txt)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," open votes"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," 2022 Outreachy / GSoC"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Community accepted"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://hackmd.io/uO6vV2V7T8eDyagZ_y7iQA#Project-2-Grayskull-and-Friends",children:"Project proposals"})," due next Thursday/Friday March 3/4\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"In addition to project propsal also need contribution tasks"}),"\n",(0,i.jsx)(n.li,{children:"And Channels for potential interns to communicate with us."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Two projects\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Grayskull and Friends, Jannis, and Marcelo"}),"\n",(0,i.jsx)(n.li,{children:"Doc, Matt and Katherine"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["questions:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"(MRB) did we get info on how to submit and I forgot?"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["todos:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"DPC will send submission links to teams."}),"\n",(0,i.jsx)(n.li,{children:"DPC will follow up with Jannis to confirm his leadership role on the Grayskull project."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"from-previous-meetings",children:"From previous meeting(s)"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (JRG) cudatoolkit download/pinning discussion (deferred)"]}),"\n"]}),"\n",(0,i.jsxs)(n.h3,{id:"your-new-agenda-items",children:["Your ",(0,i.jsx)(n.strong,{children:"new"}),"() agenda items"]}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Ivan/JRG) adding ROCm/HIP compiler: review of previous attempts (if any) and discussion of ways forward\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["notes\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"can get a bit of funding"}),"\n",(0,i.jsx)(n.li,{children:"all of work appears to be open source"}),"\n",(0,i.jsxs)(n.li,{children:["what happened in previous attempts?\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Isuru:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"some repos do not have licenses"}),"\n",(0,i.jsxs)(n.li,{children:["need patches on top of a specific LLVM version\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/RadeonOpenCompute/llvm-project",children:"https://github.com/RadeonOpenCompute/llvm-project"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"we cannot vendor clang because we keep one copy in env"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (WV) boa recipe format support in conda-forge\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1612",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1612"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (WV) emscripten / wasm support for conda-forge\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Existing discussion: ",(0,i.jsx)(n.a,{href:"https://github.com/conda/conda/issues/7619",children:"https://github.com/conda/conda/issues/7619"})]}),"\n",(0,i.jsxs)(n.li,{children:["Make it easier to add new platforms (e.g., OSS BSDs; mobile)\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["IF: start with ",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1126",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1126"})," as a reference"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (IF) Help with setting up AWS for cirun\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Help needed with AWS Images"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(n.h3,{id:"cfeps",children:"CFEPs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Stalled since May 26, 2020"}),"\n",(0,i.jsx)(n.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(n.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(n.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(n.li,{children:"Did we hear back from NumFOCUS? they did the legal seminar which is recorded"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"todos",children:"TODOs"}),"\n",(0,i.jsx)(n.p,{children:"2022-01-12"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"review Qt PR after logs are uploaded"}),"\n",(0,i.jsx)(n.li,{children:"Add cupython and cuquantum to don't mirror list"}),"\n",(0,i.jsxs)(n.li,{children:["re: ",(0,i.jsx)(n.code,{children:"std=c++14"}),", Wait for Kai to comment and merge the PR"]}),"\n",(0,i.jsx)(n.li,{children:"CJ and Jaime coordinate to Let Maxiconda know that we can't use their logo\n2021-12-01"}),"\n",(0,i.jsx)(n.li,{children:"WV: Set up meet-and-greet call with homebrew team?"}),"\n",(0,i.jsx)(n.li,{children:"MRB: (repodata patches) make a cron job that runs show_diff.py and posts an issue + commit if it is non-empty"}),"\n",(0,i.jsx)(n.li,{}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2021-11-03"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Self-hosting CI TODOs:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Change URL from drone.conda-forge.org. Proposals:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"woodpecker.conda-forge.org"}),"\n",(0,i.jsx)(n.li,{children:"ci.conda-forge.org"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Set up monitoring\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Quantstack is setting up grafana for the mirror"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2021-10-18"}),"\n",(0,i.jsx)(n.p,{children:"2021-09-22"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (WV): TensorFlow-GPU ready to go, just need to decide if GPU should get prio over CPU?!"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"GPU gets prio"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["(MRB) master to main move (",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1162",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1162"}),")"]}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{children:["everything done except feedstocks, releases, conda-smithy, and our github actions\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"releases is broken, opened an issue with github"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["some options for feedstocks\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"make sure to change the upload on branch key"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) make an announcement on how to update local clones (moved to the issue above)"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) make sure to update upload_on_branch (moved to the issue above)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-11-18"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (IF/MRB/MV) intel oneAPI\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["todo\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Nikolay) licensing for opencl_rt"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Nikolay) intelmpi ABI compat w/ mpich"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (MRB/IF) figure out how exactly to package C/C++ compilers"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (MRB/IF) think about fortran ABI"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) make conda-forge compilers room (add people including keith)"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0}),' (MB) asking core members to move to "emeritus" status\n',(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0}),' TODO: Eric to set up quarterly check-in for all core members to see if they\'re interested in remaining "active" or if they want to move to emeritus\n',(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Remove emeritus folks from having access to various credentials (api tokens, twitter password, etc.)? This would require a change to the governance doc."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-11-11"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"TODO: Think about bringing in JOSS to provide context around how we might best write papers"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-11-03"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsx)(n.li,{children:"TODO: Check on Forrest Watters permissions for core"}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Outreachy would cost 6500 USD.\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Next steps: write abstract and vote on spending of funds."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-10-28\n2020-10-21"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Marius?) Python 2.7 migration\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"( ) [ ] make a hint"}),"\n",(0,i.jsx)(n.li,{children:"( ) [ ] make an announcement"}),"\n",(0,i.jsx)(n.li,{children:"( ) [ ] make the hint a lint"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-10-07"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Make sure to add the NVBug info to the cudatoolkit package that conda-forge makes (if we make one)"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"2020-09-09"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (ED) Update governance docs with similar voting model as what got put into conda-tools (+3 with no -1 is a pass)"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (SC) Write jinja template to turn institutional partners yaml into a website ",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml",children:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml"})]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (SC) Document what needs to be done to create an OVH account and get access"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["2020-08-26\n",(0,i.jsx)(n.strong,{children:"Docker hub"})]}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers to see if they have the docker hub limitation."]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (JK) work with dockerhub to see if we can get OSS status\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Check in again at some point. We haven't heard back as of 2020-09-23"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"OVH"})}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0}),' Shout-out on twitter at some point. "Thanks forOVHCloud for providing a VM", etc. (maybe after we ship qt on windows with it?)']}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Figure out how to communicate breaking changes to users. Likely should open up an issue immediately for futher discussion. Ping @kkraus, plus capture notes from further up in these meeting notes"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Jonathan will review this ",(0,i.jsx)(n.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"PR"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(n.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(n.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(n.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(n.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(n.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(n.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(n.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff"]}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>a});var i=s(96540);const t={},l=i.createContext(t);function c(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);