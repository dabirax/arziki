import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard = ({ number, icon: Icon, title, description }: StepCardProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-4 group">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Icon className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
          {number}
        </div>
      </div>
      <div className="max-w-xs">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
