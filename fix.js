const fs=require('fs');['package.json','next.config.ts'].forEach(f=>{let t=fs.readFileSync(f,'utf8');if(t.charCodeAt(0)===0xfeff)t=t.slice(1);fs.writeFileSync(f,t,'utf8');});
