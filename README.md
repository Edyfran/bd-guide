# Guia Educacional: Fundamentos de Banco de Dados

Este é um guia educacional interativo sobre Fundamentos de Banco de Dados, voltado para alunos do ensino técnico. O guia apresenta os conceitos fundamentais de bancos de dados de forma didática e interativa.

## Conteúdo do Guia

O guia aborda os seguintes tópicos:

1. O que é um banco de dados e sua importância
2. Diferença entre banco de dados e planilhas
3. Modelos de Banco de Dados (Relacional, NoSQL)
4. O papel do Administrador de Banco de Dados (DBA)

Cada tópico inclui:
- Explicações detalhadas
- Exemplos práticos
- Tabelas comparativas
- Dicas do professor
- Quiz interativo

## Características

- **Autenticação de usuários**: Integração com Supabase para cadastro e login de usuários
- **Interface responsiva**: Layout adequado para diferentes dispositivos
- **Navegação progressiva**: Controle de progresso do aluno pelos tópicos
- **Design moderno**: Inspirado no layout do W3Schools

## Requisitos

- Node.js (versão 18.18.0 ou superior)
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o Supabase:
   - Crie uma conta no [Supabase](https://supabase.io/)
   - Crie um novo projeto
   - Copie a URL e a chave anônima do projeto
   - Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
     ```
     NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
     ```

## Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```
npm run dev
```

Acesse http://localhost:3000 para visualizar o guia.

## Construção para Produção

Para construir o projeto para produção:

```
npm run build
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar este guia educacional.

## Licença

Este projeto está licenciado sob a licença MIT.
