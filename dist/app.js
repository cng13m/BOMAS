const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible'); reveals.unobserve(e.target);} }), {threshold: .08});
document.querySelectorAll('.reveal').forEach(e => reveals.observe(e));
const toggle = document.querySelector('.menu-toggle'), menu = document.querySelector('.menu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('lock');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('lock',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(e.key==='Tab'&&!menu.hidden){const links=[toggle,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();toggle.focus();}}});

const artworkDialog=document.querySelector('#artwork-details');
if(artworkDialog){
  const listings=JSON.parse(document.querySelector('#artwork-data').textContent);
  document.querySelectorAll('[data-artwork]').forEach(button=>button.addEventListener('click',()=>{
    const listing=listings.find(item=>item.id===button.dataset.artwork);
    if(!listing)return;
    const image=artworkDialog.querySelector('.artwork-full');
    image.src=listing.image;image.alt=listing.title;
    artworkDialog.querySelector('#artwork-title').textContent=listing.title;
    artworkDialog.querySelector('.seller-description').textContent=listing.sellerDescription||'The seller has not published a description yet.';
    artworkDialog.querySelector('.artwork-preview-note').textContent=listing.preview?(listing.detailCrop?'Layout preview showing a detail of the same concept artwork. This slot will be replaced with a separate seller listing.':'Illustrative concept artwork for the gallery preview. Final seller listings and availability are coming soon.'):'';
    artworkDialog.showModal();document.body.classList.add('lock');
  }));
  artworkDialog.querySelector('.artwork-close').addEventListener('click',()=>artworkDialog.close());
  artworkDialog.addEventListener('close',()=>document.body.classList.remove('lock'));
  artworkDialog.addEventListener('click',event=>{const box=artworkDialog.getBoundingClientRect();if(event.target===artworkDialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))artworkDialog.close();});
}
