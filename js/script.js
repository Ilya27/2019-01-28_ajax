'use strict'
$(() => {
    var server = 'https://itunes.apple.com/';
    $('.carousel').carousel({
        interval: 5000,
        pause: 'hover'
    });

    $('#myCarousel').on('slid.bs.carousel', function (event) {
        for (let index = 0; index < $('.carousel-inner').children().length; index++) {
            let video = $('video', this).get(index);
            video.pause();
    }
    })
    let $first_li = $('<li>');
    let $input = $('.my_input');
    let $submit = $('.search');
    $submit.on('submit',function(event){
        $('.carousel-indicators').empty();
        $('.carousel-inner').children().detach();
        $('.list-group-item').detach();
        event.preventDefault();
        console.log($input.val());
        let name = $input.val()
        if(name===''){
            $input.css('border','1px solid red');
        }else{
            $.ajax({
                url: `${server}/search?entity=musicVideo&term=${name}`,
                cache: false,
                success: function (html) {
                    let result = JSON.parse(html);
                    let result_count = result.resultCount;
                    let first_random = Math.round((Math.random() * (result_count)));
                    $('<div>')
                        .addClass('item active')
                        .appendTo('.carousel-inner')
                        .append(`<video src = "${result.results[first_random].previewUrl}" id="${first_random}" controls >`);
                    $first_li
                        .appendTo('.list-group')
                        .addClass("list-group-item")
                        .attr('src', result.results[first_random].previewUrl)
                        .attr('id', first_random);
                    $('<a>').appendTo($first_li).text(result.results[first_random].artistName + ' - ' + result.results[first_random].trackName);
                    for (let i = 0; i < 5; i++) {
                        let number = Math.round((Math.random() * (result_count)));
                        let $li= $('<li>').appendTo('.list-group')
                            .addClass("list-group-item")
                            .attr('src', result.results[number].previewUrl)
                            .attr('id',number);
                        let $songer=$('<a>').appendTo($li).text(result.results[number].artistName + ' - ' + result.results[number].trackName);
                        $songer.on('click',function(event){
                            event.preventDefault();
                            console.log($(this).parent().attr('id'));
                        })
                        $(".carousel").css('display', 'block');
                        $('<div>')
                            .addClass('item')
                            .appendTo('.carousel-inner')
                            .append(`<video src = "${$li.attr('src')}" id="${$li.attr('id')}" controls >`)
                    }
                    for (let i = 0; i < $('.carousel-inner').children().length; i++){
                        $(`<li data-target="#myCarousel" data-slide-to="${i}" id="${i}">`).appendTo('.carousel-indicators');
                    }    
                }
            })



            $first_li.on('click', function (event) {
                console.log($(this).attr('id'));
            })
        }
    });
})