"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[11295],{10990:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>o});var n=i(74848),t=i(28453);const l={title:"2020-07-08"},a="2020-07-08 conda-forge core meeting",c={id:"minutes/2020-07-08",title:"2020-07-08",description:"Attendees",source:"@site/community/minutes/2020-07-08.md",sourceDirName:"minutes",slug:"/minutes/2020-07-08",permalink:"/community/minutes/2020-07-08",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-07-08.md",tags:[],version:"current",lastUpdatedAt:1732328727e3,frontMatter:{title:"2020-07-08"},sidebar:"community",previous:{title:"2020-07-15",permalink:"/community/minutes/2020-07-15"},next:{title:"2020-07-01",permalink:"/community/minutes/2020-07-01"}},d={},o=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"Stuff from last week that we didn&#39;t get to",id:"stuff-from-last-week-that-we-didnt-get-to",level:5},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"This meeting",id:"this-meeting",level:3},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function r(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",input:"input",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"2020-07-08-conda-forge-core-meeting",children:"2020-07-08 conda-forge core meeting"})}),"\n",(0,n.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Jonathan Helmus"}),"\n",(0,n.jsx)(s.li,{children:"Marius van Niekerk"}),"\n",(0,n.jsx)(s.li,{children:"Filipe Fernandes"}),"\n",(0,n.jsx)(s.li,{children:"Matthew Becker"}),"\n",(0,n.jsx)(s.li,{children:"Keith Kraus"}),"\n",(0,n.jsx)(s.li,{children:"CJ Wright"}),"\n",(0,n.jsx)(s.li,{children:"Cheng Lee"}),"\n",(0,n.jsx)(s.li,{children:"Wolf Vollprecht"}),"\n",(0,n.jsx)(s.li,{children:"Eric Dill"}),"\n",(0,n.jsx)(s.li,{children:"Uwe Korn"}),"\n",(0,n.jsx)(s.li,{children:"Marcel Bargull"}),"\n",(0,n.jsx)(s.li,{children:"Anthony Scopatz"}),"\n",(0,n.jsx)(s.li,{children:"John Kirkham"}),"\n",(0,n.jsx)(s.li,{children:"Isuru Fernando"}),"\n",(0,n.jsx)(s.li,{children:"Lori Burns"}),"\n",(0,n.jsx)(s.li,{children:"Marcelo Trevisani"}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,n.jsx)(s.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) budget, also finance subteam creation"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/pull/1093",children:"https://github.com/conda-forge/conda-forge.github.io/pull/1093"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," intros for new folks on the call"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Open Force Field request to NumFOCUS"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Likely looking to engage in a contract relationship, Anthony interested"}),"\n",(0,n.jsx)(s.li,{children:'We could create a list of "suggested" companies/persons who do this type of work'}),"\n",(0,n.jsxs)(s.li,{children:["Where should we land this information on the website?\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"conda-forge.org/commercial"}),"\n",(0,n.jsx)(s.li,{children:"conda-forge.org/"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (FF) Should we do Outreachy as part of an effort to support diversity in tech? Advantages are low cost\nand high impact. Disadvantages are the time effort from the mentors."]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (ED) Did we need to document anything from the CUDA 11 stuff that Keith brought up last time? No."]}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (KK) CUDA 11 support\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"CUDA 11 dropped CentOS 6 support"}),"\n",(0,n.jsx)(s.li,{children:"ties into CentOS 7 migration above"}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"cudatoolkit"})," 11 - ",(0,n.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Make sure we have a glibc run constrain line\nTODO: Jonathan will review this PR"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["Add Docker image (need to double check how ",(0,n.jsx)(s.code,{children:"FROM"})," can be adjusted conditionally)\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Needs a recent docker version but this should work\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"ARG IMAGE=ubuntu:latest\nFROM ${IMAGE}\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (KK) CUDA Toolkit in conda-forge update"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"With a few changes to the recipe conda-forge will be able to build+distribute cudatoolkit"}),"\n",(0,n.jsx)(s.li,{children:"TODO: Eric will get the NVBug link from Keith and archive it in the conda-forge google drive."}),"\n",(0,n.jsx)(s.li,{children:"TODO: John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"}),"\n",(0,n.jsx)(s.li,{children:"TODO: Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (IF) strict channel priority"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Needed for PyPy"}),"\n",(0,n.jsx)(s.li,{children:"Needed for Cos7"}),"\n",(0,n.jsx)(s.li,{children:"Remove packages that we don't fully support. For eg: there are 3 builds of scipy on windows."}),"\n",(0,n.jsx)(s.li,{children:"Older versions of tensorflow?"}),"\n",(0,n.jsx)(s.li,{children:"Could make strict a option in conda_forge.yaml"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0}),' Discussion of "hard to build packages"']}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"rstudio (redist may be somewhat sketchy?)"}),"\n",(0,n.jsx)(s.li,{children:"tensorflow"}),"\n",(0,n.jsx)(s.li,{children:"qt"}),"\n",(0,n.jsx)(s.li,{children:"scipy on Windows"}),"\n",(0,n.jsx)(s.li,{children:"Should we publish a list and ask for help on those?"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (UK) CFEP-18, please vote"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/34",children:"https://github.com/conda-forge/cfep/pull/34"})}),"\n",(0,n.jsx)(s.li,{children:"voting passed!"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (UK) Voting Fatigue"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"discussed various alternatives"}),"\n",(0,n.jsx)(s.li,{children:"sub-teams"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0}),' (UK) "GPL-free" variants']}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Some packages like Python, sqlite have a dependency on libreadline which is GPL licensed.\nThere might be arguments that this doesn't trickle up the stack but Corporate Compliance/IT have a different stance on that."}),"\n",(0,n.jsx)(s.li,{children:"Similar issues with other packages where the GPL-dependency is quite often an optional one."}),"\n",(0,n.jsx)(s.li,{children:"We probably want to have that functionality enabled by default but provide an alternative variant without GPL dependencies."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (CL) msys2 packages"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:'Anaconda deciding on update plans for "defaults" channel'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,n.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,n.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) Status of openjdk, r-java stalled out"]}),"\n"]}),"\n",(0,n.jsx)(s.h5,{id:"stuff-from-last-week-that-we-didnt-get-to",children:"Stuff from last week that we didn't get to"}),"\n",(0,n.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,n.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,n.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,n.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,n.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,n.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,n.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," still need to finish CFEP-13 (can move ahead now that latest smithy is out)"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,n.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,n.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,n.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,n.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,n.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Stalled since May 26, 2020"}),"\n",(0,n.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,n.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,n.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,n.jsx)(s.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/32",children:"cfep-17"})," Handling pin backports and dependency rebuilds"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Stalled debate about implementation details between Isuru, CJ and Matt"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,n.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,n.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,n.jsx)(s.h3,{id:"this-meeting",children:"This meeting"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Eric will get the NVBug link from Keith and archive it in the conda-forge google drive."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Eric to add a new page to our docs around how to engage with conda-forge and affiliated in a commercial relationship."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," John K. will update the cuda toolkit feedstock on the git repo to note the NVBug link to the internal NVIDIA issue tracker"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will update docs to note that some non-exhaustive list of packages (like cuda-toolkit, MKL, etc.)"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Jonathan will review this ",(0,n.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"PR"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,n.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,n.jsx)(s.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) Form finance subteam"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Add conda-forge page about commercial engagements\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:'Create a list of "suggested" companies/persons who do external companies\ncan engage with for custom work'}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,n.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(s.li,{className:"task-list-item",children:[(0,n.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,n.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,n.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,n.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,n.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,n.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,n.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,n.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}},28453:(e,s,i)=>{i.d(s,{R:()=>a,x:()=>c});var n=i(96540);const t={},l=n.createContext(t);function a(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);