/* Schede trattamenti · Studio Dentistico Colombo
   Codice in comune: geometria dei disegni, etichette, fasi, consegna al paziente. */
(function(){
"use strict";
document.documentElement.lang = "it";
var T = window.T = {};

/* ===== Geometria (coordinate della scena 720 × 540, circa 18 unità = 1 mm) ===== */
function crownTop(c){return "M"+(c-62)+" 240 C"+(c-80)+" 206 "+(c-88)+" 160 "+(c-82)+" 130 C"+(c-78)+" 108 "+(c-62)+" 96 "+(c-42)+" 96 C"+(c-24)+" 96 "+(c-14)+" 112 "+c+" 112 C"+(c+14)+" 112 "+(c+24)+" 96 "+(c+42)+" 96 C"+(c+62)+" 96 "+(c+78)+" 108 "+(c+82)+" 130 C"+(c+88)+" 160 "+(c+80)+" 206 "+(c+62)+" 240 ";}
function rootDown(c){return "C"+(c+56)+" 310 "+(c+40)+" 400 "+(c+18)+" 448 C"+(c+10)+" 462 "+(c-10)+" 462 "+(c-18)+" 448 C"+(c-40)+" 400 "+(c-56)+" 310 ";}
T.toothBody=function(c){return crownTop(c)+rootDown(c)+(c-62)+" 240 Z";};
T.crownCap=function(c){return crownTop(c)+"C"+(c+30)+" 230 "+(c-30)+" 230 "+(c-62)+" 240 Z";};
T.pontic=function(c){return crownTop(c)+"C"+(c+30)+" 254 "+(c-30)+" 254 "+(c-62)+" 240 Z";};
T.crownCore=function(c){return "M"+(c-52)+" 246 C"+(c-66)+" 210 "+(c-72)+" 168 "+(c-68)+" 142 C"+(c-64)+" 124 "+(c-52)+" 114 "+(c-36)+" 114 C"+(c-22)+" 114 "+(c-12)+" 126 "+c+" 126 C"+(c+12)+" 126 "+(c+22)+" 114 "+(c+36)+" 114 C"+(c+52)+" 114 "+(c+64)+" 124 "+(c+68)+" 142 C"+(c+72)+" 168 "+(c+66)+" 210 "+(c+52)+" 246 Z";};
T.pulp=function(c){return "M"+(c-28)+" 152 C"+(c-32)+" 134 "+(c-20)+" 128 "+(c-12)+" 136 C"+(c-6)+" 142 "+(c+6)+" 142 "+(c+12)+" 136 C"+(c+20)+" 128 "+(c+32)+" 134 "+(c+28)+" 152 C"+(c+24)+" 182 "+(c+16)+" 212 "+(c+10)+" 242 C"+(c+7)+" 320 "+(c+5)+" 390 "+(c+3)+" 440 L"+(c-3)+" 440 C"+(c-5)+" 390 "+(c-7)+" 320 "+(c-10)+" 242 C"+(c-16)+" 212 "+(c-24)+" 182 "+(c-28)+" 152 Z";};
T.pulpPrep=function(c){return "M"+(c-20)+" 178 C"+(c-22)+" 164 "+(c-14)+" 160 "+(c-8)+" 166 C"+(c-4)+" 170 "+(c+4)+" 170 "+(c+8)+" 166 C"+(c+14)+" 160 "+(c+22)+" 164 "+(c+20)+" 178 C"+(c+18)+" 198 "+(c+14)+" 218 "+(c+10)+" 242 C"+(c+7)+" 320 "+(c+5)+" 390 "+(c+3)+" 440 L"+(c-3)+" 440 C"+(c-5)+" 390 "+(c-7)+" 320 "+(c-10)+" 242 C"+(c-14)+" 218 "+(c-18)+" 198 "+(c-20)+" 178 Z";};
T.stump=function(c){return "M"+(c-58)+" 242 L"+(c-50)+" 140 C"+(c-49)+" 128 "+(c-40)+" 122 "+(c-28)+" 122 L"+(c+28)+" 122 C"+(c+40)+" 122 "+(c+49)+" 128 "+(c+50)+" 140 L"+(c+58)+" 242";};
T.preparedBody=function(c){return "M"+(c-60)+" 244 L"+(c-50)+" 140 C"+(c-49)+" 128 "+(c-40)+" 122 "+(c-28)+" 122 L"+(c+28)+" 122 C"+(c+40)+" 122 "+(c+49)+" 128 "+(c+50)+" 140 L"+(c+60)+" 244 C"+(c+56)+" 310 "+(c+40)+" 400 "+(c+18)+" 448 C"+(c+10)+" 462 "+(c-10)+" 462 "+(c-18)+" 448 C"+(c-40)+" 400 "+(c-56)+" 310 "+(c-60)+" 244 Z";};
T.rootLine=function(c){return "M"+(c-62)+" 240 "+rootDown(c)+(c-62)+" 240";};
T.socket=function(c){return "M"+(c-60)+" 266 C"+(c-54)+" 330 "+(c-40)+" 400 "+(c-18)+" 448 C"+(c-10)+" 462 "+(c+10)+" 462 "+(c+18)+" 448 C"+(c+40)+" 400 "+(c+54)+" 330 "+(c+60)+" 266 Z";};
T.gloss=function(c){return "M"+(c-60)+" 150 C"+(c-60)+" 130 "+(c-52)+" 116 "+(c-38)+" 112";};
T.IMPLANT={top:272,len:180,r:36};
T.implant=function(c,o){
  o=o||T.IMPLANT; var top=o.top, len=o.len, r=o.r, pitch=14, pts=[[c+r,top],[c+r,top+8]], y=top+14;
  while(y < top+len-30){var t=(y-top)/len, ro=r+3-t*10, ri=ro-7; pts.push([c+ro,y]); pts.push([c+ri,y+pitch/2]); y+=pitch;}
  var last=pts[pts.length-1], rr=last[0]-c, ly=last[1];
  var d="M"+(c-r)+" "+top+" ";
  pts.forEach(function(p){d+="L"+p[0].toFixed(1)+" "+p[1]+" ";});
  d+="C"+(c+rr).toFixed(1)+" "+(ly+16)+" "+(c+12)+" "+(top+len)+" "+c+" "+(top+len)+" C"+(c-12)+" "+(top+len)+" "+(c-rr).toFixed(1)+" "+(ly+16)+" "+(c-rr).toFixed(1)+" "+ly+" ";
  for(var i=pts.length-2;i>=0;i--){d+="L"+(2*c-pts[i][0]).toFixed(1)+" "+pts[i][1]+" ";}
  return d+"Z";
};
T.halo=function(c,o){o=o||T.IMPLANT; var t=o.top+4,b=o.top+o.len,r=o.r,e=13,m=(t+b)/2;return "M"+(c-r-e)+" "+t+" L"+(c+r+e)+" "+t+" C"+(c+r+e)+" "+m+" "+(c+r+e-6)+" "+(b-20)+" "+(c+r-4)+" "+(b+8)+" C"+(c+14)+" "+(b+e+4)+" "+(c-14)+" "+(b+e+4)+" "+(c-r+4)+" "+(b+8)+" C"+(c-r-e+6)+" "+(b-20)+" "+(c-r-e)+" "+m+" "+(c-r-e)+" "+t+" Z";};
T.abutment=function(c,top){top=top||272;return "M"+(c-34)+" "+top+" C"+(c-38)+" "+(top-10)+" "+(c-40)+" "+(top-20)+" "+(c-36)+" "+(top-30)+" L"+(c-28)+" 186 C"+(c-27)+" 178 "+(c-20)+" 174 "+(c-12)+" 174 L"+(c+12)+" 174 C"+(c+20)+" 174 "+(c+27)+" 178 "+(c+28)+" 186 L"+(c+36)+" "+(top-30)+" C"+(c+40)+" "+(top-20)+" "+(c+38)+" "+(top-10)+" "+(c+34)+" "+top+" Z";};
T.healScrew=function(c,top){top=top||272;return "M"+(c-28)+" "+top+" L"+(c-30)+" 238 C"+(c-30)+" 230 "+(c-26)+" 226 "+(c-18)+" 226 L"+(c+18)+" 226 C"+(c+26)+" 226 "+(c+30)+" 230 "+(c+30)+" 238 L"+(c+28)+" "+top+" Z";};
T.gumOpening=function(c){return "M"+(c-56)+" 232 C"+(c-30)+" 243 "+(c+30)+" 243 "+(c+56)+" 232 L"+(c+60)+" 286 L"+(c-60)+" 286 Z";};
T.membrane=function(c){return "M"+(c-66)+" 234 C"+(c-30)+" 250 "+(c+30)+" 250 "+(c+66)+" 234 L"+(c+66)+" 226 C"+(c+30)+" 242 "+(c-30)+" 242 "+(c-66)+" 226 Z";};
T.GUM="M0 228 C60 226 120 238 178 238 C228 238 250 208 269 208 C288 208 312 240 360 240 C408 240 432 208 451 208 C470 208 492 238 542 238 C600 238 660 226 720 228 L720 284 L0 284 Z";
T.GUM_TOP="M0 228 C60 226 120 238 178 238 C228 238 250 208 269 208 C288 208 312 240 360 240 C408 240 432 208 451 208 C470 208 492 238 542 238 C600 238 660 226 720 228";
T.BONE="M0 274 L720 274 L720 540 L0 540 Z";

/* ===== Pezzi di disegno ===== */
T.defs=function(p){
  return '<defs>'+
   '<pattern id="'+p+'pores" width="46" height="38" patternUnits="userSpaceOnUse"><ellipse cx="8" cy="9" rx="5" ry="3.5" class="f-pore"/><ellipse cx="30" cy="6" rx="3" ry="2.2" class="f-pore"/><ellipse cx="22" cy="24" rx="6" ry="4" class="f-pore"/><ellipse cx="41" cy="30" rx="3.6" ry="2.6" class="f-pore"/><ellipse cx="5" cy="31" rx="2.6" ry="2" class="f-pore"/></pattern>'+
   '<pattern id="'+p+'graft" width="22" height="20" patternUnits="userSpaceOnUse"><rect width="22" height="20" class="f-graft-bg"/><circle cx="5" cy="5" r="3.6" class="granule"/><circle cx="15" cy="7" r="2.8" class="granule"/><circle cx="10" cy="15" r="3.3" class="granule"/><circle cx="19" cy="17" r="2.3" class="granule"/><circle cx="2" cy="16" r="1.9" class="granule"/></pattern>'+
   '<pattern id="'+p+'graft2" width="30" height="28" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="3" class="granule"/><circle cx="20" cy="15" r="2.4" class="granule"/><circle cx="9" cy="22" r="2" class="granule"/></pattern>'+
   '<linearGradient id="'+p+'ti" x1="0" x2="1"><stop offset="0" style="stop-color:var(--ti-3)"/><stop offset=".35" style="stop-color:var(--ti-1)"/><stop offset=".7" style="stop-color:var(--ti-2)"/><stop offset="1" style="stop-color:var(--ti-3)"/></linearGradient>'+
   '<linearGradient id="'+p+'ab" x1="0" x2="1"><stop offset="0" style="stop-color:var(--ti-2)"/><stop offset=".4" style="stop-color:var(--ti-1)"/><stop offset="1" style="stop-color:var(--ti-3)"/></linearGradient>'+
   '<marker id="'+p+'arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="f-accent"/></marker>'+
  '</defs>';
};
T.stageBg=function(){return '<rect x="-400" y="-400" width="1520" height="1340" class="f-stage"/>';};
T.bone=function(p){return '<path d="'+T.BONE+'" class="f-bone"/><path d="'+T.BONE+'" fill="url(#'+p+'pores)"/>';};
T.gum=function(){return '<path d="'+T.GUM+'" class="f-gum"/><path d="'+T.GUM_TOP+'" class="gum-edge"/>';};
T.nerve=function(){return '<path d="M-10 500 C180 494 520 494 730 502" class="nerve-out"/><path d="M-10 500 C180 494 520 494 730 502" class="nerve-in"/>';};
T.tooth=function(c,extra){
  return '<path d="'+T.toothBody(c)+'" class="f-dentin o-line"/><path d="'+T.crownCap(c)+'" class="f-enamel o-line"/><path d="'+T.crownCore(c)+'" class="f-dentin"/><path d="'+T.pulp(c)+'" class="f-pulp"/>'+(extra||"");
};
T.damagedTooth=function(c){return T.tooth(c,'<ellipse cx="'+(c+32)+'" cy="134" rx="17" ry="13" class="f-caries"/><path d="M'+(c-14)+' 114 L'+(c-6)+' 140 L'+(c-16)+' 162 L'+(c-4)+' 196" class="crack"/>');};
T.prepared=function(c){return '<path d="'+T.preparedBody(c)+'" class="f-dentin o-line"/><path d="'+T.pulpPrep(c)+'" class="f-pulp"/>';};
T.bridge=function(cls){
  return '<rect x="246" y="148" width="50" height="56" rx="16" class="'+cls+' o-line"/><rect x="424" y="148" width="50" height="56" rx="16" class="'+cls+' o-line"/>'+
    '<path d="'+T.crownCap(178)+'" class="'+cls+' o-line"/><path d="'+T.crownCap(542)+'" class="'+cls+' o-line"/><path d="'+T.pontic(360)+'" class="'+cls+' o-line"/>';
};
T.bridgeGloss=function(){return '<path d="'+T.gloss(178)+'" class="gloss"/><path d="'+T.gloss(360)+'" class="gloss"/><path d="'+T.gloss(542)+'" class="gloss"/>';};
T.implantG=function(p,c,o){return '<path d="'+T.implant(c,o)+'" fill="url(#'+p+'ti)" class="o-line"/>';};
T.coverScrew=function(c,top,ghost){top=top||272;return '<g'+(ghost?' class="under-gum"':'')+'><rect x="'+(c-31)+'" y="'+(top-9)+'" width="62" height="11" rx="4" class="f-ti2 o-line"/><rect x="'+(c-7)+'" y="'+(top-7)+'" width="14" height="4" rx="1.5" class="f-ti3"/></g>';};
T.healG=function(p,c,top){return '<path d="'+T.healScrew(c,top)+'" fill="url(#'+p+'ab)" class="o-line"/><rect x="'+(c-9)+'" y="228" width="18" height="6" rx="2" class="f-ti3"/>';};
T.abutG=function(p,c,top){return '<path d="'+T.abutment(c,top)+'" fill="url(#'+p+'ab)" class="o-line"/>';};
T.crownG=function(c,cls){return '<path d="'+T.crownCap(c)+'" class="'+(cls||"f-crown")+' o-line"/>'+(cls&&cls!=="f-crown"?'':'<path d="'+T.gloss(c)+'" class="gloss"/>');};
T.sutures=function(c){
  var s=""; [c-28,c+28].forEach(function(x){s+='<path d="M'+(x-9)+' 230 L'+(x+9)+' 248 M'+(x+9)+' 230 L'+(x-9)+' 248" class="suture"/>';});
  return s;
};
T.membraneG=function(c){return '<path d="'+T.membrane(c)+'" class="f-membrane membrane-line"/>';};
T.scanner=function(x0,by,hw){
  var h=x0+43;
  return '<path d="M'+(x0+16)+' 68 L'+(x0+70)+' 68 L'+(h+hw)+' '+by+' L'+(h-hw)+' '+by+' Z" class="beam"/>'+
    '<rect x="'+x0+'" y="22" width="330" height="46" rx="23" class="scanner-body"/><rect x="'+(x0+206)+'" y="28" width="118" height="34" rx="17" class="scanner-grip"/><rect x="'+(x0+14)+'" y="62" width="58" height="8" rx="3" class="f-accent"/>';
};
T.particles=function(c,o){
  o=o||T.IMPLANT; var b=o.top+o.len, s="";
  var pts=[[c-54,o.top+40,"pl",0],[c-62,o.top+78,"pl",.6],[c-52,o.top+120,"pl",1.2],[c-60,b-22,"pl",.3],[c+54,o.top+50,"pr",.9],[c+62,o.top+90,"pr",.2],[c+50,o.top+132,"pr",1.5],[c+60,b-14,"pr",.7],[c-14,b+18,"pl",1.1],[c+16,b+18,"pr",.4]];
  pts.forEach(function(q){s+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="4" class="f-dense '+q[2]+'" style="animation-delay:'+q[3]+'s"/>';});
  return s;
};
T.scaleBar=function(){return '<g><rect x="16" y="512" width="150" height="24" rx="12" class="f-surface" opacity=".92"/><line x1="30" y1="524" x2="120" y2="524" class="scale-l"/><line x1="30" y1="518" x2="30" y2="530" class="scale-l"/><line x1="120" y1="518" x2="120" y2="530" class="scale-l"/><text x="128" y="530" class="scale-t">5 mm</text></g>';};

/* ===== Etichette (pillole con linea guida) ===== */
var canvas=document.createElement("canvas"), ctx=canvas.getContext("2d");
var BODY='"Atkinson Hyperlegible", Verdana, sans-serif';
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
T.esc=esc;
T.tags=function(list){
  return '<g class="tags">'+list.map(function(t){
    var leads="", dots="";
    (t.to||[]).forEach(function(p){leads+='<path class="lead"/>'; dots+='<circle class="dot" cx="'+p[0]+'" cy="'+p[1]+'" r="4.5"/>';});
    return '<g class="tag '+(t.cls||"")+'" style="--d:'+(t.d||0)+'s">'+leads+dots+'<rect class="pill" rx="'+(t.sub?16:19)+'"/><text class="tag-t">'+esc(t.text)+'</text>'+(t.sub?'<text class="tag-s">'+esc(t.sub)+'</text>':'')+'</g>';
  }).join("")+'</g>';
};
function layoutTags(svg,tags){
  if(!svg||!tags) return;
  svg.querySelectorAll(".tags .tag").forEach(function(g,i){
    var t=tags[i]; if(!t) return;
    ctx.font="700 22px "+BODY; var w1=ctx.measureText(t.text).width;
    var w2=0; if(t.sub){ctx.font="400 18px "+BODY; w2=ctx.measureText(t.sub).width;}
    var w=Math.ceil(Math.max(w1,w2)+30), h=t.sub?64:40;
    var x0=t.anchor==="end"?t.x-w:t.anchor==="middle"?t.x-w/2:t.x, y0=t.y-h/2;
    var r=g.querySelector(".pill"); r.setAttribute("x",x0); r.setAttribute("y",y0); r.setAttribute("width",w); r.setAttribute("height",h);
    var tt=g.querySelector(".tag-t"); tt.setAttribute("x",x0+15); tt.setAttribute("y",t.sub?y0+22:t.y+1);
    var ts=g.querySelector(".tag-s"); if(ts){ts.setAttribute("x",x0+15); ts.setAttribute("y",y0+45);}
    g.querySelectorAll(".lead").forEach(function(l,k){
      var p=t.to[k], sx, sy;
      if(p[0]<x0){sx=x0; sy=t.y;} else if(p[0]>x0+w){sx=x0+w; sy=t.y;}
      else {sx=Math.min(Math.max(p[0],x0+16),x0+w-16); sy=p[1]<y0?y0:y0+h;}
      l.setAttribute("d","M"+sx+" "+sy+" L"+p[0]+" "+p[1]);
    });
  });
}

/* ===== Piccoli schemi delle alternative ===== */
function mini(x,cls){return '<path d="M'+x+' 34 C'+(x-2)+' 25 '+(x-2)+' 15 '+(x+3)+' 12 C'+(x+7)+' 10 '+(x+9)+' 14 '+(x+12)+' 14 C'+(x+15)+' 14 '+(x+17)+' 10 '+(x+21)+' 12 C'+(x+26)+' 15 '+(x+26)+' 25 '+(x+24)+' 34 Z" class="'+cls+' o-thin"/>';}
function miniRoot(x){return '<path d="M'+(x+1)+' 34 C'+(x+3)+' 47 '+(x+8)+' 57 '+(x+12)+' 59 C'+(x+16)+' 57 '+(x+21)+' 47 '+(x+23)+' 34 Z" class="f-dentin o-thin"/>';}
var GLYPH_BASE='<rect x="0" y="40" width="96" height="24" class="f-bone"/>';
var GLYPH_GUM='<path d="M0 32 C10 32 14 38 18 38 C24 38 26 33 34 33 L62 33 C70 33 72 38 78 38 C82 38 86 32 96 32 L96 44 L0 44 Z" class="f-gum"/>';
var GLYPHS={
  impianto: GLYPH_BASE+miniRoot(6)+miniRoot(66)+'<path d="M42 36 L54 36 L53 56 Q48 62 43 56 Z" class="f-ti2 o-thin"/><path d="M42 41 h12 M42 46 h12 M43 51 h10" style="stroke:var(--ti-3)" stroke-width="1.2"/>'+GLYPH_GUM+mini(6,"f-enamel")+mini(66,"f-enamel")+'<rect x="45" y="30" width="6" height="6" class="f-ti2"/>'+mini(36,"f-crown"),
  ponte: GLYPH_BASE+miniRoot(6)+miniRoot(66)+GLYPH_GUM+'<rect x="18" y="18" width="60" height="10" rx="3" class="f-crown o-thin"/>'+mini(6,"f-crown")+mini(66,"f-crown")+'<path d="M36 33 C34 25 34 15 39 12 C43 10 45 14 48 14 C51 14 53 10 57 12 C62 15 62 25 60 33 Q48 37 36 33 Z" class="f-crown o-thin"/>',
  mobile: GLYPH_BASE+miniRoot(6)+miniRoot(66)+GLYPH_GUM+mini(6,"f-enamel")+mini(66,"f-enamel")+'<path d="M31 30 Q48 26 65 30 L64 39 Q48 42 32 39 Z" class="f-gum-deep o-thin"/>'+mini(36,"f-crown")+'<path d="M62 30 C66 24 70 22 74 24" fill="none" style="stroke:var(--accent)" stroke-width="2.4" stroke-linecap="round"/>'
};
function buildGlyphs(){
  document.querySelectorAll("svg[data-glyph]").forEach(function(s){ s.innerHTML=GLYPHS[s.getAttribute("data-glyph")]||""; });
}

/* ===== Fasi ===== */
var P, step=1, scene;
function renderStep(){
  var s=P.steps[step-1];
  scene.setAttribute("data-step",step);
  scene.setAttribute("aria-label","Illustrazione della fase "+step+": "+s.alt);
  document.getElementById("step-count").textContent="Fase "+step+" di "+P.steps.length;
  document.getElementById("step-title").textContent=s.title;
  document.getElementById("step-text").textContent=s.text;
  document.getElementById("step-note").textContent=s.note;
  document.getElementById("step-chips").innerHTML=s.chips.map(function(c){return "<li>"+esc(c)+"</li>";}).join("");
  document.getElementById("next-lbl").textContent=step===P.steps.length?"Ricomincia":"Avanti";
  document.querySelectorAll("#step-nav button").forEach(function(b,i){
    var n=i+1;
    if(n===step) b.setAttribute("aria-current","step"); else b.removeAttribute("aria-current");
    b.classList.toggle("done",n<step);
  });
}
function go(n){ if(n<1) n=1; if(n>P.steps.length) n=1; step=n; renderStep(); }
function buildNav(){
  var nav=document.getElementById("step-nav");
  nav.style.setProperty("--n",P.steps.length);
  nav.innerHTML=P.steps.map(function(s,i){
    return '<li><button type="button" data-n="'+(i+1)+'" aria-label="Fase '+(i+1)+': '+esc(s.title)+'"><span class="n">'+(i+1)+'</span><span class="lbl">'+esc(s.short)+'</span></button></li>';
  }).join("");
  nav.addEventListener("click",function(e){ var b=e.target.closest("button[data-n]"); if(b) go(+b.dataset.n); });
}

/* ===== Modalità poltrona ===== */
var wakeLock=null;
function setPresent(on){
  document.documentElement.classList.toggle("is-present",on);
  if(on){
    try{ var r=document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen(); if(r&&r.catch) r.catch(function(){}); }catch(e){}
    try{ if(navigator.wakeLock) navigator.wakeLock.request("screen").then(function(l){wakeLock=l;}).catch(function(){}); }catch(e){}
    document.getElementById("next").focus();
  } else {
    try{ if(document.fullscreenElement&&document.exitFullscreen) document.exitFullscreen().catch(function(){}); }catch(e){}
    try{ if(wakeLock){ wakeLock.release(); wakeLock=null; } }catch(e){}
    document.getElementById("btn-present").focus();
  }
}

/* ===== Schede delle istruzioni ===== */
function initTabs(){
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  function select(t){
    tabs.forEach(function(x){
      var on=x===t;
      x.setAttribute("aria-selected",on?"true":"false");
      x.tabIndex=on?0:-1;
      document.getElementById(x.getAttribute("aria-controls")).hidden=!on;
    });
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click",function(){select(t);});
    t.addEventListener("keydown",function(e){
      var k=e.key, j=null;
      if(k==="ArrowRight") j=(i+1)%tabs.length; else if(k==="ArrowLeft") j=(i-1+tabs.length)%tabs.length;
      else if(k==="Home") j=0; else if(k==="End") j=tabs.length-1;
      if(j!==null){ e.preventDefault(); tabs[j].focus(); select(tabs[j]); }
    });
  });
}

/* ===== Matrici di pallini ===== */
function iconArray(id,n,cls){
  var el=document.getElementById(id); if(!el) return;
  var h=""; for(var i=0;i<100;i++) h+='<i'+(i<n?' class="'+cls+'"':'')+'></i>';
  el.innerHTML=h;
}

/* ===== Consegna al paziente ===== */
var toastT;
function toast(msg){
  var t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastT); toastT=setTimeout(function(){t.classList.remove("show");},2200);
}
function defaultBase(){
  var here=location.href.split("#")[0];
  if(/^https?:/.test(here)&&/github\.io$|colombo/i.test(location.hostname)) return here;
  return P.publicUrl;
}
function currentUrl(){
  var base=(document.getElementById("base-url").value||P.publicUrl).trim();
  var target=(document.querySelector('input[name="target"]:checked')||{}).value||"";
  return base.split("#")[0]+(target?"#"+target:"");
}
function refreshShare(){
  var url=currentUrl();
  document.getElementById("share-url").value=url;
  document.getElementById("wa-url").href="https://wa.me/?text="+encodeURIComponent(P.shareText+" "+url);
  var box=document.getElementById("qr");
  if(typeof window.qrcode!=="function"){ box.textContent="Il codice QR non è disponibile senza connessione. Usi il link qui sotto."; return; }
  try{ var q=window.qrcode(0,"M"); q.addData(url); q.make(); box.innerHTML=q.createSvgTag({cellSize:4,margin:2,scalable:true}); }
  catch(e){ box.textContent="Link troppo lungo per il QR."; }
}
var lastFocus=null;
function openShare(){ lastFocus=document.activeElement; document.getElementById("share").hidden=false; refreshShare(); document.getElementById("share-close").focus(); }
function closeShare(){ document.getElementById("share").hidden=true; if(lastFocus&&lastFocus.focus) lastFocus.focus(); }
function copyUrl(){
  var input=document.getElementById("share-url"), url=input.value;
  function fallback(){ input.focus(); input.select(); toast("Link selezionato: copialo con Copia"); }
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function(){toast("Link copiato");},fallback);
    else fallback();
  }catch(e){ fallback(); }
}

/* ===== Avvio ===== */
T.init=function(page){
  P=page;
  scene=document.getElementById("scene");
  scene.innerHTML=P.scene.build();
  (P.figures||[]).forEach(function(f){ var el=document.getElementById(f.id); if(el) el.innerHTML=f.build(); });
  buildGlyphs(); buildNav();
  function relayout(){
    layoutTags(scene,P.scene.tags);
    (P.figures||[]).forEach(function(f){ if(f.tags) layoutTags(document.getElementById(f.id),f.tags); });
  }
  relayout();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(relayout);
  renderStep();
  (P.arrays||[]).forEach(function(a){ iconArray(a[0],a[1],a[2]); });
  initTabs();

  document.getElementById("next").addEventListener("click",function(){ go(step+1); });
  document.getElementById("prev").addEventListener("click",function(){ go(step-1); });
  document.getElementById("btn-present").addEventListener("click",function(){ setPresent(true); });
  document.getElementById("btn-exit").addEventListener("click",function(){ setPresent(false); });
  document.getElementById("btn-share").addEventListener("click",openShare);
  document.getElementById("share-close").addEventListener("click",closeShare);
  document.getElementById("share").addEventListener("click",function(e){ if(e.target===this) closeShare(); });
  document.querySelectorAll('input[name="target"]').forEach(function(r){ r.addEventListener("change",refreshShare); });
  document.getElementById("base-url").value=defaultBase();
  document.getElementById("base-url").addEventListener("input",refreshShare);
  document.getElementById("copy-url").addEventListener("click",copyUrl);

  var stage=document.getElementById("stage"), sx=null, sy=null;
  stage.addEventListener("pointerdown",function(e){ sx=e.clientX; sy=e.clientY; });
  stage.addEventListener("pointerup",function(e){
    if(sx===null) return;
    var dx=e.clientX-sx, dy=e.clientY-sy; sx=null;
    if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)) go(step+(dx<0?1:-1));
  });
  stage.addEventListener("pointercancel",function(){ sx=null; });

  document.addEventListener("keydown",function(e){
    var tag=(e.target.tagName||"").toLowerCase();
    if(tag==="input"||tag==="textarea"||e.target.getAttribute("role")==="tab") return;
    if(!document.getElementById("share").hidden){ if(e.key==="Escape") closeShare(); return; }
    var present=document.documentElement.classList.contains("is-present");
    var inFasi=document.getElementById("fasi").contains(document.activeElement);
    if(e.key==="Escape"&&present){ setPresent(false); return; }
    if(!(present||inFasi)) return;
    if(e.key==="ArrowRight"){ e.preventDefault(); go(step+1); }
    else if(e.key==="ArrowLeft"){ e.preventDefault(); go(step-1); }
  });
};
})();
