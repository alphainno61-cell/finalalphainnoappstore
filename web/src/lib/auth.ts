import { supabase } from './supabase';

// Send OTP to email
export const sendOTP = async (email: string): Promise<void> => {
  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send OTP');
    }
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    throw new Error(error.message || 'Failed to send OTP');
  }
};

// Verify OTP code
export const verifyOTP = async (email: string, token: string): Promise<any> => {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code: token }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Invalid or expired OTP');
    }

    // If we got a redirect URL (magic link), use it to complete the sign in
    if (data.redirectUrl) {
      // Extract the token from the URL
      const url = new URL(data.redirectUrl);
      const tokenHash = url.searchParams.get('token_hash');
      const type = url.searchParams.get('type');
      
      if (tokenHash && type) {
        // Verify the OTP token with Supabase to create a session
        const { data: sessionData, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as any,
        });
        
        if (verifyError) {
          throw verifyError;
        }
        
        return sessionData;
      }
    }

    return data;
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    throw new Error(error.message || 'Invalid or expired OTP');
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error: any) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((event: any, session: any) => {
    callback(session?.user || null);
  });
};
