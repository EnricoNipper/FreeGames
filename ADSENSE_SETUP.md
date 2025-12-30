# 💰 Guia de Monetização - Google AdSense

## 📋 Checklist de Aprovação

### ✅ Requisitos ANTES de se inscrever:

1. **Conteúdo Rico (CRÍTICO)**
   - ✅ Páginas de detalhes com +300 palavras
   - ✅ Descrições únicas para cada jogo
   - ✅ Seções "Como Resgatar", "Por que aproveitar"
   - ✅ Schema.org JSON-LD implementado

2. **Navegação e Estrutura**
   - ✅ Menu de navegação claro
   - ✅ Páginas essenciais: Home, Sobre, Contato, Privacidade
   - ✅ Sitemap.xml (criar na Fase 2)

3. **Requisitos Técnicos**
   - ✅ Domínio próprio (opcional mas recomendado)
   - ✅ SSL/HTTPS ativo (Vercel já tem)
   - ✅ Design responsivo
   - ✅ Velocidade de carregamento rápida

4. **Conteúdo Original**
   - ❌ NÃO copiar textos de outros sites
   - ✅ Usar IA para gerar descrições únicas
   - ✅ Adicionar opinião/análise pessoal

---

## 🚀 Como Configurar

### **Passo 1: Inscrever-se no AdSense**

1. Acesse: https://www.google.com/adsense
2. Clique em "Começar"
3. Insira a URL: `https://freegameshub-eight.vercel.app`
4. Preencha seus dados (endereço, CPF/CNPJ para pagamento)

### **Passo 2: Adicionar Código de Verificação**

O Google vai pedir para você adicionar um código no `<head>`. **JÁ ESTÁ FEITO!**

O código está em `/app/layout.tsx`:
```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
  crossOrigin="anonymous"
/>
```

**O que fazer:**
1. Copie seu ID do AdSense (ex: `ca-pub-1234567890123456`)
2. Adicione no `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-1234567890123456"
   ```
3. Faça deploy na Vercel com a variável configurada
4. Volte ao AdSense e clique em "Verificar"

### **Passo 3: Aguardar Aprovação (1-7 dias)**

O Google vai analisar:
- ✅ Conteúdo original e de qualidade
- ✅ Navegação fácil
- ✅ Políticas do AdSense

**Dicas para aprovar mais rápido:**
- Ter pelo menos 20-30 páginas de jogos
- Adicionar um blog com 3-5 artigos
- Garantir que não há erros 404
- Ter uma página "Sobre Nós"

### **Passo 4: Criar Blocos de Anúncios**

Após aprovação:

1. **Banner Topo (728x90)**
   - No AdSense: Anúncios → Blocos de anúncios → Novo
   - Tipo: Display
   - Tamanho: 728x90 (Leaderboard)
   - Copie o `data-ad-slot="1234567890"`
   
2. **Retângulo Sidebar (300x250)**
   - Tipo: Display
   - Tamanho: 300x250 (Retângulo médio)
   
3. **In-Feed (Responsivo)**
   - Tipo: In-feed
   - Design: Automático

**Atualize os componentes:**
```tsx
// components/AdSense.tsx

export function AdSenseBannerTop() {
  return <AdSense slot="1234567890" format="horizontal" />
}

export function AdSenseRectangle() {
  return <AdSense slot="0987654321" format="rectangle" />
}
```

---

## 📍 Onde os Anúncios Estão

### **Página de Detalhes (`/jogo/[id]`)**
1. ✅ **Banner Topo** - Logo após o breadcrumb
2. ✅ **In-Feed** - Após a descrição, antes das instruções
3. ✅ **Retângulo Sidebar** - 2 blocos na lateral direita (desktop)

### **Home Page (Futuro)**
1. Banner topo
2. In-Feed a cada 6 jogos
3. Banner rodapé

---

## 💡 Dicas de Otimização (Aumentar CPM)

### 1. **Posicionamento Estratégico**
```
❌ Evitar:
- Acima do conteúdo principal
- Esconder anúncios
- Muitos anúncios (máx 3-4 por página)

✅ Fazer:
- Próximo ao CTA principal
- Entre parágrafos de texto
- Sidebar sempre visível
```

### 2. **Conteúdo de Alto Valor**
- Palavras-chave caras: "AAA games", "gaming PC", "hardware"
- Artigos sobre: "Melhores jogos grátis de 2025"
- Reviews detalhadas

### 3. **Tráfego Qualificado**
- SEO para palavras-chave de intenção de compra
- "Melhor teclado para jogos"
- "PC gamer barato"
- "Como jogar [jogo] de graça"

---

## 📊 Expectativa de Ganhos

### **Cenário Conservador:**
- 1.000 pageviews/dia
- CTR médio: 1.5%
- CPC médio: $0.20
- **~$90/mês**

### **Cenário Otimista:**
- 10.000 pageviews/dia
- CTR: 2%
- CPC: $0.30
- **~$1.800/mês**

### **Fatores que aumentam:**
- ✅ Tráfego dos EUA/Europa (CPC mais alto)
- ✅ Conteúdo sobre hardware/gaming
- ✅ Páginas com +500 palavras
- ✅ Usuários engajados (tempo na página >2min)

---

## ⚠️ Políticas Importantes

### ❌ O que NÃO FAZER:
- Clicar nos próprios anúncios
- Pedir para outros clicarem
- Colocar anúncios em pop-ups
- Anúncios em conteúdo adulto/pirataria

### ✅ O que FAZER:
- Manter conteúdo original
- Respeitar copyright
- Ter política de privacidade
- Termo de uso claro

---

## 🔧 Variáveis de Ambiente na Vercel

Depois de aprovado, configure na Vercel:

1. Dashboard → Projeto → Settings → Environment Variables
2. Adicione:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
   ```
3. Redeploy o projeto

---

## 📈 Próximos Passos

1. **Fase 2 - SEO Avançado**
   - Sitemap.xml
   - Robots.txt
   - Meta tags completas
   - Páginas `/steam`, `/epic`

2. **Fase 3 - Blog**
   - "Top 10 Jogos Grátis de Janeiro 2025"
   - "Como conseguir jogos AAA de graça"
   - "Vale a pena jogar [jogo]?"

3. **Fase 4 - Afiliados**
   - Amazon (hardware)
   - Instant Gaming (keys baratas)
   - CPA de jogos freemium

---

## 🎯 Status Atual

- ✅ Código AdSense instalado
- ✅ Componentes criados
- ✅ Espaços reservados na UI
- ⏳ Aguardando ID do AdSense
- ⏳ Aguardando aprovação

**Próxima ação:** Se inscrever no AdSense assim que tiver 20+ jogos no site!
