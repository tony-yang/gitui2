"use client";

import { Folder } from "lucide-react";
import FileExplore from "@/components/file-explore";
import {
    DirectoryResponse,
} from "@/app/_client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function RepoTreeCard({ repo }:
    { repo: DirectoryResponse }
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