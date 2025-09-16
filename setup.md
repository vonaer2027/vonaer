# Quick Setup Guide

## 🚀 Getting Started

### 1. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and API keys from Settings > API
3. Create `.env.local` file:
   ```bash
   cp env.example .env.local
   ```
4. Update `.env.local` with your credentials

### 2. Run Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to create all tables and policies

### 3. Start Development
```bash
npm install
npm run dev
```

## 📋 What You Get

### ✅ Admin Dashboard Features
- **Flight Cards Display**: Beautiful cards showing empty leg flights with pricing
- **User Management**: Full CRUD for customer management with Korean phone validation
- **Margin Settings**: Dynamic pricing with percentage margins and history tracking
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live data from Supabase
- **Modern UI**: Shadcn UI components with custom theme

### 🎨 Design Features
- Custom teal/dark color scheme
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Accessible components with proper ARIA labels
- Dark mode support

### 📱 User Management
- Add users with Korean phone numbers (+82 format)
- Edit user information
- Delete users with confirmation
- Track user creation dates
- Optional email and notes fields

### 💰 Margin Settings
- Set percentage margins (0-100%)
- See real-time pricing examples
- Track margin change history
- Immediate application to all flights

## 🔧 Customization

### Adding More Flight Data
To populate with real flight data, you can:
1. Use the existing crawler in the parent directory
2. Modify `upload-to-supabase.js` to point to your new database
3. Run the crawler to populate flights

### Modifying the Theme
Edit `src/app/globals.css` to change:
- Colors (CSS custom properties)
- Fonts
- Shadows and spacing

### Adding New Features
1. Create components in `src/components/`
2. Add database operations to `src/lib/supabase.ts`
3. Update types and add to main dashboard

## 🚨 Important Notes

- Make sure to set up RLS policies in Supabase for security
- Korean phone numbers must follow +82-XX-XXXX-XXXX format
- Margin changes apply immediately to all flight pricing
- The app requires Supabase connection to function

## 📞 Support

If you need help:
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Ensure database schema was applied correctly
4. Test Supabase connection in the dashboard
