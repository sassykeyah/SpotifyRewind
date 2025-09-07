<script lang="ts">

export default {
  name: 'SpotifyTracks',
  data() {
    return {
      clientId: '6e63c82f396e41038413047e5c1a8157',         // 🔐 Replace with your actual Client ID
      clientSecret: '2744765a35844aaf84521a468301c471', // 🔐 Replace with your actual Client Secret
      accessToken: '',
      trackIds: [
        '3n3Ppam7vgaVa1iaRUc9Lp',
        '7ouMYWpwJ422jRcDASZB7P',
        '0eGsygTp906u18L0Oimnem'
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
      for (const id of this.trackIds) {
        try {
          const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          })
          const track = await res.json()
          this.tracks.push(track)
        } catch (error) {
          console.error(`Error fetching track ${id}:`, error)
        }
      }
    }
  }
}
</script>



<template>
  <div>
    <h2>🎧 Spotify Tracks</h2>
    <ul>
      <li v-for="track in tracks" :key="track.id">
        {{ track.name }} by {{ track.artists[0].name }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.search {
  margin-top: 100px;

}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: #3E3D3D;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 500px;
}

/* The circles on the timeline */
.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -13px;
  background-color: #3E3D3D;
  border: 4px solid #C0C6B8;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: -50%;
}

/* Place the container to the right */
.right {
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid #3E3D3D;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #3E3D3D;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid #3E3D3D;
  border-width: 10px 10px 10px 0;
  border-color: transparent #3E3D3D transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -12px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: #C0C6B8;
  position: relative;
  border-radius: 6px;
  color: #3E3D3D;
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
