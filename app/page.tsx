import Image from "next/image";

export default function Home() {
  return (
    <Image
      className="dark:invert"
      src="/images/logo.svg"
      alt="Next.js logo"
      width={180}
      height={38}
      priority
    />
  );
}
