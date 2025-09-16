# Admin Dashboard for Empty Leg Flights

A modern admin dashboard built with Next.js 14, Shadcn UI, and Supabase for managing empty leg flights, users, and pricing margins.

## Features

### 🛩️ Flight Management
- Display empty leg flights in beautiful card format
- Real-time pricing with margin calculations
- Filter and search functionality
- Korea route highlighting

### 👥 User Management (CRUD)
- Add, edit, and delete users
- Korean phone number validation (+82 format)
- Contact information management
- User status tracking

### 💰 Margin Settings
- Dynamic pricing margin configuration
- Real-time price adjustments
- Margin history tracking
- Example pricing calculations

### 🎨 Modern UI/UX
- Custom color theme with teal/dark palette
- Responsive design for all devices
- Smooth animations with Framer Motion
- Accessible components with Radix UI
- Toast notifications with Sonner

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI + Radix UI
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Notifications**: Sonner

## Setup Instructions

### 1. Environment Setup

1. Copy the environment example file:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### 2. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the SQL schema in your Supabase SQL Editor:
   ```sql
   -- Copy and paste the contents of supabase-schema.sql
   ```

3. The schema will create:
   - `flights` table (for empty leg flight data)
   - `users` table (for user management)
   - `margin_settings` table (for pricing margins)
   - Appropriate indexes and RLS policies

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the admin dashboard.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Custom theme and Tailwind config
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main admin dashboard
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── flight-card.tsx      # Flight display card
│   ├── user-management.tsx  # User CRUD interface
│   └── margin-settings.tsx  # Margin configuration
└── lib/
    ├── supabase.ts          # Database client and services
    └── utils.ts             # Utility functions
```

## Key Features Explained

### Flight Cards
- Beautiful card layout displaying flight information
- Dynamic pricing with margin calculations
- Aircraft type, route, date, and seat information
- Korea route badges for easy identification

### User Management
- Full CRUD operations (Create, Read, Update, Delete)
- Korean phone number validation (+82-XX-XXXX-XXXX format)
- Contact information with email and notes
- User status management (active/inactive)

### Margin Settings
- Set percentage margins applied to all flights
- Real-time price calculation examples
- Complete history of margin changes
- Immediate application to all flight prices

### Database Schema

#### Users Table
```sql
- id: Primary key
- name: Full name (required)
- phone_number: Korean format (+82-XX-XXXX-XXXX, unique)
- email: Optional email address
- is_active: User status (default: true)
- notes: Additional information
- created_at/updated_at: Timestamps
```

#### Margin Settings Table
```sql
- id: Primary key
- margin_percentage: Decimal percentage (0-100)
- is_active: Current active margin
- created_by: Who set this margin
- created_at/updated_at: Timestamps
```

## Customization

### Theme Colors
The custom theme is defined in `src/app/globals.css` with:
- Primary: Teal/dark blue (#224042)
- Background: Light gray (#f8f9fa)
- Cards: White with subtle shadows
- Dark mode support included

### Adding New Features
1. Create new components in `src/components/`
2. Add database operations to `src/lib/supabase.ts`
3. Update types and interfaces as needed
4. Follow the existing pattern for consistent UI/UX

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Support

For issues or questions:
1. Check the console for error messages
2. Verify Supabase connection and credentials
3. Ensure database schema is properly set up
4. Check network connectivity to Supabase

## License

MIT License - feel free to use this project for your own purposes.