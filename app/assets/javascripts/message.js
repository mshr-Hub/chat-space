$(function() {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img class="message__image" src=${message.image}>` : "";
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
                  </p>
                  ${img}
                </div>`
    return html;
  }
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `<div class="message" data-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="${message.image.url}" class="lower-message__image">
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="message" data-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image.url) {
      var html = `<div class="message" data-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img src="${message.image.url}" class="lower-message__image">
                    </div>
                  </div>`
    };
    return html;
  };
  function scrollBottom() {
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
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
      $('#new_message')[0].reset();
      scrollBottom();
    })
    .fail(function(data) {
      alert('メッセージを入力してください。');
    })
    .always(function(data) {
      $('.submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = $('');
      messages.forEach(function(message) {
        insertHTML.append(buildMessageHTML(message));
        var html = insertHTML(message);
        ('.messages').append(html);
      });
      scrollBottom();
    })
    .fail(function() {
      console.log('error');
    })
  };
  setInterval(reloadMessages, 5000);
});
