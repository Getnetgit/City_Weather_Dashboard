var weatherDisplayDiv=document.querySelector(".weatherDisplay");
var searchFormEl=document.querySelector('.searchForm');
var searchButton=document.querySelector('#searchButton');
var searchHistoryDiv=document.querySelector('.search_history');
var today=dayjs();
var stordHistory=JSON.parse(localStorage.getItem('history'));

function renderSearchHistory(histArray) {
  if (stordHistory==null) {
    stordHistory=[];
  }else{
    searchHistoryDiv.innerHTML='';
    for (let i = 0; i < stordHistory.length; i++) {
     
      var historyBtn=document.createElement('button');
      historyBtn.classList.add('btn', 'btn-secondary','historyBtns')
      historyBtn.setAttribute('type', 'button')
      historyBtn.textContent=histArray[i];
      searchHistoryDiv.append(historyBtn);
    }
  }
}

function printWeather(resultObj) {
  // console.log(resultObj);

  // set up `<div>` to hold result content
 weatherDisplayDiv.innerHTML="";

  var firstDayCard = document.createElement('div');
  firstDayCard.classList.add('row','rowCustum');

  var firstDayCardBody = document.createElement('div');
  firstDayCardBody.classList.add('col-11', 'col-sm-11', 'firstDay');
  
  var titleEl1=document.createElement('h2');
  titleEl1.innerHTML=resultObj.dates[0] + '('+ resultObj.cityName +')'+"<img src="+ resultObj.iconlink[0]+ '>'
  //  var history=JSON.parse(localStorage.getItem('history'));
  
  
  if (!stordHistory.includes(resultObj.cityName)) {
     stordHistory.push(resultObj.cityName);
     localStorage.setItem('history', JSON.stringify(stordHistory));
     renderSearchHistory(stordHistory)
  }
 

  var temp1=document.createElement('div');
  temp1.textContent='Temp: '+resultObj.temprature[0]+' F';

  var Wind1=document.createElement('div');
  Wind1.textContent='Wind: '+ resultObj.wind[0]+ ' MPH';

  var humidity1=document.createElement('div');
  humidity1.textContent='Humidity: '+ resultObj.humidity[0]+ ' %';

  var forcastTitle=document.createElement('h2');
  forcastTitle.classList.add('row','rowCustum');
  forcastTitle.textContent='5 day forcast:'

  var forcastContainer=document.createElement('div');
  forcastContainer.classList.add('row','rowCustum', 'grid', 'gap-1')


  weatherDisplayDiv.append(firstDayCard,forcastTitle,forcastContainer);
  firstDayCard.append(firstDayCardBody);
  firstDayCardBody.append(titleEl1, temp1, Wind1, humidity1);
 
  
  for (let i = 1; i < 6; i++) {
    var weatherCard=document.createElement('div');
    weatherCard.classList.add('col-4', 'col-sm-2', 'weather_card');

    
    var weatherCardTitle=document.createElement('h6');
    weatherCardTitle.textContent=resultObj.dates[i];
    
    var weatherIcon=document.createElement('img');
    if (resultObj.iconlink[i].length>1) {
      var index=Math.trunc((resultObj.iconlink[i].length)/2);
      weatherIcon.setAttribute('src',resultObj.iconlink[i][index] )
    } else {
      weatherIcon.setAttribute('src',resultObj.iconlink[i][0]);
    }
    
    var weatherTemp=document.createElement('div');
    weatherTemp.textContent=resultObj.temprature[i].toFixed(2) + ' F';

    var weatherWind=document.createElement('div');
    weatherWind.textContent=resultObj.wind[i].toFixed(2) + ' MPH';

    var weatherHumidity=document.createElement('div');
    weatherHumidity.textContent=resultObj.humidity[i].toFixed(2) + ' %';
    
    forcastContainer.append(weatherCard);
    weatherCard.append(weatherCardTitle,weatherIcon,weatherTemp,weatherWind,weatherHumidity);
  }

}

function displayWeather( lat,lon){
  var apiUrl='https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid=54428a3033ba3a4a495f5ecae31e7843';
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //  console.log(data)
    
        var dateToday=Number(today.format('DD')); //get today's date
        var day2sample=0, temprature2=0, wind2=0, humidity2=0 ,iconLink2=[];
        var day3sample=0, temprature3=0, wind3=0, humidity3=0,iconLink3=[];
        var day4sample=0,temprature4=0, wind4=0, humidity4=0,iconLink4=[];
        var day5sample=0,temprature5=0, wind5=0, humidity5=0,iconLink5=[];
        var day6sample=0,temprature6=0, wind6=0, humidity6=0,iconLink6=[];
      
          for (let i = 0; i < data.list.length; i++) {
            var dateGMTstring=dayjs(data.list[i].dt_txt).format('dddd, D MMM YYYY, HH:ss:ss[ GMT]');
            var sampleTime = new Date(dateGMTstring);
            var sampleTimeLocal=sampleTime.toLocaleString();
            //console.log(data.list[i].dt_txt, 'raw')
            //console.log(dateGMTstring, 'date string')
            //console.log(sampleTimeLocal);
            var date=Number(dayjs(sampleTimeLocal).format('DD'));
            // console.log(date,"date");
            if (dateToday===date){
            
            var date1=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
            var iconLink1='http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon+'@2x.png'
            var temprature1=data.list[0].main.temp;
            var wind1=data.list[0].wind.speed;
            var humidity1=data.list[0].main.humidity;
            
            }else if(dateToday===(date-1)){
            var date2=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
            iconLink2.push('http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png');
            temprature2=(temprature2 + data.list[i].main.temp);
            //console.log(temprature2)
            wind2 =(wind2 + data.list[i].wind.speed);
            humidity2=(humidity2 + data.list[i].main.humidity);
            day2sample++;
            
            }else if(dateToday===(date-2)){
              var date3=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
              iconLink3.push('http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png');
              temprature3=(temprature3 + data.list[i].main.temp);
              //console.log(temprature3)
              wind3 =(wind3 + data.list[i].wind.speed);
              humidity3=(humidity3 + data.list[i].main.humidity);
              day3sample++;
            }else if(dateToday===(date-3)){
              var date4=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
              iconLink4.push('http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png');
              temprature4=(temprature4 + data.list[i].main.temp);
              //console.log(temprature4)
              wind4 =(wind4 + data.list[i].wind.speed);
              humidity4=(humidity4 + data.list[i].main.humidity);
              day4sample++;
            }else if(dateToday===(date-4)){
              var date5=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
              iconLink5.push('http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png');
              temprature5=(temprature5 + data.list[i].main.temp);
              //console.log(temprature5)
              wind5 =(wind5 + data.list[i].wind.speed);
              humidity5=(humidity5 + data.list[i].main.humidity);
              day5sample++;
            }else if(dateToday===(date-5)){
              var date6=dayjs(sampleTimeLocal).format('MM/DD/YYYY');
              iconLink6.push('http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png');
              temprature6=(temprature6 + data.list[i].main.temp);
              //console.log(temprature6)
              wind6 =(wind6 + data.list[i].wind.speed);
              humidity6=(humidity5 + data.list[i].main.humidity);
              day6sample++;
            }
          
          }
            
          
            var result={
              cityName:data.city.name,
              dates:[date1,date2,date3,date4,date5,date6],
              iconlink:[iconLink1,iconLink2,iconLink3,iconLink4,iconLink5,iconLink6],
              temprature:[temprature1,temprature2/day2sample,temprature3/day3sample,temprature4/day4sample,temprature5/day5sample,temprature6/day6sample],
              wind:[wind1,wind2/day2sample,wind3/day3sample,wind4/day4sample,wind5/day5sample,wind6/day6sample],
              humidity:[humidity1,humidity2/day2sample,humidity3/day3sample,humidity4/day4sample,humidity5/day5sample,humidity6/day6sample]
            }
          // console.log(result);
          printWeather(result)
      
        return;
        
      });
    }
  });

}

function getCityWeather(city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&lang=en&limit=6&appid=54428a3033ba3a4a495f5ecae31e7843';
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
         for (let i = 0; i < data.length; i++) {
          
          if (data[i].name.toUpperCase()===city.toUpperCase()) {
            let lat=data[i].lat;
            let lon=data[i].lon;
            displayWeather( lat,lon)
            return;
          }
          
         }
          
          
          if (response.headers.get('Link')) {
           
            // displayWarning(repo);
          }
        });
      }
    });
}

renderSearchHistory(stordHistory);

searchButton.addEventListener('click',(event)=>{
  event.preventDefault();

  var cityName =document.querySelector('#CityInput').value.trim();
  
  if (!cityName) {
    console.error('You need to enter City name!');
    return;
  }
  getCityWeather(cityName);
  
} )

searchHistoryDiv.addEventListener('click',(event)=>{
  var element=event.target;
  var cityHistory=element.textContent;
  console.log(cityHistory);
  getCityWeather(cityHistory);
})
