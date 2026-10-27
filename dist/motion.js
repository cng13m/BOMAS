(() => {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const root=document.documentElement;
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const hero=$('.hero'), heroScroll=$('.hero-scroll'), heroArt=$('.hero-art'), heroHeading=$('.hero-heading'), heroLines=$$('.hero-heading h1>span');
  const story=$('.scroll-story'), storyArt=$('.story-art'), words=$$('.story-word');
  const storyCount=$('.story-count'), storyTrack=$('.story-track span');
  const cards=$$('.collection .work'), images=$$('.work-image>img,.work-image>.paper');
  const ornaments=$$('.hero-line,.asterisk,.statement h2>span');
  const titles=$$('.page-intro h1,.statement h2'), intro=$('.intro-copy h2');
  const progress=$('.progress');
  const altered=new Set();
  let frame=0, current=scrollY, lastTime=0, measurements=[];
  function style(el,property,value){if(!el)return;el.style[property]=value;altered.add(el);}
  function measure(){
    const list=[heroScroll,hero,story,...cards,...images,...ornaments,...titles,intro].filter(Boolean);
    measurements=list.map(el=>{const r=el.getBoundingClientRect();return {el,top:r.top+scrollY,height:r.height};});
    wake();
  }
  const bounds=el=>measurements.find(m=>m.el===el);
  function position(el,y){const b=bounds(el);return b?clamp((y+innerHeight-b.top)/(innerHeight+b.height)):0;}
  function draw(now){
    frame=0;
    const target=scrollY, dt=Math.min(64,now-(lastTime||now-16));lastTime=now;
    current+= (target-current)*(1-Math.exp(-dt/65));
    if(Math.abs(target-current)<.1)current=target;
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=`${max>0?target/max*100:0}%`;
    if(!preference.matches){
      const mobile=innerWidth<=600;
      if(hero){const b=bounds(heroScroll),travel=b?b.height-innerHeight:innerHeight;
        const p=clamp((current-(b?.top||0))/Math.max(1,travel)*1.3),ease=p*p*(3-2*p);
        // Hold the headline in view while the central painting glides into the right margin.
        style(heroArt,'transform',`translate3d(${ease*innerWidth*(mobile?.41:.38)}px,${ease*30}px,0) rotate(${-9+ease*12}deg) scale(${1-ease*(mobile?.57:.28)})`);
        style(heroHeading,'transform',`scale(${1-ease*(mobile?.26:.04)})`);
        heroLines.forEach((line,i)=>style(line,'transform',`translate3d(0,${ease*(i?8:-8)}px,0)`));
        style($('.hero-note'),'opacity',String(1-ease*.75));
      }
      if(story){const b=bounds(story),p=clamp((current-b.top)/Math.max(1,b.height-innerHeight));
        style(storyArt,'transform',`translate3d(0,${(p-.5)*55}px,0) rotate(${-9+p*11}deg) scale(${.58+p*.65})`);
        style($('.story-shade'),'background',`rgba(23,25,19,${.16+p*.4})`);
        words.forEach((word,i)=>{const distance=p*2.7-i;style(word,'opacity',String(clamp(1-Math.abs(distance)*1.65)));style(word,'transform',`translate3d(${distance*-70}px,${distance*-95}px,0) scale(${1+distance*.08})`);});
        // Hold the final word at the end of the sequence.
        if(p>.74){style(words[2],'opacity','1');style(words[2],'transform','translate3d(0,0,0)');}
        storyCount.textContent=`0${Math.min(3,Math.floor(p*3)+1)} / 03`;
        storyTrack.style.transform=`scaleX(${p})`;
      }
      cards.forEach((card,i)=>{const p=position(card,current);style(card,'transform',`translate3d(0,${(.5-p)*(mobile?25:85)*(i?-1:1)}px,0)`);});
      images.forEach((image,i)=>{const p=position(image,current),paper=image.classList.contains('paper');
        style(image,'transform',`translate3d(0,${(.5-p)*(mobile?22:55)}px,0) rotate(${paper?11-p*12:(.5-p)*5}deg) scale(${1.02+p*.045})`);
      });
      ornaments.forEach(el=>style(el,'transform',`rotate(${position(el,current)*210}deg)`));
      titles.forEach(el=>{const p=position(el,current);style(el,'transform',`translate3d(${(.5-p)*(mobile?16:55)}px,0,0)`);});
      if(intro)style(intro,'transform',`translate3d(${(.5-position(intro,current))*35}px,0,0)`);
    }
    if(current!==target)frame=requestAnimationFrame(draw);else lastTime=0;
  }
  function wake(){if(!frame)frame=requestAnimationFrame(draw);}
  function configure(){
    root.classList.toggle('motion-enabled',!preference.matches);
    if(preference.matches){altered.forEach(el=>{el.style.transform='';el.style.opacity='';el.style.background='';});altered.clear();}
    current=scrollY;measure();
  }
  addEventListener('scroll',wake,{passive:true});
  addEventListener('resize',measure,{passive:true});
  addEventListener('load',measure,{once:true});
  document.fonts?.ready.then(measure);
  preference.addEventListener('change',configure);
  configure();
})();
