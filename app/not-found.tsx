import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Erro - 404</h2>
      <p>Página não encontrada</p>
      <Link href="/">Voltar</Link>
    </div>
  )
}