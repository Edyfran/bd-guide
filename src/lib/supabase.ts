import { createClient } from '@supabase/supabase-js';

// Obtenha as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as credenciais foram configuradas
if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL não está definido. Verifique seu arquivo .env.local');
}

if (!supabaseKey) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY não está definido. Verifique seu arquivo .env.local');
}

// Se estamos em desenvolvimento e faltam credenciais, forneça instruções claras
if (process.env.NODE_ENV === 'development' && (!supabaseUrl || !supabaseKey)) {
  console.warn(`
    ⚠️ Configuração do Supabase incompleta ⚠️
    
    Siga estas etapas:
    1. Crie um projeto no Supabase (https://app.supabase.com)
    2. Obtenha a URL e a chave anônima em: Settings > API
    3. Adicione essas informações ao arquivo .env.local na raiz do projeto:
    
    NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
    
    4. Reinicie o servidor de desenvolvimento
  `);
}

// Cria e exporta o cliente Supabase
// Usamos strings vazias como fallback para evitar erros de inicialização,
// mas a autenticação não funcionará sem as credenciais reais
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseKey || 'placeholder-key'
); 