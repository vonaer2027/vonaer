# Supabase Storage Setup for Flight Images

## ✅ Bucket Created Successfully

The `flight-images` bucket has been created in your Supabase project. Here's what was set up:

### 📦 Bucket Configuration
- **Name**: `flight-images`
- **Public**: `true` (images are publicly accessible)
- **File Size Limit**: 5MB per file
- **Allowed MIME Types**: 
  - `image/jpeg`
  - `image/png` 
  - `image/webp`
  - `image/gif`

### 🔐 Security Policies
The bucket is configured with Row Level Security (RLS) policies:

1. **Public Read Access**: Anyone can view images
2. **Authenticated Upload**: Only authenticated users can upload
3. **User Management**: Users can update/delete their own uploads

## 🚀 Next Steps

### Option 1: Manual SQL Setup (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `setup-supabase-storage.sql`
4. Run the SQL script to set up proper permissions

### Option 2: Automatic Setup (Already Done)
The bucket was created automatically using the Node.js script.

## 🧪 Testing Image Upload

1. Go to `http://localhost:3000/admin`
2. Navigate to the **Flights** tab
3. Click **Add Flight** or **Edit** an existing flight
4. Try uploading an image using the **Upload Images** button

## 🔧 Troubleshooting

### If you still get "Bucket not found" errors:

1. **Check Environment Variables**:
   ```bash
   # Make sure these are in your .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Verify Bucket Exists**:
   - Go to Supabase Dashboard → Storage
   - You should see `flight-images` bucket listed

3. **Check Permissions**:
   - Run the SQL script in `setup-supabase-storage.sql`
   - This sets up proper RLS policies

### Common Issues:

- **403 Forbidden**: Run the SQL setup script for proper permissions
- **File too large**: Images must be under 5MB
- **Invalid file type**: Only JPEG, PNG, WebP, and GIF are allowed

## 📁 File Structure

Uploaded images will be stored as:
```
flight-images/
├── 1703123456789-abc123.jpg
├── 1703123456790-def456.png
└── ...
```

Each file gets a unique timestamp-based name to prevent conflicts.

## 🌐 Public URLs

Images will be accessible via:
```
https://your-project.supabase.co/storage/v1/object/public/flight-images/filename.jpg
```

These URLs can be used directly in your flight cards and MMS messages.


