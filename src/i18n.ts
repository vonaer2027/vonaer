import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'kr', 'jp', 'cn'];

export default getRequestConfig(async ({ locale }) => {
  // Default to Korean if no locale is provided
  const validLocale = locale && locales.includes(locale) ? locale : 'kr';

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
