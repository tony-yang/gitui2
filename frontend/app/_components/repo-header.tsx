import { RepoResponse } from "@/app/_client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function RepoHeader({ repo }: {
    repo: RepoResponse
}) {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href={`/repos/${repo.name}`}>{repo.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold">{repo.name}</h2>
            </div>
            <p className="text-muted-foreground mt-1">{repo.description}</p>
        </div>
    )
}