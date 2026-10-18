/* CAUTION CO. EXPERIENCE DIRECTOR — progressive enhancement, no dependency */
(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(pointer:fine)');
const root=document.documentElement;
let mouseX=innerWidth/2,mouseY=innerHeight/2,targetX=mouseX,targetY=mouseY,scroll=0,raf=0,paused=false;
const intro=$('#experience-intro'),cursor=$('#experience-cursor'),light=$('#experience-light'),canvas=$('#experience-canvas'),lab=$('.lab-stage'),labImg=$('.lab-image'),coords=$('.experience-coordinates');
const imgs=Array.from({length:20},(_,i)=>'assets/look-'+String(i+1).padStart(2,'0')+'.webp');
let imageIndex=17;
function closeIntro(){if(intro){intro.classList.add('done');setTimeout(()=>intro.remove(),1400)}}
if(reduced.matches)closeIntro();else{setTimeout(closeIntro,1750);intro?.addEventListener('click',closeIntro)}
function renderImage(index){imageIndex=(index+imgs.length)%imgs.length;labImg.src=imgs[imageIndex];labImg.alt='CAUTION CO. experimental fashion visual '+(imageIndex+1);$('#lab-number').textContent=String(imageIndex+1).padStart(2,'0')+' / 20'}
$('#lab-prev')?.addEventListener('click',()=>renderImage(imageIndex-1));
$('#lab-next')?.addEventListener('click',()=>renderImage(imageIndex+1));
let dragging=false,dragStart=0;
lab?.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;dragging=true;dragStart=e.clientX;lab.setPointerCapture?.(e.pointerId)});
lab?.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const delta=e.clientX-dragStart;if(Math.abs(delta)>35)renderImage(imageIndex+(delta<0?1:-1))});
lab?.addEventListener('pointercancel',()=>dragging=false);
lab?.addEventListener('pointermove',e=>{if(reduced.matches)return;const r=lab.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;lab.style.setProperty('--lab-ry',(x*39)+'deg');lab.style.setProperty('--lab-rx',(-y*23)+'deg')});
lab?.addEventListener('pointerleave',()=>{lab.style.setProperty('--lab-ry','-13deg');lab.style.setProperty('--lab-rx','4deg')});
lab?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();renderImage(imageIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();renderImage(imageIndex-1)}});
$('#experience-theme')?.addEventListener('click',()=>{document.body.classList.toggle('experience-night');$('#experience-theme').setAttribute('aria-pressed',String(document.body.classList.contains('experience-night')))});
const modeBtn=$('#experience-motion');
function setPaused(value){paused=value;modeBtn.textContent=value?'MOTION: OFF':'MOTION: ON';modeBtn.setAttribute('aria-pressed',String(!value));if(value){document.querySelectorAll('.lab-orbit,.hero h1 em').forEach(x=>x.style.animationPlayState='paused')}else{document.querySelectorAll('.lab-orbit,.hero h1 em').forEach(x=>x.style.animationPlayState='running')}}
modeBtn?.addEventListener('click',()=>setPaused(!paused));
function decorate(){
  $$('.product').forEach((card,i)=>{if(card.dataset.experienceDecorated)return;card.dataset.experienceDecorated='true';card.style.setProperty('--card-index',i);card.addEventListener('pointermove',e=>{if(paused||reduced.matches||!fine.matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--shine-x',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--shine-y',((e.clientY-r.top)/r.height*100)+'%')});});
  if(observer)$$('.product,.section-head,.intro h2,.intro p,.look,.newsletter h2').forEach(x=>{if(x.dataset.revealed)return;x.dataset.revealed='1';x.classList.add('reveal-immersive');observer.observe(x)})
}
const observer=typeof IntersectionObserver==='function'&& !reduced.matches?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.09,rootMargin:'0px 0px 70px 0px'}):null;
if(observer)$$('.chapter-content,.lab-header,.chapter-counter').forEach(x=>{x.classList.add('reveal-immersive');observer.observe(x)});
const grid=$('#productGrid');
if(grid){new MutationObserver(()=>decorate()).observe(grid,{childList:true});decorate()}
let ctx,particles=[];const dpr=Math.min(devicePixelRatio||1,1.6);
function sizeCanvas(){if(!canvas)return;canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx=canvas.getContext('2d');particles=Array.from({length:Math.min(70,Math.round(innerWidth/24))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.3+.3,v:Math.random()*.5+.15}))}
if(canvas&&!reduced.matches){sizeCanvas();addEventListener('resize',sizeCanvas,{passive:true})}
function onPointer(e){targetX=e.clientX;targetY=e.clientY;root.style.setProperty('--pointer-x',targetX+'px');root.style.setProperty('--pointer-y',targetY+'px');if(coords)coords.textContent='X '+Math.round(targetX).toString().padStart(4,'0')+' / Y '+Math.round(targetY).toString().padStart(4,'0');}
addEventListener('pointermove',onPointer,{passive:true});
if(cursor&&fine.matches&&!reduced.matches){document.body.classList.add('experience-mode');document.addEventListener('pointerover',e=>{cursor.classList.toggle('active',!!e.target.closest('a,button,.product,.lab-stage'))});document.addEventListener('pointerout',e=>{if(!e.relatedTarget)cursor.classList.remove('active')})}
function loop(t){raf=requestAnimationFrame(loop);if(document.hidden||reduced.matches||paused)return;
mouseX+=(targetX-mouseX)*.16;mouseY+=(targetY-mouseY)*.16;
if(cursor)cursor.style.transform='translate3d('+(mouseX-(cursor.classList.contains('active')?37:12))+'px,'+(mouseY-(cursor.classList.contains('active')?37:12))+'px,0)';
if(light)light.style.transform='translate3d('+(mouseX-innerWidth*.28)+'px,'+(mouseY-innerWidth*.28)+'px,0)';
if(ctx){ctx.clearRect(0,0,canvas.width,canvas.height);for(const p of particles){p.y-=p.v*dpr;if(p.y<0){p.y=canvas.height;p.x=Math.random()*canvas.width}ctx.beginPath();ctx.arc(p.x+Math.sin(t/1800+p.y/400)*12,p.y,p.r*dpr,0,Math.PI*2);ctx.fillStyle='rgba(234,255,46,.38)';ctx.fill()}}
const vh=innerHeight;
$$('.experience-chapter').forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=(vh-r.top)/(vh+r.height);const visual=s.querySelector('.chapter-visual');if(visual)visual.style.transform='translate3d(0,'+((p-.5)*170)+'px,0) scale(1.16)'});
const interlude=$('.experience-interlude');if(interlude){const r=interlude.getBoundingClientRect();if(r.top<vh&&r.bottom>0)interlude.style.setProperty('--drift',((r.top-vh)/vh*16)+'vw')}
$$('.chapter-content h2').forEach(h=>{const r=h.getBoundingClientRect();if(r.top<vh&&r.bottom>0)h.style.transform='translate3d('+((mouseX/innerWidth-.5)*-10)+'px,0,0)'});
}
if(!reduced.matches)raf=requestAnimationFrame(loop);
addEventListener('visibilitychange',()=>{if(document.hidden)ctx?.clearRect(0,0,canvas.width,canvas.height)});
addEventListener('keydown',e=>{if(e.key.toLowerCase()==='m'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))setPaused(!paused)});
reduced.addEventListener?.('change',e=>{if(e.matches){closeIntro();document.body.classList.remove('experience-mode');cancelAnimationFrame(raf);if(ctx)ctx.clearRect(0,0,canvas.width,canvas.height)}else{cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}});
})();
