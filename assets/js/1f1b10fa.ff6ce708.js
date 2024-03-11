"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[8372],{66525:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>m});var i=n(85893),r=n(11151),s=n(52991);const o={},c="Core team meetings",a={id:"minutes",title:"Core team meetings",description:"We hold biweekly meetings every second Wednesday from 1700 (UTC). Feel free to stop by!",source:"@site/community/minutes.mdx",sourceDirName:".",slug:"/minutes",permalink:"/community/minutes",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/community/minutes.mdx",tags:[],version:"current",lastUpdatedAt:1710154082,formattedLastUpdatedAt:"Mar 11, 2024",frontMatter:{},sidebar:"community",previous:{title:"Contracting ",permalink:"/community/contracting"},next:{title:"2024-03-06",permalink:"/community/minutes/2024-03-06"}},d={},m=[{value:"Setup",id:"setup",level:2},{value:"Minutes",id:"minutes",level:2}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"core-team-meetings",children:"Core team meetings"}),"\n",(0,i.jsxs)(t.p,{children:["We hold biweekly meetings every second Wednesday from 17:00-18:00 (UTC). Feel free to stop by!\nUp-to-date invites are always available in the ",(0,i.jsx)(t.a,{href:"https://conda.org/community/calendar",children:"conda.org community calendar"}),".\nLook for the ",(0,i.jsx)(t.code,{children:"[conda-forge] core meeting"})," events!"]}),"\n",(0,i.jsx)(t.p,{children:"We encourage contributors to join the meetings and learn more about and from the community."}),"\n",(0,i.jsx)(t.h2,{id:"setup",children:"Setup"}),"\n",(0,i.jsxs)(t.p,{children:["Our ",(0,i.jsx)(t.a,{href:"https://conda-forge.org/community/minutes/",children:"meeting notes"})," record important points discussed during the meetings and serve as a record for upcoming meetings.\nWe make use of ",(0,i.jsx)(t.a,{href:"https://hackmd.io/",children:"HackMD"})," and a ",(0,i.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/blob/main/misc/DEV_MEETING_TEMPLATE.md",children:"template"})," to create the meeting notes."]}),"\n",(0,i.jsxs)(t.p,{children:["We use a Github Actions ",(0,i.jsx)(t.a,{href:"https://github.com/conda-forge/conda-forge.github.io/actions/workflows/meeting-notes.yml",children:"workflow"})," to create an automated PR with the meeting notes\ntemplate for each session, which is automatically published to our HackMD team account. During the\nmeeting, attendees will edit the HackMD document. After the meeting, the document is saved and the\nPR is synced with the changes by adding the ",(0,i.jsx)(t.code,{children:"sync-hackmd-notes"})," label. Once satisfied, the PR is\nmerged and the website will be updated with the new meeting notes."]}),"\n",(0,i.jsx)(t.h2,{id:"minutes",children:"Minutes"}),"\n","\n","\n",(0,i.jsx)(s.Z,{})]})}function u(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},52991:(e,t,n)=>{n.d(t,{Z:()=>x});n(67294);var i=n(36905),r=n(53438),s=n(33692),o=n(13919),c=n(95999),a=n(92503);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var m=n(85893);function l(e){let{href:t,children:n}=e;return(0,m.jsx)(s.Z,{href:t,className:(0,i.Z)("card padding--lg",d.cardContainer),children:n})}function u(e){let{href:t,icon:n,title:r,description:s}=e;return(0,m.jsxs)(l,{href:t,children:[(0,m.jsxs)(a.Z,{as:"h2",className:(0,i.Z)("text--truncate",d.cardTitle),title:r,children:[n," ",r]}),s&&(0,m.jsx)("p",{className:(0,i.Z)("text--truncate",d.cardDescription),title:s,children:s})]})}function h(e){let{item:t}=e;const n=(0,r.LM)(t);return n?(0,m.jsx)(u,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,c.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,o.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.xz)(t.docId??void 0);return(0,m.jsx)(u,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function p(e){let{item:t}=e;switch(t.type){case"link":return(0,m.jsx)(f,{item:t});case"category":return(0,m.jsx)(h,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function g(e){let{className:t}=e;const n=(0,r.jA)();return(0,m.jsx)(x,{items:n.items,className:t})}function x(e){const{items:t,className:n}=e;if(!t)return(0,m.jsx)(g,{...e});const s=(0,r.MN)(t);return(0,m.jsx)("section",{className:(0,i.Z)("row",n),children:s.map(((e,t)=>(0,m.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,m.jsx)(p,{item:e})},t)))})}},11151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>o});var i=n(67294);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);