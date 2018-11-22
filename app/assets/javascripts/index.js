$(function(){
  $("[name='inputMoneyButton']").off().click(function(){
    // event.stopPropagation();
    var money = Number($("[name='inputMoney']").val());
    $.moneyCheck(money);
  });
  var total = 0;
  $.moneyCheck = function(money){
    var moneySample = [10,50,100,500,1000];
    if($.inArray(money, moneySample) != -1) {
      total = Number($(".totalMoney").text());
      total += money;
      $(".alertMessage").text("");

      var moneyData = {total:total};
      $.ajax({
        url:"/vms/insertMoney",
        type:"post",
        data:moneyData,
        success: function(result){
          console.log("insertMoney ok");
          $(".totalMoney").text(total);
          $.availableDrink(total);
        },
        error: function(){
          console.log("no");
        }
      })
    }else {
      $(".alertMessage").text("money error - repay");
    }
  };

  $.availableDrink = function(total){
    drinkStock = [];
    drinkPrice = [];
    $(".price").each(function(index){
      drinkPrice[index] = $(this).text();
    })
    $(".stock").each(function(index){
      drinkStock[index] = $(this).text();
    })
    for(i = 0; i < drinkStock.length; i++){
      if(drinkStock[i] > 0 && drinkPrice[i] <= total){
        console.log("availableDrink ok");
        $(".price").eq(i).siblings(".buyButton").html('<button type="button">buy</button>').css('background-color', 'blue')
      }
    }
  };

  $(document).off("click").on("click", ".buyButton", function(){
  // $(".buyButton").off().click(function(){
    // $('.buyButton').index(this)
    console.log($(this).attr("name"));
    stock = Number($(this).siblings(".stock").text())
    console.log("stock1 : " + stock);
    stock = Number($(this).siblings(".stock").text()) - 1;
    console.log("stock2 : " + stock);
    $.ajax({
      url:"/vms/buy",
      type:"post",
      data:{
        drinkId : $(this).attr("name"),
        stock : stock
      },
      success: function(result){
        // console.log(result.drink);

        money = result.money[0];
        $(".totalMoney").text(money.user_money);
        $(".sale").text(money.sale);

        html = "";
        $.each(result.drink, function(index, value){
          // console.log(value.id);
          html += "<div class='drinkList'> name : " + value.name +
                  ", stock : <span class='stock' name='stock'>" + value.stock +
                  "</span>, price : <span class='price' name='price'>" + value.price +
                  "</span>, maker : " + value.maker +
                  ", date : " + value.date +
                  ", kind : " + value.kind ;

          if(value.stock > 0 && value.price <= money.user_money){
              html += '<span class="buyButton" name="' + value.id + '"><button type="button" style="background:blue; color:white">buy</button></span>'
          }else{
            html += '<span class="buyButton" name="' + value.id + '"><button type="button" disabled>buy</button></span>'
          }
          html += "</div>";
        });
        $(".drink").html(html);
        // console.log(result.money[0].user_money);
        // console.log(result.money[0].sale);

        // $.availableDrink();
      },
      error: function(){
        console.log("no");
      }
    });
  });
});
