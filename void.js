/* CAUTION CO. / THE VOID / interaction direction */
(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(pointer: fine)');
const stage=$('#three-stage'),fallback=$('#threeFallback'),header=$('#header'),motion=$('#experience-motion'),cursor=$('.void-cursor');
let paused=reduce.matches,px=innerWidth/2,py=innerHeight/2,cx=-100,cy=-100,raf=0,look=14,observer;
if(reduce.matches){motion.textContent='◯ MOTION: OFF';motion.setAttribute('aria-pressed','false');document.body.classList.add('ambient-paused')}
function updateHeader(){header.classList.toggle('is-scrolled',scrollY>80)}
addEventListener('scroll',updateHeader,{passive:true});updateHeader();
function setMotion(value){paused=!value;document.body.classList.toggle('ambient-paused',paused);motion.textContent=paused?'◯ MOTION: OFF':'◉ MOTION: ON';motion.setAttribute('aria-pressed',String(!paused));window.CautionScene?.setMotion?.(!paused)}
motion.addEventListener('click',()=>setMotion(paused));
reduce.addEventListener?.('change',e=>setMotion(!e.matches));
function setLook(index){look=index;const src='assets/look-'+String(index).padStart(2,'0')+'.webp';fallback.src=src;fallback.alt='CAUTION CO. apparel look '+index;$$('.look-choice').forEach(btn=>{const active=+btn.dataset.look===index;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});window.CautionScene?.setLook?.(index)}
$$('.look-choice').forEach(btn=>btn.addEventListener('click',()=>setLook(+btn.dataset.look)));
window.CautionOnSceneReady=()=>{window.CautionScene?.setLook?.(look);window.CautionScene?.setMotion?.(!paused)};
stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const options=$$('.look-choice').map(x=>+x.dataset.look),n=options.indexOf(look);setLook(options[(n+(e.key==='ArrowRight'?1:options.length-1))%options.length])}});
stage.addEventListener('pointermove',e=>{if(paused||stage.classList.contains('three-ready'))return;const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fallback.style.transform='perspective(850px) rotateY('+(-12+x*32)+'deg) rotateX('+(-y*19)+'deg)'});
stage.addEventListener('pointerleave',()=>fallback.style.transform='perspective(850px) rotateY(-12deg)');
function pointer(e){px=e.clientX;py=e.clientY;if(paused)return;const lightX=e.clientX/innerWidth*100,lightY=e.clientY/innerHeight*100;document.documentElement.style.setProperty('--pointer-x',lightX+'%');document.documentElement.style.setProperty('--pointer-y',lightY+'%')}
addEventListener('pointermove',pointer,{passive:true});
if(fine.matches&&!reduce.matches){
  document.addEventListener('pointerover',e=>{cursor?.classList.toggle('is-active',!!e.target.closest('a,button,.product,#three-stage,.night-shot'))});
  document.addEventListener('pointerout',e=>{if(!e.relatedTarget)cursor?.classList.remove('is-active')});
}
$$('.night-shot').forEach(shot=>shot.addEventListener('pointermove',e=>{if(paused)return;const b=shot.getBoundingClientRect();shot.style.setProperty('--light-x',((e.clientX-b.left)/b.width*100)+'%');shot.style.setProperty('--light-y',((e.clientY-b.top)/b.height*100)+'%')}));
function frame(){raf=requestAnimationFrame(frame);if(paused||document.hidden||!fine.matches)return;cx+=(px-cx)*.19;cy+=(py-cy)*.19;if(cursor){const active=cursor.classList.contains('is-active'),offset=active?32:9;cursor.style.transform='translate3d('+(cx-offset)+'px,'+(cy-offset)+'px,0)'} }
if(fine.matches&&!reduce.matches)raf=requestAnimationFrame(frame);
const heroTitle=$('.glitch-title');let glitchTimer=null;
function pulseGlitch(){if(paused||document.hidden)return;heroTitle.classList.remove('glitch-active');void heroTitle.offsetWidth;heroTitle.classList.add('glitch-active');setTimeout(()=>heroTitle.classList.remove('glitch-active'),520)}
if(!reduce.matches)glitchTimer=setInterval(pulseGlitch,7300);
const revealSelector='.section-copy .type-large,.night-heading .type-large,.neon-city .section-head .type-large,.manifesto-strip h2,.finale-content h2,.finale-logo,.night-shot';
function revealFallback(){observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 90px 0px'}):null;if(!observer)return; $$(revealSelector).forEach(el=>{el.classList.add('reveal-on-scroll');observer.observe(el)})}
function animateGSAP(){
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;if(!gsap||!ScrollTrigger||reduce.matches){revealFallback();return}
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo('.hero-content .signal-label',{opacity:0,y:18},{opacity:1,y:0,duration:.75,delay:.15,ease:'power3.out'});
  gsap.fromTo('.hero h1>span',{clipPath:'inset(0 100% 0 0)',x:-50},{clipPath:'inset(0 0% 0 0)',x:0,duration:1.12,delay:.32,ease:'expo.out'});
  gsap.fromTo('.hero h1 em',{clipPath:'inset(0 100% 0 0)',x:60},{clipPath:'inset(0 0% 0 0)',x:0,duration:1.35,delay:.55,ease:'expo.out'});
  gsap.fromTo('.hero-description,.hero-actions',{opacity:0,y:30},{opacity:1,y:0,stagger:.13,duration:1,delay:.85,ease:'power3.out'});
  gsap.to('.hero-neon',{rotate:-6,scale:1.26,opacity:.66,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.to('.void-marquee>div',{xPercent:-23,ease:'none',scrollTrigger:{trigger:'.materialized',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.fromTo('.section-copy .type-large',{clipPath:'inset(0 0 100% 0)',y:60},{clipPath:'inset(0 0 0 0)',y:0,ease:'power4.out',duration:1.2,scrollTrigger:{trigger:'.materialized',start:'top 67%',once:true}});
  gsap.fromTo('.object-picker .look-choice',{x:-30,opacity:0},{x:0,opacity:1,duration:.65,stagger:.09,ease:'power3.out',scrollTrigger:{trigger:'.object-picker',start:'top 82%',once:true}});
  gsap.fromTo('.manifesto-strip h2',{y:120,skewY:5,clipPath:'inset(0 0 100% 0)'},{y:0,skewY:0,clipPath:'inset(0 0 0% 0)',duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.manifesto-strip',start:'top 65%',once:true}});
  gsap.to('.manifesto-stamp',{rotate:6,y:-150,ease:'none',scrollTrigger:{trigger:'.manifesto-strip',start:'top bottom',end:'bottom top',scrub:true}});
  $$('.neon-city .section-head .type-large,.night-heading .type-large,.finale-content h2').forEach(el=>gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)',y:65},{clipPath:'inset(0 0 0 0)',y:0,duration:1.15,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
  gsap.fromTo('.night-shot.primary',{y:80,rotate:-2},{y:0,rotate:0,ease:'none',scrollTrigger:{trigger:'.night-editorial',start:'top bottom',end:'bottom top',scrub:1.1}});
  gsap.fromTo('.night-shot.secondary',{y:130,rotate:3},{y:0,rotate:0,ease:'none',scrollTrigger:{trigger:'.night-editorial',start:'top bottom',end:'bottom top',scrub:1.1}});
  gsap.fromTo('.finale-logo',{letterSpacing:'-.11em',opacity:.15,scale:.86},{letterSpacing:'-.068em',opacity:1,scale:1,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'.finale',start:'top 65%',once:true}});
  gsap.to('.finale-sigil',{rotate:90,scale:1.15,ease:'none',scrollTrigger:{trigger:'.finale',start:'top bottom',end:'bottom top',scrub:2}});
  function decorateGrid(){ $$('.product').forEach((el,i)=>{if(el.dataset.voidAnimated)return;el.dataset.voidAnimated='1';gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)',y:45},{clipPath:'inset(0 0 0 0)',y:0,duration:.75,delay:(i%4)*.06,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 98%',once:true}})});ScrollTrigger.refresh()}
  decorateGrid();new MutationObserver(decorateGrid).observe($('#productGrid'),{childList:true});
}
if(document.readyState==='complete')animateGSAP();else addEventListener('load',animateGSAP,{once:true});
addEventListener('pagehide',()=>{cancelAnimationFrame(raf);clearInterval(glitchTimer);observer?.disconnect()});
})();
