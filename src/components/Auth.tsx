'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'info'>('info');
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  // Verifica se o Supabase está configurado corretamente
  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Tentamos fazer uma operação simples no Supabase
        const { error } = await supabase.auth.getSession();
        
        // Verificamos se as variáveis de ambiente estão definidas
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || 
            process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder-url.supabase.co') {
          setSupabaseConfigured(false);
          setMessage('O Supabase não está configurado. Verifique o console para instruções.');
          setMessageType('error');
        } else if (error && error.message.includes('Failed to fetch')) {
          setSupabaseConfigured(false);
          setMessage('Não foi possível conectar ao Supabase. Verifique suas credenciais e conexão.');
          setMessageType('error');
        }
      } catch (error) {
        setSupabaseConfigured(false);
        setMessage('Erro ao verificar a configuração do Supabase.');
        setMessageType('error');
      }
    };

    checkSupabaseConfig();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseConfigured) {
      setMessage('Configure o Supabase primeiro para usar a autenticação.');
      setMessageType('error');
      return;
    }
    
    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        setMessage('Verifique seu email para o link de confirmação! Se não receber, verifique a pasta de spam.');
        setMessageType('info');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
      }
    } catch (error: any) {
      let errorMessage = 'Um erro ocorreu durante a autenticação';
      
      // Traduz as mensagens de erro comuns do Supabase
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Email não confirmado. Verifique seu email para o link de confirmação.';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está registrado. Tente fazer login.';
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isSignUp ? 'Criar Conta' : 'Entrar no Guia'}
      </h1>
      
      {message && (
        <div className={`mb-4 p-3 ${messageType === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'} rounded-md w-full`}>
          {message}
        </div>
      )}
      
      {!supabaseConfigured && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md w-full">
          <p className="font-bold">⚠️ Configuração necessária</p>
          <p className="text-sm mt-1">
            O administrador precisa configurar o Supabase para habilitar a autenticação.
            Consulte o arquivo README.md para instruções.
          </p>
        </div>
      )}
      
      <form onSubmit={handleLogin} className="w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            required
            minLength={6}
          />
          {isSignUp && (
            <p className="mt-1 text-xs text-gray-500">
              A senha deve ter pelo menos 6 caracteres
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !supabaseConfigured}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage('');
          }}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isSignUp ? 'Já tem uma conta? Entre' : 'Não tem uma conta? Cadastre-se'}
        </button>
      </div>
      
      {/* Modo de desenvolvimento - Credenciais de teste */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-3 bg-gray-100 rounded-md w-full text-xs">
          <p className="font-bold text-gray-700">Modo de desenvolvimento</p>
          <p className="mt-1 text-gray-600">
            Se a autenticação estiver configurada, você pode usar estas credenciais de teste:
          </p>
          <div className="mt-2 bg-white p-2 rounded border border-gray-200">
            <p><strong>Email:</strong> teste@exemplo.com</p>
            <p><strong>Senha:</strong> senha123</p>
            <p className="mt-1 text-gray-500 italic">
              Nota: Você precisa criar estas credenciais no dashboard do Supabase primeiro.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 