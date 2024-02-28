"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[4699],{98324:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var i=s(85893),t=s(11151);const l={title:"2020-04-15"},a="2020-04-15 conda-forge core meeting",r={id:"orga/minutes/2020-04-15",title:"2020-04-15",description:"Attendees",source:"@site/docs/orga/minutes/2020-04-15.md",sourceDirName:"orga/minutes",slug:"/orga/minutes/2020-04-15",permalink:"/docs/orga/minutes/2020-04-15",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/orga/minutes/2020-04-15.md",tags:[],version:"current",lastUpdatedAt:1709138077,formattedLastUpdatedAt:"Feb 28, 2024",frontMatter:{title:"2020-04-15"},sidebar:"docs",previous:{title:"2020-04-29",permalink:"/docs/orga/minutes/2020-04-29"},next:{title:"2020-04-01",permalink:"/docs/orga/minutes/2020-04-01"}},o={},c=[{value:"Attendees",id:"attendees",level:2},{value:"Agenda",id:"agenda",level:2},{value:"Your agenda items",id:"your-agenda-items",level:3},{value:"Active votes",id:"active-votes",level:3},{value:"Subteam updates",id:"subteam-updates",level:3},{value:"Bot",id:"bot",level:4},{value:"ARM",id:"arm",level:4},{value:"POWER",id:"power",level:4},{value:"CUDA",id:"cuda",level:4},{value:"Docs",id:"docs",level:4},{value:"staged-recipes",id:"staged-recipes",level:4},{value:"website",id:"website",level:4},{value:"security+systems",id:"securitysystems",level:4},{value:"CI infrastructure",id:"ci-infrastructure",level:3},{value:"Compiler upgrade",id:"compiler-upgrade",level:4},{value:"CFEP updates",id:"cfep-updates",level:3},{value:"Open PRs",id:"open-prs",level:4},{value:"Discussion",id:"discussion",level:2},{value:"Check in on previous action items",id:"check-in-on-previous-action-items",level:2},{value:"Last meeting",id:"last-meeting",level:3},{value:"2 meetings ago",id:"2-meetings-ago",level:3},{value:"3 meetings ago",id:"3-meetings-ago",level:3},{value:"Move to Issue Tracker",id:"move-to-issue-tracker",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",input:"input",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"2020-04-15-conda-forge-core-meeting",children:"2020-04-15 conda-forge core meeting"}),"\n",(0,i.jsx)(n.h2,{id:"attendees",children:"Attendees"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"* CJ Wright\n* Jonathan Helmus\n* Eric Dill\n* Matthew Becker\n* Cheng Lee\n* Marius van Niekerk\n* Amy Williams\n* Timothy Snyder\n* John Kirkham\n* Michael Sarahan\n* Kale Franz\n* Marcel Bargull\n* Patrick Sodr\xe9\n* Uwe Korn\n* Sylvain Corlay\n* Nehal Wani\n* Wolf Vollprecht\n* Anthony Scopatz\n"})}),"\n",(0,i.jsx)(n.h2,{id:"agenda",children:"Agenda"}),"\n",(0,i.jsx)(n.h3,{id:"your-agenda-items",children:"Your agenda items"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"intros for people on the line"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Tim S."}),"\n",(0,i.jsx)(n.li,{children:"Nehal W."}),"\n",(0,i.jsx)(n.li,{children:"Sylvain"}),"\n",(0,i.jsxs)(n.li,{children:["Cheng Lee\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"primary day-to-day rep between Anaconda Distro <> CF"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Vote ended on 2020-03-11. What were the results of the vote?"}),"\n",(0,i.jsx)(n.li,{children:"Did we hear back from NumFOCUS, asks Isuru a week ago (Filipe: better yet, who is out NF point of contact? I volunteered but got exactly zero response from the core.)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[MRB] CFEP-13"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["appveyor removal\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"With some great work from @isuruf we were able to move isl."}),"\n",(0,i.jsx)(n.li,{children:"The only thing left is libssh2 which works and is blocked on a separate issue."}),"\n",(0,i.jsxs)(n.li,{children:["I did a census of everything else (~400 packages). It breaks down into 5 cases\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"package has a build error and uses appveyor (~10ish)"}),"\n",(0,i.jsx)(n.li,{children:"error in feedstock caused my code to say it had appveyor but didn't (~20ish)"}),"\n",(0,i.jsx)(n.li,{children:"package has an old branch that was for a PR (should not be there) and uses appveyor, but not on master"}),"\n",(0,i.jsx)(n.li,{children:"package has an old version branch that uses appveyor but not on master"}),"\n",(0,i.jsx)(n.li,{children:"package uses appveyor on master but has not been built in at least 1.5 years"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"Given the above, I think removal of appveyor is completely fine."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"endpoints on web services bot are done"}),"\n",(0,i.jsxs)(n.li,{children:["next steps are\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"enabling token rotations in smithy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsx)(n.li,{children:"enabling the use of the endpoints in the ci setup and smithy"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.ol,{start:"3",children:["\n",(0,i.jsx)(n.li,{children:"several large-scale migrations to move feedstocks to new system"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.ol,{start:"4",children:["\n",(0,i.jsx)(n.li,{children:"PR to staged recipes to turn it on for everything"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Only issue on moving from AppVeyor to Azure is that Python 3.6.x and Python 3.7.x use Profile Guided Optimization (PGO), but Python 3.8 does not use it. If we move to Azure, our Python would be slower. PGO makes Python 30-40% faster.\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"There is a pending PR by jhelmus on moving Python 3.6 to azure (disabling PGO). Appveyor times out."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[CJ] Need better (more active?) handling of pinning PRs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Now that the bot proposes them it would be good to be more proactive about merging/rejecting/deffering migrations"}),"\n",(0,i.jsx)(n.li,{children:"merge them all. godspeed."}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/962",children:"https://github.com/regro/cf-scripts/issues/962"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[CJ] Free pycharm/jetbrains licenses for those on core (ping CJ if you need one or follow the link in keybase)"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"In about a year CJ will need to ping JetBrains to renew"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[MRB] bot census!"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Please reply to our note with any information you have!"}),"\n",(0,i.jsx)(n.li,{children:"from the note, we are organizing around keybase + authy for securing credentials + MFA"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[Wolf+SC] mirrors"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"hopefully Wolf and Sylvain can put together a CFEP for this"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"OVHCloud interested in providing free hosting and compute to conda-forge.\nNote: they already host a good portion of mybinder's trafic and nbviewer.\nNote: they already offered to host the meta channel thingy by Scopatz."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Having access to a non-CDN mirror may be good in the short term when updating a large number of inter-dependent packages. E.g. ROS distributions. This may accelerate migrations."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"This could also be collocated to some of the build resources."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Mamba / QuantStack: Testing automatically looking for mirrors and finding the fastest one"}),"\n",(0,i.jsx)(n.li,{children:"conda-web.anaconda.org bypasses the conda.anaconda.org CDN (bandwidth from conda-web costs Anaconda more, does not have repodata patches)"}),"\n",(0,i.jsx)(n.li,{children:"Anaconda maintains repodata metadata patching, need to figure out how to manage a mirror of that"}),"\n",(0,i.jsx)(n.li,{children:"If you're going to mirror then you should mirror the CDN repodata.json"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://pypi.org/project/conda-mirror/",children:"https://pypi.org/project/conda-mirror/"})," ",(0,i.jsx)(n.a,{href:"https://github.com/regro/conda-mirror",children:"https://github.com/regro/conda-mirror"})]}),"\n",(0,i.jsx)(n.li,{children:"How do you get an account on OVHCloud?"}),"\n",(0,i.jsx)(n.li,{children:"Should conda-forge think about moving to a model where we upload from CI -> blob storage -> anaconda.org? Then conda-forge can maintain its own backup."}),"\n",(0,i.jsx)(n.li,{children:"Security considerations around MITM."}),"\n",(0,i.jsxs)(n.li,{children:["Schedule follow-on discussion\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Sylvain (",(0,i.jsx)(n.a,{href:"mailto:sylvain.corlay@quantstack.net",children:"sylvain.corlay@quantstack.net"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Wolf"}),"\n",(0,i.jsx)(n.li,{children:"Marius"}),"\n",(0,i.jsx)(n.li,{children:"Kirkham"}),"\n",(0,i.jsx)(n.li,{children:"Uwe"}),"\n",(0,i.jsx)(n.li,{children:"Patrick"}),"\n",(0,i.jsx)(n.li,{children:"Eric"}),"\n",(0,i.jsxs)(n.li,{children:["Matthew Becker (",(0,i.jsx)(n.a,{href:"mailto:becker.mr@gmail.com",children:"becker.mr@gmail.com"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Jonathan (check internally for who else)"}),"\n",(0,i.jsxs)(n.li,{children:["Cheng (",(0,i.jsx)(n.a,{href:"mailto:clee@anaconda.com",children:"clee@anaconda.com"}),")"]}),"\n",(0,i.jsxs)(n.li,{children:["Scopatz (",(0,i.jsx)(n.a,{href:"mailto:scopatz@gmail.com",children:"scopatz@gmail.com"}),")"]}),"\n",(0,i.jsxs)(n.li,{children:["Kale (",(0,i.jsx)(n.a,{href:"mailto:kfranz@anaconda.com",children:"kfranz@anaconda.com"}),")"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["(Nehal) Is conda going to support multiple mirrors for a given channel? (Try another mirror if one times out/is slow)\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Mamba is - although in the case of the public channels, it may not make sense because there is a CDN."}),"\n",(0,i.jsx)(n.li,{children:"[Kale] I'd say definitely something to consider for Conda. But signing/artifact verification needs to come into that consideration. That's something we're actively working on now though, so now is a good time to bring it into the conversation."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[Uwe] conda-build issues"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Currently we have a lot of the latest versions marked as broken"}),"\n",(0,i.jsx)(n.li,{children:"Mostly prefix replacements"}),"\n",(0,i.jsx)(n.li,{children:"Jonathan to respond on the issue"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[Kale] Proposal for a Working Group dedicated to major Conda features and design initiatives that\nbroadly affect the ecosystem as a whole"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"top of list stuff: pypy, namespaces"}),"\n",(0,i.jsx)(n.li,{children:"weekly-ish cadence, can shift as needed"}),"\n",(0,i.jsx)(n.li,{children:"(eric) would love an update / read-out occasionally at the core meeting."}),"\n",(0,i.jsxs)(n.li,{children:["if interested, add your name here:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Marius"}),"\n",(0,i.jsx)(n.li,{children:"Scopatz"}),"\n",(0,i.jsxs)(n.li,{children:["Matthew Becker (",(0,i.jsx)(n.a,{href:"mailto:becker.mr@gmail.com",children:"becker.mr@gmail.com"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Sylvain"}),"\n",(0,i.jsx)(n.li,{children:"Wolf"}),"\n",(0,i.jsx)(n.li,{children:"Cheng"}),"\n",(0,i.jsx)(n.li,{children:"Eric (maybe)"}),"\n",(0,i.jsx)(n.li,{children:"Michael Sarahan"}),"\n",(0,i.jsxs)(n.li,{children:["Nehal (Would like to see ",(0,i.jsx)(n.a,{href:"https://pastebin.com/raw/2bFFM76u",children:"https://pastebin.com/raw/2bFFM76u"})," implemented someday!)"]}),"\n",(0,i.jsx)(n.li,{children:"Marcel (hopefully starting June -- if Bioconda-Job things work out)"}),"\n",(0,i.jsx)(n.li,{children:"Kirkham"}),"\n",(0,i.jsxs)(n.li,{children:["Filipe Fernandes (",(0,i.jsx)(n.a,{href:"mailto:ocefpaf@gmail.com",children:"ocefpaf@gmail.com"}),")"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["[Kale] @Nehal with respect to package signing, we have an engineer 100% dedicated to designing and developing that now. The engineer is Sebastian Awwad ",(0,i.jsx)(n.a,{href:"https://www.linkedin.com/in/sebastienawwad/",children:"https://www.linkedin.com/in/sebastienawwad/"})," who worked in the TUF group at NYU for a number of years."]}),"\n",(0,i.jsxs)(n.li,{children:["How does this relate to opening up merge access to conda repos?\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["What do you hope to gain as a maintainer of conda? Some thoughts:\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Being part of the discussions around direction of conda"}),"\n",(0,i.jsx)(n.li,{children:"Taking some pressure of the distro team"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"[CJ] Institutional Partners page in docs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"TODO: Submit skeleton for PR into conda-forge.github.io repo"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"active-votes",children:"Active votes"}),"\n",(0,i.jsx)(n.h3,{id:"subteam-updates",children:"Subteam updates"}),"\n",(0,i.jsx)(n.h4,{id:"bot",children:"Bot"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["[CJ/Matt] Prep for R 4.0.0 migration underway\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["see status here: ",(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1025",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1025"})]}),"\n",(0,i.jsx)(n.li,{children:"Use Mamba to check solvability before PR (for migrations that can do that) so that less PRs are opened where builds will knowingly fail, enabling automerge to be more succesful"}),"\n",(0,i.jsxs)(n.li,{children:["Made PR to add automerge to all ",(0,i.jsx)(n.code,{children:"r-*"})," feedstocks w/ conda-forge/r on the team, using ",(0,i.jsx)(n.code,{children:"cran_mirror"}),", and not r-base. (in agreement with the conda-forge/r team)"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["[CJ] Better understanding/handling of run_exports\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Particularly applicable to issues involving boost and header only deps ",(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-scripts/issues/960",children:"https://github.com/regro/cf-scripts/issues/960"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"arm",children:"ARM"}),"\n",(0,i.jsx)(n.h4,{id:"power",children:"POWER"}),"\n",(0,i.jsx)(n.h4,{id:"cuda",children:"CUDA"}),"\n",(0,i.jsx)(n.h4,{id:"docs",children:"Docs"}),"\n",(0,i.jsx)(n.h4,{id:"staged-recipes",children:"staged-recipes"}),"\n",(0,i.jsx)(n.h4,{id:"website",children:"website"}),"\n",(0,i.jsx)(n.h4,{id:"securitysystems",children:"security+systems"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"see bot census above"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"ci-infrastructure",children:"CI infrastructure"}),"\n",(0,i.jsx)(n.h4,{id:"compiler-upgrade",children:"Compiler upgrade"}),"\n",(0,i.jsx)(n.h3,{id:"cfep-updates",children:"CFEP updates"}),"\n",(0,i.jsx)(n.h4,{id:"open-prs",children:"Open PRs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/7",children:"cfep-04"})," X11 and CDT policy"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Needs new champion. Thanks for your work on this pkgw! Has unaddressed comments from pkgw as from Jan 10, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/9",children:"cfep-06"})," Staged-recipes review lifecycle"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Lingering comment from @saraedum. @jakirkham, can you reply? Has unadressed comment from @saraedum from Jan 8, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge-enhancement-proposals/pull/15",children:"cfep-10"})," Feedstock statuses, unmaintained"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"INACTIVE - Merge in with some inactive-esque status?"}),"\n",(0,i.jsx)(n.li,{children:"Needs another review. Has unaddressed updates from pkgw as of Jan 11, 2020"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/cfep/pull/23",children:"cfep-12"})," Removing packages that violate the terms of the source package"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Active debate about moving to "broken" vs deleting from conda-forge channel'}),"\n",(0,i.jsx)(n.li,{children:"Active vote, ends on 2020-03-11"}),"\n",(0,i.jsx)(n.li,{children:"What were the results of the vote?"}),"\n",(0,i.jsx)(n.li,{children:"Did we hear back from NumFOCUS?"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"discussion",children:"Discussion"}),"\n",(0,i.jsx)(n.h2,{id:"check-in-on-previous-action-items",children:"Check in on previous action items"}),"\n",(0,i.jsx)(n.p,{children:"Copy previous action items from last meeting agenda."}),"\n",(0,i.jsx)(n.h3,{id:"last-meeting",children:"Last meeting"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Dill) schedule mirroring conversation"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Kale) schedule conda working group"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) Merge all the pinnings PRs"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (MRB) CFEP-13 next steps?\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," enabling token rotations in smithy"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," enabling the use of the endpoints in the ci setup and smithy"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," several large-scale migrations to move feedstocks to new system"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," PR to staged recipes to turn it on for everything"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (CJ) Institutional Partners page in docs\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," TODO: Submit skeleton for PR into conda-forge.github.io repo"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-meetings-ago",children:"2 meetings ago"}),"\n",(0,i.jsx)(n.h3,{id:"3-meetings-ago",children:"3 meetings ago"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," (Matt Becker) Update the docs with our current thinking / principles."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"move-to-issue-tracker",children:"Move to Issue Tracker"}),"\n",(0,i.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-10 next steps: CJ to call a vote for feedback"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," cfep-06 next steps: Ask staged recipes team to champion this CFEP and move it forward"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," jakirkham & CJ-wright to sync on adding CUDA to the migration bot"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Scheduling Anaconda <-> conda-forge sync on anaconda.org requirements gathering\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Will try and get this scheduled in the next month."}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Anthony) Reach out to NumFocus to figure out legal ramifications of not including licenses in files."]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) check internally for funding levels for hotels & flying folks from the community in?"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (Eric) Figure out finances of conda-forge to support themselves?"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jjhelmus) Open up CFEP for which python's we're going to support"]}),"\n",(0,i.jsx)(n.li,{children:"Remove conda forge readthedocs."}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) write a blog post on CUDA stuff we discussed today"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) update docs on how to add CUDA support to feedstocks"]}),"\n",(0,i.jsxs)(n.li,{className:"task-list-item",children:[(0,i.jsx)(n.input,{type:"checkbox",disabled:!0})," (jakirkham) will open an issue on conda-smithy to investigate Drone issues. (ping the aarch team)\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/954",children:"https://github.com/conda-forge/conda-forge.github.io/issues/954"})}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(67294);const t={},l=i.createContext(t);function a(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);