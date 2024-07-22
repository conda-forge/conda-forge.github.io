(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[4959,4987],{51799:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>j,measureProgress:()=>u});var a=t(16550),r=t(52263),n=t(80295),i=t(80647),o=t(67294),l=t(80708);const c={migration_details:"migration_details_nlw5",migration_details_bar:"migration_details_bar_y6e_",migration_details_toggle:"migration_details_toggle_jL7E",migration_details_filter:"migration_details_filter_Kdmj",migration_details_filter_button:"migration_details_filter_button_NtvO",migration_details_filter_done:"migration_details_filter_done_vhyw",migration_details_filter_done_on:"migration_details_filter_done_on_AfR9",migration_details_filter_in_pr:"migration_details_filter_in_pr_H6ky",migration_details_filter_in_pr_on:"migration_details_filter_in_pr_on_a1pe",migration_details_filter_awaiting_pr:"migration_details_filter_awaiting_pr_U00X",migration_details_filter_awaiting_pr_on:"migration_details_filter_awaiting_pr_on_xUhZ",migration_details_filter_awaiting_parents:"migration_details_filter_awaiting_parents_HeSQ",migration_details_filter_awaiting_parents_on:"migration_details_filter_awaiting_parents_on_x2c_",migration_details_filter_not_solvable:"migration_details_filter_not_solvable__Z99",migration_details_filter_not_solvable_on:"migration_details_filter_not_solvable_on_Blts",migration_details_filter_bot_error:"migration_details_filter_bot_error_qFh_",migration_details_filter_bot_error_on:"migration_details_filter_bot_error_on_ZzeE",migration_details_filter_icon:"migration_details_filter_icon_fPLm",collapsed:"collapsed_q3RP",expanded:"expanded_ivG_"};var d=t(85893);const m=[["done","Done"],["in-pr","In PR"],["awaiting-pr","Awaiting PR"],["awaiting-parents","Awaiting parents"],["not-solvable","Not solvable"],["bot-error","Bot error"]],g=m.reduce(((e,s)=>{let[t,a]=s;return{...e,[t]:a}}),{}),h="migration-toggle";function u(e){const s=e.done.length+e["in-pr"].length,t=s+e["awaiting-parents"].length+e["awaiting-pr"].length+e["bot-error"].length+e["not-solvable"].length;return{done:s,percentage:s/(t||1)*100,total:t}}function j(){const e=(0,a.TH)(),{siteConfig:s}=(0,r.Z)(),[t,l]=(0,o.useState)({name:e.pathname.replace("/status/migration","").split("/").pop(),details:null,redirect:!1,view:"table"}),m=e=>{if(window&&window.localStorage)try{window.localStorage.setItem(h,e)}catch(s){console.warn("error writing to local storage",s)}l((s=>({...s,view:e})))};if((0,o.useEffect)((()=>{if(!t.name)return l((e=>({...e,redirect:!0})));let e="";if(window&&window.localStorage)try{e=window.localStorage.getItem(h)}catch(s){console.warn("error reading from local storage",s)}(async()=>{try{const s=n.j.migrations.details.replace("<NAME>",t.name),a=await(await fetch(s)).json();a.progress=u(a),l((s=>({...s,details:a,view:e||s.view})))}catch(s){console.warn(`error loading migration: ${t.name}`,s),l((e=>({...e,redirect:!0})))}})()}),[]),t.redirect)return(0,d.jsx)(a.l_,{to:"/status",replace:!0});const{details:g,name:j,view:x}=t;return(0,d.jsx)(i.Z,{title:s.title,description:"Status dashboard for conda-forge",children:(0,d.jsx)("main",{className:`container ${c.migration_details}`,children:(0,d.jsxs)("div",{className:"card margin-top--xs",children:[(0,d.jsxs)("div",{className:"card__header",children:[(0,d.jsxs)("div",{className:c.migration_details_toggle,children:[(0,d.jsx)("button",{onClick:()=>m("table"),children:"Table View"})," ",(0,d.jsx)("button",{onClick:()=>m("graph"),children:"Graph View"})]}),(0,d.jsx)(_,{children:j}),(0,d.jsx)("div",{style:{clear:"both"}})]}),(0,d.jsxs)("div",{className:"card__body",style:{overflow:"auto"},children:[g&&(0,d.jsx)(p,{details:g}),"graph"===x?(0,d.jsx)(f,{children:j}):g&&(0,d.jsx)(b,{details:g})]})]})})})}function p(e){let{details:s}=e;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("h4",{children:["PRs made ",s.progress.percentage.toFixed(0),"%"]}),(0,d.jsx)("div",{className:c.migration_details_bar,children:m.filter((e=>{let[t]=e;return s[t]?.length})).map(((e,t)=>{let[a]=e;return(0,d.jsx)("div",{title:g[a],className:c[`migration_details_filter_${a.replace("-","_")}`],style:{flex:s[a].length}},t)}))})]})}function _(e){let{children:s}=e;return(0,d.jsx)("nav",{"aria-label":"breadcrumbs",children:(0,d.jsxs)("ul",{className:"breadcrumbs",children:[(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)("a",{className:"breadcrumbs__link",href:"/",children:"conda-forge"})}),(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)("a",{className:"breadcrumbs__link",href:"/status",children:"Status"})}),(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)("a",{className:"breadcrumbs__link",href:"/status#migrations",children:"Migrations"})}),(0,d.jsx)("li",{className:"breadcrumbs__item breadcrumbs__item--active",children:(0,d.jsx)("a",{className:"breadcrumbs__link",href:"",children:s})})]})})}function x(e){let{counts:s,filters:t,onFilter:a}=e;const r=c.migration_details_filter_icon;return(0,d.jsx)("div",{className:c.migration_details_filter,children:m.map(((e,n)=>{let[i,o]=e;const l=`migration_details_filter_${i.replace("-","_")}`;return(0,d.jsxs)("div",{className:[c.migration_details_filter_button,c[l],t[i]&&c[`${l}_on`]].join(" "),onClick:()=>a(i),children:[t[i]?(0,d.jsx)("i",{className:`${r} fa-solid fa-filter-circle-xmark`}):(0,d.jsx)("i",{className:`${r} fa-solid fa-filter`})," ",o," (",s[i],")"]},n)}))})}function f(e){const[s,t]=(0,o.useState)(""),a=n.j.migrations.graph.replace("<NAME>",e.children);return(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{style:{textAlign:"center"},children:(0,d.jsx)("a",{href:a,target:"blank",rel:"noopener noreferrer",children:(0,d.jsxs)("code",{children:[e.children,".svg"]})})}),s?(0,d.jsx)("p",{style:{textAlign:"center"},children:"Graph is unavailable."}):(0,d.jsx)("div",{style:{overflowX:"auto"},children:(0,d.jsx)(l.Z,{onError:e=>t(e),src:a,title:e.children,description:`Migration graph for ${e.children}`})})]})}function b(e){let{details:s}=e;const[t,a]=(0,o.useState)(m.reduce(((e,s)=>{let[t]=s;return{...e,[t]:!0}}),{})),r=s._feedstock_status,n=m.reduce(((e,a)=>{let[r]=a;return t[r]?e:e.concat(s[r].map((e=>[e,r])))}),[]).sort(((e,s)=>r[s[0]].num_descendants-r[e[0]].num_descendants||m.findIndex((s=>s[0]==e[1]))-m.findIndex((e=>e[0]==s[1]))||e[0].localeCompare(s[0])));return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(x,{counts:m.reduce(((e,t)=>{let[a]=t;return{...e,[a]:s[a]?.length}}),{}),filters:{...t},onFilter:e=>a((s=>({...s,[e]:!s[e]})))}),n.length>0&&(0,d.jsxs)("table",{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{style:{width:200},children:"Name"}),(0,d.jsx)("th",{style:{width:115},children:"Status"}),(0,d.jsx)("th",{style:{width:115},children:"Total number of children"}),(0,d.jsx)("th",{style:{flex:1},children:"Immediate children"})]})}),(0,d.jsx)("tbody",{children:n.map(((e,s)=>{let[t,a]=e;return(0,d.jsx)(v,{children:{feedstock:r[t],name:t,status:a}},s)}))})]})]})}function v(e){let{children:s}=e;const[t,a]=(0,o.useState)(!0),{feedstock:r,name:n,status:i}=s,l=r.immediate_children||[],m=r.num_descendants,h=r.pr_url,u=r.pre_pr_migrator_status;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:h?(0,d.jsx)("a",{href:h,children:n}):u?(0,d.jsx)("span",{className:`${t?c.collapsed:c.expanded}`,onClick:()=>a(!t),children:n}):(0,d.jsx)("span",{children:n})}),(0,d.jsx)("td",{style:{textAlign:"center"},children:g[i]}),(0,d.jsx)("td",{style:{textAlign:"center"},children:m||null}),(0,d.jsx)("td",{children:l.map(((e,s)=>(0,d.jsxs)(o.Fragment,{children:[(0,d.jsx)("span",{style:{marginBottom:1},className:"badge badge--secondary",children:e}),l.length-1===s?"":" "]},s)))})]}),u&&!t&&(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:4,children:(0,d.jsx)("pre",{dangerouslySetInnerHTML:{__html:u}})})})]})}},80295:(e,s,t)=>{"use strict";t.d(s,{O:()=>a,j:()=>r});const a={usage:{options:{responsive:!0,plugins:{legend:{display:!1}},scales:{x:{type:"time",time:{minUnit:"hour"}},y:{beginAtZero:!0,precision:0}}}}},r={cloud:{anaconda:{api:"https://sqvvxmkr4r26.statuspage.io/api/v2/status.json",link:"https://anaconda.statuspage.io/",title:"Anaconda"},appveyor:{api:"https://status.appveyor.com/api/v2/status.json",link:"https://status.appveyor.com/",title:"AppVeyor"},azure:{api:"https://conda-forge.herokuapp.com/status-monitor/azure",link:"https://status.dev.azure.com/",title:"Azure DevOps"},circle:{api:"https://status.circleci.com/api/v2/status.json",link:"https://status.circleci.com",title:"Circle CI"},github:{api:"https://www.githubstatus.com/api/v2/status.json",link:"https://www.githubstatus.com/",title:"GitHub"},open_gpu_server:{api:"https://conda-forge.herokuapp.com/status-monitor/open-gpu-server",link:"https://ci-status.quansight.dev/",title:"Open GPU Server"},quay:{api:"https://status.redhat.com/api/v2/status.json",link:"https://status.redhat.com/",title:"Quay.io"},travis:{api:"https://www.traviscistatus.com/api/v2/status.json",link:"https://www.traviscistatus.com/",title:"Travis CI"}},azure:{pipelines:"https://conda-forge.herokuapp.com/status-monitor/report/azure-pipelines",status:"https://conda-forge.herokuapp.com/status-monitor/azure"},github:{actions:"https://conda-forge.herokuapp.com/status-monitor/report/github-actions"},stats:"https://raw.githubusercontent.com/conda-forge/by-the-numbers/main/data/live_counts.json",migrations:{details:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/migration_json/<NAME>.json",graph:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/migration_svg/<NAME>.svg?sanitize=true",status:{closed:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/closed_status.json",longterm:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/longterm_status.json",regular:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/regular_status.json"}},repos:{badges:[{name:"conda-forge documentation",link:"https://github.com/conda-forge/conda-forge.github.io",badge:"https://github.com/conda-forge/conda-forge.github.io/workflows/deploy/badge.svg",badgeLink:"https://github.com/conda-forge/conda-forge.github.io/actions?query=workflow%3Adeploy"},{name:"autotick bot",link:"https://github.com/regro/cf-scripts",badge:"https://github.com/regro/cf-scripts/actions/workflows/bot-bot.yml/badge.svg",badgeLink:"https://github.com/regro/cf-scripts/actions"},{name:"feedstock creation",link:"https://github.com/conda-forge/staged-recipes",badge:"https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml/badge.svg",badgeLink:"https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml"},{name:"admin migrations",link:"https://github.com/conda-forge/admin-migrations",badge:"https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml/badge.svg",badgeLink:"https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml"}],cdn:{api:"https://s3.amazonaws.com/conda-static.anaconda.org/conda-forge/last-updated",link:"https://conda-static.anaconda.org/conda-forge/rss.xml"},services:{api:"https://conda-forge.herokuapp.com/alive",link:"https://github.com/conda-forge/conda-forge-webservices"}},travis:{usage:"https://conda-forge.herokuapp.com/status-monitor/report/travis-ci"},versions:{api:"https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/version_status.json",pr:"https://github.com/conda-forge/<NAME>-feedstock/blob/main/recipe/meta.yaml"},schemas:{"conda-forge.yml":"https://raw.githubusercontent.com/conda-forge/conda-smithy/main/conda_smithy/data/conda-forge.json"}}},44383:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>J});var a=t(67294),r=t(80647),n=t(16550),i=t(92949),o=t(80295);const l={incident:"incident_bHzo",incident_body:"incident_body_vl8o",incident_date:"incident_date_ZAIQ",incident_link:"incident_link_d5Xr",incidents:"incidents_x4QA",migrations_table:"migrations_table_ijLA",collapsed:"collapsed_jtOo",ascending:"ascending_COGB",descending:"descending_xERP","button-group":"button-group_Z4eJ",migration:"migration_TNQn",status_dashboard_toc:"status_dashboard_toc_wFg2",toc_anchor:"toc_anchor_E8dj",version_updates:"version_updates_YgGC",expanded:"expanded_TKKo",version_updates_title:"version_updates_title_w7Q7",version_updates_content:"version_updates_content_EpKP",badge:"badge_ep9E",errored_item:"errored_item_ZzIY",errored_item_ellipsis:"errored_item_ellipsis_AJLd",errored_item_spacer:"errored_item_spacer_MxwB",errored_item_content:"errored_item_content_D7al",status_dashboard_graph:"status_dashboard_graph_YEJG",progress_bar:"progress_bar_zlKM",ratio:"ratio_SLdi"};var c=t(85893);const d="All Systems Operational";function m(e){let{onLoad:s,style:t}=e;return(0,a.useEffect)((()=>s?.()),[]),(0,c.jsxs)("div",{className:"card margin-top--xs",style:t,children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsx)("h3",{children:"Cloud Services"})}),(0,c.jsx)("div",{className:"card__body",children:(0,c.jsx)("table",{style:{fontSize:"small"},children:(0,c.jsx)("tbody",{children:Object.keys(o.j.cloud).map(((e,s)=>(0,c.jsx)(g,{...o.j.cloud[e]},s)))})})})]})}function g(e){let{api:s,link:t,title:r}=e;const[n,i]=(0,a.useState)({status:"..."}),o={OPERATIONAL:d,"Everything is looking good":d,operational:d}[n.status]||n.status,l="badge "+(o===d?"badge--success":"badge--warning");return(0,a.useEffect)((()=>{(async()=>{try{const e=(await(await fetch(s)).json()).status,t="object"==typeof e?e.description:e;i({status:t})}catch(e){console.warn(`error fetching data for ${r} \u2013 ${s}`,e)}})()}),[]),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:t,style:{display:"inline-block",minWidth:"100%"},children:r})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{className:l,style:{display:"inline-block",minWidth:"100%",textAlign:"center"},children:o})})]})}var h=t(51799),u=t(33692);const j="migration-collapsed",p="migration-sort";function _(e){let{onLoad:s}=e;const[t,r]=(0,a.useState)({closed:[],collapsed:{closed:!0,longterm:!0,regular:!0},longterm:[],regular:[],sort:{by:"name",order:"ascending"}}),n=e=>{r((s=>{let{closed:t,longterm:a,regular:r,sort:n,...i}=s,o="ascending";if(o=e===n.by&&o===n.order?"descending":o,window&&window.localStorage)try{window.localStorage.setItem(p,JSON.stringify({by:e,order:o}))}catch(l){console.warn("error writing to local storage",l)}return{...i,closed:t.sort(f(e,o)),longterm:a.sort(f(e,o)),regular:r.sort(f(e,o)),sort:{by:e,order:o}}}))},i=e=>r((s=>{let{collapsed:t,...a}=s;const r={...t,[e]:!t[e]};if(window&&window.localStorage)try{const e=JSON.stringify(r);window.localStorage.setItem(j,e)}catch(n){console.warn("error writing to local storage",n)}return{...a,collapsed:r}}));(0,a.useEffect)(function(e,s){return()=>{const t={};if(window&&window.localStorage)try{const e=window.localStorage.getItem(j),s=window.localStorage.getItem(p);e&&(t.collapsed=JSON.parse(e)),s&&(t.sort=JSON.parse(s))}catch(a){console.warn("error reading from local storage",a)}(async t=>{const r=[],n={};for(const e in o.j.migrations.status){let s=0;try{const t=await fetch(o.j.migrations.status[e]);n[e]=Object.entries(await t.json()).map((e=>{let[s,t]=e;return{name:s,description:t}}));for(const{name:i}of n[e])r.push((async s=>{try{const t=o.j.migrations.details.replace("<NAME>",i),a=await fetch(t),r=await a.json();n[e][s].details=r,n[e][s].progress=(0,h.measureProgress)(r)}catch(a){console.warn(`error loading migration: ${i}`,a)}})(s++))}catch(a){console.warn(`error loading top-level ${e} migrations`,a)}}await Promise.all(r),s((e=>{const{by:s,order:a}=t.sort||e.sort;return{...e,...t,closed:n.closed.sort(f(s,a)),longterm:n.longterm.sort(f(s,a)),regular:n.regular.sort(f(s,a))}})),e?.()})(t)}}(s,r),[]);const{closed:d,longterm:m,regular:g}=t,u=d.length+m.length+g.length;return(0,c.jsxs)("div",{className:"card",style:{overflow:"auto"},children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsxs)("h3",{children:["Current Migrations"," ",(0,c.jsx)("span",{className:"badge badge--secondary",children:u})]})}),(0,c.jsx)("div",{className:"card__body",children:(0,c.jsxs)("table",{className:l.migrations_table,children:[(0,c.jsx)(x,{collapsed:t.collapsed.longterm,name:"Long-running migrations",resort:n,rows:m,select:()=>i("longterm"),sort:t.sort}),(0,c.jsx)(x,{collapsed:t.collapsed.regular,name:"Regular migrations",resort:n,rows:g,select:()=>i("regular"),sort:t.sort}),(0,c.jsx)(x,{collapsed:t.collapsed.closed,name:"Closed migrations",resort:n,rows:d,select:()=>i("closed"),sort:t.sort})]})})]})}function x(e){let{collapsed:s,name:t,resort:r,rows:i,select:o,sort:d}=e;const[m,g]=(0,a.useState)("");return m?(0,c.jsx)(n.l_,{to:m,replace:!1,push:!0}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("thead",{children:[(0,c.jsx)("tr",{onClick:o,children:(0,c.jsxs)("th",{colSpan:8,className:s?l.collapsed:void 0,children:[t," ",(0,c.jsx)("span",{className:"badge badge--secondary",children:i.length||"\u2026"})]})}),(0,c.jsxs)("tr",{className:s?l.collapsed:void 0,children:[(0,c.jsx)("th",{onClick:()=>r("name"),className:"name"===d.by?l[d.order]:void 0,children:"Name"}),(0,c.jsx)("th",{onClick:()=>r("status"),className:"status"===d.by?l[d.order]:void 0,children:"PRs made"}),(0,c.jsx)("th",{onClick:()=>r("done"),className:"done"===d.by?l[d.order]:void 0,children:"Done"}),(0,c.jsx)("th",{onClick:()=>r("in-pr"),className:"in-pr"===d.by?l[d.order]:void 0,children:"In PR"}),(0,c.jsx)("th",{onClick:()=>r("awaiting-pr"),className:"awaiting-pr"===d.by?l[d.order]:void 0,children:"Awaiting PR"}),(0,c.jsx)("th",{onClick:()=>r("awaiting-parents"),className:"awaiting-parents"===d.by?l[d.order]:void 0,children:"Awaiting parents"}),(0,c.jsx)("th",{onClick:()=>r("not-solvable"),className:"not-solvable"===d.by?l[d.order]:void 0,children:"Not solvable"}),(0,c.jsx)("th",{onClick:()=>r("bot-error"),className:"bot-error"===d.by?l[d.order]:void 0,children:"Bot error"})]})]}),(0,c.jsx)("tbody",{className:s?l.collapsed:void 0,children:i.map((e=>{const{progress:s}=e,t=`/status/migration/${e.name}`;return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(u.Z,{href:t,style:{display:"block"},onClick:e=>{e.preventDefault(),g(t)},children:e.name})}),(0,c.jsx)("td",{children:(0,c.jsxs)("label",{className:l.progress_bar,children:[(0,c.jsxs)("progress",{value:s.done,max:s.total,children:[s.percentage.toFixed(2),"%"]}),(0,c.jsxs)("span",{className:l.ratio,children:[s.done,"/",s.total]})]})}),(0,c.jsx)("td",{children:e.details.done.length}),(0,c.jsx)("td",{children:e.details["in-pr"].length}),(0,c.jsx)("td",{children:e.details["awaiting-pr"].length}),(0,c.jsx)("td",{children:e.details["awaiting-parents"].length}),(0,c.jsx)("td",{children:e.details["not-solvable"].length}),(0,c.jsx)("td",{children:e.details["bot-error"].length})]},e.name)}))})]})}function f(e,s){switch(e){case"name":return"ascending"===s?(e,s)=>e.name.localeCompare(s.name):(e,s)=>s.name.localeCompare(e.name);case"status":return"ascending"===s?(e,s)=>e.progress.percentage-s.progress.percentage:(e,s)=>s.progress.percentage-e.progress.percentage;default:return"ascending"===s?(s,t)=>s.details[e].length-t.details[e].length:(s,t)=>t.details[e].length-s.details[e].length}}var b=t(30381),v=t.n(b),w=t(31703),y=t(2027),k=t(1634);const N="degraded performance",S="major outage",C=new Set(["investigating",N,S,"maintenance"]),z="YYYY/M/D HH:mm:ss",A=7776e6,E={owner:"conda-forge",repo:"status"},L={investigating:"info",[N]:"warning",[S]:"danger",maintenance:"info"};function $(e){let{ongoing:s,onLoad:t,...r}=e;const[{closed:n,current:i,open:o},d]=(0,a.useState)((()=>{const{current:e,open:s}=r;return{closed:[],current:e??new Set,open:s??[]}}));return(0,a.useEffect)((()=>{!function(e){try{return void 0===e&&(e=i.size&&s&&o.length),async function(){if(e)return;const a=new w.vd({}),r=s?Date.now()+A:Date.now()-A,n=[],i=[];let o=new Set;try{const e=await a.rest.issues.listForRepo({...E,per_page:100,state:"all"});for(const s of e.data){const e=new Set(s.labels.map((e=>{let{name:s}=e;return s}))),t=P(e,C);if(!t.size)continue;const a=t.keys().next().value;"open"===s.state?(n.push({...s,severity:a}),o=new Set([...o,...t])):r<new Date(s.closed_at).getTime()&&i.push({...s,severity:a})}d({closed:i,current:o,open:n})}catch(l){console.warn("error loading github issues",l)}t?.(o.size?{current:o,ongoing:!0,open:n}:void 0)}()}catch(a){return Promise.reject(a)}}()}),[]),(0,c.jsxs)("div",{className:"card margin-top--xs",children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsxs)("h3",{children:["Incidents"," ",!!i.size&&(0,c.jsx)("span",{className:"badge badge--"+(i.has(S)?"danger":i.has(N)?"warning":"info"),children:i.has(S)?S:i.has(N)?N:i.values().next().value})]})}),(0,c.jsxs)("div",{className:`card__body ${l.incidents}`,children:[o.map(((e,s)=>(0,c.jsx)(I,{children:e},s))),n.map(((e,s)=>(0,c.jsx)(I,{children:e},s)))]})]})}function I(e){let{children:s}=e;const t=s,a="open"===t.state,r=v()(t.created_at);return(0,c.jsxs)("div",{className:l.incident,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{className:`badge badge--${a?L[t.severity]:"success"}\n        `,children:a?"ongoing":"resolved"})," ",(0,c.jsx)("span",{className:`badge badge--${L[t.severity]}`,children:t.severity}),(0,c.jsxs)("em",{className:l.incident_date,children:[r.format(z)," UTC"]})]}),(0,c.jsxs)(u.Z,{className:l.incident_link,to:t.html_url,children:[(0,c.jsx)(y.U,{components:{p(e){const{children:s}=e;return(0,c.jsx)(c.Fragment,{children:s})}},children:t.title})," (#",t.number,")"]}),(0,c.jsx)("div",{className:l.incident_body,children:(0,c.jsx)(y.U,{remarkPlugins:[k.Z],children:t.body})})]})}const P=(e,s)=>{const t=new Set,[a,r]=e.size>=s.size?[e,s]:[s,e];for(const n of r)a.has(n)&&t.add(n);return t},O=12e5,M=24e5;function U(e){let{onLoad:s,style:t}=e;return(0,a.useEffect)((()=>s?.()),[]),(0,c.jsxs)("div",{className:"card margin-top--xs",style:t,children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsx)("h3",{children:"Repos and Bots"})}),(0,c.jsx)("div",{className:"card__body",children:(0,c.jsx)("table",{style:{fontSize:"small"},children:(0,c.jsxs)("tbody",{children:[(0,c.jsx)(T,{}),(0,c.jsx)(Z,{}),o.j.repos.badges.map(((e,s)=>{let{name:t,...a}=e;return(0,c.jsx)(D,{...a,children:t},s)}))]})})})]})}function D(e){let{children:s,link:t,badge:a,badgeLink:r}=e;return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:t,style:{display:"inline-block",minWidth:"100%"},children:s})}),(0,c.jsx)("td",{style:{textAlign:"right"},children:(0,c.jsx)(F,{alt:`${s} status`,link:r,children:a})})]})}function F(e){let{alt:s,link:t,children:r}=e;const[n,i]=(0,a.useState)(!1);if(n)return(0,c.jsx)(c.Fragment,{children:"No status available"});const o=(0,c.jsx)("img",{alt:s,style:{verticalAlign:"bottom"},onError:()=>i(!0),src:r});return t?(0,c.jsx)("a",{href:t,children:o}):o}function T(){const[{minutes:e,status:s},t]=(0,a.useState)({minutes:0,status:"\u2026"});return(0,a.useEffect)((()=>{(async()=>{try{const e=await(await fetch(o.j.repos.cdn.api)).text(),s=new Date(e.trim()).getTime(),a=(new Date).getTime()-s,r=a<O?"operational":a<M?"degraded":"major outage";t({minutes:Math.round(a/1e3/60),status:r})}catch(e){console.warn("error loading cdn cloning status",e)}})()}),[]),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:o.j.repos.cdn.link,style:{display:"inline-block",minWidth:"100%"},children:"CDN cloning"})}),(0,c.jsxs)("td",{children:[(0,c.jsx)("div",{style:{display:"block",textAlign:"center"},className:"badge"+("operational"===s?" badge--success":"")+("degraded"===s?" badge--warning":"")+("major outage"===s?" badge--danger":""),children:s}),(0,c.jsxs)("div",{style:{fontStyle:"italic",textAlign:"right"},children:["(last updated ",e," min ago)"]})]})]})}function Z(){const[e,s]=(0,a.useState)("");return(0,a.useEffect)((()=>{(async()=>{try{const{status:e}=await(await fetch(o.j.repos.services.api)).json();s(e)}catch(e){console.warn("error loading web services status",e)}})()}),[]),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:o.j.repos.services.link,style:{display:"inline-block",minWidth:"100%"},children:"conda-forge-webservices"})}),(0,c.jsx)("td",{children:(0,c.jsx)("div",{style:{display:"block",textAlign:"center"},className:"badge"+("operational"===e?" badge--success":"")+("degraded"===e?" badge--warning":"")+("major outage"===e?" badge--danger":""),children:e})})]})}function q(e){let{incident:s}=e;return(0,c.jsx)("aside",{className:l.status_dashboard_toc,children:(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#repos",children:"Repos and Bots"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#cloud",children:"Cloud Services"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#migrations",children:"Current Migrations"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#azure",children:"Azure Pipelines Usage"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#github",children:"GitHub Actions Usage"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#travis",children:"Travis CI Usage"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#incidents",children:"Incidents"})}),(0,c.jsx)("li",{className:"menu__list-item",children:(0,c.jsx)("a",{className:"menu__link",href:"#version",children:"Version Updates"})})]})})}var R=t(65750),H=(t(86961),t(26495));function B(e){let{backgroundColor:s,onLoad:t,title:r,url:n}=e;const[i,d]=(0,a.useState)({rates:{},repos:{},total:0});(0,a.useEffect)((()=>{(async()=>{try{const e=await(await fetch(n)).json();d((s=>({...s,...e})))}catch(e){console.warn("error loading usage chart",e)}t?.()})()}),[]);const m=[{backgroundColor:s,data:[]}],g=[];return Object.keys(i.rates).forEach((e=>{m[0].data.push(i.rates[e]),g.push(v()(e).local())})),(0,c.jsxs)("div",{className:"card margin-top--xs",children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsxs)("h3",{children:[`${r} `,(0,c.jsx)("span",{className:"badge badge--secondary",children:i.total})]})}),(0,c.jsx)("div",{className:`card__body ${l.status_dashboard_graph}`,children:(0,c.jsx)(H.$Q,{data:{labels:g,datasets:m},options:o.O.usage.options})})]})}function G(e){let{onLoad:s}=e;const[{collapsed:t,errored:r,expanded:n,errors:i,queued:d},m]=(0,a.useState)({collapsed:{queued:!0,errored:!0},expanded:{},errored:[],errors:{},queued:[]}),g=e=>()=>m((s=>({...s,expanded:{...s.expanded,[e]:!s.expanded[e]}}))),h=e=>()=>m((s=>({...s,collapsed:{...s.collapsed,[e]:!s.collapsed[e]}})));return(0,a.useEffect)((()=>{(async()=>{try{const e=await(await fetch(o.j.versions.api)).json();m((s=>({...s,...e})))}catch(e){console.warn("error loading version updates",e)}s?.()})()}),[]),(0,c.jsxs)("div",{className:`card margin-top--xs ${l.version_updates}`,children:[(0,c.jsx)("div",{className:"card__header",children:(0,c.jsxs)("h3",{children:["Version Updates"," ",(0,c.jsx)("span",{className:"badge badge--secondary",children:d.length})," ",(0,c.jsx)("span",{className:"badge badge--warning",children:r.length})]})}),(0,c.jsxs)("div",{className:"card__body",children:[(0,c.jsxs)("div",{onClick:h("queued"),className:l.version_updates_title+" "+(t.queued?l.collapsed:l.expanded),children:["Queued Version Updates"," ",(0,c.jsx)("span",{className:"badge badge--secondary",children:d.length})]}),(0,c.jsx)("div",{className:l.version_updates_content,style:t.queued?{display:"none"}:{display:"flex",flexDirection:"row"},children:d.map(((e,s)=>(0,c.jsx)("div",{style:{margin:2},className:`${l.badge} badge badge--secondary`,children:(0,c.jsx)(u.Z,{href:o.j.versions.pr.replace("<NAME>",e),children:e})},s)))}),(0,c.jsxs)("div",{onClick:h("errored"),className:l.version_updates_title+" "+(t.errored?l.collapsed:l.expanded),children:["Errored Version Updates"," ",(0,c.jsx)("span",{className:"badge badge--warning",children:r.length})]}),(0,c.jsx)("div",{className:l.version_updates_content,style:t.errored?{display:"none"}:{display:"flex",flexDirection:"column"},children:r.map(((e,s)=>(0,c.jsxs)(a.Fragment,{children:[(0,c.jsxs)("div",{className:l.errored_item+" "+(n[e]?l.expanded:l.collapsed),onClick:g(e),children:[(0,c.jsx)(V,{}),(0,c.jsx)("div",{className:`${l.badge} badge badge--secondary`,children:(0,c.jsx)(u.Z,{onClick:e=>e.stopPropagation(),href:o.j.versions.pr.replace("<NAME>",e),children:e})})]}),(0,c.jsx)("div",{className:l.errored_item_content,style:{display:!n[e]&&"none"},children:(0,c.jsx)("pre",{dangerouslySetInnerHTML:{__html:i[e]}})})]},s)))})]})]})}function V(){return(0,c.jsxs)("span",{className:"fa fa-fw",style:{position:"relative",left:-15},children:[(0,c.jsx)("i",{className:"fa fa-fw fa-ellipsis-vertical "+l.errored_item_ellipsis}),(0,c.jsx)("i",{className:`fa fa-fw fa-blank ${l.errored_item_spacer}`})]})}function Q(){const[{incidents:e,jumped:s,loaded:t},r]=(0,a.useState)({jumped:!1,loaded:0,ongoing:!1}),{hash:d}=(0,n.TH)(),[g,h]=(0,a.useState)({dark:"white",light:"black"}),{colorMode:u}=(0,i.I)();(0,a.useEffect)((()=>function(e){if("undefined"==typeof window)return;const s=document.createElement("div"),t=document.createElement("div");s.style.backgroundColor="var(--ifm-color-primary-dark-mode)",t.style.backgroundColor="var(--ifm-color-primary-light-mode)",document.body.appendChild(s),document.body.appendChild(t),e({dark:window.getComputedStyle(s).getPropertyValue("background-color"),light:window.getComputedStyle(t).getPropertyValue("background-color")}),document.body.removeChild(s),document.body.removeChild(t)}(h)),[]),(0,a.useEffect)((()=>{if(s||8!==t)return;r((e=>({...e,jumped:!0})));const e=d.length>1?d.substring(1):"";e&&document.getElementById(e)?.scrollIntoView()}));const j=()=>r((e=>({...e,loaded:e.loaded+1})));return(0,c.jsx)("main",{className:"container",children:(0,c.jsxs)("div",{className:"row row--no-gutters",children:[(0,c.jsx)("div",{className:"col col--2",children:(0,c.jsx)(q,{})}),(0,c.jsxs)("div",{className:"col col--10",children:[e&&(0,c.jsx)("div",{className:"row row--no-gutters",children:(0,c.jsx)("div",{className:"col col--12",children:(0,c.jsx)($,{...e})})}),(0,c.jsxs)("div",{className:"row row--no-gutters",children:[(0,c.jsxs)("div",{className:"col col--6",style:{flex:1},children:[(0,c.jsx)("div",{id:"repos",className:l.toc_anchor}),(0,c.jsx)(U,{onLoad:j,style:{height:"100%"}})]}),(0,c.jsxs)("div",{className:"col col--6",style:{flex:1},children:[(0,c.jsx)("div",{id:"cloud",className:l.toc_anchor}),(0,c.jsx)(m,{onLoad:j,style:{height:"100%"}})]})]}),(0,c.jsx)("div",{className:"row row--no-gutters",children:(0,c.jsxs)("div",{className:"col col--12",children:[(0,c.jsx)("div",{id:"migrations",className:l.toc_anchor}),(0,c.jsx)(_,{onLoad:j})]})}),(0,c.jsx)("div",{className:"row row--no-gutters",children:(0,c.jsxs)("div",{className:"col col--12",children:[(0,c.jsx)("div",{id:"azure",className:l.toc_anchor}),(0,c.jsx)(B,{backgroundColor:g[u],onLoad:j,url:o.j.azure.pipelines,title:"Azure Pipelines Usage"})]})}),(0,c.jsx)("div",{className:"row row--no-gutters",children:(0,c.jsxs)("div",{className:"col col--12",children:[(0,c.jsx)("div",{id:"github",className:l.toc_anchor}),(0,c.jsx)(B,{backgroundColor:g[u],onLoad:j,url:o.j.github.actions,title:"GitHub Actions Usage"})]})}),(0,c.jsx)("div",{className:"row row--no-gutters",children:(0,c.jsxs)("div",{className:"col col--12",children:[(0,c.jsx)("div",{id:"travis",className:l.toc_anchor}),(0,c.jsx)(B,{backgroundColor:g[u],onLoad:j,url:o.j.travis.usage,title:"Travis CI Usage"})]})}),(0,c.jsxs)("div",{className:"row row--no-gutters",children:[(0,c.jsxs)("div",{className:"col col--6",children:[(0,c.jsx)("div",{id:"incidents",className:l.toc_anchor}),(0,c.jsx)($,{onLoad:e=>r((s=>({...s,incidents:e,loaded:s.loaded+1})))})]}),(0,c.jsxs)("div",{className:"col col--6",children:[(0,c.jsx)("div",{id:"version",className:l.toc_anchor}),(0,c.jsx)(G,{onLoad:j})]})]})]})]})})}function J(){return(0,c.jsx)(r.Z,{title:"Status dashboard",description:"Status dashboard for conda-forge",children:(0,c.jsx)(Q,{})})}R.kL.register(R.uw,R.f$,R.ZL,R.FB,R.Dx,R.u,R.De)},46700:(e,s,t)=>{var a={"./af":42786,"./af.js":42786,"./ar":30867,"./ar-dz":14130,"./ar-dz.js":14130,"./ar-kw":96135,"./ar-kw.js":96135,"./ar-ly":56440,"./ar-ly.js":56440,"./ar-ma":47702,"./ar-ma.js":47702,"./ar-ps":20315,"./ar-ps.js":20315,"./ar-sa":16040,"./ar-sa.js":16040,"./ar-tn":37100,"./ar-tn.js":37100,"./ar.js":30867,"./az":31083,"./az.js":31083,"./be":9808,"./be.js":9808,"./bg":68338,"./bg.js":68338,"./bm":67438,"./bm.js":67438,"./bn":8905,"./bn-bd":76225,"./bn-bd.js":76225,"./bn.js":8905,"./bo":11560,"./bo.js":11560,"./br":1278,"./br.js":1278,"./bs":80622,"./bs.js":80622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":50877,"./cv.js":50877,"./cy":47373,"./cy.js":47373,"./da":24780,"./da.js":24780,"./de":59740,"./de-at":60217,"./de-at.js":60217,"./de-ch":60894,"./de-ch.js":60894,"./de.js":59740,"./dv":5300,"./dv.js":5300,"./el":50837,"./el.js":50837,"./en-au":78348,"./en-au.js":78348,"./en-ca":77925,"./en-ca.js":77925,"./en-gb":22243,"./en-gb.js":22243,"./en-ie":46436,"./en-ie.js":46436,"./en-il":47207,"./en-il.js":47207,"./en-in":44175,"./en-in.js":44175,"./en-nz":76319,"./en-nz.js":76319,"./en-sg":31662,"./en-sg.js":31662,"./eo":92915,"./eo.js":92915,"./es":55655,"./es-do":55251,"./es-do.js":55251,"./es-mx":96112,"./es-mx.js":96112,"./es-us":71146,"./es-us.js":71146,"./es.js":55655,"./et":5603,"./et.js":5603,"./eu":77763,"./eu.js":77763,"./fa":76959,"./fa.js":76959,"./fi":11897,"./fi.js":11897,"./fil":42549,"./fil.js":42549,"./fo":94694,"./fo.js":94694,"./fr":94470,"./fr-ca":63049,"./fr-ca.js":63049,"./fr-ch":52330,"./fr-ch.js":52330,"./fr.js":94470,"./fy":5044,"./fy.js":5044,"./ga":29295,"./ga.js":29295,"./gd":2101,"./gd.js":2101,"./gl":38794,"./gl.js":38794,"./gom-deva":27884,"./gom-deva.js":27884,"./gom-latn":23168,"./gom-latn.js":23168,"./gu":95349,"./gu.js":95349,"./he":24206,"./he.js":24206,"./hi":30094,"./hi.js":30094,"./hr":30316,"./hr.js":30316,"./hu":22138,"./hu.js":22138,"./hy-am":11423,"./hy-am.js":11423,"./id":29218,"./id.js":29218,"./is":90135,"./is.js":90135,"./it":90626,"./it-ch":10150,"./it-ch.js":10150,"./it.js":90626,"./ja":39183,"./ja.js":39183,"./jv":24286,"./jv.js":24286,"./ka":12105,"./ka.js":12105,"./kk":47772,"./kk.js":47772,"./km":18758,"./km.js":18758,"./kn":79282,"./kn.js":79282,"./ko":33730,"./ko.js":33730,"./ku":1408,"./ku-kmr":90563,"./ku-kmr.js":90563,"./ku.js":1408,"./ky":33291,"./ky.js":33291,"./lb":36841,"./lb.js":36841,"./lo":55466,"./lo.js":55466,"./lt":57010,"./lt.js":57010,"./lv":37595,"./lv.js":37595,"./me":39861,"./me.js":39861,"./mi":35493,"./mi.js":35493,"./mk":95966,"./mk.js":95966,"./ml":87341,"./ml.js":87341,"./mn":5115,"./mn.js":5115,"./mr":10370,"./mr.js":10370,"./ms":9847,"./ms-my":41237,"./ms-my.js":41237,"./ms.js":9847,"./mt":72126,"./mt.js":72126,"./my":56165,"./my.js":56165,"./nb":64924,"./nb.js":64924,"./ne":16744,"./ne.js":16744,"./nl":93901,"./nl-be":59814,"./nl-be.js":59814,"./nl.js":93901,"./nn":83877,"./nn.js":83877,"./oc-lnc":92135,"./oc-lnc.js":92135,"./pa-in":15858,"./pa-in.js":15858,"./pl":64495,"./pl.js":64495,"./pt":89520,"./pt-br":57971,"./pt-br.js":57971,"./pt.js":89520,"./ro":96459,"./ro.js":96459,"./ru":21793,"./ru.js":21793,"./sd":40950,"./sd.js":40950,"./se":10490,"./se.js":10490,"./si":90124,"./si.js":90124,"./sk":64249,"./sk.js":64249,"./sl":14985,"./sl.js":14985,"./sq":51104,"./sq.js":51104,"./sr":49131,"./sr-cyrl":79915,"./sr-cyrl.js":79915,"./sr.js":49131,"./ss":95606,"./ss.js":95606,"./sv":98760,"./sv.js":98760,"./sw":91172,"./sw.js":91172,"./ta":27333,"./ta.js":27333,"./te":23110,"./te.js":23110,"./tet":52095,"./tet.js":52095,"./tg":27321,"./tg.js":27321,"./th":9041,"./th.js":9041,"./tk":19005,"./tk.js":19005,"./tl-ph":75768,"./tl-ph.js":75768,"./tlh":89444,"./tlh.js":89444,"./tr":72397,"./tr.js":72397,"./tzl":28254,"./tzl.js":28254,"./tzm":51106,"./tzm-latn":30699,"./tzm-latn.js":30699,"./tzm.js":51106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":67691,"./uk.js":67691,"./ur":13795,"./ur.js":13795,"./uz":6791,"./uz-latn":60588,"./uz-latn.js":60588,"./uz.js":6791,"./vi":65666,"./vi.js":65666,"./x-pseudo":14378,"./x-pseudo.js":14378,"./yo":75805,"./yo.js":75805,"./zh-cn":83839,"./zh-cn.js":83839,"./zh-hk":55726,"./zh-hk.js":55726,"./zh-mo":99807,"./zh-mo.js":99807,"./zh-tw":74152,"./zh-tw.js":74152};function r(e){var s=n(e);return t(s)}function n(e){if(!t.o(a,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=n,e.exports=r,r.id=46700}}]);