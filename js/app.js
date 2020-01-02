$("ul").on("click", "li", function(event){
	$(this).toggleClass("completed");

});

//need to work on the priority part
$("ul").on("click", "span", function(event){
	if ($(this).hasClass("priority")) {
		$(this).toggleClass("high-priority");
		if ($(this).hasClass("high-priority")) {
			$(this).parent().prependTo("ul");
		}
		else {
			$(this).parent().appendTo("ul");
		}
		
		event.stopPropagation();
		console.log("high");
	}
	else {
		
		$(this).parent().remove();
		event.stopPropagation();
	}
	
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		if (todoText != "") {
			//create a new li and add to ul
			$("ul").append("<li><span class='priority'><i class='fa fa-exclamation-circle'></i></span><span><i class='fa fa-trash'></i></span> " + todoText + " </li>");
		}
	}
});
