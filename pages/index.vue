<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="searchTerm" label="Search" placeholder="0078434,0316762" @keyup.enter="search" />
      <v-card v-if="search_result.length > 0">
        <v-card-text>
        <v-row v-for="(result,i) in search_result" :key="i">
          <v-col>{{result.bond}}</v-col>
          <v-col>{{result.prize}} {{result.amount}} BDT</v-col>
          <v-col>{{result.draw_number }} th Draw({{result.date}})</v-col>
        </v-row>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-text>
          Sorry! No result found!
        </v-card-text>
      </v-card>
      <v-list>
        
        <v-list-group
          v-for="(result, i) in results"
          :key="i"
          v-model="result.active"
          prepend-icon="mdi-prize"
          no-action
          active-class="cyan white--text"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <div align="center" class="headline">
                {{ result.draw_number }} th Draw result ({{ result.date }})
              </div>
            </v-list-item-content>
          </template>
          <v-flex class="ma-2">
            <v-row align="center">
              <v-col align="center" cols="12" class="headline red--text"
                >First Prize: {{ result.first.amount }} BDT</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.first.bonds" :key="i">
                {{ bond  }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline green--text"
                >Second Prize: {{ result.second.amount }} BDT</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.second.bonds" :key="i">
                {{ bond }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline blue--text"
                >Third Prize: {{ result.third.amount }} BDT</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.third.bonds" :key="i">
                {{ bond  }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline orange--text"
                >Fourth Prize: {{ result.fourth.amount }} BDT</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.fourth.bonds" :key="i">
                {{ bond  }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline teal--text"
                >Fifth Prize: {{ result.fifth.amount }} BDT</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.fifth.bonds" :key="i">
                {{ bond  }}
              </div>
            </v-row>
          </v-flex>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { search_prizebond, results } from "@/globals/";

export default {
  methods: {
    search() {
      
      this.search_result = search_prizebond(this.searchTerm);

      this.searchTerm = "";
    },
  },
  data: () => ({
    searchTerm: "",
    search_result: [],
    results: results
  }),
  mounted(){
    if(this.loggedIn){
      this.$axios.get("/prizebonds/").then((response) => {
      this.search_result = search_prizebond(response.data.map((bond) => bond["BondNumber"]).join(","))
      
    })}
  },
  computed: {
    loggedIn(){
      return this.$auth.user
    }
  }
};
</script>
