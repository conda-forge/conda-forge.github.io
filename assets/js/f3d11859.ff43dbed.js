"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[7046],{68365:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var i=t(85893),a=t(11151);const r={},o="The feedstock",s={id:"maintainer/understanding_conda_forge/feedstocks",title:"The feedstock",description:"A feedstock is the home of one recipe; it may produce more than one conda artifact in the case of a multi-output recipe.",source:"@site/docs/maintainer/understanding_conda_forge/feedstocks.md",sourceDirName:"maintainer/understanding_conda_forge",slug:"/maintainer/understanding_conda_forge/feedstocks",permalink:"/docs/maintainer/understanding_conda_forge/feedstocks",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/maintainer/understanding_conda_forge/feedstocks.md",tags:[],version:"current",lastUpdatedAt:1724745123e3,frontMatter:{},sidebar:"docs",previous:{title:"Staged-recipes",permalink:"/docs/maintainer/understanding_conda_forge/staged_recipes"},next:{title:"Glossary",permalink:"/docs/glossary"}},c={},d=[{value:"Initialization",id:"initialization",level:2},{value:"Package building diagram",id:"package-building-diagram",level:2},{value:"Events that trigger new builds",id:"events-that-trigger-new-builds",level:2},{value:"Manually submitted PRs",id:"manually-submitted-prs",level:3},{value:"Automated PRs",id:"automated-prs",level:3},{value:"Version updates",id:"version-updates",level:4},{value:"Rebuilds for migrators",id:"rebuilds-for-migrators",level:4}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",mermaid:"mermaid",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"the-feedstock",children:"The feedstock"}),"\n",(0,i.jsx)(n.p,{children:"A feedstock is the home of one recipe; it may produce more than one conda artifact in the case of a multi-output recipe.\nThe feedstock is where for most events in the life of a recipe take place."}),"\n",(0,i.jsx)(n.h2,{id:"initialization",children:"Initialization"}),"\n",(0,i.jsxs)(n.p,{children:["The feedstock repository is created following the merging in ",(0,i.jsx)(n.code,{children:"staged-recipes"})," (see ",(0,i.jsx)(n.a,{href:"/docs/maintainer/understanding_conda_forge/staged_recipes#feedstock-creation",children:"Feedstock creation"})," for details on that process)."]}),"\n",(0,i.jsx)(n.h2,{id:"package-building-diagram",children:"Package building diagram"}),"\n",(0,i.jsx)(n.p,{children:"Package building can be triggered by several events, which are described in the next section.\nIn all of those cases, the following sequence plays out."}),"\n",(0,i.jsx)(n.mermaid,{value:"sequenceDiagram\n    box github\n    participant f as feedstock\n    end\n    box CI provider\n    participant c as CI\n    end\n    box distribution infrastructure\n    participant s as cf-staging channel\n    participant cf as conda-forge channel\n    participant cdn as CDN\n    end\n    f->>+c: trigger build\n    Note right of c: 1. build<br/>2. local validate\n    opt if valid and required (4.)\n    c->>s: upload packages\n    s->>c: report reception success/failure\n    Note right of s: 3. remote validate\n    s->>cf: upload packages\n    cf->>cdn: upload packages\n    end\n    c->>-f: report success/failure"}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["For Linux and ",(0,i.jsx)(n.code,{children:"noarch"})," packages, the build itself is carried out in a Docker container on the CI. On macOS and Windows, the CI runner system image is used after tuning it a bit."]}),"\n",(0,i.jsxs)(n.li,{children:["The local validation happens on the CI and checks that the artifacts produced during the build are permissible for this feedstock by consulting ",(0,i.jsxs)(n.a,{href:"/docs/maintainer/infrastructure/#feedstock-outputs",children:["the ",(0,i.jsx)(n.code,{children:"feedstock-outputs"})," repository"]}),"."]}),"\n",(0,i.jsx)(n.li,{children:"The server-side validation is essentially the same as 2. It is repeated inside the distribution infrastructure to guard against potential intentional or unintentional interference at the feedstock level, which is easier to access."}),"\n",(0,i.jsxs)(n.li,{children:["The upload is only triggered if the local validation (2.) was successful. Additionally, it is only performed under certain conditions, for example for commits in ",(0,i.jsx)(n.code,{children:"main"}),", but ",(0,i.jsx)(n.em,{children:"not"})," in PRs. Note that the package may also fail to transfer from ",(0,i.jsx)(n.code,{children:"cf-staging"})," to ",(0,i.jsx)(n.code,{children:"conda-forge"})," if the server-side validation (3.) fails. If 2. succeeds and 3. fails, this is usually due to an outdated token."]}),"\n"]})}),"\n",(0,i.jsx)(n.h2,{id:"events-that-trigger-new-builds",children:"Events that trigger new builds"}),"\n",(0,i.jsx)(n.p,{children:"Package building is either triggered as part of a PR or on commits to branches in the feedstock repository (which in turn usually stem from the merging of PRs)."}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"Any"})," commit on ",(0,i.jsx)(n.em,{children:"any"})," branch in the feedstock can lead to the building and publication of a package.\nTo avoid the gratuitous publication of improper packages, development branches MUST NOT be added to the feedstock repository.\nInstead, they live in forks of the feedstock repository and the associated work is added only via pull requests."]})}),"\n",(0,i.jsx)(n.p,{children:"Almost all changes to the feedstock repository are performed via PRs.\nThis is true both for manual maintainer intervention and conda-forge automation."}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsx)(n.p,{children:"It is possible to add commits to branches directly.\nThis is occasionally used to re-trigger a failed CI run with an empty commit:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-console",children:'git commit --allow-empty -m "Retrigger CI"\n'})})]}),"\n",(0,i.jsx)(n.h3,{id:"manually-submitted-prs",children:"Manually submitted PRs"}),"\n",(0,i.jsxs)(n.p,{children:["These PRs are not automated. Any Github user can open a new PR by forking the feedstock, creating a fresh branch from ",(0,i.jsx)(n.code,{children:"main"})," and adding the necessary commits to achieve the intended change (e.g. building a new version or adding a new platform)."]}),"\n",(0,i.jsx)(n.p,{children:"It is up to the feedstock maintainers and/or the conda-forge/core team to review, approve and merge the PR, or to reject it and close it."}),"\n",(0,i.jsx)(n.p,{children:"During the lifetime of the PR, some automated operations will take place:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The linter will scan the state of the recipe to require changes and suggest improvements. If not fulfilled, this will result in a failed CI run. Linter failures must ",(0,i.jsx)(n.em,{children:"not"})," be ignored without explicit core approval."]}),"\n",(0,i.jsxs)(n.li,{children:["The PR template will ask you to rerender the feedstock at least once per PR. This will ensure that the CI configuration is up-to-date, among other things. You can use the bot command ",(0,i.jsx)(n.a,{href:"/docs/maintainer/infrastructure/#conda-forge-admin-please-rerender",children:(0,i.jsx)(n.code,{children:"@conda-forge-admin, please rerender"})})," in any comment, or do it locally via ",(0,i.jsx)(n.code,{children:"conda-smithy rerender"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"automated-prs",children:"Automated PRs"}),"\n",(0,i.jsx)(n.p,{children:"There is a variety of situations in which the conda-forge automation will create PRs.\nIn these cases, it is generally the privilege of the feedstock maintainers to review and merge the PR, triggering the action on the repository."}),"\n",(0,i.jsxs)(n.p,{children:["Every commit on a branch will trigger the ci ",(0,i.jsx)(n.em,{children:"unless"})," its commit message contains the tag ",(0,i.jsx)(n.code,{children:"[ci skip]"}),", which can be achieved for PRs by including it in the PR title. Some providers ignore this tag during PRs but do obey it in runs triggered by a branch like ",(0,i.jsx)(n.code,{children:"main"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"version-updates",children:"Version updates"}),"\n",(0,i.jsxs)(n.p,{children:["When a new version is released upstream, a PR needs to be created that performs the necessary updates to the feedstock.\nAt a minimum, that includes updating the version, download URL, and hash of the upstream source artifact.\nIn addition, other changes to the recipe may be needed, such as updated dependency requirements, a change to the ",(0,i.jsx)(n.code,{children:"noarch"})," status of the package, or an adaptation of the build or test scripts.\nWhile these last changes often need to be done by the maintainers, conda-forge has sophisticated capabilities to add the initial version update PR."]}),"\n",(0,i.jsxs)(n.admonition,{title:"How does it work?",type:"info",children:[(0,i.jsxs)(n.p,{children:["This happens in two steps in the CI of ",(0,i.jsx)(n.a,{href:"https://github.com/regro/cf-scripts",children:(0,i.jsx)(n.code,{children:"cf-scripts"})}),"."]}),(0,i.jsxs)(n.p,{children:["First, the version information is updated from upstream sources and stored in the ",(0,i.jsxs)(n.a,{href:"/docs/maintainer/infrastructure/#regrocf-graph-countyfair",children:[(0,i.jsx)(n.code,{children:"cf-graph-countyfair"})," repo"]}),", more specifically in the ",(0,i.jsx)(n.code,{children:"versions"})," directory tree, nested by hash with one file per package."]}),(0,i.jsx)(n.mermaid,{value:"sequenceDiagram\n    participant cfs as cf-scripts\n    participant gha as github actions\n    participant cft as conda_forge_tick\n    participant ups as upstream\n    participant cfg as cf-graph-countyfair\n    loop every hour at :15, :45\n        cfs->>gha: bot-versions\n        gha->>cft: update-upstream-versions\n        cft->>cfg: load package information from `graph.json`\n        loop for every package\n            cft->>ups: query version\n            ups->>cft: return version\n            cft->>cfg: write new version\n        end\n    end"}),(0,i.jsxs)(n.p,{children:["Second, the main bot CI job, the ",(0,i.jsx)(n.code,{children:"bot-bot"})," action in ",(0,i.jsx)(n.a,{href:"/docs/maintainer/infrastructure/#regrocf-scripts",children:(0,i.jsx)(n.code,{children:"cf-scripts"})})," creates PRs for all packages that have a new version available upstream.\nHere is a simplified diagram of how that is done. For the full picture, read ",(0,i.jsx)(n.a,{href:"#rebuilds-for-migrators",children:"below"}),"."]}),(0,i.jsx)(n.mermaid,{value:"sequenceDiagram\n    participant cfs as cf-scripts\n    participant gha as github actions\n    participant cft as conda_forge_tick\n    participant fs as feedstock\n    participant cfg as cf-graph-countyfair\n    loop self renewing\n        cfs->>gha: bot-bot\n        gha->>cft: auto-tick\n        note right of cfg: the graph now contains<br/>the new version information\n        cft->>cfg: load package information from `graph.json`\n        loop for every package\n            opt if new version\n                cft->>fs: rewrite recipe and open pr\n            end\n        end\n        gha->>gha: re-trigger bot-bot\n    end"})]}),"\n",(0,i.jsx)(n.p,{children:"Once submitted, it is up to the feedstock maintainers to check the PR, make any necessary adjustments, and merge it into the feedstock branch."}),"\n",(0,i.jsx)(n.p,{children:"This version update is an example of a migrator. Read more about migrators in the following section."}),"\n",(0,i.jsx)(n.h4,{id:"rebuilds-for-migrators",children:"Rebuilds for migrators"}),"\n",(0,i.jsx)(n.p,{children:"The version update is one example of a migrator.\nIn reality, there are more occasions and reasons to update recipes, for example, to recompile an otherwise unchanged binary program or library to link against a newer version of a dependency or to add support for a new architecture.\nThis kind of use case is handled by migrators, which are a general recipe rewriting tool."}),"\n",(0,i.jsxs)(n.p,{children:["A more complete picture of what ",(0,i.jsx)(n.code,{children:"auto-tick"})," does is the following:"]}),"\n",(0,i.jsx)(n.mermaid,{value:"sequenceDiagram\n    participant cfs as cf-scripts\n    participant gha as github actions\n    participant cft as conda_forge_tick\n    participant fs as feedstock\n    participant cfg as cf-graph-countyfair\n    loop self renewing\n        cfs->>gha: bot-bot\n        gha->>cft: auto-tick\n        note right of cfg: the graph now contains<br/>the new version information\n        cft->>cfg: load package information from `graph.json`\n        loop for every migrator\n            create participant mg as migrator\n            cft->>mg: run migrator on graph\n            note right of mg: 1. filter applicable package to produce effective graph<br/>2. determine migration order<br/>3. run migrator on every possible node\n            destroy mg\n            mg->>fs: create migration PR\n        end\n        gha->>cfs: deploy, i.e. commit changed pr information\n        gha->>gha: re-trigger bot-bot\n    end"}),"\n",(0,i.jsxs)(n.p,{children:["Migrators are a powerful mechanism that can do almost arbitrary recipe changes.\nThey are written in Python and the current set of migrators can be found in the ",(0,i.jsxs)(n.a,{href:"https://github.com/regro/cf-scripts/tree/master/conda_forge_tick/migrators",children:[(0,i.jsx)(n.code,{children:"regro/cf-scripts"})," repository"]}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>o});var i=t(67294);const a={},r=i.createContext(a);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);