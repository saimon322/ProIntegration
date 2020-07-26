$(document).ready(function () {

  // Contacts form
  $(".contacts-form").submit(function(e){
    e.preventDefault();
    let form = $(this);
    let validation = true;

    form.find("input").each(function(){
      if ($(this).hasClass("error")) {
        validation = false;
      }
      else if (!$(this).val().length) {
        $(this).addClass("error");
        validation = false;
      } 
      else if ($(this).attr("type") == "checkbox" && ! $(this).is(":checked")) {
        $(this).addClass("error");
        validation = false;
      }
      else if (!contactsValidate($(this))) {
        $(this).addClass("error");
        validation = false;
      }
    });

    if (validation) {
      form.find(".btn").addClass("sending disable");
      setTimeout(function(){
        form.find(".btn").text("Отправлено!").removeClass("sending");
      }, 300)
      form.find("input").each(function() {
        $(this).val("");
      });
    }
  });

  $(".contacts-form input").keyup(function() {
    $(this).removeClass('error');
  });
  $(".acceptance").click(function() {
    $(this).children("input").removeClass('error');
  });

});

function contactsValidate(input) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let phoneformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (input.is(".contacts-phone")) {
    return (input.val().match(phoneformat));
  } else if (input.is(".contacts-email")) {
    return (input.val().match(mailformat));
  } else if (input.is(".contacts-email-phone")) {
    return (input.val().match(mailformat) || input.val().match(phoneformat));
  } else {
    return true;
  }
}