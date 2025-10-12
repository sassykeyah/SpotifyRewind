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
    <div class="timeline-content">
      <div
        class="content"
        v-for="(track, i) in tracks"
        :key="track.id"
        :class="i % 2 === 0 ? 'right' : 'left'"
      >  <RouterLink :to="{ name: 'about', params: { id: track.id } }">
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

/* album art styling - properly sized image */
img {
  width: 250px; /* Reduced size to fit better */
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* container for timeline (centers and sets max width)*/
.timeline {
  position: relative;
  width: 100vw;
  margin: 100px auto 0 auto; /* Reduced top margin to move timeline up */
  min-height: 600px; /* Increased to accommodate alternating blocks */
  overflow: visible;
  font-family: "new-kansas", sans-serif;
font-weight: 400;
font-style: normal;
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
  width: 600px; /* Reduced from 900px */
  height: 650px; /* Reduced from 900px */
  min-width: 600px;
  max-width: 600px;
  min-height: 650px;
  max-height: 650px;
  flex-shrink: 0;
  flex-grow: 0;
 background: #eb8f8f;
background: linear-gradient(0deg,rgba(235, 143, 143, 1) 0%, rgba(245, 125, 125, 1) 31%, rgba(255, 210, 148, 1) 100%);
  position: relative;
  border-radius: 24px; /* Slightly smaller radius */
  color: black;
  padding: 32px; /* Reduced padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: hidden;
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

/* Typography - optimized for smaller content blocks */
.content h2 { /* Year */
  font-size: 2.2rem; /* Further reduced for smaller blocks */
  font-weight: bold;
  margin: 8px 0 6px 0;
  color: black;
  text-align: center;
}

.content h3 { /* Title */
  font-size: 1.4rem; /* Reduced for better fit */
  font-weight: 600;
  margin: 6px 0 8px 0;
 color: black;
  text-align: center;
  line-height: 1.3;
}

.content h4 { /* Description */
  font-size: 1.1rem; /* Reduced for smaller blocks */
  font-weight: 400;
  margin: 6px 0 12px 0;
  color: black;
  text-align: center;
  line-height: 1.4;
  max-height: 80px; /* Limit height to prevent overflow */
  overflow: hidden;
}

.content h5 { 
  font-size: 1.4em; /* Reduced font size */
  font-weight: 400;
  margin: 3px 0;
  color: black;
  text-align: center;
  display: block;
}

/* Track info container for better spacing */
.track-info {
  margin-top: auto; /* Push to bottom of flex container */
  padding-top: 12px;
}

/* RouterLink styling */
.content a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
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

/* Add connection dots on the timeline */
.content::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #3E3D3D;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.right::after {
  bottom: -158px; /* Position dot on timeline for items above */
}

.left::after {
  top: -158px; /* Position dot on timeline for items below */
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
