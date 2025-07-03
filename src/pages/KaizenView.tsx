import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit3, Eye, Download, Calendar, User, Target, DollarSign, Clock, BarChart3, PieChart, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export interface KaizenInitiative {
  id: string
  title: string
  dateStarted: string
  dateCompleted?: string
  department: string
  problemStatement: string
  rootCauseSummary: string
  actionPlan: string
  owner: string
  status: "Proposed" | "In Progress" | "Completed" | "Archived"
  beforeKPIs: string
  afterKPIs: string
  timeSaved: number // in hours
  costSavings: number // in dollars
  dateCreated: string
  dateModified: string
  comments: Array<{
    id: string
    text: string
    author: string
    date: string
  }>
}

const STORAGE_KEY = "kaizen-initiatives"

const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1']

export default function KaizenView() {
  const [initiatives, setInitiatives] = useState<KaizenInitiative[]>([])
  const [filteredInitiatives, setFilteredInitiatives] = useState<KaizenInitiative[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Proposed" | "In Progress" | "Completed" | "Archived">("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedInitiative, setSelectedInitiative] = useState<KaizenInitiative | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingInitiative, setEditingInitiative] = useState<Partial<KaizenInitiative>>({})
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const { toast } = useToast()

  // Load initiatives from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsedInitiatives = JSON.parse(stored)
      setInitiatives(parsedInitiatives)
      setFilteredInitiatives(parsedInitiatives)
    } else {
      // Add sample data
      const sampleInitiatives: KaizenInitiative[] = [
        {
          id: "1",
          title: "Reduce Setup Time for Machine A",
          dateStarted: "2024-01-10",
          dateCompleted: "2024-02-15",
          department: "Production",
          problemStatement: "Machine A setup takes 45 minutes, causing production delays",
          rootCauseSummary: "Tools not organized, unclear procedures, multiple adjustments needed",
          actionPlan: "Implement 5S methodology, create setup checklist, standardize tool placement",
          owner: "John Smith",
          status: "Completed",
          beforeKPIs: "Setup time: 45 minutes, Daily production: 150 units",
          afterKPIs: "Setup time: 20 minutes, Daily production: 180 units",
          timeSaved: 125, // 25 min * 5 setups/day * 30 days / 60
          costSavings: 3750, // $30/hour * 125 hours
          dateCreated: "2024-01-10",
          dateModified: "2024-02-15",
          comments: [
            {
              id: "c1",
              text: "Great improvement! The new setup procedure is much clearer.",
              author: "Sarah Johnson",
              date: "2024-02-10"
            }
          ]
        },
        {
          id: "2",
          title: "Improve Quality Control Process",
          dateStarted: "2024-02-01",
          department: "Quality",
          problemStatement: "High defect rate in final inspection (8%)",
          rootCauseSummary: "Insufficient training, outdated procedures, inadequate testing equipment",
          actionPlan: "Update procedures, provide additional training, upgrade testing equipment",
          owner: "Mike Davis",
          status: "In Progress",
          beforeKPIs: "Defect rate: 8%, Inspection time: 15 min/unit",
          afterKPIs: "Target: Defect rate <3%, Inspection time: 12 min/unit",
          timeSaved: 0,
          costSavings: 0,
          dateCreated: "2024-02-01",
          dateModified: "2024-02-20",
          comments: [
            {
              id: "c2",
              text: "Training sessions scheduled for next week.",
              author: "Mike Davis",
              date: "2024-02-18"
            }
          ]
        },
        {
          id: "3",
          title: "Streamline Inventory Management",
          dateStarted: "2023-11-15",
          dateCompleted: "2024-01-30",
          department: "Supply Chain",
          problemStatement: "Excessive inventory holding costs and frequent stockouts",
          rootCauseSummary: "Manual tracking, poor demand forecasting, no automated reorder points",
          actionPlan: "Implement inventory management system, set automated reorder points, improve forecasting",
          owner: "Lisa Chen",
          status: "Completed",
          beforeKPIs: "Inventory holding cost: $50K/month, Stockouts: 15/month",
          afterKPIs: "Inventory holding cost: $35K/month, Stockouts: 3/month",
          timeSaved: 80,
          costSavings: 45000, // $15K/month * 3 months
          dateCreated: "2023-11-15",
          dateModified: "2024-01-30",
          comments: []
        }
      ]
      setInitiatives(sampleInitiatives)
      setFilteredInitiatives(sampleInitiatives)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleInitiatives))
    }
  }, [])

  // Filter initiatives
  useEffect(() => {
    let filtered = initiatives
    
    if (searchQuery) {
      filtered = filtered.filter(initiative => 
        initiative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        initiative.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(initiative => initiative.status === statusFilter)
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(initiative => initiative.department === departmentFilter)
    }
    
    setFilteredInitiatives(filtered)
  }, [initiatives, searchQuery, statusFilter, departmentFilter])

  const saveToStorage = (updatedInitiatives: KaizenInitiative[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInitiatives))
    setInitiatives(updatedInitiatives)
  }

  const createInitiative = () => {
    if (!editingInitiative.title || !editingInitiative.problemStatement) {
      toast({
        title: "Error",
        description: "Title and problem statement are required",
        variant: "destructive"
      })
      return
    }

    const newInitiative: KaizenInitiative = {
      id: Date.now().toString(),
      title: editingInitiative.title || "",
      dateStarted: editingInitiative.dateStarted || new Date().toISOString().split('T')[0],
      dateCompleted: editingInitiative.dateCompleted,
      department: editingInitiative.department || "",
      problemStatement: editingInitiative.problemStatement || "",
      rootCauseSummary: editingInitiative.rootCauseSummary || "",
      actionPlan: editingInitiative.actionPlan || "",
      owner: editingInitiative.owner || "Current User",
      status: editingInitiative.status as KaizenInitiative["status"] || "Proposed",
      beforeKPIs: editingInitiative.beforeKPIs || "",
      afterKPIs: editingInitiative.afterKPIs || "",
      timeSaved: editingInitiative.timeSaved || 0,
      costSavings: editingInitiative.costSavings || 0,
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      comments: []
    }

    const updatedInitiatives = [...initiatives, newInitiative]
    saveToStorage(updatedInitiatives)
    setEditingInitiative({})
    setIsCreateDialogOpen(false)
    
    toast({
      title: "Success",
      description: "Kaizen initiative created successfully"
    })
  }

  const updateInitiative = () => {
    if (!editingInitiative.id) return

    const updatedInitiatives = initiatives.map(initiative => 
      initiative.id === editingInitiative.id 
        ? { ...initiative, ...editingInitiative, dateModified: new Date().toISOString().split('T')[0] }
        : initiative
    )
    
    saveToStorage(updatedInitiatives)
    setEditingInitiative({})
    setIsCreateDialogOpen(false)
    
    toast({
      title: "Success",
      description: "Kaizen initiative updated successfully"
    })
  }

  const addComment = () => {
    if (!selectedInitiative || !newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Current User",
      date: new Date().toISOString().split('T')[0]
    }

    const updatedInitiatives = initiatives.map(initiative => 
      initiative.id === selectedInitiative.id 
        ? { ...initiative, comments: [...initiative.comments, comment] }
        : initiative
    )
    
    saveToStorage(updatedInitiatives)
    setSelectedInitiative({...selectedInitiative, comments: [...selectedInitiative.comments, comment]})
    setNewComment("")
    
    toast({
      title: "Success",
      description: "Comment added successfully"
    })
  }

  const exportData = () => {
    const csvContent = [
      "Title,Department,Owner,Status,Date Started,Date Completed,Problem Statement,Cost Savings,Time Saved",
      ...initiatives.map(initiative => 
        `"${initiative.title}","${initiative.department}","${initiative.owner}","${initiative.status}","${initiative.dateStarted}","${initiative.dateCompleted || ''}","${initiative.problemStatement}","${initiative.costSavings}","${initiative.timeSaved}"`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kaizen-initiatives-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Data exported successfully"
    })
  }

  // Analytics data
  const statusCounts = initiatives.reduce((acc, initiative) => {
    acc[initiative.status] = (acc[initiative.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const departmentStats = initiatives.reduce((acc, initiative) => {
    const dept = initiative.department
    if (!acc[dept]) {
      acc[dept] = { completed: 0, total: 0, savings: 0 }
    }
    acc[dept].total++
    if (initiative.status === "Completed") {
      acc[dept].completed++
      acc[dept].savings += initiative.costSavings
    }
    return acc
  }, {} as Record<string, { completed: number; total: number; savings: number }>)

  const monthlyData = initiatives
    .filter(i => i.status === "Completed")
    .reduce((acc, initiative) => {
      const month = initiative.dateCompleted?.substring(0, 7) || "Unknown"
      if (!acc[month]) {
        acc[month] = { month, completed: 0, savings: 0 }
      }
      acc[month].completed++
      acc[month].savings += initiative.costSavings
      return acc
    }, {} as Record<string, { month: string; completed: number; savings: number }>)

  const chartData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month))

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count
  }))

  const departments = [...new Set(initiatives.map(i => i.department))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kaizen Dashboard</h1>
          <p className="text-muted-foreground">Continuous improvement initiatives tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingInitiative({})}>
                <Plus className="h-4 w-4 mr-2" />
                New Initiative
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Initiatives</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{initiatives.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Target className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statusCounts.Completed || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-chart-3" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${initiatives.reduce((sum, i) => sum + i.costSavings, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                <Clock className="h-4 w-4 text-chart-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {initiatives.reduce((sum, i) => sum + i.timeSaved, 0)} hrs
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Overview */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Initiative Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name, value}) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(departmentStats).map(([dept, stats]) => (
                    <div key={dept} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{dept}</span>
                        <span>{stats.completed}/{stats.total} completed</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-chart-2 h-2 rounded-full" 
                          style={{width: `${(stats.completed / stats.total) * 100}%`}}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Savings: ${stats.savings.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search initiatives..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Proposed">Proposed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Initiatives List */}
          <div className="grid gap-4">
            {filteredInitiatives.map((initiative) => (
              <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{initiative.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {initiative.problemStatement}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        initiative.status === "Completed" ? "default" :
                        initiative.status === "In Progress" ? "secondary" :
                        initiative.status === "Proposed" ? "outline" : "destructive"
                      }>
                        {initiative.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedInitiative(initiative)
                          setIsViewDialogOpen(true)
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setEditingInitiative(initiative)
                          setIsCreateDialogOpen(true)
                        }}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {initiative.owner}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {initiative.department}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${initiative.costSavings.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {initiative.dateStarted}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Completion Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" fill="#8884d8" name="Completed Initiatives" />
                  <Line yAxisId="right" type="monotone" dataKey="savings" stroke="#82ca9d" name="Cost Savings ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingInitiative.id ? "Edit" : "Create New"} Kaizen Initiative
            </DialogTitle>
            <DialogDescription>
              Track continuous improvement initiatives using the Kaizen methodology
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingInitiative.title || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, title: e.target.value})}
                  placeholder="Initiative title"
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={editingInitiative.department || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, department: e.target.value})}
                  placeholder="Department or team"
                />
              </div>

              <div>
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  value={editingInitiative.owner || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, owner: e.target.value})}
                  placeholder="Responsible person"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editingInitiative.status || "Proposed"} onValueChange={(value) => setEditingInitiative({...editingInitiative, status: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Proposed">Proposed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateStarted">Date Started</Label>
                <Input
                  id="dateStarted"
                  type="date"
                  value={editingInitiative.dateStarted || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, dateStarted: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="dateCompleted">Date Completed</Label>
                <Input
                  id="dateCompleted"
                  type="date"
                  value={editingInitiative.dateCompleted || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, dateCompleted: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="problemStatement">Problem Statement</Label>
                <Textarea
                  id="problemStatement"
                  value={editingInitiative.problemStatement || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, problemStatement: e.target.value})}
                  placeholder="Describe the problem or opportunity"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="rootCauseSummary">Root Cause Summary</Label>
                <Textarea
                  id="rootCauseSummary"
                  value={editingInitiative.rootCauseSummary || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, rootCauseSummary: e.target.value})}
                  placeholder="Summary of root causes identified"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="actionPlan">Action Plan</Label>
                <Textarea
                  id="actionPlan"
                  value={editingInitiative.actionPlan || ""}
                  onChange={(e) => setEditingInitiative({...editingInitiative, actionPlan: e.target.value})}
                  placeholder="Steps to implement the improvement"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="timeSaved">Time Saved (hours)</Label>
                  <Input
                    id="timeSaved"
                    type="number"
                    value={editingInitiative.timeSaved || ""}
                    onChange={(e) => setEditingInitiative({...editingInitiative, timeSaved: parseFloat(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="costSavings">Cost Savings ($)</Label>
                  <Input
                    id="costSavings"
                    type="number"
                    value={editingInitiative.costSavings || ""}
                    onChange={(e) => setEditingInitiative({...editingInitiative, costSavings: parseFloat(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="beforeKPIs">Before KPIs</Label>
              <Textarea
                id="beforeKPIs"
                value={editingInitiative.beforeKPIs || ""}
                onChange={(e) => setEditingInitiative({...editingInitiative, beforeKPIs: e.target.value})}
                placeholder="Baseline measurements before improvement"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="afterKPIs">After KPIs</Label>
              <Textarea
                id="afterKPIs"
                value={editingInitiative.afterKPIs || ""}
                onChange={(e) => setEditingInitiative({...editingInitiative, afterKPIs: e.target.value})}
                placeholder="Results after improvement implementation"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editingInitiative.id ? updateInitiative : createInitiative}>
              {editingInitiative.id ? "Update" : "Create"} Initiative
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Initiative Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedInitiative && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInitiative.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant={
                    selectedInitiative.status === "Completed" ? "default" :
                    selectedInitiative.status === "In Progress" ? "secondary" :
                    selectedInitiative.status === "Proposed" ? "outline" : "destructive"
                  }>
                    {selectedInitiative.status}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Department</Label>
                    <p className="text-sm">{selectedInitiative.department}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Owner</Label>
                    <p className="text-sm">{selectedInitiative.owner}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Date Started</Label>
                    <p className="text-sm">{selectedInitiative.dateStarted}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Date Completed</Label>
                    <p className="text-sm">{selectedInitiative.dateCompleted || "Not completed"}</p>
                  </div>
                </div>

                <div>
                  <Label className="font-medium">Problem Statement</Label>
                  <p className="text-sm mt-1">{selectedInitiative.problemStatement}</p>
                </div>

                <div>
                  <Label className="font-medium">Root Cause Summary</Label>
                  <p className="text-sm mt-1">{selectedInitiative.rootCauseSummary}</p>
                </div>

                <div>
                  <Label className="font-medium">Action Plan</Label>
                  <p className="text-sm mt-1">{selectedInitiative.actionPlan}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Before KPIs</Label>
                    <p className="text-sm mt-1">{selectedInitiative.beforeKPIs}</p>
                  </div>
                  <div>
                    <Label className="font-medium">After KPIs</Label>
                    <p className="text-sm mt-1">{selectedInitiative.afterKPIs}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Time Saved</Label>
                    <p className="text-sm mt-1">{selectedInitiative.timeSaved} hours</p>
                  </div>
                  <div>
                    <Label className="font-medium">Cost Savings</Label>
                    <p className="text-sm mt-1">${selectedInitiative.costSavings.toLocaleString()}</p>
                  </div>
                </div>

                {/* Comments Section */}
                <div>
                  <Label className="font-medium">Comments</Label>
                  <div className="space-y-3 mt-2">
                    {selectedInitiative.comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-muted pl-4">
                        <div className="flex justify-between items-start">
                          <p className="text-sm">{comment.text}</p>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">by {comment.author}</p>
                      </div>
                    ))}
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addComment()}
                      />
                      <Button size="sm" onClick={addComment}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setEditingInitiative(selectedInitiative)
                  setIsCreateDialogOpen(true)
                  setIsViewDialogOpen(false)
                }}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}