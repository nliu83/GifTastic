
$(document).ready(function() {

    var animals = ['mouse', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'sheep', 'monkey', 'rooster', 'dog', 'pig' ];


    function alertinput() {
        var animalType = $(this).attr('animal-type');
        console.log(animalType);
    };

    function renderButtons() {

        $('#animal-buttons').empty();

        for (var i = 0; i < animals.length; i++) {

            var newBtn = $('<button>');

            newBtn.addClass('animalButtons');

            newBtn.attr('animal-type', animals[i]);

            newBtn.text(animals[i]);

            $('#animal-buttons').append(newBtn);

            
        };

    };

    $('#add-animal').on('click', function(event){
        
        event.preventDefault();

        var animal = $('#animals-input').val().trim();

        animals.push(animal);

        renderButtons();

        //displayGIFs();
        
    });

    
    function displayGIFs() {

        $('#animals-view').empty();

        var animalType = $(this).attr('animal-type');

        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animalType + '&api_key=dc6zaTOxFJmzC&limit=10';

        $.ajax ({
            url: queryURL, 
            method: 'GET'
        }).then(function(response){
            var results = response.data;

            for (var j = 0; j < results.length; j++) {
                var gifDiv = $('<div class="item">');

                var rating = results[j].rating;

                var p = $('<p>').text('Rating: ' + rating);

                var gifAnimated = results[j].images.fixed_height.url;

                var gifStill = results[j].images.fixed_height_still.url;

                var animalImage = $('<img>');

                animalImage.attr('src', gifStill);

                animalImage.attr('img-still', gifStill);

                animalImage.attr('img-animated', gifAnimated);

                animalImage.attr('data-state', 'still');

                animalImage.addClass('Gifs');

                gifDiv.append(p);

                gifDiv.append(animalImage);

                $('#animals-view').append(gifDiv);

                $('#animals-input').empty();

            };
        });
    };

    $(document).on('click', '.animalButtons', alertinput, displayGIFs);
    renderButtons();


    $(document).on('click', '.Gifs', function(){

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("img-animated"));
            $(this).attr("data-state", "gifAnimated");
          } else {
            $(this).attr("src", $(this).attr('img-still'));
            $(this).attr("data-state", "gifStill");
          };

        
    });
});