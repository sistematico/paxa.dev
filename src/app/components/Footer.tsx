export default function Footer() {
  return (
    <footer className="text-sm text-foreground/50 bg-background border-t-2 border-black/50 sticky z-50 bottom-0">
      <div className="container mx-auto p-4 md:px-0">
        &copy; {new Date().getFullYear()} Paxá
      </div>
    </footer>
  );
}
