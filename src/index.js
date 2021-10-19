const fs = require('fs');

const getSchedule = (filename) => {
  var input = fs.readFileSync(`./data/${filename}`,'utf8')
  if(input){
    obj = {1:[],2:[],3:[],4:[],5:[]}
      let dataArray=input.split("\n");
      dataArray.forEach(line => {
        [day,time]=line.split(' ');
        [timeBegin,timeEnd]=time.split('-');
        [hourTimeBegin,minuteTimeBegin]=timeBegin.split(':');
        [hourTimeEnd,minuteTimeEnd]=timeEnd.split(':');
        TotalBegin = parseInt(minuteTimeBegin)+((parseInt(hourTimeBegin)-8)*60)
        TotalEnd = parseInt(minuteTimeEnd)+((parseInt(hourTimeEnd)-8)*60)
        obj[day].push([TotalBegin,TotalEnd])
      })      
      const timeSlot = (reccursive([1,0]))
      return null
      // return transformResponse(timeSlot)
  }else{
    throw("bad file")
    return;
  }
};

let res = getSchedule("input1.txt");
console.log(res);

function transformHour(nbMin) {
  let hours =8+Math.floor(nbMin/60)
  if(hours<10){
    return (`0${hours}`)
  }
  return hours
}

function transformMinutes(nbMin){
  let minutes = nbMin%60
  if(minutes<10){
    return (`0${minutes}`)
  }
  return minutes
}

function transformResponse(goodTimeSlot) {
  [day,minutesSinceJourneyBegin] = goodTimeSlot;
  
  return `${day} ${transformHour(minutesSinceJourneyBegin)}:${transformMinutes(minutesSinceJourneyBegin)}-${transformHour(minutesSinceJourneyBegin+59)}:${transformMinutes(minutesSinceJourneyBegin+59)}`
  
}

function reccursive(lastTimeSlot) {
  // Pasrsing table of people disponibilities in function of the day (initially day 1)
  for (const timeSlot of obj[lastTimeSlot[0]]) {
    // Check if the current disponibility is in conflict 
    if(lastTimeSlot[1]+59 >= timeSlot[0] && lastTimeSlot[1] < timeSlot[1]){
      // console.log("in the between")
      // If it is the case i advance the next possible disponibility in the day
      lastTimeSlot[1] = timeSlot[1]+1
      return reccursive(lastTimeSlot)
    }
    // If it is the end of the day and i still have no possibility i pass to the next day
    if(lastTimeSlot[1] + 60 >= 599){
      lastTimeSlot[0]+=1
      lastTimeSlot[1] = 0
      return reccursive(lastTimeSlot)
    }
  }
  return lastTimeSlot;
}

module.exports = (getSchedule)
