class CreateMoney < ActiveRecord::Migration[5.1]
  def change
    create_table :money do |t|
      t.integer :user_money
      t.integer :sale

      t.timestamps
    end
  end
end
