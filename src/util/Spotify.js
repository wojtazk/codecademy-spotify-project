const clientID = '3a4b48d239654bd4b8ad3bc7240d19c4';
const redirectURI = 'http://localhost:3000/';

const userAccessToken = null;

export const Spotify = {
  getAccessToken() {
    if (userAccessToken !== null) return userAccessToken;

    const URL = window.location.href;
    const accessToken = URL.match(/access_token=([^&]*)/);
    const expiresIn = URL.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      userAccessToken = accessToken;

      window.setTimeout(() => (userAccessToken = null), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return;
    }

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  },
};
