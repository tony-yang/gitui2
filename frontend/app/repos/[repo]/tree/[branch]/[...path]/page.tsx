import {
    DirectoryResponse,
    getDirContentApiV1ReposRepoNameTreeBranchDirNamesGet,
} from "@/app/_client"
import  RepoHeader from "@/components/repo-header"
 import RepoTreeCard from "@/components/repo-tree-card";

export default async function TreePage({
    params,
}: {
    params: { repo: string , branch: string, path: string[] };
}) {
    const { repo, branch, path } = await params;

    const resp = await getDirContentApiV1ReposRepoNameTreeBranchDirNamesGet({
        path: {
            repo_name: repo,
            branch: branch,
            dir_names: path.join("/"),
        },
        responseType: "json",
    });
    if ( resp.error ) {
        console.error(resp.error);
    }

    return (
        <div className="font-sans min-h-screen pb-20 gap-6">
            {resp.data ? (
                <div>
                    <RepoHeader repo={resp.data || {} as DirectoryResponse} />
    
                    <div className="space-y-6">
                        Recent commits
                    </div>
    
                    <div className="space-y-6">
                        <RepoTreeCard repo={resp.data || {} as DirectoryResponse} />
                    </div>
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-semibold">Error. No repos found.</p>
                </div>
            )}
        </div>
    )
}