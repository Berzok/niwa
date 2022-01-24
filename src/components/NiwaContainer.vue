<template>

  <div class="niwa-container d-flex flex-column my-3 mx-auto">

    <h1 class="niwa-category-title mx-auto">
      <strong>{{ this.$route.meta.title }}</strong>
    </h1>

    <router-view class="mx-5"></router-view>

  </div>


</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';

export default defineComponent({
    name: "NiwaContainer",
    components: {},
    data() {
        return {}
    },
    mounted() {
    },
    methods: {}
})
</script>

<style scoped>

.niwa-container {
    animation: 5s infinite linear pulse;
    background-color: #2c3e50;
    opacity: 95%;
    transition-duration: 0.8s;
    width: 65%;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7);
    }
    25% {
        box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.7);
    }
    50% {
        box-shadow: 0 0 8px 12px rgba(0, 0, 0, 0.7);
    }
    75% {
        box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.7);
    }
    100% {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7);
    }
}

div.niwa-container:hover {
    opacity: 1;
}

.niwa-category-title {
    color: #a31545;
}

</style>