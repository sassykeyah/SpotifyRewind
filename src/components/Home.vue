<script lang="js">
import { events } from '@/data/events.js'
import { getSpotifyAccessToken, fetchSpotifyTrack } from '@/services/spotify.js'

export default {
  name: 'SpotifyTracks',
  data() {
    return {
      accessToken: '',
      events: events, // Use imported global events array
      tracks: []
    }
  },
  async mounted() {
    await this.getAccessToken()
    await this.fetchTracks()
    this.setupHorizontalScroll()
    
    await this.$nextTick(() => {
      window.scrollTo({
        left: 200,
        behavior: 'instant'
      })
    })
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    async getAccessToken() {
      this.accessToken = await getSpotifyAccessToken()
    },
    async fetchTracks() {
      for (const event of this.events) {
        try {
          const track = await fetchSpotifyTrack(event.trackId, this.accessToken)
          
          this.tracks.push({
            ...track,
            description: event.description,
            title: event.title,
            year: event.year
          })
        } catch (error) {
          console.error(`Error fetching track ${event.trackId}:`, error)
        }
      }
    },
    setupHorizontalScroll() {
      window.addEventListener('wheel', this.handleScroll, { passive: false })
    },
    handleScroll(event) {
      event.preventDefault() 
      
      
      const scrollAmount = event.deltaY * 0.8
      
      
      window.scrollBy(scrollAmount, 0)
    }
  }
}
</script>

<template>
  <div class="timeline">
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
    <div class="timeline-content">
      <div
        class="content"
        v-for="(track, i) in tracks"
        :key="track.id"
        :class="i % 2 === 0 ? 'right' : 'left'"
      >  <RouterLink :to="{ name: 'track', params: { id: track.id } }">
        <img :src="track.album.images[0]?.url" alt="Album Cover" />
        <h2>{{ track.year }}</h2> <!-- Use historical year from array -->
        <h3>{{ track.title }}</h3>
        <h4>{{ track.description }}</h4>
        <div class="track-info">
          <h5>{{ track.name }}</h5>
          <h5>by {{ track.artists[0].name }}</h5>
        </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* album art styling - responsive sized image */
img {
  width: 200px;
  height: 200px;
  max-width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* container for timeline (centers and sets max width)*/
.timeline {
  position: relative;
  width: 100vw;
  margin: 100px auto 0 auto;
  min-height: 600px;
  overflow: visible;
  font-family: "new-kansas", sans-serif;
  font-weight: 400;
  font-style: normal;
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

/* Floating Animations */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-30px) translateX(20px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(40px) translateX(-25px); }
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

/* content within timeline (horizontal) */
.timeline-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center; /* This centers relative to the timeline line */
  position: relative;
  gap: 80px; /* Slightly reduced gap */
  padding: 0 80px;
  z-index: 1;
  width: max-content;
  min-width: 100vw;
}

/* Timeline line using pseudo-element on content container - wavy version */
.timeline-content::before {
  content: '';
  position: absolute;
  height: 60px; /* Increased height for taller waves */
  width: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60'%3E%3Cpath d='M0 30 Q150 5 300 30 T600 30 T900 30 T1200 30' stroke='black' stroke-width='30' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-size: 400px 60px; /* Adjust wave frequency with new height */
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}

/* content block (styling each background(block) of content) */
.content {
  width: auto;
  height: auto;
  min-width: 350px;
  max-width: 500px;
  min-height: auto;
  max-height: none;
  flex-shrink: 0;
  flex-grow: 0;
  background: #eb8f8f;
  background: linear-gradient(0deg,rgba(235, 143, 143, 1) 0%, rgba(245, 125, 125, 1) 31%, rgba(255, 210, 148, 1) 100%);
  position: relative;
  border-radius: 24px;
  color: black;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  z-index: 2;
  transition: transform 0.3s ease;
}

/* Alternating layout - even items above the line */
.right {
  transform: translateY(-150px); /* Move above the timeline */
  margin: 0;
}

/* Alternating layout - odd items below the line */
.left {
  transform: translateY(150px); /* Move below the timeline */
  margin: 0;
}

/* Typography - responsive to content */
.content h2 { /* Year */
  font-size: 2.2rem;
  font-weight: bold;
  margin: 12px 0 8px 0;
  color: black;
  text-align: center;
}

.content h3 { /* Title */
  font-size: 1.4rem;
  font-weight: 600;
  margin: 8px 0 12px 0;
  color: black;
  text-align: center;
  line-height: 1.3;
}

.content h4 { /* Description */
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 16px 0;
  color: black;
  text-align: center;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;
}

.content h5 { 
  font-size: 1.4em;
  font-weight: 400;
  margin: 6px 0;
  color: black;
  text-align: center;
  display: block;
}

/* Track info container for better spacing */
.track-info {
  margin-top: 16px;
  padding-top: 0;
}

/* RouterLink styling */
.content a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

/* Hover effects */
.content:hover {
  transform: translateY(-150px) scale(1.02); /* Maintain position while adding scale */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.left:hover {
  transform: translateY(150px) scale(1.02); /* Maintain position while adding scale */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

body {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #3E3D3D #e0e0e0;
}

body::-webkit-scrollbar {
  height: 8px;
}

body::-webkit-scrollbar-track {
  background: #f0f0f0;
}

body::-webkit-scrollbar-thumb {
  background: #3E3D3D;
  border-radius: 4px;
}

body::-webkit-scrollbar-thumb:hover {
  background: #5E5E5E;
}

</style>
