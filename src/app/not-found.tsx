'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* 404 with SynthWave effect */}
        <div className="synthwave-text" data-text="404">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            404
          </h1>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Página Não Encontrada
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            Voltar ao Início
          </Link>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>

        {/* Decorative elements */}
        <div className="relative mt-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="synthwave-glow-box w-32 h-32 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}