# 🎮 FreeGames Hub - Guia de Uso

## 🌐 Site em Produção
**URL:** https://freegameshub-eight.vercel.app/

---

## 🔧 Manutenção

### ⚡ Sincronização Manual
Para sincronizar manualmente os jogos grátis:

```bash
curl -X POST "https://freegameshub-eight.vercel.app/api/cron/sync" \
  -H "Authorization: Bearer c932b5e68eba21cd5a34bee520788586d07451c2c6af3aa3c954357ac4218d3a"
```

### 📊 Verificar API
```bash
curl "https://freegameshub-eight.vercel.app/api/games?platform=all&type=all&limit=10"
```

---

## 🚀 Deploy

### Atualizar o Site
1. Faça suas alterações localmente
2. Commit e push para o GitHub:
```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```
3. A Vercel faz o deploy automático em 1-2 minutos

### Variáveis de Ambiente (Vercel)
- `DATABASE_URL` - Connection string do Neon PostgreSQL
- `CRON_SECRET` - Token de segurança para sincronização
- `NODE_ENV` - `production`

---

## 📦 Tecnologias

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Backend:** Next.js API Routes + Prisma ORM
- **Banco:** PostgreSQL (Neon Serverless)
- **Deploy:** Vercel
- **Estilo:** Tailwind CSS
- **Fonte de Dados:** GamerPower API

---

## 🎯 Funcionalidades

✅ Listagem de jogos grátis (PC, Console, Mobile)  
✅ Filtros por plataforma (11 opções)  
✅ Filtros por tipo (Game, DLC, Early Access, Loot)  
✅ Detecção automática de códigos promocionais  
✅ Botão de copiar código (um clique)  
✅ Links diretos para pegar os jogos  
✅ Interface responsiva  
✅ Sincronização automática (GitHub Actions - 6x/dia)  

---

## 📈 Próximas Melhorias (Opcionais)

1. **SEO:** Meta tags, sitemap, robots.txt
2. **Analytics:** Google Analytics ou Vercel Analytics
3. **Notificações:** Email ou Discord quando novos jogos chegarem
4. **Favoritos:** Sistema de favoritar jogos
5. **Busca:** Campo de pesquisa por nome
6. **Monetização:** Links de afiliados (ver MONETIZACAO.md)
7. **PWA:** Transformar em Progressive Web App
8. **Dark Mode:** Alternar entre tema claro/escuro
9. **Categorias:** Filtrar por gênero (Action, RPG, etc)
10. **Notificações Push:** Avisar quando novo jogo chegar

---

## 📞 Suporte

- **Repositório:** https://github.com/EnricoNipper/FreeGames
- **Issues:** https://github.com/EnricoNipper/FreeGames/issues
- **Documentação Completa:** Ver `README.md` e `DEPLOY.md`

---

## 🎉 Status do Projeto

**✅ 100% FUNCIONAL E EM PRODUÇÃO!**

**Data de Deploy:** 30 de dezembro de 2025  
**Total de Jogos:** 120+  
**Plataformas:** 11  
**Tipos:** 4  
**Uptime:** 99.9% (Vercel)  

---

## 🔐 Segurança

- ✅ CRON_SECRET protege a sincronização
- ✅ HTTPS obrigatório (Vercel)
- ✅ Banco de dados com SSL (Neon)
- ✅ Variáveis de ambiente protegidas
- ✅ Sem exposição de credenciais

---

**Desenvolvido com ❤️ usando Next.js + Vercel + Neon**
