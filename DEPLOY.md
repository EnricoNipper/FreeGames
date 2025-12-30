# 🚀 Guia de Deploy - FreeGames Hub

## 📋 Pré-requisitos

- Conta no GitHub
- Conta na Vercel (gratuita)
- Conta no Neon.tech (PostgreSQL gratuito)

---

## 🗄️ Passo 1: Configurar o Banco de Dados (Neon.tech)

### 1.1 Criar Conta e Projeto

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Clique em **"Create Project"**
4. Escolha:
   - **Name**: free-games-hub
   - **Region**: Escolha o mais próximo (ex: AWS US East)
   - **PostgreSQL Version**: 16 (recomendado)

### 1.2 Copiar Connection String

1. No dashboard do projeto, clique em **"Connection Details"**
2. Copie a **Connection String** completa
3. Deve ser algo como:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

---

## 🔧 Passo 2: Preparar o Repositório

### 2.1 Criar Repositório no GitHub

```bash
cd /caminho/para/free-games-hub
git add .
git commit -m "🎮 Initial commit - FreeGames Hub"
git branch -M main
git remote add origin https://github.com/seu-usuario/free-games-hub.git
git push -u origin main
```

---

## ☁️ Passo 3: Deploy na Vercel

### 3.1 Conectar Projeto

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório `free-games-hub`
5. Clique em **"Import"**

### 3.2 Configurar Variáveis de Ambiente

Na página de configuração do projeto, adicione:

**Environment Variables:**

| Nome | Valor | Ambiente |
|------|-------|----------|
| `DATABASE_URL` | Sua connection string do Neon | Production, Preview, Development |
| `CRON_SECRET` | Gere um token aleatório* | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**\*Gerar token aleatório:**
```bash
openssl rand -base64 32
```

### 3.3 Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (2-3 minutos)
3. Seu site estará online! 🎉

---

## 🔄 Passo 4: Executar Migration do Banco

### 4.1 Via Terminal Local

```bash
# Configure a DATABASE_URL localmente
export DATABASE_URL="sua-connection-string-do-neon"

# Execute a migration
npx prisma migrate deploy
```

### 4.2 Ou via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Executar comando remoto
vercel env pull .env.production
npx prisma migrate deploy
```

---

## ⏰ Passo 5: Configurar CRON Job

O arquivo `vercel.json` já está configurado para rodar a sincronização a cada 6 horas.

### 5.1 Verificar CRON

1. No dashboard da Vercel, vá em **"Settings" > "Cron Jobs"**
2. Você deve ver: `/api/cron/sync` rodando `0 */6 * * *`

### 5.2 Testar Manualmente

```bash
curl -X GET https://seu-site.vercel.app/api/cron/sync \
  -H "Authorization: Bearer seu-cron-secret"
```

Se retornar `{"success":true, ...}`, está funcionando! ✅

---

## 🎯 Passo 6: Primeira Sincronização

Após o deploy, execute a primeira sincronização:

```bash
# Substitua pelos seus valores
curl -X GET https://free-games-hub.vercel.app/api/cron/sync \
  -H "Authorization: Bearer SEU_CRON_SECRET_AQUI"
```

Isso irá popular o banco com os jogos atuais.

---

## 📊 Passo 7: Monitoramento

### 7.1 Vercel Analytics

1. No dashboard da Vercel, vá em **"Analytics"**
2. Ative o **Vercel Analytics** (gratuito para 100k pageviews/mês)

### 7.2 Logs

- **Deploy Logs**: Vercel Dashboard > Deployments > Select deployment
- **Function Logs**: Vercel Dashboard > Functions > View logs
- **CRON Logs**: Vercel Dashboard > Cron Jobs > View executions

---

## 🔒 Passo 8: Segurança

### 8.1 Proteger .env

Certifique-se que `.env` está no `.gitignore`:

```bash
# Verificar
cat .gitignore | grep .env
```

### 8.2 Rodar Token CRON

O `CRON_SECRET` deve ser forte e nunca exposto publicamente.

---

## 💰 Passo 9: Monetização (Opcional)

### 9.1 Google AdSense

1. Cadastre-se no [AdSense](https://www.google.com/adsense/)
2. Adicione a variável `NEXT_PUBLIC_ADSENSE_ID`
3. Implemente os componentes de anúncios

### 9.2 Amazon Associates

1. Cadastre-se no [Amazon Associates](https://affiliate-program.amazon.com/)
2. Obtenha seu Tracking ID
3. Adicione aos links de produtos

---

## 🐛 Troubleshooting

### Erro: "Database connection failed"

- Verifique se o `DATABASE_URL` está correto
- Confirme que o Neon está ativo
- Teste a conexão localmente

### Erro: "CRON não está rodando"

- Verifique o `vercel.json`
- Confirme que está na tier Pro (ou Free com limite)
- Veja os logs de CRON no dashboard

### Site muito lento

- Ative **Vercel Edge Cache**
- Use **Next.js ISR** para páginas estáticas
- Considere **Prisma Accelerate** para cache de queries

---

## 🎉 Sucesso!

Seu site está no ar! Próximos passos:

- [ ] Adicionar domínio customizado na Vercel
- [ ] Configurar Google Search Console
- [ ] Submeter sitemap
- [ ] Criar conta no Google Analytics
- [ ] Iniciar estratégia de SEO

**URL do seu site**: `https://seu-projeto.vercel.app`

---

## 📞 Suporte

- **Documentação Next.js**: https://nextjs.org/docs
- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Neon**: https://neon.tech/docs
- **GitHub Issues**: Abra uma issue no repositório

Feito com ❤️ para a comunidade de gamers!
