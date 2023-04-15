# Given a document_template, fills it with data related to participation
class GenerateParticipationCertificate
  RAW_PLACEHOLDERS = %i[
    CONFERENCE_TITLE
    DATE
    EVENT_DATE
    EVENT_TITLE
    USER_FULLNAME
  ].freeze
  method_object %i[document_template participation]

  def call
    docx = Docx::Document.open(document_template.docx.download)

    docx.paragraphs.each do |paragraph|
      paragraph.each_text_run do |text_run|
        compiled_placeholders.each { text_run.substitute(_1[:text_to_replace], _1[:data]) }
      end
    end

    docx
  end

  def compiled_placeholders
    @compiled_placeholders ||=
      RAW_PLACEHOLDERS.map do |placeholder|
        {
          text_to_replace:
            "#{document_template.placeholder_prefix}#{placeholder.upcase}#{document_template.placeholder_postfix}",
          data: public_send(placeholder.downcase)
        }
      end
  end

  # Placeholders data

  def user_fullname
    participation.user.full_name
  end

  def conference_title
    participation.event.conference.title
  end

  def event_title
    participation.event.title
  end

  def event_date
    I18n.l(participation.event.date, format: :long)
  end

  def date
    I18n.l(Time.zone.today, format: :long)
  end
end
