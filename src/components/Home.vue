<script lang="ts">

export default {
  name: 'SpotifyTracks',
  data() {
    return {
      clientId: '6e63c82f396e41038413047e5c1a8157',         
      clientSecret: '2744765a35844aaf84521a468301c471', 
      accessToken: '',
      events: [
        { description: 'Australia hosts its first Olympics. Coinciding with televisions national release.' , title: 'Melbourne hosts the Olympic Games.', trackId: '3n3Ppam7vgaVa1iaRUc9Lp' },
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
    <div class="timeline-line"></div>
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
img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}



/* container for timeline (centers and sets max width)*/
.timeline {
  
  max-width: 1200px;
  width: 100%;
  margin: 100px auto 0 auto;
  min-height: 300px;
}
/* line for timeline (streches ACROSS WHOLE SCREEN) */
.timeline-line {
  position: absolute;
  height: 6px;
  width: 100vw;
  background-color: #3E3D3D;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

/* content within timeline (horiztonal) */
.timeline-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  gap: 48px; 
}

/* content block (styling each background(block) of content) */
.content {
  width: 340px;
  aspect-ratio: 1 / 1;
  background-color: #C0C6B8;
  position: relative;
  border-radius: 16px;
  color: #3E3D3D;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0
}


.right, .left {
margin: 0; 
}


.content h2 { /* Year */
  font-size: 2rem;
  font-weight: bold;
  margin: 12px 0 6px 0;
  color: #2E2E2E;
  text-align: center;
}

.content h3 { /* Description */
  font-size: 1.3rem;
  font-weight: 600;
  margin: 6px 0;
  color: #3E3D3D;
  text-align: center;
}

.content h4 { /* Title */
  font-size: 1.1rem;
  font-weight: 500;
  margin: 6px 0;
  color: #4E4E4E;
  text-align: center;
}

.content h5 { /* Track name and artist */
  font-size: 1rem;
  font-weight: 400;
  margin: 4px 0;
  color: #5E5E5E;
  text-align: center;
}



/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 1024px) {

  /* Place the timelime to the left */
  .timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #3E3D3D;
    top: 0;
    bottom: 0;
    left: 28px;
    margin-left: -3px;
  }

  /* Full-width containers */
  .container {
    width: 500px;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid #3E3D3D;
    border-width: 10px 10px 10px 0;
    border-color: transparent #3E3D3D transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 12px;
  }

  .left {
    left: 5px;
  }

  /* Make all right containers behave like the left ones */
  .right {
    left: 5px;
  }
}

/* media query for phones/small form factors*/
@media screen and (max-width: 600px) {


  /* Full-width containers */
  .container {
    width: 300px;
  }
}
</style>
