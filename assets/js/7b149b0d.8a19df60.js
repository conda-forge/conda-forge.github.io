"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[6975],{76784:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var i=n(85893),r=n(11151),o=n(52991);const a={title:"Organisation Documentation"},s="Organisation Documentation",c={id:"orga/index",title:"Organisation Documentation",description:"",source:"@site/docs/orga/index.mdx",sourceDirName:"orga",slug:"/orga/",permalink:"/docs/orga/",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/orga/index.mdx",tags:[],version:"current",lastUpdatedAt:1709138077,formattedLastUpdatedAt:"Feb 28, 2024",frontMatter:{title:"Organisation Documentation"},sidebar:"docs",previous:{title:"FAQ",permalink:"/docs/maintainer/maintainer_faq"},next:{title:"Guidelines",permalink:"/docs/orga/guidelines"}},d={},l=[];function u(t){const e={h1:"h1",...(0,r.a)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("a",{id:"organisation-documentation"}),"\n",(0,i.jsx)(e.h1,{id:"organisation-documentation",children:"Organisation Documentation"}),"\n","\n","\n",(0,i.jsx)(o.Z,{})]})}function m(t={}){const{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(u,{...t})}):u(t)}},52991:(t,e,n)=>{n.d(e,{Z:()=>x});n(67294);var i=n(36905),r=n(53438),o=n(33692),a=n(13919),s=n(95999),c=n(92503);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var l=n(85893);function u(t){let{href:e,children:n}=t;return(0,l.jsx)(o.Z,{href:e,className:(0,i.Z)("card padding--lg",d.cardContainer),children:n})}function m(t){let{href:e,icon:n,title:r,description:o}=t;return(0,l.jsxs)(u,{href:e,children:[(0,l.jsxs)(c.Z,{as:"h2",className:(0,i.Z)("text--truncate",d.cardTitle),title:r,children:[n," ",r]}),o&&(0,l.jsx)("p",{className:(0,i.Z)("text--truncate",d.cardDescription),title:o,children:o})]})}function f(t){let{item:e}=t;const n=(0,r.LM)(e);return n?(0,l.jsx)(m,{href:n,icon:"\ud83d\uddc3\ufe0f",title:e.label,description:e.description??(0,s.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e.items.length})}):null}function h(t){let{item:e}=t;const n=(0,a.Z)(e.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.xz)(e.docId??void 0);return(0,l.jsx)(m,{href:e.href,icon:n,title:e.label,description:e.description??i?.description})}function p(t){let{item:e}=t;switch(e.type){case"link":return(0,l.jsx)(h,{item:e});case"category":return(0,l.jsx)(f,{item:e});default:throw new Error(`unknown item type ${JSON.stringify(e)}`)}}function g(t){let{className:e}=t;const n=(0,r.jA)();return(0,l.jsx)(x,{items:n.items,className:e})}function x(t){const{items:e,className:n}=t;if(!e)return(0,l.jsx)(g,{...t});const o=(0,r.MN)(e);return(0,l.jsx)("section",{className:(0,i.Z)("row",n),children:o.map(((t,e)=>(0,l.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,l.jsx)(p,{item:t})},e)))})}},11151:(t,e,n)=>{n.d(e,{Z:()=>s,a:()=>a});var i=n(67294);const r={},o=i.createContext(r);function a(t){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function s(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:a(t.components),i.createElement(o.Provider,{value:e},t.children)}}}]);