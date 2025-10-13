<script lang="js">
import { getEventByTrackId } from '@/data/events.js'
import { getSpotifyAccessToken, fetchSpotifyTrack } from '@/services/spotify.js'

export default {
  name: 'Detail',
  props: ['id'],
  data() {
    return {
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
      this.accessToken = await getSpotifyAccessToken()
    },
    async fetchTrack() {
      this.isLoading = true
      this.error = null
      
      try {
        const track = await fetchSpotifyTrack(this.id, this.accessToken)
        this.track = track
        console.log('Track loaded:', track)
        
      } catch (error) {
        console.error(`Error fetching track ${this.id}:`, error)
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    getEventByTrackId(trackId) {
      return getEventByTrackId(trackId)
    }
  }
}
</script>

<template>
  <div class="item">
    <!-- Add this line to display title from events using trackId -->
    
    
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
      
      <p>{{ getEventByTrackId(this.id)?.year }}</p>
    <p>{{ getEventByTrackId(this.id)?.title }}</p>
    <p>{{ getEventByTrackId(this.id)?.description }}</p>
    <!-- In any Vue component -->
<img :src="getEventByTrackId(this.id)?.imageUrl" :alt="getEventByTrackId(this.id)?.imageAlt" />
      
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
  margin-top: 6.25em; 
  color: black; 
  font-family: "new-kansas", sans-serif; 
  font-weight: 400;
  font-style: normal;
}

.loading, .error {
  text-align: center;
  padding: 1.25em; 
}

.error {
  color: #d32f2f;
}

.error button {
  margin-top: 0.625em; 
  padding: 0.5em 1em; 
  background-color: #3e3d3d;
  color: white;
  border: none;
  border-radius: 0.25em; 
  cursor: pointer;
  font-family: "new-kansas", sans-serif;
  transition: background-color 0.3s ease;
}

.error button:hover {
  background-color: #2c2c2c;
}

.track-details {
  text-align: center;
  max-width: 37.5em; 
  margin: 0 auto;
  padding: 2em; 
  background: linear-gradient(0deg,rgba(235, 143, 143, 1) 0%, rgba(245, 125, 125, 1) 31%, rgba(255, 210, 148, 1) 100%);
  border-radius: 1.5em; 
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15); 
}

.track-details img {
  padding-top: 1.25em; 
  max-width: 15.625em; 
  height: 15.625em; 
  object-fit: cover;
  border-radius: 0.75em; 
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15); 
  margin-bottom: 1em;
}

.track-details h3 {
  font-size: 2.2rem; 
  font-weight: bold; 
  margin: 0.5em 0 0.375em 0; 
  color: black; 
}

.artist {
  font-size: 1.4em; 
  font-weight: 400; 
  margin: 0.1875em 0; 
  color: black; 
}

.album, .release-date {
  font-size: 1.1rem; 
  font-weight: 400;
  margin: 0.375em 0 0.75em 0; 
  color: black; 
  line-height: 1.4; 
}

.spotify-link {
  display: inline-block;
  margin-top: 1.25em; 
  padding: 0.75em 1.5em; 
  background-color: #1DB954;
  color: white;
  text-decoration: none;
  border-radius: 1.56em; 
  font-weight: 600;
  font-family: "new-kansas", sans-serif; 
  transition: background-color 0.3s ease;
}

.spotify-link:hover {
  background-color: #1ed760;
  transform: scale(1.02); 
}

p {
  font-size: 1.25em; 
  font-weight: bold; 
  color: black; 
  margin: 0.5em 0; 
}

@media screen and (max-width: 31.25em) { 
  .item {
    margin-top: 5em;
  }
  
  .track-details {
    padding: 1.25em; 
    margin: 0 1em; 
  }
  
  p {
    font-size: 1em; 
  }
  
  .track-details h3 {
    font-size: 1.5rem;
  }
  
  .artist {
    font-size: 1.2em;
  }
  
  .album, .release-date {
    font-size: 1rem;
  }
  
  .track-details img {
    max-width: 12.5em; 
    height: 12.5em;
  }
  
  .spotify-link {
    padding: 0.625em 1.25em; 
    font-size: 0.9em;
  }
}
</style>
