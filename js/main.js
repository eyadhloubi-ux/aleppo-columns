(function(){
  var deck=document.getElementById('deck'),slides=[].slice.call(deck.querySelectorAll('.slide')),n=slides.length,
      dots=document.getElementById('dots'),count=document.getElementById('count'),prog=document.getElementById('prog'),
      prev=document.getElementById('prev'),next=document.getElementById('next'),cur=-1,lock=0;
  slides.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','الشريحة '+(i+1));b.onclick=function(){go(i)};dots.appendChild(b);});
  var db=[].slice.call(dots.children);
  function go(i){
    i=Math.max(0,Math.min(n-1,i)); if(i===cur)return;
    var back=i<cur;
    slides.forEach(function(s,k){
      s.classList.remove('prev');
      if(k===i){s.classList.add('on');s.setAttribute('aria-hidden','false');s.scrollTop=0;}
      else{if(s.classList.contains('on')&&!back)s.classList.add('prev');s.classList.remove('on');s.setAttribute('aria-hidden','true');}
    });
    cur=i;
    count.innerHTML=(i+1)+' <i>/ '+n+'</i>';
    db.forEach(function(b,k){b.classList.toggle('on',k===i)});
    prog.style.width=((i+1)/n*100)+'%';
    prev.disabled=i===0; next.disabled=i===n-1;
  }
  prev.onclick=function(){go(cur-1)}; next.onclick=function(){go(cur+1)};
  document.addEventListener('keydown',function(e){
    var onBtn=e.target.tagName==='BUTTON';
    if(e.key==='ArrowLeft'||e.key==='PageDown'||(e.key===' '&&!onBtn)){e.preventDefault();go(cur+1);}
    else if(e.key==='ArrowRight'||e.key==='PageUp'){e.preventDefault();go(cur-1);}
    else if(e.key==='Home'){go(0)}else if(e.key==='End'){go(n-1)}
  });
  /* swipe: RTL, swipe right = next */
  var sx=0,sy=0,st=0;
  deck.addEventListener('touchstart',function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now();},{passive:true});
  deck.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3&&Date.now()-st<800){go(dx>0?cur+1:cur-1);}},{passive:true});
  /* wheel on desktop: one slide per gesture, only when the slide has no own scroll left */
  deck.addEventListener('wheel',function(e){
    var s=slides[cur],atTop=s.scrollTop<=0,atBot=s.scrollTop+s.clientHeight>=s.scrollHeight-2;
    if(Math.abs(e.deltaY)<25)return;
    if((e.deltaY>0&&!atBot)||(e.deltaY<0&&!atTop))return;
    var now=Date.now(); if(now<lock)return; lock=now+900;
    go(e.deltaY>0?cur+1:cur-1);
  },{passive:true});
  go(0);
})();
