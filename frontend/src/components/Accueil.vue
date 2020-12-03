<template>
    <v-app id="accueil" class="text-center">
        <top-header/>
        <div class="battle">
             <h1 class="ma-4">Les gifs pour la battle :</h1>
            <router-view></router-view>
            <v-container >
                <v-btn class="ma-3" @click="gifForm">Créer un gif</v-btn>
                <!--posts-->
                <div class="Gifs" v-for="(gif, index) in allGifs" v-bind:key="index" heig>
                    <div class="flex">
                        <div class="cardTitle">
                            <h2 class="title">{{ gif.title }}</h2>
                            <h2 class="Name">Par : {{ gif.name }}</h2>
                        </div>
                        
                        <div class="date">
                        Le {{ gif.date }} à {{ gif.time }}
                        </div>
                    <!-- insertion image-->
                        <div id="image">
                            <v-img
                               max-width="400"
                               max-height="400"
                               :src= "gif.url"
                               alt="une image gif"></v-img>
                        </div>

                    </div>
                </div>
            </v-container>
        </div>
    </v-app>
</template>
          
           
      
<script>
import TopHeader from "./Accueil/TopHeader";
import axios from "axios";

export default {
    name: "Accueil",
    data(){
        return{
            userId: "",
            allGifs: [],
        }
    },
    methods: {
        gifForm(){
            this.$router.push('/Accueil/Gifs')
        },
        

    },
    components: {
        "top-header": TopHeader, 
    },
    mounted(){
        this.userId = localStorage.userId;
        axios.get("http://localhost:3000/api/gifs/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let gifs = JSON.parse(response.data);
                this.allGifs = gifs;
                //console.log(gifs) 
            })
            .catch(error => {
            console.log(error); 
            });
    },
}
 
</script>
<style lang="scss" scoped>
    
    .flex{
        margin-top:20px;
        border:2px solid #091f43;
    }
    
    .header{
        background-color: rgb(94, 85, 83);
        color: white;
    }
    .button{
        border:2px solid black;
        padding:3px;
        background-color: #091f43;
        color:white;
        margin-top: 5%;
    }
      @media all and (max-width:500px)
    {
       
        .flex{
            border:1px solid white;
        }
        #image{
            width:300px;
            margin-left:0;
        }
        img{
            margin:0;
        }
       
    }
        
    
</style>