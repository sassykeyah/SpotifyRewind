<script lang="js">

export default {
  name: 'Detail',
  props: ['id', 'year', 'title', 'description'],
  data() {
    return {
      clientId: '6e63c82f396e41038413047e5c1a8157',         
      clientSecret: '2744765a35844aaf84521a468301c471', 
      accessToken: '',
      track: null,
      isLoading: true,
      error: null
    }
  },
  async mounted() {
    await this.getAccessToken()
    await this.fetchTrack()
    
  },
  methods: {
    async getAccessToken() {
      const authString = btoa(`${this.clientId}:${this.clientSecret}`)

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })

      const data = await response.json()
      this.accessToken = data.access_token
    },
    async fetchTrack() {
      this.isLoading = true
      this.error = null
      
      try {
        const res = await fetch('https://api.spotify.com/v1/tracks/' + this.id, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const track = await res.json()
        this.track = track
        console.log('Track loaded:', track)
        
      } catch (error) {
        console.error(`Error fetching track ${this.id}:`, error)
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<template>
  <div class="item">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      <p>Loading track...</p>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="fetchTrack">Retry</button>
    </div>
    
    <!-- Success state - only render when track data is available -->
    <div v-else-if="track" class="track-details">
      <img :src="track.album && track.album.images[0] ? track.album.images[0].url : ''" :alt="track.name" />
      <h3>{{ track.name }}</h3>
      <p class="artist">by {{ track.artists && track.artists[0] ? track.artists[0].name : 'Unknown Artist' }}</p>
      <p class="album">Album: {{ track.album ? track.album.name : 'Unknown Album' }}</p>
      <p class="release-date">Released: {{ track.album ? track.album.release_date : 'Unknown' }}</p>
      
      <!-- Spotify link -->
      <a v-if="track.external_urls && track.external_urls.spotify" 
         :href="track.external_urls.spotify" 
         target="_blank" 
         class="spotify-link">
        Open in Spotify
      </a>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 100px;
  color: #3e3d3d;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #d32f2f;
}

.error button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #3e3d3d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error button:hover {
  background-color: #2c2c2c;
}

.track-details {
  text-align: center;
}

.track-details img {
  padding-top: 20px;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.track-details h3 {
  font-size: 2rem;
  margin: 20px 0 10px 0;
  color: #2c2c2c;
}

.artist {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px 0;
  color: #4a4a4a;
}

.album, .release-date {
  font-size: 1.2rem;
  margin: 8px 0;
  color: #666;
}

.spotify-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #1DB954;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.spotify-link:hover {
  background-color: #1ed760;
}

p {
  font-size: 20px;
}

@media screen and (max-width: 500px) {
  p {
    font-size: 16px;
  }
  
  .track-details h3 {
    font-size: 1.5rem;
  }
  
  .artist {
    font-size: 1.2rem;
  }
  
  .album, .release-date {
    font-size: 1rem;
  }
}
</style>
