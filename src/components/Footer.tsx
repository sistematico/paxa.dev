export default function Footer() {
  return (
    <footer className="sticky z-50 bg-background bottom-0 border-2 border-black/40 text-foreground/70 text-sm p-3">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Paxá
      </div>
    </footer>
  );
}
