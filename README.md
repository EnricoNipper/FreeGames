# 🎮 FreeGames Hub - Agregador de Jogos Grátis

Um agregador profissional de jogos grátis construído com Next.js 14+, TypeScript, Prisma e PostgreSQL. Rastreia ofertas da Epic Games, Steam, GOG e muito mais!

![Stack](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## ✨ Funcionalidades

- ✅ **Sincronização Automática**: Integração com GamerPower API para buscar jogos grátis
- ✅ **Filtragem por Plataforma**: Steam, Epic, GOG, PlayStation, Xbox, Mobile
- ✅ **UI Moderna**: Design responsivo com Tailwind CSS
- ✅ **SEO Otimizado**: Metadata completa e estrutura semântica
- ✅ **CRON Jobs**: Atualização automática via Vercel Cron
- ✅ **TypeScript**: Type-safety completo
- ✅ **Serverless**: Deploy zero-config na Vercel

## 🚀 Stack Tecnológica

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Database**: PostgreSQL (Neon.tech) - **Ideal para produção serverless**
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deploy**: Vercel
- **API Externa**: GamerPower API (grátis)

## 📦 Instalação

### 1. Clone o Projeto

```bash
git clone https://github.com/seu-usuario/free-games-hub.git
cd free-games-hub
npm install
```

### 2. Configure o Banco de Dados

#### Opção A: Neon.tech (Recomendado para produção)

1. Crie uma conta gratuita em [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a connection string
4. Cole no arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
CRON_SECRET="seu-token-aleatorio-aqui"
NODE_ENV="development"
```

#### Opção B: Prisma Dev (Para desenvolvimento local)

O projeto já está configurado com Prisma local. Basta rodar:

```bash
npx prisma dev
```

### 3. Execute as Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Popule o Banco (Primeira Sincronização)

Execute manualmente a API de sincronização:

```bash
curl -X GET http://localhost:3000/api/cron/sync \
  -H "Authorization: Bearer dev-secret-123"
```

### 5. Inicie o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 🔧 Configuração do CRON (Vercel)

O arquivo `vercel.json` já está configurado para rodar a cada 6 horas:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Importante**: Configure a variável `CRON_SECRET` no Vercel Dashboard.

## 💰 Estratégias de Monetização

### 1. Google AdSense
- Crie páginas de detalhes para cada jogo
- Adicione conteúdo editorial (descrição, requisitos)
- Coloque anúncios: 728x90 (topo), 300x250 (sidebar)

### 2. Afiliados
- **Amazon Associates**: Hardware (teclados, mouses, headsets)
- **Instant Gaming / Eneba**: Keys de jogos baratas
- **CPA (War Thunder, World of Tanks)**: Paga por cadastro

### 3. Produtos Digitais
- Guias de otimização de PC
- Listas curadas (melhores jogos do mês)

## 📊 Estrutura do Banco de Dados

```prisma
model Game {
  id            String    @id @default(uuid())
  title         String    @unique
  description   String?
  image         String?
  platform      String
  priceOriginal Decimal
  url           String
  endDate       DateTime?
  isHot         Boolean   @default(false)
  status        String    @default("Active")
  createdAt     DateTime  @default(now())
  
  @@index([endDate])
  @@index([status])
}
```

## 🎯 Roadmap

- [ ] Página de detalhes de cada jogo
- [ ] Sistema de notificações (email/push)
- [ ] Integração com Steam API
- [ ] Blog com artigos SEO
- [ ] Sistema de favoritos
- [ ] API pública para desenvolvedores

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para mais detalhes.

## 🙏 Créditos

- **GamerPower API**: Fonte de dados dos jogos
- **Vercel**: Hospedagem e deploy
- **Neon.tech**: Banco de dados PostgreSQL serverless

---

**Feito com ❤️ para a comunidade de gamers**


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
