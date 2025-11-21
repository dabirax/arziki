import { Button } from "@/components/ui/button";
import BenefitCard from "@/components/BenefitCard";
import StepCard from "@/components/StepCard";
import { TrendingUp, ShieldCheck, Brain, BarChart3, Upload, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-analytics.jpg";
import logoIcon from "@/assets/logo-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Arziki" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">Arziki</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="hero" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="container mx-auto px-4 py-20 md:py-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium border border-accent/30">
                  AI-Powered Smart Inventory
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Smarter Inventory.</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Higher Profits.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                AI-powered insights that predict demand, prevent stockouts, and optimize your retail operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                    Get Started <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in lg:block hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="AI Analytics Dashboard" 
                className="relative rounded-2xl shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Arziki?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn your sales data into tomorrow's profits with intelligent analytics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <BenefitCard
              icon={TrendingUp}
              title="Predict demand and prevent stockouts"
              description="Stay ahead with AI-powered demand forecasting that ensures you never miss a sale."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Reduce storage costs and wastage"
              description="Optimize inventory levels to minimize waste and maximize space efficiency."
            />
            <BenefitCard
              icon={BarChart3}
              title="Gain actionable insights from your data"
              description="Transform raw sales data into clear, actionable business intelligence."
            />
            <BenefitCard
              icon={Brain}
              title="Simple, voice-ready AI assistant"
              description="Get answers and insights through natural conversation with your AI manager."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to smarter retail management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto animate-fade-in">
            <StepCard
              number={1}
              icon={Upload}
              title="Upload Your Data"
              description="Simply upload your sales and inventory data files in CSV, Excel, or JSON format."
            />
            <StepCard
              number={2}
              icon={Brain}
              title="Arziki Analyzes"
              description="Our AI analyzes trends, forecasts demand, and identifies optimization opportunities."
            />
            <StepCard
              number={3}
              icon={Mail}
              title="Receive Insights"
              description="Get personalized charts, insights, and recommendations delivered to your inbox."
            />
          </div>
        </div>
      </section>

      {/* Tech Credibility Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Powered by Enterprise-Grade Technology</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="px-6 py-3 bg-card rounded-lg border border-border shadow-sm">
                <span className="font-semibold text-foreground">AWS S3</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-border shadow-sm">
                <span className="font-semibold text-foreground">AWS Lambda</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-border shadow-sm">
                <span className="font-semibold text-foreground">AWS Forecast</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-border shadow-sm">
                <span className="font-semibold text-foreground">AWS Bedrock</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-border shadow-sm">
                <span className="font-semibold text-foreground">Amazon Q</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="Arziki" className="w-8 h-8" />
              <span className="text-sm text-muted-foreground">
                © 2025 Arziki Technologies | Powered by AWS
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="mailto:support@arziki.com" className="hover:text-primary transition-colors">
                support@arziki.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
