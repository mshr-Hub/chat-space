class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :gruop_users
  validates :name, presence: true, uniqueness: true
end
