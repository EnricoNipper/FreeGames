#!/bin/bash

# Script para testar a sincronização de jogos

echo "🎮 Testando sincronização de jogos..."
echo ""

# Fazer requisição para a API
curl -X GET http://localhost:3000/api/cron/sync \
  -H "Authorization: Bearer dev-secret-123" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n" \
  -s

echo ""
echo "✅ Teste concluído!"
