<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" v-if="loggedIn">
      <v-card >
        <v-card-text>
          <v-row>
          <v-text-field v-model="newBond" label="প্রাইজবন্ড নাম্বার" @keyup.enter="addBond" />
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
        <v-list two-line flat>
          <v-list-item-group>
            <v-list-item v-for="(bond, i) in bonds" :key="i">
              <v-list-item-action>
                <v-checkbox readonly :input-value="bond.matches.length > 0"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ bond.number | bengali_number }}</v-list-item-title>
                <v-list-item-subtitle v-for="(match, i) in bond.matches" :key="i">
                  ভাই জিতসেন! {{ match.prize }} {{ match.amount | bengali_number }} টাকা। ড্রঃ
                  {{ match.draw_number | bengali_number }} তম ({{ match.date | bengali_number }})</v-list-item-subtitle
                >
                <v-list-item-subtitle v-if="bond.matches.length == 0">পাওয়া যায় নি 😞</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn fab ripple x-small color="red" @click="removeBond(i)">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
       </v-card-text>
      </v-card>
      
    </v-col>
    <v-col v-else class="headline" align="center">
        আপনার প্রাইজবন্ড সংরক্ষণ করতে লগইন করুন
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
      this.bonds.push({
        number: value,
        matches: search_prizebond(value),
      });
      this.newBond = "";
      this.$axios.post("/prizebonds/", { number: value });
    },
    removeBond(index) {
      let value = this.bonds[index]["number"];
      this.$axios.delete("/prizebonds/", { data: { number: value } });
      this.bonds.splice(index, 1);
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
