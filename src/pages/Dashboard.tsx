import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, MessageSquare, Calendar, TrendingUp, LogOut, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/logo-icon.png";
import ChatbotInterface from "@/components/ChatbotInterface";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  date: string;
  type: "forecast" | "inventory" | "analysis";
  status: "completed" | "processing";
  summary: string;
}

const Dashboard = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showChat, setShowChat] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const reports: Report[] = [
    {
      id: "1",
      title: "Demand Forecast Report - November 2025",
      date: "2025-11-20",
      type: "forecast",
      status: "completed",
      summary: "AI-generated demand forecast showing expected sales trends for the next 4 weeks with stockout alerts for 3 products.",
    },
    {
      id: "2",
      title: "Inventory Analysis - October 2025",
      date: "2025-10-15",
      type: "inventory",
      status: "completed",
      summary: "Comprehensive inventory analysis revealing overstocked items worth ₦125,000 and optimization opportunities.",
    },
    {
      id: "3",
      title: "Sales Performance Analysis",
      date: "2025-11-18",
      type: "analysis",
      status: "completed",
      summary: "Detailed breakdown of sales performance across product categories with profitability insights.",
    },
  ];

  const handleChatWithReport = (report: Report) => {
    setSelectedReport(report);
    setShowChat(true);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getTypeColor = (type: string) => {
    const colors = {
      forecast: "bg-primary/10 text-primary border-primary/30",
      inventory: "bg-accent/10 text-accent-foreground border-accent/30",
      analysis: "bg-secondary/10 text-secondary-foreground border-secondary/30",
    };
    return colors[type as keyof typeof colors] || colors.analysis;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Arziki" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Arziki</h1>
              {user && <p className="text-xs text-muted-foreground">Welcome, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/create-report">
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">View and manage your AI-generated business insights</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reports List */}
            <div className="lg:col-span-2 space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-secondary/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">{report.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className={getTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{report.summary}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button 
                      variant="hero" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleChatWithReport(report)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat About Report
                    </Button>
                  </div>
                </Card>
              ))}

              {reports.length === 0 && (
                <Card className="p-12 text-center bg-secondary/20">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">No Reports Yet</h3>
                  <p className="text-muted-foreground mb-6">Upload your data to generate your first AI-powered report</p>
                  <Link to="/dashboard">
                    <Button variant="hero">Upload Data</Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Quick Stats Sidebar */}
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Quick Insights</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold text-foreground">{reports.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latest Analysis</p>
                    <p className="text-sm font-medium text-foreground">
                      {reports[0] ? new Date(reports[0].date).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-secondary/20">
                <h3 className="font-semibold mb-3 text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with Arziki Assistant to understand your reports better
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowChat(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Open Chat
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Overlay */}
      {showChat && (
        <ChatbotInterface 
          onClose={() => setShowChat(false)} 
          activeReport={selectedReport}
        />
      )}
    </div>
  );
};

export default Dashboard;