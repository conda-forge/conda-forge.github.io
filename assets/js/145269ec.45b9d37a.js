"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[7482],{97205:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var i=n(74848),t=n(28453);const l={title:"2020-11-11"},a="2020-11-11 conda-forge core meeting",c={id:"minutes/2020-11-11",title:"2020-11-11",description:"Zoom link",source:"@site/community/minutes/2020-11-11.md",sourceDirName:"minutes",slug:"/minutes/2020-11-11",permalink:"/community/minutes/2020-11-11",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-11-11.md",tags:[],version:"current",lastUpdatedAt:172596839e4,frontMatter:{title:"2020-11-11"},sidebar:"community",previous:{title:"2020-11-18",permalink:"/community/minutes/2020-11-18"},next:{title:"2020-11-03",permalink:"/community/minutes/2020-11-03"}},o={},d=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Standing items",id:"standing-items",level:3},{value:"From previous meeting(s)",id:"from-previous-meetings",level:4},{value:"Your <strong>new</strong>() agenda items",id:"your-new-agenda-items",level:3},{value:"Pushed to next meeting",id:"pushed-to-next-meeting",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"This meeting",id:"this-meeting",level:3},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function r(e){const s={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"2020-11-11-conda-forge-core-meeting",children:"2020-11-11 conda-forge core meeting"})}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://flatiron.zoom.us/j/93242638216?pwd=bjRCWmVJRW1oTGJhN09VUmxtTTJOUT09",children:"Zoom link"}),"\n",(0,i.jsx)(s.a,{href:"https://arewemeetingyet.com/UTC/2020-08-26/17:00/w/Conda-forge%20dev%20meeting#eyJ1cmwiOiJodHRwczovL2hhY2ttZC5pby9wUk15dFVKV1FmU3NJM2xvMGlqQzJRP2VkaXQifQ==",children:"What time is the meeting in my time zone"}),"\n",(0,i.jsx)(s.a,{href:"https://hackmd.io/r5eeo5cGQ7iHG1IgpB6axQ",children:"last weeks meeting"})]}),"\n",(0,i.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Matthew R Becker"}),"\n",(0,i.jsx)(s.li,{children:"Cheng H Lee"}),"\n",(0,i.jsx)(s.li,{children:"Keith Kraus"}),"\n",(0,i.jsx)(s.li,{children:"Filipe Fernandes"}),"\n",(0,i.jsx)(s.li,{children:"Jaime Rodriguez-Guerra"}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(s.h3,{id:"standing-items",children:"Standing items"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," intros for new folks on the call"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) budget"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"current approvals?"}),"\n",(0,i.jsxs)(s.li,{children:["Whenever updated numbers land, please screenshare and show the budget.\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Link is in Keybase (numfocus_spreadsheets.txt)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," open votes"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Keith Kraus for Core!"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB/ED/SC) Roadmap / Funding"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["goal is to spend 15 minutes each core meeting for ~3-4 meetings to discuss this\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Save last 15 minutes for this."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://hackmd.io/0zGSUS71SbOdBsdLtDmGjg",children:"https://hackmd.io/0zGSUS71SbOdBsdLtDmGjg"})}),"\n",(0,i.jsx)(s.li,{children:"notes will get added to hackmd above"}),"\n",(0,i.jsx)(s.li,{children:"MRB will collate into a document of sorts"}),"\n",(0,i.jsxs)(s.li,{children:["some resources\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["Some numbers:\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/by-the-numbers/blob/master/conda-forge-timelines.ipynb",children:"https://github.com/conda-forge/by-the-numbers/blob/master/conda-forge-timelines.ipynb"})}),"\n",(0,i.jsx)(s.li,{children:"conda-forge has added about 3k feedstocks per year in 2019 and will in 2020"}),"\n",(0,i.jsx)(s.li,{children:"the growth in the amount of data we store appears to be accelerating"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["risk measurements\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"CJ deserves all of the credit for this idea"}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://docs.google.com/spreadsheets/d/1ADNNauwVZWUsEdlh5aEg0OLjyDWvCX7PLoo-K34EqcM/edit#gid=0",children:"https://docs.google.com/spreadsheets/d/1ADNNauwVZWUsEdlh5aEg0OLjyDWvCX7PLoo-K34EqcM/edit#gid=0"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.li,{children:"going to skip today due to my own constraints"}),"\n",(0,i.jsxs)(s.li,{children:["TODO:\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Everyone take a look at the pypa roadmap:"}),"\n",(0,i.jsxs)(s.li,{children:["fill out the risk measurement spread sheet:\n",(0,i.jsx)(s.a,{href:"https://github.com/psf/fundable-packaging-improvements/blob/master/FUNDABLES.md",children:"https://github.com/psf/fundable-packaging-improvements/blob/master/FUNDABLES.md"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"from-previous-meetings",children:"From previous meeting(s)"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MB) CentOS 6 end of maintenance support\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["2020-11-30\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/Centos#End-of-support_schedule",children:"https://en.wikipedia.org/wiki/Centos#End-of-support_schedule"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux#Product_life_cycle",children:"https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux#Product_life_cycle"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["Some projects start to use defines from kernels newer than cos6's\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/util-linux-feedstock/pull/7/files#diff-d7075654874cb08007a21aaab3ecd4b3453a9087e7505d034d548b8938b599bcR4-R6",children:"https://github.com/conda-forge/util-linux-feedstock/pull/7/files#diff-d7075654874cb08007a21aaab3ecd4b3453a9087e7505d034d548b8938b599bcR4-R6"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["(UK) ",(0,i.jsx)(s.code,{children:"nodejs"})," also seems to have dropped cos6: ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/nodejs-feedstock/pull/154",children:"https://github.com/conda-forge/nodejs-feedstock/pull/154"})]}),"\n",(0,i.jsx)(s.li,{children:'(CHL) "defaults" will be dropping CentOS 6 around Jan 2021.'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.h3,{id:"your-new-agenda-items",children:["Your ",(0,i.jsx)(s.strong,{children:"new"}),"() agenda items"]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (JRG) ",(0,i.jsx)(s.a,{href:"mailto:jaime.rogue@gmail.com",children:"jaime.rogue@gmail.com"}),' is interested in helping out with a "conda-forge paper" for JOSS']}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Would be useful for scientists to get citations"}),"\n",(0,i.jsxs)(s.li,{children:["Two approaches\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Everyone on core is an author"}),"\n",(0,i.jsx)(s.li,{children:"Only people that need"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["Generating something to cite\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Zenodo? Rolling Zenodo DOIs don't accumulate citations (we need to confirm that.)"}),"\n",(0,i.jsxs)(s.li,{children:["JRG: As per the ",(0,i.jsx)(s.a,{href:"https://help.zenodo.org/",children:"FAQ"})," ",(0,i.jsx)(s.em,{children:"How does DOI versioning work?"}),', they provide two types of DOIs: version-specific and project-specific. Each project gets at least two: a general one, and then one more for the current version. They are separate DOIs (so different citation "wallets"), ',(0,i.jsx)(s.em,{children:"but"})," we could ask people to cite the project DOI, and the version specific ones will contain the increasingly growing list of contributors (maybe splitted by time?). For example:\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Project DOI -> points to ",(0,i.jsx)(s.a,{href:"https://conda-forge.org/",children:"https://conda-forge.org/"}),".\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:'Author is "The Conda Forge Community".'}),"\n",(0,i.jsx)(s.li,{children:"Content of the release: the documentation at that point, or a statement of the mission."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["Versions: one per year (or other period of time).\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Each release includes authors that contributed at least one package to conda-forge (new feedstock, new merged PR?). Sorted by amount of contributions. Opt-in via PR label (staged-recipes + PR)."}),"\n",(0,i.jsx)(s.li,{children:"Content: whatever is easier to automate. Possibly a list of the newly feedstocks, merged PRs in that timeframe."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["JRG (cont.): Authors that want credit in their CV can include the Project DOI ",(0,i.jsx)(s.em,{children:"and"})," the versions that include their contributions, if needed."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.li,{children:"How do we slice and dice credit? Write a paper and publish it for that specific tool?"}),"\n",(0,i.jsx)(s.li,{children:"TODO: Think about bringing in JOSS to provide context around how we might best write papers"}),"\n",(0,i.jsx)(s.li,{children:"MRB: I think the community itself should be the sole author."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," CZI proposal results and next steps"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:'We got a boilerplate no "good proposal but we got too many" from CZI.'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CHL) to-dos for osx-arm64 rollout"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Action item for Anaconda: fix CDN to push osx-arm64 packages"}),"\n",(0,i.jsx)(s.li,{children:"Anaconda may add signing to conda-build at some point in expectation that apple will require real certs\nand not simply an ad-hoc signature"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"pushed-to-next-meeting",children:"Pushed to next meeting"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0}),' (MB) asking core members to move to "emeritus" status']}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) We seem to have some artifacts that have more files than expected\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"4 pkgs ship requests (other than requests itself) see below"}),"\n",(0,i.jsxs)(s.li,{children:["What should we do about these?\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Old pkgs"}),"\n",(0,i.jsx)(s.li,{children:"Newer/latest pkgs"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"'apache-libcloud-2.4.0-py27_1000',\n'apache-libcloud-2.4.0-py36_1000',\n'apache-libcloud-2.4.0-py37_1000',\n'apache-libcloud-2.4.0-py_1000',\n'autovizwidget-0.12.6-py_1000',\n'dbxfs-1.0.38-py_0',\n'google-api-core-1.20.0-py36h9f0ad1d_0',\n'google-api-core-1.20.0-py37hc8dfbb8_0',\n'google-api-core-1.20.0-py38h32f6830_0',\n'google-api-core-1.20.1-py36h9f0ad1d_0',\n'google-api-core-1.20.1-py37hc8dfbb8_0',\n'google-api-core-1.20.1-py38h32f6830_0',\n'google-cloud-bigquery-storage-core-2.0.0-pyh9f0ad1d_1',\n'google-cloud-bigquery-storage-core-2.0.1-pyh9f0ad1d_0'\n"})}),"\n",(0,i.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,i.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Stalled since May 26, 2020"}),"\n",(0,i.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(s.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/32",children:"cfep-17"})," Handling pin backports and dependency rebuilds"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Stalled debate about implementation details between Isuru, CJ and Matt"}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"UPDATE 2020-07-22"}),": We in principle have agreement to render the extra pinnings needed directly in the feedstock\non a temporary basis (i.e., until the migration has ended)."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/39",children:"cfep-20"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(s.h3,{id:"this-meeting",children:"This meeting"}),"\n",(0,i.jsx)(s.p,{children:"2020-11-03"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) proposed policy on when core pushes to the feedstocks they don't maintain\n* [x] (MRB) put in docs PR\n* [ ] (MRB) make PR on bot to mention the policy"]}),"\n",(0,i.jsx)(s.li,{children:"TODO: Check on Forrest Watters permissions for core"}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Outreachy would cost 6500 USD.\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Next steps: write abstract and vote on spending of funds."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.li,{}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsx)(s.p,{children:"2020-10-28"}),"\n",(0,i.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsx)(s.p,{children:"2020-10-21"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Marius?) Python 2.7 migration\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"( ) [ ] make a hint"}),"\n",(0,i.jsx)(s.li,{children:"( ) [ ] make an announcement"}),"\n",(0,i.jsx)(s.li,{children:"( ) [ ] make the hint a lint"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsx)(s.p,{children:"2020-10-07"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Make sure to add the NVBug info to the cudatoolkit package that conda-forge makes (if we make one)"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-09-30"}),"\n",(0,i.jsx)(s.p,{children:"2020-09-23"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB)\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"do libgfortran name change"}),"\n",(0,i.jsx)(s.li,{children:"add target platform to hashes"}),"\n",(0,i.jsx)(s.li,{children:"do gfortran migration with bot"}),"\n",(0,i.jsx)(s.li,{children:"bump pinnings"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-09-16"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Get a call set up with Jon Mease about the kaleido staged recipes PR\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Emailed on 2020-09-16"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Open up a PR on the python feedstock for python 3.9 and see what fails"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"2020-09-09"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Update governance docs with similar voting model as what got put into conda-tools (+3 with no -1 is a pass)"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (SC) Write jinja template to turn institutional partners yaml into a website ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml",children:"https://github.com/conda-forge/conda-forge.github.io/blob/2a2d3caaf7d74eb370ac40c679ba337a73d15c8a/src/inst_partners.yaml"})]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (SC) Document what needs to be done to create an OVH account and get access"]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["2020-08-26\n",(0,i.jsx)(s.strong,{children:"Docker hub"})]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) Check in on Azure build workers to see if they have the docker hub limitation."]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (JK) work with dockerhub to see if we can get OSS status\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Check in again at some point. We haven't heard back as of 2020-09-23"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB) start pushing images to quay (",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/docker-images/pull/152",children:"https://github.com/conda-forge/docker-images/pull/152"}),")"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"OVH"})}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (???) build webpage to credit them (and others)"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," If we're adding a logo, will want to make sure that we have permission to use it."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0}),' Shout-out on twitter at some point. "Thanks forOVHCloud for providing a VM", etc. (maybe after we ship qt on windows with it?)']}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Figure out how to communicate breaking changes to users. Likely should open up an issue immediately for futher discussion. Ping @kkraus, plus capture notes from further up in these meeting notes"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will review this ",(0,i.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"PR"})]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff"]}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>c});var i=n(96540);const t={},l=i.createContext(t);function a(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);