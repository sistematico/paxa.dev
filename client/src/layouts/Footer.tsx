import SimpleIcon from "../components/SimpleIcon"
import SiteStats from "../components/SiteStats"
import Popover from "../components/Popover"

function Footer() {
  return (
    <footer className="border-t-2 border-black/50 bg-background py-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-left">
            Projeto licenciado sob a licença{" "}
            <a
              href="https://unlicense.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition duration-300 hover:text-primary hover:no-underline"
            >
              UnLicense
            </a>
            .<br />
            Copyleft {new Date().getFullYear()}{" "}
            <Popover
              trigger="hover"
              content={<p>A propósito, meu nome é Lucas =)</p>}
            >
              {/* <span className="inline bg-indigo-500 p-1 rounded text-white"> */}
							<span className="inline cursor-pointer underline-dotted">
								Paxá
							</span>
							<span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></span>
            </Popover>
            {/* <div className="relative group inline">
							<span className="inline cursor-pointer underline-dotted">
								Paxá
							</span>
							<span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></span>
							<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								A propósito, meu nome é Lucas =)
							</div>
						</div> */}
            , fontes no{" "}
            <a
              href="https://github.com/sistematico/paxa.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition duration-300 hover:text-primary hover:no-underline"
            >
              Github
            </a>
            .
          </div>
          <div className="text-right">
            <div className="flex gap-3 items-center group">
              <a
                href="https://github.com/sistematico"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#f5f5f5]"
              >
                <SimpleIcon name="GitHub" size={22} />
              </a>
              <a
                href="https://reddit.com/u/lsbrum"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#ff4500]"
              >
                <SimpleIcon name="Reddit" size={22} />
              </a>
              <a
                href="https://mastodon.social/@sistematico"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#615ef8]"
              >
                <SimpleIcon name="Mastodon" size={22} />
              </a>
              <a
                href="https://t.me/sistematico"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#0088cc]"
              >
                <SimpleIcon name="Telegram" size={22} />
              </a>
              <a
                href="https://x.com/sistematico"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#1DA1F2]"
              >
                <SimpleIcon name="X" size={20} />
              </a>
              <a
                href="https://facebook.com/lsbrum"
                target="_blank"
                rel="noopener noreferrer"
                className="transition transform hover:scale-120 duration-500 hover:text-[#1877f2]"
              >
                <SimpleIcon name="Facebook" size={22} />
              </a>
              <SiteStats />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
