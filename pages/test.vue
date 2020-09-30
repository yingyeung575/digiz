<template>
  <div class="container">
    <h1>Test Page</h1>

    <div class="user-info">
      <button id="left">Log In</button>
      <button id="right">Sign Up</button>
      <div data-netlify-identity-menu></div>
    </div>


  </div>
</template>

<script>
import netlifyIdentity from "netlify-identity-widget";
import { mapActions, mapState } from "vuex";

if (process.client) {
    netlifyIdentity.init()
}

export default {
 
}
</script>
