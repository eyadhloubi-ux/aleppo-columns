(function(){
  var deck=document.getElementById('deck'),slides=[].slice.call(document.querySelectorAll('.slide')),
      bar=document.getElementById('bar'),prev=document.getElementById('prev'),next=document.getElementById('next'),cur=0;
  slides.forEach(function(s,i){var b=document.createElement('button');b.setAttribute('aria-label','الشريحة '+(i+1));b.onclick=function(){go(i)};bar.appendChild(b);});
  var dots=[].slice.call(bar.children);
  function go(i){i=Math.max(0,Math.min(slides.length-1,i));deck.scrollTo({top:slides[i].offsetTop,behavior:'smooth'});}
  function upd(){
    var y=deck.scrollTop+deck.clientHeight*0.4,k=0;
    slides.forEach(function(s,i){if(s.offsetTop<=y)k=i;});
    if(deck.scrollTop+deck.clientHeight>=deck.scrollHeight-4)k=slides.length-1;
    cur=k;dots.forEach(function(b,i){b.classList.toggle('on',i===k)});
    prev.disabled=k===0;next.disabled=k===slides.length-1;
  }
  deck.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);
  prev.onclick=function(){go(cur-1)};next.onclick=function(){go(cur+1)};
  document.addEventListener('keydown',function(e){
    if(['ArrowDown','PageDown','ArrowLeft',' '].indexOf(e.key)>-1){e.preventDefault();go(cur+1);}
    else if(['ArrowUp','PageUp','ArrowRight'].indexOf(e.key)>-1){e.preventDefault();go(cur-1);}
  });
  upd();
  var IM={hm:"assets/img/pole-haji-marea.jpg",kw:"assets/img/pole-kawakibi.jpg"},img=document.getElementById('shotImg'),th=document.getElementById('tHm'),tk=document.getElementById('tKw');
  function pick(k){img.src=IM[k];img.alt=k==='hm'?'عمود في ساحة التحرير وعليه لوحتا عبد القادر الصالح «حجي مارع»':'عمود في ساحة التحرير وعليه لوحتا عبد الرحمن الكواكبي';th.classList.toggle('on',k==='hm');tk.classList.toggle('on',k==='kw');}
  th.onclick=function(){pick('hm')};tk.onclick=function(){pick('kw')};
})();
