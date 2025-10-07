import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const Dashboard = () => {
  const [step, setStep] = useState<"form" | "upload" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    email: "",
    location: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.storeName || !formData.email || !formData.location) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Information saved! Now upload your data files.");
    setStep("upload");
  };

  const handleFileUpload = () => {
    if (!files || files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setStep("processing");
    
    // Simulate file processing
    setTimeout(() => {
      setStep("success");
      toast.success("Analysis complete! Check your email for insights.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logoIcon} alt="Arziki" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">Arziki</h1>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 ${step === "form" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "form" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">Store Info</span>
              </div>
              <div className="flex-1 h-1 bg-secondary mx-4">
                <div className={`h-full bg-primary transition-all duration-500 ${step === "upload" || step === "processing" || step === "success" ? "w-1/2" : "w-0"}`}></div>
              </div>
              <div className={`flex items-center gap-2 ${step === "upload" || step === "processing" || step === "success" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "upload" || step === "processing" || step === "success" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Upload Data</span>
              </div>
              <div className="flex-1 h-1 bg-secondary mx-4">
                <div className={`h-full bg-primary transition-all duration-500 ${step === "success" ? "w-full" : "w-0"}`}></div>
              </div>
              <div className={`flex items-center gap-2 ${step === "success" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "success" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">Complete</span>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-b from-card to-secondary/30 shadow-lg">
            {/* Form Step */}
            {step === "form" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome to Arziki</h2>
                  <p className="text-muted-foreground">Let's get your store set up for smart analytics</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ade Mustapha"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeName">Store / Supermarket Name</Label>
                    <Input
                      id="storeName"
                      type="text"
                      placeholder="ABC Supermarket"
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="manager@store.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Lagos, Nigeria"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Continue to Upload
                  </Button>
                </form>
              </div>
            )}

            {/* Upload Step */}
            {step === "upload" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-foreground">Upload Your Data</h2>
                  <p className="text-muted-foreground">Upload your sales and inventory files (CSV, Excel, or JSON)</p>
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer bg-secondary/20">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <Label htmlFor="fileUpload" className="cursor-pointer">
                      <span className="text-primary font-medium hover:underline">Click to upload</span> or drag and drop
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">CSV, Excel, or JSON files</p>
                    <Input
                      id="fileUpload"
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls,.json"
                      onChange={(e) => setFiles(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {files && files.length > 0 && (
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2 text-foreground">Selected files:</p>
                      {Array.from(files).map((file, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </p>
                      ))}
                    </div>
                  )}

                  <Button 
                    onClick={handleFileUpload} 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={!files || files.length === 0}
                  >
                    Start Analysis
                  </Button>
                </div>
              </div>
            )}

            {/* Processing Step */}
            {step === "processing" && (
              <div className="animate-fade-in text-center py-12">
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
                <h2 className="text-2xl font-bold mb-2 text-foreground">Analyzing Your Data...</h2>
                <p className="text-muted-foreground">Our AI is processing your sales and inventory data</p>
              </div>
            )}

            {/* Success Step */}
            {step === "success" && (
              <div className="animate-fade-in text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Analysis Complete!</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Your analysis is in progress! You'll receive charts, insights, and recommendations from Arziki directly in your email shortly.
                </p>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-8">
                  <p className="text-sm text-foreground">
                    <strong>Email sent to:</strong> {formData.email}
                  </p>
                </div>
                <Link to="/">
                  <Button variant="hero" size="lg">
                    Return to Home
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
