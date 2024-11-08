"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[5485],{15359:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=i(74848),o=i(28453);const s={unlisted:!0},t="NumFOCUS SDG 2023 Round 1 Proposal",a={id:"funding/sdg-2023-1",title:"sdg-2023-1",description:"Name of Submitter:",source:"@site/community/funding/sdg-2023-1.md",sourceDirName:"funding",slug:"/funding/sdg-2023-1",permalink:"/community/funding/sdg-2023-1",draft:!1,unlisted:!0,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/funding/sdg-2023-1.md",tags:[],version:"current",lastUpdatedAt:1731071307e3,frontMatter:{unlisted:!0}},l={},c=[];function d(e){const n={a:"a",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{id:"numfocus-sdg-2023-round-1-proposal"})}),"\n",(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"numfocus-sdg-2023-round-1-proposal",children:"NumFOCUS SDG 2023 Round 1 Proposal"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Name of Submitter:"})}),"\n",(0,r.jsx)(n.p,{children:"Jaime Rodr\xedguez-Guerra"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Your Email:"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"mailto:jrodriguez@quansight.com",children:"jrodriguez@quansight.com"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Is your project Sponsored or Affiliated?"})}),"\n",(0,r.jsx)(n.p,{children:"Fiscally Sponsored"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Select Your Project:"})}),"\n",(0,r.jsx)(n.p,{children:"conda-forge"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Proposal Title:"})}),"\n",(0,r.jsx)(n.p,{children:"Access control improvements for opt-in CI (Continuous Integration) services"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Two Sentence Summary of Proposal:"})}),"\n",(0,r.jsx)(n.p,{children:"To implement an open and transparent mechanism to grant and maintain access control for CI services in conda-forge. Such a mechanism will allow project's maintainers to request on-demand CI services for their packages, in the event the default runner capabilities are not sufficient (e.g. GPU-enabled libraries, build times longer than 6h, insufficient memory or disk space)."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Description of Proposal:"})}),"\n",(0,r.jsx)(n.p,{children:"Conda-forge relies on 3rd party Continuous Integration (CI) services to build the thousands of packages maintained by its community. Azure Pipelines handles most of the load and is the default CI service for Linux, macOS and Windows. conda-forge does support other CI providers, like Travis, Circle or Drone, for non-x64 Linux architectures (ARM64 and PowerPC). Still, the availability of these runners is much more limited than Azure's, leading to long waiting times and numerous servicing errors that hinder conda-forge's performance."}),"\n",(0,r.jsxs)(n.p,{children:["To alleviate all these problems, conda-forge is considering making some non-default providers available to projects that satisfy certain eligibility criteria (see ",(0,r.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1875",children:"https://github.com/conda-forge/conda-forge.github.io/issues/1875"}),"). Such an approach requires some sort of access control mechanism with the following features:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"A request protocol where maintainers can apply for usage of certain CI providers, and authorized members can review and approve such requests."}),"\n",(0,r.jsx)(n.li,{children:"A public list of approved projects and the access granted within each resource."}),"\n",(0,r.jsx)(n.li,{children:"A way of revoking access to previously authorized resources if needed."}),"\n",(0,r.jsx)(n.li,{children:"The only manual steps in the process should be the review and approval. Everything else should happen in an automated way."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["We propose a mechanism inspired by the procedures followed in ",(0,r.jsx)(n.a,{href:"https://github.com/conda-forge/admin-requests",children:"https://github.com/conda-forge/admin-requests"}),", with a publicly available list of the allocated resources per project that follows established best practices in the Infrastructure as Code community."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Please explain the benefit of this proposal including:"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Impact to the project"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Impact to the scientific ecosystem"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Impact to the community"})}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Having an opt-in mechanism for specialized CI services in conda-forge will not only make the allocation of scarce resources more fair and transparent, but it will also pave the way for the implementation of previously unavailable building strategies."}),"\n",(0,r.jsxs)(n.p,{children:["For example, GPU-enabled runners were requested a few years ago (see ",(0,r.jsx)(n.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/63",children:"https://github.com/conda-forge/conda-forge.github.io/issues/63"}),", dated 2016), but conda-forge is still unable to provide a secure and fair way to deliver this service. Thanks to the collaboration of several conda-forge partners, a prototype workflow is now available (see ",(0,r.jsx)(n.a,{href:"https://github.com/conda-forge/cf-autotick-bot-test-package-feedstock/pull/446",children:"https://github.com/conda-forge/cf-autotick-bot-test-package-feedstock/pull/446"}),"); however it cannot be made freely available to the community without an access control mechanism."]}),"\n",(0,r.jsx)(n.p,{children:"A second example of such a need is the hypothetical availability of cloud computing resources donated by a generous institution. Ensuring that the donated credits are available to the requested (or best-suited) projects would also need to happen through the same access control mechanism."}),"\n",(0,r.jsx)(n.p,{children:"Overall, the proposal hereby submitted will significantly impact how conda-forge builds its packages beyond publicly available runners with time-limited resources by:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Enabling secure access to specialized CI services and resources, which will allow conda-forge to operate more reliably by reducing waiting times and service availability errors."}),"\n",(0,r.jsx)(n.li,{children:"Allowing projects to benefit from new building features without hindering the existing infrastructure's reliability."}),"\n",(0,r.jsx)(n.li,{children:"Providing a mechanism for donors (or sponsors) to support conda-forge by sponsoring or donating cloud computing credits easily."}),"\n",(0,r.jsx)(n.li,{children:"Diversifying the type of resources available and providing additional support for non-traditional architectures or computing, thus better serving maintainers and community members."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Amount Requested:"})}),"\n",(0,r.jsx)(n.p,{children:"10000"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Brief Budget Justification: (Please include hours and/or pay rates)"})}),"\n",(0,r.jsx)(n.p,{children:"The budget will be used to pay for development time for key personnel in this grant as follows:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Expense: Key Personnel (dev hours)"}),"\n",(0,r.jsx)(n.li,{children:"Number of hours: 112 hours (for the project's duration)"}),"\n",(0,r.jsx)(n.li,{children:"Total: $ 10,000 USD"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Timeline of Deliverables:"})}),"\n",(0,r.jsx)(n.p,{children:"We would like to complete this project as soon as possible; however, to implement this with comprehensive community feedback, we are accounting for reasonable response times in our consultations with the conda-forge team. To that end, we would like to propose an estimated implementation delivery at the end of September 2023, with the possibility of finishing earlier if the feedback loop is kept tight and no show-stoppers are found."}),"\n",(0,r.jsx)(n.p,{children:"Identified deliverables are:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Design an access control strategy with the conda-forge infrastructure team (before July 2023)"}),"\n",(0,r.jsx)(n.li,{children:"Implement the proposed strategy in conda-forge repositories (before September 2023)"}),"\n",(0,r.jsxs)(n.li,{children:[". Security review of the Cirun (",(0,r.jsx)(n.a,{href:"https://cirun.io/",children:"https://cirun.io/"}),") integration layer to prevent unauthorized cross-access to additional CI resources (before September 2023)"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Has someone been identified to carry out the work in the proposal?\nPlease list the name(s) of the person(s) who will be carrying out the work and a short statement (approximately 1 sentence) of why they are qualified."})}),"\n",(0,r.jsx)(n.p,{children:"Yes."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Jaime Rodr\xedguez-Guerra <",(0,r.jsx)(n.a,{href:"mailto:jrodriguez@quansight.com",children:"jrodriguez@quansight.com"}),">, member of conda-forge core, has sufficient experience in the existing infrastructure and CI workflows powering conda-forge."]}),"\n",(0,r.jsxs)(n.li,{children:["Amit Kumar, software engineer at Quansight, is the author of the Cirun (",(0,r.jsx)(n.a,{href:"https://cirun.io/",children:"https://cirun.io/"}),") integration layer and has set up the GPU backend servicing the experimental prototype CI at conda-forge."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"How will someone be identified to carry out the work?"})}),"\n",(0,r.jsx)(n.p,{children:"Personnel has already been identified."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Please list the name and email address of a project leader(s) who has approved this proposal."})}),"\n",(0,r.jsxs)(n.p,{children:["This proposal is also approved by conda-forge core member Filipe Fernandes <",(0,r.jsx)(n.a,{href:"mailto:ocefpaf@gmail.com",children:"ocefpaf@gmail.com"}),">."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>a});var r=i(96540);const o={},s=r.createContext(o);function t(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);