'use client';

import { Tag } from 'lucide-react';
import { useState } from 'react';

interface GameInstructionsProps {
  instructions: string;
  description?: string | null;
}

export default function GameInstructions({ instructions, description }: GameInstructionsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Extrair códigos promocionais do texto
  const extractCodes = (text: string): string[] => {
    const codes: string[] = [];
    
    // Padrão 1: Códigos após palavras-chave (code:, key:, etc)
    const keywordPatterns = [
      /code[:\s]+([A-Z0-9-]+)/gi,
      /key[:\s]+([A-Z0-9-]+)/gi,
      /código[:\s]+([A-Z0-9-]+)/gi,
      /promo[:\s]+([A-Z0-9-]+)/gi,
    ];
    
    keywordPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && match[1].length >= 4) {
          codes.push(match[1]);
        }
      }
    });
    
    // Padrão 2: Códigos em formato específico (XXX-XXX-XXX ou XXXXXXXXX)
    // Detecta padrões como: A7LFYC44X, XFV-KHP-N97, 7F9-767-F74
    const codeFormats = [
      /\b([A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3})\b/g,  // XXX-XXX-XXX
      /\b([A-Z]{3}-[A-Z0-9]{2,4}-[A-Z0-9]{2,4})\b/g, // XXX-XX-XXX
      /\b([A-Z][0-9][A-Z0-9]{7,})\b/g,                // A7LFYC44X (letra + número + 7+ chars)
      /\b([0-9][A-Z][0-9A-Z]{7,})\b/g,                // 7CP-94V-LFP (número + letra)
    ];
    
    codeFormats.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          codes.push(match[1]);
        }
      }
    });
    
    // Padrão 3: Sequências longas de letras/números maiúsculos (mínimo 8 caracteres)
    // Mas excluir palavras comuns e URLs
    const longCodePattern = /\b([A-Z0-9]{8,})\b/g;
    const matches = text.matchAll(longCodePattern);
    const excludeWords = ['HTTP', 'HTTPS', 'HTML', 'STEAMGIFTS', 'GIVEAWAY', 'PLEASE', 'BUNGIE', 'REDEEM'];
    
    for (const match of matches) {
      const code = match[1];
      const isExcluded = excludeWords.some(word => code.includes(word));
      const hasUrl = text.substring(Math.max(0, match.index! - 10), match.index! + code.length + 10).includes('http');
      
      if (!isExcluded && !hasUrl && code.length >= 8 && code.length <= 15) {
        codes.push(code);
      }
    }
    
    // Remover duplicatas e filtrar códigos muito curtos
    const uniqueCodes = [...new Set(codes)].filter(code => code.length >= 4);
    
    return uniqueCodes;
  };

  // Buscar códigos tanto na descrição quanto nas instruções
  const allText = `${description || ''}\n${instructions}`;
  const codes = extractCodes(allText);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-400 mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5" />
        Como Resgatar
      </h3>
      
      {/* Códigos Destacados */}
      {codes.length > 0 && (
        <div className="mb-4 space-y-3">
          <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-300">
            🎁 {codes.length === 1 ? 'Código Promocional:' : 'Códigos Promocionais:'}
          </p>
          {codes.map((code, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-yellow-400"
            >
              <code className="flex-1 font-mono text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-wider break-all">
                {code}
              </code>
              <button
                onClick={() => copyCode(code)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
              >
                {copiedCode === code ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Instruções Completas */}
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
        <p className="font-semibold">📝 Instruções completas:</p>
        <div 
          className="whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ 
            __html: instructions
              .replace(/\r\n/g, '<br/>')
              .replace(/\n/g, '<br/>')
              .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 break-all">$1</a>')
          }}
        />
      </div>
    </div>
  );
}
