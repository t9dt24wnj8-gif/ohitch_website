/* Minimal site JS: search, accordion toggles, and YouTube lazy loading */
(function(){
  function el(sel, ctx){return (ctx||document).querySelector(sel)}
  function els(sel, ctx){return Array.from((ctx||document).querySelectorAll(sel))}

  // Determine assets base (set by pages via window.SITE_BASE)
  var BASE = (typeof window.SITE_BASE !== 'undefined') ? window.SITE_BASE : './';

  // Search index load
  var SITE_INDEX = null;
  fetch(BASE + 'assets/search_index.json').then(function(r){ if(r.ok) return r.json(); throw r}).then(function(j){ SITE_INDEX = j }).catch(function(){ SITE_INDEX = null });

  // Simple search
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
      // page title match
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

  // Accordion toggles
  function initAccordions(){ els('.accordion-toggle').forEach(function(btn){ btn.addEventListener('click', function(){ var content = btn.nextElementSibling; if(!content) return; if(content.classList.contains('open')){ content.style.maxHeight = null; content.classList.remove('open'); } else { content.classList.add('open'); content.style.maxHeight = content.scrollHeight + 'px'; } }) }) }

  // YouTube lazy players
  function makeYouTube(div){ var id = div.dataset.id; if(!id) return; var thumb='https://img.youtube.com/vi/'+id+'/hqdefault.jpg'; var img = document.createElement('img'); img.src=thumb; img.alt=div.dataset.title || 'YouTube thumbnail'; div.appendChild(img); var btn=document.createElement('button'); btn.className='play'; btn.textContent='Play'; div.appendChild(btn);
    div.addEventListener('click', function(){ var iframe=document.createElement('iframe'); iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'); iframe.setAttribute('allowfullscreen',''); iframe.src='https://www.youtube.com/embed/'+id+'?autoplay=1'; iframe.style.width='100%'; iframe.style.height='360px'; div.parentNode.replaceChild(iframe, div); }); }

  function initYouTube(){ els('.youtube-player').forEach(function(d){ if(!d.dataset.id) return; makeYouTube(d) }) }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function(){ initAccordions(); initYouTube(); });
})();
