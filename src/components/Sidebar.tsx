'use client';

import { useState } from 'react';
import { DBTopics, topicData } from '../data/topics';

interface SidebarProps {
  currentTopic: DBTopics;
  setCurrentTopic: (topic: DBTopics) => void;
  completedTopics: DBTopics[];
}

export default function Sidebar({ 
  currentTopic, 
  setCurrentTopic, 
  completedTopics 
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Função para determinar o status do tópico (atual, completo, bloqueado)
  const getTopicStatus = (topic: DBTopics) => {
    if (topic === currentTopic) return 'current';
    if (completedTopics.includes(topic)) return 'completed';
    
    // Verifica se o tópico anterior foi completado (para desbloquear)
    const topicOrder = Object.keys(topicData) as DBTopics[];
    const topicIndex = topicOrder.indexOf(topic);
    
    if (topicIndex === 0) return 'available'; // Primeiro tópico sempre disponível
    
    const previousTopic = topicOrder[topicIndex - 1];
    return completedTopics.includes(previousTopic) ? 'available' : 'locked';
  };
  
  return (
    <>
      {/* Menu Mobile (visível apenas em telas pequenas) */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between p-2 bg-blue-600 text-white rounded-md"
        >
          <span>Tópicos do Módulo</span>
          <svg 
            className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {mobileMenuOpen && (
          <nav className="mt-2 bg-white rounded-md shadow-md p-2">
            <TopicList 
              currentTopic={currentTopic}
              setCurrentTopic={setCurrentTopic}
              completedTopics={completedTopics}
              getTopicStatus={getTopicStatus}
              closeMobileMenu={() => setMobileMenuOpen(false)}
            />
          </nav>
        )}
      </div>
      
      {/* Menu Desktop */}
      <div className="hidden md:block">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Módulo 1: Fundamentos de Banco de Dados</h2>
        <nav>
          <TopicList 
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
            completedTopics={completedTopics}
            getTopicStatus={getTopicStatus}
          />
        </nav>
      </div>
    </>
  );
}

// Componente para a lista de tópicos (reutilizado no desktop e mobile)
function TopicList({ 
  currentTopic, 
  setCurrentTopic, 
  completedTopics,
  getTopicStatus,
  closeMobileMenu
}: {
  currentTopic: DBTopics;
  setCurrentTopic: (topic: DBTopics) => void;
  completedTopics: DBTopics[];
  getTopicStatus: (topic: DBTopics) => string;
  closeMobileMenu?: () => void;
}) {
  // Função para escolher o tópico
  const handleTopicClick = (topic: DBTopics) => {
    const status = getTopicStatus(topic);
    if (status === 'locked') return; // Não permite clicar em tópicos bloqueados
    
    setCurrentTopic(topic);
    if (closeMobileMenu) closeMobileMenu(); // Fecha o menu mobile se estiver aberto
  };
  
  return (
    <ul className="space-y-2">
      {(Object.keys(topicData) as DBTopics[]).map((topic) => {
        const status = getTopicStatus(topic);
        
        return (
          <li key={topic}>
            <button
              onClick={() => handleTopicClick(topic)}
              disabled={status === 'locked'}
              className={`w-full text-left py-2 px-3 rounded-md transition-colors flex items-center ${
                status === 'current' 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : status === 'completed'
                  ? 'bg-green-50 text-green-800 hover:bg-green-100'
                  : status === 'available'
                  ? 'hover:bg-gray-100'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Ícone de status */}
              <span className="mr-2">
                {status === 'completed' ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : status === 'current' ? (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.707-1.707a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                ) : status === 'locked' ? (
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              
              {/* Título do tópico */}
              <span className="flex-1 truncate">{topicData[topic].title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
} 