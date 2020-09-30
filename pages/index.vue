<template>
  <div class="container">

    <jheader />

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
import jheader from '~/components/jheader.vue'

export default {
  components: {
    jheader
  },
}

</script>
