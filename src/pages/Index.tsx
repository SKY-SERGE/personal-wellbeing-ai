
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-primary/10 via-white to-wellness-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-wellness-primary flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">WellnessAI</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Votre plateforme personnelle de santé et bien-être powered by AI
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">Suivi Intelligent</h3>
              <p className="text-gray-600">
                Suivez votre activité physique, nutrition et sommeil avec des recommandations personnalisées par IA.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">Assistant IA</h3>
              <p className="text-gray-600">
                Obtenez des conseils personnalisés et des réponses à vos questions santé 24h/24.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">Tableau de Bord</h3>
              <p className="text-gray-600">
                Visualisez vos progrès avec des graphiques détaillés et des métriques claires.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/auth">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/app">
                Accéder à l'app
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Déjà un compte ? Connectez-vous pour accéder à votre tableau de bord.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
