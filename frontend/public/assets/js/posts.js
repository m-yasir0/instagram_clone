$(function(){
  $(document).on('click', '.dropdown-toggle', function(){
    $(this).parent().siblings('.dropdown-menu').toggleClass('show')
  })
})