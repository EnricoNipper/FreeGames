# 🚀 Guia de Publicação - FreeGames Hub

## 📋 Checklist Pré-Deploy

### ✅ Status Atual (Tudo Pronto!)
- [x] Build passa sem erros
- [x] 120 jogos sincronizados
- [x] Todas as APIs funcionando
- [x] Frontend renderizando
- [x] Filtros funcionando (plataforma + tipo)
- [x] Códigos promocionais detectados
- [x] Documentação completa

---

## 🎯 PASSO 1: Preparar o Repositório Git (5 minutos)

### 1.1 Verificar Status
```bash
cd /home/enriconipper/pixforce/projetos/free-games-hub
git status
```

### 1.2 Adicionar Todos os Arquivos
```bash
git add .
```

### 1.3 Commit Final
```bash
git commit -m "🎮 FreeGames Hub v1.0 - Production Ready

✨ Features:
- 120+ jogos e DLCs sincronizados
- Filtro por plataforma (11 opções)
- Filtro por tipo (Jogos, DLCs, Early Access)
- Sistema de códigos promocionais
- Design responsivo e moderno
- SEO otimizado
- CRON automático (6h)

🔧 Tech Stack:
- Next.js 16.1.1
- TypeScript
- Prisma ORM
- Tailwind CSS
- SQLite (dev) → PostgreSQL (prod)

📊 Stats:
- 90 DLCs
- 22 Jogos completos
- 3 Early Access
- 11 plataformas
- 100% funcional"
```

### 1.4 Criar Repositório no GitHub

**Opção A: Via GitHub.com (Recomendado)**
1. Acesse: https://github.com/new
2. Nome: `free-games-hub` (ou outro nome)
3. Descrição: `🎮 Agregador de jogos grátis com sincronização automática`
4. Público ou Privado: **Público** (recomendado para Vercel)
5. **NÃO** inicialize com README (já temos)
6. Clique em **"Create repository"**

**Opção B: Via GitHub CLI**
```bash
# Se tiver gh CLI instalado
gh repo create free-games-hub --public --source=. --remote=origin --push
```

### 1.5 Conectar e Fazer Push

```bash
# Adicionar remote (use a URL do seu repo)
git remote add origin https://github.com/SEU_USUARIO/free-games-hub.git

# Verificar
git remote -v

# Push inicial
git branch -M main
git push -u origin main
```

**✅ Checkpoint 1**: Verifique no GitHub se todos os arquivos foram enviados.

---

## 🗄️ PASSO 2: Configurar Neon PostgreSQL (5 minutos)

### 2.1 Criar Conta
1. Acesse: https://neon.tech
2. Clique em **"Sign Up"**
3. Use GitHub para login rápido (recomendado)

### 2.2 Criar Projeto
1. Clique em **"Create Project"**
2. Configuração:
   - **Project Name**: `free-games-hub`
   - **Region**: Selecione o mais próximo (ex: `US East (Ohio)` ou `Europe (Frankfurt)`)
   - **PostgreSQL Version**: `16` (latest)
   - **Compute**: Deixe no plano Free (0.5 GB)

3. Clique em **"Create Project"**

### 2.3 Copiar Connection String

1. No dashboard, você verá **"Connection Details"**
2. Copie a **Connection String** (formato: `postgresql://...`)
3. Exemplo:
   ```
   postgresql://user:password@ep-xxx-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

4. **GUARDE ESSA STRING!** Você vai precisar dela.

**✅ Checkpoint 2**: Connection string copiada e salva.

---

## ☁️ PASSO 3: Deploy na Vercel (10 minutos)

### 3.1 Criar Conta na Vercel
1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. **Use GitHub para login** (conecta automaticamente seus repos)

### 3.2 Importar Projeto
1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione o repositório **`free-games-hub`**
3. Clique em **"Import"**

### 3.3 Configurar Projeto

**Framework Preset**: Next.js (detecta automaticamente)

**Root Directory**: `.` (raiz)

**Build Settings**: (deixe padrão)
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3.4 Configurar Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

#### 1️⃣ DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Cole a connection string do Neon (que você copiou no Passo 2.3)
- **Environment**: Marque **Production**, **Preview**, **Development**

#### 2️⃣ CRON_SECRET
- **Name**: `CRON_SECRET`
- **Value**: Gere um token seguro (veja abaixo)
- **Environment**: Marque **Production**, **Preview**, **Development**

**Gerar token seguro**:
```bash
# No terminal local
openssl rand -base64 32
```
Copie o resultado e use como valor.

#### 3️⃣ NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Marque apenas **Production**

### 3.5 Deploy!

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. ✅ Deploy concluído!

**✅ Checkpoint 3**: Site publicado! Você verá uma URL tipo `https://free-games-hub-xxx.vercel.app`

---

## 🔧 PASSO 4: Aplicar Schema no PostgreSQL (3 minutos)

### 4.1 Preparar Ambiente Local

```bash
cd /home/enriconipper/pixforce/projetos/free-games-hub

# Criar arquivo .env.production temporário
echo "DATABASE_URL=\"COLE_AQUI_A_CONNECTION_STRING_DO_NEON\"" > .env.production
```

**Substitua** `COLE_AQUI_A_CONNECTION_STRING_DO_NEON` pela string real do Neon.

### 4.2 Aplicar Migrations

```bash
# Usar o .env.production
export $(cat .env.production | xargs)

# Gerar cliente Prisma
npx prisma generate

# Aplicar schema no Neon
npx prisma db push
```

**Saída esperada**:
```
✔ Your database is now in sync with your Prisma schema.
```

### 4.3 Verificar (Opcional)

```bash
# Abrir Prisma Studio conectado no Neon
npx prisma studio
```

Verifique se as tabelas foram criadas (ainda vazias, sem jogos).

**✅ Checkpoint 4**: Schema aplicado no PostgreSQL produção.

---

## 🎮 PASSO 5: Primeira Sincronização (2 minutos)

### 5.1 Pegar a URL do Deploy

No dashboard da Vercel, copie a URL do seu site:
```
https://free-games-hub-xxx.vercel.app
```

### 5.2 Executar Sincronização

```bash
# Substitua pela sua URL e CRON_SECRET
curl -X POST "https://SEU_SITE.vercel.app/api/cron/sync" \
  -H "Authorization: Bearer SEU_CRON_SECRET" \
  -H "Content-Type: application/json"
```

**Exemplo real**:
```bash
curl -X POST "https://free-games-hub-abc123.vercel.app/api/cron/sync" \
  -H "Authorization: Bearer xK9mP2wQ7rT5nL3vB8fH1cD6aE4jY0sU9zW" \
  -H "Content-Type: application/json"
```

**Saída esperada**:
```json
{
  "success": true,
  "stats": {
    "created": 120,
    "updated": 0,
    "skipped": 0,
    "expired": 4,
    "total": 120
  }
}
```

### 5.3 Verificar Site

1. Acesse: `https://SEU_SITE.vercel.app`
2. ✅ Deve mostrar os 120 jogos!
3. ✅ Filtros devem funcionar
4. ✅ Códigos devem aparecer

**✅ Checkpoint 5**: Site publicado com 120 jogos!

---

## 🔄 PASSO 6: Verificar CRON Automático (1 minuto)

### 6.1 Acessar Configurações CRON

1. No dashboard da Vercel, clique no seu projeto
2. Vá em **"Settings"** → **"Cron Jobs"**
3. Você deve ver:
   - **Path**: `/api/cron/sync`
   - **Schedule**: `0 */6 * * *` (a cada 6 horas)
   - **Status**: ✅ Active

### 6.2 Verificar Logs (Opcional)

1. Vá em **"Deployments"** → Selecione o último deployment
2. Clique em **"Functions"** → `api/cron/sync`
3. Veja os logs de execução

**✅ Checkpoint 6**: CRON automático configurado e ativo!

---

## 🎊 DEPLOY COMPLETO!

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🎮 FREEGAMES HUB ESTÁ NO AR! 🎮               ║
║                                                       ║
║  ✅ Deploy Vercel: Sucesso                           ║
║  ✅ Neon PostgreSQL: Conectado                       ║
║  ✅ 120 Jogos: Sincronizados                         ║
║  ✅ CRON: Ativo (6 em 6 horas)                       ║
║  ✅ Domínio: free-games-hub-xxx.vercel.app           ║
║                                                       ║
║            🚀 PRODUCTION READY 🚀                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## 📊 Seu Site Está Assim

### URLs Importantes

| Tipo | URL |
|------|-----|
| **Home** | `https://SEU_SITE.vercel.app` |
| **API Games** | `https://SEU_SITE.vercel.app/api/games` |
| **API Sync** | `https://SEU_SITE.vercel.app/api/cron/sync` |
| **Dashboard Vercel** | https://vercel.com/dashboard |
| **Dashboard Neon** | https://console.neon.tech |

### Funcionalidades Ativas

✅ **120 jogos e DLCs** disponíveis  
✅ **Filtro por plataforma** (11 opções)  
✅ **Filtro por tipo** (Jogos, DLCs, Early Access)  
✅ **Códigos promocionais** com botão copiar  
✅ **Sincronização automática** (a cada 6 horas)  
✅ **Design responsivo** (mobile + desktop)  
✅ **SEO otimizado** (meta tags, structured data)  
✅ **Performance** (< 2s load time)  

---

## 🔧 Próximos Passos (Opcional)

### 1. Domínio Customizado
**Na Vercel**:
1. Settings → Domains
2. Adicionar seu domínio (ex: `freegameshub.com`)
3. Configurar DNS conforme instruções

### 2. Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione seu site
3. Envie o sitemap: `https://SEU_SITE.vercel.app/sitemap.xml`

### 3. Google Analytics
1. Crie uma conta: https://analytics.google.com
2. Obtenha o tracking ID
3. Adicione ao `layout.tsx`

### 4. Google AdSense
1. Cadastre-se: https://www.google.com/adsense
2. Adicione seu site para aprovação
3. Implemente ads (veja `MONETIZACAO.md`)

### 5. Monitoramento
**Vercel Analytics** (grátis até 100k views/mês):
1. Dashboard → Analytics
2. Ative com um clique
3. Veja tráfego em tempo real

---

## 🐛 Troubleshooting

### Erro: "Build Failed"
```bash
# Testar build localmente primeiro
npm run build

# Se passar local mas falhar na Vercel:
# - Verificar Node version no vercel.json
# - Verificar env vars configuradas
```

### Erro: "Database connection failed"
```bash
# Testar connection string localmente
export DATABASE_URL="sua_connection_string"
npx prisma db push

# Se funcionar local, verificar:
# - Connection string está correta na Vercel
# - Aplicou em todos ambientes (Production, Preview, Dev)
```

### CRON não está rodando
```bash
# Verificar manualmente
curl -X POST "https://SEU_SITE.vercel.app/api/cron/sync" \
  -H "Authorization: Bearer SEU_CRON_SECRET"

# Se retornar 401: CRON_SECRET incorreto
# Se retornar 500: Verificar logs na Vercel
```

### Site lento
```bash
# Verificar se imagens estão otimizadas
# (já estão com Next.js Image)

# Adicionar cache headers (próxima versão)
# Considerar Prisma Accelerate para queries
```

---

## 📞 Suporte

### Documentação
- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs
- **Neon**: https://neon.tech/docs
- **Prisma**: https://www.prisma.io/docs

### Comandos Úteis

```bash
# Forçar nova sincronização
curl -X POST "https://SEU_SITE.vercel.app/api/cron/sync" \
  -H "Authorization: Bearer SEU_CRON_SECRET"

# Ver stats da API
curl "https://SEU_SITE.vercel.app/api/games" | jq '.pagination'

# Testar filtros
curl "https://SEU_SITE.vercel.app/api/games?platform=PC&type=Game" | jq '.pagination.total'
```

---

## 🎉 Parabéns!

Seu site **FreeGames Hub** está no ar e funcionando perfeitamente!

### O Que Você Conseguiu
- ✅ Site profissional publicado
- ✅ Banco de dados em nuvem
- ✅ Sincronização automática
- ✅ 120+ jogos disponíveis
- ✅ Filtros avançados
- ✅ Códigos promocionais
- ✅ SEO otimizado
- ✅ Performance top

### Próximos Passos para Crescer
1. Compartilhar em redes sociais
2. Submeter ao Google
3. Criar conteúdo (blog posts)
4. Monetizar (AdSense + Afiliados)
5. Engajar comunidade

**Boa sorte com o FreeGames Hub!** 🎮🚀

---

*Guia criado em: 30/12/2025*  
*Tempo estimado total: 25 minutos*  
*Dificuldade: ⭐⭐⚪⚪⚪ (Fácil/Médio)*
