import { NavLink, useLocation } from "react-router-dom";
import { Home, Truck, Shield, Cog, Wrench, Search, TrendingUp } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
const navigationItems = [{
  title: "Home",
  url: "/",
  icon: Home
}, {
  title: "Supply Chain",
  url: "/supply-chain",
  icon: Truck
}, {
  title: "Quality",
  url: "/quality",
  icon: Shield
}, {
  title: "Production",
  url: "/production",
  icon: Cog
}, {
  title: "Maintenance",
  url: "/maintenance",
  icon: Wrench
}, {
  title: "Root Cause Analysis",
  url: "/root-cause-analysis",
  icon: Search
}, {
  title: "Kaizen",
  url: "/kaizen",
  icon: TrendingUp
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium hover:bg-sidebar-primary/90" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
  return <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            
            {!isCollapsed && <div className="flex items-center gap-2">
                <img src="/lovable-uploads/7a191de3-ccd5-4fd3-aae7-1a087750d2a1.png" alt="Logo" className="h-6 w-6" />
                <h2 className="text-sm font-semibold text-sidebar-foreground">LG Connections</h2>
              </div>}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-4 py-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={({
                  isActive
                }) => `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "text-gray-700 dark:text-gray-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-gray-700 dark:text-gray-200">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}