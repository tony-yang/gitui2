"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

import { RepoResponse } from "@/app/_client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function RepoCard({ repo }: { repo: RepoResponse }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">
                    <Link href={`/repos/${repo.name}`} className="hover:text-primary transiton-colors">
                    {repo.name}
                    </Link>
                </CardTitle>
                <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="font-bold">Last Commit</div>
                    <div>{repo.last_commit_time}</div>
                    <div>{repo.last_commit_message}</div>
                    <div><span>Author: </span>{repo.last_commit_author}</div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function Repos({ repos }: {
    repos: RepoResponse[] | undefined
}) {
    if (!repos) {
        repos = [];
    }
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRepos = useMemo(() => {
        return repos?.filter(repo =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [repos, searchTerm])
    return (
        <div className="w-full space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Filter by repo name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full max-w-sm"
                />
            </div>
            {filteredRepos.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {filteredRepos.map(repo => (
                      <RepoCard key={repo.name} repo={repo} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-semibold">No repos found.</p>
                </div>
            )}
        </div>
    );
}