<template>
    <div class="container">
        <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-4 pt-1">
                <a class="btn btn-sm btn-link px-0 text-decoration-none" href="https://zucandu.com" target="_blank">
                    Zucandu.com
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                </a>
            </div>
            <div class="col-4 text-center">
                <a class="blog-header-logo text-dark text-decoration-none" href="#">
                    <img class="mx-5" src="/storage/freegifts.svg" width="60" alt="Zucandu Scheduler">
                </a>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center">
                <router-link to="/store/dashboard" class="btn btn-sm btn-success">Dashboard</router-link>
            </div>
        </div>
        </header>
        <section class="mt-5">
            
        </section>
        <footer class="py-3">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <router-link class="p-2" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="p-2"  to="/privacy">Privacy Policy</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="p-2"  to="/terms-and-conditions">Terms and Conditions</router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>