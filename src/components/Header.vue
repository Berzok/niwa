<template>
  <nav id="header" class="d-flex justify-content-between bg-primary border-bottom border-info">

    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      url="/particles.json"
      class="h-100"
    />

  </nav>
</template>

<script lang="js">
import {computed, defineComponent} from 'vue';
import {useUserStore} from '../store/user';
import Button from 'primevue/button';
import Card from 'primevue/card';


export default defineComponent({
    name: 'Header',
    components: {
        Button,
        Card
    },
    mounted() {

    },
    setup() {
        const store = useUserStore();
        const isLoggedIn = computed(() => store.getters.isLogged);
        return {isLoggedIn};
    },
});
</script>

<style scoped>

#header {
    height: 110px;
}

nav {
    max-height: 210px !important;
}

::v-deep(canvas){
    max-height: 110px !important;
}

.thumbnail {
    height: 90%;
    width: 210px;
}

.section-separator {
    border-bottom: 4px double darkgrey;
    margin-top: 3px;
    margin-bottom: 3px;
}
</style>