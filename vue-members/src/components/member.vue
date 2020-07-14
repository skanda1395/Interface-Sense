<template>
  <div class="d-flex border-bottom py-2 align-items-center member">
    <div class=" d-flex align-items-center img-container">
      <img :src="profile_pic" alt="profile_pic">
    </div>
    <div class="d-flex flex-column py-2 ml-3" id="name_org_container">
      <span class="name">{{ fullName }}</span>
      <span class="firmName text-muted offsetY">{{ member.firmName }}</span>
    </div>
    <i class="material-icons text-muted" id="forward-icon" @click="showDetails">arrow_forward_ios</i>
  </div>
</template>

<script>
export default {
  props: ['member'],
  data() {
    return {
      ID: this.member.memberId,
    }
  },
  methods: {
    showDetails() {
      this.$router.push({ name: 'memberView', params: { member: this.member }});
    }
  },
  computed: {
    fullName() {
      return this.member.firstName + ' ' + this.member.lastName;
    },
    profile_pic() {
      // let i = Math.floor(Math.random() * 2);
      if (this.member.gender == "Female") {
        return require('@/assets/woman_1.png');
      } 
      else {
        return require('@/assets/man_1.png');
      }
    }
  }
}
</script>

<style>

</style>