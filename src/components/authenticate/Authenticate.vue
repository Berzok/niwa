<template>
  <div id="authenticate" class="d-flex align-items-center vh-100">
    <router-view class="mx-auto"/>
  </div>
</template>

<script lang="js">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Authenticate',
    components: {},
    props: {},
});
</script>
