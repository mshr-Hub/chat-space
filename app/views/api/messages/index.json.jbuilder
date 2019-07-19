json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.date message.created_at
  json.user_name message.user.name
  json.id message.id
end