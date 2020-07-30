const app = new Vue({
  el: "#appCapsule",
  data: {
    event: null,
    attendanceMarked: null,
    attendanceMsg: ""
  },
  methods: {
    markAttendance() {
      // const data = { 
      //   memberId: 158,
      //   currentLatitude: 19.217151,
      //   currentLongitude: 72.8518034 ,
      // };
      // console.log(data);

      let queryParams = `?currentLatitude=19.217151&currentLongitude=72.8518034&memberId=150008`
      const options = {
        method: "POST",
      }
      let queryURL = "http://164.52.195.248:8062/attendance/member" + queryParams;

      // Mark the attendance for this member
      fetch(queryURL, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if(data.status == "200") {
          this.attendanceMarked = true;
          this.attendanceMsg = data.message;
          alert(data.message);
        }
        console.log(data);
      })
      .catch(err => console.log('error: ', err))
    }
  },
  created() {
    this.event = JSON.parse(localStorage.eventDetails);
  }
})