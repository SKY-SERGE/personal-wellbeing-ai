
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { useProfileData } from "@/hooks/useProfileData";
import { toast } from "sonner";
import ChatMessage from "@/components/ai/ChatMessage";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Fonction pour simuler une réponse IA (à remplacer par l'intégration d'une véritable API IA)
const simulateAIResponse = async (message: string, userData: any): Promise<string> => {
  // Simuler le délai d'une requête API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Exemples de réponses basées sur des mots-clés simples dans le message utilisateur
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes('bonjour') || lowercaseMsg.includes('salut') || lowercaseMsg.includes('hello')) {
    return `Bonjour ! Je suis votre assistant santé et bien-être. Comment puis-je vous aider aujourd'hui ?`;
  }
  
  if (lowercaseMsg.includes('sommeil') || lowercaseMsg.includes('dormir')) {
    return `D'après vos données, vous dormez en moyenne 7 heures par nuit. Pour améliorer votre sommeil, je vous recommande de maintenir un horaire régulier de coucher et de limiter l'exposition aux écrans au moins 1 heure avant de vous coucher.`;
  }
  
  if (lowercaseMsg.includes('exercice') || lowercaseMsg.includes('sport') || lowercaseMsg.includes('activité')) {
    return `Pour atteindre vos objectifs de santé, je vous recommande de faire au moins 30 minutes d'activité modérée 5 jours par semaine. Les données montrent que vous êtes plus actif en début de semaine - essayez de maintenir ce niveau d'activité tout au long de la semaine.`;
  }
  
  if (lowercaseMsg.includes('nutrition') || lowercaseMsg.includes('manger') || lowercaseMsg.includes('repas')) {
    return `D'après vos entrées nutritionnelles récentes, vous pourriez bénéficier d'une augmentation de votre consommation de protéines et d'une réduction des sucres raffinés. Essayez d'incorporer plus de légumes, de protéines maigres et de grains entiers dans vos repas.`;
  }
  
  // Réponse générique si aucun mot-clé spécifique n'est détecté
  return `Merci pour votre message. Pour vous donner des conseils plus personnalisés, pourriez-vous préciser si votre question concerne la nutrition, l'exercice physique, le sommeil ou un autre aspect de votre santé ?`;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "Bonjour ! Je suis votre assistant santé personnel basé sur l'intelligence artificielle. Je peux vous fournir des conseils et des recommandations personnalisés en fonction de vos données de santé. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfileData();
  
  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsLoading(true);
    
    try {
      // Dans une implémentation réelle, remplacez cette simulation par l'appel à une API d'IA
      const aiResponse = await simulateAIResponse(userMessage.content, {
        profile,
        // Ici vous pourriez ajouter d'autres données disponibles pour personnaliser les réponses
      });
      
      setMessages(prevMessages => [...prevMessages, {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error("Impossible de charger la réponse de l'assistant. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Assistant IA Santé</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-grow overflow-y-auto px-4 py-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message.content}
                timestamp={message.timestamp}
                isUser={message.isUser}
              />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-wellness-primary/20 flex items-center justify-center text-wellness-primary">
                  <Bot size={16} />
                </div>
                <div className="rounded-lg bg-secondary p-3 text-secondary-foreground max-w-[80%]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              className="flex-grow resize-none"
              placeholder="Tapez votre message ici..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={2}
              disabled={isLoading}
            />
            <Button 
              className="self-end" 
              onClick={handleSendMessage}
              disabled={isLoading || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Les réponses de l'IA sont générées à partir de vos données de santé et peuvent ne pas être parfaites. Consultez toujours un professionnel de la santé pour des conseils médicaux.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
