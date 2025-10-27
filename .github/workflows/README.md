# GitHub Actions Workflows

## 🤖 Automated Flight Scraper

**File**: `scrape-flights.yml`

### Quick Start

1. **Add GitHub Secrets** (Settings → Secrets → Actions):
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

2. **Workflow runs automatically** every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)

3. **Manual trigger**: Actions tab → Scrape Empty Leg Flights → Run workflow

### What It Does

- 🌐 Scrapes Jet-Bay for empty leg flights (East Asia → South Korea)
- 🗄️ Uploads data directly to Supabase
- 💾 Saves JSON file as downloadable artifact
- 🔄 Retries 3 times on failure
- 📊 Generates summary with stats

### Common Commands

```bash
# Test locally (set env vars in .env first)
node unified-crawler-with-upload.js

# View workflow status
gh run list --workflow=scrape-flights.yml

# Download latest artifact
gh run download
```

### Monitoring

- **Actions Tab**: See all runs and logs
- **Artifacts**: Download JSON files (7-day retention)
- **Summary**: Each run shows flight count and status

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Missing secrets | Add in Settings → Secrets → Actions |
| Browser errors | Check Chrome dependencies installation step |
| Timeout | Increase `timeout-minutes` in workflow |
| No flights | Check browser console logs, enable debug mode |

📖 **Full documentation**: [GITHUB_ACTIONS_SETUP.md](../../GITHUB_ACTIONS_SETUP.md)
