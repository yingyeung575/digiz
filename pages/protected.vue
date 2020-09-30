<template>
  <div>
  
    <jheader />
    <h1>
        Protected Page Content
    </h1>
     
      
 
  </div>
</template>

<script>
import jheader from '~/components/jheader.vue'

export default {
  components: {
    jheader
  },

  middleware ({ store, redirect }) {
    if (!store.state.user.currentUser) {
      return redirect('/');
    }
  }
}
</script>