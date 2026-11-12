import { pathToFileURL } from 'node:url';
for (const n of [1,3,6,9,10,12,15,18,21,25,29,32,'cur']) {
  const base = n==='cur' ? '/home/user/gloamdeep' : process.cwd()+'/v/'+n;
  const out=[n];
  for (const m of ['turn','save','stairs','state','bagturn','world','rooms','travel','homeward','build','people','dev','jump']) {
    try { const x = await import(pathToFileURL(base+'/src/core/'+m+'.js').href); out.push(m+':{'+Object.keys(x).join(',')+'}'); } catch(e){ out.push(m+':-'); }
  }
  console.log(out.join(' '));
}
