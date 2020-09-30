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

    if (this.$store.state.user.currentUser){
        let temp = {
          type: 'jack',
          age: 18
        }
        this.jcontent = await this.$axios.$post('http://localhost:8888/.netlify/functions/get-protected-content',temp,{
              headers:{
                      Authorization: 'Bearer '+this.$store.state.user.currentUser.token.access_token
              }
        }) 
    }
  },

}

</script>
