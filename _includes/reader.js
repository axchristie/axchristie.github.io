    var main = function(){
        
            $('h3').each(function(){
                         $(this).nextUntil('h3').andSelf().wrapAll('<div class="test"/>');
                         });
            
            $('h3').addClass('reader_title');
            $('#reader p').addClass('reader_description');
            $('.reader_description').hide();
            
            $('h3').click(function(){
                          $(this).toggleClass('selected');
                          });
            
            $('.test').click(function(){
                             $(this).children('p').toggle();
                             });
}

$(document).ready(main);