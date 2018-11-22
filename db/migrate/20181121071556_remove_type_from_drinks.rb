class RemoveTypeFromDrinks < ActiveRecord::Migration[5.1]
  def change
    remove_column :drinks, :type, :string
  end
end
