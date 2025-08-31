import { Folder } from "lucide-react";

import ContentViewer from "@/components/content-viewer";
import {
    FileResponse,
    getFileContentApiV1ReposRepoNameBlobBranchFileNameGet,
} from "@/app/_client"
import  RepoHeader from "@/components/repo-header"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BranchSelector from "@/components/branch-selector";

function FileContentCard({ repo }:
    { repo: FileResponse }
) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg leading-none flex gap-2">
                    <Folder className="w-5 h-5" />File Explorer
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <ContentViewer repo={repo} />
                </div>
            </CardContent>
        </Card>
    )
}

export default async function BlobPage({
    params,
}: {
    params: { repo: string , branch: string, path: string[] };
}) {
    const { repo, branch, path } = await params;
    console.log("repo = %s", repo);
    console.log("tree branch = ", branch)
    console.log("tree Path = ", path)

    const resp = await getFileContentApiV1ReposRepoNameBlobBranchFileNameGet({
        path: {
            repo_name: repo,
            branch: branch,
            file_name: path.join("/"),
        },
        responseType: "json",
    });
    if ( resp.error ) {
        console.error(resp.error);
    }

    console.log("resp data = ", resp.data);

    return (
        <div className="font-sans min-h-screen pb-20 gap-6">
            {resp.data?.repo_name ? (
                <div>
                    <RepoHeader repo={resp.data || {} as FileResponse} />

                    <div className="space-y-6">
                        Recent commits
                    </div>

                    <div className="space-y-6">
                        <span>Branch:</span>
                        <BranchSelector repo={resp.data} />
                    </div>

                    <div className="space-y-6">
                        <FileContentCard repo={resp.data || {} as FileResponse} />
                    </div>
                </div>
            ) : (
                <div className="text-center text-muted-foreground">
                    <p className="text-lg font-semibold">Error. No file found.</p>
                </div>
            )}
        </div>
    )
}