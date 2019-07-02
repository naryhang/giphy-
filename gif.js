//create variable foods array
var foodsArray = ["Burgers", "Sushi", "Tacos", "Fried Chicken", "French Fries", "Ice Cream"];
//DOM
$(document).ready(function() {
    for (var i = 0; i < foodsArray.length; i++) {
//append list of buttons
        $("#food-buttons").append("<button type='button' onclick='searchGif(\"" + foodsArray[i] + "\")' class='btn btn-primary' value=' " + foodsArray[i] + "'> " + foodsArray[i] + " </button>");
    }
});

//function on button click to search for GIF 
function foodButtonClicked() {
    var userInput = $('#food-input').val();
    searchGif(userInput);
}

//function on submit button click
function submitButtonClicked() {
    var userInput = $('#food-input').val();

    if (userInput) {
        $('#food-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    //performing an AJAX request with the queryURL
    $.ajax({
    url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=mAwHZWsImxrhRIH3NBiwe6G4ZJNW0ISC',
    type: 'GET',
    })

    //after data comes back from the request
    .done(function(response) {
    displayGif(response);
    })
}

function displayGif(response) {
    $('#foods').empty();
    //looping through each result item
    for (var i = 0; i < response.data.length; i++) {
        
        //create div for ratings
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
       //set rating for the images
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
        //image's state is still
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
        //image's state is animated
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:220px; height:220px">';

        //using Bootstrap grid for the images
        image = '<div class="col-md-4">' + image + "</div>";

        $('#foods').append(image);
    }

    $('.movImage').on('click', function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr('data-state');
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}
