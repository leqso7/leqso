import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ynfyxpkwbqfnwjxbfnlm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZnl4cGt3YnFmbndqeGJmbmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzOTU2MDAsImV4cCI6MjAxNzk3MTYwMH0.ZMrRbPaXSMgKsXPXEgWNGgwgRjVmPnAzPQDZHT-QFWM';

// Initialize Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const sendRequest = async (userId: string, requestCode: string) => {
  console.log('Sending request to Supabase:', { userId, requestCode });
  
  try {
    const { data, error } = await supabase
      .from('requests')
      .insert([
        {
          user_id: userId,
          request_code: requestCode,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    console.log('Supabase response:', { data, error });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in sendRequest:', error);
    throw error;
  }
};

export const approveRequest = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .update({ 
        status: 'approved', 
        updated_at: new Date().toISOString() 
      })
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in approveRequest:', error);
    throw error;
  }
};

export const denyRequest = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error in denyRequest:', error);
    throw error;
  }
};

export const checkUserStatus = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('status')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error in checkUserStatus:', error);
      return null;
    }
    
    return data?.status;
  } catch (error) {
    console.error('Error in checkUserStatus:', error);
    return null;
  }
};

export const getAllRequests = async () => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getAllRequests:', error);
    throw error;
  }
};
