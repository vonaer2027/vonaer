# Empty Leg Flights Crawler - Railway Deployment Guide

This guide walks you through deploying the crawler to Railway with GitHub Actions for scheduled execution.

## 📋 Prerequisites

- GitHub account
- Railway account (free tier: https://railway.app)
- Supabase project credentials

## 🚀 Part 1: Deploy to Railway

### Step 1: Install Railway CLI (Optional, for testing)

```bash
npm install -g @railway/cli
railway login
```

### Step 2: Create Railway Project

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select the `emptyleg` repository
5. Railway will auto-detect the Dockerfile

### Step 3: Configure Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```env
# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Crawler authentication (generate a random string)
CRAWLER_SECRET=your_random_secret_string_here

# Optional: Node environment
NODE_ENV=production
```

**Generate a secure CRAWLER_SECRET:**
```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use Node:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 4: Deploy

1. Click **"Deploy"** in Railway
2. Wait 3-5 minutes for build to complete
3. Railway will provide a URL like: `https://your-app.railway.app`

### Step 5: Test the Deployment

```bash
# Test health check
curl https://your-app.railway.app/health

# Test status
curl https://your-app.railway.app/status

# Test crawler (replace YOUR_SECRET)
curl -X POST https://your-app.railway.app/crawl \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json"
```

Expected response:
```json
{
  "success": true,
  "timestamp": "2025-10-23T...",
  "duration": "45.23s",
  "flightsScraped": 2,
  "message": "Crawler executed successfully"
}
```

## 🤖 Part 2: Setup GitHub Actions

### Step 1: Add GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

1. **RAILWAY_CRAWLER_URL**
   - Value: `https://your-app.railway.app` (from Railway dashboard)

2. **CRAWLER_SECRET**
   - Value: Same secret you used in Railway environment variables

### Step 2: Enable GitHub Actions

The workflow file is already created at `.github/workflows/crawl-flights.yml`

1. Go to repository → **Actions** tab
2. You should see **"Crawl Empty Leg Flights"** workflow
3. Click **"Enable workflow"** if prompted

### Step 3: Test Manual Trigger

1. Go to **Actions** tab
2. Select **"Crawl Empty Leg Flights"** workflow
3. Click **"Run workflow"** → **"Run workflow"** button
4. Wait for completion (about 1-2 minutes)
5. Check the logs to verify success

### Step 4: Verify Scheduled Runs

The workflow is configured to run every 6 hours:
- 12:00 AM (midnight)
- 6:00 AM
- 12:00 PM (noon)
- 6:00 PM

Check **Actions** tab to see scheduled runs.

## 📊 Monitoring

### Railway Logs

View real-time logs in Railway dashboard:
1. Go to your project
2. Click **"Deployments"**
3. Select latest deployment
4. View **"Logs"** tab

### GitHub Actions Logs

View execution history:
1. Go to repository → **Actions** tab
2. Select **"Crawl Empty Leg Flights"** workflow
3. Click on any run to see detailed logs

### Supabase Data

Check if flights are being updated:
```sql
-- Recent crawls
SELECT COUNT(*), MAX(created_at) as last_crawl
FROM flights
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Active flights
SELECT from_city, to_city, flight_date, price
FROM flights
WHERE is_active = true
ORDER BY flight_date;
```

## 🔧 Troubleshooting

### Crawler Fails with Timeout

**Railway free tier has 512MB RAM limit**

Solution: Optimize or upgrade to Hobby plan ($5/month, 8GB RAM)

### "Unauthorized" Error

Check that `CRAWLER_SECRET` matches in both:
- Railway environment variables
- GitHub Actions secrets

### Flights Not Updating

1. Check Railway logs for crawler errors
2. Verify Supabase credentials are correct
3. Check if Jet-Bay website structure changed

### GitHub Actions Not Running

1. Verify workflow file is in `.github/workflows/`
2. Check that Actions are enabled in repository settings
3. Verify cron schedule syntax is correct

## 📝 Customization

### Change Schedule

Edit `.github/workflows/crawl-flights.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours (current)
  - cron: '0 */3 * * *'  # Every 3 hours
  - cron: '0 0 * * *'    # Daily at midnight
  - cron: '0 0,12 * * *' # Twice daily (midnight & noon)
```

Cron syntax: `minute hour day month weekday`

### Add Notifications

Add to workflow file after the crawl step:

```yaml
- name: Notify Success
  if: success()
  run: |
    curl -X POST YOUR_SLACK_WEBHOOK_URL \
      -H 'Content-Type: application/json' \
      -d '{"text":"✅ Crawler completed: ${{ steps.crawl.outputs.flights }} flights"}'
```

## 💰 Cost Breakdown

### Railway Free Tier
- **Memory**: 512MB
- **Execution**: $5 credit/month
- **Bandwidth**: No limit
- **Builds**: Unlimited

**Estimated usage**: ~$2-3/month (well within free credit)

### Railway Hobby Plan ($5/month)
- **Memory**: 8GB
- **Execution**: Unlimited
- **Priority builds**
- Better for production

### GitHub Actions
- **Free**: 2,000 minutes/month
- Each crawl trigger: <1 minute
- **Cost**: $0 (well within free tier)

## 🔄 Updates and Maintenance

### Update Crawler Code

1. Push changes to GitHub
2. Railway auto-deploys from GitHub
3. Wait 3-5 minutes for build
4. Test with manual workflow trigger

### View Deployment History

Railway dashboard → **Deployments** → See all versions

### Rollback if Needed

Railway dashboard → **Deployments** → Click on previous version → **"Redeploy"**

## 📚 Additional Resources

- Railway Docs: https://docs.railway.app
- GitHub Actions Docs: https://docs.github.com/en/actions
- Cron Expression Generator: https://crontab.guru

## 🆘 Need Help?

1. Check Railway logs first
2. Check GitHub Actions logs
3. Test manually with curl command
4. Verify all environment variables are set

---

## Quick Reference

### Useful Commands

```bash
# Test Railway deployment
curl https://your-app.railway.app/health

# Trigger manual crawl
curl -X POST https://your-app.railway.app/crawl \
  -H "Authorization: Bearer YOUR_SECRET"

# View Railway logs
railway logs

# SSH into Railway container (debugging)
railway shell
```

### Important URLs

- Railway Dashboard: https://railway.app/dashboard
- GitHub Actions: https://github.com/YOUR_USERNAME/emptyleg/actions
- Supabase Dashboard: https://supabase.com/dashboard

---

**Setup Complete! 🎉**

Your crawler now runs automatically every 6 hours and keeps your empty leg flights database up-to-date.
