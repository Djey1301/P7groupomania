<template>
    <v-app id="accueil" class="text-center">
        <top-header/>
        <div class="battle">
             <h1 class="ma-4">Les gifs pour la battle :</h1>
            <router-view></router-view>
            <div class="container" >
                <v-btn class="ma-3" @click="gifForm">Créer un gif</v-btn>
                <!--posts-->
                <div class="Gifs" v-for="(gif, index) in allGifs" v-bind:key="index" heig>
                    <div class="flex">
                        <div class="cardTitle">
                            <h2 class="title">{{ gif.title }}</h2>
                        </div>
                        <!--
                        <v-card-actions class=" mur__gif__manage" v-if="gif.userId == userId">
                            <v-btn class=" mur__post__manage--btn" title="modifier le post" @click.stop="goDialogUpGif(gif.title, gif.url, gif.id)" icon>
                                
                            </v-btn>
                            <v-btn class=" mur__post__manage--btn" title="supprimer le post" @click="deleteGif(gif.id)" icon>
                                
                            </v-btn> 
                        </v-card-actions>
                        -->
                        <div class="date">
                        Le {{ gif.date }} à {{ gif.time }}
                        </div>
                    <!-- insertion image-->
                        <div id="image">
                            <img
                               :src= "gif.url"
                               alt="une image gif"
                            >
                        </div>

                        
                    <!--update gif - form
                    Evolution possible
                        <v-dialog v-model="dialogUpGif" max-width="800px">
                            <v-card>
                              <v-card-title>Modifier mon gif</v-card-title>
                              <v-card-text>
                                <v-form ref="form" v-model="valid">
                                    <v-text-field v-model="dataGif.title" :rules="titleRules" :counter="30" label="Titre"></v-text-field>   
                                    <v-text-field v-model="dataGif.url" :rules="urlRules" label="Adresse URL type HTTP:" required></v-text-field>
                                </v-form>
                              </v-card-text>
                              <v-card-actions>
                                  <v-btn text @click="dialogUpGif=false">Annuler</v-btn>
                                  <v-btn text :disabled="!valid" @click="updateGif()">Valider</v-btn>
                              </v-card-actions>
                            </v-card>
                        </v-dialog>
                        -->
                    </div>
                </div>
            </div>
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
            dialogUpGif: false,

            valid: true,
            titleRules: [
                v => !!v || 'Un titre est requis',
                v => (v && v.length <= 30) || 'Title must be less than 30 characters',
            ],
            urlRules: [
                v => !!v || 'Une URL is requise',
            ],
            dataGif: {
                id: "",
                title:"",
                url:"",
                userId:"",
            },
            datagifS: "",
            form: true
            
            
        }
    },
    methods: {
        
       
       /* deleteGif(gId){
            this.gifId = gId;
            axios.delete("http://localhost:3000/api/gifs/" + gId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil');
                })
                .catch(error => {
                    console.log(error);    
                })
        },*/
       
        goDialogUpGif(gifTitle, gifUrl, gifId){
            this.dataGif.title = gifTitle;
            this.dataGif.url = gifUrl;
            this.dataGif.id = gifId;
            this.dialogUpGif = true;
        },
        updateGif(){
            this.dataGif.userId = localStorage.userId;
            this.datagifS = JSON.stringify(this.dataGif);
            axios.put("http://localhost:3000/api/gifs/" + this.dataGif.id, this.dataGifS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataGif.title = "";
                    this.dataGif.url = "";
                    this.dataGif.userId = "";
                    this.dataGif.id = "";
                    this.dialogUpGif = false;
                    window.location.assign('http://localhost:8080/Accueil');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        
       
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
    #image{
        margin-left:100px;
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