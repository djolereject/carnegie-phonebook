# frozen_string_literal: true

module AuthHelpers
  # Helper for login user in contexts where it's wanted
  module Extensions
    def sign_in(user)
      let(:auth_helpers_auth_token) { public_send(user).create_new_auth_token }
    end
  end

  # To be included in request specs for setting headers when user is logged in
  module Includables
    HTTP_HELPERS_TO_OVERRIDE = %i[get post patch put delete].freeze
    HTTP_HELPERS_TO_OVERRIDE.each do |helper|
      define_method(helper) do |path, **args|
        add_auth_headers(args)
        args == {} ? super(path) : super(path, **args)
      end
    end

    private

    def add_auth_headers(args)
      return unless defined? auth_helpers_auth_token

      args[:headers] ||= {}
      args[:headers].merge!(auth_helpers_auth_token)
    end
  end
end
