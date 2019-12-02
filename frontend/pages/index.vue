<template>
  <div class="container">
    <div>
      <h1 class="title">
        sqlproject
      </h1>
      <div class="user">
        <input type="text" v-model="client">
        <input @click="senddata" type="button" value="wyslij">
        <div v-if="result !== ''">
          <ul>
            <li v-for="item in result.data[0]" v-bind:key="item.id_order">
              <a @click="getorder(item.id_order)"><span> Id: {{ item.id_order }} | Kwota: {{ item.amount }} | Sposób dostawy: {{ item.delivery_desc }} | Sposób płatoności: {{ item.payment_desc }}</span></a>
            </li>
          </ul>
          <div id="product"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  data(){
    return {
      client: '',
      result: ''
    }
  },
  components: {
    Logo
  },
  methods: {
    senddata: async function(){
      let self = this
    await axios.post('http://localhost:8080/user', {
      client: this.client,
      })
      .then(function (response) {
        self.result = response
      })
      .catch(function (error) {
        console.log(error);
      });
        var div = document.getElementById('product');
        if(div.innerHTML !== null){
          div.innerHTML = '';
        }
    },
    getorder: async function(id){
      console.log(id);
      let self = this;
      let link = 'http://localhost:8080/order/' + id
      await axios.get(link)
      .then(function (response) {
        var div = document.getElementById('product');
        div.innerHTML = JSON.stringify(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted(){

  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.user{
  margin-top: 30px
}
</style>
