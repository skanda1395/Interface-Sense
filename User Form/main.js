new Vue({
  el: "#app",
  data: {
    fullName: "...",
    number: "...",
    email: "...",
    address: "...",
    firmName: "...",
    firmAddress: "...",
    users: [],
    i: 0  
  },
  methods: {
    getData() {
      fetch("http://164.52.195.248:8062/members")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.users = data;
          this.anotherUser(this.i);
        })
        .catch(error => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    },
    anotherUser() {
      let user = this.users[this.i];
      this.fullName = `${user.firstName} ${user.lastName}`;
      this.email= user.emailId;
      this.number = user.mobileNo;
      this.firmName = user.firmName;
      this.firmAddress = user.businessAddressLine1;
      this.i++;
    },
    updateUser() {
      const userData = this.users[this.i - 1];
      let userNameArr = this.fullName.split(' ');

      userData.firstName = userNameArr[0];
      userData.lastName = userNameArr[1];
      userData.emailId = this.email;
      userData.mobileNo = this.number;
      userData.firmName = this.firmName;
      userData.businessAddressLine1 = this.firmAddress;

      fetch('http://164.52.195.248:8062/members', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  },
  computed: {
    formChecker() {
      if (this.fullName && this.number && this.email) 
        return false;
      else
        return true;
    }
  },
  mounted: function() {
    this.getData();
  }
});