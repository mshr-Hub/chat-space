$(function() {

  var user_search_result = $('#user-search-result');
  var chat_group_users = $('#chat-group-users');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_search_result.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    user_search_result.append(html);
  }
  function appendChatUser(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                  <p class='chat-group-user__name'>${user.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
  chat_group_users.append(html);
  }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();
    var lastInput = '';
    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      user_search_result.empty();
      if (lastInput !== input && users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else if (lastInput == input) {
        user_search_result.empty();
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
      lastInput == input;
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  user_search_result.on('click', '.user-search-add', function(e) {
    var user = $(e.currentTarget).data();
    user_search_result.empty();
    appendChatUser(user);
  });
});
