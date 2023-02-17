const spotifyAPI = 'https://api.spotify.com/v1/';
const clientID = '3a4b48d239654bd4b8ad3bc7240d19c4';
const redirectURI = encodeURIComponent(window.location.href); // I have no idea what the domain name is going to be, so... it is what it is

let userAccessToken = null;

export const Spotify = {
  getAccessToken() {
    if (userAccessToken !== null) return userAccessToken;
    //

    if (!window.location.hash) {
      window.location.replace(
        `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      );

      return;
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

  async search(term) {
    return fetch(
      spotifyAPI + 'search?type=track&q=' + encodeURIComponent(term),
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

  async savePLaylist(name, trackURIs) {
    if (!name || !trackURIs) return;

    if (userAccessToken === null) {
      this.getAccessToken();
      this.getAccessToken();
    }

    console.log(name, trackURIs);

    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };

    // get user id
    const userID = await fetch(spotifyAPI + 'me', { headers: headers })
      .then((response) => {
        if (!response.ok || response.status !== 200)
          throw new Error('Fetching userId failed!');
        // console.log(response);

        return response.json();
      })
      .then((user) => {
        console.log('user: ', user);
        return user.id;
      })
      .catch((err) => console.log(err));

    // create a new playlist and get it's id
    const playlistID = await fetch(
      spotifyAPI + 'users/' + userID + '/playlists',
      {
        method: 'POST',
        body: JSON.stringify({
          name: name,
        }),

        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (!response.ok || response.status !== 201)
          throw new Error('Creating Playlist failed!');
        // console.log(response);

        return response.json();
      })
      .then((playlist) => {
        console.log('playlist: ', playlist);
        return playlist.id;
      })
      .catch((err) => console.log(err));

    // finally -> add tracks to the new playlist
    return fetch(spotifyAPI + 'playlists/' + playlistID + '/tracks', {
      method: 'POST',
      body: JSON.stringify({
        uris: trackURIs,
      }),
      headers: { ...headers, 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok || response.status !== 201)
          throw new Error('Adding tracks to the playlist failed!');
        // console.log(response);

        return response.json();
      })
      .then((data) => console.log('playlist snapshot id: ', data))
      .catch((err) => console.log(err));
  },
};
