"use client";

import {
    FileResponse,
} from "@/app/_client"
import Editor from "@monaco-editor/react";

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
        <div>
            <Editor
                height="50vh"
                defaultLanguage="python"
                defaultValue={content}
                theme="vs-dark"
            />
        </div>
    )
}