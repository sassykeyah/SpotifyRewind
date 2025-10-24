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
    window.removeEventListener('resize', this.handleResize)
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
            year: event.year,
            trackId: event.trackId  // Include the original trackId for routing
          })
        } catch (error) {
          console.error(`Error fetching track ${event.trackId}:`, error)
        }
      }
    },
    setupHorizontalScroll() {
      window.addEventListener('wheel', this.handleScroll, { passive: false })
      window.addEventListener('resize', this.handleResize)
    },
    handleScroll(event) {
      // Only prevent default and force horizontal scroll for screens larger than tablet
      if (window.innerWidth > 768) {
        event.preventDefault() 
        const scrollAmount = event.deltaY * 0.8
        window.scrollBy(scrollAmount, 0)
      }
      // For tablet and mobile (768px and below), allow normal vertical scrolling
    },
    handleResize() {
      // Re-enable/disable horizontal scroll based on screen size
      if (window.innerWidth <= 768) {
        // For mobile/tablet, ensure we're at the top and allow vertical scroll
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
      } else {
        // For desktop/laptop, restore horizontal position
        window.scrollTo({ left: 200, top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<template>
  <div class="timeline">
    
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
      <!-- Introductory Card as first timeline item -->
      <div class="content intro-timeline-card">
        <div class="intro-content">
          <h1>Spotify Rewind</h1>
          <p>Take a trip through Australia's most significant historical moments, and the most popular songs from that year. From the 1956 Melbourne Olympics to the 2023 Voice to Parliament referendum, discover how our nations story can be emulated through the connection of music and history.</p>
          <div class="scroll-instruction">
            <span class="desktop-instruction">Scroll horizontally to explore the timeline</span>
            <span class="mobile-instruction">Scroll down to explore the timeline</span>
          </div>
        </div>
      </div>
      
      <div
        class="content"
        v-for="(track, i) in tracks"
        :key="track.id"
        :class="i % 2 === 0 ? 'right' : 'left'"
      >  <RouterLink :to="{ name: 'track', params: { id: track.trackId } }">
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


img {
  width: 200px;
  height: 200px;
  max-width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}


.timeline {
  position: relative;
  width: 100vw;
  margin: 140px auto 0 auto; 
  min-height: 600px;
  overflow: visible;
  font-family: "new-kansas", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* Introductory Timeline Card */
.intro-timeline-card {
  /* Override positioning to be centered like first card */
  transform: translateY(0) !important;
  margin-right: 0 !important;
  min-width: 450px !important;
  max-width: 600px !important;
  
  /* Different background to distinguish it */
  background: linear-gradient(190deg, rgba(235, 143, 143, 1) 0%, rgba(249, 202, 147) 75%, rgba(245, 125, 125, 1) 31%);
  
  /* Emphasis effects without changing color */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(255, 255, 255, 0.1) !important; /* Enhanced shadow + subtle border */
  border: 2px solid rgba(255, 255, 255, 0.2); /* Subtle white border */
  position: relative;
  z-index: 10; /* Higher z-index to appear above other elements */
}

.intro-content h1 {
  font-size: 2.6rem; /* Slightly larger */
  font-weight: bold;
  color: black;
  margin: 0 0 18px 0;
  font-family: "new-kansas", sans-serif;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle text shadow for depth */
  letter-spacing: 0.5px; /* Slight letter spacing for elegance */
}

.intro-content p {
  font-size: 1.3rem; /* Slightly larger */
  color: black;
  line-height: 1.6; /* Better readability */
  margin: 0 0 22px 0;
  font-family: "new-kansas", sans-serif;
  font-weight: 450; /* Slightly bolder than 400 */
  text-align: center;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.05); /* Very subtle text shadow */
}

.scroll-instruction {
  font-size: 1rem;
  color: black;
  font-weight: bold;
  font-family: "new-kansas", sans-serif;
  text-align: center;
  display: block;
  width: 100%;
}

.mobile-instruction {
  display: none;
  font-weight: bold;
}

.desktop-instruction {
  display: inline;
  font-weight: bold;
}


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


.shape {
  position: absolute;
  opacity: 0.6;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}


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


.timeline-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center; 
  position: relative;
  gap: 80px; 
  padding: 0 80px;
  z-index: 1;
  width: max-content;
  min-width: 100vw;
}


.timeline-content::before {
  content: '';
  position: absolute;
  height: 60px; 
  width: calc(100% + 200px); 
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60'%3E%3Cpath d='M0 30 Q150 5 300 30 T600 30 T900 30 T1200 30' stroke='black' stroke-width='30' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-size: 400px 60px; 
  left: -100px; 
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}


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


.right {
  transform: translateY(-150px); 
  margin: 0;
}


.left {
  transform: translateY(150px); 
  margin: 0;
}


.content h2 { 
  font-size: 2.2rem;
  font-weight: bold;
  margin: 12px 0 8px 0;
  color: black;
  text-align: center;
}

.content h3 { 
  font-size: 1.4rem;
  font-weight: 600;
  margin: 8px 0 12px 0;
  color: black;
  text-align: center;
  line-height: 1.3;
}

.content h4 { 
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
  font-weight: bold;
  margin: 6px 0;
  color: black;
  text-align: center;
  display: block;
}


.track-info {
  margin-top: 16px;
  padding-top: 0;
}


.content a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}


.content:hover {
  transform: translateY(-150px) scale(1.02); 
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.left:hover {
  transform: translateY(150px) scale(1.02); 
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

/* Responsive scroll behavior */
@media screen and (max-width: 48em) {
  body {
    overflow-x: hidden; /* Disable horizontal scroll on mobile */
    overflow-y: auto;   /* Enable vertical scroll on mobile */
  }
  
  body::-webkit-scrollbar {
    width: 8px;  /* Vertical scrollbar for mobile */
    height: auto;
  }
}

/* Specific optimization for 1444x753 viewport */
@media screen and (max-width: 90.25em) and (max-height: 47.06em) {
  .timeline {
    margin: 80px auto 0 auto; /* Much reduced top margin to prevent cutoff */
  }
  
  .timeline-content {
    gap: clamp(30px, 3vw, 45px); /* Responsive gap with clamp */
    padding: 0 clamp(20px, 2.5vw, 40px); /* Responsive padding */
  }
  
  .content {
    min-width: clamp(260px, 18vw, 320px); /* Clamp card width to viewport */
    max-width: clamp(320px, 22vw, 380px);
    padding: clamp(16px, 1.5vw, 20px); /* Clamp internal padding */
    min-height: auto; /* Let cards adjust height naturally */
  }
  
  .intro-timeline-card {
    min-width: clamp(340px, 24vw, 420px) !important; /* Clamp intro card */
    max-width: clamp(420px, 30vw, 500px) !important;
  }
  
  .content h2 { /* Year */
    font-size: clamp(1.5rem, 2.5vw, 1.8rem);
    margin: clamp(4px, 0.5vw, 6px) 0 clamp(2px, 0.3vw, 4px) 0;
  }
  
  .content h3 { /* Title */
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    margin: clamp(3px, 0.4vw, 4px) 0 clamp(4px, 0.5vw, 6px) 0;
    line-height: 1.2;
  }
  
  .content h4 { /* Description */
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    margin: 0 0 clamp(8px, 1vw, 10px) 0;
    line-height: 1.3;
  }
  
  .content h5 {
    font-size: clamp(0.95em, 1.4vw, 1.1em);
    margin: clamp(2px, 0.3vw, 3px) 0;
  }
  
  img {
    width: clamp(120px, 15vw, 140px); /* Clamp image size */
    height: clamp(120px, 15vw, 140px);
    margin-bottom: clamp(8px, 1vw, 10px);
    border-radius: clamp(6px, 0.8vw, 8px);
  }
  
  .track-info {
    margin-top: clamp(8px, 1vw, 10px);
  }
  
  /* Optimize intro card typography for space with clamp */
  .intro-content h1 {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    margin: 0 0 clamp(10px, 1.5vw, 14px) 0;
  }
  
  .intro-content p {
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
    margin: 0 0 clamp(14px, 2vw, 18px) 0;
    line-height: 1.4;
  }
  
  .scroll-instruction {
    font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  }
}

/* Desktop/Large Screens (1440px and down) */
@media screen and (max-width: 90em) and (min-width: 85.51em) {
  .timeline-content {
    gap: 70px;
    padding: 0 70px;
  }
  
  .content {
    min-width: 350px;
    max-width: 480px;
    padding: 30px;
  }
  
  .content h2 { /* Year */
    font-size: 2.1rem;
    margin: 10px 0 7px 0;
  }
  
  .content h3 { /* Title */
    font-size: 1.35rem;
    margin: 7px 0 10px 0;
    line-height: 1.3;
  }
  
  .content h4 { /* Description */
    font-size: 1.35rem;
    margin: 0 0 14px 0;
    line-height: 1.4;
  }
  
  .content h5 {
    font-size: 1.35em;
    margin: 5px 0;
  }
  
  img {
    width: 190px;
    height: 190px;
    margin-bottom: 14px;
    border-radius: 11px;
  }
  
  .track-info {
    margin-top: 14px;
  }
}

/* Laptop Screens (1368px x 912px area)  */
@media screen and (max-width: 85.5em) and (min-width: 48.01em) {
  .intro-timeline-card {
    min-width: 300px !important;
    max-width: 400px !important;
  }
  
  .intro-content h1 {
    font-size: 1.8rem;
    margin: 0 0 12px 0;
  }
  
  .intro-content p {
    font-size: 1rem;
    margin: 0 0 15px 0;
    line-height: 1.4;
  }
  
  .scroll-instruction {
    font-size: 0.9rem;
  }
  
  .timeline {
    margin: 140px auto 0 auto; /* Increased from 120px to ensure nav clearance */
  }
  
  .timeline-content {
    gap: 40px;
    padding: 0 40px;
  }
  
  .content {
    min-width: 240px; 
    max-width: 300px;
    padding: 18px; 
  }
  
  .content h2 { /* Year */
    font-size: 1.5rem; 
    margin: 6px 0 4px 0;
  }
  
  .content h3 { /* Title */
    font-size: 1rem;
    margin: 4px 0 6px 0;
    line-height: 1.2;
  }
  
  .content h4 { /* Description */
    font-size: 0.9rem;
    margin: 0 0 8px 0;
    line-height: 1.25;
  }
  
  .content h5 {
    font-size: 0.9em;
    margin: 3px 0;
  }
  
  img {
    width: 120px; 
    height: 120px;
    margin-bottom: 8px;
    border-radius: 8px;
  }
  
  .track-info {
    margin-top: 8px;
  }
  
  
  .right {
    transform: translateY(-80px); 
  }
  
  .left {
    transform: translateY(80px);
  }
  
  .content:hover {
    transform: translateY(-80px) scale(1.02);
  }
  
  .left:hover {
    transform: translateY(80px) scale(1.02);
  }
  
  
  .timeline-content::before {
    height: 50px;
    background-size: 350px 50px;
    width: calc(100% + 200px); /* Extend beyond viewport */
    left: -100px; /* Start 100px before viewport */
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
    width: 150px;
  }
  
  .line-2 {
    width: 120px;
  }
}

/* Tablet/Medium Screens (768px and down)  */
@media screen and (max-width: 48em) {
  .intro-timeline-card {

    min-width: 280px ;
    max-width: 320px ;
  }
  
  .intro-content h1 {
    font-size: 1.6rem;
    margin: 0 0 10px 0;
  }
  
  .intro-content p {
    font-size: 0.95rem;
    margin: 0 0 12px 0;
    line-height: 1.4;
  }
  
  .scroll-instruction {
    font-size: 0.85rem;
  }
  
  .desktop-instruction {
    display: none;
  }
  
  .mobile-instruction {
    display: inline;
  }
  
  .timeline {
    margin: 140px auto 0 auto; /* Increased from 100px to ensure nav clearance */
    width: 100%;
    padding: 0 20px;
  }
  
  .timeline-content {
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px; 
    padding: 0;
    width: 100%;
    min-width: auto;
  }
  
  /* Change timeline to vertical line */
  .timeline-content::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    background: black;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 0;
  }
  
  .content {
    min-width: 220px;
    max-width: 280px;
    padding: 16px; 
    position: relative;
    margin: 0;
  }
  
  
  .right,
  .left {
    transform: translateY(0);
  }
  
  .content:hover,
  .left:hover {
    transform: scale(1.02);
  }
  
  
  .content::before {
    content: '';
    position: absolute;
    width: 16px; 
    height: 16px;
    background: black;
    border-radius: 50%;
    left: 50%;
    top: -8px;
    transform: translateX(-50%);
    z-index: 3;
  }
  
  .content h2 {
    font-size: 1.4rem; 
    margin: 4px 0 3px 0;
  }
  
  .content h3 {
    font-size: 1rem;
    margin: 3px 0 4px 0;
  }
  
  .content h4 {
    font-size: 0.9rem;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  
  .content h5 {
    font-size: 0.9rem;
    margin: 2px 0;
  }
  
  img {
    width: 110px; 
    height: 110px;
    margin-bottom: 8px;
    border-radius: 6px;
  }
  
  .track-info {
    margin-top: 8px;
  }
  
 
  .circle-1 {
    width: 50px;
    height: 50px;
  }
  
  .circle-2 {
    width: 75px;
    height: 75px;
  }
  
  .triangle-1 {
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 40px solid #45b7d1;
  }
  
  .triangle-2 {
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid #f7b731;
  }
  
  .square-1 {
    width: 35px;
    height: 35px;
  }
  
  .square-2 {
    width: 55px;
    height: 55px;
  }
  
  .diamond-1 {
    width: 30px;
    height: 30px;
  }
  
  .diamond-2 {
    width: 45px;
    height: 45px;
  }
  
  .line-1 {
    width: 80px;
  }
  
  .line-2 {
    width: 70px;
  }
}

/* Intermediate breakpoint for stacked header (500px and down) */
@media screen and (max-width: 31.25em) {
  .timeline {
    margin: 200px auto 0 auto; /* Extra margin for stacked header */
  }
}

/* Mobile/Small Screens (480px and down) */
@media screen and (max-width: 30em) {
  .intro-timeline-card {
    min-width: 260px !important;
    max-width: 300px !important;
  }
  
  .intro-content h1 {
    font-size: 1.4rem;
    margin: 0 0 8px 0;
  }
  
  .intro-content p {
    font-size: 0.9rem;
    margin: 0 0 10px 0;
    line-height: 1.3;
  }
  
  .scroll-instruction {
    font-size: 0.8rem;
  }
  
  .timeline {
    margin: 180px auto 0 auto; /* Increased significantly for mobile stacked nav */
    padding: 0 15px;
  }
  
  .timeline-content {
    gap: 30px;
  }
  
  .content {
    min-width: 240px;
    max-width: 280px;
    padding: 16px;
  }
  
  .content h2 {
    font-size: 1.4rem;
    margin: 4px 0 3px 0;
  }
  
  .content h3 {
    font-size: 1rem;
    margin: 3px 0 4px 0;
  }
  
  .content h4 {
    font-size: 0.9rem;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  
  .content h5 {
    font-size: 0.9rem;
    margin: 2px 0;
  }
  
  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    border-radius: 6px;
  }
  
  .track-info {
    margin-top: 8px;
  }
  
  
  .content::before {
    width: 16px;
    height: 16px;
    top: -8px;
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
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 36px solid #f7b731;
  }
  
  .square-1 {
    width: 25px;
    height: 25px;
  }
  
  .square-2 {
    width: 40px;
    height: 40px;
  }
  
  .diamond-1 {
    width: 20px;
    height: 20px;
  }
  
  .diamond-2 {
    width: 30px;
    height: 30px;
  }
}

/* Extra Small Mobile Screens (360px and down) */
@media screen and (max-width: 22.5em) {
  .intro-timeline-card {
    min-width: 220px !important;
    max-width: 260px !important;
  }
  
  .intro-content h1 {
    font-size: 1.2rem;
    margin: 0 0 6px 0;
  }
  
  .intro-content p {
    font-size: 0.8rem;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  
  .scroll-instruction {
    font-size: 0.7rem;
  }
  
  .timeline {
    margin: 180px auto 0 auto; /* Increased significantly for mobile stacked nav */
    padding: 0 10px;
  }
  
  .timeline-content {
    gap: 25px;
  }
  
  .content {
    min-width: 200px;
    max-width: 240px;
    padding: 12px;
  }
  
  .content h2 {
    font-size: 1.2rem;
    margin: 3px 0 2px 0;
  }
  
  .content h3 {
    font-size: 0.9rem;
    margin: 2px 0 3px 0;
  }
  
  .content h4 {
    font-size: 0.8rem;
    margin: 0 0 6px 0;
    line-height: 1.15;
  }
  
  .content h5 {
    font-size: 0.8rem;
    margin: 1px 0;
  }
  
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 6px;
    border-radius: 4px;
  }
  
  .track-info {
    margin-top: 6px;
  }
  
  /* Timeline dot adjustment */
  .content::before {
    width: 12px;
    height: 12px;
    top: -6px;
  }
  
  /* Timeline line adjustment */
  .timeline-content::before {
    width: 3px;
  }
  
  /* Further reduce animated shapes */
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
    width: 18px;
    height: 18px;
  }
  
  .square-2 {
    width: 28px;
    height: 28px;
  }
  
  .diamond-1 {
    width: 15px;
    height: 15px;
  }
  
  .diamond-2 {
    width: 22px;
    height: 22px;
  }
}

/* Ensure desktop layout stays horizontal for screens larger than laptop range */
@media screen and (min-width: 85.51em) {
  .timeline-content {
    display: flex;
    flex-direction: row;
  }
  
  .timeline-content::before {
    height: 60px;
    width: calc(100% + 200px); /* Extend beyond viewport */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60'%3E%3Cpath d='M0 30 Q150 5 300 30 T600 30 T900 30 T1200 30' stroke='black' stroke-width='30' fill='none'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-size: 400px 60px;
    left: -100px; /* Start 100px before viewport */
    top: 50%;
    transform: translateY(-50%);
  }
  
  .content::before {
    display: none;
  }
  
  .right {
    transform: translateY(-150px);
  }
  
  .left {
    transform: translateY(150px);
  }
  
  .content:hover {
    transform: translateY(-150px) scale(1.02);
  }
  
  .left:hover {
    transform: translateY(150px) scale(1.02);
  }
}

</style>
