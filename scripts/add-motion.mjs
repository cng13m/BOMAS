import fs from 'node:fs';
const file=new URL('../dist/index.html',import.meta.url);
let html=fs.readFileSync(file,'utf8');
if(!html.includes('class="hero-scroll"'))html=html.replace(/<section id="home" class="hero">[\s\S]*?<\/section>/,section=>`<div class="hero-scroll">${section}</div>`);
if(!html.includes('href="motion.css"'))html=html.replace('</head>','<link rel="stylesheet" href="motion.css"></head>');
if(!html.includes('src="motion.js"'))html=html.replace('</head>','<script src="motion.js" defer></script></head>');
fs.writeFileSync(file,html);
