const catalogue=[
['SECURE THE BAG OVERSHIRT','outerwear',1,'Black utility overshirt with neon camo sleeves and statement patches.'],
['TRUST THE PROCESS HOODIE','hoodies',2,'Yellow warning hoodie with oversized graffiti back print.'],
['HEAVY DUTY UTILITY VEST','outerwear',3,'Black and high-vis vest with industrial patchwork.'],
['NIGHT SHIFT COVERALL','bottoms',4,'Black utility jumpsuit with hi-vis yellow shoulder panels.'],
['ORANGE CROSS JACKET','outerwear',5,'High-visibility orange statement jacket with reflective cross.'],
['HALF & HALF HOODIE','hoodies',6,'Two-tone yellow and black hoodie with checkerboard sleeves.'],
['AFTER DARK MASK HOODIE','hoodies',7,'High-vis orange hooded streetwear concept.'],
['WORK IN PROGRESS HOODIE','hoodies',8,'White graphic hoodie with hazard illustrations.'],
['UTILITY CLUB VEST','outerwear',9,'Multi-pocket yellow vest styled over a black hoodie.'],
['CONSTRUCTION ZONE DENIM','outerwear',10,'Washed black denim jacket with reflective grey framing.'],
['HEAVY DUTY SYDNEY TEE','tees',11,'Relaxed orange tee with bold heavy-duty lettering.'],
['SAFETY STRIPE PUFFER','outerwear',12,'Orange sleeveless insulated vest with reflective detailing.'],
['ROAD WORK AHEAD LONGSLEEVE','tees',13,'Bright yellow long-sleeve with large graphic back print.'],
['REFLECTIVE X HOODIE','hoodies',14,'Black oversized hoodie featuring an X of reflective safety tape.'],
['HARBOUR SHIFT HOODIE','hoodies',15,'Yellow reflective hoodie photographed above Sydney Harbour.'],
['CONSTRUCTION ZONE HOODIE','hoodies',16,'Black hoodie with safety graphics and high-vis cargo pant styling.'],
['FULL SITE FIT','bottoms',17,'Industrial hi-vis pants styled with streetwear graphics.'],
['SIDEWALK RESILIENCE VEST','outerwear',18,'Utility high-vis vest and dark layered cargo styling.'],
['CONCEPT 10 REBUILD JACKET','outerwear',19,'Panelled black/yellow work-inspired jacket with crane art.'],
['CONCEPT 11 LIFT JACKET','outerwear',20,'Black distressed jacket with reflective bands and heavy-lift graphics.']
].map(([name,category,image,desc],i)=>({id:i+1,name,category,image:`assets/look-${String(image).padStart(2,'0')}.webp`,desc}));
let filter='all',selected=null;let bag=[];try{bag=JSON.parse(localStorage.getItem('caution-bag')||'[]');if(!Array.isArray(bag))bag=[]}catch{bag=[]}
const $=(s)=>document.querySelector(s),$$=(s)=>[...document.querySelectorAll(s)];const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function render(){const items=catalogue.filter(x=>filter==='all'||x.category===filter);$('#productGrid').innerHTML=items.map((p,i)=>`<article class="product" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}"><div class="product-photo"><span class="product-tag">${i<3?'DROP 001':'CAUTION CO.'}</span><img src="${p.image}" alt="${p.name} fashion look" loading="lazy"><button class="quick" data-id="${p.id}" aria-label="Quick view ${p.name}">↗</button></div><div class="product-meta"><strong>${p.name}</strong><span>PRICE ON ENQUIRY<br>VIEW DETAILS ↗</span></div></article>`).join('');$$('.product').forEach(el=>{const open=()=>openProduct(+el.dataset.id);el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter')open()})})}
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;$$('.filter').forEach(b=>b.classList.toggle('active',b===btn));render()}));
function openProduct(id){selected=catalogue.find(x=>x.id===id);if(!selected)return;$('#modalName').textContent=selected.name;$('#modalDesc').textContent=selected.desc;$('#modalImage').src=selected.image;$('#modalImage').alt=selected.name;$('#sizeSelect').value='';$('#productDialog').showModal()}
$('#closeProduct').onclick=()=>$('#productDialog').close();$('#productDialog').onclick=e=>{if(e.target===$('#productDialog'))e.target.close()};
$('#addBag').onclick=()=>{const size=$('#sizeSelect').value;if(!size){$('#sizeSelect').focus();return}bag.push({id:selected.id,size});saveBag();$('#productDialog').close();openBag()};
function saveBag(){try{localStorage.setItem('caution-bag',JSON.stringify(bag))}catch{}renderBag()}
function renderBag(){$('#bagCount').textContent=String(bag.length).padStart(2,'0');$('#bagHeaderCount').textContent=`(${bag.length})`;$('#bagItems').innerHTML=bag.length?bag.map((line,i)=>{const p=catalogue.find(x=>x.id===line.id);if(!p)return '';return `<div class="bag-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><p>SIZE: ${line.size}</p><p>PRICE: ENQUIRE</p><button data-remove="${i}">REMOVE</button></div></div>`}).join(''):'<p>YOUR BAG IS EMPTY. GET MOVING.</p>';$$('[data-remove]').forEach(btn=>btn.onclick=()=>{bag.splice(+btn.dataset.remove,1);saveBag()})}
function openBag(){$('#bag').classList.add('open');$('#bag').setAttribute('aria-hidden','false');$('#veil').classList.add('show');$('#closeBag').focus()}
function closeBag(){$('#bag').classList.remove('open');$('#bag').setAttribute('aria-hidden','true');$('#veil').classList.remove('show')}
$('#cartButton').onclick=openBag;$('#closeBag').onclick=closeBag;$('#veil').onclick=closeBag;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBag()});
$('#enquireButton').onclick=()=>{if(!bag.length){closeBag();document.getElementById('drop').scrollIntoView();return}const summary=bag.map((line,i)=>{const p=catalogue.find(x=>x.id===line.id);return `${i+1}. ${p.name} — ${line.size}`}).join('\n');const message=`Hello CAUTION CO.,\n\nPlease confirm stock, pricing and ordering instructions for:\n${summary}\n\nMy name:\nShipping location:\n\nThank you.`;navigator.clipboard?.writeText(message).catch(()=>{});const subject=encodeURIComponent('CAUTION CO. product enquiry');const body=encodeURIComponent(message);alert('Your enquiry details have been copied where supported. Configure your real business contact address before accepting orders.');};
$('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();$('#newsletterNotice').textContent='SIGN-UP IS A DEMO — CONNECT AN EMAIL PLATFORM TO RECEIVE SUBSCRIPTIONS.'});
$('#menuButton').onclick=()=>{const open=$('nav').classList.toggle('open');$('#menuButton').setAttribute('aria-expanded',String(open))};$$('nav a').forEach(a=>a.onclick=()=>$('nav').classList.remove('open'));
let ticking=false;function scrollEffects(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=`${max>0?scrollY/max*100:0}%`;if(!reduce){$('.hero-image').style.transform=`scale(1.075) translateY(${Math.min(scrollY*.14,140)}px)`}ticking=false})}addEventListener('scroll',scrollEffects,{passive:true});scrollEffects();
if(!reduce&&matchMedia('(pointer:fine)').matches){document.getElementById('productGrid').addEventListener('pointermove',e=>{const card=e.target.closest('.product');if(!card)return;const photo=card.querySelector('.product-photo');const r=photo.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;photo.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateZ(3px)`;photo.style.transition='transform .17s ease';});document.getElementById('productGrid').addEventListener('pointerout',e=>{const card=e.target.closest('.product');if(card&&!card.contains(e.relatedTarget)){card.querySelector('.product-photo').style.transform=''}});$$('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.13}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}
render();renderBag();
