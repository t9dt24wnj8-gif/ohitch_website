/* Minimal site JS: nav toggle, accessibility, accordion, YouTube lazy loading,
   header height correction, and opening links in new tabs */
(function(){
  function el(sel, ctx){ return (ctx||document).querySelector(sel) }
  function els(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)) }

  var BASE = (typeof window.SITE_BASE !== 'undefined') ? window.SITE_BASE : './';

  function debounce(fn, wait){ var t; return function(){ var args=arguments, ctx=this; clearTimeout(t); t = setTimeout(function(){ fn.apply(ctx,args); }, wait); } }

  // Set a CSS variable with the current header height so full-bleed heroes sit behind it
  function setHeaderHeightVar(){ var hdr = el('.site-header'); if(!hdr) return; var h = Math.round(hdr.getBoundingClientRect().height); document.documentElement.style.setProperty('--header-height', h + 'px'); els('.full-bleed-hero').forEach(function(hero){ hero.style.marginTop = 'calc(var(--header-height) * -1)'; hero.style.paddingTop = 'var(--header-height)'; }); }

  // Mobile nav toggle
  function initNavToggle(){ var btn = el('#nav-toggle'); var nav = el('#main-nav'); if(!btn || !nav) return; btn.addEventListener('click', function(e){ e.stopPropagation(); var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }); document.addEventListener('click', function(e){ if(!nav.classList.contains('open')) return; if(!nav.contains(e.target) && e.target !== btn){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); } }); }

  // Accessible accordions
  function initAccordions(){ els('.accordion-toggle').forEach(function(btn){ var content = btn.nextElementSibling; if(!content || !content.classList.contains('accordion-content')){ content = btn.parentElement && btn.parentElement.querySelector('.accordion-content'); } if(!content) return; btn.setAttribute('aria-expanded','false'); content.setAttribute('role','region'); btn.addEventListener('click', function(){ var open = content.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); if(open){ content.style.maxHeight = content.scrollHeight + 'px'; } else { content.style.maxHeight = null; } }); btn.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); btn.click(); } }); }); }

  // YouTube lazy players (create iframe only on click)
  function makeYouTube(div){ try{ var id = div.dataset.id; if(!id) return; var thumb = 'https://img.youtube.com/vi/'+id+'/hqdefault.jpg'; var img = document.createElement('img'); img.src = thumb; img.alt = div.dataset.title || 'YouTube thumbnail'; div.appendChild(img); var btn = document.createElement('button'); btn.className = 'play'; btn.setAttribute('aria-label','Play video'); btn.type = 'button'; div.appendChild(btn); div.addEventListener('click', function(){ var iframe = document.createElement('iframe'); iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'); iframe.setAttribute('allowfullscreen',''); iframe.src = 'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&autoplay=1'; iframe.style.width = '100%'; var width = div.clientWidth || 560; iframe.style.height = Math.round(width * 9 / 16) + 'px'; iframe.style.border = '0'; iframe.style.boxShadow = 'none'; while(div.firstChild) div.removeChild(div.firstChild); div.appendChild(iframe); }, { once: true }); }catch(e){ console.error(e); } }

  function initYouTube(){ els('.youtube-player').forEach(function(d){ if(d && d.dataset && d.dataset.id) makeYouTube(d); }); }

  // Open links in new tab and add rel for security
  function initLinkTargets(){ els('a').forEach(function(a){ if(!a.getAttribute('target')) a.setAttribute('target','_blank'); a.setAttribute('rel','noopener noreferrer'); }); }

  function onReady(){ setHeaderHeightVar(); initNavToggle(); initAccordions(); initYouTube(); initLinkTargets(); window.addEventListener('resize', debounce(setHeaderHeightVar, 120)); window.addEventListener('resize', function(){ els('.accordion-content.open').forEach(function(c){ c.style.maxHeight = c.scrollHeight + 'px'; }); }); }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', onReady); } else { onReady(); }

})();
