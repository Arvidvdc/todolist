$(".fa-plus-circle").click(function() {
    window.location.href = "/new";
});

$(".fa-undo").click(function() {
    window.location.href = "/";
});

$("ul").on("click", "span", function(){
    $(this).toggleClass("completed");
});

$("ul").on("dblclick", "span", function(){
    let url = "/" + $(this).attr("id") +"/edit";
    window.location.href = url;
});

$(".fa-trash-alt").click(function() {
    let url = "/delete/" + $(this).parent().attr("id");
    window.location.href = url;
});

$("#logout").click(function() {
    window.location.href = "/logout";
});