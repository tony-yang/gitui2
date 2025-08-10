import Image from "next/image";

import { readReposApiV1ReposGet } from "./_client";
import Repos from "@/app/_components/repos";


export default async function Home() {
  
  const repos = await readReposApiV1ReposGet();
  console.log("==== repos ==");
  console.log(repos)


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Repos repos={repos.data} />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
