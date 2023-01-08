let ctx, thisImage, thisColor;

$(function () {
  $("[type='color']").on("change", showColor);
});

function showColor() {
  var thisColor = this.value;
  // document.getElementById("myCanvas2").style.background = thisColor;
  $("#myCanvas2").css("background", this.value);
}

//initial
$(function () {
  $("[type='date']").on("change", showDate);
  ctx = $("#myCanvas")[0].getContext("2d");
});

function showDate() {
  console.log(this.value);
  var thisDate = this.value;
  thisDate = thisDate.replace(/-/g, "");

  thisImage = new Image();
  thisImage.src = "flipClockNumbers.png";
  thisImage.onload = function () {
    for (var x = 0; x < thisDate.length; x++) {
      ctx.drawImage(
        thisImage,
        thisDate[x] * 80,
        0,
        90,
        130,

        // 對應Canvas 框框的位置
        60 * x,
        0,
        60,
        100
      );
    }
  };
}
