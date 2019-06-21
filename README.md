# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|index: ture, null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


##groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|index: true, null: false|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user