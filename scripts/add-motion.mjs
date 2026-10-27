import fs from 'node:fs';
const file=new URL('../dist/index.html',import.meta.url);
let html=fs.readFileSync(file,'utf8');
if(!html.includes('class="hero-scroll"'))html=html.replace('<section id="home" class="hero">','<div class="hero-scroll"><section id="home" class="hero">').replace('<section class="scroll-story"','</div><section class="scroll-story"');
if(!html.includes('href="motion.css"'))html=html.replace('</head>','<link rel="stylesheet" href="motion.css"></head>');
if(!html.includes('src="motion.js"'))html=html.replace('</head>','<script src="motion.js" defer></script></head>');
if(!html.includes('class="scroll-story"'))html=html.replace('<section class="intro"',`<section class="scroll-story" aria-label="A closer look at the atelier"><div class="story-stage"><div class="story-art" aria-hidden="true"><img src="assets/botanical-study.png" alt=""></div><div class="story-shade" aria-hidden="true"></div><span class="story-label">BOMAS / A CLOSER LOOK</span><h2 class="story-words"><span class="story-word">Colour.</span><span class="story-word">Texture.</span><span class="story-word">Feeling.</span></h2><p class="story-caption">A colour to get lost in.<br>A detail to come back to.<br>Art to live with.</p><span class="story-count" aria-hidden="true">01 / 03</span><div class="story-track" aria-hidden="true"><span></span></div></div></section>\n<section class="intro"`);
fs.writeFileSync(file,html);
