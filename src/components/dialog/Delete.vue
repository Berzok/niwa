<template>

  <!--  <Breadcrumb :home="this.menu.home" :model="this.menu.items"/>-->
  <div v-show="this.visible" class="modal-background">
    <div class="niwa-modal-content d-flex flex-column">

      <h2 class="mx-auto">Delete this?</h2>

      <div>
        <h4 class="text-center text-info">
          {{ this.resource.name }}
        </h4>
      </div>

      <div class="d-flex flex-fill justify-content-center">
        <button class="btn btn-primary btn-outline-warning w-50" @click="this.deleteResource">
          <span class="fas fa-times"></span>
          Cancel
        </button>
        <button class="btn btn-primary btn-outline-danger w-50" @click="this.deleteResource">
          <span class="fas fa-trash"></span>
          Delete
        </button>
      </div>

    </div>
  </div>

</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import {useToast} from "vue-toastification";

export default defineComponent({
    name: "Delete",
    components: {
        Button,
        Dialog
    },
    emits: ['update:visible'],
    props: {
        resource: null,
        visible: false
    },
    data(){
        return {
            modalVisible: this.visible,
            toast: useToast()
        }
    },
    methods: {
        closeModal(){
            this.$emit('update:visible', false);
            this.$emit('invalidate');
        },
        deleteResource() {
            if (this.resource) {
                axios.delete('/resource/delete/' + this.resource.id, {
                    headers: {
                        'X-Loading': true
                    }
                }).then((response, error) => {
                    if (response.status === 200) {
                        this.toast.success('Delete complete');
                        this.closeModal();
                    }
                });
            }
        },
    }
})
</script>

<style scoped>

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.niwa-modal-content {
    position: relative;
    background-color: var(--bs-secondary);
    border: 1px solid #3e1046;
    border-radius: 9px;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    top: 40%;
    width: 20%;
}
</style>