class CreateDrinks < ActiveRecord::Migration[5.1]
  def change
    create_table :drinks do |t|
      t.string :name
      t.integer :price
      t.integer :stock
      t.string :maker
      t.date :date
      t.string :kind
    end
  end
end
