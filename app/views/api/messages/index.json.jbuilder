json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name message.user.name
  json.id message.id
  json.group_id message.group_id
end