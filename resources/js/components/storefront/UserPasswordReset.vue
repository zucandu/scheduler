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
                        <div class="card-title h5">Reset your password</div>
                        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                        <form @submit.prevent="resetPassword()">
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="formdata.password" type="password" class="form-control" id="password" placeholder="Password" required>
                            </div>
                            <div class="mb-3">
                                <label for="password-confirm" class="form-label">Confirm Password</label>
                                <input v-model="formdata.password_confirmation" type="password" class="form-control" id="password-confirm" placeholder="Password Confirmation" required>
                                <div class="text-danger small" v-if="passwordNotMatch">Please make sure your password match</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <router-link class="btn btn-link px-0" to="/login">Back to login</router-link>
                                <button class="btn btn-primary" type="submit" :disabled="passwordNotMatch">Reset</button>
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
            password: undefined,
            password_confirmation: undefined,
            token: undefined
        },
        errorMsg: undefined,
    }),
    created() {
        this.formdata.token = this.$route.params.token
    },
    methods: {
        resetPassword() {
            this.$store.dispatch('resetPassword', this.formdata).then(() => {
                this.$router.push({ path: '/login', query: { msg: 'Your password has been reset. Please login and happy shopping!' } })
            }).catch(error => {
                this.errorMsg = error.response.data.message
            })
        },
    },
    computed: {
        passwordNotMatch() {
            return (this.formdata.password && (this.formdata.password !== this.formdata.password_confirmation))
        }
    }
}
</script>