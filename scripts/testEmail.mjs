// Test script to verify Resend email configuration
// Usage: node scripts/testEmail.mjs your-email@example.com

import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
const envPath = join(__dirname, '..', '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf8');
  const envVars = envFile.split('\n').reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      acc[key.trim()] = valueParts.join('=').trim();
    }
    return acc;
  }, {});
  Object.assign(process.env, envVars);
} catch (error) {
  console.error('⚠️  Could not read .env.local file');
  process.exit(1);
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const testEmail = process.argv[2];

if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY not found in environment');
  process.exit(1);
}

if (!testEmail) {
  console.error('Please provide an email address as argument');
  console.log('Usage: node scripts/testEmail.mjs your-email@example.com');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

console.log('Testing Resend email configuration...');
console.log('Sending test email to:', testEmail);
console.log('Using API key:', RESEND_API_KEY.substring(0, 10) + '...');

try {
  const { data, error } = await resend.emails.send({
    from: 'Audiophile <onboarding@resend.dev>',
    to: [testEmail],
    subject: 'Test Email from Audiophile',
    html: '<h1>Test Email</h1><p>If you received this, your Resend configuration is working!</p>',
  });

  if (error) {
    console.error('Error sending email:', error);
    console.log('\nCommon issues:');
    console.log('1. The recipient email must be verified in Resend dashboard (for free tier)');
    console.log('2. Go to: https://resend.com/audiences');
    console.log('3. Add and verify your email address');
    process.exit(1);
  }

  console.log('Email sent successfully!');
  console.log('Email ID:', data.id);
  console.log('\nNext steps:');
  console.log('1. Check your inbox (and spam folder)');
  console.log('2. If not received, verify your email at: https://resend.com/audiences');
  console.log('3. Check Resend logs at: https://resend.com/emails');
} catch (error) {
  console.error('Unexpected error:', error.message);
  process.exit(1);
}
