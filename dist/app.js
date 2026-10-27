const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible'); reveals.unobserve(e.target);} }), {threshold: .08});
document.querySelectorAll('.reveal').forEach(e => reveals.observe(e));
const toggle = document.querySelector('.menu-toggle'), menu = document.querySelector('.menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('lock');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('lock',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(e.key==='Tab'&&!menu.hidden){const links=[toggle,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();toggle.focus();}}});
