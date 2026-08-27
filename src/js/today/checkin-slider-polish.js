const STYLE_ID = 'auren-checkin-slider-build-23';
const STYLE_HREF = './src/css/today-checkin.css';
const METRICS = ['sleep','energy','stress','mood','movement'];

function installStylesheet(){
  return new Promise((resolve,reject)=>{
    const existing=document.getElementById(STYLE_ID);
    if(existing){if(existing.sheet) resolve(); else {existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',()=>reject(new Error('Check-in slider stylesheet failed')),{once:true});} return;}
    const link=document.createElement('link');
    link.id=STYLE_ID;link.rel='stylesheet';link.href=STYLE_HREF;
    link.addEventListener('load',resolve,{once:true});
    link.addEventListener('error',()=>reject(new Error('Check-in slider stylesheet failed')),{once:true});
    document.head.appendChild(link);
  });
}

function upgradeKnownSliders(){
  const form=document.getElementById('checkinForm');
  if(!form) return false;
  let found=0;
  METRICS.forEach((metric)=>{
    const input=document.getElementById(`checkin-${metric}`);
    if(!(input instanceof HTMLInputElement)||input.type!=='range') return;
    input.dataset.aurenCheckinSlider='1';
    input.dataset.metric=metric;
    found+=1;
  });
  if(found) form.dataset.aurenCheckinSheet='1';
  return found===METRICS.length;
}

function scheduleUpgrade(){
  queueMicrotask(()=>{
    upgradeKnownSliders();
    requestAnimationFrame(()=>upgradeKnownSliders());
  });
}

async function init(){
  try{await installStylesheet();}catch(error){console.error(error);return;}
  upgradeKnownSliders();

  const fields=document.getElementById('checkinFields');
  if(fields){
    const observer=new MutationObserver(()=>scheduleUpgrade());
    observer.observe(fields,{childList:true,subtree:true});
  }

  document.addEventListener('click',(event)=>{
    if(event.target?.closest?.('#checkinBtn')) setTimeout(scheduleUpgrade,0);
  },true);
  document.addEventListener('auren:data-refreshed',scheduleUpgrade);

  const langObserver=new MutationObserver(()=>scheduleUpgrade());
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}

if(typeof document!=='undefined'){
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
}
