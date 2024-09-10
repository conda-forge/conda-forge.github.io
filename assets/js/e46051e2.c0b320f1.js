"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[9337],{57413:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var i=n(74848),t=n(28453);const l={title:"2020-07-01"},c="2020-07-01 conda-forge core meeting",o={id:"minutes/2020-07-01",title:"2020-07-01",description:"Attendees",source:"@site/community/minutes/2020-07-01.md",sourceDirName:"minutes",slug:"/minutes/2020-07-01",permalink:"/community/minutes/2020-07-01",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-07-01.md",tags:[],version:"current",lastUpdatedAt:172596839e4,frontMatter:{title:"2020-07-01"},sidebar:"community",previous:{title:"2020-07-08",permalink:"/community/minutes/2020-07-08"},next:{title:"2020-06-22",permalink:"/community/minutes/2020-06-22"}},a={},d=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"Stuff from last week that we didnt get to",id:"stuff-from-last-week-that-we-didnt-get-to",level:5},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function r(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",input:"input",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"2020-07-01-conda-forge-core-meeting",children:"2020-07-01 conda-forge core meeting"})}),"\n",(0,i.jsx)(s.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsx)(s.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(s.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (WV) Quick announce of micromamba (",(0,i.jsx)(s.a,{href:"https://gist.github.com/wolfv/fe1ea521979973ab1d016d95a589dcde",children:"https://gist.github.com/wolfv/fe1ea521979973ab1d016d95a589dcde"}),")"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (WV) Update on standardization of next gen package format from ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/pull/1087/files#diff-22b0eaa2e5f72f138d4b095f7a87853fR52-R77",children:"last meeting"}),"?"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/TheSnakePit/conda-specs/blob/master/proposed_specs/recipe.md",children:"https://github.com/TheSnakePit/conda-specs/blob/master/proposed_specs/recipe.md"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/TheSnakePit/boa/blob/master/boa/cli/render.py",children:"https://github.com/TheSnakePit/boa/blob/master/boa/cli/render.py"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (MRB/IF) cos7 and CDTs plans (",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1085",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1085"}),")"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"cos7 compilers are working!"}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"we have removed any mention of cos6 or cos7 from the sysroot path so that we have one compiler"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["old sysroot: ",(0,i.jsx)(s.code,{children:"x86_64-conda_cos6-linux-gnu"})]}),"\n",(0,i.jsxs)(s.li,{children:["new sysroot: ",(0,i.jsx)(s.code,{children:"x86_64-conda-linux-gnu"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"we now use the sysroot/glibc/kernel headers packages directly from cos6 or cos7 when\nbuilding (instead of rebuilding glibc)"}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"this has created an issue where CDTs get installed to the wrong path (sym links kind of work, but\none would not be able to swap cos6 to cos7 in an env)"}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"thus we want to rebuild the CDTs to remove cos6 and cos7 from their paths (and will use the sysroot packages to make\nsure old-style CDTs, cos6 and cos7 are all mutually exclusive in envs)"}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"old-style CDT:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["needs to have ",(0,i.jsx)(s.code,{children:"no_hoist"})," in the source sections"]}),"\n",(0,i.jsxs)(s.li,{children:["sysroot dir has ",(0,i.jsx)(s.code,{children:"conda_cos6"})," or ",(0,i.jsx)(s.code,{children:"conda_cos7"})," in the path"]}),"\n",(0,i.jsxs)(s.li,{children:["needs to have ",(0,i.jsx)(s.code,{children:"run_constrained"})," entry of ",(0,i.jsx)(s.code,{children:"sysroot_{subdir} ==99999999999"})," to prevent\nit from being co-installed w/ the new compilers or CDTs"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"new-style CDT:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["needs to have ",(0,i.jsx)(s.code,{children:"no_hoist"})," in the source sections"]}),"\n",(0,i.jsxs)(s.li,{children:["sysroot dir has ",(0,i.jsx)(s.code,{children:"conda"})," only in the path"]}),"\n",(0,i.jsxs)(s.li,{children:["needs to have ",(0,i.jsx)(s.code,{children:"run"})," requirement on the proper version of the ",(0,i.jsx)(s.code,{children:"sysroot_{subdir}"})," package\nso that it is only installed with CDTs from the right version of CentOS\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"2.12 for cos6"}),"\n",(0,i.jsx)(s.li,{children:"2.17 for cos7"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"old plan is to roughly"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsx)(s.li,{children:"patch repo data to make current CDTs on conda-forge conflict w/ new compilers (PR issued)"}),"\n",(0,i.jsx)(s.li,{children:"move all of the needed CDTs from defaults to conda-forge so that we can build from conda-forge (in progress)"}),"\n",(0,i.jsx)(s.li,{children:"turn on strict channel priority (or even remove defaults from list of channels for linux) for builds"}),"\n",(0,i.jsx)(s.li,{children:"write a migrator that will issue PRs to change all old-style CDTs to new-style CDTs"}),"\n",(0,i.jsx)(s.li,{children:"remove path shims from new compilers and sysroots"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"which ones to move etc"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["list of needed things here: ",(0,i.jsx)(s.a,{href:"https://github.com/beckermr/misc/blob/master/work/conda_forge_cdt_scripts/needed_cdt_list.yaml",children:"https://github.com/beckermr/misc/blob/master/work/conda_forge_cdt_scripts/needed_cdt_list.yaml"})]}),"\n",(0,i.jsxs)(s.li,{children:["keep\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"selinux, mesa, pciutils etc (IDK what is included in etc here)"}),"\n",(0,i.jsx)(s.li,{children:"X11"}),"\n",(0,i.jsx)(s.li,{children:"ca-cert is a dep of the java CDTs"}),"\n",(0,i.jsx)(s.li,{children:"libxt (use by gnuplot and r-base)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["maybe keep\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["alsa ones (used by qt but we have this packaged too: ",(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/alsa-lib-feedstock",children:"https://github.com/conda-forge/alsa-lib-feedstock"}),")"]}),"\n",(0,i.jsx)(s.li,{children:"libpng-devel (needed for wxpython and javafx-sdk)"}),"\n",(0,i.jsx)(s.li,{children:"numactl (used by a lot of feedstocks)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["not keep\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"zip (but not in list also)"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"new plan!"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsx)(s.li,{children:"put run_constrained in defaults and conda-forge"}),"\n",(0,i.jsx)(s.li,{children:"build special repo to build them and upload them outside of feedstocks (both new and old kinds)"}),"\n",(0,i.jsx)(s.li,{children:"build and upload the minimal set to conda-forge"}),"\n",(0,i.jsx)(s.li,{children:"turn on strict channel priority in builds and/or remove defaults from channels"}),"\n",(0,i.jsx)(s.li,{children:"push final builds of the new compilers"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (FF) Should we do Outreachy as part of an effort to support diversity in tech? Advantages are low cost and high impact. Dissdvantages are the time effort from the mentors."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (UK) CFEP-18: (Not) Packaging static libraries"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (IF) cf-mark-broken: Marking not broken packages as broken"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"marking packages broken breaks envs"}),"\n",(0,i.jsx)(s.li,{children:"repo data patches are always better"}),"\n",(0,i.jsx)(s.li,{children:"we might want to allow maintainers to mark things broken when the consumers of them\nare only themselves"}),"\n",(0,i.jsx)(s.li,{children:"the speedy aspect of doing things is good for pushing bug fixes fast"}),"\n",(0,i.jsxs)(s.li,{children:["to do (MRB)\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," 24 hour time limit"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," add more detail to PR text to help ppl understand what they are doing"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," make it easier to revert"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (KK) CUDA 11 support"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"CUDA 11 dropped CentOS 6 support"}),"\n",(0,i.jsx)(s.li,{children:"ties into CentOS 7 migration above"}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"cudatoolkit"})," 11 - ",(0,i.jsx)(s.a,{href:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7",children:"https://github.com/AnacondaRecipes/cudatoolkit-feedstock/pull/7"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Make sure we have a glibc run constrain line"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["Add Docker image (need to double check how ",(0,i.jsx)(s.code,{children:"FROM"})," can be adjusted conditionally)\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Needs a recent docker version but this should work\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"ARG IMAGE=ubuntu:lastest\nFROM ${IMAGE}\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) Anyone want to put in for PyData Global?"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://global.pydata.org/pages/cfp.html",children:"https://global.pydata.org/pages/cfp.html"})}),"\n",(0,i.jsx)(s.li,{children:"(submissions not open yet)"}),"\n",(0,i.jsx)(s.li,{children:'CJ will put something in under "Lessons from Industry" discussing a risk model view of CF (please let CJ know if you are interested/have a perspective to add)'}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (IF) strict channel priority"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Needed for PyPy"}),"\n",(0,i.jsx)(s.li,{children:"Needed for Cos7"}),"\n",(0,i.jsx)(s.li,{children:"Remove packages that we don't fully support. For eg: there are 3 builds of scipy on windows."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(s.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(s.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," (CJ) Status of openjdk, r-java stalled out"]}),"\n"]}),"\n",(0,i.jsx)(s.h5,{id:"stuff-from-last-week-that-we-didnt-get-to",children:"Stuff from last week that we didnt get to"}),"\n",(0,i.jsx)(s.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(s.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(s.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(s.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(s.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(s.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(s.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," still need to finish CFEP-13"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(s.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(s.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(s.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n",(0,i.jsx)(s.li,{children:"(MRB) The stalebot has solved the worst of the issues here. I think we could defer this one permanently."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(s.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(s.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(s.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(s.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/cfep/pull/34",children:"cfep-18"})," Packaging static libraries"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(s.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(s.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(s.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (CJ) Form finance subteam"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MRB) document how users are supposed to interpret broken label"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (MRB) update how we, as core, are supposed to mark packages as broken"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) document strategies for reproducible environments using conda-forge"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (UK) Static libraries stuff\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," Add linting hints to builds to find them"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," Recommend how to package them -> CFEP-18"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",checked:!0,disabled:!0})," We should write docs saying we don't provide support and this is a bad idea. -> CFEP-18"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (ED) Who we are page? Some combination of a FAQ and a who is everyone. FAQ things like:\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"who's the POC for CF <> Anaconda, CF <> NumFocus, CF <> Azure"}),"\n",(0,i.jsx)(s.li,{children:"who's the POC for the various subteams?"}),"\n",(0,i.jsx)(s.li,{children:"Informal information: roles, day jobs, bios, the whole nine yards, why you're here, etc."}),"\n",(0,i.jsx)(s.li,{children:"Public or internal? I don't really care either way. Anyone feel strongly one way or the other?"}),"\n",(0,i.jsx)(s.li,{children:"opt-in to public bios"}),"\n",(0,i.jsxs)(s.li,{children:["software carpentry has a large number of instructors and has ",(0,i.jsx)(s.a,{href:"https://carpentries.org/instructors",children:"https://carpentries.org/instructors"})]}),"\n",(0,i.jsx)(s.li,{children:'some concern about "yet another place to keep stuff up to date"'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,i.jsx)(s.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsxs)(s.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,i.jsxs)(s.li,{className:"task-list-item",children:[(0,i.jsx)(s.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>o});var i=n(96540);const t={},l=i.createContext(t);function c(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);