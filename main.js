(() => {
    'use strict';

    // On Load Get Cincinnati
    getData();

    // On form submit
    $('form').on("submit",handleSubmit)

    // Function that gets our citys data
    function getData(city = "cincinnati")
    {
    	$.ajax({
    		url: `//api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=8&units=imperial&APPID=d0458c4189cf033bf80c84d7a0d38ab0`, 
    		success:(result)=>{
        	writeToHTML(result.list);
    	}});
    }

    // Handle the submit
    function handleSubmit(e){
        e.preventDefault();
        let input = $('input').val();
        getData(input);
        $('input').val("");
    }

    // One function that handles writing
    function writeToHTML(weatherData){
    	$("#putDataInHere").html("");
    	weatherData.forEach((day) => {
    		let theDay = new Date(day.dt*1000);
    		theDay = theDay.getDay();
    		$("#putDataInHere").append(`
    			<div class="col-md-3">
    				<div class="day animated rollIn clearfix">
	    				<div class="col-md-6">
	    					<h4>${changeToDay(theDay)}</h4>
	    					<h2>Max: ${day.temp.max}°</h2>
	    					<h2>Min: ${day.temp.min}°</h2>
	    					<p>${day.weather[0].description}</p>
	    				</div>
	    				<div class="col-md-6">
	    					<img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" />
	    				</div>
    				</div>
    			</div>
    		`)
    	})
    }

    // Simple function to convert number day to actual day
    function changeToDay(numberDay){
    	switch(numberDay) {
		    case 1:
		        return "Monday"
		        break;
		    case 2:
		        return "Tuesday"
		        break;
		    case 3:
		        return "Wednesday"
		        break;
		    case 4:
		        return "Thursday"
		        break;
		    case 5:
		        return "Friday"
		        break;
		    case 6:
		        return "Saturday"
		        break;
		    case 0:
		        return "Sunday"
		        break;
		    default:
		        return "IDFK"
		}
    }
})();

