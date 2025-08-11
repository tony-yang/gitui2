import { readReposApiV1ReposGet } from "@/app/_client";
import Repos from "@/app/_components/repos";


export default async function Home() {
  
  const repos = await readReposApiV1ReposGet();
  console.log("==== repos ==");
  console.log(repos)


  return (
    <div className="font-sans min-h-screen pb-20 gap-16">
      <main className="w-full flex flex-col gap-[32px]">
        <Repos repos={repos.data} />
      </main>
    </div>
  );
}
