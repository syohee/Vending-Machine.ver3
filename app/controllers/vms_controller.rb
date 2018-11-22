class VmsController < ApplicationController
  def index
    @total = Money.find(1).user_money
    @sale = Money.find(1).sale
    @drinks = Drink.all
  end

  def insertMoney
    money = Money.find(1)
    money.update_attribute(:user_money, params[:total])
    # @availableDrink = []
    # @drinks.each{|v|
    #   if v.stock > 0 && v.price <= @total
    #      @availableDrink = v.id
    #  end
    #  }
    # redirect_to vms_path
    render json: {drink:Drink.all, money:Money.all}
  end

  def buy
    index = params[:drinkId]
    drink = Drink.find(index)
    drink.update_attribute(:stock, params[:stock])

    money = Money.find(1)
    sale = money.sale + drink.price
    money.update_attribute(:sale, sale)

    total = money.user_money - drink.price
    money.update_attribute(:user_money, total)

    render json: {drink:Drink.all, money:Money.all}
    # redirect_to vms_path
  end
end
