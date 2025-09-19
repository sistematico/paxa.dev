export default function Home() {
  return (
    <div className="text-center">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Paxá
          </h1>
          <p className="text-lg md:text-xl text-foreground/80">
            Desenvolvedor Web
          </p>
        </header>
        
        <div className="space-y-6">
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            Bem-vindo ao meu espaço digital. Aqui você encontra projetos, 
            experiências e paixão por desenvolvimento web.
          </p>
        </div>
      </div>
    </div>
  );
}
