"use client";

import {
    DirectoryContent,
    DirectoryResponse,
} from "@/app/_client"
import {
    File,
    Folder
} from "lucide-react";
import Link  from "next/link";

function FileExploreItem(
    { repoName, branch, parentDir, itemName, isDir }:
    { repoName: string, branch: string, parentDir: string, itemName: string, isDir: boolean }
) {
    const linkClass = "text-sm flex items-center gap-3 p-2 border-b last:border-b-0 hover:bg-muted";

    if (isDir) {
        return (
            <Link
                href={`/repos/${repoName}/tree/${branch}/${parentDir}${itemName}`}
                className={linkClass}
            >
                <Folder className="w-5 h-5" />
                <span className="truncate font-medium">{itemName}</span>
            </Link>
        )
    }

    return (
        <Link
            href={`/repos/${repoName}/blob/${branch}/${parentDir}${itemName}`}
            className={linkClass}
        >
            <File className="w-5 h-5" />
            <span className="truncate font-medium">{itemName}</span>
        </Link>
    )
}

export default function FileExplore({ repo }: { repo: DirectoryResponse}) {
    const repo_name = repo.repo_name || ""
    const branch = repo.selected_branch || ""
    const content = repo.content || {} as DirectoryContent
    const directories = content.directories as string[] || [];
    const files = content.files as string[] || [];
    const parent_dir = content.parent_directories && content.parent_directories + "/" as string || "";

    if (!repo_name || !branch) {
        return (
            <div>Incorrect Repo Name</div>
        )
    }

    return (
        <div className="border rounded-md">
            {
                directories.map(item => (
                    <FileExploreItem key={item} repoName={repo_name} branch={branch} parentDir={parent_dir} itemName={item} isDir={true} />
                ))
            }
            {
                files.map(item => (
                    <FileExploreItem key={item} repoName={repo_name} branch={branch} parentDir={parent_dir} itemName={item} isDir={false} />
                ))
            }
        </div>
    )
}