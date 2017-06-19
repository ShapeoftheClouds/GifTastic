$(document).ready(function() {

 // My array of cartoons
 var myCartoons = ["Teen Titans", "Power Puffs", "Digimon", 
 "Danny Phantom", "Voltron Legendary Defenders", "Avatar the Last Airbender"];
 // An array for added cartoons
 var newCartoonList = [];

// Adds buttons for my cartoon list
function renderCurrentButtons() {
  // Empties the my cartoons div.
  $("#my-cartoons").empty(); 
  for (var j = 0; j < myCartoons.length; j++) {
    var addMyButtons = $("<button>");
    addMyButtons.addClass("cartoon-button"); 
    addMyButtons.attr("data-cartoon", myCartoons[j]);
    addMyButtons.text(myCartoons[j]); 
    $("#my-cartoons").append(addMyButtons);
  }
}
/* Shows myCartoons array as buttons on the loaded page. 
(Calls the renderCurrentButtons function) */
renderCurrentButtons();


// Add new buttons when a user inputs a cartoon name and hits submit
function renderButtons() {
  // Empties the Render Buttons Div.
  $("#renderButtons").empty();

  for (var i = 0; i < newCartoonList.length; i++) {
    // creates a variable for a button
    var addButton = $("<button>");
    // adds a class to the new button
    addButton.addClass("cartoon-button");
    // adds the attribute data cartoon to the new cartoon array.
    addButton.attr("data-cartoon", newCartoonList[i]);
    // adds text to the new cartoon list
    addButton.text(newCartoonList[i]);
    // Appends the new button to the render button div.
    $("#renderButtons").append(addButton);
  }
}


// Adds a button from the user input. 
$(document).on("click", "#add-cartoon", function(event) {
  event.preventDefault();
  // creates a variable that adds the user input to the cartoon input div.
  var cartoonInput = $("#cartoon-input").val().trim();
  // pushs the array newCartoonlist to the cartoonInput div (cartoon-input div)
  newCartoonList.push(cartoonInput);
  // Calls the render button function. 
  renderButtons(newCartoonList, "cartoon-button", "#cartoons");
});

// When Clicking a cartoon name button 
$(document).on("click", ".cartoon-button", function() {

      $("#cartoons").empty();
      $("button").removeClass("active");
      $(this).addClass("active");

      var dataType = $(this).attr("data-cartoon");
      // In this case, the "this" keyword refers to the button that was clicked
      // var cartoon = $(this).attr("data-cartoon");
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dataType + "&api_key=dc6zaTOxFJmzC&limit=12";
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var k = 0; k < results.length; k++) {
            // Only taking action if the photo has an appropriate rating
            if (results[k].rating !== "r") {
              // Creating a div with the class "item"
              var cartoonDiv = $("<div class='item'>");
              // Storing the result item's rating
              var rating = results[k].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              var animatedGiph = results[k].images.fixed_height.url;
              var stilledGiph = results[k].images.fixed_height_still.url;
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              // Creating an image tag
              var cartoonGiph = $("<img>");
              cartoonGiph.attr("src", stilledGiph);
              cartoonGiph.attr("data-still", stilledGiph);
              cartoonGiph.attr("data-animate", animatedGiph);
              cartoonGiph.attr("data-state", "still");
              cartoonGiph.addClass("cartoon-giph");
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              cartoonDiv.append(p);
              cartoonDiv.append(cartoonGiph);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#cartoons").prepend(cartoonDiv);
            }
          }
        });
    });


// When clicking a cartoon giph, pause or play it.
$(document).on("click", ".cartoon-giph", function() {
  var pausePlay = $(this).attr("data-state");

  if (pausePlay === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});


});