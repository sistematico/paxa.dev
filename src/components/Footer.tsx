export default function Footer() {
  return (
    <footer className="sticky z-50 bg-background bottom-0 border-2 border-black/40 text-foreground/50 text-sm p-3">
      <div className="w-full max-w-lg mx-auto text-center">&copy; {new Date().getFullYear()} Paxá</div>
    </footer>
  );
}
