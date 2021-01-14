$(document).ready(function () {
    $("#test").click(function (e) { 
        alert("Clicked");
        e.preventDefault();        
    });
	var data;
	var vShifts = [];
	var shiftOverlapData = [];	
	$.ajax({
			type: "GET",  
			url: "volunteer_attendance_data.csv",
			dataType: "text",       
			success: function(response)  
			{
				data = $.csv.toArrays(response);			
				console.log(data);
				for (let index = 1; index < data.length; index++) {	
					let v1 = new VolunteerShifts(data[index][3],data[index][2],data[index][0],data[index][1]);
					vShifts.push(v1);
					console.log(v1);				
				}	
				overLap(vShifts);	
			}   
		})
	
	function overLap(shiftArr){
		console.log(shiftArr);
		console.log(shiftArr[1].checkOverlap(shiftArr[2]));
		var counter = 1;
		// for (let i = 0; i < shiftArr.length; i++) {
		// 	for (let j = 0; j < shiftArr.length; j++) {
		// 		if(i!=j){
		// 			if(shiftArr[i].checkOverlap(shiftArr[j])){						
		// 				console.log(counter+". Connection :"+shiftArr[i].name+" with "+shiftArr[j].name+" at "+shiftArr[i].date);
		// 				var tempArr = [shiftArr[i],shiftArr[j]];
		// 				shiftOverlapData.push(tempArr);
		// 				counter++;
		// 			}
		// 		}				
		// 	}		
		// }
		for (let i = shiftArr.length-1; i >= 0; --i) {
			for (let j = 0; j < shiftArr.length; j++) {
				if(i!=j){
					if(shiftArr[i].checkOverlap(shiftArr[j])){
						console.log(counter+". Connection :"+shiftArr[i].name+" with "+shiftArr[j].name+" at "+shiftArr[i].date);
						var tempArr = [shiftArr[i],shiftArr[j]];
						shiftOverlapData.push(tempArr);
						counter++;
					}
				}
			}shiftArr.pop();			
		}
		console.log(shiftOverlapData);
		var weightedData = addWeight(shiftOverlapData);
		fillTable(weightedData);
	}

	function fillTable(tableData){
		var tableHtml = "<thead><tr><th>Node 1</th><th>Node 2</th><th>Weight</th></tr></thead><tbody>";
		for (let index = 0; index < tableData.length; index++) {
			tableHtml+= "<tr><td>"+ tableData[index][0] +"</td><td>"+ tableData[index][1] +"</td><td>"+ tableData[index][2]+"</td><tr>";			
		}
		tableHtml+="</tbody>";
		$("#msg").html("Download CSV");
		$("#overlapTable").html(tableHtml);
		console.log(tableHtml);
		
	}
	
	function addWeight(overLapData){	
		var weightedData = [];	
		for (let i = 0; i < overLapData.length; i++) {
			var v1 = overLapData[i][0].name;
			var v2 = overLapData[i][1].name;			
			var weight = 0;
			for (let j = 0; j < overLapData.length; j++) {
				if((v1 == overLapData[j][0].name && v2 == overLapData[j][1].name) || (v2 == overLapData[j][0].name && v1 == overLapData[j][1].name)){
					weight++;
					if(weight==2){
						overLapData.splice(j,1);
					}					
				}
			}
			weightedData.push([v1,v2,weight]);				
		}		
		console.log(weightedData);	
		return weightedData;
	}

	$("#msg").click(function(){
		$('#overlapTable').TableCSVExport({
			delivery: 'download',
			filename: 'Shift-Overlap-Result.csv'
		});
	});
});

// for (let i = shiftArr.length-1; i > 0; i--) {
// 	for (let j = 0; j < shiftArr.length; j++) {
// 		if(i!=j){
// 			if(shiftArr[i].checkOverlap(shiftArr[j])){
				
// 				console.log("Connection :"+shiftArr[i].name+" with "+shiftArr[j].name+" at "+shiftArr[i].date);
// 			}
// 		}
// 	}			
// }