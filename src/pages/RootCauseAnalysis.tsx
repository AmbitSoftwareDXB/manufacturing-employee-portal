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
import { Search, Plus, Edit3, Eye, FileText, Download, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface RootCauseRecord {
  id: string
  title: string
  problemStatement: string
  why1: string
  why2: string
  why3: string
  why4: string
  why5: string
  rootCauseSummary: string
  correctiveActions: string
  status: "draft" | "final"
  owner: string
  dateCreated: string
  dateModified: string
}

const STORAGE_KEY = "root-cause-analysis-records"

export default function RootCauseAnalysis() {
  const [records, setRecords] = useState<RootCauseRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<RootCauseRecord[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "final">("all")
  const [selectedRecord, setSelectedRecord] = useState<RootCauseRecord | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<Partial<RootCauseRecord>>({})
  const { toast } = useToast()

  // Load records from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsedRecords = JSON.parse(stored)
      setRecords(parsedRecords)
      setFilteredRecords(parsedRecords)
    } else {
      // Add some sample data
      const sampleRecords: RootCauseRecord[] = [
        {
          id: "1",
          title: "Production Line Downtime",
          problemStatement: "Production line stopped unexpectedly causing 2-hour delay",
          why1: "Machine sensor malfunctioned",
          why2: "Sensor was not calibrated properly",
          why3: "Calibration schedule was not followed",
          why4: "No clear responsibility for calibration",
          why5: "Lack of documented maintenance procedures",
          rootCauseSummary: "Missing documented maintenance procedures and unclear responsibilities",
          correctiveActions: "Create maintenance SOPs and assign clear ownership",
          status: "final",
          owner: "Alex Johnson",
          dateCreated: "2024-01-15",
          dateModified: "2024-01-16"
        },
        {
          id: "2", 
          title: "Quality Control Issue",
          problemStatement: "Defective products found in final inspection",
          why1: "Quality check missed defects",
          why2: "Inspector was rushed",
          why3: "High workload during shift",
          why4: "Understaffed quality department",
          why5: "Budget constraints on hiring",
          rootCauseSummary: "Insufficient staffing in quality department due to budget constraints",
          correctiveActions: "Request budget approval for additional QC staff",
          status: "draft",
          owner: "Sarah Smith",
          dateCreated: "2024-01-20",
          dateModified: "2024-01-20"
        }
      ]
      setRecords(sampleRecords)
      setFilteredRecords(sampleRecords)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRecords))
    }
  }, [])

  // Filter records based on search and status
  useEffect(() => {
    let filtered = records
    
    if (searchQuery) {
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.owner.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(record => record.status === statusFilter)
    }
    
    setFilteredRecords(filtered)
  }, [records, searchQuery, statusFilter])

  const saveToStorage = (updatedRecords: RootCauseRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords))
    setRecords(updatedRecords)
  }

  const createRecord = () => {
    if (!editingRecord.title || !editingRecord.problemStatement) {
      toast({
        title: "Error",
        description: "Title and problem statement are required",
        variant: "destructive"
      })
      return
    }

    const newRecord: RootCauseRecord = {
      id: Date.now().toString(),
      title: editingRecord.title || "",
      problemStatement: editingRecord.problemStatement || "",
      why1: editingRecord.why1 || "",
      why2: editingRecord.why2 || "",
      why3: editingRecord.why3 || "",
      why4: editingRecord.why4 || "",
      why5: editingRecord.why5 || "",
      rootCauseSummary: editingRecord.rootCauseSummary || "",
      correctiveActions: editingRecord.correctiveActions || "",
      status: editingRecord.status as "draft" | "final" || "draft",
      owner: "Current User", // In real app, this would come from auth
      dateCreated: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0]
    }

    const updatedRecords = [...records, newRecord]
    saveToStorage(updatedRecords)
    setEditingRecord({})
    setIsCreateDialogOpen(false)
    
    toast({
      title: "Success",
      description: "Root cause analysis created successfully"
    })
  }

  const viewRecord = (record: RootCauseRecord) => {
    setSelectedRecord(record)
    setIsViewDialogOpen(true)
  }

  const editRecord = (record: RootCauseRecord) => {
    setEditingRecord(record)
    setIsCreateDialogOpen(true)
  }

  const updateRecord = () => {
    if (!editingRecord.id) return

    const updatedRecords = records.map(record => 
      record.id === editingRecord.id 
        ? { ...record, ...editingRecord, dateModified: new Date().toISOString().split('T')[0] }
        : record
    )
    
    saveToStorage(updatedRecords)
    setEditingRecord({})
    setIsCreateDialogOpen(false)
    
    toast({
      title: "Success",
      description: "Root cause analysis updated successfully"
    })
  }

  const exportRecord = (record: RootCauseRecord) => {
    const csvContent = `Title,${record.title}
Problem Statement,${record.problemStatement}
Why 1,${record.why1}
Why 2,${record.why2}
Why 3,${record.why3}
Why 4,${record.why4}
Why 5,${record.why5}
Root Cause Summary,${record.rootCauseSummary}
Corrective Actions,${record.correctiveActions}
Status,${record.status}
Owner,${record.owner}
Date Created,${record.dateCreated}`

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rca-${record.title.replace(/\s+/g, '-').toLowerCase()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Record exported successfully"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Root Cause Analysis</h1>
          <p className="text-muted-foreground">5-Why methodology for systematic problem solving</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRecord({})}>
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecord.id ? "Edit" : "Create New"} Root Cause Analysis
              </DialogTitle>
              <DialogDescription>
                Use the 5-Why methodology to identify the root cause of problems
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingRecord.title || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, title: e.target.value})}
                  placeholder="Brief description of the problem"
                />
              </div>
              
              <div>
                <Label htmlFor="problemStatement">Problem Statement</Label>
                <Textarea
                  id="problemStatement"
                  value={editingRecord.problemStatement || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, problemStatement: e.target.value})}
                  placeholder="Describe the problem in detail"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>5-Why Analysis</Label>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num}>
                    <Label htmlFor={`why${num}`}>Why #{num}</Label>
                    <Input
                      id={`why${num}`}
                      value={editingRecord[`why${num}` as keyof RootCauseRecord] as string || ""}
                      onChange={(e) => setEditingRecord({
                        ...editingRecord, 
                        [`why${num}`]: e.target.value
                      })}
                      placeholder={`Why did this happen? (Step ${num})`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="rootCauseSummary">Root Cause Summary</Label>
                <Textarea
                  id="rootCauseSummary"
                  value={editingRecord.rootCauseSummary || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, rootCauseSummary: e.target.value})}
                  placeholder="Summarize the identified root cause"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="correctiveActions">Corrective Actions</Label>
                <Textarea
                  id="correctiveActions"
                  value={editingRecord.correctiveActions || ""}
                  onChange={(e) => setEditingRecord({...editingRecord, correctiveActions: e.target.value})}
                  placeholder="What actions will be taken to prevent recurrence?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editingRecord.status || "draft"} onValueChange={(value) => setEditingRecord({...editingRecord, status: value as "draft" | "final"})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingRecord.id ? updateRecord : createRecord}>
                {editingRecord.id ? "Update" : "Create"} Analysis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, problem, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "draft" | "final")}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="final">Final</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{record.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {record.problemStatement}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={record.status === "final" ? "default" : "secondary"}>
                    {record.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => viewRecord(record)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => editRecord(record)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => exportRecord(record)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {record.owner}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {record.dateCreated}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No records found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first root cause analysis to get started"
                }
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Analysis
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecord.title}</DialogTitle>
                <DialogDescription>
                  Root Cause Analysis - {selectedRecord.status}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Problem Statement</Label>
                  <p className="text-sm mt-1">{selectedRecord.problemStatement}</p>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">5-Why Analysis</Label>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="border-l-2 border-muted pl-4">
                      <Label className="text-sm font-medium">Why #{num}</Label>
                      <p className="text-sm">{selectedRecord[`why${num}` as keyof RootCauseRecord] as string || "Not filled"}</p>
                    </div>
                  ))}
                </div>

                {selectedRecord.rootCauseSummary && (
                  <div>
                    <Label className="font-medium">Root Cause Summary</Label>
                    <p className="text-sm mt-1">{selectedRecord.rootCauseSummary}</p>
                  </div>
                )}

                {selectedRecord.correctiveActions && (
                  <div>
                    <Label className="font-medium">Corrective Actions</Label>
                    <p className="text-sm mt-1">{selectedRecord.correctiveActions}</p>
                  </div>
                )}

                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div>Owner: {selectedRecord.owner}</div>
                  <div>Created: {selectedRecord.dateCreated}</div>
                  <div>Modified: {selectedRecord.dateModified}</div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => exportRecord(selectedRecord)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button onClick={() => editRecord(selectedRecord)}>
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