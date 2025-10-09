<script lang="ts">

export default {
  name: 'SpotifyTracks',
  data() {
    return {
      clientId: '6e63c82f396e41038413047e5c1a8157',         
      clientSecret: '2744765a35844aaf84521a468301c471', 
      accessToken: '',
      events: [
        { description: 'Australia hosts its first Olympics. Coinciding with televisions national release.' , title: 'Melbourne hosts the Olympic Games.', trackId: '46dHcg4e6XNhpYIHHDeC9f' },
        { description: 'Parliament passes an act, allowing First Nations people to enroll and vote in federal elections NMA, 2018).', title: 'Indigenous Australians granted the right to vote.', trackId: '7ouMYWpwJ422jRcDASZB7P' },
        { description: 'Australia begins transition from pounds to dollars.', title: 'Decimal currency is introduced.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Destroying 80% of the city and killing 66 people (NMA, 2024).', title: 'Cyclone Tracy hit Darwin on Christmas Day.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Establishes national basic healthcare for Australians.', title: 'Medicare is introduced in Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Australian Government hands land titles to Anangu people.', title: 'Uluru Handback.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Port Arthur Massacre Occurs. Killing 35 people, it started major gun reforms in the nation.', title: 'Port Arthur Massacre Occurs.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Australia votes NO to a republic. Retaining the monarchy.', title: 'Australia votes NO to a republic.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Lighting the Olympic flame, promoting reconciliation across the nation.', title: 'Kathy Freeman wins gold in the 400m sprint.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Bushfires in Victoria Kill 173 people.', title: 'Black Saturday.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Julia Gillard is sworn in by Australias first governor-general.', title: 'Australias first female prime minister.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Australias national disability scheme.', title: 'NDIS is introduced.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Redefining the Marriage Act to give rights to same-sex couples.', title: 'Same sex marriage is legalised in Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'Burning 19 hectares and over 3,000 homes (NHRA, 2023)', title: 'Black Summer.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 'The first case of COVID-19 was reported in Australia.', title: ' COVID-19 hits Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: ' Australia votes NO to providing a permanent voice for Indigenous Australians.', title: 'Voice to Parliament referendum.', trackId: '0eGsygTp906u18L0Oimnem' }

      ],
      tracks: []
    }
  },
  async mounted() {
    await this.getAccessToken()
    await this.fetchTracks()
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
    async fetchTracks() {
      for (const event of this.events) {
        try {
          const res = await fetch(`https://api.spotify.com/v1/tracks/${event.trackId}`, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          })
          const track = await res.json()
     this.tracks.push({
        ...track,
        description: event.description,
        title: event.title
      })
    } catch (error) {
      console.error(`Error fetching track ${event.trackId}:`, error)
        }
      }
    },
    getReleaseYear(date, precision) {
      if (!date) return 'Unknown'
      return precision === 'year' ? date : date.split('-')[0]
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
      >
        <img :src="track.album.images[0]?.url" alt="Album Cover" />
        <h2>{{ getReleaseYear(track.album.release_date, track.album.release_date_precision) }}</h2>
        <h3>{{ track.title }}</h3>
        <h4>{{ track.description }}</h4>
        <h5>{{ track.name }}</h5>
        <h5>by {{ track.artists[0].name }}</h5>
      </div>
    </div>
  </div>
</template>


<style scoped>

/* album art styling */
/* album art styling */
img {
  width: 70%;
  height: 70%;
  object-fit: contain;
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
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  gap: 96px; /* Larger gap for big containers */
  padding: 0 96px;
  z-index: 1;
  width: max-content;
  min-width: 100vw;
}

/* Timeline line using pseudo-element */
.timeline-content::before {
  content: '';
  position: absolute;
  height: 6px;
  width: 100%;
  background-color: #3E3D3D;
  left: 0;
  top: 0;
  z-index: 0;
}

/* content block (styling each background(block) of content) */
.content {
  width: 840px; /* Large containers */
  height: 840px;
  min-width: 840px;
  max-width: 840px;
  min-height: 840px;
  max-height: 840px;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: #C0C6B8;
  position: relative;
  border-radius: 32px; /* Larger border radius for proportion */
  color: #3E3D3D;
  padding: 48px; /* Larger padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
}

.right, .left {
  margin: 0; 
}

/* Typography - scaled up for larger containers */
.content h2 { /* Year */
  font-size: 3.6rem; /* Doubled from 1.8rem */
  font-weight: bold;
  margin: 16px 0 8px 0;
  color: #2E2E2E;
  text-align: center;
}

.content h3 { /* Title */
  font-size: 2.2rem; /* Doubled from 1.1rem */
  font-weight: 600;
  margin: 8px 0;
  color: #3E3D3D;
  text-align: center;
  line-height: 1.3;
}

.content h4 { /* Description */
  font-size: 1.8rem; /* Doubled from 0.9rem */
  font-weight: 400;
  margin: 8px 0;
  color: #4E4E4E;
  text-align: center;
  line-height: 1.4;
  max-height: 160px;
  overflow-y: auto;
}

.content h5 { /* Track name and artist */
  font-size: 1.6rem; /* Doubled from 0.8rem */
  font-weight: 400;
  margin: 4px 0;
  color: #5E5E5E;
  text-align: center;
}

/* Custom scrollbar styling */
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
