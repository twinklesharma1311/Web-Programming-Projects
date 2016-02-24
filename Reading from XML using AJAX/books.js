$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "books.xml",
		dataType: "xml",
		success: function(data) {
			var i = 1;
			$(data).find('book').each(function() {
				var title = $(this).find('title').text();
				var author = "";
				var size = $(this).find('author').size();
				$(this).find('author').each(function() {
					author += $(this).text();
					if (size-- != 1)
						author += ", ";
				});
				var year = $(this).find('year').text();
				var price = $(this).find('price').text();
				var category = $(this).attr('category');
				var row = "<tr><td id='title'>" + i+++". " + title + "</td><td id='author'>" + author + "</td><td>" + year + "</td><td>$ " + price + "</td><td>" + category + "</td></tr>";
				$("#MyTable").append(row);
			});
		},
		error: function() {
			alert("Error occured: Please start this HTML from server");
		}
	});
});
