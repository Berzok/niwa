<template>

  <!--  <Breadcrumb :home="this.menu.home" :model="this.menu.items"/>-->
  <div class="d-flex flex-column px-4">

    <Toolbar>
      <template #start>
        <Button label="Nouveau dossier" icon="pi pi-plus" class="mr-2" />
        <Button label="Upload" icon="pi pi-upload" class="p-button-success" />
      </template>
    </Toolbar>

    <hr />

    <router-link :to="this.previousPath"
                 class="btn btn-primary text-start">
      <span class="fas fa-folder pe-2"></span>...
    </router-link>

    <hr/>

    <router-link v-for="c in this.childrens" :key="c"
                 :to="this.$route.path + '/' + c.name"
                 class="btn btn-primary text-start niwa-file-link"
                 @click="goToFolder(c.name)">
      <span class="fas fa-folder pe-2"></span>{{ c.name }}
    </router-link>

    <a v-for="f in this.files" :key="f"
       :href="f.url"
       target="_blank"
       class="btn btn-primary niwa-file-link text-start">
      <span class="fas fa-file-pdf pe-2"></span>{{ f.name }}
    </a>
  </div>

</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import * as pdfjs from 'pdfjs-dist';
import Toolbar from 'primevue/toolbar';

export default defineComponent({
    name: "Folder",
    components: {
        Breadcrumb,
        Button,
        DataView,
        DataViewLayoutOptions,
        Toolbar
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                // react to route changes...
                this.fetchData();
            }
        )
    },
    computed: {
        path() {
            let path = '';
            for (let p of this.$route.params.fullpath ?? []) {
                path += '/' + p;
            }
            return path;
        },
        previousPath(){
            const previous = this.$route.fullPath.split('/');
            previous.pop();
            return previous.join('/');
        }
    },
    data() {
        return {
            folder: null,
            content: [],
            childrens: [],
            files: [],
            menu: {
                home: {icon: 'fas fa-torii-gate', to: '/'},
                items: [
                    {label: 'Computer'},
                    {label: 'Notebook'},
                    {label: 'Accessories'},
                    {label: 'Backpacks'},
                    {label: 'Item'}
                ]
            }
        }
    },
    mounted() {
        pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
        this.fetchData();
    },
    methods: {
        goToFolder($event,) {

        },
        fetchData() {
            axios.get('/folder' + this.path, {
                headers: {
                    'X-Loading': true
                }
            }).then((response, error) => {
                if (response.status === 200) {
                    const data = response.data;
                    this.folder = data;
                    this.files = data.content;
                    this.childrens = data.children_folder;
                }
            });
        }
    }
})
</script>

<style scoped>


div.niwa-container:hover {
    opacity: 1;
}

.niwa-category-title {
    color: #a31545;
}

.niwa-file-link {
    font-size: 1.3rem;
    margin-top: 0.6rem;
    text-decoration: none;
}

.niwa-file-link:hover {
    text-shadow: 0 0 9px #c92860;
}

</style>