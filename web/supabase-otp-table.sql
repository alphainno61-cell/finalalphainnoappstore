-- Create OTP codes table
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX idx_otp_email ON otp_codes(email);
CREATE INDEX idx_otp_expires ON otp_codes(expires_at);

-- Enable Row Level Security
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to manage OTP codes
CREATE POLICY "Service role can manage OTP codes" ON otp_codes
  FOR ALL USING (true);
