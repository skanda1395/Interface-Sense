<template>
  <div
    class="d-flex border-bottom py-2 align-items-center member"
    @click="autocompleteName"
    :class="{'text-muted': toMute}"
  >
    <div class=" d-flex align-items-center img-container">
      <img :src="profile_pic" alt="profile_pic" />
    </div>
    <div class="d-flex flex-column py-2 ml-3">
      <div class="name" id="name-container">
        <span id="firstName">{{ member.firstName }}</span
        >&nbsp;
        <span id="lastName">{{ member.lastName }}</span>
      </div>
      <span class="firmName text-muted offsetY" id="firmName">{{
        member.firmName
      }}</span>
    </div>
    <i class="material-icons text-muted" id="forward-icon" @click="showDetails"
      >arrow_forward_ios</i
    >
  </div>
</template>

<script>
export default {
  props: ["member", 'toMute'],
  data() {
    return {
      ID: this.member.memberId
    };
  },
  methods: {
    showDetails() {
      this.$router.push("/" + this.ID);
    },
    autocompleteName() {
      this.$emit(
        "fillName",
        `${this.member.firstName} ${this.member.lastName}`
      );
    }
  },
  computed: {
    profile_pic() {
      // let i = Math.floor(Math.random() * 2);
      if (this.member.gender == "Female") {
        return require("@/assets/woman_1.png");
      } else {
        return require("@/assets/man_1.png");
      }
    }
  }
};
</script>

<style></style>
