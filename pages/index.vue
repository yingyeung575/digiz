<template>
  <div>

    <jheader />
    <button @click='managesub'>Manage Subscription</button>
    <h2>Content</h2>
    {{ jcontent }}

    <h2>Test one time payment</h2>
    <button @click='checkout'>Pay</button>

    <h2>Gotrue Register User</h2>

      Name: <input type='text' v-model='name'><br>
      Email: <input type='email' v-model='email'><br>
      Password: <input type='password' v-model='password'>
      <button @click='gsubmit'>Submit</button>


    
  </div>
</template>

<script>
import jheader from '~/components/jheader.vue'
import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: 'https://digiz.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

export default {

  components: {
    jheader
  },
  data(){
    return{
      jcontent: 'default',
      name: '',
      email: '',
      password: '',

  
      
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
        
          const r = await this.$axios.$post('https://digiz.netlify.app/.netlify/functions/create-checkout',
          {
            email: this.email
          },{
                headers:{
                       
                }
          })
         

            console.log(r)

            const stripe = this.$stripe.import();
          
            await stripe.redirectToCheckout({
              sessionId: r.sessionId,
            });

            if (error) {
              console.error(error);
            }

      
    },
    async gsubmit(){
        
          auth
          .signup(this.email, this.password)
          .then((response) => {
              this.checkout()
          })
          .catch((error) => {
            console.log("It's an error", error)
            this.checkout()
          });

      
    }

  }

}

</script>
