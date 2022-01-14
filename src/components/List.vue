<template>

  <div class="">

    <div class="niwa-container d-flex flex-column mt-3 w-75 mx-auto">

      <h1 class="niwa-category-title mx-auto">
        <strong>Books</strong>
      </h1>

      <div class="d-flex flex-column px-4">
        <a v-for="f in this.files" :key="f"
           :href="f.url"
           class="niwa-file-link">
          <span class="fas fa-file-pdf pe-2"></span>{{ f.Key }}
        </a>
      </div>

      <div class="d-flex mt-5 mb-3 mx-4 border-top">
        <div class="flex-fill mx-3 mt-3 border-bottom"></div>
      </div>
    </div>

  </div>

</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import Breadcrumb from 'primevue/breadcrumb';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import * as pdfjs from 'pdfjs-dist';


export default defineComponent({
    name: "List",
    components: {
        Breadcrumb,
        DataView,
        DataViewLayoutOptions
    },
    data() {
        return {
            files: null,
            layout: 'list',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ]
        }
    },
    mounted() {
        pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
        axios.get('/files', {
            headers: {
                'X-Loading': true
            }
        }).then((response, error) => {
            if (response.status === 200) {
                this.files = response.data;
                if (this.layout === 'grid') {
                    this.loadThumbnail();
                }
            }
        });
    },
    methods: {
        onSortChange(event) {
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            } else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
        loadThumbnail(event) {
            this.files.forEach((value, key) => {
                pdfjs.getDocument(value.url).promise.then((pdf) => {
                    pdf.getPage(1).then(function (page) {
                        // you can now use *page* here

                        let desiredWidth = 100;
                        let viewport = page.getViewport({scale: 1,});
                        let scale = desiredWidth / viewport.width;
                        let scaledViewport = page.getViewport({scale: scale,});

                        // Support HiDPI-screens.
                        let outputScale = window.devicePixelRatio || 1;

                        let canvas = document.getElementById('canvas-' + value.ETag);
                        let context = canvas.getContext('2d');

                        canvas.width = Math.floor(scaledViewport.width * outputScale);
                        canvas.height = Math.floor(scaledViewport.height * outputScale);
                        canvas.style.width = Math.floor(scaledViewport.width) + "px";
                        canvas.style.height = Math.floor(scaledViewport.height) + "px";

                        let transform = outputScale !== 1
                            ? [outputScale, 0, 0, outputScale, 0, 0]
                            : null;

                        let renderContext = {
                            canvasContext: context,
                            transform: transform,
                            viewport: scaledViewport
                        };
                        page.render(renderContext);
                    });
                });
            })
        }
    }
})
</script>

<style scoped>

.niwa-container {
    background-color: #2c3e50;
    opacity: 0.9;
    transition-duration: 0.8s;
    animation: 5s infinite linear pulse;
}
@keyframes pulse {
    0% {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7);
    }
    25%{
        box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.7);
    }
    50%{
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

.niwa-file-link{
    font-size: 1.3rem;
    margin-top: 0.6rem;
    text-decoration: none;
}
.niwa-file-link:hover{
    text-shadow: 0 0 9px #c92860;
}

</style>