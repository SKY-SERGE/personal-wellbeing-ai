
import { supabase } from '@/integrations/supabase/client';
import { ChatConversation, ChatMessage } from '@/types/models';

export const chatService = {
  async getConversations(userId: string): Promise<ChatConversation[]> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
    
    return data;
  },
  
  async createConversation(userId: string): Promise<ChatConversation> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({ user_id: userId })
      .select('*')
      .single();
    
    if (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
    
    return data;
  },
  
  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async sendMessage(conversationId: string, content: string, isUser: boolean = true): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        content,
        is_user: isUser
      })
      .select('*')
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
    
    return data;
  },
  
  async deleteConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', conversationId);
    
    if (error) {
      console.error(`Error deleting conversation ${conversationId}:`, error);
      throw error;
    }
  }
};
