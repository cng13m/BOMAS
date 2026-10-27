// Real vector paths avoid platform-specific emoji fonts on mobile.
const paths={
  '✳':'M12 2v20M2 12h20M5 5l14 14M5 19L19 5',
  '↗':'M5 19L19 5M5 5h14v14',
  '↓':'M12 3v18M5 14l7 7 7-7',
  '↑':'M12 21V3M5 10l7-7 7 7',
  '←':'M21 12H3M10 5l-7 7 7 7'
};
export function renderIcons(html){return html.replace(/[✳↗↓↑←]/gu,symbol=>`<svg class="graphic-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${symbol==='✳'?'1':'1.5'}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="display:inline-block;vertical-align:-.12em;flex-shrink:0"><path d="${paths[symbol]}"/></svg>`);}
