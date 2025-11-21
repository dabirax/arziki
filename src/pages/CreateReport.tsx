import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Upload, ArrowLeft, Plus, Trash2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import logoIcon from "@/assets/logo-icon.png";

type Step = "business" | "product" | "stock" | "supplier" | "review" | "processing" | "success";

interface BusinessData {
  businessName: string;
  businessType: string;
  location: string;
  size: string;
}

interface ProductData {
  name: string;
  quantity: string;
  cost: string;
  sellingPrice: string;
  salesPerWeek: string;
  leadTime: string;
}

interface StockEntry {
  date: string;
  product: string;
  quantitySold: string;
  stockRemaining: string;
}

interface SupplierData {
  supplierName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryDays: string;
}

const CreateReport = () => {
  const [step, setStep] = useState<Step>("business");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: "",
    businessType: "",
    location: "",
    size: "",
  });
  const [products, setProducts] = useState<ProductData[]>([{
    name: "",
    quantity: "",
    cost: "",
    sellingPrice: "",
    salesPerWeek: "",
    leadTime: "",
  }]);
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([{
    date: "",
    product: "",
    quantitySold: "",
    stockRemaining: "",
  }]);
  const [supplierData, setSupplierData] = useState<SupplierData>({
    supplierName: "",
    contactEmail: "",
    contactPhone: "",
    deliveryDays: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessData.businessName || !businessData.businessType || !businessData.location || !businessData.size) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Business information saved!");
    setStep("product");
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "", cost: "", sellingPrice: "", salesPerWeek: "", leadTime: "" }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (index: number, field: keyof ProductData, value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasEmptyFields = products.some(p => !p.name || !p.quantity || !p.cost || !p.sellingPrice);
    if (hasEmptyFields) {
      toast.error("Please fill in all product fields");
      return;
    }
    toast.success("Product information saved!");
    setStep("stock");
  };

  const addStockEntry = () => {
    setStockEntries([...stockEntries, { date: "", product: "", quantitySold: "", stockRemaining: "" }]);
  };

  const removeStockEntry = (index: number) => {
    if (stockEntries.length > 1) {
      setStockEntries(stockEntries.filter((_, i) => i !== index));
    }
  };

  const updateStockEntry = (index: number, field: keyof StockEntry, value: string) => {
    const updated = [...stockEntries];
    updated[index][field] = value;
    setStockEntries(updated);
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasEmptyFields = stockEntries.some(s => !s.date || !s.product || !s.quantitySold || !s.stockRemaining);
    if (hasEmptyFields) {
      toast.error("Please fill in all stock entry fields");
      return;
    }
    toast.success("Stock data saved!");
    setStep("supplier");
  };

  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierData.supplierName || !supplierData.contactEmail) {
      toast.error("Please fill in at least supplier name and email");
      return;
    }
    toast.success("Supplier information saved!");
    setStep("review");
  };

  const handleFinalSubmit = () => {
    if (!files || files.length === 0) {
      toast.error("Please upload at least one data file");
      return;
    }
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      toast.success("Report generated successfully!");
    }, 3000);
  };

  const getStepNumber = () => {
    const steps = { business: 1, product: 2, stock: 3, supplier: 4, review: 5 };
    return steps[step as keyof typeof steps] || 5;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logoIcon} alt="Arziki" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">Arziki</h1>
          </Link>
          <div className="flex gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => {
              logout();
              toast.success("Logged out successfully");
              navigate("/");
            }}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          {step !== "processing" && step !== "success" && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5].map((num, idx) => (
                  <div key={num} className="flex items-center flex-1">
                    <div className={`flex items-center gap-2 ${getStepNumber() >= num ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getStepNumber() >= num ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        {num}
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="flex-1 h-1 bg-secondary mx-2">
                        <div className={`h-full bg-primary transition-all duration-500 ${getStepNumber() > num ? "w-full" : "w-0"}`}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Business</span>
                <span>Products</span>
                <span>Stock</span>
                <span>Supplier</span>
                <span>Review</span>
              </div>
            </div>
          )}

          <Card className="p-8 bg-gradient-to-b from-card to-secondary/30 shadow-lg">
            {/* Step 1: Business Setup */}
            {step === "business" && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Business Setup</h2>
                <form onSubmit={handleBusinessSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={businessData.businessName}
                      onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select value={businessData.businessType} onValueChange={(val) => setBusinessData({ ...businessData, businessType: val })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supermarket">Supermarket</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="grocery">Grocery Store</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={businessData.location}
                      onChange={(e) => setBusinessData({ ...businessData, location: e.target.value })}
                      placeholder="City, Country"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Business Size *</Label>
                    <Select value={businessData.size} onValueChange={(val) => setBusinessData({ ...businessData, size: val })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-10 employees)</SelectItem>
                        <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                        <SelectItem value="large">Large (50+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">Next Step</Button>
                </form>
              </div>
            )}

            {/* Step 2: Product Info */}
            {step === "product" && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Product Information</h2>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  {products.map((product, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg space-y-4 bg-secondary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-foreground">Product {idx + 1}</span>
                        {products.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeProduct(idx)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Product Name *</Label>
                          <Input value={product.name} onChange={(e) => updateProduct(idx, "name", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Current Quantity *</Label>
                          <Input type="number" value={product.quantity} onChange={(e) => updateProduct(idx, "quantity", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Cost Price *</Label>
                          <Input type="number" value={product.cost} onChange={(e) => updateProduct(idx, "cost", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Selling Price *</Label>
                          <Input type="number" value={product.sellingPrice} onChange={(e) => updateProduct(idx, "sellingPrice", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Sales Per Week</Label>
                          <Input type="number" value={product.salesPerWeek} onChange={(e) => updateProduct(idx, "salesPerWeek", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Supplier Lead Time (days)</Label>
                          <Input type="number" value={product.leadTime} onChange={(e) => updateProduct(idx, "leadTime", e.target.value)} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addProduct} className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Another Product
                  </Button>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("business")} className="flex-1">Back</Button>
                    <Button type="button" variant="outline" onClick={() => setStep("review")} className="flex-1">Skip to Uploads</Button>
                    <Button type="submit" variant="hero" className="flex-1">Next Step</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Stock & Sales Entry */}
            {step === "stock" && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Stock & Sales Entry</h2>
                <form onSubmit={handleStockSubmit} className="space-y-6">
                  {stockEntries.map((entry, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg space-y-4 bg-secondary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-foreground">Entry {idx + 1}</span>
                        {stockEntries.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeStockEntry(idx)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Date of Sale *</Label>
                          <Input type="date" value={entry.date} onChange={(e) => updateStockEntry(idx, "date", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Product Name *</Label>
                          <Input value={entry.product} onChange={(e) => updateStockEntry(idx, "product", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Quantity Sold *</Label>
                          <Input type="number" value={entry.quantitySold} onChange={(e) => updateStockEntry(idx, "quantitySold", e.target.value)} className="mt-2" />
                        </div>
                        <div>
                          <Label>Stock Remaining *</Label>
                          <Input type="number" value={entry.stockRemaining} onChange={(e) => updateStockEntry(idx, "stockRemaining", e.target.value)} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addStockEntry} className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Row
                  </Button>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("product")} className="flex-1">Back</Button>
                    <Button type="submit" variant="hero" className="flex-1">Next Step</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Supplier & Data */}
            {step === "supplier" && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Supplier Information</h2>
                <form onSubmit={handleSupplierSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="supplierName">Supplier Name *</Label>
                    <Input
                      id="supplierName"
                      value={supplierData.supplierName}
                      onChange={(e) => setSupplierData({ ...supplierData, supplierName: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={supplierData.contactEmail}
                      onChange={(e) => setSupplierData({ ...supplierData, contactEmail: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={supplierData.contactPhone}
                      onChange={(e) => setSupplierData({ ...supplierData, contactPhone: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryDays">Average Delivery Days</Label>
                    <Input
                      id="deliveryDays"
                      type="number"
                      value={supplierData.deliveryDays}
                      onChange={(e) => setSupplierData({ ...supplierData, deliveryDays: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("stock")} className="flex-1">Back</Button>
                    <Button type="submit" variant="hero" className="flex-1">Next Step</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: Review & Upload */}
            {step === "review" && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Review & Upload Files</h2>
                <div className="space-y-6">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-foreground">Business: {businessData.businessName}</h3>
                    <p className="text-sm text-muted-foreground">{businessData.location} • {businessData.businessType}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-foreground">{products.length} Products Added</h3>
                    <p className="text-sm text-muted-foreground">{stockEntries.length} Stock Entries Recorded</p>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-secondary/20">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <Label htmlFor="fileUpload" className="cursor-pointer">
                      <span className="text-primary font-medium hover:underline">Upload additional data files</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">CSV, Excel, or JSON (optional)</p>
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
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("supplier")} className="flex-1">Back</Button>
                    <Button onClick={handleFinalSubmit} variant="hero" className="flex-1">Submit for Analysis</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Processing */}
            {step === "processing" && (
              <div className="animate-fade-in text-center py-12">
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
                <h2 className="text-2xl font-bold mb-2 text-foreground">Analyzing Your Data...</h2>
                <p className="text-muted-foreground">Our AI is processing your business data</p>
              </div>
            )}

            {/* Success */}
            {step === "success" && (
              <div className="animate-fade-in text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Report Generated!</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Your report has been successfully generated and is now available in your dashboard.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button variant="hero" size="lg">View Dashboard</Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={() => setStep("business")}>
                    Generate Another Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;