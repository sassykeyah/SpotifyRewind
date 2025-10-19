<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<!--main page header and content organisation-->
<style>
@import url('https://use.typekit.net/bfl6rmj.css');
</style>
<style>
@import url('https://use.typekit.net/bfl6rmj.css');
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
  top: 0;
  left: 0;
  width: 100vw;
  background: #75dff0;
background: #eb8f8f;
background: linear-gradient(0deg,rgba(235, 143, 143, 1) 0%, rgba(245, 125, 125, 1) 31%, rgba(255, 210, 148, 1) 100%);
  padding: 1.25em 2.5em; 
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  box-shadow: none; 
}

.header::after {
  content: '';
  position: absolute;
  bottom: -1.25em; 
  left: 0;
  width: 100%;
  height: 2.5em; 
  background: linear-gradient(to bottom, 
   
    rgba(255, 210, 148, 0) 100%);
  pointer-events: none;
  z-index: -1;
}


.header a {
  color: black;
  text-align: center;
  padding: 0.75em; 
  text-decoration: none;
  font-size: 2em; 
  line-height: 1.39; 
  border-radius: 0.25em; 
  font-family: 'new-kansas', sans-serif;
  font-weight: bold;
}


.header a.logo {
  font-size: 2em; 
  font-family: 'new-kansas', sans-serif;
  font-weight: bold;
}


.header a:hover {
  background-color: #ddd;
  color: black;
}


.header a.active {
  background-color: dodgerblue;
  color: white;
}


.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 31.25em) { 
  .header {
    flex-direction: column;
    padding: 0.625em 0; 
    width: 100vw; 
    margin: 0;
    left: 0; 
    box-sizing: border-box; 
  }
  .header a {
    font-size: 0.75em; 
    padding: 0.5em 1em; 
    width: 100%; 
    text-align: center; 
    box-sizing: border-box;
  }
  .header a.logo {
    font-size: 1.125em; 
    font-weight: bold;
    margin-bottom: 0.25em; 
    width: 100%; 
  }
}
</style>
