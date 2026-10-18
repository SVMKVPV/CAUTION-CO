/* CAUTION CO. / THE VOID / WebGL editorial object study.
   Uses real collection photos on curled, segmented 3D geometry.
   Replace with optimized .glb garment meshes for full volumetric clothing renders. */
(async()=>{'use strict';
const stage=document.getElementById('three-stage');
if(!stage||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const small=matchMedia('(max-width: 720px)').matches;
let started=false;
async function start(){
  if(started)return;started=true;
  const test=document.createElement('canvas');let gl;
  try{gl=test.getContext('webgl2',{failIfMajorPerformanceCaveat:true})||test.getContext('webgl',{failIfMajorPerformanceCaveat:true})}catch{}
  if(!gl)return;
  try{
    const T=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const scene=new T.Scene();
    scene.fog=new T.FogExp2(0x090910,.037);
    const camera=new T.PerspectiveCamera(35,1,.1,80);camera.position.set(0,0,10.6);
    const renderer=new T.WebGLRenderer({alpha:true,antialias:!small,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,small?1.25:1.65));
    renderer.outputColorSpace=T.SRGBColorSpace;
    renderer.toneMapping=T.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.22;
    renderer.setClearColor(0x090910,0);
    stage.appendChild(renderer.domElement);
    const ambient=new T.AmbientLight(0xffffff,2);scene.add(ambient);
    const pink=new T.PointLight(0xb973ff,22,17);pink.position.set(-4,2,4);scene.add(pink);
    const acid=new T.PointLight(0xdfff38,16,15);acid.position.set(4,-2,3);scene.add(acid);
    const object=new T.Group();scene.add(object);
    const faces=[];
    const segmentCount=small?9:15,fullWidth=3.85,fullHeight=5.2;
    const material=new T.MeshStandardMaterial({color:0xffffff,roughness:.87,metalness:.05,side:T.DoubleSide,transparent:true,opacity:0});
    for(let i=0;i<segmentCount;i++){
      const w=fullWidth/segmentCount;
      const geo=new T.PlaneGeometry(w,fullHeight,1,24);
      const uv=geo.getAttribute('uv'),pos=geo.getAttribute('position');
      for(let j=0;j<uv.count;j++){
        uv.setX(j,(i+uv.getX(j))/segmentCount);
        const y=pos.getY(j),x=pos.getX(j);
        pos.setZ(j,Math.sin((y/fullHeight+.5)*Math.PI*2.1+i*.17)*.11+Math.cos(x*4+i*.4)*.035);
      }
      geo.computeVertexNormals();
      const piece=new T.Mesh(geo,material);
      const offset=i-(segmentCount-1)/2;
      piece.position.x=offset*w;
      piece.position.z=Math.sin(i*.8)*.055;
      piece.userData.index=i;
      object.add(piece);faces.push(piece);
    }
    // Several volumetric accent rings give the product physical depth.
    const accent=new T.Group();scene.add(accent);
    const wireMat=new T.MeshBasicMaterial({color:0xdfff38,transparent:true,opacity:.24,wireframe:true,depthWrite:false});
    const torus=new T.Mesh(new T.TorusGeometry(3.75,.009,3,130),wireMat);
    torus.rotation.set(.24,.27,.16);accent.add(torus);
    const backRing=new T.Mesh(new T.TorusGeometry(4.45,.006,3,128),new T.MeshBasicMaterial({color:0xa468ff,transparent:true,opacity:.18,depthWrite:false}));
    backRing.rotation.x=.52;backRing.position.z=-1.1;accent.add(backRing);
    const backdrop=new T.Mesh(new T.PlaneGeometry(6,7),new T.MeshBasicMaterial({color:0x07070b,transparent:true,opacity:.12,depthWrite:false}));
    backdrop.position.z=-1.9;scene.add(backdrop);
    // 3D rain points, capped to avoid oversized GPU buffers on mobile.
    const count=small?85:190,coords=new Float32Array(count*3),speeds=new Float32Array(count);
    for(let i=0;i<count;i++){coords[i*3]=(Math.random()-.5)*13;coords[i*3+1]=(Math.random()-.5)*13;coords[i*3+2]=-1-Math.random()*8;speeds[i]=.025+Math.random()*.05}
    const particlesGeo=new T.BufferGeometry();
    particlesGeo.setAttribute('position',new T.BufferAttribute(coords,3));
    const rain=new T.Points(particlesGeo,new T.PointsMaterial({color:0xd5ccff,size:small?.028:.038,transparent:true,opacity:.45,sizeAttenuation:true,depthWrite:false}));
    scene.add(rain);
    const loader=new T.TextureLoader();let currentTexture=null,request=0;
    function setLook(number){
      const token=++request;
      const url='assets/look-'+String(number).padStart(2,'0')+'.webp';
      loader.load(url,texture=>{
        if(token!==request){texture.dispose();return}
        texture.colorSpace=T.SRGBColorSpace;
        texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
        const old=currentTexture;currentTexture=texture;material.map=texture;material.opacity=1;material.needsUpdate=true;
        if(old)old.dispose();
        if(window.gsap){
          faces.forEach((piece,i)=>{window.gsap.fromTo(piece.position,{z:Math.cos(i)*.35},{z:Math.sin(i*.8)*.055,duration:.8,delay:i*.015,ease:'expo.out',overwrite:true});window.gsap.fromTo(piece.rotation,{y:Math.sin(i*.56)*.16},{y:0,duration:.8,delay:i*.015,ease:'expo.out',overwrite:true});});
        }
        stage.classList.add('three-ready');
      },undefined,()=>{stage.classList.remove('three-ready')});
    }
    const pos={x:0,y:0};let dragging=false,lastX=0,visible=true,motion=true,lastTime=0,frame=0;
    stage.addEventListener('pointermove',e=>{
      const b=stage.getBoundingClientRect();
      pos.x=((e.clientX-b.left)/b.width-.5)*2;pos.y=((e.clientY-b.top)/b.height-.5)*2;
      if(dragging){const delta=(e.clientX-lastX)/b.width;object.rotation.y+=delta*3.5;lastX=e.clientX}
    });
    stage.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;stage.setPointerCapture?.(e.pointerId)});
    stage.addEventListener('pointerup',()=>dragging=false);stage.addEventListener('pointercancel',()=>dragging=false);
    stage.addEventListener('pointerleave',()=>{dragging=false;pos.x=0;pos.y=0});
    let scrollInfluence=0;
    function resize(){
      const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);
      renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=h>w?12:10.6;camera.updateProjectionMatrix();
    }
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resize();
    const viewObserver=new IntersectionObserver(items=>{visible=items.some(e=>e.isIntersecting);if(visible)run()}, {rootMargin:'200px'});viewObserver.observe(stage);
    function onScroll(){const rect=stage.getBoundingClientRect();scrollInfluence=Math.max(-1,Math.min(1,(innerHeight/2-(rect.top+rect.height/2))/innerHeight))}
    addEventListener('scroll',onScroll,{passive:true});onScroll();
    function render(time){
      frame=0;if(!visible||!motion||document.hidden)return;
      const dt=Math.min(32,time-lastTime||16);lastTime=time;
      if(!dragging){object.rotation.y+=(pos.x*.3+scrollInfluence*.48-object.rotation.y)*.045}
      object.rotation.x+=(-pos.y*.14+scrollInfluence*.08-object.rotation.x)*.04;
      object.position.y=Math.sin(time*.0007)*.09;
      torus.rotation.z+=.00028*dt;
      backRing.rotation.y=Math.sin(time*.00025)*.34;
      acid.position.x=3.4+pos.x*2.2;pink.position.y=2.3-pos.y*1.4;
      for(let i=0;i<count;i++){coords[i*3+1]-=speeds[i]*dt*.055;if(coords[i*3+1]<-7)coords[i*3+1]=7}
      particlesGeo.attributes.position.needsUpdate=true;
      renderer.render(scene,camera);run();
    }
    function run(){if(!frame&&visible&&motion&&!document.hidden)frame=requestAnimationFrame(render)}
    window.CautionScene={
      setLook,
      setMotion(enabled){motion=enabled;if(enabled)run();else{cancelAnimationFrame(frame);frame=0}}
    };
    window.CautionOnSceneReady?.();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)run()});
    run();
    // Cleanup browser-managed GPU resources on full page exit.
    addEventListener('pagehide',()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();viewObserver.disconnect();particlesGeo.dispose();faces.forEach(p=>p.geometry.dispose());material.dispose();currentTexture?.dispose();torus.geometry.dispose();wireMat.dispose();backRing.geometry.dispose();backRing.material.dispose();rain.material.dispose();renderer.dispose()},{once:true});
  }catch(err){console.warn('WebGL scene unavailable; editorial image fallback retained.',err);stage.classList.remove('three-ready')}
}
if('IntersectionObserver' in window){const trigger=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){trigger.disconnect();start()}},{rootMargin:'450px'});trigger.observe(stage)}else start();
})();
