class FixStyleStartEnd < ActiveRecord::Migration[4.2]
  def change
    rename_column :selected_texts, :start_end, :end_idx
  end
end
