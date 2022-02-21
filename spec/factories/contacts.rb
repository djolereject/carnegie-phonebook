# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    user
    name { Faker::Name.name }
    phone { Faker::PhoneNumber.phone_number }
  end
end
