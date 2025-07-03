import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

const supplyMetrics = [
  { label: "On-Time Deliveries", value: "94%", trend: "+2%", color: "text-green-600" },
  { label: "Inventory Turnover", value: "8.2x", trend: "+0.5x", color: "text-blue-600" },
  { label: "Supplier Performance", value: "91%", trend: "-1%", color: "text-orange-600" },
  { label: "Cost Savings", value: "$45K", trend: "+12%", color: "text-green-600" },
]

const activeShipments = [
  { id: "SH-001", supplier: "Steel Corp", status: "In Transit", eta: "Tomorrow", progress: 75 },
  { id: "SH-002", supplier: "Electronics Ltd", status: "Delayed", eta: "3 days", progress: 45 },
  { id: "SH-003", supplier: "Components Inc", status: "Delivered", eta: "Completed", progress: 100 },
]

const inventoryAlerts = [
  { item: "Steel Sheets", level: "Low", quantity: "15 units", severity: "high" },
  { item: "Copper Wire", level: "Critical", quantity: "3 units", severity: "critical" },
  { item: "Safety Gear", level: "Normal", quantity: "120 units", severity: "normal" },
]

export default function SupplyChain() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Supply Chain Management</h1>
        <p className="text-muted-foreground">Monitor inventory, shipments, and supplier performance.</p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Key Metrics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {supplyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className={`text-sm ${metric.color} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Shipments */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Active Shipments</h2>
          <Button>Track New Shipment</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Shipment ID</th>
                    <th className="text-left p-4 font-medium">Supplier</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">ETA</th>
                    <th className="text-left p-4 font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {activeShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b">
                      <td className="p-4 font-mono text-sm">{shipment.id}</td>
                      <td className="p-4">{shipment.supplier}</td>
                      <td className="p-4">
                        <Badge variant={shipment.status === "Delivered" ? "default" : shipment.status === "Delayed" ? "destructive" : "secondary"}>
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="p-4">{shipment.eta}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Progress value={shipment.progress} className="flex-1" />
                          <span className="text-sm text-muted-foreground">{shipment.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Inventory Alerts */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Inventory Alerts</h2>
          <Button variant="outline">View All Inventory</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {inventoryAlerts.map((alert, index) => (
            <Card key={index} className={`border-l-4 ${
              alert.severity === "critical" ? "border-l-red-500" : 
              alert.severity === "high" ? "border-l-orange-500" : 
              "border-l-green-500"
            }`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{alert.item}</CardTitle>
                  {alert.severity === "critical" ? 
                    <AlertTriangle className="h-5 w-5 text-red-500" /> :
                    alert.severity === "high" ? 
                    <Clock className="h-5 w-5 text-orange-500" /> :
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  }
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Stock Level:</span>
                    <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "secondary" : "default"}>
                      {alert.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="text-sm font-medium">{alert.quantity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}