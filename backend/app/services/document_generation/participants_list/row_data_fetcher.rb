module DocumentGeneration
  module ParticipantsList
    # Decorates Participation, adds extra data
    class RowDataFetcher
      PLACEHOLDERS = %w[
        ROW_INDEX ROW_USER_FULLNAME ROW_PRESENTATION_TITLE ROW_PRESENTATION_TIME ROW_PRESENTATION_START_TIME
        ROW_PRESENTATION_END_TIME
      ].to_set.freeze

      rattr_initialize %i[index participation start_time end_time]

      def placeholders = PLACEHOLDERS

      def fetch_placeholder_value(placeholder)
        raise "Unknown placeholder: #{placeholder}" unless PLACEHOLDERS.include?(placeholder)

        public_send(placeholder.downcase)
      end

      # Placeholders

      def row_index = (index + 1).to_s
      def row_user_fullname = participation.user.full_name
      def row_presentation_title = participation.submission_title.to_s
      def row_presentation_time = participation.time.to_s
      def row_presentation_start_time = format_time(start_time)
      def row_presentation_end_time = format_time(end_time)

      private

      def format_time(time)
        I18n.l(time, format: :only_time)
      end
    end
  end
end
