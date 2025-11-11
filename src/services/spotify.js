// Spotify API Configuration
export const spotifyConfig = {
  clientId: '63da29af8857413fae0c8f3670bf3a26',
  clientSecret: 'c8e7c817be7f4a50be6de41a5b9ec35b'
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

// Fetch multiple tracks in a single API call (up to 50 tracks)
export const fetchMultipleSpotifyTracks = async (trackIds, accessToken) => {
  // Join track IDs with commas for the API call
  const idsParam = trackIds.join(',')
  
  const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${idsParam}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  return data.tracks // Returns array of track objects
}