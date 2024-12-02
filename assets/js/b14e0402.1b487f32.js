"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[1523],{38286:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>a});var r=o(81544),t=o(74848),s=o(28453);const i={authors:["core"],tags:["conda-forge"]},c="2020 in Review",d={authorsImageUrls:[void 0]},a=[{value:"Strong Growth",id:"strong-growth",level:2},{value:"Big New Features",id:"big-new-features",level:2}];function l(e){const n={code:"code",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"As 2020 winds down, the Core team thought it'd be fun to review some of\nthe big accomplishments our community has made this year."}),"\n",(0,t.jsx)(n.h2,{id:"strong-growth",children:"Strong Growth"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"conda-forge"})," community has grown immensely this year. Here are some\nnumbers to help give you an idea of the scale of our growth."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The community has added 3,751 new, unique ",(0,t.jsx)(n.code,{children:"conda"})," packages this\nyear, along with a corresponding number of new feedstocks."]}),"\n",(0,t.jsxs)(n.li,{children:["For the majority of 2020, the ",(0,t.jsx)(n.code,{children:"conda-forge"})," channel on\n",(0,t.jsx)(n.code,{children:"anaconda.org"})," exceeded 100 million downloads per month."]}),"\n",(0,t.jsxs)(n.li,{children:["In July of 2020, the ",(0,t.jsx)(n.code,{children:"conda-forge"})," channel passed 2 billion total,\nall-time downloads."]}),"\n",(0,t.jsxs)(n.li,{children:["We've grown our core developer community, adding seven new members\nto the ",(0,t.jsx)(n.code,{children:"conda-forge"})," Core team and at least two members to the\n",(0,t.jsx)(n.code,{children:"staged-recipes"})," team."]}),"\n",(0,t.jsxs)(n.li,{children:["We now have over 2,500 recipe maintainers in the ",(0,t.jsx)(n.code,{children:"conda-forge"}),"\nGitHub organization."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"big-new-features",children:"Big New Features"}),"\n",(0,t.jsx)(n.p,{children:"We've also shipped a ton of big updates to our core infrastructure this\nyear. These updates include"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"PyPy"})," ",(0,t.jsx)(n.strong,{children:"support"}),": We added support for ",(0,t.jsx)(n.code,{children:"PyPy"})," 3.6 and now supply\none of the biggest stacks of ",(0,t.jsx)(n.code,{children:"PyPy"}),"-enabled packages in the ",(0,t.jsx)(n.code,{children:"PyPy"}),"\necosystem."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"automerge"}),": We now support the automatic merging of PRs on\nfeedstocks using the ",(0,t.jsx)(n.code,{children:"automerge"})," label or through an opt-in setting\nin the ",(0,t.jsx)(n.code,{children:"conda-forge.yml"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"R"})," ",(0,t.jsx)(n.strong,{children:"4.0 migration"}),": This migration was the first one to use our\n",(0,t.jsx)(n.code,{children:"automerge"})," infrastructure at scale. With it, we completed a\ncomplete rebuild/upgrade of the ",(0,t.jsx)(n.code,{children:"R"})," ecosystem in about a week."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Python"})," ",(0,t.jsx)(n.strong,{children:"updates"}),": We deprecated ",(0,t.jsx)(n.code,{children:"Python"})," 2.7, completed the\n",(0,t.jsx)(n.code,{children:"Python"})," 3.8 migration, and got about 75% of the way through the\n",(0,t.jsx)(n.code,{children:"Python"})," 3.9 migration."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"compiler upgrades"}),": We upgraded our compiler infrastructure to\n",(0,t.jsx)(n.code,{children:"GCC"})," 9 and ",(0,t.jsx)(n.code,{children:"clang"})," 11."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"CentOS 7 and CentOS 6 EOL"}),": We shipped an option to enable our\ncompilers to use the CentOS 7 ",(0,t.jsx)(n.code,{children:"sysroot"})," in preparation for the\nCentOS 6 EOL. We hope to complete the move to CentOS 7 early next\nyear."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"miniforge"}),": We built our own standalone, ",(0,t.jsx)(n.code,{children:"miniconda"}),"-like\ninstallers. These support a broad range of platforms, including\n",(0,t.jsx)(n.code,{children:"osx-arm64"})," and ",(0,t.jsx)(n.code,{children:"linux-aarch64"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"standalone Windows stack"}),": We fully decoupled our Windows recipes\nfrom the ",(0,t.jsx)(n.code,{children:"defaults"})," channel by rebuilding the ",(0,t.jsx)(n.code,{children:"msys2"})," recipes."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Apple silicon support"}),": We added support for Apple silicon with\nour ",(0,t.jsx)(n.code,{children:"osx-arm64"})," platform. This platform is our first one to use a\nfully cross-compiled infrastructure."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"CUDA support"}),": We added support for building CUDA packages on\nwindows and added CUDA 11.0 support."]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.p,{children:["We know that this year has been extremely difficult for so many of our\ncommunity members and that the fantastic success of ",(0,t.jsx)(n.code,{children:"conda-forge"})," would\nnot have been possible without the active participation and support of\nour community. ",(0,t.jsx)(n.strong,{children:"Thank you everyone so much for the work you put into"}),"\n",(0,t.jsx)(n.code,{children:"conda-forge"})," ",(0,t.jsx)(n.strong,{children:"this year, making it the wonderful, community-led\nresource that it is."})]}),"\n",(0,t.jsx)(n.p,{children:"We wish everyone a happy, healthy, and peaceful new year!"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>c});var r=o(96540);const t={},s=r.createContext(t);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(s.Provider,{value:n},e.children)}},81544:e=>{e.exports=JSON.parse('{"permalink":"/blog/2020/12/26/year-in-review","editUrl":"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/blog/2020-12-26-year-in-review.md","source":"@site/blog/2020-12-26-year-in-review.md","title":"2020 in Review","description":"As 2020 winds down, the Core team thought it\'d be fun to review some of","date":"2020-12-26T00:00:00.000Z","tags":[{"inline":true,"label":"conda-forge","permalink":"/blog/tags/conda-forge"}],"readingTime":2.375,"hasTruncateMarker":true,"authors":[{"name":"conda-forge/core","title":"The conda-forge core team","url":"https://github.com/orgs/conda-forge/teams/core","imageURL":"https://github.com/conda-forge.png","key":"core","page":null}],"frontMatter":{"authors":["core"],"tags":["conda-forge"]},"unlisted":false,"prevItem":{"title":"Conda-forge Outreachy","permalink":"/blog/2021/02/02/outreachy"},"nextItem":{"title":"Package Distribution and the anaconda.com Terms of Service","permalink":"/blog/2020/11/20/anaconda-tos"}}')}}]);