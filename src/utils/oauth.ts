export const getOAuthUrl = (provider: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.gen21.com.au';

  const urls: { [key: string]: string } = {
    google: `${baseUrl}/login/google`,
    facebook: `${baseUrl}/login/facebook`,
    twitter: `${baseUrl}/login/twitter`,
    apple: `${baseUrl}/login/apple`,
  };

  return urls[provider];
};