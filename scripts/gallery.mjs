import fs from 'node:fs';
const artworks=JSON.parse(fs.readFileSync(new URL('../dist/artworks.json',import.meta.url),'utf8'));
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function gallery(category){
  const listings=artworks.filter(a=>a.category===category);
  const buttons=listings.map(a=>`<button class="artwork-tile${a.detailCrop?' artwork-detail-crop':''}" data-artwork="${escape(a.id)}" aria-label="View ${escape(a.title)}" aria-haspopup="dialog" aria-controls="artwork-details"><img src="${escape(a.image)}" alt="${escape(a.title)}" loading="lazy" width="1024" height="1536"></button>`).join('');
  return `<section class="artwork-gallery" aria-label="${category==='originals'?'Original paintings':'Art prints'}">${buttons}</section><dialog id="artwork-details" aria-labelledby="artwork-title"><button class="artwork-close" aria-label="Close artwork details">Close</button><div class="artwork-details-layout"><img class="artwork-full" alt=""><div class="artwork-description"><h2 id="artwork-title"></h2><p class="seller-description"></p><p class="artwork-preview-note"></p></div></div></dialog><script type="application/json" id="artwork-data">${JSON.stringify(listings).replaceAll('<','\\u003c')}</script>`;
}
