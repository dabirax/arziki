import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-b from-card to-secondary/30 border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-card-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default BenefitCard;
