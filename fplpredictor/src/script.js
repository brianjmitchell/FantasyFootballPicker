// Replace ./data.json with your JSON feed
fetch('./data.json').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here

  var playerData = data.elements;

  var teamprice = 1000;
  var goalkeeper = 0;
  var forwards = 0;
  var midfielders = 0;
  var forwards = 0;

  // console.log("GOALKEEPERS")
  // pickplayer(data.elements, 1);
  // console.log(" ")
  //
  // console.log("DEFENDERS")
  // pickplayer(data.elements, 2);
  // console.log(" ")
  //
  // console.log("MIDFIELDERS")
  // pickplayer(data.elements, 3);
  // console.log(" ")
  //
  // console.log("FORWARDS")
  // pickplayer(data.elements, 4);
  // console.log(" ")

  console.log("BEST 442")
  fourfourtwo(4, 4, 2, 'team');
  console.log(" ")

  // console.log("BEST 352")
  // bestfourfourtwo(data.elements, 3, 5, 2);
  // console.log(" ")
  //
  // console.log("BEST 343")
  // bestfourfourtwo(data.elements, 3, 4, 3);
  // console.log(" ")
  //
  // console.log("BEST 532")
  // bestfourfourtwo(data.elements, 5, 3, 2);
  // console.log(" ")
  //
  // console.log("BEST 523")
  // bestfourfourtwo(data.elements, 5, 2, 3);
  // console.log(" ")
  function fourfourtwo(def, mid, forw, tableid){

    var position = 0;
    var team_value = 1000;
    var goalkeeper = 0;
    var defenders = 0;
    var midfielders = 0;
    var forwards = 0;
    var bestteam = [];

    playerData.sort(function (value1, value2){
       if (value1.total_points > value2.total_points) return -1;
       if (value1.total_points < value2.total_points) return 1;
     })

    for (i in playerData){
      if (playerData[i].now_cost < team_value){
        switch (playerData[i].element_type){
          case 1:
            if (goalkeeper < 1){
              bestteam.push(playerData[i])
              goalkeeper++
              team_value = team_value - playerData[i].now_cost
            }
          break;
          case 2:
          if (defenders < def){
            bestteam.push(playerData[i])
            defenders++
            team_value = team_value - playerData[i].now_cost
          }
          break;
          case 3:
          if (midfielders < mid){
            bestteam.push(playerData[i])
            midfielders++
            team_value = team_value - playerData[i].now_cost
          }
          break;
          case 4:
          if (forwards < forw){
            bestteam.push(playerData[i])
            forwards++
            team_value = team_value - playerData[i].now_cost
          }
          break;
        }
      }
    }

    bestteam.sort(function(value1, value2){
      if (value1.element_type < value2.element_type) return 1;
      if (value1.element_type > value2.element_type) return -1;
    })

    for (i in bestteam){
      console.log(bestteam[i].first_name + " " + bestteam[i].second_name + " : " + bestteam[i].total_points);
    }

    for (i in bestteam){
      var table = document.getElementById(tableid);
      var row = table.insertRow(1)
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = bestteam[i].first_name + " " + bestteam[i].second_name;

        switch (bestteam[i].element_type){
          case 1:
            cell2.innerHTML = "GK";
          break;
          case 2:
            cell2.innerHTML = "DEF";
          break;
          case 3:
            cell2.innerHTML = "MID";
          break;
          case 4:
            cell2.innerHTML = "FOR";
          break;
        }
      cell3.innerHTML = bestteam[i].total_points;
    }

    console.log("LEFT IN BUDGET: " + team_value)
  }
}).catch(err => {
  // Do something for an error here
});

function pickplayer(position){
  playerData.sort(function (value1, value2){
     if (value1.total_points > value2.total_points) return -1;
     if (value1.total_points < value2.total_points) return 1;
  })

  var count = 0;

  for (i in playerData){
    if (playerData[i].element_type == position && count < 10){
        console.log(playerData[i].first_name + " " + playerData[i].second_name + " : " + playerData[i].total_points);
        count++;
    }
  }
}
