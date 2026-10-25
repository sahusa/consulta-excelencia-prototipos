/* Ficha de Avaliação — Depilação a Laser: etapas e páginas na ordem do fluxo */
window.FICHA_STEPS=[
  {n:1,nm:'Identificação',ph:0},
  {n:2,nm:'Saúde e histórico',ph:0},
  {n:3,nm:'Medicamentos e produtos',ph:0},
  {n:4,nm:'Histórico hormonal',ph:0},
  {n:5,nm:'Histórico de depilação',ph:0},
  {n:6,nm:'Exposição solar e hábitos',ph:0},
  {n:7,nm:'Histórico dermatológico',ph:0},
  {n:8,nm:'Avaliação da pele e dos pelos',ph:1},
  {n:9,nm:'Segurança e indicação',ph:2},
  {n:10,nm:'Planejamento terapêutico',ph:2},
  {n:11,nm:'Consentimento informado',ph:3}
];
window.FICHA_PHASES=['Anamnese e histórico de saúde','Avaliação da pele e dos pelos','Planejamento do tratamento','Consentimento informado'];

var SNS=['Sim','Não','Não sei'],SN=['Sim','Não'];
window.FICHA_REGIONS=['Axilas','Virilha completa','Perianal','Meia perna','Perna completa','Coxas','Braços','Rosto completo','Buço','Queixo','Glabela','Orelhas','Abdômen','Linha alba','Costas','Peito','Nádegas','Outra'];

window.FICHA_PAGES=[
  {id:'intro',type:'intro'},
  {id:'dados',step:1,title:'Dados da paciente',fields:[
    {k:'nome',t:'text',l:'Nome completo',v:'Cliente teste',w2:1},
    {k:'nasc',t:'date',l:'Data de nascimento',v:'1989-07-05'},
    {t:'age',l:'Idade',from:'nasc'},
    {k:'tel',t:'text',l:'Telefone / WhatsApp',v:'+55 94 99160-1818',im:'tel'},
    {k:'email',t:'text',l:'E-mail',v:'cliente@exemplo.com',im:'email'},
    {k:'prof',t:'text',l:'Profissão',v:'Enfermeira'},
    {k:'cidade',t:'text',l:'Cidade',v:'Conceição do Araguaia - PA'}
  ]},
  {id:'regioes',step:1,title:'Regiões que deseja tratar',desc:'Selecione uma ou mais regiões.',fields:[
    {k:'regioes',t:'chips',v:['Axilas','Virilha completa','Perianal']},
    {k:'motivo',t:'textarea',l:'Principal motivo para procurar o laser',v:'Reduzir os pelos e melhorar a praticidade do dia a dia.',w2:1},
    {k:'expect',t:'textarea',l:'Expectativas em relação ao tratamento',v:'Redução significativa e duradoura dos pelos.',w2:1}
  ]},
  {id:'saude',step:2,title:'Histórico de saúde',fields:[
    {k:'gravida',t:'radio',l:'Está grávida ou existe suspeita de gestação?',o:SNS,v:'Não'},
    {k:'amamenta',t:'radio',l:'Está amamentando?',o:SNS,v:'Não'},
    {k:'doenca',t:'radio',l:'Possui alguma doença diagnosticada?',o:SNS,v:'Sim',subIf:'Sim',sub:[{k:'doenca_qual',t:'text',l:'Qual?',v:'Hipotireoidismo (controlado).',w2:1}]},
    {k:'diabetes',t:'radio',l:'Possui diabetes?',o:SNS,v:'Não'},
    {k:'autoimune',t:'radio',l:'Possui doença autoimune?',o:SNS,v:'Não'}
  ]},
  {id:'saude2',step:2,title:'Outras informações de saúde',fields:[
    {k:'alergia',t:'radio',l:'Possui alergias conhecidas?',o:SNS,v:'Sim',subIf:'Sim',sub:[{k:'alergia_qual',t:'text',l:'Quais?',v:'Rinite alérgica.',w2:1}]},
    {k:'cicatriz',t:'radio',l:'Apresenta dificuldade de cicatrização?',o:SNS,v:'Não'},
    {k:'queloide',t:'radio',l:'Possui histórico de queloides ou cicatrizes hipertróficas?',o:SNS,v:'Não'},
    {k:'reacao',t:'radio',l:'Já apresentou reação importante após procedimentos estéticos?',o:SNS,v:'Não'},
    {k:'cirurgia',t:'radio',l:'Realizou cirurgia ou procedimento recente na região que deseja tratar?',o:SNS,v:'Não'}
  ]},
  {id:'meds',step:3,title:'Medicamentos em uso',fields:[
    {k:'medUso',t:'radio',l:'Utiliza algum medicamento contínuo ou ocasional?',o:SN,v:'Sim',subIf:'Sim',sub:[{k:'meds',t:'medlist',v:[{nome:'Levotiroxina',dose:'50 mcg',freq:'1x ao dia',ind:'Hipotireoidismo'}]}]},
    {k:'isotret',t:'radio',l:'Utiliza ou utilizou recentemente isotretinoína?',o:SNS,v:'Não'}
  ]},
  {id:'produtos',step:3,title:'Produtos e tratamentos',fields:[
    {k:'prodUso',t:'radio',l:'Utiliza produtos dermatológicos na região que deseja tratar?',o:SN,v:'Sim',subIf:'Sim',sub:[{k:'prods',t:'checks',l:'Quais produtos?',o:['Ácidos (ex.: glicólico, salicílico)','Retinoides','Clareadores','Esfoliantes','Cosméticos antiacne','Outro'],v:['Ácidos (ex.: glicólico, salicílico)','Esfoliantes'],two:1}]},
    {k:'tratDerm',t:'radio',l:'Está realizando tratamento dermatológico ou outro procedimento estético na região?',o:SN,v:'Não'}
  ]},
  {id:'hormonal',step:4,title:'Histórico hormonal e crescimento dos pelos',fields:[
    {k:'horm',t:'radio',l:'Possui diagnóstico de alteração hormonal?',o:SNS,v:'Sim',subIf:'Sim',sub:[{k:'horm_qual',t:'text',l:'Qual?',v:'SOP',w2:1}]},
    {k:'hormonios',t:'radio',l:'Utiliza hormônios, testosterona ou anabolizantes?',o:['Sim','Não','Não se aplica'],v:'Não'},
    {k:'grossos',t:'radio',l:'Percebe crescimento de pelos grossos em regiões incomuns?',o:SN,v:'Sim',subIf:'Sim',sub:[{k:'grossos_onde',t:'text',l:'Onde?',v:'Rosto e abdômen.',w2:1}]}
  ]},
  {id:'depilacao',step:5,title:'Histórico de depilação',fields:[
    {k:'metodo',t:'radio',list:1,two:1,l:'Qual método utiliza atualmente?',o:['Lâmina','Cera','Pinça','Linha','Creme depilatório','Laser','Luz intensa pulsada','Outro'],v:'Lâmina'},
    {k:'ultima',t:'date',l:'Quando realizou a última depilação?',v:'2026-10-10'},
    {k:'laserAntes',t:'radio',l:'Já realizou depilação a laser ou luz intensa pulsada anteriormente?',o:SN,v:'Sim'}
  ]},
  {id:'sol',step:6,title:'Exposição solar e hábitos',fields:[
    {k:'expRecente',t:'radio',l:'Teve exposição solar intensa ou bronzeamento recente?',o:SN,v:'Não'},
    {k:'bronzeada',t:'radio',l:'Está com a pele bronzeada atualmente?',o:SN,v:'Não'},
    {k:'autobronz',t:'radio',l:'Utilizou autobronzeador?',o:SN,v:'Não'},
    {k:'pretende',t:'radio',l:'Pretende se expor intensamente ao sol nos próximos dias?',o:SN,v:'Não'},
    {k:'protetor',t:'radio',l:'Utiliza protetor solar nas áreas expostas?',o:SN,v:'Sim'},
    {k:'atrito',t:'radio',l:'Apresenta irritação frequente por atrito, roupas ou outros fatores locais?',o:SN,v:'Não'}
  ]},
  {id:'derm',step:7,title:'Condições dermatológicas',desc:'Possui ou já apresentou alguma das condições abaixo?',fields:[
    {k:'cond',t:'checks',two:1,o:['Vitiligo','Psoríase','Dermatite','Herpes recorrente','Foliculite','Infecções cutâneas','Hiperpigmentação pós-inflamatória','Hipopigmentação pós-inflamatória','Outra'],v:['Herpes recorrente']},
    {k:'derm_obs',t:'textarea',l:'Observações',v:'Histórico de herpes labial, sem crises recentes.',w2:1}
  ]},
  {id:'fototipo',step:8,title:'Fototipo de Fitzpatrick',type:'fototipo'},
  {id:'regiao',step:8,title:'Avaliação por região',desc:'Registre as características da pele e dos pelos de cada região selecionada.',type:'regions'},
  {id:'seguranca',step:9,title:'Classificação da avaliação',fields:[
    {k:'classif',t:'radio',list:1,l:'Resultado da avaliação de segurança',o:['Apto para iniciar o tratamento','Apto com precauções','Necessário adiar o procedimento','Procedimento não indicado no momento','Necessário encaminhamento'],v:'Apto para iniciar o tratamento'},
    {k:'riscos',t:'textarea',l:'Fatores de risco identificados',v:'Fototipo III.\nPresença de pelos encravados.\nSem contraindicações no momento.',w2:1},
    {k:'precaucoes',t:'textarea',l:'Precauções necessárias',v:'Fotoproteção rigorosa.\nEvitar atrito excessivo na região.',w2:1}
  ]},
  {id:'plano',step:10,title:'Planejamento do tratamento',fields:[
    {k:'equip',t:'select',l:'Equipamento',o:['Hakon 4D','Outro equipamento'],v:'Hakon 4D'},
    {k:'onda',t:'text',l:'Comprimento de onda',v:'Alexandrita + Nd:YAG'},
    {k:'estrategia',t:'radio',l:'Estratégia de aplicação',o:['Pontual','Varredura','Outro'],v:'Pontual'},
    {k:'teste',t:'radio',l:'Necessidade de teste em pequena área?',o:SN,v:'Não'},
    {k:'intervalo',t:'select',l:'Intervalo proposto entre sessões',o:['20 a 30 dias','30 a 45 dias','45 a 60 dias','Mais de 60 dias'],v:'30 a 45 dias'},
    {k:'sessoes',t:'text',l:'Estimativa de sessões (individualizada)',v:'5 a 6 sessões'},
    {k:'objetivo',t:'text',l:'Objetivo do tratamento',v:'Redução significativa e duradoura dos pelos.',w2:1}
  ]},
  {id:'orient',step:10,title:'Orientações específicas',desc:'Marque as orientações passadas para a paciente.',next:'Concluir avaliação',fields:[
    {k:'orient',t:'checks',o:['Evitar exposição solar na região tratada','Utilizar protetor solar diariamente','Não utilizar cera, pinça ou depiladores elétricos durante o tratamento','Manter a pele limpa e hidratada','Evitar atrito excessivo e roupas apertadas','Informar uso de novos medicamentos','Seguir intervalo entre as sessões','Retornar em caso de reações adversas','Outras orientações'],v:['Evitar exposição solar na região tratada','Utilizar protetor solar diariamente','Não utilizar cera, pinça ou depiladores elétricos durante o tratamento','Manter a pele limpa e hidratada','Evitar atrito excessivo e roupas apertadas','Informar uso de novos medicamentos','Seguir intervalo entre as sessões','Retornar em caso de reações adversas','Outras orientações'],subIf:'Outras orientações',sub:[{k:'orient_outras',t:'textarea',l:'Outras orientações',v:'Aplicação de FBM preventiva após as sessões.',w2:1}]}
  ]},
  {id:'consent',step:11,title:'Consentimento informado',desc:'Leia cada documento com a paciente e colete a assinatura eletrônica.',type:'consent',next:'Finalizar'},
  {id:'done',type:'done'}
];

window.FICHA_FOTOTIPOS=[
  {r:'I',c:'#F3DEC8',s:'Sempre queima, nunca bronzeia'},
  {r:'II',c:'#EACBA8',s:'Queima com facilidade e bronzeia pouco'},
  {r:'III',c:'#D6A57B',s:'Às vezes queima e bronzeia gradualmente'},
  {r:'IV',c:'#B57F57',s:'Raramente queima e bronzeia facilmente'},
  {r:'V',c:'#87532F',s:'Raramente queima e bronzeia muito'},
  {r:'VI',c:'#4A2C1C',s:'Quase nunca queima, sempre bronzeia'}
];

window.FICHA_REGION_FIELDS={
  cor:{l:'Cor dos pelos',o:['Preto','Castanho escuro','Castanho','Castanho claro','Loiro','Ruivo','Branco ou grisalho']},
  espessura:{l:'Espessura',o:['Fino','Intermediário','Grosso','Misto']},
  densidade:{l:'Densidade',o:['Baixa','Moderada','Alta']},
  distrib:{l:'Distribuição',o:['Uniforme','Irregular','Localizada']},
  pele:{l:'Condições da pele',o:['Íntegra','Irritada','Inflamada','Lesionada']}
};
window.FICHA_REGION_DEFAULT={cor:'Castanho',espessura:'Grosso',densidade:'Alta',distrib:'Irregular',pele:'Íntegra',fotos:0,obs:'',done:false};
window.FICHA_REGION_SEED={'Virilha completa':{cor:'Castanho',espessura:'Grosso',densidade:'Alta',distrib:'Irregular',pele:'Íntegra',fotos:2,obs:'Presença de pelos encravados e leve hiperpigmentação na parte interna.',done:false}};

window.FICHA_DOCS=[
  {id:'tcle',req:1,t:'Termo de Consentimento Livre e Esclarecido — Depilação a Laser',short:'Termo de Consentimento Livre e Esclarecido',body:[
    ['1. Sobre o procedimento','A depilação a laser é um procedimento que utiliza energia luminosa para atingir estruturas do folículo piloso, promovendo a redução progressiva do crescimento dos pelos.','O resultado varia de acordo com o fototipo, a cor e a espessura dos pelos, fatores hormonais e a adesão às orientações. Não é possível garantir a eliminação definitiva de todos os pelos.'],
    ['2. Resultados esperados','Redução gradual da quantidade e da espessura dos pelos ao longo das sessões, com intervalos definidos no planejamento. Podem ser necessárias sessões de manutenção.'],
    ['3. Possíveis reações','Vermelhidão, sensação de calor, inchaço leve e sensibilidade local nas primeiras horas. Mais raramente: bolhas, crostas, alterações temporárias de pigmentação ou foliculite.'],
    ['4. Compromissos da paciente','Informar alterações de saúde e novos medicamentos, evitar exposição solar e seguir as orientações recebidas antes e depois de cada sessão.']
  ]},
  {id:'img',req:1,t:'Autorização de uso de imagens clínicas (prontuário)',short:'Uso de imagens clínicas',body:[
    ['Finalidade','Autorizo o registro fotográfico das regiões tratadas para acompanhamento clínico da evolução do tratamento.'],
    ['Armazenamento','As imagens ficam armazenadas no prontuário, com acesso restrito à profissional responsável, e não serão divulgadas sem nova autorização.']
  ]},
  {id:'div',req:0,t:'Autorização de uso de imagens para fins de divulgação',short:'Uso de imagens para divulgação',body:[
    ['Finalidade','Autorizo o uso das imagens de antes e depois em materiais de divulgação da clínica, sem identificação do rosto, salvo autorização expressa.'],
    ['Revogação','Esta autorização é opcional e pode ser revogada a qualquer momento, mediante solicitação.']
  ]}
];
