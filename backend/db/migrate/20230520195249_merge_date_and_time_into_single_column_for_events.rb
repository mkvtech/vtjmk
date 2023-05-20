class MergeDateAndTimeIntoSingleColumnForEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :datetime, :datetime

    migrate_event_dates

    remove_column :events, :date, :date
    remove_column :events, :time, :time

    rename_column :events, :datetime, :date
  end

  private

  def migrate_event_dates
    Event.all do |event|
      event.update(datetime: merge_date_and_time(event))
    end
  end

  def merge_date_and_time(event)
    d = event.date
    t = event.time

    if t.present?
      DateTime.new(d.year, d.month, d.day, t.hour, t.min, t.sec, t.zone)
    else
      DateTime.new(d.year, d.month, d.day, 0, 0, 0)
    end
  end
end
