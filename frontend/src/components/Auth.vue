<template>
    <v-app id="auth">
        <div class="auth__message">
            <p> Bienvenue dans notre réseau social </p>
        </div>
        <v-container class="auth">
            <div class="auth__boutons">
                <v-btn class="auth__boutons--ind" @click="component='login'">Se connecter</v-btn>
                <v-btn class="auth__boutons--ind" @click="component='signup'">S'inscrire</v-btn>
            </div>
            <component v-bind:is="component"></component>
        </v-container>
    </v-app>
</template>

<script>
    import Login from "./Auth/Login.vue"
    import Signup from "./Auth/Signup.vue"

    export default {
        name : "Auth",
        data(){
            return{   
                component: ""
            }
        },
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss" scoped>
    #auth {
        background: no-repeat center/60% url("../assets/icon-left-font-monochrome-black.svg") ;

    }
    .auth {
        &__boutons{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 35%;
            &--ind{
                margin-top: 5%;
                width: 150px ;
                
            }
        }
    }
     .auth {
        &__boutons{
            &--ind :hover{
                animation: shake 0.80s cubic-bezier(.36,.07,.19,.97) both; 
                transform: translate3d(0, 0, 0); 
                backface-visibility: hidden; 
                perspective: 1000px;  
                
            }
        }
    }
    .auth {
        &__message{
            font-size: 1.5rem;
            text-align: center;
            color: #d1515a;
            margin-top:2%;
        }
    }
   

    @keyframes shake { 
        10%, 90% { 
        transform: translate3d(-1px, 0, 0); 
        } 
    
        20%, 80% { 
        transform: translate3d(2px, 0, 0); 
        } 
    
        30%, 50%, 70% { 
        transform: translate3d(-4px, 0, 0); 
        } 
    
        40%, 60% { 
        transform: translate3d(4px, 0, 0); 
        } 
    } 
    @media all and (max-device-width)
    {
        #auth{
            background: no-repeat center/20% url("../assets/icon-left-font-monochrome-black.svg") ;
        }
        .auth {
            &__boutons {
                display: column;
            }
        }
    }
    
</style>