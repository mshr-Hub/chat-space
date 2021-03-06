$(function() {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img class="message__image" src=${message.image}>` : "";
    var html = `<div class="message" data-id="${message.id}" data-group-id="${message.group_id}">
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

  function scrollBottom() {
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  $(document).on('turbolinks:load', function (e) {
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

    var group_id = $('.message:last').data('group-id');
    if (location.pathname == `/groups/${group_id}/messages`) {
      setInterval(reloadMessages, 5000);
    }
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    var group_id = $('.message:last').data('group-id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML += buildHTML(message);
        var html = insertHTML;
        $('.messages').append(html);
        scrollBottom();
      })
    })
    .fail(function() {
      alert('error');
    })
  };

});
