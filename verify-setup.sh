#!/bin/bash

# Script de verificação do FreeGames Hub
# Verifica se tudo está funcionando corretamente

echo "🎮 FreeGames Hub - Verificação de Setup"
echo "========================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar se o servidor está rodando
echo "📡 Verificando servidor..."
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Servidor Next.js está rodando na porta 3001"
else
    echo -e "${RED}✗${NC} Servidor não está rodando"
    exit 1
fi

# 2. Verificar API de jogos
echo ""
echo "🎮 Verificando API de jogos..."
GAMES_RESPONSE=$(curl -s "http://localhost:3001/api/games?limit=1")
TOTAL_GAMES=$(echo $GAMES_RESPONSE | grep -o '"total":[0-9]*' | grep -o '[0-9]*')

if [ ! -z "$TOTAL_GAMES" ]; then
    echo -e "${GREEN}✓${NC} API funcionando - Total de jogos: $TOTAL_GAMES"
else
    echo -e "${RED}✗${NC} API de jogos não está respondendo"
    exit 1
fi

# 3. Verificar banco de dados
echo ""
echo "💾 Verificando banco de dados..."
if [ -f "prisma/dev.db" ]; then
    DB_SIZE=$(du -h prisma/dev.db | cut -f1)
    echo -e "${GREEN}✓${NC} Banco de dados SQLite existe ($DB_SIZE)"
else
    echo -e "${RED}✗${NC} Banco de dados não encontrado"
    exit 1
fi

# 4. Verificar plataformas disponíveis
echo ""
echo "🎯 Plataformas com jogos:"
PLATFORMS=$(curl -s "http://localhost:3001/api/games?limit=200" | grep -o '"platform":"[^"]*"' | cut -d'"' -f4 | sort | uniq -c | sort -rn)
echo "$PLATFORMS"

# 5. Verificar jogos "hot"
echo ""
echo "🔥 Jogos em destaque:"
HOT_COUNT=$(curl -s "http://localhost:3001/api/games?limit=200" | grep -o '"isHot":true' | wc -l)
echo -e "Total de jogos HOT: ${YELLOW}$HOT_COUNT${NC}"

# 6. URLs úteis
echo ""
echo "🌐 URLs importantes:"
echo "   • Frontend:      http://localhost:3001"
echo "   • API Jogos:     http://localhost:3001/api/games"
echo "   • Prisma Studio: http://localhost:5555"
echo ""

echo -e "${GREEN}✓ Setup completo e funcionando!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "   1. Acesse http://localhost:3001 no navegador"
echo "   2. Verifique se os jogos aparecem corretamente"
echo "   3. Teste filtros por plataforma"
echo "   4. Clique em um jogo para ver detalhes"
echo "   5. Quando pronto, faça deploy na Vercel"
