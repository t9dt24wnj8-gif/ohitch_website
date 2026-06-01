/* Minimal site JS: nav toggle, accessibility, accordion, YouTube lazy loading,
   header height correction, and opening links in new tabs */
(function(){
  function el(sel, ctx){ return (ctx||document).querySelector(sel) }
  function els(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)) }

  var BASE = (typeof window.SITE_BASE !== 'undefined') ? window.SITE_BASE : './';

  function debounce(fn, wait){ var t; return function(){ var args=arguments, ctx=this; clearTimeout(t); t = setTimeout(function(){ fn.apply(ctx,args); }, wait); } }

  // Set a CSS variable with the current header height so full-bleed heroes sit behind it
  function setHeaderHeightVar(){
    var hdr = el('.site-header'); if(!hdr) return;
    var h = Math.round(hdr.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', h + 'px');
    // Only apply body padding when header is fixed to avoid layout loops
    try{
      var hdrPos = getComputedStyle(hdr).position;
      if(hdrPos === 'fixed'){
        document.body.style.paddingTop = h + 'px';
      } else {
        document.body.style.paddingTop = '';
      }
    }catch(e){ /* ignore */ }
    // Update full-bleed heroes directly using pixels (avoid calc(var()) reflow loops)
    els('.full-bleed-hero').forEach(function(hero){ hero.style.marginTop = '-' + h + 'px'; hero.style.paddingTop = h + 'px'; });
    // Keep mobile nav positioned under header when opened
    var nav = el('#main-nav'); if(nav) nav.style.top = h + 'px';
  }

  // Mobile nav toggle
  function initNavToggle(){ var btn = el('#nav-toggle'); var nav = el('#main-nav'); if(!btn || !nav) return; btn.addEventListener('click', function(e){ e.stopPropagation(); var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }); document.addEventListener('click', function(e){ if(!nav.classList.contains('open')) return; if(!nav.contains(e.target) && e.target !== btn){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); } }); }

  // Accessible accordions
  function initAccordions(){ els('.accordion-toggle').forEach(function(btn){ var content = btn.nextElementSibling; if(!content || !content.classList.contains('accordion-content')){ content = btn.parentElement && btn.parentElement.querySelector('.accordion-content'); } if(!content) return; btn.setAttribute('aria-expanded','false'); content.setAttribute('role','region'); btn.addEventListener('click', function(){ var willOpen = !content.classList.contains('open'); // compute new state
      // Apply different transitions for opening vs closing
      if(willOpen){
        content.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        // slow reveal (page moves down slowly)
        content.style.transition = 'max-height .9s cubic-bezier(0.2,0,0.2,1), opacity .45s ease, transform .45s ease';
        // set explicit height to trigger transition
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // closing: make it fast
        content.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        content.style.transition = 'max-height .22s ease, opacity .18s ease, transform .18s ease';
        // set to 0 to collapse quickly
        content.style.maxHeight = '0px';
      }
      // cleanup inline transition after it finishes
      var onEnd = function(e){ if(e.propertyName && e.propertyName.indexOf('max') === -1) return; content.style.transition = ''; if(!willOpen){ content.style.maxHeight = null; } content.removeEventListener('transitionend', onEnd); };
      content.addEventListener('transitionend', onEnd);
    }); btn.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); btn.click(); } }); }); }

  // YouTube lazy players (create iframe only on click)
  function makeYouTube(div){ try{ var id = div.dataset.id; if(!id) return; var thumb = 'https://img.youtube.com/vi/'+id+'/hqdefault.jpg'; var img = document.createElement('img'); img.src = thumb; img.alt = div.dataset.title || 'YouTube thumbnail'; div.appendChild(img); var btn = document.createElement('button'); btn.className = 'play'; btn.setAttribute('aria-label','Play video'); btn.type = 'button'; div.appendChild(btn);
    // ensure the container has an explicit aspect-ratio box so replacement iframes keep size
    div.style.position = 'relative'; div.style.paddingTop = div.style.paddingTop || (function(){ var ar = 9/16; return (ar * 100) + '%'; })();
    div.addEventListener('click', function(){
      // replace with an iframe immediately, ensuring width/height set via CSS
      while(div.firstChild) div.removeChild(div.firstChild);
      var iframe = document.createElement('iframe');
      iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; playsinline');
      iframe.setAttribute('allowfullscreen','');
      iframe.setAttribute('loading','lazy');
      // force playsinline and mute for mobile autoplay attempts
      iframe.src = 'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1&origin=' + encodeURIComponent(location.origin);
      iframe.style.position = 'absolute'; iframe.style.left = '0'; iframe.style.top = '0'; iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.border = '0'; iframe.style.boxShadow = 'none';
      div.appendChild(iframe);
      // add an open-on-youtube button for users to play with sound if autoplay fails
      var openBtn = document.createElement('a'); openBtn.className = 'yt-unmute'; openBtn.setAttribute('target','_blank'); openBtn.setAttribute('rel','noopener noreferrer'); openBtn.href = 'https://www.youtube.com/watch?v=' + id; openBtn.textContent = 'open on youtube';
      div.appendChild(openBtn);
    }, { once: true }); }catch(e){ console.error(e); } }

  // Load YouTube IFrame API once and return a promise that resolves with window.YT
  function loadYouTubeAPI(){
    if(window._ohitch_yt_promise) return window._ohitch_yt_promise;
    window._ohitch_yt_promise = new Promise(function(resolve){
      if(window.YT && window.YT.Player) return resolve(window.YT);
      var script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
      var resolved = false;
      window.onYouTubeIframeAPIReady = function(){ resolved = true; resolve(window.YT); };
      // Fallback: if API doesn't load quickly, resolve with whatever we have
      setTimeout(function(){ if(!resolved) resolve(window.YT || null); }, 5000);
    });
    return window._ohitch_yt_promise;
  }

  function makeYouTube(div){
    try{
      var id = div.dataset.id; if(!id) return;
      var thumb = 'https://img.youtube.com/vi/'+id+'/hqdefault.jpg';
      var img = document.createElement('img'); img.src = thumb; img.alt = div.dataset.title || 'YouTube thumbnail';
      var btn = document.createElement('button'); btn.className = 'play'; btn.setAttribute('aria-label','Play video'); btn.type = 'button';
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="36" height="36"><g transform="translate(12 12) scale(1.5) translate(-12 -12)"><path fill="#fff" d="M8 5v14l11-7z"/></g></svg>';
      div.appendChild(img);
      div.appendChild(btn);

      var uid = 'yt-player-' + id + '-' + Math.floor(Math.random()*1000000);

      var onClick = function(e){
        e.preventDefault();
        // remove thumbnail and button
        while(div.firstChild) div.removeChild(div.firstChild);

        // create a holder (will be filled by the immediate iframe, and later upgraded)
        var holder = document.createElement('div'); holder.id = uid; holder.style.width = '100%'; holder.style.height = '100%';

        // immediate muted iframe — created synchronously in the user gesture to improve autoplay success on mobile
        var iframe = document.createElement('iframe');
        iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; playsinline');
        iframe.setAttribute('allowfullscreen','');
        iframe.setAttribute('loading','eager');
        iframe.src = 'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1&origin=' + encodeURIComponent(location.origin);
        iframe.style.position = 'absolute'; iframe.style.left = '0'; iframe.style.top = '0'; iframe.style.width = '100%'; iframe.style.height = '100%'; iframe.style.border = '0'; iframe.style.boxShadow = 'none';
        holder.appendChild(iframe);
        div.appendChild(holder);

        // add an open-on-youtube button for users to open with sound if autoplay fails
        var openBtn = document.createElement('a'); openBtn.className = 'yt-unmute'; openBtn.setAttribute('target','_blank'); openBtn.setAttribute('rel','noopener noreferrer'); openBtn.href = 'https://www.youtube.com/watch?v=' + id; openBtn.textContent = 'open on youtube';
        div.appendChild(openBtn);

        // Attempt to upgrade to an API-controlled player when available
        var upgradeToAPI = function(YT){
          try{
            if(!YT || !YT.Player) throw new Error('YT not available');
            new YT.Player(uid, {
              videoId: id,
              playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1, origin: location.origin },
              events: {
                onReady: function(ev){
                  try{
                    if(ev && ev.target && typeof ev.target.mute === 'function') ev.target.mute();
                    ev.target.playVideo();
                    // add an unobtrusive unmute button in case autoplay succeeds muted
                    try{
                      var container = document.getElementById(uid);
                      if(container){
                        var unmuteBtn = document.createElement('button');
                        unmuteBtn.className = 'yt-unmute';
                        unmuteBtn.type = 'button';
                        unmuteBtn.textContent = 'unmute';
                        container.appendChild(unmuteBtn);
                        unmuteBtn.addEventListener('click', function(){ try{ if(ev && ev.target && typeof ev.target.unMute === 'function'){ ev.target.unMute(); } }catch(e){} unmuteBtn.remove(); });
                      }
                    }catch(e){}
                    setTimeout(function(){ try{ if(ev && ev.target && typeof ev.target.unMute === 'function'){ ev.target.unMute(); } }catch(e){} }, 700);
                  }catch(err){}
                }
              }
            });
          }catch(err){
            // If upgrade fails, keep the immediate iframe as-is (it already tries autoplay muted)
          }
        };

        if(window.YT && window.YT.Player){ upgradeToAPI(window.YT); }
        else { loadYouTubeAPI().then(function(YT){ upgradeToAPI(YT); }).catch(function(){}); }

        div.removeEventListener('click', onClick);
      };

      div.addEventListener('click', onClick, { once: true });
    }catch(e){ console.error(e); }
  }

  // Insert <wbr> before opening parentheses in homepage headings to allow breaks
  function insertWbrBeforeParenOnHome(){
    try{
      var path = (location.pathname || '').replace(/\\/g,'/');
      var isHome = path === '/' || path.endsWith('/index.html') || path === '';
      if(!isHome) return;
      var headings = document.querySelectorAll('.page-content.home h2, .page-content.home h3');
      headings.forEach(function(h){
        Array.from(h.childNodes).forEach(function(node){
          if(node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.indexOf(' (') !== -1){
            var parts = node.nodeValue.split(' (');
            var frag = document.createDocumentFragment();
            for(var i=0;i<parts.length;i++){
              frag.appendChild(document.createTextNode(parts[i]));
              if(i < parts.length - 1){ frag.appendChild(document.createElement('wbr')); frag.appendChild(document.createTextNode(' (')); }
            }
            h.replaceChild(frag, node);
          }
        });
      });
    }catch(e){}
  }

  function initYouTube(){ els('.youtube-player').forEach(function(d){ if(d && d.dataset && d.dataset.id) makeYouTube(d); }); }
  
  // Double homepage headings (except the hero H1 "Hello, I'm Ollie").
  function adjustHomepageHeadings(){
    try{
      var path = (location.pathname || '').replace(/\\/g,'/');
      var isHome = path === '/' || path.endsWith('/index.html') || path === '';
      if(!isHome) return;
      var nodes = document.querySelectorAll('.page-content h1, .page-content h2, .page-content h3, .hero-intro h1, .hero-intro h2, .hero-intro h3');
      Array.from(nodes).forEach(function(h){
        var txt = (h.textContent || '').trim().replace(/\s+/g,' ');
        if(h.tagName.toLowerCase()==='h1' && txt === "Hello, I'm Ollie") return;
        var cs = window.getComputedStyle(h);
        var size = parseFloat(cs.fontSize);
        if(!isNaN(size) && size>0){ h.style.fontSize = (size * 2) + 'px'; }
      });
    }catch(e){ console.error(e); }
  }

  // Open external links in new tab and add rel for security; keep internal links as-is
  function initLinkTargets(){ els('a').forEach(function(a){ try{ if(a.hasAttribute('target')) return; var href = a.getAttribute('href'); if(!href) return; // skip anchors and javascript: mailto: etc
        var url = new URL(href, location.href);
        if(url.protocol && (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== location.origin){ a.setAttribute('target','_blank'); a.setAttribute('rel','noopener noreferrer'); }
      }catch(e){ /* ignore malformed or non-http URLs */ }
    }); }

  // Normalize and reorder media links in EP archive entries at runtime
  function normalizeMediaLinks(){
    try{
      els('.media-text .small-italic').forEach(function(p){
        var anchors = Array.from(p.querySelectorAll('a'));
        if(!anchors.length) return;
        // If this paragraph contains other non-whitespace text nodes, skip to avoid altering propellant lines
        var otherText = Array.from(p.childNodes).some(function(n){ return n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim(); });
        if(otherText && anchors.length < 2) return;

        var buckets = { thruster:[], more:[], video:[], other:[] };
        anchors.forEach(function(a){
          var txt = (a.textContent || '').trim();
          var norm = txt.toLowerCase();
          if(norm.indexOf('thruster') !== -1) buckets.thruster.push(a);
          else if(norm.indexOf('more') !== -1 || norm.indexOf('info') !== -1) buckets.more.push(a);
          else if(norm.indexOf('video') !== -1 || norm.indexOf('source') !== -1) buckets.video.push(a);
          else buckets.other.push(a);
        });

        var seen = new Set(); var parts = [];
        ['thruster','more','video','other'].forEach(function(k){ buckets[k].forEach(function(a){ var href = a.getAttribute('href') || ''; var key = k + '|' + href; if(seen.has(key)) return; seen.add(key); a.textContent = (a.textContent||'').trim().toLowerCase(); parts.push(a.outerHTML); }); });
        if(parts.length) p.innerHTML = parts.join(' • ');
      });
    }catch(e){}
  }

  function onReady(){ setHeaderHeightVar(); initNavToggle(); initAccordions(); normalizeMediaLinks(); initYouTube(); initLinkTargets(); window.addEventListener('resize', debounce(setHeaderHeightVar, 120)); window.addEventListener('resize', function(){ els('.accordion-content.open').forEach(function(c){ c.style.maxHeight = c.scrollHeight + 'px'; }); }); }
  
  // call homepage heading adjuster after other inits
  function onReadyWithAdjust(){ onReady(); adjustHomepageHeadings(); }
  function onReadyAndWrap(){ onReady(); adjustHomepageHeadings(); insertWbrBeforeParenOnHome(); }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', onReadyAndWrap); } else { onReadyAndWrap(); }

})();
