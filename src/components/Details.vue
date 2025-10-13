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
    <div v-else-if="track">
      <!-- Year Section - Above the content block -->
      <div class="year-section">
        <h2 class="year">{{ getEventByTrackId(this.id)?.year }}</h2>
      </div>

      <div class="track-details">
        <div class="two-column-layout">
        <!-- Event Data Column -->
        <div class="event-column">
          <img :src="getEventByTrackId(this.id)?.imageUrl" :alt="getEventByTrackId(this.id)?.imageAlt" class="event-image" />
          <p class="event-title">{{ getEventByTrackId(this.id)?.title }}</p>
          <p class="description">{{ getEventByTrackId(this.id)?.description }}</p>
          <p class="caption">{{ getEventByTrackId(this.id)?.caption }}</p>
        </div>

        <!-- Spotify Data Column -->
        <div class="spotify-column">
          <img :src="track.album && track.album.images[0] ? track.album.images[0].url : ''" :alt="track.name" class="spotify-image" />
          <h3>{{ track.name }}</h3>
          <p class="artist">by {{ track.artists && track.artists[0] ? track.artists[0].name : 'Unknown Artist' }}</p>
          <p class="album">Album: {{ track.album ? track.album.name : 'Unknown Album' }}</p>
        </div>
      </div>
      
      <!-- Spotify Link Section - Centered below columns -->
      <div class="spotify-link-section">
        <a v-if="track.external_urls && track.external_urls.spotify" :href="track.external_urls.spotify" target="_blank"
          class="spotify-link">
          Open in Spotify
        </a>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 3em;
  color: black;
  font-family: "new-kansas", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.loading,
.error {
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
  max-width: 90em;
  margin: 0 auto;
  padding: 3em;
  background: linear-gradient(0deg, rgba(235, 143, 143, 1) 0%, rgba(245, 125, 125, 1) 31%, rgba(255, 210, 148, 1) 100%);
  border-radius: 1.5em;
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15);
}

.year-section {
  text-align: center;
  margin-bottom: 3em;
  max-width: 90em;
  margin: 0 auto 3em auto;
}

.year {
  font-size: 4.5rem;
  font-weight: bold;
  color: black;
  margin: 0;
  text-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);
}

.spotify-link-section {
  text-align: center;
  margin-top: 2.5em;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10em;
  align-items: start;
}

.spotify-column {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-column {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spotify-image {
  max-width: 20em;
  height: 20em;
  object-fit: cover;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15);
  margin-bottom: 1.2em;
}

.event-image {
  max-width: 20em;
  height: 20em;
  object-fit: cover;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.15);
  margin-bottom: 1.2em;
}

.track-details h3 {
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0 0 0.375em 0;
  color: black;
}

.artist {
  font-size: 1.8em;
  font-weight: 400;
  margin: 0.6em 0 1.5em 0;
  color: black;
}

.album,
.release-date {
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 0.75em 0;
  color: black;
  line-height: 1.4;
}

.spotify-link {
  display: inline-block;
  margin: 0;
  padding: 1em 2em;
  background-color: #1DB954;
  color: white;
  text-decoration: none;
  border-radius: 1.56em;
  font-weight: 600;
  font-family: "new-kansas", sans-serif;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
}

.spotify-link:hover {
  background-color: #1ed760;
  transform: scale(1.02);
}

p {
 
  font-weight: bold;
  color: black;
  
}

.event-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: black;
  margin: 0.2em 0 0.375em 0;
  line-height: 1.2;
}

.description {
  font-size: 1.6rem;
  font-weight: 400;
  color: black;
  margin: 0.9em 0 0.375em 0;
  line-height: 1.4;
}

.caption {
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin: 0 0 0.75em 0;
  line-height: 1.4;
}

@media screen and (max-width: 90em) {
  .track-details {
    max-width: 65em;
  }
  
  .two-column-layout {
    gap: 4em;
  }
}

@media screen and (max-width: 50em) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 3em;
  }
  
  .track-details {
    max-width: 37.5em;
  }
}

@media screen and (max-width: 31.25em) {
  .item {
    margin-top: 5em;
  }

  .track-details {
    padding: 1.25em;
    margin: 0 1em;
    max-width: none;
  }

  .two-column-layout {
    gap: 1.5em;
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

  .album,
  .release-date {
    font-size: 1rem;
  }

  .spotify-image,
  .event-image {
    max-width: 12.5em;
    height: 12.5em;
  }

  .spotify-link {
    padding: 0.625em 1.25em;
    font-size: 0.9em;
  }

  .year-section {
    margin-bottom: 1.5em;
  }

  .year {
    font-size: 2.5rem;
  }

  .spotify-link-section {
    margin-top: 1.5em;
  }

  .event-title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .caption {
    font-size: 1rem;
  }
}
</style>
