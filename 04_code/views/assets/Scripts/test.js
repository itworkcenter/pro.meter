// :start send message
function send(msg){
    var msgr=msg;
    if(typeof msg == "object"){
        msgr = msg.success||msg.error||"Complete.";
    }

    var $msg = $("<div class='send-message' style='position: fixed; top: 0; left: 0; display: none;'></div>"),
      $msgInfo =$("<div class='message-info' style='padding: 5px; margin: 2px; font-size: 14px; color: #06f; background-color: white; border: 1px solid #eee;'>"+msgr+"</div>");

      if(!$(".send-message").size()){
        $msg.appendTo("body");
      }

    $(".send-message").append($msgInfo).show();

    setTimeout(function(){
        $msgInfo.remove();
    },2000);
}
