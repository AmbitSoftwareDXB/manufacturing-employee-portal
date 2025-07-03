import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield, Cog, Wrench, AlertCircle, Calendar, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LeaderboardDashboard } from "@/components/LeaderboardDashboard"

const quickAccessItems = [
  { title: "Supply Chain", icon: Truck, path: "/supply-chain", color: "bg-blue-500" },
  { title: "Quality", icon: Shield, path: "/quality", color: "bg-green-500" },
  { title: "Production", icon: Cog, path: "/production", color: "bg-orange-500" },
  { title: "Maintenance", icon: Wrench, path: "/maintenance", color: "bg-purple-500" },
]

const announcements = [
  {
    type: "New",
    title: "Company-wide Safety Training",
    description: "All employees are required to complete the new safety training module by the end of the month. Access the training through the Learning Center.",
    badge: "New",
    badgeColor: "bg-portal-announcement-new",
    icon: AlertCircle,
    imageAlt: "Safety training",
    imageSrc: "/lovable-uploads/a6000a25-7542-436e-8fb8-1855913ea051.png"
  },
  {
    type: "Update",
    title: "Production Schedule Changes",
    description: "Please review the updated production schedule for the upcoming week. Changes have been made to accommodate increased demand for Product X.",
    badge: "Update",
    badgeColor: "bg-portal-announcement-update",
    icon: Calendar,
    imageAlt: "Production schedule",
    imageSrc: "/lovable-uploads/66da8d26-7d1b-4bfc-810c-ee99469d456f.png"
  },
  {
    type: "Reminder",
    title: "Employee Satisfaction Survey",
    description: "Don't forget to complete the annual employee satisfaction survey. Your feedback is valuable and helps us improve the workplace.",
    badge: "Reminder",
    badgeColor: "bg-portal-announcement-reminder",
    icon: Users,
    imageAlt: "Survey form",
    imageSrc: "/lovable-uploads/76d345e2-06ca-4cb5-9c74-bb6993fdb7b7.png"
  }
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Alex</h1>
        <p className="text-muted-foreground">Here's what's happening in your workplace today.</p>
      </div>

      {/* Quick Access Section */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <Card key={item.title} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Button
                  variant="ghost"
                  className="w-full h-auto p-0 flex flex-col items-center gap-3"
                  onClick={() => navigate(item.path)}
                >
                  <div className={`p-3 rounded-full ${item.color} text-white`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-foreground">{item.title}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Leaderboard Dashboard */}
      <LeaderboardDashboard />

      {/* Announcements Section */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Announcements</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={`${announcement.badgeColor} text-white`}>
                    {announcement.badge}
                  </Badge>
                  <announcement.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {announcement.description}
                </CardDescription>
                <div className="mt-4 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={announcement.imageSrc} 
                    alt={announcement.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}