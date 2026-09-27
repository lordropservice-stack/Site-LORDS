# Organização de Mídia — lords-site

**Regra:** o que está na pasta aparece no site. O que não deve aparecer deve sair da pasta.

## Estrutura de vídeos

```
assets/videos/
  fabrica/
    hero/          → hero reel da página Fábrica Criativa (loop de fundo)
    portfolio/
      moda/        → carrossel Moda Feminina (Fábrica + Home)
      comunicacao/ → carrossel Comunicação
      gastronomia/ → carrossel Gastronomia
      suplementos/ → carrossel Suplementos
      otica/       → carrossel Ótica
      automotivo/  → carrossel Automotivo
      imobiliario/ → carrossel Imobiliário
      hotelaria/   → carrossel Hotelaria (NEW)
    carrossel/     → 4 vídeos do carrossel de pilares (hub.mp4, captacao.mp4, autoridade.mp4, conversao.mp4)
  home/
    hero/          → hero da Home (curado manualmente em home.js — HERO_SHOWCASE)
    portfolio/     → mesmo estrutura que fabrica/portfolio/ acima
```

## Estrutura de fotos

```
assets/fotos/         → carrossel de fotos (Home + Fábrica)
assets/cobertura/     → seção "Onde atendemos" (mapas de cidade)
assets/estudio/       → fotos e vídeos do estúdio (curado manualmente)
assets/servicos-avulsos/
  fotos/              → fotos dos serviços avulsos (aguardando conteúdo)
assets/team/          → fotos do time (usadas no time e no funil de diagnóstico)
assets/logos-parcerias/ → logos dos parceiros
assets/mockups/       → mockups do LORDS Hub
```

## Como sincronizar

Após adicionar ou remover arquivos das pastas de vídeo ou `assets/fotos/`, rode:

```
node sync-midia.mjs
```

Isso atualiza o `products-data.js` automaticamente.

## Acervo original

A pasta `assets/jenifer/` contém o acervo original da Jenifer (fonte das fotos e vídeos copiados).
Não apagar — serve de backup. Pode ser movida para fora do site quando não precisar mais.

---
Atualizado: 2026-09-25
