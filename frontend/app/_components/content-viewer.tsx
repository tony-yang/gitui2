"use client";

import {
    FileResponse,
} from "@/app/_client"

export default function ContentViewer({ repo }: { repo: FileResponse}) {
    const content = repo.content || ""
    console.log("content = ", content)
    console.log("repo name = ", repo)

    if (!repo.repo_name) {
        return (
            <div>Incorrect Repo Name</div>
        )
    }

    return (
        <div className="border rounded-md">
            {content}
        </div>
    )
}