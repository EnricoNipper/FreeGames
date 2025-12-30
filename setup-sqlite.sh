#!/bin/bash
# Script para configurar o banco de dados local SQLite (apenas desenvolvimento)

echo "🔧 Configurando banco SQLite para desenvolvimento..."

# Backup do .env atual
cp .env .env.backup

# Criar novo .env com SQLite
cat > .env << 'EOF'
# Database SQLite (APENAS PARA DESENVOLVIMENTO LOCAL)
DATABASE_URL="file:./dev.db"

# CRON Secret
CRON_SECRET="dev-secret-123"

# Ambiente
NODE_ENV="development"
EOF

echo "✅ .env atualizado com SQLite"
echo ""
echo "⚠️  IMPORTANTE: Para PRODUÇÃO, use Neon.tech PostgreSQL!"
echo ""
echo "Próximos passos:"
echo "1. Atualize o schema.prisma para SQLite (já vou fazer isso)"
echo "2. Execute: npx prisma db push"
echo "3. Execute: npm run sync"
echo "4. Execute: npm run dev"
