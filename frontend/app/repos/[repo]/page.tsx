import { Folder } from "lucide-react";

import { getRepoApiV1ReposRepoNameGet } from "@/app/_client"
import  RepoHeader from "@/components/repo-header"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card";

function RepoTreeCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">
                    <Folder className="w-5 h-5">Files</Folder>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    File Tree
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
                <RepoHeader repo={resp.data} />

                <div className="space-y-6">
                    Recent commits
                </div>

                <div className="space-y-6">
                    <RepoTreeCard />
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