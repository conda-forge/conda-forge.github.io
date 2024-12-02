"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[66611],{36859:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var o=n(97240),s=n(74848),a=n(28453);const i={},r="The new conda-forge.org",h={authorsImageUrls:[]},c=[{value:"Old vs new",id:"old-vs-new",level:2},{value:"What we have changed",id:"what-we-have-changed",level:2},{value:"New features you can use",id:"new-features-you-can-use",level:2},{value:"How to help and contribute",id:"how-to-help-and-contribute",level:2},{value:"Acknowledgements",id:"acknowledgements",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",kbd:"kbd",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"As you might have noticed, for the last few months we have been changing different parts of the conda-forge.org website. Read more to learn more about what we changed, how it works and how to contribute."}),"\n",(0,s.jsx)(t.h2,{id:"old-vs-new",children:"Old vs new"}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/tree/1d3214c295a46a249434de4fcf48c6b8d747a07f",children:"old conda-forge.org"})," documentation was written with ",(0,s.jsx)(t.a,{href:"https://www.sphinx-doc.org",children:"Sphinx"}),". Some extra extensions were responsible for the other parts of the website; e.g. the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/blog",children:"blog"}),", the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/tree/1d3214c295a46a249434de4fcf48c6b8d747a07f/newsfeed",children:"RSS feed"}),", the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/1d3214c295a46a249434de4fcf48c6b8d747a07f/index.html.tmpl",children:"frontpage"}),", ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/1d3214c295a46a249434de4fcf48c6b8d747a07f/feedstock_outputs.html.tmpl",children:"feedstock outputs"}),", or the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/status/tree/bde62db0bc9de460f533d60ca6218604c3e42fa5/site",children:"status page"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["The new website has been rewritten using the ",(0,s.jsx)(t.a,{href:"https://docusaurus.io/",children:"Docusaurus"})," project. This allows us to have a single framework for all the sections of the site. There are some big differences if we compare the new site with the old one:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Sphinx was written in Python. Docusaurus uses the Node.js stack."}),"\n",(0,s.jsx)(t.li,{children:"Most of our docs were written in RST. Docusaurus handles Markdown and MDX (Markdown + JSX)."}),"\n",(0,s.jsxs)(t.li,{children:["Instead of generating static HTML from Jinja templates, we now prefer fetching the JSON payloads and render the relevant pages at build time (i.e. when we run ",(0,s.jsx)(t.code,{children:"npm run build"}),") or at load time (when the user visits the website). This allows to have all the website rendering logic in the same repository with a unified theme, search engine and statistics."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"what-we-have-changed",children:"What we have changed"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The theme for the whole site is responsive, accessible, mobile friendly and supports dark/light modes. A style guide is available too."}),"\n",(0,s.jsx)(t.li,{children:"The Status dashboard fetches data dynamically and provides detailed views for each migration."}),"\n",(0,s.jsx)(t.li,{children:"The Packages section lists latest updates in addition to mapping packages to feedstocks."}),"\n",(0,s.jsx)(t.li,{children:"A new Download page displays links to the latest Miniforge installers."}),"\n",(0,s.jsx)(t.li,{children:"The documentation has been split in two top-level categories: Docs and Community."}),"\n",(0,s.jsx)(t.li,{children:"Algolia generously serves the backend for the search bar."}),"\n",(0,s.jsx)(t.li,{children:"Netlify will render previews on each opened PR for a smoother contribution process."}),"\n",(0,s.jsx)(t.li,{children:"The blog posts and the announcements feed are served natively by Docusaurus."}),"\n",(0,s.jsx)(t.li,{children:"We converted all the Sphinx-native ReStructuredText documents to Docusaurus-friendly Markdown."}),"\n",(0,s.jsx)(t.li,{children:"The conda-forge.yml docs are autogenerated from the conda-smithy schemas."}),"\n",(0,s.jsxs)(t.li,{children:["... and a bunch of smaller changes in the documentation. Refer to the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues/1971",children:"meta-issue"})," for more information!"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"new-features-you-can-use",children:"New features you can use"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Learn how to use and maintain packages from conda-forge in the ",(0,s.jsx)(t.a,{href:"/docs",children:"main documentation section"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Read about how our community is set up in the ",(0,s.jsx)(t.a,{href:"/community",children:"Community section"})]}),"\n",(0,s.jsxs)(t.li,{children:["The most recent changes to our infrastructure will be announced in ",(0,s.jsx)(t.a,{href:"/news",children:"News"}),". You can also subscribe to the ",(0,s.jsx)(t.a,{href:"pathname:///news/rss.xml",children:"RSS feed"})," and browse the ",(0,s.jsx)(t.a,{href:"/news/archive/",children:"archive"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Important information about the ecosystem is discussed in the ",(0,s.jsx)(t.a,{href:"/blog",children:"Blog"}),". You can also subscribe to the ",(0,s.jsx)(t.a,{href:"pathname:///blog/rss.xml",children:"RSS feed"})," and browse the ",(0,s.jsx)(t.a,{href:"/blog/archive/",children:"archive"}),". The posts are sometimes categorized with ",(0,s.jsx)(t.a,{href:"/blog/tags/",children:"tags"})," too."]}),"\n",(0,s.jsxs)(t.li,{children:["Use the search bar to locate any document in the website! It should be smart enough to remember the content you need more often. Use the ",(0,s.jsx)(t.kbd,{children:"Cmd/Ctrl"}),"+",(0,s.jsx)(t.kbd,{children:"K"})," shortcut for faster access."]}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.a,{href:"/status",children:"Status dashboard"})," will inform you about the latest incidents and ongoing migrations. Each migration has now a permalink you can explore and share!"]}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.a,{href:"/packages",children:"Packages"})," section will help you find all the packages in conda-forge. If you don't type anything in the search bar, it will list the last 100 uploads to the Anaconda.org channel. The metadata link in each row will take you to the ",(0,s.jsxs)(t.a,{href:"https://conda-metadata-app.streamlit.app/",children:[(0,s.jsx)(t.code,{children:"conda-metadata-app"})," dashboard"]}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Use the ",(0,s.jsx)(t.a,{href:"/download",children:"Download page"})," to get the latest Miniforge installers."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"how-to-help-and-contribute",children:"How to help and contribute"}),"\n",(0,s.jsxs)(t.p,{children:["We have changed a lot of things, so there's a chance we missed something somewhere. If you have suggestions or errors to report, please let us know in the ",(0,s.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/issues",children:"website issue tracker"}),". Feel free to check the ",(0,s.jsx)(t.a,{href:"/docs/user/contributing/#improve-the-website",children:"documentation contribution guidelines"})," too."]}),"\n",(0,s.jsx)(t.h2,{id:"acknowledgements",children:"Acknowledgements"}),"\n",(0,s.jsx)(t.p,{children:"This revamp was a months-long effort. The core team would like to take a moment to thank to all the contributors that made it possible (in alphabetical order): Afshin Darian, Asmit Malakannawar, Gabriela Vives, Isabela Presedo-Floyd, Klaus Zimmermann, Tania Allard."})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>r});var o=n(96540);const s={},a=o.createContext(s);function i(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(a.Provider,{value:t},e.children)}},97240:e=>{e.exports=JSON.parse('{"permalink":"/news/2024/04/09/new-website","source":"@site/news/2024-04-09-new-website.md","title":"The new conda-forge.org","description":"As you might have noticed, for the last few months we have been changing different parts of the conda-forge.org website. Read more to learn more about what we changed, how it works and how to contribute.","date":"2024-04-09T00:00:00.000Z","tags":[],"hasTruncateMarker":true,"authors":[],"frontMatter":{},"unlisted":false,"prevItem":{"title":"Clang now available as compiler for all platforms","permalink":"/news/2024/04/30/clang-everywhere"},"nextItem":{"title":"Upcoming migration for stdlib(\\"c\\")","permalink":"/news/2024/03/24/stdlib-migration"}}')}}]);