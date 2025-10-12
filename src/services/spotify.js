// Spotify API Configuration
export const spotifyConfig = {
  clientId: '6e63c82f396e41038413047e5c1a8157',
  clientSecret: '2744765a35844aaf84521a468301c471'
}

// Spotify API helper functions
export const getSpotifyAccessToken = async () => {
  const authString = btoa(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`)

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}

export const fetchSpotifyTrack = async (trackId, accessToken) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}