<script lang="ts">

export default {
  name: 'SpotifyTracks',
  data() {
    return {
      clientId: '6e63c82f396e41038413047e5c1a8157',         
      clientSecret: '2744765a35844aaf84521a468301c471', 
      accessToken: '',
      events: [
        { description: 2015, title: 'Started listening to Spotify', trackId: '3n3Ppam7vgaVa1iaRUc9Lp' },
        {description: 2016, title: 'Discovered Rock Classics', trackId: '7ouMYWpwJ422jRcDASZB7P' },
        { description: 2017, title: 'Fell in love with Pop Hits', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 2018, title: 'Discovered Indie Rock', trackId: '0eGsygTp906u18L0Oimnem' },
        { description: 2022, title: 'Created Spotify Rewind Project', trackId: '0eGsygTp906u18L0Oimnem' }
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
        <p>
          {{ track.name }} by {{ track.artists[0].name }} {{ track.description }} - {{ track.title }}
          {{ getReleaseYear(track.album.release_date, track.album.release_date_precision) }}
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped>
img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}



/* The actual timeline  */
.timeline {
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 100px auto 0 auto;
  min-height: 300px;
}

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
  gap: 48px; /* space between blocks */
}
.content {
  width: 340x;
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

/* Remove vertical offset for above/below */
.right, .left {
margin: 0; /* no offset, so content sits on the line */
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
