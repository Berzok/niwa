import {defineStore, acceptHMRUpdate} from 'pinia';
import axios from "axios";

const useUserStore = defineStore('user', {
    state: () => ({
        /** @type {'all' | 'finished' | 'unfinished'} */
        filter: 'all',
        // type will be automatically inferred to number
        token: '',
        username: '',
        password: '',
        user: {},
        logged: false,
    }),
    getters: {
        getToken(){
            return this.token;
        },
        getTags(){
            return this.tags;
        },
        /**
         * Check if a user is logged;
         * @param state
         * @returns {boolean|*}
         */
        isLogged(state){
            return state.logged;
        }
    },
    actions: {
        async login(){
            return axios.post('/login', {
                'username': this.username,
                'password': this.password
            }, {
                headers: {
                    'X-Loading': true
                }
            }).then((response) => {
                this.user = response.data.userData;
                this.logged = true;
                return true;
            });
        },
        populate(tags){
            this.tags = tags;
        }
    },
});

// make sure to pass the right store definition, `useAuth` in this case.

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

export {useUserStore};