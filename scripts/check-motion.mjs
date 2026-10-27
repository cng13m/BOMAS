import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const code=fs.readFileSync(new URL('../dist/motion.js',import.meta.url),'utf8');
for(const home of [true,false]){
  const events={},frames=[],classes=new Set();let preferenceChange,now=0;
  const preference={matches:false,addEventListener(_,fn){preferenceChange=fn;}};
  const element=(top=0,height=600,paper=false)=>({style:{},textContent:'',classList:{contains:()=>paper},getBoundingClientRect:()=>({top:top-context.scrollY,height})});
  const art=element(800,400),story=element(850,2160),words=[element(),element(),element()];
  const single={'.progress':element(),'.hero':home?element(0,850):null,'.hero-art':home?element():null,'.hero-note':home?element():null,'.scroll-story':home?story:null,'.story-art':element(),'.story-shade':element(),'.story-count':element(),'.story-track span':element(),'.intro-copy h2':null};
  const lists={'.hero-heading h1>span':home?[element(),element()]:[],'.story-word':home?words:[],'.collection .work':[element(1800)],'.work-image>img,.work-image>.paper':[art],'.hero-line,.asterisk,.statement h2>span':[element(1800)],'.page-intro h1,.statement h2':[element(100)]};
  const context=vm.createContext({scrollY:0,innerWidth:1280,innerHeight:800,Math,Set,matchMedia:()=>preference,document:{documentElement:{scrollHeight:4000,classList:{toggle(name,on){on?classes.add(name):classes.delete(name);}}},querySelector:s=>single[s]??null,querySelectorAll:s=>lists[s]??[]},addEventListener:(name,fn)=>{events[name]=fn;},requestAnimationFrame:fn=>{frames.push(fn);return frames.length;}});
  function settle(){let count=0;while(frames.length){assert.ok(count++<200,'animation must settle instead of looping while idle');frames.shift()(now+=16);}}
  vm.runInContext(code,context);settle();assert.ok(classes.has('motion-enabled'));
  const before=art.style.transform;context.scrollY=1300;events.scroll();settle();assert.notEqual(art.style.transform,before,'artwork must move with scroll');
  if(home){assert.notEqual(single['.story-art'].style.transform,'');assert.ok(words.some(w=>Number(w.style.opacity)>0));}
  preference.matches=true;preferenceChange();settle();assert.equal(art.style.transform,'');assert.ok(!classes.has('motion-enabled'));
  context.scrollY=0;events.scroll();settle();assert.equal(art.style.transform,'','reduced motion must stay static');
}
console.log('Homepage/category motion, idle settling, and live reduced-motion switching passed.');
