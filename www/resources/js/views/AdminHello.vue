// resources/js/views/AdminHello.vue
<template>
    <div>
        <h1>Only for Admin!  Hello World!</h1>
        <div v-if="message" class="alert">{{ message }}</div>
        <button @click.prevent="FillDB" type="button" id="id_fill_base" class="btn btn-warning float-right">{{ finish ? 'База наполнена данными' : 'Заполнить базу тестовыми данными' }}</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: false,
                finish: false,
            }
        },
        methods: {
            FillDB($event) {
                this.message = false
                this.finish = false
                //api.create(this.user)
                    this.$http({
                        url: 'auth/filldb',
                        method: 'GET',
                    })
                    .then((response) => {
                        this.finish = true;
                    })
                    .catch((e) => {
                        this.message = e.response.data.message || ' There was an issue fill database with fake data.';
                    })
            },
        }
    }    
</script>
