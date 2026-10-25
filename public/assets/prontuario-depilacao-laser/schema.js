/* Prontuário — Registro de sessão de Depilação a Laser */
window.PR_STEPS=[
  {n:1,nm:'Dados da sessão',ph:0},{n:2,nm:'Reavaliação',ph:0},{n:3,nm:'Avaliação da evolução',ph:0},
  {n:4,nm:'Parâmetros do equipamento',ph:1},{n:5,nm:'Parâmetros por região',ph:1},{n:6,nm:'Resposta cutânea',ph:1},
  {n:7,nm:'Cuidados complementares',ph:2},{n:8,nm:'Fotografias',ph:2},{n:9,nm:'Intercorrências',ph:2},
  {n:10,nm:'Finalização',ph:3}
];
window.PR_PHASES=['Antes da aplicação','Aplicação','Após a aplicação','Finalização'];
window.PR_REGIONS=['Axilas','Virilha completa','Perianal','Pernas','Rosto completo','Buço','Outra'];
var PR_SN=['Sim','Não'],PR_NS=['Não','Sim'];
window.PR_PAGES=[
  {id:'dados',step:1,title:'Dados da sessão',fields:[
    {k:'data',t:'date',l:'Data da sessão',v:'2026-10-24'},
    {k:'numero',t:'select',l:'Número da sessão',o:['1ª sessão','2ª sessão','3ª sessão','4ª sessão','5ª sessão','6ª sessão','7ª sessão','8ª sessão'],v:'1ª sessão'},
    {k:'prof',t:'text',l:'Profissional responsável',v:'Vinicius Barboza',w2:1},
    {k:'regioes',t:'checks',two:1,l:'Regiões que serão tratadas nesta sessão',o:window.PR_REGIONS,v:['Axilas','Virilha completa','Perianal']},
    {t:'note',l:'Intervalo desde a última sessão',v:'Primeira sessão'}
  ]},
  {id:'reav',step:2,title:'Reavaliação antes da sessão',desc:'Houve alguma alteração desde a última sessão?',fields:[
    {t:'yngroup',items:[
      {k:'r_saude',l:'Alteração no estado de saúde?'},{k:'r_meds',l:'Novos medicamentos?'},{k:'r_grav',l:'Gravidez ou suspeita?'},
      {k:'r_sol',l:'Exposição solar ou bronzeamento?'},{k:'r_proc',l:'Procedimentos recentes na região?'},
      {k:'r_inter',l:'Intercorrências após a última sessão?'},{k:'r_pele',l:'A pele apresenta alguma alteração?'}
    ]},
    {k:'r_obs',t:'textarea',l:'Observações',ph:'Descreva se houver alguma informação relevante.',v:''}
  ]},
  {id:'evol',step:3,title:'Avaliação da evolução',desc:'Como está a resposta da pele e dos pelos desde a última sessão?',fields:[
    {k:'e_reducao',t:'radio',l:'Redução dos pelos',o:['Sem alteração','Leve','Moderada','Significativa'],v:'Moderada'},
    {k:'e_espessura',t:'radio',l:'Espessura dos pelos',o:['Sem alteração','Mais finos','Sem pelos'],v:'Mais finos'},
    {k:'e_densidade',t:'radio',l:'Densidade',o:['Sem alteração','Menor','Sem pelos'],v:'Menor'},
    {k:'e_distrib',t:'radio',l:'Distribuição',o:['Uniforme','Irregular','Localizada'],v:'Irregular'},
    {k:'e_obs',t:'textarea',l:'Observações da evolução',v:'Paciente relata redução significativa e pelos mais finos.'}
  ]},
  {id:'equip',step:4,title:'Parâmetros do equipamento',desc:'Parâmetros gerais. Ajustes por região ficam na próxima etapa.',fields:[
    {k:'eq',t:'select',l:'Equipamento',o:['Hakon 4D','Outro equipamento'],v:'Hakon 4D'},
    {k:'onda',t:'select',l:'Comprimento de onda',o:['Alexandrita + Nd:YAG','Alexandrita (755 nm)','Diodo (808 nm)','Nd:YAG (1064 nm)'],v:'Alexandrita + Nd:YAG'},
    {k:'modo',t:'radio',l:'Modo de aplicação',o:['Pontual','Varredura','Outro'],v:'Pontual'},
    {k:'fluencia',t:'text',l:'Fluência (J/cm²)',v:'30',im:'decimal'},
    {k:'freq',t:'text',l:'Frequência (Hz)',v:'1',im:'decimal'},
    {k:'pulso',t:'select',l:'Duração do pulso (ms)',o:['Não disponível','3','10','20','30'],v:'Não disponível'},
    {k:'spot',t:'text',l:'Tamanho do spot (mm)',v:'12',im:'decimal'},
    {k:'resfr',t:'select',l:'Sistema de resfriamento',o:['Integrado (Contato)','Ar frio','Criogênico','Sem resfriamento'],v:'Integrado (Contato)'},
    {k:'disparos',t:'text',l:'Número de disparos (opcional)',v:'500',im:'numeric'},
    {k:'eq_obs',t:'textarea',l:'Observações',v:'Parâmetros ajustados conforme resposta da pele.'}
  ]},
  {id:'porreg',step:5,title:'Parâmetros por região',desc:'Configure os parâmetros utilizados em cada região tratada.',type:'params'},
  {id:'resp',step:6,title:'Resposta cutânea imediata',desc:'Selecione as reações observadas após a aplicação.',fields:[
    {k:'resp',t:'checks',two:1,o:['Edema perifolicular','Eritema','Sensação dolorosa','Ausência de resposta visível','Reação atípica','Outra'],v:['Edema perifolicular','Eritema']},
    {k:'intens',t:'radio',l:'Intensidade da resposta',o:['Leve','Moderada','Intensa'],v:'Leve'},
    {k:'regOc',t:'text',l:'Região de ocorrência',v:'Axilas e virilha completa.',w2:1},
    {k:'resp_obs',t:'textarea',l:'Observações',v:'Edema perifolicular discreto e eritema leve, dentro do esperado.'}
  ]},
  {id:'cuid',step:7,title:'Cuidados complementares',desc:'Registre os cuidados realizados após a sessão.',fields:[
    {k:'cuid',t:'checks',two:1,o:['Fotobiomodulação (FBM)','Resfriamento da pele','Produtos tópicos','Outra medida'],v:['Fotobiomodulação (FBM)','Resfriamento da pele','Produtos tópicos'],subIf:'Fotobiomodulação (FBM)',sub:[
      {k:'fbm',t:'select',l:'Equipamento de FBM',o:['Fluence (HTM)','Outro equipamento'],v:'Fluence (HTM)'},
      {k:'protocolo',t:'textarea',l:'Protocolo utilizado',v:'Pós-laser para recuperação e prevenção de intercorrências.'}
    ]},
    {k:'orientPos',t:'textarea',l:'Orientações pós-procedimento',v:'Manter a pele hidratada, evitar exposição solar, usar protetor solar e evitar atrito na região.'}
  ]},
  {id:'fotos',step:8,title:'Fotografias da sessão',desc:'Adicione fotos de cada região tratada.',type:'photos'},
  {id:'inter',step:9,title:'Intercorrências',fields:[
    {k:'houve',t:'radio',l:'Houve alguma intercorrência?',o:PR_NS,v:'Não',subIf:'Sim',sub:[{k:'houve_desc',t:'textarea',l:'Descreva a intercorrência',v:''}]},
    {k:'conduta',t:'textarea',l:'Conduta adotada',ph:'Descreva a conduta, se houver.',v:''},
    {k:'acomp',t:'radio',l:'Necessidade de acompanhamento?',o:PR_NS,v:'Não'},
    {k:'encam',t:'radio',l:'Encaminhamento realizado?',o:PR_NS,v:'Não'}
  ]},
  {id:'final',step:10,title:'Finalização da sessão',next:'Concluir sessão',type:'final',fields:[
    {k:'obsGerais',t:'textarea',l:'Observações gerais',v:'Sessão realizada sem intercorrências. Boa resposta clínica.'},
    {k:'condProx',t:'textarea',l:'Conduta para próxima sessão',v:'Manter parâmetros semelhantes e reavaliar resposta.'},
    {k:'retorno',t:'date',l:'Data sugerida para retorno',v:'2026-11-14'}
  ]},
  {id:'resumo',type:'summary',title:'Resumo da sessão'},
  {id:'hist',type:'history',title:'Histórico de sessões'}
];
window.PR_PARAM_SEED={
  'Axilas':{fluencia:'28',freq:'1',pulso:'Não disponível',spot:'12',disparos:'200',modo:'Pontual',obs:'Boa resposta, edema perifolicular presente.'},
  'Virilha completa':{fluencia:'30',freq:'1',pulso:'Não disponível',spot:'12',disparos:'500',modo:'Pontual',obs:''},
  'Perianal':{fluencia:'30',freq:'1',pulso:'Não disponível',spot:'12',disparos:'300',modo:'Pontual',obs:''}
};
window.PR_PHOTO_SEED={'Axilas':2,'Virilha completa':1,'Perianal':0};
