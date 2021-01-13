function parseTime(time){
    if(time.charAt(time.length-2)=="p"){
        parsedTime = parseInt(time.split('p')[0]);
        if(parsedTime==12){
          parsedTime=12;
          //alert("found one");
        }else{
          parsedTime+=12;
        }
    }
  else{
        parsedTime = parseInt(time.split('a')[0]);
        if(parsedTime==12 || parsedTime<4){
          parsedTime = 24;
        }
    }
  return parsedTime;
}

function VolunteerShifts(name, id, date, dtime){
    this.name = name;
    this.id = id;
    this.date = date;
    this.time = dtime;
    dateSplit = date.split("/");
    timeSplit = dtime.split(" - ");    
    this.startTime = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0],parseTime(timeSplit[0]));
    this.endTime = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0],parseTime(timeSplit[1]));
    this.checkOverlap = function(volunteer2){
    //console.log(volunteer2.startTime+" "+this.startTime);
    if(volunteer2.startTime >= this.startTime && volunteer2.startTime<this.endTime){
      return true;
    }else if(volunteer2.endTime > this.startTime && volunteer2.endTime <= this.endTime){
      return true;
    }
      return false;
    }
}

