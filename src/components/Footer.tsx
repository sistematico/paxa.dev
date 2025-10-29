export default function Footer() {
  return (
    <footer className="text-center text-xs text-[--muted]">
      {new Date().getFullYear()} Paxá, projeto usando a licença <a href="https://unlicense.org/" target="_blank" rel="noopener noreferrer">UnLicense</a>.
    </footer>
  );
}
