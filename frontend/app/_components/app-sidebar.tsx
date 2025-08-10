import Link from "next/link";
import { Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
export function AppSidebar() {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md p-4 text-lg"
            href="/"
          >Git UI</Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}