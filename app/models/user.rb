# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates_uniqueness_of :email, case_sensitive: false
end
