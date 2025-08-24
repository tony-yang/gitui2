import { Folder } from "lucide-react";

import FileExplore from "@/components/file-explore";
import {
    RepoResponse,
    getRepoApiV1ReposRepoNameGet,
} from "@/app/_client"
import  RepoHeader from "@/components/repo-header"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card";

function RepoTreeCard({ repo }:
    { repo: RepoResponse }
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
                    <FileExplore repo={repo} />
                </div>
            </CardContent>
        </Card>
    )
}

export default async function RepoPage({
    params,
}: {
    params: { repo: string };
}) {
    const { repo } = await params;
    const resp = await getRepoApiV1ReposRepoNameGet({
        path: {
            repo_name: repo,
        },
        responseType: "json",
    });
    if ( resp.error ) {
        console.log(resp.error);
    }

    return (
        <div className="font-sans min-h-screen pb-20 gap-6">
        {resp.data ? (
            <div>
                <RepoHeader repo={resp.data || {} as RepoResponse} />

                <div className="space-y-6">
                    Recent commits
                </div>

                <div className="space-y-6">
                    <RepoTreeCard repo={resp.data || {} as RepoResponse} />
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