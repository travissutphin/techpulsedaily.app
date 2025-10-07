# Security Setup Guide

## Quick Setup (5 minutes)

### 1. Generate Password Hash
```bash
npm install bcryptjs
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_PASSWORD_HERE', 10).then(console.log)"
```
Copy the output hash.

### 2. Generate API Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output string.

### 3. Update config/auth.json
Replace the placeholder values with:
- `passwordHash`: The hash from step 1
- `apiKey`: The string from step 2

### 4. Update .env.local
Move your Claude API key to .env.local (never commit this file!)

## How It Works

- **Admin Login**: Username/password checked against config/auth.json
- **API Protection**: All admin endpoints require x-api-key header
- **No Database Needed**: Everything runs from config files

## Testing

1. Start the app: `npm run dev`
2. Go to `/admin`
3. Login with username: `admin` and your chosen password
4. The app will use the API key automatically for all admin operations

## Security Notes

- Never commit auth.json with real values to git
- Rotate API keys periodically
- Use strong passwords (12+ characters)
- Keep .env.local in .gitignore