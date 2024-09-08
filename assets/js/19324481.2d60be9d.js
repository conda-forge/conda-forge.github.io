"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[9351],{79412:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var s=t(74848),i=t(28453);const o={title:"2019-08-07"},a="2019-08-07 conda-forge core meeting",r={id:"minutes/2019-08-07",title:"2019-08-07",description:"HackMD link",source:"@site/community/minutes/2019-08-07.md",sourceDirName:"minutes",slug:"/minutes/2019-08-07",permalink:"/community/minutes/2019-08-07",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes/2019-08-07.md",tags:[],version:"current",lastUpdatedAt:172583119e4,frontMatter:{title:"2019-08-07"},sidebar:"community",previous:{title:"2019-09-04",permalink:"/community/minutes/2019-09-04"},next:{title:"2019-07-24",permalink:"/community/minutes/2019-07-24"}},l={},c=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"ESIP update (Filipe)",id:"esip-update-filipe",level:3},{value:"Start a blog",id:"start-a-blog",level:3},{value:"User survey (John K)",id:"user-survey-john-k",level:3},{value:"Migrate away from Appveyor (Marius / Isuru)",id:"migrate-away-from-appveyor-marius--isuru",level:3},{value:"CZI (Scopatz)",id:"czi-scopatz",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Eric",id:"eric",level:3},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"New Action items",id:"new-action-items",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"2019-08-07-conda-forge-core-meeting",children:"2019-08-07 conda-forge core meeting"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://hackmd.io/1VB13FnIQpiruA0lb04MKw?edit",children:"HackMD link"})}),"\n",(0,s.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,s.jsx)(n.p,{children:"List the attendees for the meeting"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Jonathan Helmus"}),"\n",(0,s.jsx)(n.li,{children:"Filipe Fernandes"}),"\n",(0,s.jsx)(n.li,{children:"Kai Tietz"}),"\n",(0,s.jsx)(n.li,{children:"Lori Burns"}),"\n",(0,s.jsx)(n.li,{children:"Sophia Castellarin"}),"\n",(0,s.jsx)(n.li,{children:"Marius van Niekerk"}),"\n",(0,s.jsx)(n.li,{children:"Michael Sarahan"}),"\n",(0,s.jsx)(n.li,{children:"Anthony Scopatz"}),"\n",(0,s.jsx)(n.li,{children:"John Blischak"}),"\n",(0,s.jsx)(n.li,{children:"Sophia Parafina"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,s.jsx)(n.p,{children:"Please add new items to the meeting Agenda"}),"\n",(0,s.jsx)(n.h3,{id:"esip-update-filipe",children:"ESIP update (Filipe)"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Thread in gitter from Filipe about the ESIP funding. Annie Burgess (the coordinator of the lab incubator grant) has the following to say:"}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"I've been pretty pleased with how the CondaForge\nproject has gone on a couple of fronts."}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"I think the model of using the funding for sprints,\nwith direct or in-kind contribution from other orgs\n(e.g. Anaconda) is a good model for how to get some\nconcerted development done on some of these\nfoundational software projects."}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"Also, seems they've been able to get quite a bit\ndone at the sprints themselves."}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"In terms of the utility of what they've done,\nthat is really for the community/users to decide.\nIt would be good to seek users out to see how the added\nfunctionality is helping them accomplish their work AND\nto scope what next development efforts could be next,\nwith ESIP or other funding agencies."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"start-a-blog",children:"Start a blog"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Thread in gitter about starting a blog that is a follow-on from the ESIP update"}),"\n"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:'We have to work on the second part there. Most of the results from the latest improvements in conda-forge are "invisible" to an average user. They will get newer packages faster thanks to the migration infrastructure we have and the packages will be more stable. But most users won\'t even notice that. TL;DR we need to start blogging.'}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsx)(n.li,{children:"Bit of a discussion around Medium, but that doesn't easily let others contribute. Someone needs to manage the Medium account."}),"\n",(0,s.jsx)(n.li,{children:"Using github to host the blog was proposed and had +1's from Marcel, Bjorn and John"}),"\n",(0,s.jsx)(n.li,{children:"Cross-posting blogs to the Anaconda blog is also on the table. Had a +1 from John on that. Any objections?"}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," TODO: Find someone to champion running the blog and someone to do the infrastructure work to set up the blog. That can be the same person but doesn't have to be"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Discussion:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Chris Roth might be interested, he has been interested in docs in the past. (Filipe will contact)\nTechnology to use:"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Markdown?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Jupyter Notebooks?"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Let champion have final say in technology to use."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Need reviewers once content is created"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"user-survey-john-k",children:"User survey (John K)"}),"\n",(0,s.jsx)(n.p,{children:"Also in gitter, from John (plus some light editing to clarify):"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"How do we feel about doing a user survey? As in, a short list of\nquestions about what people are using Conda-forge for and what\nthings they would like to improve. Just thinking how we can\naddress the request in the last (ESIP) paragraph (above). This\nshould give us some tangible community-oriented goals that we can\nmove towards over the next year (and data to back that it up in\ncase someone asks why we spent time on some task)"}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Link to google document that John mentioned that he would be creating"]}),"\n",(0,s.jsxs)(n.li,{children:["Questions:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"How would you feel about collecting telemetry information?"}),"\n",(0,s.jsx)(n.li,{children:"How do you use conda-forge"}),"\n",(0,s.jsx)(n.li,{children:"What architectures, platforms, etc do you use?"}),"\n",(0,s.jsx)(n.li,{children:"What packages are missing in conda-forge"}),"\n",(0,s.jsx)(n.li,{children:"What's needed here?"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.em,{children:"How"})," do we conduct a user survey?\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Typeform makes nice surveys but not free for volume needed (",(0,s.jsx)(n.a,{href:"https://www.typeform.com/pricing/",children:"https://www.typeform.com/pricing/"}),") +1"]}),"\n",(0,s.jsx)(n.li,{children:"Google forms?"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Who is interested in helping:\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Conduct the user survey?"}),"\n",(0,s.jsx)(n.li,{children:"Collate the results?"}),"\n",(0,s.jsx)(n.li,{children:"Analyze the data?"}),"\n",(0,s.jsx)(n.li,{children:"Produce the resultant report?"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"migrate-away-from-appveyor-marius--isuru",children:"Migrate away from Appveyor (Marius / Isuru)"}),"\n",(0,s.jsx)(n.p,{children:"Discussion in gitter between Marius and Isuru. Anything else needed to discuss?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Everything that doesn't use CMake or msbuild is a candidate to migrate off of Appveyor"}),"\n",(0,s.jsx)(n.li,{children:"Could use Azure API to get the builds that are successful"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:'Using build status is not ideal since Azure logs are only available for a limited time.\nCan use cfgraph to determine if cmake is used.\nPush with "skip appveyor" to all effected feedstocks or create migrator, former seems better.'}),"\n",(0,s.jsx)(n.p,{children:"AppVeyor usage:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"have 4 job plan"}),"\n",(0,s.jsx)(n.li,{children:"~4 feedstocks added per day"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Actions:"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Get list of packages to KEEP on Appveyor"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Change the default fo Azure."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"czi-scopatz",children:"CZI (Scopatz)"}),"\n",(0,s.jsxs)(n.p,{children:["Have conda-forge apply to CZI for funding.\nGrants up to 250k\nFocus on Open Source infastructure\nWhat would the topic of the grant be?\nFunding would not be directly under conda-forge but under another organization.\nNumFocus could sub-contract these funds.\nCould team up with bioconda (",(0,s.jsx)(n.a,{href:"https://github.com/orgs/bioconda/teams/core/members",children:"core team"}),")"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://chanzuckerberg.com/rfa/essential-open-source-software-for-science/",children:"https://chanzuckerberg.com/rfa/essential-open-source-software-for-science/"}),"\nMid-December 2019\nMid-June 2020"]}),"\n",(0,s.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,s.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,s.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Need a new conda-smithy release for ARMV7"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,s.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,s.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,s.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,s.jsx)(n.p,{children:"Please add a level three markdown heading (###) with whatever you wish to discuss."}),"\n",(0,s.jsx)(n.h3,{id:"eric",children:"Eric"}),"\n",(0,s.jsx)(n.p,{children:"Record the meetings and upload them to youtube?"}),"\n",(0,s.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,s.jsx)(n.p,{children:"Notes from todays core meeting"}),"\n",(0,s.jsx)(n.p,{children:"QT recipe almost ready, needed some fixes for clang.\nRSS feed is available for conda-forge repository.  Would be helpful to provide docs on how this should be interpreted."}),"\n",(0,s.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Filipe: Research software for audio listen only access for other members of the community that want to attend but aren't part of core.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"I e-mailed them, no answer yet. We have a better chance asking directly during one of the meetings."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Filipe to open issue about fixing docs -- there were some issues that came up at the sprints.\nTwo were fixed at SciPy. One is pending: make the use of ",(0,s.jsx)(n.code,{children:"strict"})," clear in our docs."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Mike S.:  pypy Next steps: Say yes / no to the spec, point out potential pitfalls, give it back to (Matti?) and say here's the work that needs to be done."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," Marius to reach out to Wolf about robot operating systems making it to conda-forge\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"He's just done this on his own :D"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Marius: Open issue on conda-forge.github.io noting work done on the kubernetes cluster"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Marius: reach out to internal IT to clean up some Zoom hiccups."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Marius: intel compiler architecture repo update.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Will set up linux hosts"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Matt: source-extractor update. Follow-up with Anthony and NumFocus around the renaming issue. ",(0,s.jsx)(n.strong,{children:"Update:"})," Anthony has submitted the potential CoC violation, we are waiting to hear back. Feedback from participants at Python in Astronomy 2019 was that it is time for the name to change to source-extractor."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Eric: Set up meeting to talk through the conda-forge feature set requirements for the new Anaconda.org"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Eric: Confirm with core team that no one wants access, as long as the conda-forge feature set is included in the design of the replacement for anaconda.org"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"new-action-items",children:"New Action items"}),"\n",(0,s.jsx)(n.p,{children:"Copy new action items to next meetings agenda so we can check in.\nMake sure each action item is assigned to someone or it will likely not get done."}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Filipe: contact Chris Roth about interesting in helping in create a blog"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," John K: Create, or link, google doc with survey questions"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Marius: Begin migration from AppVeyor, see topic for breakout items"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Jonathan: conda smithy release for linux-armv7l"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Anthony + SoPhia: Statuspage RSS"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var s=t(96540);const i={},o=s.createContext(i);function a(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);