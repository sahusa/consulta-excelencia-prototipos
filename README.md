# Consulta de Excelência — Protótipos

Projeto estático independente do sistema principal, sem banco, API ou autenticação.

## Primeiro deploy na Vercel

Importar o repositório `sahusa/consulta-excelencia-prototipos`.
Usar a raiz do repositório como Root Directory. O arquivo `vercel.json` define:

- Framework Preset: Other.
- Sem comandos de instalação ou build.
- Output Directory: public.

A rota `/` está intencionalmente vazia, sem catálogo.
A publicação pública e o subdomínio serão configurados posteriormente na Vercel e no DNS.

## Adicionar um protótipo

Adicionar `public/<slug>.html`. Com `cleanUrls`, o endereço será `/<slug>`.
Manter os recursos do protótipo
dentro de `public`, preferencialmente em `public/assets/<slug>/`.

Usar apenas dados fictícios e ações simuladas, sem credenciais ou conexão à produção.

## Protótipos disponíveis

- `/ficha-avaliacao-laser`: Ficha de Avaliação de Depilação a Laser.
  Recursos em `public/assets/ficha-avaliacao-laser/`. O preenchimento fica
  apenas no localStorage deste navegador. Fotos, PDF e agenda são simulados;
  as assinaturas pertencem apenas à demonstração, sem envio ao sistema principal.
  O perfil da cliente não está incluído neste protótipo.

Referência: https://vercel.com/docs/project-configuration/vercel-json
