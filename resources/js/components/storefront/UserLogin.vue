<template>
    <section class="min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
            <div v-if="!isUserLogged" class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex justify-content-center py-4">
                        <router-link to="/" class="logo">
                            <img class="mx-5" src="/storage/scheduler.svg" width="60" alt="Zucandu Scheduler">
                        </router-link>
                    </div><!-- End Logo -->
                    
                    <div class="card card-body shadow-sm w-100">
                        <div class="card-title h5">Login</div>
                        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                        <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
                        <form @submit.prevent="login()">
                            <div class="mb-3">
                                <label class="form-label">Store URL</label>
                                <input v-model="formdata.store_url" type="text" class="form-control" placeholder="E.g. hello.zucandu.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="formdata.password" type="password" class="form-control" id="password" placeholder=" Password " required>
                            </div>
                            <div class="d-flex justify-content-between">
                                <router-link class="btn btn-link px-0" to="/forgot-password">Forgot Password?</router-link>
                                <button :disabled="processing === true" class="btn btn-primary" type="submit">
                                    <template v-if="processing === true">
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </template>
                                    <template v-else>
                                        Login
                                    </template>
                                </button>
                            </div>
                            <hr class="border-light">
                            <p class="text-center">You need to connect the app from your Zucandu's store.</p>
                            <!-- <p class="text-center">Don't have an account? <router-link to="/register">Sign Up</router-link></p> -->
                        </form>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div v-if="isUserToken" class="col-12 text-center">
                    <p>You have already logged into the system. Please go to the <router-link to="/store/dashboard">Zucandu Scheduler Dashboard</router-link> or back to the <router-link to="/">home page</router-link>.</p>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        formdata: {
            store_url: undefined,
            password: undefined,
        },
        processing: false,
        errorMsg: undefined,
        successMsg: undefined
    }),
    created() {
        this.successMsg = this.$route.query.msg
    },
    methods: {
        login() {
            this.processing = true
            this.$store.dispatch('login', this.formdata).then(() => {
                this.$store.dispatch('getUserProfile').then(() => {
                    this.$router.push('/store/dashboard')
                })
            }).catch(error => {
                this.errorMsg = error.response.data.message
            })
            .finally(() => {
                this.processing = false
                this.successMsg = undefined
            })
        }
    },
    computed: {
        ...mapGetters(['isUserLogged', 'isUserToken']),
    }
}
</script>