#!/bin/bash

# Script de configuração para o guia educacional de banco de dados

# Cores para melhor visualização
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Configuração do Guia Educacional de Banco de Dados ===${NC}\n"

# Verificar se o .env.local existe
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Arquivo .env.local não encontrado.${NC}"
    echo -e "Criando arquivo .env.local a partir do exemplo..."
    
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo -e "${GREEN}Arquivo .env.local criado com sucesso!${NC}"
    else
        echo -e "${RED}Arquivo .env.example não encontrado. Criando .env.local vazio...${NC}"
        touch .env.local
        echo "# Configuração do Supabase" > .env.local
        echo "NEXT_PUBLIC_SUPABASE_URL=https://seu-id-projeto.supabase.co" >> .env.local
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui" >> .env.local
    fi
    
    echo -e "${YELLOW}⚠️  IMPORTANTE: Você precisa editar o arquivo .env.local com suas credenciais do Supabase.${NC}"
    echo -e "Veja como obter estas credenciais:\n"
    echo -e "1. Acesse https://app.supabase.com e faça login"
    echo -e "2. Selecione seu projeto ou crie um novo"
    echo -e "3. Vá para Settings > API"
    echo -e "4. Copie a URL e a chave anônima para o arquivo .env.local\n"
fi

# Verificar se as dependências estão instaladas
echo -e "${GREEN}Verificando dependências...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependências...${NC}"
    npm install
    echo -e "${GREEN}Dependências instaladas com sucesso!${NC}"
else
    echo -e "${GREEN}Dependências já instaladas.${NC}"
fi

# Iniciar o servidor de desenvolvimento
echo -e "\n${GREEN}Iniciando o servidor de desenvolvimento...${NC}"
echo -e "Acesse http://localhost:3000 no seu navegador"
echo -e "${YELLOW}Pressione Ctrl+C para interromper o servidor${NC}\n"

npm run dev 