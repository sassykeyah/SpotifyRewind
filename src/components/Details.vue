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
    <!-- Animated Background Shapes -->
    <div class="animated-background">
      <div class="shape circle-1"></div>
      <div class="shape circle-2"></div>
      <div class="shape triangle-1"></div>
      <div class="shape triangle-2"></div>
      <div class="shape square-1"></div>
      <div class="shape square-2"></div>
      <div class="shape diamond-1"></div>
      <div class="shape diamond-2"></div>
      <div class="shape hexagon-1"></div>
      <div class="shape line-1"></div>
      <div class="shape line-2"></div>
    </div>
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
          <div class="event-info">
            <p class="event-title">{{ getEventByTrackId(this.id)?.title }}</p>
            <p class="description">{{ getEventByTrackId(this.id)?.description }}</p>
            <p class="caption">{{ getEventByTrackId(this.id)?.caption }}</p>
          </div>
        </div>

        <!-- Spotify Data Column -->
        <div class="spotify-column">
          <img :src="track.album && track.album.images[0] ? track.album.images[0].url : ''" :alt="track.name" class="spotify-image" />
          <div class="spotify-info">
            <h3>{{ track.name }}</h3>
            <p class="artist">by {{ track.artists && track.artists[0] ? track.artists[0].name : 'Unknown Artist' }}</p>
            <p class="album">Album: {{ track.album ? track.album.name : 'Unknown Album' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Spotify Link Section - Centered below columns -->
      <div class="spotify-link-section">
        <a v-if="track.external_urls && track.external_urls.spotify" :href="track.external_urls.spotify" target="_blank"
          class="spotify-link">
          <img src="/images/SpotifyIcon.jpg" alt="Spotify Logo" class="spotify-logo" />
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
  position: relative;
}

/* Animated Background Container */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(249, 202, 147) 0%,  rgb(209, 97, 97) 75%);
}

/* Base shape styling */
.shape {
  position: absolute;
  opacity: 0.6;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* Circle shapes */
.circle-1 {
  width: 80px;
  height: 80px;
  background: #ff6b6b;
  border-radius: 50%;
  top: 20%;
  left: 10%;
  animation: float-1 8s infinite, rotate 20s infinite linear;
}

.circle-2 {
  width: 120px;
  height: 120px;
  background: #4ecdc4;
  border-radius: 50%;
  top: 60%;
  right: 15%;
  animation: float-2 12s infinite, rotate-reverse 25s infinite linear;
}

/* Triangle shapes */
.triangle-1 {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid #45b7d1;
  top: 30%;
  right: 25%;
  animation: float-3 10s infinite, spin 15s infinite linear;
}

.triangle-2 {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 80px solid #f7b731;
  bottom: 25%;
  left: 20%;
  animation: float-4 14s infinite, spin-reverse 18s infinite linear;
}

/* Square shapes */
.square-1 {
  width: 60px;
  height: 60px;
  background: #5f27cd;
  top: 15%;
  right: 35%;
  animation: float-5 9s infinite, pulse 6s infinite ease-in-out;
}

.square-2 {
  width: 90px;
  height: 90px;
  background: #00d2d3;
  bottom: 35%;
  right: 10%;
  animation: float-6 11s infinite, pulse 8s infinite ease-in-out;
}

/* Diamond shapes */
.diamond-1 {
  width: 50px;
  height: 50px;
  background: #ff9ff3;
  transform: rotate(45deg);
  top: 45%;
  left: 5%;
  animation: float-7 13s infinite, rotate 22s infinite linear;
}

.diamond-2 {
  width: 70px;
  height: 70px;
  background: #54a0ff;
  transform: rotate(45deg);
  top: 70%;
  right: 40%;
  animation: float-8 16s infinite, rotate-reverse 19s infinite linear;
}

/* Hexagon shape */
.hexagon-1 {
  width: 60px;
  height: 34.64px;
  background: #feca57;
  position: relative;
  top: 25%;
  left: 30%;
  animation: float-9 15s infinite, spin 20s infinite linear;
}

.hexagon-1:before,
.hexagon-1:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
}

.hexagon-1:before {
  bottom: 100%;
  border-bottom: 17.32px solid #feca57;
}

.hexagon-1:after {
  top: 100%;
  border-top: 17.32px solid #feca57;
}

/* Line shapes */
.line-1 {
  width: 200px;
  height: 4px;
  background: #ff6348;
  top: 40%;
  right: 5%;
  animation: float-10 18s infinite, stretch 12s infinite ease-in-out;
}

.line-2 {
  width: 150px;
  height: 6px;
  background: #2ed573;
  bottom: 45%;
  left: 25%;
  animation: float-11 20s infinite, stretch-reverse 14s infinite ease-in-out;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  margin: 0;
  padding: 1em 2em;
  background-color: #1DB954;
  color: black;
  text-decoration: none;
  border-radius: 1.56em;
  font-weight: 600;
  font-family: "new-kansas", sans-serif;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
}

.spotify-logo {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
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
  margin: 1.7em 0 0.375em 0;
  line-height: 1.4;
}

.caption {
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin: 0.9em 0 0.75em 0;
  line-height: 1.4;
}

/* Desktop/Large Screens (1440px and down) - Only reduce slightly for very large screens */
@media screen and (max-width: 90em) and (min-width: 85.51em) {
  .track-details {
    max-width: 65em;
  }
  
  .two-column-layout {
    gap: 4em;
  }
}

/* Laptop Screens (1368px x 912px area) */
@media screen and (max-width: 85.5em) and (min-width: 48.01em) {
  .item {
    margin-top: 6em; 
  }
  
  .track-details {
    padding: 1.5em; 
    margin-bottom: 1.5em; 
  }
  
  .year-section {
    margin-bottom: 1em; 
  }
  
  .year {
    font-size: 2.8rem; 
  }
  
  .track-details h3 {
    font-size: 1.8rem; 
    margin: 0 0 0.2em 0;
  }
  
  .event-title {
    font-size: 1.8rem; 
    margin: 0.1em 0 0.2em 0;
  }
  
  .artist {
    font-size: 1.3em;
    margin: 0.2em 0 0.6em 0; 
  }
  
  .description {
    font-size: 1.1rem; 
    margin: 0.8em 0 0.2em 0; 
    line-height: 1.25; 
  }
  
  .caption {
    font-size: 1rem;
    margin: 0.4em 0 0.3em 0; 
    line-height: 1.25;
  }
  
  .album,
  .release-date {
    font-size: 1rem; 
    margin: 0 0 0.3em 0; 
    line-height: 1.25;
  }
  
  .spotify-image,
  .event-image {
    max-width: 14em; 
    height: 14em;
    margin-bottom: 0.8em; 
  }
  
  .spotify-link-section {
    margin-top: 1em; 
    margin-bottom: 1em; 
  }
  
  .spotify-link {
    padding: 0.7em 1.4em; 
    font-size: 1rem;
  }
  
  .two-column-layout {
    gap: 6em; 
  }
}

/* Tablet/Medium Screens (768px and down) */
@media screen and (max-width: 48em) {
  .item {
    margin-top: 7em; 
  }

  .track-details {
    max-width: 40em;
    padding: 1.5em; 
    margin: 0 1.5em 2em 1.5em; 
  }

  .two-column-layout {
    display: flex;
    flex-direction: column;
    gap: 1.5em; 
  }

 
  .event-column,
  .spotify-column {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    gap: 1.2em; 
  }

  .event-column .event-image,
  .spotify-column .spotify-image {
    flex-shrink: 0;
    max-width: 7em; 
    height: 7em;
    margin-bottom: 0;
  }

  .event-info,
  .spotify-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .year-section {
    margin-bottom: 1em; 
  }

  .year {
    font-size: 2.2rem; 
  }

  .track-details h3 {
    font-size: 1.4rem; 
    margin: 0 0 0.2em 0;
  }

  .event-title {
    font-size: 1.4rem; 
    margin: 0 0 0.2em 0;
  }

  .artist {
    font-size: 1.1em;
    margin: 0.1em 0 0.4em 0; 
  }

  .description {
    font-size: 1rem; 
    margin: 0.5em 0 0.2em 0; 
    line-height: 1.25; 
  }

  .caption {
    font-size: 0.9rem; 
    margin: 0.2em 0;
    line-height: 1.25;
  }

  .album,
  .release-date {
    font-size: 0.95rem; 
    margin: 0.1em 0;
    line-height: 1.25;
  }

  .spotify-link {
    font-size: 1rem; 
    padding: 0.7em 1.4em; 
  }

  .spotify-link-section {
    margin-top: 1.2em; 
  }

  
  .circle-1 {
    width: 60px;
    height: 60px;
  }

  .circle-2 {
    width: 90px;
    height: 90px;
  }

  .triangle-1 {
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid #45b7d1;
  }

  .triangle-2 {
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 60px solid #f7b731;
  }

  .square-1 {
    width: 45px;
    height: 45px;
  }

  .square-2 {
    width: 70px;
    height: 70px;
  }

  .diamond-1 {
    width: 40px;
    height: 40px;
  }

  .diamond-2 {
    width: 55px;
    height: 55px;
  }

  .line-1 {
    width: 120px;
  }

  .line-2 {
    width: 100px;
  }
}

/* Mobile/Small Screens (480px and down) */
@media screen and (max-width: 30em) {
  .item {
    margin-top: 7.5em;
  }

  .track-details {
    padding: 1.2em;
    margin: 0 0.8em;
    max-width: none;
    border-radius: 0.8em;
  }

  .two-column-layout {
    gap: 1.8em;
  }

  
  .event-column .event-image,
  .spotify-column .spotify-image {
    max-width: 6em;
    height: 6em;
  }

  .event-column,
  .spotify-column {
    gap: 1em;
  }

  .year-section {
    margin-bottom: 0.8em;
  }

  .year {
    font-size: 2rem;
  }

  .track-details h3 {
    font-size: 1.2rem;
    margin: 0 0 0.2em 0;
  }

  .event-title {
    font-size: 1.2rem;
    margin: 0 0 0.2em 0;
  }

  .artist {
    font-size: 0.95em;
    margin: 0.2em 0 0.5em 0;
  }

  .description {
    font-size: 0.85rem;
    margin: 0.5em 0 0.2em 0;
    line-height: 1.2;
  }

  .caption {
    font-size: 0.8rem;
    margin: 0.3em 0 0.2em 0;
    line-height: 1.2;
  }

  .album,
  .release-date {
    font-size: 0.85rem;
    line-height: 1.2;
    margin: 0.2em 0;
  }

  .spotify-link {
    padding: 0.6em 1.2em;
    font-size: 0.85rem;
    border-radius: 1em;
  }

  .spotify-logo {
    width: 18px;
    height: 18px;
  }

  .spotify-link-section {
    margin-top: 1.2em;
  }

  
  .shape.line-1,
  .shape.line-2,
  .shape.hexagon-1 {
    display: none;
  }

  
  .circle-1 {
    width: 40px;
    height: 40px;
  }

  .circle-2 {
    width: 60px;
    height: 60px;
  }

  .triangle-1 {
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 30px solid #45b7d1;
  }

  .triangle-2 {
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 40px solid #f7b731;
  }

  .square-1 {
    width: 30px;
    height: 30px;
  }

  .square-2 {
    width: 45px;
    height: 45px;
  }

  .diamond-1 {
    width: 25px;
    height: 25px;
  }

  .diamond-2 {
    width: 35px;
    height: 35px;
  }
}

/* Extra Small Mobile Screens (360px and down) */
@media screen and (max-width: 22.5em) {
  .item {
    margin-top: 6.5em;
  }

  .track-details {
    padding: 1em;
    margin: 0 0.5em;
    border-radius: 0.6em;
  }

  .two-column-layout {
    gap: 1.2em;
  }

  
  .event-column .event-image,
  .spotify-column .spotify-image {
    max-width: 5em;
    height: 5em;
  }

  .event-column,
  .spotify-column {
    gap: 0.8em;
  }

  .year-section {
    margin-bottom: 0.6em;
  }

  .year {
    font-size: 1.8rem;
  }

  .track-details h3 {
    font-size: 1.1rem;
    margin: 0 0 0.1em 0;
  }

  .event-title {
    font-size: 1.1rem;
    margin: 0 0 0.1em 0;
  }

  .artist {
    font-size: 0.9em;
    margin: 0.1em 0 0.4em 0;
  }

  .description {
    font-size: 0.8rem;
    margin: 0.4em 0 0.1em 0;
    line-height: 1.15;
  }

  .caption {
    font-size: 0.75rem;
    margin: 0.2em 0 0.1em 0;
    line-height: 1.15;
  }

  .album,
  .release-date {
    font-size: 0.8rem;
    line-height: 1.15;
    margin: 0.1em 0;
  }

  .spotify-link {
    padding: 0.5em 1em;
    font-size: 0.8rem;
    border-radius: 0.8em;
  }

  .spotify-logo {
    width: 16px;
    height: 16px;
  }

  .spotify-link-section {
    margin-top: 1em;
  }

  
  .circle-1 {
    width: 30px;
    height: 30px;
  }

  .circle-2 {
    width: 45px;
    height: 45px;
  }

  .triangle-1 {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #45b7d1;
  }

  .triangle-2 {
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 24px solid #f7b731;
  }

  .square-1 {
    width: 20px;
    height: 20px;
  }

  .square-2 {
    width: 30px;
    height: 30px;
  }

  .diamond-1 {
    width: 18px;
    height: 18px;
  }

  .diamond-2 {
    width: 25px;
    height: 25px;
  }
}

/* Floating Animations */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-30px) translateX(20px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(40px) translateX(-25px); }
}

/* Ensure desktop layout stays as original for screens larger than laptop range */
@media screen and (min-width: 85.51em) {
  .item {
    margin-top: 8em; /* Ensure year is never hidden on large desktop sizes */
  }

  .event-column,
  .spotify-column {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .event-info,
  .spotify-info {
    display: contents;
  }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-25px) translateX(30px); }
}

@keyframes float-4 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(35px) translateX(-20px); }
}

@keyframes float-5 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-40px) translateX(-15px); }
}

@keyframes float-6 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(25px) translateX(35px); }
}

@keyframes float-7 {
  0%, 100% { transform: rotate(45deg) translateY(0px) translateX(0px); }
  50% { transform: rotate(45deg) translateY(-30px) translateX(-25px); }
}

@keyframes float-8 {
  0%, 100% { transform: rotate(45deg) translateY(0px) translateX(0px); }
  50% { transform: rotate(45deg) translateY(45px) translateX(20px); }
}

@keyframes float-9 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-35px) translateX(40px); }
}

@keyframes float-10 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(30px) translateX(-30px); }
}

@keyframes float-11 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(25px); }
}

/* Rotation Animations */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotate-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

/* Pulse Animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

/* Stretch Animations */
@keyframes stretch {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.5); }
}

@keyframes stretch-reverse {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.8); }
}
</style>
