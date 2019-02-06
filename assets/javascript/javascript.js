$(document).ready(function() {
   
    var topics = ["Tiger Woods", "Phil Mickelson", "Sergio Garcia", "Happy Gilmore", "Rory Mcilroy", "Jordan Spieth", "Rickie Fowler", "John Daly","Bubba Watson"];

    function createButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("search");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
   
    function addNewButton(){
        $("#addGif").on("click", function(){
        var search = $("#search-input").val().trim();
        for (i=0; i < topics.length; i++) {
            if (search.toUpperCase() === topics[i].toUpperCase())
            return false;
        }
        if (search == ""){
          return false;
        }
        if (topics.includes(search)) {
            return false;
        }
        topics.push(search);
        createButtons();
        return false;
        });
    }

    function clearSearches(){
        $("clearGifs").on("click", function(){
        topics.pop(search);
        createButtons();
        return false;
        });
    }

    function displayGifs(){
        var search = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=6MYv8pAjcgKOLj1129G0wkvv4EA5rLDY&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            $("#gifsView").empty();
            var results = response.data; 
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url); 
                gifImage.attr("data-still", results[i].images.fixed_height_still.url); 
                gifImage.attr("data-animate", results[i].images.fixed_height.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                gifDiv.append(gifRating);
                $("#gifsView").prepend(gifDiv);
            } 
        }); 
    }

    createButtons(); 
    addNewButton();
    clearSearches();
    $(document).on("click", ".search", displayGifs);
    $(document).on("click", ".image", function(event) {
        console.log(event);
        event.preventDefault();
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
  
    