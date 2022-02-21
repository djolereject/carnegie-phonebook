# frozen_string_literal: true

class User < ApplicationRecord
  has_many :contacts

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates_uniqueness_of :email, case_sensitive: false
end
