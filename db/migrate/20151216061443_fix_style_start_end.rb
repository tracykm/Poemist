class FixStyleStartEnd < ActiveRecord::Migration
  def change
    rename_column :selected_texts, :start_end, :end_idx
  end
end
