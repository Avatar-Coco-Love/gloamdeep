import {readFileSync,readdirSync} from 'node:fs';
const R='/home/user/gloamdeep/';
const hexes=(t)=>[...t.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)].map(m=>{let h=m[1].toLowerCase(); if(h.length==3)h=[...h].map(c=>c+c).join(''); return '#'+h});
const art=new Set(hexes(readFileSync(R+'docs/ART-DIRECTION.md','utf8')+readFileSync(R+'docs/ART-DIRECTION-2.md','utf8')));
const study=new Set(hexes(readFileSync(R+'reference/style-study-1.html','utf8').split('\n').slice(120,128).join('\n')));
const studyAll=new Set(hexes(readFileSync(R+'reference/style-study-1.html','utf8')));
const looks=new Set(hexes(readFileSync(R+'src/core/looks.js','utf8')));
let docs='';const walk=(d)=>{for(const f of readdirSync(R+d,{withFileTypes:true})){if(f.isDirectory())walk(d+'/'+f.name);else if(f.name.endsWith('.md'))docs+=readFileSync(R+d+'/'+f.name,'utf8')}};walk('docs');
const dset=new Set(hexes(docs));
const use={};
for(const f of readdirSync(R+'src/render')){if(f==='sound.js')continue;const L=readFileSync(R+'src/render/'+f,'utf8').split('\n');L.forEach((l,i)=>{for(const h of hexes(l)){(use[h]??=[]).push(f+':'+(i+1))}})}
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const pal=[...new Set([...art,...study,...looks])];
const near=h=>{let b=null,bd=1e9;for(const p of pal){const a=rgb(h),c=rgb(p);const d=Math.max(...a.map((v,i)=>Math.abs(v-c[i])));if(d<bd){bd=d;b=p}}return [b,bd]};
const rows=Object.entries(use).map(([h,u])=>({h,n:u.length,cls:art.has(h)?'ART':study.has(h)?'STUDYPAL':looks.has(h)?'LOOKS':studyAll.has(h)?'STUDYother':dset.has(h)?'DOCS':'NONE',near:near(h),u}));
const cnt={};rows.forEach(r=>cnt[r.cls]=(cnt[r.cls]||0)+1);console.log(cnt);
for(const cls of ['STUDYother','DOCS','NONE'])for(const r of rows.filter(r=>r.cls===cls).sort((a,b)=>a.near[1]-b.near[1]))console.log(cls,r.h,'near',r.near.join(' d'),'x'+r.n,r.u.slice(0,6).join(' '));
// art colours never used in render
console.log('ART unused in render:',[...art].filter(h=>!use[h]).join(' '));
