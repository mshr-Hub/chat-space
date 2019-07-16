$(function() {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img src=${message.image}>` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${content}
                    ${img}
                  </p>
                </div>`
    return html;
  }
  $('#new_message').on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
  })
});
