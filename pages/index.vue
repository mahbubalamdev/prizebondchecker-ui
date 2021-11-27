<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="searchTerm" label="খুঁজে দেখুন" placeholder="০০৭৮৪৩৪,০৩১৬৭৬২" @keyup.enter="search" />
      <v-card v-if="search_result.length > 0">
        <v-card-text>
        <v-row v-for="(result,i) in search_result" :key="i">
          <v-col>{{result.bond | bengali_number}}</v-col>
          <v-col>{{result.prize}} {{result.amount | bengali_number}} টাকা</v-col>
          <v-col>{{result.draw_number | bengali_number}} তম 'ড্র'({{result.date | bengali_number}})</v-col>
        </v-row>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-text>
          দুঃখিত, কোন ফলাফল পাওয়া যায় নি
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
                {{ result.draw_number | bengali_number }} তম 'ড্র' এর ফলাফল ({{ result.date | bengali_number }})
              </div>
            </v-list-item-content>
          </template>
          <v-flex class="ma-2">
            <v-row align="center">
              <v-col align="center" cols="12" class="headline red--text"
                >প্রথম পুরস্কারঃ {{ result.first.amount | bengali_number }} টাকা</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.first.bonds" :key="i">
                {{ bond | bengali_number }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline green--text"
                >দ্বিতীয় পুরস্কারঃ {{ result.second.amount | bengali_number }} টাকা</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.second.bonds" :key="i">
                {{ bond | bengali_number }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline blue--text"
                >তৃতীয় পুরস্কারঃ {{ result.third.amount | bengali_number }} টাকা</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.third.bonds" :key="i">
                {{ bond | bengali_number }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline orange--text"
                >চতুর্থ পুরস্কারঃ {{ result.fourth.amount | bengali_number }} টাকা</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.fourth.bonds" :key="i">
                {{ bond | bengali_number }}
              </div>
            </v-row>
            <v-row align="center">
              <v-col align="center" cols="12" class="headline teal--text"
                >পঞ্চম পুরস্কারঃ {{ result.fifth.amount | bengali_number }} টাকা</v-col
              >
            </v-row>
            <v-row align="center" class="d-flex justify-center">
              <div align="center" class="ma-2 black--text" v-for="(bond, i) in result.fifth.bonds" :key="i">
                {{ bond | bengali_number }}
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
