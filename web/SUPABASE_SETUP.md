# Supabase OTP Setup Instructions

## ✅ What You Get (100% FREE):
- 50,000 monthly active users
- Unlimited OTP emails
- 500MB database
- No credit card required

## Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Verify your email

## Step 2: Create a New Project (1 minute)

1. Click "New project"
2. Fill in:
   - Name: `alphainno-app-store`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to you
3. Click "Create new project"
4. Wait 2-3 minutes for setup

## Step 3: Get Your API Keys (1 minute)

1. In your project dashboard, click "Settings" (gear icon)
2. Click "API" in the left sidebar
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 4: Add Keys to Your Project

1. Open `.env.local` in your project
2. Replace with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 5: Configure Email Settings (IMPORTANT!)

1. In Supabase dashboard, go to "Authentication"
2. Click "Email Templates" tab
3. You'll see "Magic Link" template - this sends the OTP
4. (Optional) Customize the email template with your branding

### For Production (when you deploy):
1. Go to "Authentication" > "Settings"
2. Scroll to "SMTP Settings"
3. Add your own email service (SendGrid, AWS SES, etc.)
4. For now, Supabase's default email works fine for testing!

## Step 6: Test It!

1. Restart your dev server:
```bash
npm run dev
```

2. Go to `http://localhost:3000/signup`
3. Enter your email
4. Check your inbox for the 6-digit OTP code
5. Enter the code and you're in!

## How It Works:

1. User enters email → Supabase sends 6-digit OTP
2. User enters OTP → Supabase verifies it
3. Account created/logged in automatically
4. OTP expires in 60 seconds (secure!)

## Troubleshooting:

### Email not received?
- Check spam folder
- Wait 1-2 minutes (sometimes delayed)
- Try resending the OTP
- Check Supabase dashboard > Authentication > Users for errors

### "Invalid API key" error?
- Double-check your `.env.local` file
- Make sure you copied the ANON key (not the service_role key)
- Restart your dev server after changing `.env.local`

### OTP not working?
- Make sure you're entering all 6 digits
- OTP expires in 60 seconds - request a new one if needed
- Check browser console (F12) for error messages

## Free Tier Limits:

- ✅ 50,000 monthly active users
- ✅ Unlimited authentication requests
- ✅ 500MB database storage
- ✅ 1GB file storage
- ✅ 2GB bandwidth

Perfect for development and production!

## Need Help?

- Supabase Docs: https://supabase.com/docs/guides/auth/auth-email
- Discord: https://discord.supabase.com
