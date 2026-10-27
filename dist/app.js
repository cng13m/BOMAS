const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible'); reveals.unobserve(e.target);} }), {threshold: .08});
document.querySelectorAll('.reveal').forEach(e => reveals.observe(e));
const toggle = document.querySelector('.menu-toggle'), menu = document.querySelector('.menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('lock');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('lock',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(e.key==='Tab'&&!menu.hidden){const links=[toggle,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();toggle.focus();}}});
const filters = document.querySelectorAll('[data-filter]');
function filter(type){filters.forEach(b=>{const active=b.dataset.filter===type;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelectorAll('.work').forEach(w=>{w.hidden=type!=='all'&&w.dataset.type!==type;w.classList.add('visible');});}
filters.forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>filter(a.dataset.category)));
const dialog=document.querySelector('dialog');
document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>{const original=b.dataset.detail==='originals';document.querySelector('#detail-title').textContent=original?'Original Paintings':'Art Prints';document.querySelector('#detail-description').textContent=original?'One-of-a-kind works with their own texture, character, and story. Explore the art of finding something entirely your own.':'A little colour for the places you call yours. Discover the upcoming print collection from BOMAS Atelier.';dialog.showModal();document.body.classList.add('lock');}));
function closeDialog(){dialog.close();document.body.classList.remove('lock');}
document.querySelector('.dialog-close').addEventListener('click',closeDialog);document.querySelector('.dialog-back').addEventListener('click',closeDialog);dialog.addEventListener('close',()=>document.body.classList.remove('lock'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
let queued=false;function scrollFrame(){const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(max?y/max*100:0)+'%';if(!reduced&&y<innerHeight*1.5){document.querySelector('.hero-art').style.transform=`translateY(${y*.13}px) rotate(${-9+y*.009}deg)`;document.querySelector('.hero-heading').style.transform=`translateY(${y*.06}px)`;}queued=false;}addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(scrollFrame);queued=true;}},{passive:true});scrollFrame();
