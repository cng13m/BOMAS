import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderIcons} from './icons.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
let home=fs.readFileSync(path.join(root,'index.html'),'utf8');
// Keep the homepage focused on browsing art immediately after the hero.
home=home.replace(/<section class="scroll-story"[\s\S]*?<\/section>/,'').replace(/<section class="intro"[\s\S]*?<\/section>/,'');
home=home.replace(/<a href="#atelier">Our world[\s\S]*?<\/a>/g,'').replace('02 / THE COLLECTION','01 / THE COLLECTION');
home=home.replace('href="#atelier" class="scroll-link"','href="#collection" class="scroll-link"');
home=renderIcons(home);
if(!home.includes('href="pages.css"'))home=home.replace('</head>','<link rel="stylesheet" href="pages.css"></head>');
home=home.replace(/<dialog[\s\S]*?<\/dialog>/,'');
home=home.replace(/<button class="work reveal" id="(originals|prints)"[^>]*>([\s\S]*?)<\/button>/g,(_,type,content)=>`<a class="work reveal" id="${type}" href="${type==='originals'?'original-paintings':'art-prints'}.html">${content}</a>`);
home=home.replace(/<div class="categories reveal"[\s\S]*?<\/div>/,`<nav class="categories reveal" aria-label="Collection pages"><a href="collection.html">All works ↗</a><a href="original-paintings.html">Original Paintings ↗</a><a href="art-prints.html">Art Prints ↗</a></nav>`);
home=home.replace(/href="#collection"/g,'href="collection.html"').replace(/href="#originals"/g,'href="original-paintings.html"').replace(/href="#prints"/g,'href="art-prints.html"').replace(/ data-category="[^"]*"/g,'');
home=home.replace('href="collection.html" class="scroll-link"','href="#collection" class="scroll-link"');
fs.writeFileSync(path.join(root,'index.html'),home);
const head=home.slice(0,home.indexOf('<body>'));
const sharedStart=home.slice(home.indexOf('<div class="progress"'),home.indexOf('<main>')).replace(/href="#home"/g,'href="index.html"').replace(/href="#atelier"/g,'href="index.html#atelier"');
const footer=home.slice(home.indexOf('<footer>'),home.indexOf('<script src=')).replace(/href="#home"/g,'href="#top"').replace('class="footer-brand" href="#top"','class="footer-brand" href="index.html"').replace(/href="#atelier"/g,'href="index.html#atelier"');
const tabs=(active)=>`<nav class="page-tabs" aria-label="Browse collection"><a href="collection.html" ${active==='collection'?'aria-current="page"':''}>The Collection</a><a href="original-paintings.html" ${active==='originals'?'aria-current="page"':''}>Original Paintings</a><a href="art-prints.html" ${active==='prints'?'aria-current="page"':''}>Art Prints</a></nav>`;
function save(file,title,description,body){const pageHead=head.replace(/<title>.*?<\/title>/,`<title>${title} — BOMAS Atelier</title>`).replace(/name="description" content="[^"]*"/,`name="description" content="${description}"`);fs.writeFileSync(path.join(root,file),renderIcons(`${pageHead}<body class="interior" id="top">${sharedStart}<main>${body}</main>${footer}<script src="app.js"></script></body></html>\n`));}
const collection=home.match(/<section id="collection"[\s\S]*?<\/section>/)[0].replace(/<nav class="categories reveal"[\s\S]*?<\/nav>/,'').replace(/<div class="collection-top reveal">[\s\S]*?<\/div><p>[\s\S]*?<\/p><\/div>/,'');
save('collection.html','The Collection','Explore original paintings and art prints from BOMAS Atelier.',`<section class="page-intro category-intro"><h1>The <em>collection.</em></h1></section>${collection}`);
for(const original of [true,false]){const title=original?'Original Paintings':'Art Prints',type=original?'originals':'prints',other=original?'Art Prints':'Original Paintings',otherFile=original?'art-prints.html':'original-paintings.html';const art=original?'<img src="assets/botanical-study.png" alt="Botanical Study, illustrative original painting concept">':'<div class="paper"><img src="assets/botanical-study.png" alt="Botanical Study, illustrative art print concept"><span>BOTANICAL STUDY / BOMAS ATELIER</span></div>';save(original?'original-paintings.html':'art-prints.html',title,`Discover the upcoming ${title.toLowerCase()} collection at BOMAS Atelier.`,`<section class="page-intro category-intro"><h1>${original?'Original <em>paintings.</em>':'Art <em>prints.</em>'}</h1></section><section class="category-feature"><div class="work-image ${original?'original':'print'} reveal">${art}<span class="sample">CONCEPT ARTWORK</span></div><div class="category-copy reveal"><span class="section-label">A FIRST LOOK / BOTANICAL STUDY</span><h2>${original?'Something entirely <em>your own.</em>':'Colour for the places <em>you call yours.</em>'}</h2><p>${original?'An invitation to look closer. Discover the upcoming collection of original paintings, each with its own character and story.':'Find a little everyday inspiration in the upcoming BOMAS print collection. Art to bring your space to life.'}</p><p class="coming">THE COLLECTION IS COMING SOON</p><p class="detail-note">Artwork shown is an illustrative design concept. Final artworks, dimensions, availability, and pricing will be added with the BOMAS collection.</p><a class="text-link" href="${otherFile}">Explore ${other} <span>↗</span></a><a class="back-collection" href="collection.html">← Back to The Collection</a></div></section>`);}
console.log('Updated homepage and generated three collection pages.');
