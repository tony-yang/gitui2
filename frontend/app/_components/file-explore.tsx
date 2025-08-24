"use client";

import {
    DirectoryContent,
    RepoResponse,
} from "@/app/_client"
import {
    File,
    Folder
} from "lucide-react";
import Link  from "next/link";

function FileExploreItem({ repoName, itemName, isDir }: { repoName: string, itemName: string, isDir: boolean }) {
    const linkClass = "text-sm flex items-center gap-3 p-2 border-b last:border-b-0 hover:bg-muted";

    if (isDir) {
        return (
            <Link
                href={`/repos/${repoName}/tree/main/${itemName}`}
                className={linkClass}
            >
                <Folder className="w-5 h-5">Files</Folder>
                <span className="truncate font-medium">{itemName}</span>
            </Link>
        )
    }

    return (
        <Link
            href={`/repos/${repoName}/blob/main/${itemName}`}
            className={linkClass}
        >
            <File className="w-5 h-5">Files</File>
            <span className="truncate font-medium">{itemName}</span>
        </Link>
    )
}

export default function FileExplore({ repo }: { repo: RepoResponse}) {
    const content = repo.content || {} as DirectoryContent
    const directories = content.directories as string[] || [];
    const files = content.files as string[] || [];

    if (!repo.name) {
        return (
            <div>Incorrect Repo Name</div>
        )
    }

    return (
        <div className="border rounded-md">
            {
                directories.map(item => (
                    <FileExploreItem key={item} repoName={repo.name || ""} itemName={item} isDir={true} />
                ))
            }
            {
                files.map(item => (
                    <FileExploreItem key={item} repoName={repo.name || ""} itemName={item} isDir={false} />
                ))
            }
        </div>
    )
}