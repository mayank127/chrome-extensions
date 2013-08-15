//Taking Input
var data = $("#name").asEventStream('keyup')
    .map(function (object) {
    return object.target.value;
}).filter(function (value) {
    return value.length > 2;
});
var distinct = data.throttle(500 /*ms*/ ).skipDuplicates();

//Calling Ajax
var search = distinct.flatMapLatest(function (value) {
    return Bacon.fromPromise(google(value));
}).filter(function (data) {
    return data.responseStatus == 200 && data.responseData.results.length > 0;
}).map(function (data) {
    return data.responseData.results;
});

//Displaying on screen
search.assign(function (data) {
    console.log(data);
    var imageDiv = $("#image");
    imageDiv.empty();
    data.map(function (image) {
        imageDiv.append("<span>" + image.title + "</span><br>");
        imageDiv.append("<img src='" + image.tbUrl + "' alt=" + image.titleNoFormatting + "/><br/>");
    });
});
distinct.assign(function (data) {
    $("#nameText").text("Search Results For: " + data);
});

//Ajax query function
var google = function (query) {
    return $.ajax({
        url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query,
        type: "GET",
        dataType: 'jsonp'
    });
};