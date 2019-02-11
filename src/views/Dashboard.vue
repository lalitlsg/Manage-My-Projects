<template>
<div class="dashboard">
  <h1 class="subheading grey--text">Dashboard</h1>

  <v-container class="my-5">
  
       <v-layout row class="mb-3">
         <v-tooltip top>
         <v-btn small flat color="grey" @click="sortBy('projectTitle')" slot="activator">
           <v-icon left small>folder</v-icon>
           <span class="caption text-lowercase">By Project Name</span>
         </v-btn>
         <span>Sort projects by project name</span>
         </v-tooltip>
         <v-tooltip top>
         <v-btn small flat color="grey" @click="sortBy('due')" slot="activator">
           <v-icon left small>date_range</v-icon>
           <span class="caption text-lowercase">By Date</span>
         </v-btn>
         <span>Sort projects by date</span>
         </v-tooltip>
       </v-layout>

     <v-card flat  v-for="detail in details" :key="detail.id">
       <v-layout row wrap :class="`pa-3 detail ${detail.status}`">
         <v-flex xs12 md6>
           <div class="caption gray--text">Project Title</div>
           <div>{{detail.title}}</div>
         </v-flex>
      
        <v-flex xs12 sm4 md2>
           <div class="caption gray--text">Date Of Completion</div>
           <div>{{detail.due}}</div>
          </v-flex>
        <v-flex xs12 sm4 md2>
           <div class="right">
             <v-chip small :class="`${detail.status} white--text caption mt-3`">{{detail.status}}</v-chip>
           </div>
           </v-flex>
        <v-flex xs12 sm4 md2>
          <a :href="detail.link">
          <v-btn fab small left color="green" dark class="ml-2 mb-3"><v-icon>keyboard_arrow_right</v-icon></v-btn>
          </a>
          </v-flex>  
       </v-layout>
       <v-divider></v-divider>
     </v-card>
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
  methods:{
    sortBy(prop){
      this.details.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
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
<style>                 
.detail.Complete{
  border-left: 4px solid #3cd1c2;
}

.detail.OnGoing{
  border-left: 4px solid orange;
}
.v-chip.Complete{
  background: #3cd1c2;
}

.v-chip.OnGoing{
  background: orange;
}

</style>
