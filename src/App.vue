<template>

  <div class="min-vh-100">
    <Header v-if="this.isLogged"/>
    <Spinner/>
    <div class="niwa-wrapper">
      <Navbar v-if="false"/>
      <NiwaContainer v-if="this.isLogged"></NiwaContainer>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import Header from './components/Header.vue';
import Spinner from './components/Spinner.vue';
import Navbar from './components/Navbar.vue';
import {useUserStore} from './store/user';
import {mapState} from "pinia";
import NiwaContainer from "./components/NiwaContainer";

export default defineComponent({
    name: 'App',
    components: {
        NiwaContainer,
        Header,
        Spinner,
        Navbar
    },
    computed: {
        // gives access to this.counter inside the component and allows setting it
        // this.counter++
        // same as reading from store.counter
        ...mapState(useUserStore, ['isLogged'])
    },
    mounted() {
    }
});
</script>

<style lang="scss">
//needed to import bootsteap icons (otherwhise <i class="bi-***"> will not be displayed)
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css");


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.niwa-wrapper {
  height: 100%;
  background-image: url('/sakura-1080.jpg');
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}

html {
  scrollbar-width: thin;
  scrollbar-color: #7d22a8 #001773;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
