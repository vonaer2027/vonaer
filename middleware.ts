// Temporarily disabled middleware to fix Vercel routing issues
// The i18n will work through the LocaleProvider component

export function middleware() {
  // No-op middleware to prevent routing issues
}

export const config = {
  // Disable middleware matching to prevent routing conflicts
  matcher: []
};
