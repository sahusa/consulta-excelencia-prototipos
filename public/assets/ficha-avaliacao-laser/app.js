(function(){
var P=window.FICHA_PAGES,STEPS=window.FICHA_STEPS,PH=window.FICHA_PHASES,FT=window.FICHA_FOTOTIPOS,RF=window.FICHA_REGION_FIELDS,DOCS=window.FICHA_DOCS,REG=window.FICHA_REGIONS;
var KEY='cde-ficha-laser-v1';
function sv(p,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
var I={
  back:sv('<path d="M19 12H5M11 18l-6-6 6-6"/>',2.2),
  list:sv('<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5L7.5 11M3.5 18l1.5 1.5L7.5 17"/>'),
  x:sv('<path d="M18 6 6 18M6 6l12 12"/>',2.2),
  check:sv('<path d="M20 6 9 17l-5-5"/>',3),
  chev:sv('<path d="m9 6 6 6-6 6"/>',2.2),
  seed:sv('<path d="M11 20A7 7 0 0 1 4 13c4 0 7 3 7 7Z"/><path d="M13 20a7 7 0 0 1 7-7c0 4-3 7-7 7Z"/><path d="M12 20V9"/>'),
  lotus:sv('<path d="M12 20c-4.5 0-8-2.6-9-6 2.2-.4 4.6.2 6.4 1.6"/><path d="M12 20c4.5 0 8-2.6 9-6-2.2-.4-4.6.2-6.4 1.6"/><path d="M12 20c-2.6-1.8-4-4.6-4-7.6 0-2.6 1.6-5.2 4-7.4 2.4 2.2 4 4.8 4 7.4 0 3-1.4 5.8-4 7.6Z"/>',1.7),
  clock:sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  plus:sv('<path d="M12 5v14M5 12h14"/>',2.4),
  trash:sv('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  cam:sv('<path d="M4 8h3l2-3h6l2 3h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>'),
  info:sv('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',2.2),
  heart:sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>'),
  scan:sv('<path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3"/><circle cx="12" cy="12" r="3.5"/>'),
  clip:sv('<rect x="5" y="3.5" width="14" height="18" rx="2.5"/><path d="M9 3.5V2.5h6v1"/><path d="M9 10h6M9 14h6M9 18h3"/>'),
  pen:sv('<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'),
  doc:sv('<path d="M14 3H6v18h12V7Z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>'),
  eye:sv('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
  cal:sv('<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9h18M8 2.5v4M16 2.5v4M12 12.5v5M9.5 15h5"/>'),
  share:sv('<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/>'),
  user:sv('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>'),
  saved:sv('<path d="M20 6 9 17l-5-5"/>',2.4)
};
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function clone(o){return JSON.parse(JSON.stringify(o));}

/* ---------- state ---------- */
function seed(){
  var s={page:0,visited:0,v:{fototipo:'III',reacao:FT[2].s},regions:clone(window.FICHA_REGION_SEED),signed:{}};
  (function walk(fs){(fs||[]).forEach(function(f){if(f.k&&f.v!==undefined)s.v[f.k]=clone(f.v);if(f.sub)walk(f.sub);});})([].concat.apply([],P.map(function(p){return p.fields||[];})));
  return s;
}
var S;try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){}
if(!S||!S.v)S=seed();
if(S.page>=P.length)S.page=0;
var UI={sheet:null,pick:false,anim:true};
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function page(){return P[S.page];}
function stepOf(p){return p.step||0;}
function firstPageOfStep(n){for(var i=0;i<P.length;i++)if(P[i].step===n)return i;return 0;}
function region(n){if(!S.regions[n])S.regions[n]=clone(window.FICHA_REGION_DEFAULT);return S.regions[n];}
function age(d){if(!d)return '—';var b=new Date(d+'T12:00:00'),t=new Date(),a=t.getFullYear()-b.getFullYear();if(t.getMonth()<b.getMonth()||(t.getMonth()===b.getMonth()&&t.getDate()<b.getDate()))a--;return isNaN(a)?'—':a+' anos';}
function initials(n){return (n||'?').trim().split(/\s+/).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();}
function consentReady(){return DOCS.every(function(d){return !d.req||S.signed[d.id];});}

/* ---------- field renderers ---------- */
var TEXTLIKE={text:1,date:1,age:1,select:1,textarea:1};
function fText(f){
  if(f.t==='age')return '<div class="fld"><span class="fl">'+f.l+'</span><div class="in ro" id="age">'+age(S.v[f.from])+'</div></div>';
  var w=f.w2||f.t==='textarea'?' w2':'',val=S.v[f.k]==null?'':S.v[f.k],inp;
  if(f.t==='textarea')inp='<textarea class="in" data-k="'+f.k+'" rows="3">'+esc(val)+'</textarea>';
  else if(f.t==='select')inp='<select class="in" data-k="'+f.k+'">'+f.o.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select>';
  else inp='<input class="in" type="'+(f.t==='date'?'date':(f.im==='email'?'email':f.im==='tel'?'tel':'text'))+'" data-k="'+f.k+'" value="'+esc(val)+'">';
  return '<label class="fld'+w+'"><span class="fl">'+f.l+'</span>'+inp+'</label>';
}
function fRadio(f){
  var val=S.v[f.k];
  var h=(f.l?'<div class="ql">'+f.l+'</div>':'')+'<div class="opts'+(f.list?' list':'')+(f.two?' two':'')+'" role="radiogroup">'+f.o.map(function(o){return '<button type="button" role="radio" aria-checked="'+(o===val)+'" class="opt'+(o===val?' on':'')+'" data-radio="'+f.k+'" data-val="'+esc(o)+'"><i></i><span>'+o+'</span></button>';}).join('')+'</div>';
  if(f.sub&&val===f.subIf)h+='<div class="reveal">'+inner(f.sub)+'</div>';
  return h;
}
function fChecks(f){
  var arr=S.v[f.k]||[];
  var h=(f.l?'<div class="ql">'+f.l+'</div>':'')+'<div class="opts list'+(f.two?' two':'')+'">'+f.o.map(function(o){var on=arr.indexOf(o)>-1;return '<button type="button" role="checkbox" aria-checked="'+on+'" class="opt sq'+(on?' on':'')+'" data-check="'+f.k+'" data-val="'+esc(o)+'"><i>'+I.check+'</i><span>'+o+'</span></button>';}).join('')+'</div>';
  if(f.sub&&arr.indexOf(f.subIf)>-1)h+='<div class="reveal">'+inner(f.sub)+'</div>';
  return h;
}
function fChips(f){
  var arr=S.v[f.k]||[];
  return '<div class="rchips">'+REG.map(function(o){var on=arr.indexOf(o)>-1;return '<button type="button" aria-pressed="'+on+'" class="rchip'+(on?' on':'')+'" data-check="'+f.k+'" data-val="'+esc(o)+'">'+I.check+o+'</button>';}).join('')+'</div><div class="count-note">'+(arr.length?arr.length+(arr.length>1?' regiões selecionadas':' região selecionada'):'Nenhuma região selecionada')+'</div>';
}
function fMeds(f){
  var arr=S.v[f.k]||[];
  var h=arr.map(function(m,i){
    function fi(mk,l,w){return '<label class="fld'+(w?' w2':'')+'"><span class="fl">'+l+'</span><input class="in" data-med="'+i+'" data-mk="'+mk+'" value="'+esc(m[mk])+'"></label>';}
    return '<div class="med"><div class="med-h"><b>Medicamento '+(i+1)+'</b><button type="button" data-med-del="'+i+'" aria-label="Remover medicamento">'+I.trash+'</button></div><div class="fgrid">'+fi('nome','Nome do medicamento',1).replace('fld w2','fld w2')+fi('dose','Dose')+fi('freq','Frequência')+fi('ind','Indicação',1)+'</div></div>';
  }).join('');
  return h+'<button type="button" class="add" data-med-add="'+f.k+'">'+I.plus+(arr.length?'Adicionar outro medicamento':'Adicionar medicamento')+'</button>';
}
function one(f){return f.t==='radio'?fRadio(f):f.t==='checks'?fChecks(f):f.t==='chips'?fChips(f):f.t==='medlist'?fMeds(f):fText(f);}
function groups(fs){var out=[],buf=[];fs.forEach(function(f){if(TEXTLIKE[f.t])buf.push(fText(f));else{if(buf.length){out.push('<div class="fgrid">'+buf.join('')+'</div>');buf=[];}out.push(one(f));}});if(buf.length)out.push('<div class="fgrid">'+buf.join('')+'</div>');return out;}
function inner(fs){return groups(fs).join('');}
function panel(fs){return '<div class="panel">'+groups(fs).map(function(b){return '<div class="blk">'+b+'</div>';}).join('')+'</div>';}

/* ---------- special pages ---------- */
function pgFototipo(){
  var ft=S.v.fototipo;
  return '<div class="info">'+I.info+'<span>Selecione o fototipo considerando a resposta da pele à exposição solar, e não apenas a cor aparente da pele.</span></div>'+
  '<div class="panel"><div class="blk"><div class="swatches" role="radiogroup" aria-label="Fototipo">'+FT.map(function(x){var on=x.r===ft;return '<button type="button" role="radio" aria-checked="'+on+'" class="sw'+(on?' on':'')+'" data-ft="'+x.r+'"><span style="background:'+x.c+';color:'+(['V','VI','IV'].indexOf(x.r)>-1?'#fff':'#00604C')+'">'+I.check+'</span>'+x.r+'</button>';}).join('')+'</div></div>'+
  '<div class="blk"><div class="fx-row"><span class="fl">Fototipo identificado</span><select class="in" data-k="fototipo">'+FT.map(function(x){return '<option'+(x.r===ft?' selected':'')+'>'+x.r+'</option>';}).join('')+'</select></div></div>'+
  '<div class="blk">'+fRadio({k:'reacao',l:'Como a pele reage ao sol?',list:1,o:FT.map(function(x){return x.s;})})+'</div></div>';
}
function pgRegions(){
  var arr=S.v.regioes||[],rest=REG.filter(function(r){return arr.indexOf(r)<0;});
  var h='<div class="rlist">'+(arr.length?arr.map(function(n){var r=region(n);return '<button type="button" class="rrow" data-region="'+esc(n)+'"><span class="thumb">'+I.cam+'</span><span class="rtx"><span class="nm" style="display:block">'+n+'</span><span class="meta">'+(r.done?'<span class="pill ok"><i></i>Avaliada</span>':'<span class="pill wait"><i></i>Em avaliação</span>')+'<span class="ph">'+(r.fotos?r.fotos+(r.fotos>1?' fotos':' foto'):'Sem fotos')+'</span></span></span><span class="chev">'+I.chev+'</span></button>';}).join(''):'<div class="info">'+I.info+'<span>Nenhuma região selecionada. Adicione as regiões que serão tratadas.</span></div>')+'</div>';
  h+='<button type="button" class="add" data-addregion>'+I.plus+'Adicionar região</button>';
  if(UI.pick)h+='<div class="addpick"><div class="ql">Selecione a região para adicionar</div><div class="rchips">'+rest.map(function(r){return '<button type="button" class="rchip" data-pick="'+esc(r)+'">'+r+'</button>';}).join('')+'</div></div>';
  return h;
}
function pgConsent(){
  var h='<div class="docs">'+DOCS.map(function(d){var s=S.signed[d.id];return '<button type="button" class="drow'+(s?' signed':'')+'" data-doc="'+d.id+'"><span class="ic">'+(s?sv('<path d="M20 6 9 17l-5-5"/>',2.6):I.doc)+'</span><span class="tx"><b>'+d.t+(d.req?'':'<span class="opt-tag">Opcional</span>')+'</b><span class="s">'+(s?'Assinado em '+s:'Ler e assinar')+'</span></span><span class="chev">'+I.chev+'</span></button>';}).join('')+'</div>';
  if(!consentReady())h+='<div class="count-note">Os documentos obrigatórios precisam ser assinados para finalizar.</div>';
  return h;
}

/* ---------- layout pieces ---------- */
function bar(cur){var h='';for(var i=1;i<=11;i++)h+='<i class="'+(i<cur?'d':i===cur?'c':'')+'"></i>';return h;}
function renderSide(){
  var cur=stepOf(page());
  var h='<button class="sd-close" data-close aria-label="Fechar etapas">'+I.x+'</button><div class="sd-brand">'+I.seed+'Clínica do Barboza</div><div class="sd-title">Ficha de avaliação<em>Depilação a Laser</em></div>'+
  '<div class="sd-pat"><span class="av">'+initials(S.v.nome)+'</span><span><b>'+esc(S.v.nome||'Paciente')+'</b><span>'+age(S.v.nasc)+(S.v.cidade?' · '+esc(S.v.cidade.split(' - ')[0]):'')+'</span></span></div>';
  PH.forEach(function(ph,pi){
    h+='<div class="phase"><div class="phase-l">'+ph+'</div>'+STEPS.filter(function(s){return s.ph===pi;}).map(function(s){var c=s.n<cur?'done':s.n===cur?'cur':'';return '<button type="button" class="st '+c+'" data-step="'+s.n+'"'+(c==='cur'?' aria-current="step"':'')+'><span class="n">'+(c==='done'?I.check:s.n)+'</span>'+s.nm+'</button>';}).join('')+'</div>';
  });
  h+='<div class="sd-foot">'+I.clock+'Duração média: 10 a 15 minutos</div>';
  document.getElementById('side').innerHTML=h;
}
function renderIntro(){
  var started=S.visited>0;
  return '<div class="split"><div class="hero"><div class="hero-nav"><button type="button" class="ib" data-toast="O perfil da cliente não faz parte deste protótipo" aria-label="Voltar">'+I.back+'</button><span class="hero-brand">'+I.seed+'Clínica do Barboza</span><span style="width:44px"></span></div>'+
  '<div class="medal medal-in">'+I.lotus+'</div><div class="eb">Ficha de avaliação</div><h1>Depilação <em>a Laser</em></h1><p>Avaliação completa para um tratamento seguro, personalizado e com melhores resultados.</p></div>'+
  '<div class="intro-body"><div class="pat-card"><span class="av">'+initials(S.v.nome)+'</span><span><span class="l">Paciente</span><b>'+esc(S.v.nome)+'</b></span></div>'+
  '<div class="phases">'+[[I.heart,PH[0],'Etapas 1 a 7'],[I.scan,PH[1],'Etapa 8'],[I.clip,PH[2],'Etapas 9 e 10'],[I.pen,PH[3],'Etapa 11']].map(function(r){return '<div class="ph-row"><span class="ph-ic">'+r[0]+'</span><span><b>'+r[1]+'</b><span>'+r[2]+'</span></span></div>';}).join('')+'</div>'+
  '<div class="intro-cta"><button class="btn pri" data-go="start">'+(started?'Continuar avaliação':'Iniciar avaliação')+I.chev+'</button><span class="dur">'+I.clock+'Duração média: 10 a 15 minutos</span></div></div></div>';
}
function renderDone(){
  return '<div class="split"><div class="hero"><div class="hero-nav"><button class="ib" data-go="prev" aria-label="Voltar">'+I.back+'</button><span class="hero-brand">'+I.seed+'Clínica do Barboza</span><span style="width:44px"></span></div>'+
  '<div class="medal medal-in">'+sv('<path d="M20 6 9 17l-5-5"/>',2.6)+'</div><div class="eb">Depilação a Laser</div><h1>Avaliação <em>concluída!</em></h1><p>A avaliação de '+esc(S.v.nome)+' foi registrada com sucesso.</p></div>'+
  '<div class="intro-body"><div class="acts">'+
  '<button class="actrow" data-view><span class="ic">'+I.eye+'</span>Visualizar ficha completa<span class="chev">'+I.chev+'</span></button>'+
  '<button class="actrow pri" data-toast="Agenda de sessões será aberta aqui"><span class="ic">'+I.cal+'</span>Adicionar primeira sessão<span class="chev">'+I.chev+'</span></button>'+
  '<button class="actrow" data-toast="PDF da ficha gerado para compartilhar"><span class="ic">'+I.share+'</span>Compartilhar PDF<span class="chev">'+I.chev+'</span></button>'+
  '<button type="button" class="actrow" data-toast="O perfil da cliente não faz parte deste protótipo"><span class="ic">'+I.user+'</span>Voltar para o perfil da cliente<span class="chev">'+I.chev+'</span></button>'+
  '</div></div></div>';
}
function renderMain(){
  var p=page(),m=document.getElementById('main');
  document.body.classList.toggle('bare',p.type==='intro'||p.type==='done');
  m.setAttribute('data-screen-label',p.title||(p.type==='intro'?'Ficha — Início':'Avaliação concluída'));
  if(p.type==='intro'){m.innerHTML=renderIntro();return;}
  if(p.type==='done'){m.innerHTML=renderDone();return;}
  var st=STEPS[p.step-1];
  var body=p.type==='fototipo'?pgFototipo():p.type==='regions'?pgRegions():p.type==='consent'?pgConsent():panel(p.fields);
  var nextLbl=p.next||'Continuar',dis=p.type==='consent'&&!consentReady();
  m.innerHTML='<header class="top"><div class="top-row"><button class="ib" data-go="prev" aria-label="Voltar">'+I.back+'</button><div class="tt"><div class="k">'+I.seed+'Ficha de avaliação</div><div class="h">Depilação a Laser</div></div><button class="ib" data-steps aria-label="Ver etapas">'+I.list+'</button></div>'+
  '<div class="prog"><div class="prog-t"><span><b>Etapa '+p.step+'</b> de 11</span><span>'+st.nm+'</span></div><div class="bar">'+bar(p.step)+'</div></div></header>'+
  '<section class="pg'+(UI.anim?' anim':'')+'"><div class="eyebrow">Etapa '+p.step+' de 11 · '+st.nm+'</div><div class="bar dk-bar">'+bar(p.step)+'</div><h2>'+p.title+'</h2>'+(p.desc?'<p class="desc">'+p.desc+'</p>':'')+body+'</section>'+
  '<footer class="foot"><button class="btn ghost" data-go="prev">Voltar</button><span class="saved">'+I.saved+'Salvo automaticamente</span><button class="btn pri" data-go="next"'+(dis?' disabled':'')+'>'+nextLbl+'</button></footer>';
  UI.anim=false;
}
function render(){renderSide();renderMain();}

/* ---------- sheet ---------- */
var sheetEl=document.getElementById('sheet');
function openSheet(o){UI.sheet=o;renderSheet();document.body.classList.add('sheet-open');setTimeout(function(){var c=sheetEl.querySelector('.sh-close');c&&c.focus();},50);}
function closeSheet(){document.body.classList.remove('sheet-open');UI.sheet=null;}
function rRadio(k,draft){var f=RF[k];return '<div class="blk"><div class="ql">'+f.l+'</div><div class="opts">'+f.o.map(function(o){return '<button type="button" class="opt'+(draft[k]===o?' on':'')+'" data-rradio="'+k+'" data-val="'+esc(o)+'"><i></i><span>'+o+'</span></button>';}).join('')+'</div></div>';}
function renderSheet(){
  var o=UI.sheet;if(!o)return;var h;
  if(o.type==='region'){
    var d=o.draft;
    h='<div class="sh-grab"></div><div class="sh-head"><div><div class="eyebrow">Avaliação técnica da pele e dos pelos</div><h3>'+esc(o.name)+'</h3></div><button class="ib sh-close" data-close aria-label="Fechar">'+I.x+'</button></div>'+
    '<div class="sh-body"><div class="tabs"><button class="'+(o.tab===0?'on':'')+'" data-shtab="0">Pele e pelos</button><button class="'+(o.tab===1?'on':'')+'" data-shtab="1">Fotos</button></div>';
    if(o.tab===0){
      h+='<div class="sec-t">Características dos pelos</div><div class="panel" style="margin-top:12px"><div class="blk"><label class="fld"><span class="fl">'+RF.cor.l+'</span><select class="in" data-rk="cor">'+RF.cor.o.map(function(x){return '<option'+(x===d.cor?' selected':'')+'>'+x+'</option>';}).join('')+'</select></label></div>'+rRadio('espessura',d)+rRadio('densidade',d)+rRadio('distrib',d)+'</div>'+
      '<div class="sec-t" style="margin-top:22px">Condições da pele</div><div class="panel" style="margin-top:12px">'+rRadio('pele',d)+'</div>';
    }else{
      var ph='';for(var i=0;i<d.fotos;i++)ph+='<div class="photo">'+I.cam+'Foto '+(i+1)+'<button class="x" data-photo-del="'+i+'" aria-label="Remover foto">'+I.x+'</button></div>';
      h+='<div class="sec-t">Fotos da região</div><div class="photos">'+ph+'<button class="photo addp" data-photo-add>'+I.cam+'Adicionar foto</button></div>'+
      '<label class="fld" style="margin-top:20px"><span class="fl">Observações desta região</span><textarea class="in" data-rk="obs" rows="3" placeholder="Ex.: presença de pelos encravados">'+esc(d.obs)+'</textarea></label>';
    }
    h+='</div><div class="sh-foot"><button class="btn ghost" data-close>Cancelar</button><button class="btn pri" data-sh-save>Salvar</button></div>';
  }else{
    var doc=DOCS.filter(function(x){return x.id===o.id;})[0];
    h='<div class="sh-grab"></div><div class="sh-head"><div><div class="eyebrow">Consentimento informado</div><h3>'+doc.t+'</h3></div><button class="ib sh-close" data-close aria-label="Fechar">'+I.x+'</button></div><div class="sh-body">';
    if(o.phase==='read'){
      h+='<div class="doc-card doc">'+doc.body.map(function(s){return '<h4>'+s[0]+'</h4>'+s.slice(1).map(function(p){return '<p>'+p+'</p>';}).join('');}).join('')+'</div>'+
      '<button type="button" class="agree'+(o.agree?' on':'')+'" data-agree><i>'+I.check+'</i><span>Li o termo com a paciente e não há dúvidas pendentes.</span></button></div>'+
      '<div class="sh-foot one"><button class="btn pri" data-sign'+(o.agree?'':' disabled')+'>'+I.pen+'Assinar eletronicamente</button></div>';
    }else{
      h+='<p class="desc" style="margin:0">Peça para <b style="color:#3D2314">'+esc(S.v.nome)+'</b> assinar no espaço abaixo usando o dedo ou a caneta.</p><div class="sigpad" id="sigpad"><canvas></canvas><div class="base"></div><div class="ph">Assinatura da paciente</div></div><button class="linkbtn" data-sig-clear>Limpar assinatura</button></div>'+
      '<div class="sh-foot"><button class="btn ghost" data-sig-back>Voltar ao termo</button><button class="btn pri" data-sig-ok'+(o.ink?'':' disabled')+'>Confirmar assinatura</button></div>';
    }
  }
  sheetEl.innerHTML=h;
  if(o.type==='doc'&&o.phase==='sign')setupPad();
}
function setupPad(){
  var pad=document.getElementById('sigpad'),c=pad.querySelector('canvas'),r=pad.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  c.width=r.width*dpr;c.height=r.height*dpr;var x=c.getContext('2d');x.scale(dpr,dpr);x.lineWidth=2.4;x.lineCap='round';x.lineJoin='round';x.strokeStyle='#3D2314';
  var down=false;
  function pt(e){var b=c.getBoundingClientRect();return [e.clientX-b.left,e.clientY-b.top];}
  c.onpointerdown=function(e){down=true;c.setPointerCapture(e.pointerId);var p=pt(e);x.beginPath();x.moveTo(p[0],p[1]);};
  c.onpointermove=function(e){if(!down)return;var p=pt(e);x.lineTo(p[0],p[1]);x.stroke();if(!UI.sheet.ink){UI.sheet.ink=true;pad.querySelector('.ph').style.opacity=0;sheetEl.querySelector('[data-sig-ok]').disabled=false;}};
  c.onpointerup=c.onpointercancel=function(){down=false;};
}
function stamp(){var d=new Date();function z(n){return (n<10?'0':'')+n;}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()+' às '+z(d.getHours())+'h'+z(d.getMinutes());}

/* ---------- navigation ---------- */
function go(i){S.page=Math.max(0,Math.min(P.length-1,i));S.visited=Math.max(S.visited,S.page);UI.pick=false;UI.anim=true;save();document.body.classList.remove('steps-open');render();window.scrollTo(0,0);}
var toastT;function toast(t){var el=document.getElementById('toast');el.textContent=t;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on');},2200);}

document.addEventListener('click',function(e){
  var t=e.target.closest('button,a,[data-close]');if(!t)return;var ds=t.dataset;
  if(t.id==='scrim'){return;}
  if(ds.go){if(ds.go==='next'){if(page().type==='consent'&&!consentReady())return;go(S.page+1);}else if(ds.go==='prev')go(S.page-1);else if(ds.go==='start')go(Math.max(1,S.visited&&S.visited<P.length-1?S.visited:1));return;}
  if(ds.step){go(firstPageOfStep(+ds.step));return;}
  if(t.hasAttribute('data-steps')){document.body.classList.add('steps-open');return;}
  if(t.hasAttribute('data-close')){document.body.classList.remove('steps-open');closeSheet();return;}
  if(ds.radio){S.v[ds.radio]=ds.val;if(ds.radio==='reacao'){FT.forEach(function(x){if(x.s===ds.val)S.v.fototipo=x.r;});}save();render();return;}
  if(ds.check){var a=S.v[ds.check]||(S.v[ds.check]=[]),ix=a.indexOf(ds.val);ix>-1?a.splice(ix,1):a.push(ds.val);save();render();return;}
  if(ds.ft){S.v.fototipo=ds.ft;FT.forEach(function(x){if(x.r===ds.ft)S.v.reacao=x.s;});save();renderMain();return;}
  if(ds.medAdd){(S.v[ds.medAdd]=S.v[ds.medAdd]||[]).push({nome:'',dose:'',freq:'',ind:''});save();renderMain();var ins=document.querySelectorAll('[data-mk="nome"]');ins[ins.length-1].focus();return;}
  if(ds.medDel){S.v.meds.splice(+ds.medDel,1);save();renderMain();return;}
  if(t.hasAttribute('data-addregion')){UI.pick=!UI.pick;renderMain();return;}
  if(ds.pick){S.v.regioes.push(ds.pick);UI.pick=false;save();render();return;}
  if(ds.region){openSheet({type:'region',name:ds.region,tab:0,draft:clone(region(ds.region))});return;}
  if(ds.doc){openSheet({type:'doc',id:ds.doc,phase:'read',agree:!!S.signed[ds.doc]});return;}
  if(ds.shtab){UI.sheet.tab=+ds.shtab;renderSheet();return;}
  if(ds.rradio){UI.sheet.draft[ds.rradio]=ds.val;renderSheet();return;}
  if(t.hasAttribute('data-photo-add')){UI.sheet.draft.fotos++;renderSheet();return;}
  if(ds.photoDel){UI.sheet.draft.fotos--;renderSheet();return;}
  if(t.hasAttribute('data-sh-save')){var dr=UI.sheet.draft;dr.done=true;S.regions[UI.sheet.name]=dr;save();closeSheet();renderMain();toast('Região salva');return;}
  if(t.hasAttribute('data-agree')){UI.sheet.agree=!UI.sheet.agree;renderSheet();return;}
  if(t.hasAttribute('data-sign')){UI.sheet.phase='sign';UI.sheet.ink=false;renderSheet();return;}
  if(t.hasAttribute('data-sig-back')){UI.sheet.phase='read';renderSheet();return;}
  if(t.hasAttribute('data-sig-clear')){UI.sheet.ink=false;renderSheet();return;}
  if(t.hasAttribute('data-sig-ok')){S.signed[UI.sheet.id]=stamp();save();closeSheet();renderMain();toast('Documento assinado');return;}
  if(t.hasAttribute('data-view')){go(1);return;}
  if(ds.toast){toast(ds.toast);return;}
});
document.getElementById('scrim').addEventListener('click',function(){document.body.classList.remove('steps-open');closeSheet();});
document.addEventListener('input',function(e){
  var t=e.target,ds=t.dataset;
  if(ds.k){S.v[ds.k]=t.value;if(ds.k==='nasc'){var a=document.getElementById('age');if(a)a.textContent=age(t.value);}if(ds.k==='fototipo'){FT.forEach(function(x){if(x.r===t.value)S.v.reacao=x.s;});renderMain();}if(ds.k==='nome'||ds.k==='nasc'||ds.k==='cidade')renderSide();save();}
  else if(ds.med){S.v.meds[+ds.med][ds.mk]=t.value;save();}
  else if(ds.rk&&UI.sheet){UI.sheet.draft[ds.rk]=t.value;}
});
addEventListener('keydown',function(e){if(e.key==='Escape'){document.body.classList.remove('steps-open');closeSheet();}});
matchMedia('(min-width:1024px)').addEventListener('change',function(){document.body.classList.remove('steps-open');});
render();
})();
