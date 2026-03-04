import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase admin client for user creation
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    // Find the OTP code in the database
    const { data: otpData, error: fetchError } = await supabaseAdmin
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('verified', false)
      .single();

    if (fetchError || !otpData) {
      return NextResponse.json({ error: 'Invalid OTP code' }, { status: 400 });
    }

    // Check if the OTP has expired
    const now = new Date();
    const expiresAt = new Date(otpData.expires_at);
    
    if (now > expiresAt) {
      return NextResponse.json({ error: 'OTP code has expired' }, { status: 400 });
    }

    // Mark the OTP as verified
    await supabaseAdmin
      .from('otp_codes')
      .update({ verified: true })
      .eq('id', otpData.id);

    // Check if user exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
    let user = users.find(u => u.email === email);

    // Create user if doesn't exist
    if (!user) {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
      });

      if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }

      user = newUser.user;
    }

    // Generate a session token for the user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      user,
      redirectUrl: sessionData.properties?.action_link 
    });
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: error.message || 'Invalid or expired OTP' }, { status: 500 });
  }
}
