<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" v-if="loggedIn">
      <v-card >
        <v-card-text>
          <v-row>
          <v-text-field v-model="newBond" label="Prizebond number" @keyup.enter="addBond" />
               <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="cyan"
                  @click="addBond"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
        </v-row>
        </v-card-text>
        
       <v-card-text>
         <v-data-table
          v-model="selected"
          :headers="headers"
          :items="bonds"
          :items-per-page="5"
          item-key="number"
          :search="search"
          show-select
          flat
        >
        <template v-slot:top>
      <v-toolbar
        flat
      >
                <v-btn fab color="brown" dark small>{{bonds.length }}</v-btn>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red"
              dark
              small
              fab
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" align="center">Are you sure to remove the prizebond entries?</v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(bond, i) in selected" :key="i">
                  {{bond.number }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="dialog=false">Cancel</v-btn>
              <v-btn @click="removeBonds">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
        </template>
        <template v-slot:item.number="{item}">
          {{item.number }}
        </template>
        <template v-slot:item.matches="{item}">
          <v-list two-line flat>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle v-for="(match, i) in item.matches" :key="i">
                  You have won {{ match.prize }} {{ match.amount  }} BDT on
                  {{ match.draw_number  }} th Draw! ({{ match.date  }})</v-list-item-subtitle
                >
                <v-list-item-subtitle v-if="item.matches.length == 0">Not found 😞</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          </template>
        </v-data-table>
     
       </v-card-text>
      </v-card>
      
    </v-col>
    <v-col v-else class="headline" align="center">
        Please login to continue
    </v-col>
  </v-row>
</template>

<script>
import { search_prizebond, conver_to_english } from "@/globals/";

export default {
  components: {},
  data() {
    return {
      newBond: "",
      bonds: [],
      selected: [],
      dialog: false,
      search: "",
      headers: [
        { text: 'Prizebond', value: 'number' },
        { text: 'Result', value: 'matches' },
      ]
    };
  },

  mounted() {
    this.$axios.get("/prizebonds/").then((response) => {
      this.bonds = response.data.map((bond) => {
        return {
          number: bond["BondNumber"],
          matches: search_prizebond(bond["BondNumber"]),
        };
      });
      
    });
  },
  created() {},
  methods: {
    addBond() {
      let value = this.newBond && this.newBond.trim();
      if (!value) {
        return;
      }
      value = conver_to_english(value)
      
      
      this.$axios.post("/prizebonds/", { number: value }).then(response=>{
        this.bonds.push({
          number: value,
          matches: search_prizebond(value),
        });
        this.newBond = "";
      })
    },
    removeBonds() {
      console.log(this.selected)
      if (this.selected.length>0){
        let bond_numbers = this.selected.map(item=>item.number)
        this.$axios.delete("/prizebonds/", { data: {bonds: bond_numbers} }).then((response)=>{

          for (let removed of this.selected){
            let index = this.bonds.indexOf(removed)
            this.bonds.splice(index, 1)
          }
          this.selected = []
          this.dialog = false
        })
      }else{
        this.dialog = false
      }
      
    },
  },
  computed: {
    loggedIn() {
      return this.$auth.user;
    },
  },
};
</script>
<style scoped></style>
