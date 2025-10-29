export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 text-center text-xs text-[--muted]">
      {new Date().getFullYear()} Paxá, projeto usando a licença <a href="https://unlicense.org/" target="_blank" rel="noopener noreferrer">UnLicense</a>.
    </footer>
  );
}
