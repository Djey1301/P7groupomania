<template>
    <v-app id="mur" class="mur">
        <top-header/>
        <div class="ml-12">

            <h1 class="ma-4">Le mur</h1>
            <router-view></router-view>
            <v-container >
                <v-btn class="ma-3" @click="afficheForm">Créer un post</v-btn>
                <!--posts pour affichage-->
                <v-card class="mur__post ma-3 mt-6" v-for="(post, index) in allPosts" v-bind:key="index">
                    <p>{{ messagePst }}</p>
                    <div class="d-flex justify-space-between">
                        <v-card-title>
                            <h2 class="mur__post__title ml-0">{{ post.title }}</h2>
                        </v-card-title>
                        <!--Action de modifier ou supprimer-->
                        <v-card-actions class=" mur__post__manage" v-if="post.userId == userId">
                            <v-btn class=" mur__post__manage--btn" title="modifier le post" @click.stop="goDialogUpPost(post.title, post.content, post.id)" icon>
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                            <v-btn class=" mur__post__manage--btn" title="supprimer le post" @click="deletePost(post.id)" icon>
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn> 
                        </v-card-actions>

                    </div>

                    <v-card-subtitle class=" mur__post__name">
                        Par {{ post.firstName }} {{ post.lastName }}, le {{ post.date }} à {{ post.time }}
                    </v-card-subtitle>

                    <v-card-text class="v-card-text black--text mur__post__content" >
                        {{ post.content }}
                    </v-card-text>

                    <!--Affichage de -icon coeur- et action du like-->
                    <v-card-text class="py-0">
                        <v-btn fab title="like ?" class="ma-3" color="rgb(215,215,215)"  @click="likePost(post.id, post.likes)">
                                <v-icon >mdi-heart-outline</v-icon>
                        </v-btn> 
                        {{ post.likes }}
                        <v-icon>mdi-heart-outline</v-icon>
                        <!--Action pour visualiser les commentaires-->    
                        <v-btn text @click="afficheCom(post.id)" title="voir les commentaires">
                            <v-icon>mdi-comment-eye-outline</v-icon>
                            Commentaire.s
                        </v-btn>
                    </v-card-text>

                    <!--update post - Affiche le formulaire-->
            
                    <v-dialog v-model="dialogUpPost" max-width="500px">
                        <v-card>
                            <v-card-title>Modifier mon post</v-card-title>
                            <v-card-text>
                                <v-form ref="form" v-model="valid">
                                    <v-text-field v-model="dataPost.title" :rules="titleRules" :counter="50" label="Titre"></v-text-field>
                                    <v-textarea v-model="dataPost.content" :rules="contentRules" label="Commentaire"></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <!--Action sur le formulaire du post-->
                                <v-btn text @click="dialogUpPost=false">Annuler</v-btn>
                                <v-btn text :disabled="!valid" @click="updatePost()">Valider</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!--Affichage des commentaires-->
                    <div class="mur__comments" v-if="postId === post.id">
                        <v-card class="mur__comments--ind my-1 mx-2 pa-3 " color="rgba(255,215,215,0.3)" v-for="(comment, index) in allComments" v-bind:key="index" outlined>
                            
                            <v-card-subtitle class="pa-0 mur__comments__name">
                                Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :
                            </v-card-subtitle>
                           
                            <v-card-text class="pa-0 text--primary mur__comments__content ">
                                {{ comment.comContent }}
                            </v-card-text>
                        </v-card>  
                    </div>
                </v-card>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import TopHeader from "./TopHeader"

import axios from "axios"

export default {
    name: "Mur",
    data(){
        return{
            userId: "",
            admin:"",
            afficheFrmCm: false,
            allPosts: [],
            allLikes: [],
            allComments: [],
            postId: "",
            dialogUpPost: false,
            
            messagePst:"",
            form: true,

            valid: true,
            titleRules: [
                v => !!v || 'Le titre est obligatoire !',
                v => (v && v.length <= 50) || 'Le titre doit contenir 50 caractères maximum !',
            ],
            contentRules: [
                v => !!v || 'Ecrivez-nous un texte',
            ],
            comContentRules: [
                v => !!v || 'Vous nous envoyez un commentaire !',
                v => (v && v.length <= 100) || 'Le commentaire doit contenir 100 caractères maximum !',
            ],
            dataPost: {
                id: "",
                title:"",
                content:"",
                userId:"",
            },
            dataPostS: "",
            dataCom:{
                id: "",
                content:"",
                userId: ""
            },
            dataComS: "",
            dataLike:{
                userId: "",
                nbLikes: "",
                postId: "",
                liked: false,
            },
            dataLikeS: "" 
        }
    },
    methods: {
        afficheCom(pId){
            this.postId = pId;
            this.afficheFrmCm = false;
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
        },
        sendCom(pId){
            this.dataCom.userId = this.userId;
            this.dataComS = JSON.stringify(this.dataCom);
            console.log(this.dataComS);
            console.log(localStorage.token);
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false;
                })
                .catch(error => {
                    console.log(error); 
                    this.messageCom ='Affichage des commentaires impossible !';
                    this.msg=true
                });
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/Mur');
                })
                .catch(error => {
                    console.log(error);    
                })
        },
       
        goDialogUpPost(postTitle, postContent, postId){
            this.dataPost.title = postTitle;
            this.dataPost.content = postContent;
            this.dataPost.id = postId;
            this.dialogUpPost = true;
        },
        updatePost(){
            this.dataPost.userId = localStorage.userId;
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.put("http://localhost:3000/api/posts/" + this.dataPost.id, this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataPost.title = "";
                    this.dataPost.content = "";
                    this.dataPost.userId = "";
                    this.dataPost.id = "";
                    this.dialogUpPost = false;
                    window.location.assign('http://localhost:8080/Accueil/Mur');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        afficheForm(){
            this.$router.push('/Accueil/Mur/Post')
        },
       
        likePost(postId, nbLikes){
            this.allLikes.forEach(element => {
                if(element.postId === postId && element.userId == localStorage.userId){//Ne pas mettre trois égales devant localStorage, sinon ne fonctionne pas !
                    this.dataLike.nbLikes = nbLikes+-1;
                    this.dataLike.liked = true;
                }
            });
            if(this.dataLike.liked === false){
                this.dataLike.nbLikes = nbLikes+1;
            }
            this.dataLike.userId = localStorage.userId;
            this.dataLike.postId = postId;
            this.dataLikeS = JSON.stringify(this.dataLike);
            axios.post("http://localhost:3000/api/posts/" + postId + "/like", this.dataLikeS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataLike.liked = false;
                    window.location.assign('http://localhost:8080/Accueil/Mur');

                })
                .catch(error => {
                    console.log(error);
                    this.dataLike.liked = false;
                })
        },
    },
    components: {
        "top-header": TopHeader, 
    },
    mounted(){
        this.userId = localStorage.userId;
        axios.get("http://localhost:3000/api/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            this.messagePst = 'Affichage des posts impossible !'
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/posts/likes", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response =>{
                let likes = JSON.parse(response.data);
                this.allLikes = likes;
                
            })
            .catch(error => {
                console.log(error)
            });
        
    },
}
</script>
<style lang="scss">
    h1{
        text-align: center;
        color:#d1515a;
    }
    .mur{
        &__comments{
            &--ind{
                position: relative;
            }
        }
   }
   @media all and (max-width:600px)
   {
       .v-card{
           &__title{
          font-size:0.8rem; 
          }
       }
           
       
   }
</style>