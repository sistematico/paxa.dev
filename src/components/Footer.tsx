export default function Footer() {
  return (
    <footer className="sticky z-50 bg-surface bottom-0 border-t border-border text-muted text-sm p-3">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Paxá
      </div>
    </footer>
  );
}
