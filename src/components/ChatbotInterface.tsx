import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, Volume2, FileText, BarChart3, Download, Sparkles, Mic } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotInterfaceProps {
  onClose: () => void;
  activeReport?: { id: string; title: string } | null;
}

const ChatbotInterface = ({ onClose, activeReport }: ChatbotInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: activeReport 
        ? `Hello! I'm Arziki Assistant. I can help you understand the "${activeReport.title}" report. What would you like to know?`
        : "Hello! I'm Arziki Assistant. How can I help you with your inventory and sales data today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Cleanup speech recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("stockout") || lowerInput.includes("stock out")) {
      return "Based on your current sales trends, I've identified 3 products at risk of stockout within the next 2 weeks: Coca-Cola (7 days), Rice 25kg (10 days), and Cooking Oil (12 days). Would you like me to generate a restock recommendation?";
    }
    
    if (lowerInput.includes("sales") || lowerInput.includes("performance")) {
      return "Your sales performance shows a 15% increase this month compared to last month. Top-performing categories are Beverages (+22%) and Groceries (+18%). Would you like to see a detailed trend chart?";
    }
    
    if (lowerInput.includes("forecast") || lowerInput.includes("predict")) {
      return "The AI forecast predicts a 12% increase in demand for the next 4 weeks, with peak demand expected during weeks 2 and 3. I recommend increasing stock levels for fast-moving items by 20%.";
    }
    
    if (lowerInput.includes("profit") || lowerInput.includes("revenue")) {
      return "Your current profit margin is 18.5%. Top profit-generating products are Electronics (25% margin) and Household Items (22% margin). I can help you identify opportunities to improve margins further.";
    }
    
    return "I understand you're asking about your business data. I can help you with demand forecasts, stockout predictions, sales trends, and profitability analysis. What specific aspect would you like to explore?";
  };

  const quickActions = [
    { icon: BarChart3, label: "Show Sales Trend", action: "show trend" },
    { icon: Download, label: "Download Report", action: "download" },
    { icon: FileText, label: "Generate Forecast", action: "forecast" },
  ];

  const handleQuickAction = (action: string) => {
    if (action === "download") {
      toast.success("Report download started");
    } else if (action === "forecast") {
      setInput("Generate a new demand forecast");
    } else if (action === "show trend") {
      setInput("Show me the sales trend chart");
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      toast.success("Reading message aloud");
    } else {
      toast.error("Text-to-speech not supported in this browser");
    }
  };

  const handleAudioInput = () => {
    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Voice input not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (!isRecording) {
      // Start recording
      try {
        if (!recognitionRef.current) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';

          recognitionRef.current.onstart = () => {
            setIsRecording(true);
            toast.info("Listening... Speak now");
          };

          recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            toast.success("Voice captured successfully");
          };

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsRecording(false);
            if (event.error === 'no-speech') {
              toast.error("No speech detected. Please try again.");
            } else if (event.error === 'not-allowed') {
              toast.error("Microphone access denied. Please allow microphone access.");
            } else {
              toast.error(`Voice input error: ${event.error}`);
            }
          };

          recognitionRef.current.onend = () => {
            setIsRecording(false);
          };
        }

        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start recording:", error);
        toast.error("Failed to start voice input");
        setIsRecording(false);
      }
    } else {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      toast.info("Voice input stopped");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl h-[600px] flex flex-col bg-gradient-to-b from-card to-secondary/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Arziki Assistant</h3>
              <p className="text-xs text-muted-foreground">AI-powered business insights</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.sender === "bot" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-6 px-2"
                      onClick={() => handleTextToSpeech(message.text)}
                    >
                      <Volume2 className="w-3 h-3 mr-1" />
                      <span className="text-xs">Read aloud</span>
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-border bg-secondary/20">
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="text-xs"
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Ask about your business data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAudioInput}
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
                  isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={handleSend} variant="hero" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Ask me about forecasts, stockouts, sales trends, or profitability
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatbotInterface;