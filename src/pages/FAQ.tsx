
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, MessageSquare } from "lucide-react";

// Données factices pour l'exemple
const faqItems = [
  {
    category: "Compte et Connexion",
    questions: [
      {
        id: "q1",
        question: "Comment créer un compte ?",
        answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de l'écran d'accueil. Remplissez le formulaire d'inscription avec vos informations personnelles, acceptez les conditions d'utilisation, et cliquez sur 'Créer un compte'. Vous recevrez un email de confirmation pour activer votre compte."
      },
      {
        id: "q2",
        question: "J'ai oublié mon mot de passe. Comment le réinitialiser ?",
        answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Connexion', puis sur le lien 'Mot de passe oublié ?'. Saisissez l'adresse email associée à votre compte et suivez les instructions envoyées par email pour réinitialiser votre mot de passe."
      },
      {
        id: "q3",
        question: "Comment puis-je modifier mes informations de profil ?",
        answer: "Pour modifier vos informations de profil, connectez-vous à votre compte, puis cliquez sur votre nom ou avatar en haut à droite. Sélectionnez 'Profil' dans le menu déroulant. Sur la page de profil, vous pouvez mettre à jour vos informations personnelles, changer votre photo de profil, et ajuster vos préférences."
      }
    ]
  },
  {
    category: "Nutrition et Alimentation",
    questions: [
      {
        id: "q4",
        question: "Comment enregistrer mes repas quotidiens ?",
        answer: "Pour enregistrer vos repas, accédez à l'onglet 'Saisie de données' dans le menu principal, puis sélectionnez l'onglet 'Nutrition'. Vous pouvez alors saisir les détails de votre repas, y compris le type de repas (petit-déjeuner, déjeuner, etc.), les aliments consommés et les quantités approximatives."
      },
      {
        id: "q5",
        question: "Comment sont calculées les valeurs nutritionnelles ?",
        answer: "Les valeurs nutritionnelles sont calculées à partir de notre base de données d'aliments qui contient des informations détaillées sur les calories, protéines, glucides, lipides et autres nutriments. Lorsque vous saisissez un aliment et sa quantité, l'application utilise ces données pour calculer automatiquement les valeurs nutritionnelles de votre repas."
      },
      {
        id: "q6",
        question: "Puis-je ajouter des aliments personnalisés à la base de données ?",
        answer: "Oui, vous pouvez ajouter des aliments personnalisés qui ne sont pas dans notre base de données. Dans la section 'Nutrition', cliquez sur 'Ajouter un aliment' et remplissez les détails nutritionnels de l'aliment. Une fois sauvegardé, cet aliment sera disponible dans votre liste personnelle pour une utilisation future."
      }
    ]
  },
  {
    category: "Activité Physique",
    questions: [
      {
        id: "q7",
        question: "Comment enregistrer mes activités physiques ?",
        answer: "Pour enregistrer vos activités physiques, accédez à la page 'Saisie de données', puis sélectionnez l'onglet 'Exercice'. Vous pouvez alors sélectionner le type d'activité (marche, course, natation, etc.), indiquer la durée et l'intensité, et l'application calculera automatiquement une estimation des calories brûlées."
      },
      {
        id: "q8",
        question: "L'application est-elle compatible avec des appareils de fitness ?",
        answer: "Oui, notre application peut se synchroniser avec plusieurs appareils de fitness et montres connectées populaires. Pour connecter votre appareil, allez dans 'Paramètres' > 'Appareils connectés' et suivez les instructions pour établir la connexion avec votre appareil spécifique."
      },
      {
        id: "q9",
        question: "Comment définir mes objectifs d'activité physique ?",
        answer: "Pour définir vos objectifs d'activité physique, accédez à votre profil et sélectionnez 'Objectifs'. Dans la section 'Activité physique', vous pouvez définir des objectifs quotidiens ou hebdomadaires pour le nombre de pas, la durée d'exercice, ou les calories à brûler. L'application suivra vos progrès par rapport à ces objectifs."
      }
    ]
  },
  {
    category: "Suivi du Sommeil",
    questions: [
      {
        id: "q10",
        question: "Comment enregistrer mes données de sommeil ?",
        answer: "Pour enregistrer vos données de sommeil, allez dans 'Saisie de données' puis sélectionnez l'onglet 'Sommeil'. Vous pouvez saisir l'heure à laquelle vous vous êtes couché, l'heure à laquelle vous vous êtes réveillé (ou la durée totale de sommeil), ainsi que la qualité perçue de votre sommeil et des notes supplémentaires si vous le souhaitez."
      },
      {
        id: "q11",
        question: "Quels sont les critères pour évaluer la qualité du sommeil ?",
        answer: "La qualité du sommeil est évaluée selon plusieurs critères : la durée totale de sommeil, la continuité du sommeil (présence ou absence de réveils nocturnes), la vitesse d'endormissement, et la sensation de récupération au réveil. L'application utilise ces informations pour vous fournir une évaluation globale de votre qualité de sommeil."
      }
    ]
  },
  {
    category: "Consultation Médicale",
    questions: [
      {
        id: "q12",
        question: "Comment puis-je prendre rendez-vous avec un médecin ?",
        answer: "Pour prendre rendez-vous avec un médecin, accédez à la section 'Consultation médicale' de l'application. Vous pouvez alors consulter la liste des médecins disponibles, voir leurs spécialités et leurs disponibilités, et réserver un créneau qui vous convient. Vous recevrez une confirmation par email et un rappel avant le rendez-vous."
      },
      {
        id: "q13",
        question: "Les consultations sont-elles sécurisées et confidentielles ?",
        answer: "Oui, toutes les consultations médicales via notre application sont entièrement sécurisées et confidentielles. Nous utilisons un cryptage de bout en bout pour les communications entre vous et votre médecin. De plus, toutes nos pratiques sont conformes aux réglementations sur la protection des données de santé."
      },
      {
        id: "q14",
        question: "Comment puis-je accéder à mes dossiers médicaux ?",
        answer: "Vous pouvez accéder à vos dossiers médicaux dans la section 'Profil' de l'application, sous l'onglet 'Dossier médical'. Vous y trouverez un historique de vos consultations, les recommandations de vos médecins, et les résultats de vos examens. Tous ces documents peuvent être téléchargés ou partagés avec d'autres professionnels de santé si nécessaire."
      }
    ]
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results: any[] = [];
    
    faqItems.forEach(category => {
      category.questions.forEach(item => {
        if (
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        ) {
          results.push({ ...item, category: category.category });
        }
      });
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Foire aux questions</h1>
        <p className="text-muted-foreground">
          Trouvez des réponses aux questions fréquentes sur l'utilisation de notre application.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher dans la FAQ..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Rechercher</Button>
          </div>
        </CardContent>
      </Card>
      
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de recherche</CardTitle>
            <CardDescription>
              {searchResults.length === 0 
                ? "Aucun résultat trouvé. Essayez avec d'autres termes."
                : `${searchResults.length} résultat(s) trouvé(s) pour "${searchQuery}"`
              }
            </CardDescription>
          </CardHeader>
          {searchResults.length > 0 && (
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {searchResults.map((result) => (
                  <AccordionItem key={result.id} value={result.id}>
                    <AccordionTrigger>
                      <div className="text-left mr-4">
                        <div className="font-medium">{result.question}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.category}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{result.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          )}
        </Card>
      )}
      
      {(!hasSearched || searchResults.length === 0) && (
        <>
          {faqItems.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Vous n'avez pas trouvé de réponse à votre question ?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center gap-4 py-6">
          <HelpCircle className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-medium mb-2">Contactez notre support</h3>
            <p className="text-muted-foreground mb-4">
              Notre équipe de support est disponible 24/7 pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline">Envoyer un email</Button>
              <Button>Discuter en direct</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
