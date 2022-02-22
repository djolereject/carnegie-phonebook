# frozen_string_literal: true

module Api
  module V1
    # Controller for RESTfull access to Contact models
    class ContactsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :find_contact, only: %i[show update destroy]

      rescue_from ActionController::ParameterMissing, with: :respond_unprocessable
      rescue_from ActiveRecord::RecordNotFound, with: :respond_not_found

      def index
        contacts = current_api_v1_user.contacts
        render json: contacts
      end

      def show
        render json: @contact
      end

      def create
        contact = current_api_v1_user.contacts.build(contact_params)
        if contact.save
          render json: contact, status: :created
        else
          respond_unprocessable(contact.errors)
        end
      end

      def update
        if @contact.update(contact_params)
          render json: @contact
        else
          respond_unprocessable(@contact.errors)
        end
      end

      def destroy
        @contact.destroy
      end

      private

      def find_contact
        @contact = current_api_v1_user.contacts.find(params[:id])
      end

      def contact_params
        params.require(:contact).permit(:name, :phone)
      end

      def respond_not_found
        render status: :not_found
      end

      def respond_unprocessable(errors = nil)
        render json: errors, status: :unprocessable_entity
      end
    end
  end
end
