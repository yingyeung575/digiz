<template>
  <div>

    <jheader />
    <button @click='managesub'>Manage Subscription</button>
    <h2>Content</h2>
    {{ jcontent }}

    <h2>Test one time payment</h2>
    <button @click='checkout'>Pay</button>

    
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
        this.jcontent = await this.$axios.$post('https://digiz.netlify.app/.netlify/functions/get-protected-content',temp,{
              headers:{
                      Authorization: 'Bearer '+this.$store.state.user.currentUser.token.access_token
              }
        }) 
    }
  },
  methods:{
    async managesub(){
      if (this.$store.state.user.currentUser){
        
          await this.$axios.$post('https://digiz.netlify.app/.netlify/functions/create-manage-link','',{
                headers:{
                        Authorization: 'Bearer '+this.$store.state.user.currentUser.token.access_token
                }
          })
          .then( r => {
               window.location.href = r
          })
          .catch( err => {
                alert('err!')
                console.log(err)
          })
      }
    },
    async checkout(){
        
          await this.$axios.$post('https://digiz.netlify.app/.netlify/functions/create-checkout',
          {

          },{
                headers:{
                       
                }
          })
          .then( r => {
               const response = r
          })
          .catch( err => {
                alert('err!')
                console.log(err)
          })
          console.log('response')
          console.log(response)

          const stripe = this.$stripe(response.publishableKey);
          
          const { error } = await stripe.redirectToCheckout({
            sessionId: response.sessionId,
          });

          if (error) {
            console.error(error);
          }
      
    }
  }

}

</script>
