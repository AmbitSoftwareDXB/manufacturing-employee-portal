import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wrench, AlertTriangle, CheckCircle, Clock, Calendar, Settings, Zap } from "lucide-react"

const maintenanceMetrics = [
  { label: "Equipment Uptime", value: "97.8%", trend: "+1.2%", color: "text-green-600" },
  { label: "Planned vs Unplanned", value: "85/15", trend: "+5%", color: "text-blue-600" },
  { label: "MTTR (Hours)", value: "2.4", trend: "-0.6", color: "text-green-600" },
  { label: "Cost Savings", value: "$32K", trend: "+8%", color: "text-green-600" },
]

const equipmentStatus = [
  { equipment: "Conveyor Belt A", location: "Line 1", status: "Operational", lastMaintenance: "2024-01-10", nextDue: "2024-02-10" },
  { equipment: "Hydraulic Press B", location: "Line 2", status: "Maintenance Required", lastMaintenance: "2024-01-05", nextDue: "2024-01-20" },
  { equipment: "Welding Station C", location: "Assembly", status: "Under Repair", lastMaintenance: "2024-01-08", nextDue: "Overdue" },
  { equipment: "CNC Machine D", location: "Production Floor", status: "Operational", lastMaintenance: "2024-01-12", nextDue: "2024-02-12" },
]

const workOrders = [
  { id: "WO-001", equipment: "Motor Assembly", type: "Preventive", priority: "Medium", technician: "Tom Anderson", status: "In Progress", completion: 65 },
  { id: "WO-002", equipment: "Air Compressor", type: "Emergency", priority: "High", technician: "Lisa Garcia", status: "Assigned", completion: 0 },
  { id: "WO-003", equipment: "Control Panel", type: "Corrective", priority: "Low", technician: "Mark Thompson", status: "Completed", completion: 100 },
]

const scheduledMaintenance = [
  { equipment: "Generator Unit", type: "Quarterly Inspection", date: "2024-01-25", technician: "Service Team A" },
  { equipment: "Cooling System", type: "Filter Replacement", date: "2024-01-28", technician: "Mike Rodriguez" },
  { equipment: "Safety Systems", type: "Annual Certification", date: "2024-02-01", technician: "External Auditor" },
]

export default function Maintenance() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Maintenance Management</h1>
        <p className="text-muted-foreground">Monitor equipment status, work orders, and maintenance schedules.</p>
      </div>

      {/* Maintenance Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Maintenance Metrics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {maintenanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className={`text-sm ${metric.color} flex items-center gap-1`}>
                    <Zap className="h-3 w-3" />
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Equipment Status */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Equipment Status</h2>
          <Button>Asset Registry</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Equipment</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Last Maintenance</th>
                    <th className="text-left p-4 font-medium">Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentStatus.map((equipment, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{equipment.equipment}</td>
                      <td className="p-4">{equipment.location}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {equipment.status === "Operational" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : equipment.status === "Under Repair" ? (
                            <Settings className="h-4 w-4 text-red-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          <Badge variant={
                            equipment.status === "Operational" ? "default" :
                            equipment.status === "Under Repair" ? "destructive" : "secondary"
                          }>
                            {equipment.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">{equipment.lastMaintenance}</td>
                      <td className="p-4">
                        <span className={equipment.nextDue === "Overdue" ? "text-red-500 font-medium" : ""}>
                          {equipment.nextDue}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Active Work Orders */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Active Work Orders</h2>
          <Button>Create Work Order</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {workOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <Badge variant={
                    order.priority === "High" ? "destructive" :
                    order.priority === "Medium" ? "secondary" : "outline"
                  }>
                    {order.priority}
                  </Badge>
                </div>
                <CardDescription>{order.equipment} - {order.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{order.completion}%</span>
                    </div>
                    <Progress value={order.completion} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Technician:</span>
                      <span>{order.technician}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={order.status === "Completed" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Scheduled Maintenance */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Upcoming Scheduled Maintenance</h2>
          <Button variant="outline">View Calendar</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {scheduledMaintenance.map((maintenance, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{maintenance.date}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{maintenance.equipment}</CardTitle>
                <CardDescription>{maintenance.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Assigned to:</span>
                  <span className="text-sm font-medium">{maintenance.technician}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}