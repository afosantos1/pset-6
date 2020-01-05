let array = [];
$("ul").on("click", "li", function(event){
	$(this).toggleClass("completed");
});
$("ul").on("click", "span", function(event){
	if ($(this).hasClass("priority")) {
		$(this).toggleClass("high-priority");
		if ($(this).hasClass("high-priority")) {
			$(this).parent().prependTo("ul");
			console.log(array);
		}
		else {
			$(this).parent().appendTo("ul");
		}
		event.stopPropagation();
	}
	else if ($(this).hasClass("trash")) {
		const id = $(this)[0].id.substring(7);
		array.splice(id, 1);
		$(this).parent().remove();
		event.stopPropagation();
	}
});
$("span").click(function(event){
	console.log("clicked button");
	input = $("input");
	inputValue = input.val();
	if(event.target.id === "button") {
		if (inputValue === null || inputValue === "") {
			return;
		}
		array.push({
			id: array.length,
			content: inputValue,
		});
		const item = array[array.length - 1];
		$(input).val("");
		$("ul").append("<li><span class='priority'><i class='fa fa-exclamation-circle'></i></span><span id=delete-" + item.id + " class='trash'><i class='fa fa-trash'></i></span> " + item.content + " </li>");
	}
});
