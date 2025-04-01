import Image from "next/image";
import Example from "./components/cloud";

export default function Home() {
  return (
    <div>
      <main className="fixed left-1/2 -translate-x-1/2 top-1/2 z-9999 text-5xl font-bold text-blue" >
        Welcome to Parallel World!!!
      </main>
      <Example />
    </div>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     Welcome to Parallel World!!!
    //   </main>
    //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://github.com/oldboylys/parallelworld"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to github →
    //     </a>
    //   </footer>
    // </div>
  );
}
