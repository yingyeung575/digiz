<template>
    <div>
        <h1>Sign Up for Premium Corgi Content</h1>
            <nuxt-link to="/protected" class="button--green">
                Go to Protected Page
            </nuxt-link>

            <div class="user-info">


            <p v-if="!isLoggedIn">Please login</p>
            <p v-if="isLoggedIn">You are login as {{ isLoggedIn.email }}</p>
        
            <button v-if="isLoggedIn" v-on:click="triggerNetlifyIdentityAction('logout')">Logout</button>
            <button v-if="!isLoggedIn" v-on:click="triggerNetlifyIdentityAction('login')">Login</button>
            <button v-if="!isLoggedIn" v-on:click="triggerNetlifyIdentityAction('signup')">Signup</button>

            <!-- <p>Netlify Menu</p>
            <div data-netlify-identity-menu></div> -->

        </div>
    </div>
</template>

<script>
import netlifyIdentity from "netlify-identity-widget";
import { mapActions, mapState } from "vuex";


export default {
  computed: mapState({
    isLoggedIn: state => state.user.currentUser
  }),
  created() {
    this.setUser(netlifyIdentity.currentUser())
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    triggerNetlifyIdentityAction(action) {
      if (action == "login" || action == "signup") {
        netlifyIdentity.open(action);
        netlifyIdentity.on(action, user => {
          this.setUser(user);
          netlifyIdentity.close();
        });
      } else if (action == "logout") {
        this.setUser(null);
        netlifyIdentity.logout();
        this.$router.push('/');
      }
    },
  }
}
</script>

