import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

// // Temas escuros
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

// // Temas claros
// import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  children: string
  language: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  language,
  showLineNumbers = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group w-full overflow-hidden">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-t-lg border-b border-black/50">
        <span className="text-xs font-mono text-gray-400 uppercase">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!mt-0 !rounded-t-none !rounded-b-lg"
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            maxWidth: "100%"
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
