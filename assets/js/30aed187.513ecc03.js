"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[2632],{89092:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var i=s(85893),t=s(11151);const l={title:"2020-01-08"},a="2020-01-08 conda-forge core meeting",r={id:"minutes/2020-01-08",title:"2020-01-08",description:"Attendees",source:"@site/community/minutes/2020-01-08.md",sourceDirName:"minutes",slug:"/minutes/2020-01-08",permalink:"/community/minutes/2020-01-08",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2020-01-08.md",tags:[],version:"current",lastUpdatedAt:172016683e4,frontMatter:{title:"2020-01-08"},sidebar:"community",previous:{title:"2020-01-22",permalink:"/community/minutes/2020-01-22"},next:{title:"2019-11-12",permalink:"/community/minutes/2019-11-12"}},o={},c=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"4 meetings ago",id:"4-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",input:"input",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"2020-01-08-conda-forge-core-meeting",children:"2020-01-08 conda-forge core meeting"}),"\n",(0,i.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(FF) We have a blog: ",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/blog",children:"https://github.com/conda-forge/blog"}),"\nAll we need now is a blog ;-p\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://conda-forge.org/blog/",children:"https://conda-forge.org/blog/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"(CJ) Major bot refactor has finished, most of the code is now in IDE friendly, type hinted python"}),"\n",(0,i.jsxs)(n.li,{children:["(CJ) Matt Becker has joined the bot subteam\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["wants to push on auto-merging green bot PRs. At least looking at what infrastructure needs to be set up for that.\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"(Marcel) makes sense if its opt-in."}),"\n",(0,i.jsx)(n.li,{children:"(Eric) would suggest opt-in at start to work out kinks, once stable switch to opt-out."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"look at issue tracker for more info"}),"\n",(0,i.jsx)(n.li,{children:"UX around abandoned feedstocks? pseudo-abandoned"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["(CJ) Version bump PRs now close open version PRs for previous versions\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Merging the newer version bump PR will close the older version bump PR."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"(jakirkham) use linter bot to update bot's graph with PR status"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(n.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(n.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(jakirkham) CUDA 10.2 migration\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["(CJ) the bot doesn't handle run_exports at all. It's particularly glaring with run_exports strong. Usually fuse host / run to figure dependencies. Does not use build for dependency tracking. Has some notes / issues that descirbes this a bit ",(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/677",children:"https://github.com/regro/cf-scripts/issues/677"}),". TODO: Make a lookup table for the strong run_exports. Before making edges in graph, add in the run_exports strong requirements to the dependencies. This should propery express dependencies in the graph."]}),"\n",(0,i.jsx)(n.li,{children:"(jakirkham) needs pointers from CJ as to where in the bot to make these updates."}),"\n",(0,i.jsxs)(n.li,{children:["(CJ) question: Using ",(0,i.jsx)(n.code,{children:"render"})," from the conda public API. This doesn't seem to add the run_exports to the meta.yaml. Is there another function to use that does add the run_exports to the rendered? A: this function needs all of the jinja variables provided or the rendered dictionary wont be correct."]}),"\n",(0,i.jsx)(n.li,{children:"(jakirkham) Discussion to have. Break cudatoolkit into two packages: cudatoolkit runtime and the rest."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(n.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"(Eric) (finally) renamed conda-forge-enhancement-proposals to cfep"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/5",children:"cfep-03"})," Manual upload of builds"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Has 10 approvals, what are next steps here?"}),"\n",(0,i.jsx)(n.li,{children:"Merged today!"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"jjhelmus to add a comment to this PR about what we discussed today. Ping jjhelmus about tk. It's not clear if we can even build tk against a non system X11 because tk ships its own X11 headers that the conda X11 package doesn't work against"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/3",children:"cfep-05"})," dev/rc builds"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Seems that there was voting, but did anything come of it?"}),"\n",(0,i.jsxs)(n.li,{children:["CJ to make formal vote call on this. Will check in next week\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Vote issued"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Has some recent comments from @saraedum that are unaddressed"}),"\n",(0,i.jsx)(n.li,{children:"Ask staged-recipes team to champion this CFEP and move it forward."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Discussion around maintainers removing themselves"}),"\n",(0,i.jsx)(n.li,{children:"Maybe move to a x number of versions away from most recent"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-graph-countyfair/blob/master/status/could_use_help.json",children:"https://github.com/regro/cf-graph-countyfair/blob/master/status/could_use_help.json"})}),"\n",(0,i.jsx)(n.li,{children:"CJ to make a call to vote"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/18",children:"cfep-11"})," Automated Closing of Excessively Old PRs on Staged Recipes"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Has a 8 approvals. what are next steps?"}),"\n",(0,i.jsx)(n.li,{children:"Next steps: Merge PR and ping staged-recipes team they can implement if they want?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-11 next steps: Merge PR and ping staged-recipes team they can implement if they want?"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-04 next steps: jjhelmus to add a comment per notes above"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Filipe) CFEP-03: Review, fix any text and merge it in.\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Minor updates that are needed. This will likely get done in December."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) CFEP-08: Merge in with deferred status\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Will check in next meeting."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"4-meetings-ago",children:"4 meetings ago"}),"\n",(0,i.jsx)(n.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(67294);const t={},l=i.createContext(t);function a(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);