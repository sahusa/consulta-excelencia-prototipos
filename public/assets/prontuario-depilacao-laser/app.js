(function(){
var P=window.PR_PAGES,STEPS=window.PR_STEPS,PH=window.PR_PHASES,REG=window.PR_REGIONS;
var KEY='cde-pront-laser-v1',N=STEPS.length;
function sv(p,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
var I={
  back:sv('<path d="M19 12H5M11 18l-6-6 6-6"/>',2.2),list:sv('<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5L7.5 11M3.5 18l1.5 1.5L7.5 17"/>'),
  x:sv('<path d="M18 6 6 18M6 6l12 12"/>',2.2),check:sv('<path d="M20 6 9 17l-5-5"/>',3),chev:sv('<path d="m9 6 6 6-6 6"/>',2.2),
  seed:sv('<path d="M11 20A7 7 0 0 1 4 13c4 0 7 3 7 7Z"/><path d="M13 20a7 7 0 0 1 7-7c0 4-3 7-7 7Z"/><path d="M12 20V9"/>'),
  clock:sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),plus:sv('<path d="M12 5v14M5 12h14"/>',2.4),
  trash:sv('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),cam:sv('<path d="M4 8h3l2-3h6l2 3h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>'),
  cal:sv('<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>'),doc:sv('<path d="M14 3H6v18h12V7Z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>'),
  pen:sv('<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'),saved:sv('<path d="M20 6 9 17l-5-5"/>',2.4),
  layers:sv('<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>'),target:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>'),activity:sv('<path d="M3 12h4l2 7 4-14 2 7h6"/>')
};
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function clone(o){return JSON.parse(JSON.stringify(o));}
function br(d){if(!d)return '—';var p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0];}

/* ---------- state ---------- */
function seed(){
  var s={page:0,v:{},params:clone(window.PR_PARAM_SEED),photos:clone(window.PR_PHOTO_SEED),sig:null,done:false};
  (function walk(fs){(fs||[]).forEach(function(f){if(f.k&&f.v!==undefined)s.v[f.k]=clone(f.v);if(f.items)f.items.forEach(function(it){s.v[it.k]='Não';});if(f.sub)walk(f.sub);});})([].concat.apply([],P.map(function(p){return p.fields||[];})));
  return s;
}
var S;try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){}
if(!S||!S.v)S=seed();
if(S.page>=P.length)S.page=0;
var UI={tab:null,pick:false,anim:true,sign:false,ink:false};
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function page(){return P[S.page];}
function regs(){return S.v.regioes||[];}
function par(r){if(!S.params[r])S.params[r]={fluencia:S.v.fluencia||'',freq:S.v.freq||'',pulso:S.v.pulso||'Não disponível',spot:S.v.spot||'',disparos:'',modo:S.v.modo||'Pontual',obs:''};return S.params[r];}
function curTab(){var r=regs();if(!r.length)return null;if(r.indexOf(UI.tab)<0)UI.tab=r[0];return UI.tab;}
function firstPageOfStep(n){for(var i=0;i<P.length;i++)if(P[i].step===n)return i;return 0;}

/* ---------- fields ---------- */
var TEXTLIKE={text:1,date:1,select:1,textarea:1};
function fText(f,src,attr){
  src=src||S.v;attr=attr||'data-k';
  var w=f.w2||f.t==='textarea'?' w2':'',val=src[f.k]==null?'':src[f.k],inp,ph=f.ph?' placeholder="'+esc(f.ph)+'"':'';
  if(f.t==='textarea')inp='<textarea class="in" '+attr+'="'+f.k+'" rows="3"'+ph+'>'+esc(val)+'</textarea>';
  else if(f.t==='select')inp='<select class="in" '+attr+'="'+f.k+'">'+f.o.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select>';
  else inp='<input class="in" type="'+(f.t==='date'?'date':'text')+'"'+(f.im?' inputmode="'+f.im+'"':'')+' '+attr+'="'+f.k+'" value="'+esc(val)+'"'+ph+'>';
  return '<label class="fld'+w+'"><span class="fl">'+f.l+'</span>'+inp+'</label>';
}
function opts(k,o,val,attr){attr=attr||'data-radio';return o.map(function(x){return '<button type="button" role="radio" aria-checked="'+(x===val)+'" class="opt'+(x===val?' on':'')+'" '+attr+'="'+k+'" data-val="'+esc(x)+'"><i></i><span>'+x+'</span></button>';}).join('');}
function fRadio(f){var val=S.v[f.k],h='<div class="ql">'+f.l+'</div><div class="opts" role="radiogroup">'+opts(f.k,f.o,val)+'</div>';if(f.sub&&val===f.subIf)h+='<div class="reveal">'+inner(f.sub)+'</div>';return h;}
function fChecks(f){var arr=S.v[f.k]||[];var h=(f.l?'<div class="ql">'+f.l+'</div>':'')+'<div class="opts list'+(f.two?' two':'')+'">'+f.o.map(function(o){var on=arr.indexOf(o)>-1;return '<button type="button" role="checkbox" aria-checked="'+on+'" class="opt sq'+(on?' on':'')+'" data-check="'+f.k+'" data-val="'+esc(o)+'"><i>'+I.check+'</i><span>'+o+'</span></button>';}).join('')+'</div>';if(f.sub&&arr.indexOf(f.subIf)>-1)h+='<div class="reveal">'+inner(f.sub)+'</div>';return h;}
function fYN(f){return f.items.map(function(it){var v=S.v[it.k];return '<div class="ynrow"><div class="ql">'+it.l+'</div><div class="opts" role="radiogroup">'+opts(it.k,['Sim','Não'],v)+'</div>'+(v==='Sim'?'<div class="reveal"><label class="fld"><span class="fl">Descreva</span><input class="in" data-k="'+it.k+'_d" value="'+esc(S.v[it.k+'_d'])+'" placeholder="O que mudou?"></label></div>':'')+'</div>';}).join('');}
function fNote(f){return '<div class="note"><span class="l">'+f.l+'</span><span class="v">'+f.v+'</span></div>';}
function one(f){return f.t==='radio'?fRadio(f):f.t==='checks'?fChecks(f):f.t==='yngroup'?fYN(f):f.t==='note'?fNote(f):fText(f);}
function groups(fs){var out=[],buf=[];fs.forEach(function(f){if(TEXTLIKE[f.t])buf.push(fText(f));else{if(buf.length){out.push('<div class="fgrid">'+buf.join('')+'</div>');buf=[];}out.push(one(f));}});if(buf.length)out.push('<div class="fgrid">'+buf.join('')+'</div>');return out;}
function inner(fs){return groups(fs).join('');}
function panel(fs,extra){return '<div class="panel">'+groups(fs).concat(extra||[]).map(function(b){return '<div class="blk">'+b+'</div>';}).join('')+'</div>';}

/* ---------- special pages ---------- */
function tabs(countFn){var t=curTab();return '<div class="rtabs" role="tablist">'+regs().map(function(r){return '<button type="button" role="tab" aria-selected="'+(r===t)+'" class="rtab'+(r===t?' on':'')+'" data-tab="'+esc(r)+'">'+r+(countFn?'<span class="c">'+countFn(r)+'</span>':'')+'</button>';}).join('')+'</div>';}
function picker(){var rest=REG.filter(function(r){return regs().indexOf(r)<0;});var h='<button type="button" class="add" data-addregion>'+I.plus+'Adicionar outra região</button>';if(UI.pick)h+='<div class="addpick"><div class="ql">Selecione a região</div><div class="rchips">'+(rest.length?rest.map(function(r){return '<button type="button" class="rchip" data-pick="'+esc(r)+'">'+r+'</button>';}).join(''):'<span class="count-note" style="margin:0">Todas as regiões já estão na sessão.</span>')+'</div></div>';return h;}
function pgParams(){
  var t=curTab();if(!t)return '<div class="info">Nenhuma região selecionada na etapa 1.</div>'+picker();
  var p=par(t);
  function f(k,l,im){return '<label class="fld"><span class="fl">'+l+'</span><input class="in" inputmode="'+(im||'decimal')+'" data-pk="'+k+'" value="'+esc(p[k])+'"></label>';}
  return tabs()+'<div class="panel"><div class="blk"><div class="rc-head"><h3>'+esc(t)+'</h3><button type="button" data-rmregion="'+esc(t)+'" aria-label="Remover região da sessão">'+I.trash+'</button></div></div>'+
  '<div class="blk"><div class="fgrid">'+f('fluencia','Fluência (J/cm²)')+f('freq','Frequência (Hz)')+
  '<label class="fld"><span class="fl">Duração do pulso (ms)</span><select class="in" data-pk="pulso">'+['Não disponível','3','10','20','30'].map(function(o){return '<option'+(o===p.pulso?' selected':'')+'>'+o+'</option>';}).join('')+'</select></label>'+
  f('spot','Spot (mm)')+f('disparos','Nº de disparos','numeric')+
  '<label class="fld"><span class="fl">Modo de aplicação</span><select class="in" data-pk="modo">'+['Pontual','Varredura','Outro'].map(function(o){return '<option'+(o===p.modo?' selected':'')+'>'+o+'</option>';}).join('')+'</select></label>'+
  '<label class="fld w2"><span class="fl">Observações da região</span><textarea class="in" data-pk="obs" rows="3" placeholder="Resposta observada nesta região">'+esc(p.obs)+'</textarea></label></div></div></div>'+picker();
}
function pgPhotos(){
  var t=curTab();if(!t)return '<div class="info">Nenhuma região selecionada na etapa 1.</div>';
  var n=S.photos[t]||0,h='';for(var i=0;i<n;i++)h+='<div class="photo">'+I.cam+'Foto '+(i+1)+'<button class="x" data-photo-del="'+i+'" aria-label="Remover foto">'+I.x+'</button></div>';
  return tabs(function(r){return S.photos[r]||0;})+'<div class="panel"><div class="blk"><div class="photos" style="margin-top:0">'+h+'<button class="photo addp" data-photo-add>'+I.cam+'Adicionar fotos</button></div></div>'+
  '<div class="blk">'+fText({k:'obsFotos',t:'textarea',l:'Observações das fotos (opcional)',ph:'Ex.: registro pré e pós imediato.'})+'</div></div>';
}
function sigBlock(){
  if(S.sig)return '<div class="ql">Assinatura do profissional</div><div class="sigwrap" style="margin-top:12px"><div class="sigdone"><img src="'+S.sig.img+'" alt="Assinatura"><b>'+esc(S.v.prof)+'</b><span>'+S.sig.at+'</span></div><button type="button" class="linkbtn" data-sig-redo>Assinar novamente</button></div>';
  if(!UI.sign)return '<div class="ql">Assinatura do profissional</div><div class="qh">A assinatura confirma o registro desta sessão no prontuário.</div><button type="button" class="add" data-sig-start>'+I.pen+'Assinar</button>';
  return '<div class="ql">Assinatura do profissional</div><div class="sigpad" id="sigpad"><canvas></canvas><div class="base"></div><div class="ph">'+esc(S.v.prof)+'</div></div><div class="sig-acts" style="margin-top:10px"><button type="button" class="btn ghost" data-sig-clear>Limpar</button><button type="button" class="btn pri" data-sig-ok disabled>Confirmar assinatura</button></div>';
}
function pgFinal(){return panel(page().fields,[sigBlock()]);}
function pList(){return regs().map(function(r){var p=par(r);return '<li><b>'+esc(r)+':</b> '+[p.fluencia&&p.fluencia+' J/cm²',p.freq&&p.freq+' Hz',p.pulso&&p.pulso!=='Não disponível'&&p.pulso+' ms',p.spot&&'Spot '+p.spot+' mm',p.disparos&&p.disparos+' disparos',p.modo].filter(Boolean).join(' · ')+'</li>';}).join('');}
function pgSummary(){
  var v=S.v,cu=(v.cuid||[]).map(function(c){return c==='Fotobiomodulação (FBM)'?'FBM ('+v.fbm+')':c;}).join(', ');
  return '<div class="sum-top"><span class="ic">'+I.cal+'</span><span class="tx"><span class="d" style="display:block">'+br(v.data)+'</span><span class="s" style="display:block">'+esc(v.numero)+' · Depilação a Laser</span></span><span class="rt"><span class="badge-ok"><i></i>Sessão concluída</span><span>'+esc(v.prof)+'</span></span></div>'+
  '<div class="sum-grid">'+
  '<div class="sum-sec"><h4>Regiões tratadas</h4><div class="tags">'+regs().map(function(r){return '<span class="tag">'+esc(r)+'</span>';}).join('')+'</div></div>'+
  '<div class="sum-sec"><h4>Equipamento</h4><p>'+esc(v.eq)+' · '+esc(v.onda)+'</p><p class="mut">Modo '+esc(v.modo).toLowerCase()+' · Resfriamento '+esc(v.resfr).toLowerCase()+'</p></div>'+
  '<div class="sum-sec full"><h4>Parâmetros por região</h4><ul>'+pList()+'</ul></div>'+
  '<div class="sum-sec"><h4>Resposta cutânea</h4><p>'+esc((v.resp||[]).join(', ')||'Sem reações')+' · intensidade '+esc(v.intens).toLowerCase()+'</p></div>'+
  '<div class="sum-sec"><h4>Cuidados realizados</h4><p>'+esc(cu||'Nenhum')+'</p></div>'+
  '<div class="sum-sec"><h4>Intercorrências</h4><p>'+(v.houve==='Sim'?esc(v.houve_desc||'Sim'):'Nenhuma intercorrência')+'</p></div>'+
  '<div class="sum-sec"><h4>Próximo retorno</h4><p>'+br(v.retorno)+'</p><p class="mut">'+esc(v.condProx)+'</p></div>'+
  '</div>';
}
function pgHistory(){
  var v=S.v,n=parseInt(v.numero)||1;
  return '<div class="hist-grid"><div><div class="tl">'+
  '<button type="button" class="tl-item" data-goto="resumo"><span class="dot">'+I.check+'</span><span class="tx"><span class="nm" style="display:block">'+esc(v.numero)+'</span><span class="dt" style="display:block">'+br(v.data)+' · '+esc(v.prof)+'</span><span class="tags">'+regs().map(function(r){return '<span class="tag">'+esc(r)+'</span>';}).join('')+'</span></span><span class="chev">'+I.chev+'</span></button>'+
  '<div class="tl-item sched"><span class="dot"></span><span class="tx"><span class="nm" style="display:block">'+(n+1)+'ª sessão · agendada</span><span class="dt" style="display:block">'+br(v.retorno)+'</span><span class="tags">'+regs().map(function(r){return '<span class="tag mut">'+esc(r)+'</span>';}).join('')+'</span></span></div>'+
  '</div><button type="button" class="add" data-newsession>'+I.plus+'Registrar nova sessão</button></div>'+
  '<aside class="evo"><h3>Evolução do tratamento</h3>'+
  '<div class="evo-row"><span>'+I.layers+'Sessões realizadas</span><b>'+n+'</b></div>'+
  '<div class="evo-row"><span>'+I.target+'Regiões em tratamento</span><b>'+regs().length+'</b></div>'+
  '<div class="evo-row"><span>'+I.cal+'Próxima sessão</span><b>'+br(v.retorno)+'</b></div>'+
  '<div class="evo-row"><span>'+I.activity+'Status</span><span class="stv"><i></i>Em andamento</span></div>'+
  '<a class="linkbtn" href="/ficha-avaliacao-laser" style="margin-top:8px">Ver ficha de avaliação</a></aside></div>';
}

/* ---------- layout ---------- */
function bar(cur){var h='';for(var i=1;i<=N;i++)h+='<i class="'+(i<cur?'d':i===cur?'c':'')+'"></i>';return h;}
function renderSide(){
  var cur=page().step||99;
  var h='<button class="sd-close" data-close aria-label="Fechar etapas">'+I.x+'</button><div class="sd-brand">'+I.seed+'Clínica do Barboza</div><div class="sd-title">Registro da sessão<em>Depilação a Laser</em></div>'+
  '<div class="sd-pat"><span class="av">CT</span><span><b>Cliente teste</b><span>'+esc(S.v.numero)+' · '+br(S.v.data)+'</span></span></div>';
  PH.forEach(function(ph,pi){h+='<div class="phase"><div class="phase-l">'+ph+'</div>'+STEPS.filter(function(s){return s.ph===pi;}).map(function(s){var c=s.n<cur?'done':s.n===cur?'cur':'';return '<button type="button" class="st '+c+'" data-step="'+s.n+'"'+(c==='cur'?' aria-current="step"':'')+'><span class="n">'+(c==='done'?I.check:s.n)+'</span>'+s.nm+'</button>';}).join('')+'</div>';});
  h+='<div class="sd-foot"><a class="linkbtn" href="/ficha-avaliacao-laser" style="margin:0">'+I.doc.replace('<svg','<svg style="width:15px;height:15px;margin-right:7px"')+'Ver ficha de avaliação</a></div>';
  document.getElementById('side').innerHTML=h;
}
function renderMain(){
  var p=page(),m=document.getElementById('main'),bare=p.type==='summary'||p.type==='history';
  document.body.classList.toggle('bare',bare);
  m.setAttribute('data-screen-label',p.title);
  if(bare){
    var foot=p.type==='summary'?'<footer class="foot"><button class="btn ghost" data-step="1">Editar sessão</button><span class="saved">'+I.saved+'Registrada no prontuário</span><button class="btn pri" data-go="next">Finalizar</button></footer>':'';
    m.innerHTML='<header class="bhead"><button class="ib" data-go="prev" aria-label="Voltar">'+I.back+'</button><div class="tt"><div class="k">'+I.seed+'Cliente teste · Depilação a Laser</div><div class="h">'+p.title+'</div></div><span></span></header>'+
    '<section class="pg wide'+(UI.anim?' anim':'')+'">'+(p.type==='summary'?pgSummary():pgHistory())+'</section>'+foot;
    UI.anim=false;return;
  }
  var st=STEPS[p.step-1],body=p.type==='params'?pgParams():p.type==='photos'?pgPhotos():p.type==='final'?pgFinal():panel(p.fields);
  var dis=p.type==='final'&&!S.sig;
  m.innerHTML='<header class="top"><div class="top-row"><button class="ib" data-go="prev" aria-label="Voltar">'+I.back+'</button><div class="tt"><div class="k">'+I.seed+'Registro da sessão · '+esc(S.v.numero)+'</div><div class="h">Depilação a Laser</div></div><button class="ib" data-steps aria-label="Ver etapas">'+I.list+'</button></div>'+
  '<div class="prog"><div class="prog-t"><span><b>Etapa '+p.step+'</b> de '+N+'</span><span>'+st.nm+'</span></div><div class="bar b10">'+bar(p.step)+'</div></div></header>'+
  '<section class="pg'+(UI.anim?' anim':'')+'"><div class="eyebrow">Etapa '+p.step+' de '+N+' · '+st.nm+'</div><div class="bar b10 dk-bar">'+bar(p.step)+'</div><h2>'+p.title+'</h2>'+(p.desc?'<p class="desc">'+p.desc+'</p>':'')+body+(dis?'<div class="count-note">Assine para concluir a sessão.</div>':'')+'</section>'+
  '<footer class="foot"><button class="btn ghost" data-go="prev">'+(S.page===0?'Cancelar':'Voltar')+'</button><span class="saved">'+I.saved+'Salvo automaticamente</span><button class="btn pri" data-go="next"'+(dis?' disabled':'')+'>'+(p.next||'Continuar')+'</button></footer>';
  UI.anim=false;
  if(UI.sign&&!S.sig)setupPad();
}
function render(){renderSide();renderMain();}

function setupPad(){
  var pad=document.getElementById('sigpad');if(!pad)return;var c=pad.querySelector('canvas'),r=pad.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  c.width=r.width*dpr;c.height=r.height*dpr;var x=c.getContext('2d');x.scale(dpr,dpr);x.lineWidth=2.4;x.lineCap='round';x.lineJoin='round';x.strokeStyle='#00604C';
  var down=false;function pt(e){var b=c.getBoundingClientRect();return [e.clientX-b.left,e.clientY-b.top];}
  c.onpointerdown=function(e){down=true;c.setPointerCapture(e.pointerId);var p=pt(e);x.beginPath();x.moveTo(p[0],p[1]);};
  c.onpointermove=function(e){if(!down)return;var p=pt(e);x.lineTo(p[0],p[1]);x.stroke();if(!UI.ink){UI.ink=true;pad.querySelector('.ph').style.opacity=0;document.querySelector('[data-sig-ok]').disabled=false;}};
  c.onpointerup=c.onpointercancel=function(){down=false;};
}
function stamp(){var d=new Date();function z(n){return (n<10?'0':'')+n;}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()+' · '+z(d.getHours())+':'+z(d.getMinutes());}

function go(i){
  if(i<0||i>=P.length){toast('O perfil da cliente não faz parte deste protótipo');return;}
  S.page=i;UI.pick=false;UI.anim=true;save();document.body.classList.remove('steps-open');render();window.scrollTo(0,0);
}
var toastT;function toast(t){var el=document.getElementById('toast');el.textContent=t;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on');},2200);}

document.addEventListener('click',function(e){
  var t=e.target.closest('button,[data-close]');if(!t)return;var ds=t.dataset;
  if(ds.go){if(ds.go==='next'){if(page().type==='final'&&!S.sig)return;if(page().type==='summary'){toast('Sessão finalizada');}go(S.page+1);}else go(S.page-1);return;}
  if(ds.step){go(firstPageOfStep(+ds.step));return;}
  if(ds.goto){P.forEach(function(p,i){if(p.id===ds.goto)go(i);});return;}
  if(t.hasAttribute('data-steps')){document.body.classList.add('steps-open');return;}
  if(t.hasAttribute('data-close')){document.body.classList.remove('steps-open');return;}
  if(ds.radio){S.v[ds.radio]=ds.val;save();renderMain();return;}
  if(ds.check){var a=S.v[ds.check]||(S.v[ds.check]=[]),ix=a.indexOf(ds.val);ix>-1?a.splice(ix,1):a.push(ds.val);save();render();return;}
  if(ds.tab){UI.tab=ds.tab;renderMain();return;}
  if(t.hasAttribute('data-addregion')){UI.pick=!UI.pick;renderMain();return;}
  if(ds.pick){S.v.regioes.push(ds.pick);UI.tab=ds.pick;UI.pick=false;save();render();return;}
  if(ds.rmregion){S.v.regioes=regs().filter(function(r){return r!==ds.rmregion;});UI.tab=null;save();render();toast('Região removida da sessão');return;}
  if(t.hasAttribute('data-photo-add')){var tb=curTab();S.photos[tb]=(S.photos[tb]||0)+1;save();renderMain();return;}
  if(ds.photoDel){var tb2=curTab();S.photos[tb2]=Math.max(0,(S.photos[tb2]||0)-1);save();renderMain();return;}
  if(t.hasAttribute('data-sig-start')){UI.sign=true;UI.ink=false;renderMain();return;}
  if(t.hasAttribute('data-sig-clear')){UI.ink=false;renderMain();return;}
  if(t.hasAttribute('data-sig-ok')){S.sig={img:document.querySelector('#sigpad canvas').toDataURL('image/png'),at:stamp()};UI.sign=false;save();renderMain();toast('Sessão assinada');return;}
  if(t.hasAttribute('data-sig-redo')){S.sig=null;UI.sign=true;UI.ink=false;save();renderMain();return;}
  if(t.hasAttribute('data-newsession')){toast('Abrirá o registro da próxima sessão');return;}
});
document.getElementById('scrim').addEventListener('click',function(){document.body.classList.remove('steps-open');});
document.addEventListener('input',function(e){
  var t=e.target,ds=t.dataset;
  if(ds.k){S.v[ds.k]=t.value;if(ds.k==='data'||ds.k==='numero')renderSide();save();}
  else if(ds.pk){par(curTab())[ds.pk]=t.value;save();}
});
addEventListener('keydown',function(e){if(e.key==='Escape')document.body.classList.remove('steps-open');});
matchMedia('(min-width:1024px)').addEventListener('change',function(){document.body.classList.remove('steps-open');});
render();
})();
