const clientID = '3a4b48d239654bd4b8ad3bc7240d19c4';
const redirectURI = encodeURIComponent(window.location.href);

let userAccessToken = null;

export const Spotify = {
  getAccessToken() {
    if (userAccessToken !== null) return userAccessToken;
    //

    if (!window.location.hash) {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      return null;
    }

    const HASH = window.location.hash;
    const accessToken = HASH.match(/access_token=([^&]*)/);
    const expiresIn = HASH.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      userAccessToken = accessToken[1];

      window.setTimeout(() => (userAccessToken = null), +expiresIn[1] * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    }

    return null;
  },

  setAccessToken() {},

  async search(term) {
    return fetch(
      'https://api.spotify.com/v1/search?type=track&q=' +
        encodeURIComponent(term),
      {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      }
    )
      .then((response) => response.json())
      .then(({ tracks }) => {
        return tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },
};
