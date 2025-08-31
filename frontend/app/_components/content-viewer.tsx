"use client";

import {
    FileResponse,
} from "@/app/_client"
import Editor from "@monaco-editor/react";

export default function ContentViewer({ repo }: { repo: FileResponse}) {
    const content = repo.content || ""
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