import { SiReddit  } from '@icons-pack/react-simple-icons';

export default function Footer() {
  return (
    <footer className="sticky z-50 bg-surface bottom-0 border-t border-border text-muted text-sm p-3">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between gap-2 text-center md:text-left">
        <div>
          &copy; {new Date().getFullYear()} Paxá
        </div>
        <div className="flex items-center gap-1 justify-center md:justify-end">          
          <a className="flex items-center gap-1" href="https://reddit.com/u/sistematico" target="_blank" rel="noopener noreferrer">
            <SiReddit className="w-4 h-4" />
            Reddit
          </a>
        </div>
      </div>
    </footer>
  );
}
