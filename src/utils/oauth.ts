export const getOAuthUrl = (provider: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://app.gen21.com.au/api';
  const clientId = getClientId(provider);
  const redirectUri = `${window.location.origin}/auth/callback/${provider}`;

  const urls: { [key: string]: string } = {
    google: `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile&response_type=code`,
    facebook: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile`,
    twitter: `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=tweet.read%20users.read%20offline.access&state=state123&code_challenge=challenge123&code_challenge_method=plain`,
    apple: `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code%20id_token&scope=name%20email&response_mode=form_post`
  };

  return urls[provider];
};

const getClientId = (provider: string): string => {
  const clientIds: { [key: string]: string } = {
    google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
    twitter: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID || '',
    apple: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || ''
  };
  return clientIds[provider];
};
