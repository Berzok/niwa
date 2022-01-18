<template>
  <div class="d-flex flex-fill flex-column">

    <form id="form_upload" class="d-flex flex-column text-start">

      <!--      <input id="file_input" name="image" class="align-self-center" type="file" @change="addFile">-->
      <FileUpload name="files[]" :multiple="true"
                  :showCancelButton="false"
                  @select="addFile"
                  :customUpload="true"
                  @uploader="upload"/>

      <div class="text-center">
        <Button label="Valider" icon="pi pi-check"
                @click="upload"
                class="p-button-success btn-outline-warning mt-5"/>
        <Button label="Annuler" icon="pi pi-times"
                @click="resetForm"
                class="p-button-warning btn-outline-warning mt-5"/>
      </div>

    </form>
  </div>

</template>

<script lang="js">
import {defineComponent} from 'vue';
import axios from "axios";
import {useToast} from "vue-toastification";
import * as pdfjs from "pdfjs-dist";
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

export default defineComponent({
    name: 'Upload',
    components: {
        Button,
        FileUpload
    },
    computed: {},
    data() {
        return {
            thumbnail: null,
            files: [],
            image: null,
            source: null
        }
    },
    methods: {
        addFile(event) {
            console.dir(event.files);
            event.files.forEach((value) => {
                if(!this.files.includes(value)){
                    this.files.push(value);
                }
            });
            console.dir(this.files);
        },
        createPreview(file) {
            let src = URL.createObjectURL(file);
            this.thumbnail = src;
            this.loadThumbnail(file);
        },
        resetForm(){
            this.files = [];
        },
        uploadHandler(event){
            this.upload();
        },
        loadThumbnail(file) {
            pdfjs.getDocument(this.thumbnail).promise.then((pdf) => {
                pdf.getPage(1).then(function (page) {
                    // you can now use *page* here

                    let desiredWidth = 250;
                    let viewport = page.getViewport({scale: 1,});
                    let scale = desiredWidth / viewport.width;
                    let scaledViewport = page.getViewport({scale: scale,});

                    // Support HiDPI-screens.
                    let outputScale = window.devicePixelRatio || 1;

                    let canvas = document.getElementById('canvas-preview');
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
                    console.dir(file);
                    file.thumbnail = canvas.toDataURL();
                });
            });
        },
        async upload() {
            let formData = new FormData();
            for(let f of this.files){
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
                    if(response.status === 200){
                        this.toast.success('Upload réussi');
                    }
            });
            this.resetForm();
        }
    },
    async mounted() {
        pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
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