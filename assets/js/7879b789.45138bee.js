"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[9318],{34404:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var s=i(74848),t=i(28453);const l={title:"2020-04-29"},r="2020-04-29 conda-forge core meeting",o={id:"minutes/2020-04-29",title:"2020-04-29",description:"Attendees",source:"@site/community/minutes/2020-04-29.md",sourceDirName:"minutes",slug:"/minutes/2020-04-29",permalink:"/community/minutes/2020-04-29",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-04-29.md",tags:[],version:"current",lastUpdatedAt:1725529032e3,frontMatter:{title:"2020-04-29"},sidebar:"community",previous:{title:"2020-05-13",permalink:"/community/minutes/2020-05-13"},next:{title:"2020-04-15",permalink:"/community/minutes/2020-04-15"}},a={},c=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"Stuff from last week that we didnt get to",id:"stuff-from-last-week-that-we-didnt-get-to",level:5},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",input:"input",li:"li",ol:"ol",p:"p",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"2020-04-29-conda-forge-core-meeting",children:"2020-04-29 conda-forge core meeting"})}),"\n",(0,s.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Marius van Niekerk"}),"\n",(0,s.jsx)(n.li,{children:"Filipe Fernandes"}),"\n",(0,s.jsx)(n.li,{children:"Kai Tietz"}),"\n",(0,s.jsx)(n.li,{children:"Uwe Korn"}),"\n",(0,s.jsx)(n.li,{children:"Cheng Lee"}),"\n",(0,s.jsx)(n.li,{children:"Isuru Fernando"}),"\n",(0,s.jsx)(n.li,{children:"Amy Williams"}),"\n",(0,s.jsx)(n.li,{children:"Josh Adelman"}),"\n",(0,s.jsx)(n.li,{children:"Jonathan Helmus"}),"\n",(0,s.jsx)(n.li,{children:"Ray Donnelly"}),"\n",(0,s.jsx)(n.li,{children:"CJ Wright"}),"\n",(0,s.jsx)(n.li,{children:"Matthew Becker"}),"\n",(0,s.jsx)(n.li,{children:"Michael Sarahan"}),"\n",(0,s.jsx)(n.li,{children:"Eric Dill"}),"\n",(0,s.jsx)(n.li,{children:"Marcel Bargull"}),"\n",(0,s.jsx)(n.li,{children:"Wolf Vollprecht"}),"\n",(0,s.jsx)(n.li,{children:"Ray Douglass"}),"\n",(0,s.jsx)(n.li,{children:"Kale Franz"}),"\n",(0,s.jsx)(n.li,{children:"Lori Burns"}),"\n",(0,s.jsx)(n.li,{children:"Peter Wang"}),"\n",(0,s.jsx)(n.li,{children:"Anthony Scopatz"}),"\n",(0,s.jsx)(n.li,{children:"Keith Kraus"}),"\n",(0,s.jsx)(n.li,{children:"John Kirkham"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,s.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(all) intros for new people on the line?"}),"\n",(0,s.jsxs)(n.li,{children:["(UK) Self-sufficient MinGW-based toolchain / packages: m2w64 stack update ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1044",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1044"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"R heavily depends on gcc, so on windows we have been using MinGW. Maybe we could switch to clang?"}),"\n",(0,s.jsx)(n.li,{children:"Need to use msys2 to install packages from CRAN in an R-conda environment."}),"\n",(0,s.jsx)(n.li,{children:"R packages use autotools, so need a posix environment that supports fork. Could use cross-compile"}),"\n",(0,s.jsx)(n.li,{children:"Need to separate m2 and m2w64. m2 are for building stuff and mw264 are for linking stuff. definiteyl need m2 ones to have bash / archivers / linkers. question is what are we going to do with m2w64. The binutils package is really old. Those gcc packges can't directly link to packages built with MSVC. MinGW is not linking to ucrt but this is configurable."}),"\n",(0,s.jsx)(n.li,{children:"What defaults should we have in conda-forge?  ucrt or mscrt"}),"\n",(0,s.jsx)(n.li,{children:"Is it a goal to interop with CRAN packages? They've moved on to msys2 - getting c/c++ directly from msys2 packages. Still stuck with an older compiler (pkg / version?) Doesn't want to change it because it's tested so well."}),"\n",(0,s.jsx)(n.li,{children:"Building with existing gcc 5.4 should be okay with gcc 8, last breakage in 4.4?/8?.  Would be good to update to newer version."}),"\n",(0,s.jsx)(n.li,{children:"gfortran ABI breakage between 5 and 8"}),"\n",(0,s.jsx)(n.li,{children:"CRAN libraries which use fortran, compatibility with current conda-forge packages built with gfortran"}),"\n",(0,s.jsxs)(n.li,{children:["Test:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Use R from conda-forge, install package from CRAN"}),"\n",(0,s.jsx)(n.li,{children:"Ideally something that uses modern C++"}),"\n",(0,s.jsx)(n.li,{children:"r-cpp, data.tables, something that wraps Fortran(?)"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"clang version of MinGW, existing llvm can target MinGW or MSVC"}),"\n",(0,s.jsxs)(n.li,{children:["Move remainder of conversation to github issue (",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1044",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1044"}),")."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["(JJH) Update from Peter on Anaconda, Inc's repository\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Making a change to the terms of service for repo.anaconda.com"}),"\n",(0,s.jsx)(n.li,{children:"Wholescale mirroring or heavy usage for commercial purposes will be prohibited"}),"\n",(0,s.jsx)(n.li,{children:"Open source usage is fine"}),"\n",(0,s.jsx)(n.li,{children:"Does conda-forge want to do the same thing for our packages?"}),"\n",(0,s.jsxs)(n.li,{children:["Share blog post with:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Filipe, Kirkham, Keith, Scopatz"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["(Matt) CFEP-13 rollout - see notes below\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["random notes from other items\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"spruce up the blog!"}),"\n",(0,s.jsx)(n.li,{children:"doc fixes on cf-mark-broken"}),"\n",(0,s.jsxs)(n.li,{children:["mark broken vs. hotfix : should document and make hotfixing easier\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"need to diff the diff"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["(Scopatz) DynamoDB Billing\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"conda-forge AWS account has ~$2200 in charges, alerts have been setup"}),"\n",(0,s.jsx)(n.li,{children:"NumFocus credit card?"}),"\n",(0,s.jsxs)(n.li,{children:["Next steps:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Make issue, vote"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Stop putting expenses on personal credit cards, ask core before spending monies"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Meeting ended before we could discuss:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(CJ) adding a standing budget item to the agenda"}),"\n",(0,s.jsx)(n.li,{children:"(ED) Enforce 2FA? bot / donations discussion in core gitter"}),"\n",(0,s.jsxs)(n.li,{children:["(ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus"}),"\n",(0,s.jsx)(n.li,{children:"who's the POC for the various subteams?"}),"\n",(0,s.jsx)(n.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,s.jsx)(n.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,s.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,s.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,s.jsx)(n.h5,{id:"stuff-from-last-week-that-we-didnt-get-to",children:"Stuff from last week that we didnt get to"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["[CJ/Matt] R 4.0.0 migration is underway-ish\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["see status here: ",(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1025",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1025"})]}),"\n",(0,s.jsx)(n.li,{children:"need to wait on the R stuff due to gfortran tests"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["[CJ] Better understanding/handling of run_exports\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Particularly applicable to issues involving boost and header only deps ",(0,s.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/960",children:"https://github.com/regro/cf-scripts/issues/960"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,s.jsx)(n.h4,{id:"power",children:"POWER"}),"\n",(0,s.jsx)(n.h4,{id:"cuda",children:"CUDA"}),"\n",(0,s.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,s.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,s.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,s.jsx)(n.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"[Matt] Ready to roll out CFEP-13 - The plan is to"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"make an announcement that this is happening"}),"\n",(0,s.jsx)(n.li,{children:"provision feedstock tokens for every feedstock"}),"\n",(0,s.jsx)(n.li,{children:"add the STAGING_BINSTAR_TOKEN to every feedstock"}),"\n",(0,s.jsxs)(n.li,{children:["add ",(0,s.jsx)(n.code,{children:"conda_forge_output_validation: true"})," to the conda-forge.yml for every feedstock"]}),"\n",(0,s.jsx)(n.li,{children:"wait a while and then turn off the current binstar tokens"}),"\n",(0,s.jsx)(n.li,{children:"run an admin migration to cleanup residual tokens in the CI services and conda-forge.yml files."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"As people rerender feedstocks, they will automatically be moved to the new system. Then eventually\nrerenders will be required when we deactivate the old tokens."}),"\n",(0,s.jsx)(n.p,{children:"We plan to add a few things to help users."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"We are moving the cf-mark-broken repo to an admin-requests repo and will be adding the feature for\npeople to request that the feedstock tokens be reset."}),"\n",(0,s.jsx)(n.li,{children:"The validation/copy service will be changed to start making comments on PRs if it finds errors\nStill working out the details here."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,s.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,s.jsx)(n.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,s.jsx)(n.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,s.jsx)(n.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,s.jsx)(n.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,s.jsx)(n.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,s.jsx)(n.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,s.jsx)(n.li,{children:"What were the results of the vote?"}),"\n",(0,s.jsx)(n.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,s.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,s.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,s.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (ED) schedule mirroring conversation"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Kale) schedule"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) Merge all the pinnings PRs"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) Institutional Partners page in docs\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," TODO: Submit skeleton for PR into conda-forge.github.io repo"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Matt Becker) Update the docs with our current thinking / principles."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,s.jsx)(n.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,s.jsx)(n.li,{children:"Remove conda forge readthedocs."}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var s=i(96540);const t={},l=s.createContext(t);function r(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);