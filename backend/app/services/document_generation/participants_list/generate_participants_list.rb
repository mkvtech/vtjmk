module DocumentGeneration
  module ParticipantsList
    # Given a conference event, generates participants list for it
    class GenerateParticipantsList
      DEFAULT_PRESENTATION_TIME_MINUTES_IF_NOT_SPECIFIED = 10

      method_object %i[document_template event]

      def call
        fill_participants_table
        fill_placeholders

        docx
      end

      private

      def docx
        @docx ||= Docx::Document.open(document_template.docx.download)
      end

      def fill_participants_table
        return if no_participations?

        DocumentGeneration::Share.fill_table(
          table: docx.tables.first, data_array: participations_with_times
        ) do |partial_calculated_data, row|
          DocumentGeneration::Share.replace_placeholders_in_row(
            row:,
            data_fetcher: RowDataFetcher.new(**partial_calculated_data),
            placeholder_wrapper:
          )
        end
      end

      def fill_placeholders
        DocumentGeneration::Share.replace_placeholders_in_document(
          document: docx,
          data_fetcher: PageDataFetcher.new(event:, participations_with_times:),
          placeholder_wrapper:
        )
      end

      def placeholder_wrapper
        @placeholder_wrapper ||= PlaceholderWrapper.new(document_template:)
      end

      def participations_with_times
        @participations_with_times ||= calculate_participations_with_times
      end

      def calculate_participations_with_times
        return [] if no_participations?

        times = [first_participation_with_times_item]

        ordered_participations.each_with_index.drop(1).each do |participation, index|
          start_time = times[index - 1][:end_time]
          end_time = advance_by_participation_time(start_time, participation)

          times.push({ index:, participation:, start_time:, end_time: })
        end

        times
      end

      def first_participation_with_times_item
        first_participation = ordered_participations.first

        {
          index: 0,
          participation: first_participation,
          start_time: event.date,
          end_time: advance_by_participation_time(event.date, first_participation)
        }
      end

      def ordered_participations
        @ordered_participations ||=
          event
          .participations
          .filter { _1.order.present? }
          .sort { |a, b| a.order - b.order }
      end

      def no_participations?
        event.participations.count.zero?
      end

      def advance_by_participation_time(time, participation)
        time.advance(minutes: participation.time || DEFAULT_PRESENTATION_TIME_MINUTES_IF_NOT_SPECIFIED)
      end
    end
  end
end
