
import { supabase } from '@/integrations/supabase/client';

export const avatarService = {
  async uploadAvatar(file: File, userId: string): Promise<string> {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true, // Overwrite if exists
        contentType: file.type
      });

    if (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  },

  async deleteAvatar(userId: string): Promise<void> {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`, `${userId}/avatar.jpeg`]);

    if (error) {
      console.error('Error deleting avatar:', error);
      throw error;
    }
  }
};
