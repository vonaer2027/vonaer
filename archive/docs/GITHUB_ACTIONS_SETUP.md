# GitHub Actions Scraper Setup Guide

This guide explains how to set up automated flight scraping using GitHub Actions.

## 🎯 Overview

The GitHub Actions workflow automatically scrapes empty leg flights from Jet-Bay and uploads them to Supabase on a scheduled basis.

### Features
- ✅ **Automated Schedule**: Runs every 6 hours
- ✅ **Manual Trigger**: Run on-demand from GitHub UI
- ✅ **Robust Error Handling**: 3 retry attempts with 30-second delays
- ✅ **Data Artifacts**: Downloads JSON files for debugging (7-day retention)
- ✅ **Direct Supabase Upload**: No external services needed
- ✅ **Chrome/Chromium Auto-detection**: Works across environments
- ✅ **Comprehensive Logging**: Detailed summaries and error reports

---

## 📋 Prerequisites

1. **GitHub Repository** - Your code must be in a GitHub repository
2. **Supabase Account** - Active Supabase project with `flights` table
3. **Supabase Credentials** - Project URL and Service Role Key

---

## 🔐 Step 1: Configure GitHub Secrets

You need to add your Supabase credentials as GitHub Secrets:

### How to Add Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase Project Settings → API → Service Role Key (secret!) |

### ⚠️ Important Notes:
- Use **Service Role Key**, NOT the anon/public key
- Keep these secrets private - never commit them to code
- Service Role Key bypasses Row Level Security (needed for batch uploads)

---

## 📅 Step 2: Understand the Schedule

The workflow runs automatically:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
```

### Customize Schedule (Optional)

Edit `.github/workflows/scrape-flights.yml` to change timing:

| Schedule | Cron Expression | Description |
|----------|----------------|-------------|
| Every 4 hours | `0 */4 * * *` | 00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC |
| Every 12 hours | `0 */12 * * *` | 00:00, 12:00 UTC |
| Daily at 3am UTC | `0 3 * * *` | Once per day |
| Twice daily | `0 6,18 * * *` | 06:00 and 18:00 UTC |

🔗 Use [Crontab.guru](https://crontab.guru/) to create custom schedules

---

## 🚀 Step 3: Manual Trigger

You can run the scraper manually anytime:

1. Go to **Actions** tab in your GitHub repository
2. Click **Scrape Empty Leg Flights** workflow
3. Click **Run workflow** dropdown
4. Select branch (usually `main`)
5. (Optional) Enable debug mode for verbose logging
6. Click **Run workflow**

---

## 📊 Step 4: Monitor Results

### View Workflow Logs

1. Go to **Actions** tab
2. Click on the workflow run
3. Click **scrape** job
4. Expand steps to see detailed logs

### Check Scraped Data

The workflow generates artifacts you can download:

1. Go to completed workflow run
2. Scroll to **Artifacts** section
3. Download `flight-data-XXX.zip`
4. Extract to see JSON file with scraped data

### Workflow Summary

Each run generates a summary showing:
- ✅ Run status (success/failure)
- 📊 Number of flights scraped
- 🕒 Execution time
- 📁 Data file name

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. **Workflow fails with "Missing Supabase configuration"**
**Solution**: Check that you've added `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets correctly.

```bash
# Verify in GitHub: Settings → Secrets → Actions
# Both secrets should be listed
```

#### 2. **Browser/Chrome errors**
**Solution**: The workflow automatically installs Chromium. If issues persist:
- Check workflow logs for specific errors
- Verify `Install Chrome dependencies` step completed successfully

#### 3. **Timeout errors (30-minute limit)**
**Solution**: Reduce scope or increase timeout:

```yaml
# In .github/workflows/scrape-flights.yml
jobs:
  scrape:
    timeout-minutes: 45  # Increase from 30
```

#### 4. **No flights scraped**
**Solution**:
- Check if Jet-Bay website structure changed
- Review browser console logs in workflow output
- Enable debug mode for verbose logging

#### 5. **Duplicate flights in database**
**Solution**: The scraper has built-in duplicate prevention. Check:
- `flight_id` uniqueness constraint exists in Supabase
- Archiving logic is working (old flights marked inactive)

---

## 🔧 Advanced Configuration

### Enable Debug Mode

For verbose logging during manual runs:

1. Trigger workflow manually
2. Check **Enable debug mode** checkbox
3. Run workflow
4. View detailed browser console logs

### Modify Retry Logic

Edit `.github/workflows/scrape-flights.yml`:

```yaml
- name: Run scraper (with retry)
  uses: nick-fields/retry@v3
  with:
    timeout_minutes: 20      # Timeout per attempt
    max_attempts: 5          # Change from 3 to 5
    retry_wait_seconds: 60   # Wait 60s between retries
```

### Add Slack/Discord Notifications

Add webhook notification on failure:

```yaml
- name: Notify on failure
  if: failure()
  run: |
    curl -X POST ${{ secrets.SLACK_WEBHOOK_URL }} \
      -H 'Content-Type: application/json' \
      -d '{"text":"❌ Flight scraper failed! Run: ${{ github.run_number }}"}'
```

1. Create Slack/Discord webhook
2. Add webhook URL as GitHub Secret: `SLACK_WEBHOOK_URL`
3. Uncomment notification step in workflow

---

## 📈 Performance & Limits

### GitHub Actions Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| Workflow timeout | 6 hours max | Our workflow: 30 minutes |
| Job timeout | Set per job | Our scraper: 30 minutes |
| Concurrent jobs | 20 (free tier) | We use 1 |
| Artifact storage | 7 days default | Configurable |

### Free Tier Usage

GitHub Free tier includes:
- ✅ 2,000 minutes/month for private repos
- ✅ Unlimited for public repos

**Our usage**: ~10 minutes/run × 4 runs/day × 30 days = **1,200 minutes/month** ✅

---

## 🔍 Workflow Structure

```
.github/workflows/scrape-flights.yml
│
├── Trigger: Cron schedule (every 6 hours) + Manual
├── Setup: Node.js 20, Chrome dependencies, Chromium
├── Configure: Environment variables from secrets
├── Execute: Run unified-crawler-with-upload.js (with retry)
├── Upload: Save JSON artifacts (7-day retention)
├── Summary: Generate GitHub summary with stats
└── Notify: Alert on failure
```

---

## 📝 Environment Variables

The workflow sets these automatically:

| Variable | Value | Purpose |
|----------|-------|---------|
| `HEADLESS` | `true` | Run browser in headless mode |
| `SAVE_TO_FILE` | `true` | Save JSON file for artifacts |
| `SUPABASE_URL` | From secrets | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | From secrets | Authentication |
| `DATABASE_TABLE_NAME` | `flights` | Target table |

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] GitHub Secrets added (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Workflow file exists: `.github/workflows/scrape-flights.yml`
- [ ] Manual trigger test successful
- [ ] Flights appear in Supabase `flights` table
- [ ] JSON artifact downloadable from workflow run
- [ ] Workflow summary shows correct stats
- [ ] Next scheduled run visible in Actions tab

---

## 🆘 Support

If you encounter issues:

1. **Check workflow logs** - Most errors are shown in detail
2. **Review Supabase logs** - Database errors appear here
3. **Test locally** - Run `node unified-crawler-with-upload.js` locally first
4. **Enable debug mode** - Get verbose browser console output

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Puppeteer Documentation](https://pptr.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Cron Expression Guide](https://crontab.guru/)

---

**Last Updated**: 2025-10-27
**Version**: 1.0
