<template>
  <div>

    <jheader />
    <h2>Content</h2>
    {{ jcontent }}
      
    
  </div>
</template>

<script>
import jheader from '~/components/jheader.vue'

export default {
  components: {
    jheader
  },
  data(){
    return{
      jcontent: 'default',
      
    }
  },
  async mounted(){

      let jsonstring = '{"type":"jack","age":"18"}'
      this.jcontent = await this.$axios.$post('http://localhost:8888/.netlify/functions/get-protected-content',jsonstring) 
  },

}

</script>
