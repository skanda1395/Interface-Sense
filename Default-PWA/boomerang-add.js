fetch("http://164.52.195.248:8062/event")
.then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
})
.then(data => {
  this.all = data;
  for (let event of this.all) {
    if(event.eventStatus == "Upcoming") {
      this.upcoming.push(event);
    }
    else if(event.eventStatus == "Concluded"){
      this.concluded.push(event);
    }
    else {
      this.cancelled.push(event);
    }
  }
})
.catch(error => {
  console.error(
    "There has been a problem with your fetch operation:",
    error
  );
});