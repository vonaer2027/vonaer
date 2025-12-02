# Admin Authentication System

## Overview
Secure session-based authentication system for the VONAER admin dashboard using `iron-session` and `bcryptjs`.

## Features
- ✅ Secure password hashing with bcrypt
- ✅ Session-based authentication with encrypted cookies
- ✅ Automatic route protection via middleware
- ✅ 7-day session expiry
- ✅ Logout functionality
- ✅ Redirect to original page after login

## Credentials

### Default Admin Account
- **Username**: `vonaer`
- **Password**: `vonaer@2027`

> ⚠️ **IMPORTANT**: These credentials are for initial setup only. In production, update the password hash in `/src/app/api/auth/login/route.ts`

## Setup Instructions

### 1. Environment Variables
Add to your `.env.local` file:
```env
AUTH_SECRET_KEY=your_secure_random_secret_key_here_minimum_32_characters_long
```

> **Security Note**: The `AUTH_SECRET_KEY` must be at least 32 characters long. Generate a secure random string for production use.

### 2. Files Created
```
src/
├── lib/
│   └── session.ts                    # Session configuration
├── app/
│   ├── admin/
│   │   ├── page.tsx                  # Admin dashboard (protected)
│   │   └── login/
│   │       └── page.tsx              # Login page
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts          # Login API
│           ├── logout/
│           │   └── route.ts          # Logout API
│           └── session/
│               └── route.ts          # Session check API
└── middleware.ts                     # Route protection middleware
```

## How It Works

### 1. Login Flow
1. User visits `/admin` (protected route)
2. Middleware redirects to `/admin/login?redirect=/admin`
3. User enters credentials
4. API validates credentials and creates session
5. User redirected back to original page

### 2. Session Management
- Sessions stored in encrypted HTTP-only cookies
- Cookie name: `vonaer-admin-session`
- Session duration: 7 days
- Automatic expiration and cleanup

### 3. Route Protection
The middleware (`src/middleware.ts`) protects:
- All `/admin/*` routes (except `/admin/login`)
- All `/api/admin/*` routes

### 4. Logout Flow
1. User clicks "Logout" button
2. API destroys session cookie
3. User redirected to login page

## Usage

### Accessing Admin Dashboard
1. Navigate to `http://localhost:3000/admin`
2. Login with credentials:
   - Username: `vonaer`
   - Password: `vonaer@2027`
3. Access granted to dashboard

### Checking Session Status
```typescript
// Client-side check
const checkSession = async () => {
  const response = await fetch('/api/auth/session')
  const data = await response.json()
  return data.isLoggedIn
}
```

### Programmatic Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "vonaer",
    "password": "vonaer@2027"
  }'
```

### Programmatic Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

## Security Features

### Password Security
- Passwords hashed with bcrypt (10 rounds)
- Never stored in plain text
- Comparison done server-side only

### Session Security
- HTTP-only cookies (not accessible via JavaScript)
- Secure flag enabled in production (HTTPS only)
- SameSite: Lax (CSRF protection)
- Encrypted with `iron-session`

### Middleware Protection
- Runs at the edge (fast)
- Protects routes before page load
- Automatic redirect for unauthorized access

## Production Deployment

### Update Password Hash
To change the admin password:

1. Generate new hash:
```javascript
const bcrypt = require('bcryptjs')
const newPassword = 'your-new-password'
const hash = bcrypt.hashSync(newPassword, 10)
console.log(hash)
```

2. Update in `/src/app/api/auth/login/route.ts`:
```typescript
const ADMIN_CREDENTIALS = {
  username: 'vonaer',
  passwordHash: 'YOUR_NEW_HASH_HERE',
}
```

### Environment Variables
Ensure these are set in Vercel/production:
- `AUTH_SECRET_KEY` - Long random string (32+ characters)

Already configured in `vercel.json`:
```json
{
  "env": {
    "AUTH_SECRET_KEY": "vonaer_admin_secret_key_2027..."
  }
}
```

## Troubleshooting

### "Invalid credentials" error
- Verify username is exactly `vonaer`
- Verify password is exactly `vonaer@2027`
- Check console for detailed error messages

### Session not persisting
- Verify `AUTH_SECRET_KEY` is set in `.env.local`
- Check browser allows cookies
- Ensure key is at least 32 characters

### Middleware not protecting routes
- Verify `/src/middleware.ts` exists
- Check middleware matcher configuration
- Restart development server

### Redirect loop
- Clear browser cookies
- Verify session configuration is correct
- Check middleware logic

## API Reference

### POST /api/auth/login
Login with credentials

**Request:**
```json
{
  "username": "vonaer",
  "password": "vonaer@2027"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "username": "vonaer"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### POST /api/auth/logout
Destroy current session

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/session
Check current session status

**Response (Logged in):**
```json
{
  "isLoggedIn": true,
  "user": {
    "userId": "admin-1",
    "username": "vonaer"
  }
}
```

**Response (Not logged in):**
```json
{
  "isLoggedIn": false,
  "user": null
}
```

## Dependencies

```json
{
  "iron-session": "^8.x",
  "bcryptjs": "^2.x",
  "@types/bcryptjs": "^2.x" (dev)
}
```

## Further Enhancements

Future improvements could include:
- Multiple admin users with database storage
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- Password reset functionality
- Session activity logging
- Brute force protection
- Email notifications for logins
