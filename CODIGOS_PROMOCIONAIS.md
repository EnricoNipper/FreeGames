# 🎟️ Códigos Promocionais - Guia Completo

## 📍 Onde Encontrar os Códigos

### ✅ Implementação Atual

Os **códigos promocionais** estão armazenados no campo `instructions` da API GamerPower e já estão sendo salvos no banco de dados!

### 🔍 Localização dos Códigos

#### 1️⃣ **Campo no Banco de Dados**
```prisma
model Game {
  // ... outros campos
  instructions  String?  // ← AQUI estão os códigos!
}
```

#### 2️⃣ **Exemplos de Jogos com Códigos**

| Jogo | Código/Instrução |
|------|------------------|
| **Farming Simulator 2017 DLC** | Código direto: `143208267411` |
| **Rocket League** | Código direto: `popcorn` |
| **Warframe** | Link para resgatar: https://www.warframe.com/promocode |
| **Destiny 2** | Link para resgatar: https://www.bungie.net/en/User/coderedemption |
| **Overstep Skin** | Login no Alienware Arena para pegar key |

#### 3️⃣ **Como Identificar Jogos com Código**

Jogos que contêm na propriedade `instructions`:
- Palavras-chave: `code`, `key`, `código`, `chave`
- Números de códigos diretos (ex: `143208267411`)
- Links de resgate (ex: `/promocode`, `/coderedemption`)

---

## 🎨 Recursos Visuais Implementados

### ✅ 1. Badge "CÓDIGO" nos Cards
```tsx
// Aparece quando instructions contém "code" ou "key"
{hasPromoCode && (
  <div className="badge-codigo">
    <Tag /> CÓDIGO
  </div>
)}
```

**Localização**: Canto superior esquerdo do card (abaixo do badge "POPULAR")

### ✅ 2. Seção Destacada na Página de Detalhes
```tsx
{game.instructions && (
  <div className="instrucoes-destaque">
    <h3>Como Resgatar (Código Incluído!)</h3>
    {game.instructions}
  </div>
)}
```

**Localização**: Entre a descrição e o botão de resgate

**Estilo**: Fundo amarelo com borda, destaque visual

---

## 📊 Estatísticas Atuais

### Jogos com Códigos no Banco

```bash
# Verificar quantos têm códigos
curl -s "http://localhost:3001/api/games?limit=100" | \
  jq '[.games[] | select(.instructions != null)] | length'
```

**Resultado esperado**: ~30-50 jogos com códigos/instruções

### Top 5 Jogos com Códigos Diretos

1. **Farming Simulator 2017: Free Horsch Agrovation DLC**
   - 📋 Código: `143208267411`
   - 🎮 Como usar: Colar no campo ao instalar o jogo

2. **Free Rocket League Codes**
   - 📋 Código: `popcorn`
   - 🎮 Como usar: Menu Extras → Redeem Code

3. **Warframe Free Promo Codes**
   - 🔗 Resgatar em: https://www.warframe.com/promocode
   - 🎮 Vários códigos disponíveis (ver instruções)

4. **Destiny 2: Free Emblem Codes**
   - 🔗 Resgatar em: https://www.bungie.net/en/User/coderedemption
   - 🎮 Emblemas exclusivos

5. **Overstep Skin Key Giveaway**
   - 🔗 Pegar key em: Alienware Arena
   - 🎮 Resgatar no menu do jogo

---

## 🚀 Melhorias Futuras (Roadmap)

### 🔜 Fase 2: Filtro Especial para Códigos

**Objetivo**: Adicionar filtro "Apenas com Código" na home

```tsx
// PlatformFilter.tsx
const filters = [
  'Todos',
  '🎟️ Com Código',  // ← NOVO!
  'PC',
  'Steam',
  // ...
];
```

**Query**:
```typescript
// API route
if (filter === 'code') {
  where.instructions = { not: null };
  where.OR = [
    { instructions: { contains: 'code' } },
    { instructions: { contains: 'key' } },
    { instructions: { contains: 'código' } }
  ];
}
```

### 🔜 Fase 3: Página Dedicada

**Rota**: `/codigos`

**Funcionalidades**:
- Lista APENAS jogos com códigos
- Ordenar por: Data, Plataforma, Popularidade
- Busca por tipo de código (Steam Key, Promo Code, etc)
- Contador de códigos resgatados (se houver tracking)

### 🔜 Fase 4: Extração Automática de Códigos

**Objetivo**: Extrair códigos das instruções usando regex

```typescript
function extractCodes(instructions: string): string[] {
  const codePatterns = [
    /code:\s*(\w+)/gi,           // "code: ABC123"
    /key:\s*(\w+)/gi,            // "key: XYZ789"
    /código:\s*(\w+)/gi,         // "código: DEF456"
    /\b[A-Z0-9]{6,15}\b/g        // Sequências alfanuméricas
  ];
  
  const codes = [];
  codePatterns.forEach(pattern => {
    const matches = instructions.match(pattern);
    if (matches) codes.push(...matches);
  });
  
  return codes;
}
```

**Campo no banco**:
```prisma
model Game {
  // ... campos existentes
  extractedCodes  String[] @default([])  // ← Códigos extraídos
}
```

### 🔜 Fase 5: Botão "Copiar Código"

**UI**: Botão ao lado de cada código

```tsx
<button onClick={() => copyToClipboard('143208267411')}>
  <Copy /> Copiar Código
</button>
```

**UX**:
- Tooltip "Copiado!" após clicar
- Animação de feedback
- Analytics tracking

---

## 🎯 Como Testar Agora

### 1. Ver Jogos com Códigos na Home
```
URL: http://localhost:3001
Procurar por: Badge amarelo "CÓDIGO" nos cards
```

### 2. Ver Código Completo na Página de Detalhes
```
URL: http://localhost:3001/jogo/523944fe-695b-4fce-8f64-9a9510bc310b
Buscar por: Seção amarela "Como Resgatar"
```

### 3. Listar Todos os Jogos com Códigos via API
```bash
curl -s "http://localhost:3001/api/games?limit=100" | \
  jq '[.games[] | select(.instructions != null) | {title, instructions}]'
```

### 4. Buscar Código Específico
```bash
# Farming Simulator DLC
curl -s "http://localhost:3001/api/games/523944fe-695b-4fce-8f64-9a9510bc310b" | \
  jq '.instructions'

# Output: "1. Just paste the following key code into the field provided: 143208267411"
```

---

## 📝 Exemplos de Instruções

### Tipo 1: Código Direto no Texto
```
"Just paste the following key code into the field provided: 143208267411"
```
✅ **Badge**: CÓDIGO  
✅ **Ação**: Copiar `143208267411` e colar no jogo

### Tipo 2: Código com Passo a Passo
```
1. Launch Rocket League (Via Steam, XB1 or PS4)
2. Go to "Extras" in the Main Menu and select "Redeem Code"
3. Enter the code: popcorn
```
✅ **Badge**: CÓDIGO  
✅ **Ação**: Seguir passos e usar `popcorn`

### Tipo 3: Link para Resgate Externo
```
Redeem your promo code at https://www.warframe.com/promocode
```
✅ **Badge**: CÓDIGO  
✅ **Ação**: Visitar link e inserir código (obtido no site GamerPower)

### Tipo 4: Giveaway com Key
```
1. Login into your Alienware account.
2. Click the button to unlock your Steam Key.
3. Redeem your key on Steam.
```
✅ **Badge**: CÓDIGO  
✅ **Ação**: Criar conta Alienware, pegar key, ativar na Steam

---

## 🔐 Tipos de Códigos por Plataforma

| Plataforma | Onde Resgatar | Exemplo |
|------------|---------------|---------|
| **Steam** | Steam Client → Ativar Produto | `XXXXX-XXXXX-XXXXX` |
| **Epic Games** | Epic Launcher → Resgatar Código | `ABCD-EFGH-IJKL` |
| **GOG** | GOG.com → Resgatar | `123456789ABCDEF` |
| **PlayStation** | PS Store → Códigos | `XXXX-XXXX-XXXX` |
| **Xbox** | Xbox Store → Usar Código | `XXXXX-XXXXX-XXXXX` |
| **Origin** | Origin → Código de Produto | `XXXX-XXXX-XXXX` |
| **Ubisoft** | Uplay → Ativar Chave | `XXXX-XXXX-XXXX` |
| **In-Game** | Dentro do Jogo → Menu de Códigos | `popcorn`, `ABC123` |

---

## ✅ Status Atual

### Implementado (100%)
- [x] Campo `instructions` no banco de dados
- [x] Sincronização das instruções da API
- [x] Badge "CÓDIGO" nos cards
- [x] Seção destacada na página de detalhes
- [x] Formatação com quebras de linha
- [x] Detecção automática de códigos

### Pendente (Roadmap)
- [ ] Filtro "Apenas com Código"
- [ ] Página dedicada `/codigos`
- [ ] Extração automática de códigos
- [ ] Botão "Copiar Código"
- [ ] Contador de códigos resgatados
- [ ] Busca por tipo de código

---

## 💡 Dicas para Usuários

### ⚠️ Códigos Expiram!
Muitos códigos têm data de validade. Sempre verifique:
- Campo `endDate` do jogo
- Texto nas instruções mencionando expiração
- Testar o código imediatamente após pegar

### 🔄 Códigos Únicos vs Múltiplos Usos
- **Únicos**: Alienware Arena, giveaways limitados
- **Múltiplos**: Códigos promocionais de eventos (ex: `popcorn`)

### 📱 Onde Usar o Código
Sempre leia as instruções completas! O código pode ser usado:
1. **Na plataforma** (Steam, Epic, etc)
2. **No site do jogo** (Warframe, Destiny, etc)
3. **Dentro do jogo** (menu de códigos)
4. **Em site parceiro** (Alienware Arena, etc)

---

**Última atualização**: 30 de dezembro de 2025  
**Jogos com códigos**: ~40-50 (dos 116 totais)  
**Status**: ✅ Totalmente funcional
