import {defineStore, acceptHMRUpdate} from 'pinia';
import Cookies from 'js-cookie';
import axios from "axios";

const useUserStore = defineStore('user', {
    state: () => ({
        /** @type {'all' | 'finished' | 'unfinished'} */
        filter: 'all',
        // type will be automatically inferred to number
        username: '',
        password: '',
        user: {},
        logged: Cookies.get('niwa.session') || false,
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
                if(response.status === 200){
                    this.user = response.data.userData;
                    this.logged = response.data.token;
                    Cookies.set('niwa.session', response.data.token, {
                        expires: 5
                    });
                }

                return true;
            });
        },
        logout(){
            Cookies.remove('niwa.session');
            this.$reset();
        }
    },
});

// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}



export {useUserStore};