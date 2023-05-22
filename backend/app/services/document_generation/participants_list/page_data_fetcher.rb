module DocumentGeneration
  module ParticipantsList
    # Fetches for participants list placehoders
    class PageDataFetcher
      PLACEHOLDERS = %w[
        EVENT_TITLE EVENT_DATE EVENT_START_TIME EVENT_END_TIME DATE DATETIME
      ].freeze

      rattr_initialize %i[event! participations_with_times!]

      def placeholders = PLACEHOLDERS

      def fetch_placeholder_value(placeholder)
        raise "Unknown placeholder: #{placeholder}" unless PLACEHOLDERS.include?(placeholder)

        public_send(placeholder.downcase)
      end

      # Placeholders

      def event_title = event.title
      def event_date = format_date(event.date)
      def event_start_time = format_time(event.date)

      def event_end_time
        return event_start_time if participations_with_times.empty?

        format_time(participations_with_times.last[:end_time])
      end

      def date = format_date(Time.zone.today)
      def datetime = format_datetime(Time.zone.now)

      private

      def format_date(date)
        I18n.l(Date.parse(date.to_s), format: :long)
      end

      def format_time(time)
        I18n.l(time, format: :only_time)
      end

      def format_datetime(datetime)
        I18n.l(datetime, format: :long)
      end
    end
  end
end
