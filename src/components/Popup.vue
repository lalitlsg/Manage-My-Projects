<template>
    <v-dialog max-width="600px" v-model="dialog">
      <v-btn flat slot="activator" class="success">Add new project</v-btn>
      <v-card>
          <v-card-title>
              <h2>Add a New Project</h2>
          </v-card-title>
          <v-card-text>
              <v-form class="px-3" ref="form">
                 <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                 <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputTextarea"></v-textarea>
                 
                <v-menu>
                    <v-text-field :value="formattedDate" :rules="pickDate" slot="activator" label="Due Date" prepend-icon="date_range"></v-text-field>
                    <v-date-picker v-model="due"></v-date-picker>
                </v-menu>
                <v-text-field label="Enter Security Pin" v-model="pin" :rules="inputPin" prepend-icon="fiber_pin" ></v-text-field>
                 <v-spacer></v-spacer>
                 <v-btn class="success mx-0 mt-3" @click="submit" :loading="loading">add project</v-btn>
              </v-form>
          </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'
export default {
    data(){
        return{
            title:'',
            content:'',
            pin:'',
            due:null,
            inputRules:[
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            inputTextarea:[
                v => v.length >= 50 || 'Minimum length is 50 characters'
            ],
            pickDate:[
                v => v.length >= 1 || 'Pick the date'
            ],
            inputPin:[
                v => this.pin == 17101997 || 'Enter Valid Security Pin'
            ],
            loading:false,
            dialog:false
        }
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                this.loading = true;
            const project = {
                title:this.title,
                content:this.content,
                due:format(this.due,'Do MMM YYYY'),
                status:'OnGoing'
            }
            db.collection('projects').add(project).then(() =>{
                this.loading = false;
                this.dialog = false;
                this.$emit('projectAdded')
                
            })
            }
        }
    },
    computed:{
        formattedDate(){
            return this.due ? format(this.due,'Do MMM YYYY'):''
        }
    }
}
</script>
