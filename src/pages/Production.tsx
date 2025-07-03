import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cog, Play, Pause, StopCircle, Activity, Clock, Target, Users } from "lucide-react"

const productionMetrics = [
  { label: "Overall Efficiency", value: "87%", trend: "+3%", color: "text-green-600" },
  { label: "Daily Output", value: "2,450", trend: "+150", color: "text-blue-600" },
  { label: "Downtime", value: "2.1h", trend: "-0.5h", color: "text-green-600" },
  { label: "Quality Rate", value: "96.8%", trend: "+1.1%", color: "text-green-600" },
]

const productionLines = [
  { line: "Line A", product: "Engine Components", status: "Running", progress: 78, target: 1000, current: 780 },
  { line: "Line B", product: "Electronic Parts", status: "Maintenance", progress: 0, target: 800, current: 0 },
  { line: "Line C", product: "Assembly Units", status: "Running", progress: 92, target: 600, current: 552 },
  { line: "Line D", product: "Steel Parts", status: "Stopped", progress: 45, target: 1200, current: 540 },
]

const todayShifts = [
  { shift: "Morning Shift", time: "06:00 - 14:00", supervisor: "David Brown", workers: 24, status: "Active" },
  { shift: "Afternoon Shift", time: "14:00 - 22:00", supervisor: "Emma Davis", workers: 20, status: "Scheduled" },
  { shift: "Night Shift", time: "22:00 - 06:00", supervisor: "Alex Johnson", workers: 16, status: "Scheduled" },
]

export default function Production() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Production Management</h1>
        <p className="text-muted-foreground">Monitor production lines, schedules, and operational efficiency.</p>
      </div>

      {/* Production Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Production Metrics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {productionMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className={`text-sm ${metric.color} flex items-center gap-1`}>
                    <Activity className="h-3 w-3" />
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Production Lines Status */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Production Lines</h2>
          <Button>Control Panel</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {productionLines.map((line) => (
            <Card key={line.line}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{line.line}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {line.status === "Running" ? (
                      <Play className="h-4 w-4 text-green-500" />
                    ) : line.status === "Maintenance" ? (
                      <Pause className="h-4 w-4 text-orange-500" />
                    ) : (
                      <StopCircle className="h-4 w-4 text-red-500" />
                    )}
                    <Badge variant={
                      line.status === "Running" ? "default" :
                      line.status === "Maintenance" ? "secondary" : "destructive"
                    }>
                      {line.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{line.product}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Production Progress</span>
                      <span>{line.current}/{line.target} units</span>
                    </div>
                    <Progress value={line.progress} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>Target: {line.target}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>Current: {line.current}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shift Schedule */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Today's Shifts</h2>
          <Button variant="outline">View Schedule</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Shift</th>
                    <th className="text-left p-4 font-medium">Time</th>
                    <th className="text-left p-4 font-medium">Supervisor</th>
                    <th className="text-left p-4 font-medium">Workers</th>
                    <th className="text-left p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayShifts.map((shift) => (
                    <tr key={shift.shift} className="border-b">
                      <td className="p-4 font-medium">{shift.shift}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {shift.time}
                        </div>
                      </td>
                      <td className="p-4">{shift.supervisor}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {shift.workers}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={shift.status === "Active" ? "default" : "secondary"}>
                          {shift.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}