# frozen_string_literal: true

class Contact < ApplicationRecord
  belongs_to :user

  validates :name, :phone, presence: true
end
