<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<!--main page header and content organisation-->
<style>
@import url("https://use.typekit.net/bfl6rmj.css");
</style>
<style>
@import url("https://use.typekit.net/bfl6rmj.css");
</style>

<template>
  <header>
    <nav>
      <div class="header">
        <a href="#default" class="logo">Spotify Rewind</a>
        <RouterLink to="/">Home</RouterLink>
      </div>

    </nav>
  </header>
  <div class="content">
    <router-view />
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #C0C6B8;
  padding: 20px 10px;
  z-index: 100;
  width: auto;
  min-width: 200px;
  max-width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* Style the header links */
.header a {
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  font-family: "mundial", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;

  font-family: "gambado-sans-forte", sans-serif;
  font-weight: 700;
  font-style: normal;

}

/* Change the background color on mouse-over */
.header a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header {
    flex-direction: column;
    padding: 10px 5px;
    min-width: 120px;
    max-width: 98vw;
  }
  .header a {
    font-size: 12px;
    padding: 8px;
  }
  .header a.logo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }
}
</style>
