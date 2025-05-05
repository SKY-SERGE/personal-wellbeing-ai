
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const RecommendationCard = ({
  title,
  description,
  icon,
  actionLabel = "Voir les détails",
  onAction = () => {},
}: RecommendationCardProps) => {
  return (
    <Card className="data-card flex flex-col h-full">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-wellness-primary/10 flex items-center justify-center text-wellness-primary">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-muted-foreground">{description}</p>
        <Button 
          variant="ghost" 
          className="mt-4 self-start text-wellness-primary hover:text-wellness-primary hover:bg-wellness-primary/10 flex items-center gap-1"
          onClick={onAction}
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
