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

/* album art styling - smaller image */
img {
  width: 400px; /* Fixed size instead of percentage */
  height: 400px;
  object-fit: cover;
  border-radius: 12px; /* Add some rounding */
  margin-bottom: 20px;
}

/* container for timeline (centers and sets max width)*/
.timeline {
  position: relative;
  width: 100vw;
  margin: 100px auto 0 auto;
  min-height: 380px;
  overflow: visible;
}

/* content within timeline (horizontal) */
.timeline-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  gap: 96px;
  padding: 0 96px;
  z-index: 1;
  width: max-content;
  min-width: 100vw;
}

/* Timeline line using pseudo-element on content container */
.timeline-content::before {
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
  background-color: #3E3D3D;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}

/* content block (styling each background(block) of content) */
.content {
  width: 900px;
  height: 900px;
  min-width: 900px;
  max-width: 900px;
  min-height: 900px;
  max-height: 900px;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: #C0C6B8;
  position: relative;
  border-radius: 32px;
  color: #3E3D3D;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  z-index: 1;
}

.right, .left {
  margin: 0; 
}

/* Typography - adjusted sizes to fit all content */
.content h2 { /* Year */
  font-size: 3rem; /* Reduced slightly */
  font-weight: bold;
  margin: 12px 0 8px 0;
  color: #2E2E2E;
  text-align: center;
}

.content h3 { /* Title */
  font-size: 1.8rem; /* Reduced slightly */
  font-weight: 600;
  margin: 8px 0 12px 0;
  color: #3E3D3D;
  text-align: center;
  line-height: 1.3;
}

.content h4 { /* Description */
  font-size: 1.3rem; /* Reduced to fit better */
  font-weight: 400;
  margin: 8px 0 16px 0;
  color: #4E4E4E;
  text-align: center;
  line-height: 1.4;
  
}

.content h5 { 
  font-size: 1.2rem; 
  font-weight: 400;
  margin: 4px 0;
  color: #5E5E5E;
  text-align: center;
  display: block; 
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
