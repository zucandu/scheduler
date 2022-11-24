<template>
    <section class="min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex justify-content-center py-4">
                        <router-link to="/" class="logo">
                            <img class="mx-5" src="/storage/auto-backup.svg" width="60" alt="Zucandu Auto Backup">
                        </router-link>
                    </div><!-- End Logo -->
                    
                    <div class="card card-body shadow-sm w-100">
                        <div class="card-title h5">Password Forgotten</div>
                        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                        <form @submit.prevent="sendPasswordResetUrl()">
                            <div class="mb-3">
                                <label class="form-label">Store URL</label>
                                <input v-model="formdata.store_url" type="text" class="form-control" placeholder="E.g. hello.zucandu.com" required>
                            </div>
                            <div class="d-flex justify-content-between">
                                <router-link class="btn btn-link px-0" to="/login">Back to login</router-link>
                                <button class="btn btn-primary" type="submit">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data: () => ({
        formdata: {
            store_url: undefined,
        },
        errorMsg: undefined
    }),
    methods: {
        sendPasswordResetUrl() {
            this.$store.dispatch('forgotPassword', this.formdata).then(() => {
                this.$router.push({ path: '/login', query: { msg: 'Please check your email for a password reset link.' } })
            }).catch(error => {
                this.errorMsg = error.response.data.message
            })
        },
    }
}
</script>