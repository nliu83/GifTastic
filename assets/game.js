
$(document).ready(function() {

    var animals = ['dogs', 'cats', 'turtles'];


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

    $('.animalButtons').on('click', function(){

        displayGIFs();
    })

    
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

                var animalImage = $('<img>');

                animalImage.attr('src', results[j].images.fixed_height.url);

                gifDiv.append(p);

                gifDiv.append(animalImage);

                $('#animals-view').prepend(gifDiv);

            };
        });
    };

    $(document).on('click', '.animalButtons', alertinput, displayGIFs);
    renderButtons();

});