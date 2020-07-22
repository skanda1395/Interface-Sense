const app = new Vue({
  el: "#app",
  data: {
      memberData: null,
      fullName: "...",
      firmName: "...",
      points: "...",
      business: "...",
      references: "...",
      sortedData: [],
      noPoints: 0,
      noData: "NA"
  },
  methods: {
    sortData(member) {
      let arr = this.sortedData;
      this.fullName = `${member?.firstName} ${member?.lastName}` || this.noData;
      this.firmName = member?.firmName || this.noData;
      this.points = member?.membershipType?.totalPoints || this.noPoints;
      this.business = member?.chapter?.totalPoints || this.noPoints;
      this.references = member?.salutation?.totalPoints || this.noPoints;
      arr.push([
        "Membership Type",
        member?.membershipType?.value || this.noData
      ]);
      arr.push(["Chapter", member?.chapter?.value || this.noData]);
      arr.push(["Gender", member?.gender || this.noData]);
      arr.push(["Salutation", member?.salutation?.value || this.noData]);
      arr.push(["Designation", member?.designation?.value || this.noData]);
      arr.push(["Mobile", member?.mobileNo || this.noData]);
      arr.push(["Secondary Mobile no", member?.phoneNo || this.noData]);
      arr.push(["E-mail", member?.emailId || this.noData]);
      arr.push([
        "Primary Address",
        member?.businessAddressLine1 || this.noData
      ]);
      arr.push(["Country", member?.country?.value || this.noData]);
      arr.push(["State", member?.state?.value || this.noData]);
      arr.push(["City", member?.city || this.noData]);
      arr.push(["Pincode", member?.zipCode || this.noData]);
      arr.push([
        "Secondary Address",
        member?.businessAddressLine2 || this.noData
      ]);
      arr.push([
        "Primary Business",
        member?.businessCategory?.value || this.noData
      ]);
      arr.push([
        "Secondary Business",
        member?.secondaryBusiness || this.noData
      ]);
      arr.push(["About the business", member?.aboutTheBusiness || this.noData]);
    }
  },
  created() {
    fetch("http://164.52.195.248:8062/members/" + sessionStorage.id)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.memberData = data;
        this.sortData(this.memberData);
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
})