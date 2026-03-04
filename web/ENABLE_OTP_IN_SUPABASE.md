# Enable OTP Code in Supabase

You're currently receiving a confirmation link instead of an OTP code. Follow these steps to enable OTP:

## Step 1: Go to Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: `alphainno-app-store`

## Step 2: Disable Email Confirmations

1. Click on "Authentication" in the left sidebar
2. Click on "Providers" tab
3. Find "Email" provider and click on it
4. **UNCHECK** "Confirm email" option
5. Click "Save"

## Step 3: Configure Email Template (Optional but Recommended)

1. Still in "Authentication", click on "Email Templates" tab
2. Select "Magic Link" template
3. You can customize the email to say "Your verification code is: {{ .Token }}"
4. Click "Save"

## Step 4: Test Again

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/signup`
3. Enter your email
4. You should now receive a 6-digit OTP code!

## Alternative: Use Magic Link (Current Setup)

If you prefer to keep the magic link (like the email you received):

1. Click "Confirm your mail" link in the email
2. You'll be automatically signed in
3. This is actually more secure and easier for users!

## Which is Better?

**Magic Link (Current):**
- ✅ More secure (no code to intercept)
- ✅ One-click sign in
- ✅ No typing needed
- ❌ Requires clicking email link

**OTP Code:**
- ✅ Feels more familiar (like Microsoft)
- ✅ Can copy/paste code
- ❌ Need to type 6 digits
- ❌ Can be intercepted

**Recommendation:** Keep the magic link! It's actually better UX and more secure. But if you want OTP codes, follow the steps above.
