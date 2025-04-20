'use client';

import { useState } from 'react';
import { DBTopics, topicData } from '../data/topics';

interface ModuleTopicProps {
  topic: DBTopics;
  onComplete: () => void;
  onNextTopic: () => void;
  isCompleted: boolean;
}

export default function ModuleTopic({ 
  topic, 
  onComplete, 
  onNextTopic,
  isCompleted 
}: ModuleTopicProps) {
  const [hasInteracted, setHasInteracted] = useState(isCompleted);
  const topicContent = topicData[topic];
  
  // Função para marcar o tópico como concluído
  const handleComplete = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete();
    }
  };
  
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">{topicContent.title}</h1>
      
      {/* Conteúdo principal do tópico */}
      <div 
        className="prose prose-blue max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: topicContent.content }}
      />
      
      {/* Tabelas comparativas */}
      {topicContent.tableCompare && topicContent.tableCompare.map((table, tableIndex) => (
        <div key={tableIndex} className="my-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">{table.title}</h3>
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {table.headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="px-6 py-4 whitespace-normal text-sm text-gray-500 border-r last:border-r-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      
      {/* Exemplos */}
      {topicContent.examples && topicContent.examples.length > 0 && (
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-2">Exemplos</h3>
          <ul className="bg-gray-50 p-4 rounded-lg">
            {topicContent.examples.map((example, index) => (
              <li key={index} className="mb-2 flex items-start">
                <span className="mr-2 text-blue-500 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Dicas do professor */}
      {topicContent.tips && topicContent.tips.length > 0 && (
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-2">Dicas do Professor</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            {topicContent.tips.map((tip, index) => (
              <div key={index} className={index > 0 ? 'mt-3' : ''}>
                <p className="text-yellow-800">
                  <span className="font-bold mr-2">💡</span>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Botão de navegação e interação */}
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center">
        {!hasInteracted ? (
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Marcar como concluído e prosseguir
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center">
            <span className="text-green-600 flex items-center mb-4 sm:mb-0">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tópico concluído!
            </span>
            <button
              onClick={onNextTopic}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Próximo tópico
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 