/* Minimal site JS: search, nav toggle, accessibility, accordion, and YouTube lazy loading */
(function(){
  function el(sel, ctx){return (ctx||document).querySelector(sel)}
  function els(sel, ctx){return Array.from((ctx||document).querySelectorAll(sel))}

  var BASE = (typeof window.SITE_BASE !== 'undefined') ? window.SITE_BASE : './';

  // Load site index (optional)
  var SITE_INDEX = null;
  fetch(BASE + 'assets/search_index.json').then(function(r){ if(r.ok) return r.json(); throw r}).then(function(j){ SITE_INDEX = j }).catch(function(){ SITE_INDEX = null });

  // Search
  var searchBox = el('#search-box');
  var searchResults = el('#search-results');
  function renderResults(items){ if(!searchResults) return; searchResults.innerHTML=''; if(!items||!items.length){ searchResults.innerHTML='<p class="muted">No results</p>'; return };
    items.slice(0,20).forEach(function(it){
      var d=document.createElement('div'); d.className='result-item';
      var a=document.createElement('a'); a.href = BASE + it.url + (it.anchor?('#'+it.anchor):''); a.textContent = it.title + (it.heading?(' — ' + it.heading):'');
      d.appendChild(a);
      var p=document.createElement('p'); p.textContent = it.snippet || '';
      d.appendChild(p);
      searchResults.appendChild(d);
    })
  }

  function doSearch(q){ if(!SITE_INDEX) return renderResults([]); q=q.trim().toLowerCase(); if(!q) return renderResults([]);
    var terms=q.split(/\s+/);
    var found=[];
    SITE_INDEX.pages.forEach(function(p){
      if(p.title && p.title.toLowerCase().indexOf(q)!==-1){ found.push({url:p.url,title:p.title,heading:'',snippet:p.summary||''}) }
      p.sections.forEach(function(s){
        var text=(s.heading||'')+" " + (s.text||'');
        var lower=text.toLowerCase();
        var ok=true; for(var i=0;i<terms.length;i++){ if(lower.indexOf(terms[i])===-1){ ok=false; break } }
        if(ok){ found.push({url:p.url,title:p.title,heading:s.heading,anchor:s.id,snippet:(s.text||'').slice(0,180)}) }
      })
    })
    renderResults(found)
  }

  if(searchBox){
    var to=null;
    searchBox.addEventListener('input', function(e){ clearTimeout(to); to=setTimeout(function(){ doSearch(searchBox.value) }, 180) })
    searchBox.addEventListener('keydown', function(e){ if(e.key==='Enter'){ doSearch(searchBox.value) } })
  }

  // Mobile nav toggle
  function initNavToggle(){
    var btn = el('#nav-toggle');
    var nav = el('#main-nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', function(e){ e.stopPropagation(); var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    document.addEventListener('click', function(e){ if(!nav.classList.contains('open')) return; if(!nav.contains(e.target) && e.target !== btn){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); } });
  }

  // Accordions with accessibility
  function initAccordions(){
    els('.accordion-toggle').forEach(function(btn){
      var content = btn.nextElementSibling;
      btn.setAttribute('aria-expanded','false');
      if(content) content.setAttribute('role','region');
      btn.addEventListener('click', function(){
        var open = content.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if(open){ content.style.maxHeight = content.scrollHeight + 'px'; }
        else { content.style.maxHeight = null; }
      });
      btn.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); btn.click(); } });
    })
  }

  // YouTube lazy players (create iframe only on click)
  function makeYouTube(div){
    var id = div.dataset.id; if(!id) return;
    var thumb = 'https://img.youtube.com/vi/'+id+'/hqdefault.jpg';
    var img = document.createElement('img'); img.src = thumb; img.alt = div.dataset.title || 'YouTube thumbnail';
    div.appendChild(img);
    var btn = document.createElement('button'); btn.className = 'play'; btn.textContent = 'Play';
    div.appendChild(btn);
    div.addEventListener('click', function(){
      var iframe=document.createElement('iframe');
      iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen','');
      iframe.src = 'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&autoplay=1';
      iframe.style.width = '100%';
      var width = div.clientWidth || 560; iframe.style.height = Math.round(width * 9 / 16) + 'px';
      div.parentNode.replaceChild(iframe, div);
    }, { once: true });
  }

  function initYouTube(){ els('.youtube-player').forEach(function(d){ if(!d.dataset.id) return makeYouTube(d) }) }

  // Keep open accordion heights on resize
  window.addEventListener('resize', function(){ els('.accordion-content.open').forEach(function(c){ c.style.maxHeight = c.scrollHeight + 'px'; }) });

  document.addEventListener('DOMContentLoaded', function(){ initNavToggle(); initAccordions(); initYouTube(); if(searchBox){ searchBox.addEventListener('focus', function(){ var nav = el('#main-nav'); if(nav && nav.classList.contains('open')){ nav.classList.remove('open'); el('#nav-toggle') && el('#nav-toggle').setAttribute('aria-expanded','false'); } }) } });

})();
