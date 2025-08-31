import {
    DirectoryResponse,
    getRepoApiV1ReposRepoNameTreeBranchGet,
} from "@/app/_client"
import  RepoHeader from "@/components/repo-header"
import BranchSelector from "@/components/branch-selector";
import RepoTreeCard from "@/components/repo-tree-card";

export default async function RepoPage({
    params,
}: {
    params: { repo: string, branch: string };
}) {
    const { repo, branch } = await params;
    const resp = await getRepoApiV1ReposRepoNameTreeBranchGet({
        path: {
            repo_name: repo,
            branch: branch,
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
                    <span>Branch:</span>
                    <BranchSelector repo={resp.data} />
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