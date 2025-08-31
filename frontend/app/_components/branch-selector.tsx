"use client";

import {
    DirectoryResponse,
} from "@/app/_client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Link  from "next/link";

export default function BranchSelector({ repo }: { repo: DirectoryResponse}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{repo.selected_branch}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={repo.selected_branch || "main"}>
                {
                    repo.branches?.map(item => (
                        <Link key={item} href={`/repos/${repo.repo_name || "none"}/tree/${item}`}>
                            <DropdownMenuRadioItem key={item} value={item}>
                                <span className="font-medium">{item}</span>
                            </DropdownMenuRadioItem>
                        </Link>
                    ))
                }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}