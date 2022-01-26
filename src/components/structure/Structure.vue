<template>

  <div class="d-flex flex-column text-start">

    <OrganizationChart v-if="this.structure" :value="this.structure">
      <template #default="slotProps">
        <span>{{ slotProps.node.name }}</span>
      </template>
    </OrganizationChart>

  </div>

</template>

<script lang="js">
import {defineComponent} from 'vue';
import axios from "axios";
import {useToast} from "vue-toastification";
import Button from 'primevue/button';
import OrganizationChart from 'primevue/organizationchart';

export default defineComponent({
    name: 'Structure',
    components: {
        Button,
        OrganizationChart
    },
    computed: {},
    data() {
        return {
            structure: null
        }
    },
    methods: {
        async upload() {
            let formData = new FormData();
            for (let f of this.files) {
                formData.append("files[]", f, f.name);
            }
            // Display the key/value pairs
            await axios.post('/file/upload', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Loading': true
                    }
                }).then((response, error) => {
                if (response.status === 200) {
                    this.toast.success('Upload réussi');
                }
            });
            this.resetForm();
        }
    },
    async mounted() {
        await axios.get('/folders/structure',
            {
                headers: {
                    'X-Loading': true
                }
            }).then((response, error) => {
            if (response.status === 200) {
                this.structure = response.data;
                this.toast.success('Upload réussi');
            }
        });
    },
    setup() {
        // Get toast interface
        const toast = useToast();
        return {toast};
    },
});
</script>

<style scoped>

form {
    color: cornflowerblue;
}

</style>