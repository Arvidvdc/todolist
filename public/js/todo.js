$(".fa-plus-circle").click(function() {
    window.location.href = "/new";
});

$(".fa-undo").click(function() {
    window.location.href = "/";
});

$("ul").on("click", "span", function(){
    let url = "/" + $(this).next().attr("id") +"/edit";
    console.log(url);
    window.location.href = url;
});

$(".fa-trash-alt").click(function() {
    let url = "/delete/" + $(this).attr("id");
    window.location.href = url;
});

$("#login").click(function() {
    window.location.href = "/login";
});

$("#logout").click(function() {
    window.location.href = "/logout";
});