import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/7a191de3-ccd5-4fd3-aae7-1a087750d2a1.png" alt="Logo" className="h-8 w-8" />
                <h1 className="text-xl font-semibold text-foreground">LG REINVENT</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Alex" />
                <AvatarFallback>AX</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="flex-1 p-6 bg-portal-bg-primary">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>;
}