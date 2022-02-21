# frozen_string_literal: true

class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :recoverable, :registerable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :contacts
end
