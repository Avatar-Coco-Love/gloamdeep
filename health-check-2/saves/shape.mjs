import { pathToFileURL } from 'node:url';
const sum=(v)=>v instanceof Uint8Array?`u8[${v.length}]`:Array.isArray(v)?`[${v.length}]`:v&&typeof v==='object'?`{${Object.keys(v).slice(0,12).join(',')}}`:JSON.stringify(v);
for (const n of [1,6,10,15,21,32,'cur']) {
  const base = n==='cur' ? '/home/user/gloamdeep' : process.cwd()+'/v/'+n;
  const imp=(m)=>import(pathToFileURL(base+'/src/core/'+m+'.js').href);
  const t=await imp('turn');
  let s = t.newJourney ? t.newJourney(7) : t.makeWorld('first',7);
  console.log('==',n, Object.entries(s).map(([k,v])=>k+':'+sum(v)).join(' '));
  console.log('  room', Object.entries(s.room).map(([k,v])=>k+':'+sum(v)).join(' '));
  console.log('  home', JSON.stringify(s.home, (k,v)=>v instanceof Uint8Array||Array.isArray(v)&&v.length>20?'#':v).slice(0,600));
}
