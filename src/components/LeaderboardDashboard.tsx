import { useState, useEffect } from "react"
import { Star, Trophy, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data types
interface HourlyData {
  time: string
  value: number
  hasStar: boolean
}

interface LineData {
  lineName: string
  shift: string
  currentPercentage: number
  leaderboardScore: number
  hourlyPerformanceData: HourlyData[]
}

// Mock data
const mockLeaderboardData: LineData[] = [
  {
    lineName: "Line 2",
    shift: "A Shift",
    currentPercentage: 88.0,
    leaderboardScore: 22,
    hourlyPerformanceData: [
      { time: "3 AM", value: 85, hasStar: true },
      { time: "5 AM", value: 78, hasStar: false },
      { time: "7 AM", value: 92, hasStar: true },
      { time: "9 AM", value: 88, hasStar: false },
      { time: "11 AM", value: 90, hasStar: true },
      { time: "1 PM", value: 88, hasStar: false },
    ]
  },
  {
    lineName: "Line 3",
    shift: "B Shift",
    currentPercentage: 82.5,
    leaderboardScore: 18,
    hourlyPerformanceData: [
      { time: "3 AM", value: 80, hasStar: false },
      { time: "5 AM", value: 85, hasStar: true },
      { time: "7 AM", value: 78, hasStar: false },
      { time: "9 AM", value: 82, hasStar: false },
      { time: "11 AM", value: 86, hasStar: true },
      { time: "1 PM", value: 82, hasStar: false },
    ]
  },
  {
    lineName: "Packaging Line 2",
    shift: "A Shift",
    currentPercentage: 75.8,
    leaderboardScore: 16,
    hourlyPerformanceData: [
      { time: "3 AM", value: 72, hasStar: false },
      { time: "5 AM", value: 68, hasStar: false },
      { time: "7 AM", value: 80, hasStar: true },
      { time: "9 AM", value: 75, hasStar: false },
      { time: "11 AM", value: 78, hasStar: false },
      { time: "1 PM", value: 76, hasStar: false },
    ]
  },
  {
    lineName: "Line 1",
    shift: "C Shift",
    currentPercentage: 71.2,
    leaderboardScore: 14,
    hourlyPerformanceData: [
      { time: "3 AM", value: 70, hasStar: false },
      { time: "5 AM", value: 75, hasStar: false },
      { time: "7 AM", value: 68, hasStar: false },
      { time: "9 AM", value: 72, hasStar: false },
      { time: "11 AM", value: 74, hasStar: false },
      { time: "1 PM", value: 71, hasStar: false },
    ]
  },
  {
    lineName: "Line 4",
    shift: "A Shift",
    currentPercentage: 68.5,
    leaderboardScore: 12,
    hourlyPerformanceData: [
      { time: "3 AM", value: 65, hasStar: false },
      { time: "5 AM", value: 70, hasStar: false },
      { time: "7 AM", value: 72, hasStar: false },
      { time: "9 AM", value: 68, hasStar: false },
      { time: "11 AM", value: 66, hasStar: false },
      { time: "1 PM", value: 68, hasStar: false },
    ]
  },
  {
    lineName: "Line 5",
    shift: "B Shift",
    currentPercentage: 63.7,
    leaderboardScore: 10,
    hourlyPerformanceData: [
      { time: "3 AM", value: 60, hasStar: false },
      { time: "5 AM", value: 58, hasStar: false },
      { time: "7 AM", value: 65, hasStar: false },
      { time: "9 AM", value: 64, hasStar: false },
      { time: "11 AM", value: 67, hasStar: false },
      { time: "1 PM", value: 64, hasStar: false },
    ]
  }
]

const sidebarItems = [
  { name: "Game" },
  { name: "Score" },
  { name: "OEE" },
  { name: "Packaging" },
  { name: "Flow" },
  { name: "Update" },
  { name: "X-Bar R" },
]

// Different datasets for each parameter
const dataByParameter: Record<string, LineData[]> = {
  Game: mockLeaderboardData,
  Score: [
    {
      lineName: "Line 1",
      shift: "A Shift",
      currentPercentage: 92.5,
      leaderboardScore: 185,
      hourlyPerformanceData: [
        { time: "3 AM", value: 90, hasStar: true },
        { time: "5 AM", value: 88, hasStar: false },
        { time: "7 AM", value: 95, hasStar: true },
        { time: "9 AM", value: 92, hasStar: true },
        { time: "11 AM", value: 94, hasStar: true },
        { time: "1 PM", value: 91, hasStar: false },
      ]
    },
    {
      lineName: "Line 3",
      shift: "B Shift", 
      currentPercentage: 87.2,
      leaderboardScore: 174,
      hourlyPerformanceData: [
        { time: "3 AM", value: 85, hasStar: true },
        { time: "5 AM", value: 89, hasStar: true },
        { time: "7 AM", value: 86, hasStar: false },
        { time: "9 AM", value: 88, hasStar: false },
        { time: "11 AM", value: 89, hasStar: true },
        { time: "1 PM", value: 86, hasStar: false },
      ]
    },
    {
      lineName: "Line 2",
      shift: "A Shift",
      currentPercentage: 84.1,
      leaderboardScore: 168,
      hourlyPerformanceData: [
        { time: "3 AM", value: 82, hasStar: false },
        { time: "5 AM", value: 85, hasStar: true },
        { time: "7 AM", value: 83, hasStar: false },
        { time: "9 AM", value: 86, hasStar: true },
        { time: "11 AM", value: 84, hasStar: false },
        { time: "1 PM", value: 85, hasStar: true },
      ]
    }
  ],
  OEE: [
    {
      lineName: "Packaging Line 1",
      shift: "A Shift",
      currentPercentage: 89.3,
      leaderboardScore: 267,
      hourlyPerformanceData: [
        { time: "3 AM", value: 87, hasStar: true },
        { time: "5 AM", value: 90, hasStar: true },
        { time: "7 AM", value: 88, hasStar: false },
        { time: "9 AM", value: 91, hasStar: true },
        { time: "11 AM", value: 89, hasStar: true },
        { time: "1 PM", value: 90, hasStar: true },
      ]
    },
    {
      lineName: "Line 4",
      shift: "C Shift",
      currentPercentage: 86.7,
      leaderboardScore: 260,
      hourlyPerformanceData: [
        { time: "3 AM", value: 84, hasStar: false },
        { time: "5 AM", value: 87, hasStar: true },
        { time: "7 AM", value: 89, hasStar: true },
        { time: "9 AM", value: 86, hasStar: false },
        { time: "11 AM", value: 88, hasStar: true },
        { time: "1 PM", value: 86, hasStar: false },
      ]
    }
  ],
  Packaging: [
    {
      lineName: "Packaging Line 2",
      shift: "B Shift",
      currentPercentage: 91.8,
      leaderboardScore: 459,
      hourlyPerformanceData: [
        { time: "3 AM", value: 89, hasStar: true },
        { time: "5 AM", value: 93, hasStar: true },
        { time: "7 AM", value: 90, hasStar: true },
        { time: "9 AM", value: 94, hasStar: true },
        { time: "11 AM", value: 92, hasStar: true },
        { time: "1 PM", value: 91, hasStar: false },
      ]
    },
    {
      lineName: "Packaging Line 1",
      shift: "A Shift",
      currentPercentage: 88.4,
      leaderboardScore: 442,
      hourlyPerformanceData: [
        { time: "3 AM", value: 86, hasStar: false },
        { time: "5 AM", value: 90, hasStar: true },
        { time: "7 AM", value: 87, hasStar: false },
        { time: "9 AM", value: 91, hasStar: true },
        { time: "11 AM", value: 89, hasStar: true },
        { time: "1 PM", value: 88, hasStar: false },
      ]
    }
  ],
  Flow: [
    {
      lineName: "Flow Line A",
      shift: "A Shift",
      currentPercentage: 94.2,
      leaderboardScore: 377,
      hourlyPerformanceData: [
        { time: "3 AM", value: 92, hasStar: true },
        { time: "5 AM", value: 95, hasStar: true },
        { time: "7 AM", value: 93, hasStar: true },
        { time: "9 AM", value: 96, hasStar: true },
        { time: "11 AM", value: 94, hasStar: true },
        { time: "1 PM", value: 95, hasStar: true },
      ]
    },
    {
      lineName: "Flow Line B",
      shift: "B Shift",
      currentPercentage: 90.1,
      leaderboardScore: 360,
      hourlyPerformanceData: [
        { time: "3 AM", value: 88, hasStar: false },
        { time: "5 AM", value: 91, hasStar: true },
        { time: "7 AM", value: 89, hasStar: true },
        { time: "9 AM", value: 92, hasStar: true },
        { time: "11 AM", value: 90, hasStar: true },
        { time: "1 PM", value: 91, hasStar: true },
      ]
    }
  ],
  Update: [
    {
      lineName: "Update Station 1",
      shift: "C Shift",
      currentPercentage: 86.9,
      leaderboardScore: 521,
      hourlyPerformanceData: [
        { time: "3 AM", value: 84, hasStar: false },
        { time: "5 AM", value: 88, hasStar: true },
        { time: "7 AM", value: 85, hasStar: false },
        { time: "9 AM", value: 89, hasStar: true },
        { time: "11 AM", value: 87, hasStar: true },
        { time: "1 PM", value: 88, hasStar: true },
      ]
    }
  ],
  "X-Bar R": [
    {
      lineName: "QC Station Alpha",
      shift: "A Shift",
      currentPercentage: 97.1,
      leaderboardScore: 194,
      hourlyPerformanceData: [
        { time: "3 AM", value: 95, hasStar: true },
        { time: "5 AM", value: 98, hasStar: true },
        { time: "7 AM", value: 96, hasStar: true },
        { time: "9 AM", value: 99, hasStar: true },
        { time: "11 AM", value: 97, hasStar: true },
        { time: "1 PM", value: 98, hasStar: true },
      ]
    },
    {
      lineName: "QC Station Beta",
      shift: "B Shift",
      currentPercentage: 93.8,
      leaderboardScore: 187,
      hourlyPerformanceData: [
        { time: "3 AM", value: 91, hasStar: true },
        { time: "5 AM", value: 95, hasStar: true },
        { time: "7 AM", value: 92, hasStar: true },
        { time: "9 AM", value: 96, hasStar: true },
        { time: "11 AM", value: 94, hasStar: true },
        { time: "1 PM", value: 94, hasStar: true },
      ]
    }
  ]
}

const getPerformanceColor = (value: number) => {
  if (value >= 80) return "#22c55e" // Green - 4 points
  if (value >= 60) return "#f97316" // Orange - 2 points  
  return "#ef4444" // Red - 0 points
}

const getStarCount = (percentage: number) => {
  return Math.round((percentage / 100) * 5)
}

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const getTrend = (data: HourlyData[]) => {
  const firstHalf = data.slice(0, Math.floor(data.length / 2))
  const secondHalf = data.slice(Math.floor(data.length / 2))
  const firstAvg = firstHalf.reduce((sum, item) => sum + item.value, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((sum, item) => sum + item.value, 0) / secondHalf.length
  return secondAvg > firstAvg ? 'up' : 'down'
}

export function LeaderboardDashboard() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [activeParameter, setActiveParameter] = useState("Game")
  const [sortedData, setSortedData] = useState<LineData[]>([])

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Sort data by leaderboard score when parameter changes
    const currentData = dataByParameter[activeParameter] || []
    const sorted = [...currentData].sort((a, b) => b.leaderboardScore - a.leaderboardScore)
    setSortedData(sorted)
  }, [activeParameter])

  return (
    <section className="mt-8">
      <Card className="bg-background border-border">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground">Leaderboard</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Break Room</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                {currentTime}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-32 flex flex-col gap-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeParameter === item.name ? "default" : "ghost"}
                  className={`justify-start text-sm h-8 ${
                    activeParameter === item.name 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveParameter(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            {/* Main Leaderboard Content */}
            <div className="flex-1">
              <div className="space-y-4">
                {sortedData.map((line, index) => (
                  <div
                    key={line.lineName}
                    className="flex items-center gap-6 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    {/* Line Info */}
                    <div className="min-w-[160px]">
                      <h3 className="font-semibold text-foreground">{line.lineName}</h3>
                      <p className="text-sm text-muted-foreground">{line.shift}</p>
                    </div>

                    {/* Performance Percentage with Stars */}
                    <div className="min-w-[120px] flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        {line.currentPercentage}%
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < getStarCount(line.currentPercentage)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sparkline Chart */}
                    <div className="flex-1 max-w-md">
                      <div className="flex items-end gap-1 h-16">
                        {line.hourlyPerformanceData.map((data, dataIndex) => (
                          <div key={dataIndex} className="flex flex-col items-center flex-1">
                            {data.hasStar && (
                              <Star className="h-2 w-2 fill-yellow-400 text-yellow-400 mb-1" />
                            )}
                            <div
                              className="w-full rounded-t-sm transition-all shadow-sm border border-gray-200"
                              style={{
                                height: `${Math.max((data.value / 100) * 48, 8)}px`,
                                backgroundColor: getPerformanceColor(data.value),
                                minHeight: '8px'
                              }}
                            />
                            <span className="text-[10px] text-muted-foreground mt-1">
                              {data.time.replace(' ', '')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trend Indicator and Score */}
                    <div className="min-w-[160px] flex items-center gap-3">
                      {/* Trend Indicator */}
                      <div className="flex items-center gap-1">
                        {getTrend(line.hourlyPerformanceData) === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-chart-2" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span className={`text-xs font-medium ${
                          getTrend(line.hourlyPerformanceData) === 'up' ? 'text-chart-2' : 'text-destructive'
                        }`}>
                          {getTrend(line.hourlyPerformanceData) === 'up' ? 'Trending Up' : 'Trending Down'}
                        </span>
                      </div>
                      
                      {index === 0 && (
                        <div className="bg-chart-2 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Current Leader
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                          {line.leaderboardScore}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex justify-end">
                <div className="bg-muted/50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-foreground mb-2">Point System</h4>
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                      <span>4 Points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }} />
                      <span>2 Points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                      <span>0 Points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}