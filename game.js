var playerone = "Red";
var playeronecolor = "rgb(255, 75, 75)";

var playertwo = "Blue";
var playertwocolor = "rgb(28, 96, 165)";

var grey = "rgb(10, 9, 0)";
var game_on = true;
var table = $("table tr");
var tabled = $("table tr td");

function reportWin(rowNum, colNum) {
  //* i am adding +1 to row col to identifty which box win easily in console
  rowNum++;
  colNum++;
  return console.log(
    "You won starting at this row=" + rowNum + "col=" + colNum
  );
}

function ChangeColor(rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

function returnColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function bottomCheck(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport == "rgb(10, 9, 0)") {
      return row;
    }
  }
}

function colorMatch(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== undefined &&
    one !== grey
  );
}

function horizontalWin() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatch(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horizontal");
        reportWin(row, col);

        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWin() {
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 7; col++) {
      if (
        colorMatch(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        reportWin(row, col);
        console.log("vertical win");
        return true;
      } else {
        continue;
      }
    }
  }
}

function dioganalWin() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (
        colorMatch(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diognal");
        return true;
      } else if (
        colorMatch(
          returnColor(row, col),
          returnColor(row + 1, col - 1),
          returnColor(row + 2, col - 2),
          returnColor(row + 3, col - 3)
        )
      ) {
        console.log("diognal 2");
        return true;
      }
    }
  }
}

// todo game start  with player one

var currentplayername = playerone;
var currentplayercolor = playeronecolor;

$(".board button").on("click", function () {
  var colon = $(this)
    .closest("td")
    .index();
  var btmav = bottomCheck(colon);
  ChangeColor(btmav, colon, currentplayercolor);

  // !! below statement is using for testing
  // $(this).css("background-color",playeronecolor)

  if (horizontalWin() || verticalWin() || dioganalWin()) {
    alert(currentplayername + " win the game ");
  }

  switch (currentplayername) {
    case playerone:
      currentplayercolor = playertwocolor;
      currentplayername = playertwo;
      break;
    case playertwo:
      currentplayercolor = playeronecolor;
      currentplayername = playerone;
      break;
  }
});

// !!it will show clicked position
// $("tr button").on("click", function() {
//   var row = $(this)
//     .closest("tr")
//     .index();
//   console.log("row" + row);
// });

// $("td button").on("click", function() {
//   var col = $(this)
//     .closest("td")
//     .index();
//   console.log("col=" + col);
// });