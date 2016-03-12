
function getData(){
    var year = document.getElementById("year");
    var value = year.options[year.selectedIndex].value;
  $.ajax({
        url : 'babynames.php',
        data : { year : value, gender : 'male' },
        type: 'GET',

        success: function(data){
            $('#maleDiv').html(data);
            getFemaleData();
        }
    });
}

function getFemaleData(){
    var year = document.getElementById("year");
      var value = year.options[year.selectedIndex].value;
  $.ajax({
        url : 'babynames.php',
        data : { year : value, gender : 'female' },
        type: 'GET',

        success: function(data){
            $('#femaleDiv').html(data);
        }
    });
}
