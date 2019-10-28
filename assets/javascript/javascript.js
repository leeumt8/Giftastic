$(document).ready(function() {
    // initial array
    var players = ["Cristiano Ronaldo", "Sergio Ramos", "Marcelo", "Isco", "Zidane", "Zaha", "Heung Min Son", "Paul Pogba", "Neymar", "Karim Benzema"];

    // function to create buttons
    function createButtons() {
        $("#buttons").empty();

        for (i = 0; i < players.length; i++) {

            var button = $("<button>");

            button.addClass("playerButton");

            button.attr("data-name", players[i]);

            button.text(players[i]);

            $("#buttons").append(button);
        };
    };

    // onclick function
    $("#submitButton").on("click", function(event) {
        event.preventDefault();

        var player = $("#playerSearch").val().trim();

        players.push(player);

        $("#playerSearch").val("");

        createButtons();
    });

    createButtons();

    // function for giphy search
    function giphySearch() {
        var playerName = $(this).attr("data-name");

        var playerURLname = playerName.split(" ").join("+");
        
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + playerURLname + "&api_key=6a7tvhctpWXhv8eG6PsKi3Ljjm4pjyKc&limit=10";

        $.ajax({
            url: giphyURL,
            method: "GET"
        }).done(function(response) {
            results = response.data;

            $("#gifs").empty();

            for (var i = 0; i < results.length; i++) {
                var playerDiv = $("<div>");

                var ratingP = $("<p id='rating'>").text("Rating: " + results[i].rating);

                var playerImage = $("<img>");

                playerImage.addClass("playerImageGifs");

                playerImage.attr("src", results[i].images.fixed_height_still.url);

                playerImage.attr("data-state", "still");

                playerImage.attr("data-position", i);

                playerDiv.append(ratingP);

                playerDiv.append(playerImage);

                playerDiv.addClass("singularGifs");

                $("#gifs").prepend(playerDiv);
            };
        });
    };

    // gif onclick/animation functions
    $(document).on("click", ".playerButton", giphySearch);

    function gifAnimation() {
        var state = $(this).attr("data-state");

        var position = $(this).attr("data-position");

        position = parseInt(position);

        if (state === "still") {
            $(this).attr("src", results[position].images.fixed_height.url);

            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);

            $(this).attr("data-state", "still");
        };
    };

    $(document).on("click", ".playerImageGifs", gifAnimation);
    
});