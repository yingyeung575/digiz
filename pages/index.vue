<template>
  <div class="container">
    <h1>Sign Up for Premium Corgi Content</h1>

    <div class="user-info">
      <button id="left">Log In</button>
      <button id="right">Sign Up</button>
      <div data-netlify-identity-menu></div>
    </div>

    <div class="corgi-content">
      <div class="content">
        <h2>Free Content</h2>
        <div class="free"></div>
      </div>
      <div class="content">
        <h2>Pro Content</h2>
        <div class="pro"></div>
      </div>
      <div class="content">
        <h2>Premium Content</h2>
        <div class="premium"></div>
      </div>
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
