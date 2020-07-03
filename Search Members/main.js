
function filterList() {
  var value = $(this).val().toLowerCase();
  $(".Card").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
}


$(document).ready(function(){
  // Clear input when clear button is clicked
  $('#clear').click(function() {
    $("#autocomplete-input").val(() => {
      return "";
    });
    $("input").focus();
  });

  // Filter member list
  $("#autocomplete-input").on("keyup", filterList);
  
});


// function() {
//   // app.hasFocus = false;
  
// }