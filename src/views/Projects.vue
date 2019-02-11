<template>
<div class="projects">
  <h1 class="subheading grey--text">Projects</h1>
  <v-container class="my-5">
       <v-expansion-panel>
         <v-expansion-panel-content v-for="detail in details" :key="detail.title">
           <div slot="header">{{detail.title}}</div>
           <v-card>
             <v-card-text class="px-4 grey--text">
               <div class="font-weight-bold">Date Of Completion : {{detail.due}}</div>
               <div>{{detail.content}}</div>
             </v-card-text>
           </v-card>
         </v-expansion-panel-content>
       </v-expansion-panel>
  </v-container>
</div>
</template>

<script>
import db from '@/fb'

export default {
     data(){
       return{
      details:[]
       }
     },
     computed:{
       myProjects(){
          return this.details.filter(detail => {
            return detail.person === 'Lalit Garghate'
          })
       }
     },
     created(){
     db.collection('projects').onSnapshot(res => {
       const changes = res.docChanges();
       changes.forEach(change => {
         if(change.type === 'added'){
              this.details.push({
                ...change.doc.data(),
                id:change.doc.id
              })
         }
       });
     })
  }
  }
</script>
