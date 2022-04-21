 jQuery(document).ready(function($) {
	$('.mail-templates').owlCarousel({
		center: false,
		items: 4,
		loop: true,
		margin: 20,
		dots:false,
		slideSpeed: 1200,
		paginationSpeed: 500,
		responsiveClass:true,
		nav:true,
		navText: ["<img src='assets/images/arrow-left.svg'>","<img src='assets/images/arrow-right.svg'>"],
		responsive: {
			767: {
			items: 2
			},
			768: {
			items: 3
			},
			1200: {
			items: 4
			}
		}
	});
   /*  jQuery("input:radio:checked")div('.send-option-img').addClass("checked"); */	
				/* $('input').click(function(){
				$('.send-option-img').addClass('selected');
				}); */
				
				$(document).on("click", 'input.check', function () {
  if ($(this).is(":checked")) {
    $('.send-option-img').removeClass('checked');
    $('.send-option-img').addClass("checked");
  }
});
				
				
});