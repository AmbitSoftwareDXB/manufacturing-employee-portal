import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, XCircle, AlertTriangle, FileText, BarChart3 } from "lucide-react"

const qualityMetrics = [
  { label: "Overall Quality Score", value: "96.2%", trend: "+1.2%", color: "text-green-600" },
  { label: "Defect Rate", value: "0.8%", trend: "-0.3%", color: "text-green-600" },
  { label: "Customer Satisfaction", value: "4.7/5", trend: "+0.2", color: "text-blue-600" },
  { label: "First Pass Yield", value: "94.5%", trend: "+2.1%", color: "text-green-600" },
]

const inspectionResults = [
  { batch: "QC-2024-001", product: "Steel Components", status: "Passed", score: 98, inspector: "John Smith" },
  { batch: "QC-2024-002", product: "Electronics Assembly", status: "Failed", score: 76, inspector: "Sarah Johnson" },
  { batch: "QC-2024-003", product: "Plastic Parts", status: "Passed", score: 94, inspector: "Mike Wilson" },
  { batch: "QC-2024-004", product: "Wire Harness", status: "Under Review", score: 88, inspector: "Lisa Chen" },
]

const auditSchedule = [
  { audit: "ISO 9001 Compliance", date: "2024-01-15", status: "Scheduled", auditor: "External" },
  { audit: "Safety Standards Review", date: "2024-01-22", status: "In Progress", auditor: "Internal" },
  { audit: "Product Quality Assessment", date: "2024-01-29", status: "Completed", auditor: "External" },
]

export default function Quality() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quality Management</h1>
        <p className="text-muted-foreground">Monitor quality metrics, inspections, and compliance standards.</p>
      </div>

      {/* Quality Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quality Metrics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {qualityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className={`text-sm ${metric.color} flex items-center gap-1`}>
                    <BarChart3 className="h-3 w-3" />
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Inspection Results */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Inspection Results</h2>
          <Button>New Inspection</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Batch ID</th>
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Score</th>
                    <th className="text-left p-4 font-medium">Inspector</th>
                  </tr>
                </thead>
                <tbody>
                  {inspectionResults.map((result) => (
                    <tr key={result.batch} className="border-b">
                      <td className="p-4 font-mono text-sm">{result.batch}</td>
                      <td className="p-4">{result.product}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {result.status === "Passed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : result.status === "Failed" ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          <Badge variant={
                            result.status === "Passed" ? "default" :
                            result.status === "Failed" ? "destructive" : "secondary"
                          }>
                            {result.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Progress value={result.score} className="w-16" />
                          <span className="text-sm font-medium">{result.score}%</span>
                        </div>
                      </td>
                      <td className="p-4">{result.inspector}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Audit Schedule */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Audit Schedule</h2>
          <Button variant="outline">Schedule Audit</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {auditSchedule.map((audit, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={
                    audit.status === "Completed" ? "default" :
                    audit.status === "In Progress" ? "secondary" : "outline"
                  }>
                    {audit.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{audit.audit}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm font-medium">{audit.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auditor:</span>
                    <span className="text-sm font-medium">{audit.auditor}</span>
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