$(".fa-plus-circle").click(function() {
    window.location.href = "/new";
});

$(".fa-undo").click(function() {
    window.location.href = "/";
});

$("ul").on("click", "span", function(){
    $(this).toggleClass("completed");
});

$(".fa-trash-alt").click(function() {
    let url = "/delete/" + $(this).parent().attr("id");
    window.location.href = url;
});




// $("ul").on("dclick", "span", function(){
//      $.ajax({
//         url:    "/",
//         method: "DELETE"
//     }).done(()=>{
//         console.log("Deleted");
//     });
//     // $(this).parent().fadeOut(500,function() {
//         $(this).parent().remove();
//     // });
    
//     let id = $(this).attr("id");
//     // window.location.href = "/" +id +"?_method='DELETE'";

//     event.stopPropagation();
// });