
//Course
export class Class0{

    constructor(courseCode,profName,start,end,id,room,days,seats,credits,registered,section,recurring){
        this.courseCode = courseCode;
        this.profName = profName;
        this.start = start;
        this.end = end;
        this.id = id;
        this.room = room;
        this.days = days;
        this.seats = seats;
        this.credits = credits;
        this.registered = registered;
        this.section = section;
        this.recurring = recurring;
    }
}

export class SA{

    evolve(data = [],schedule = [], t, weakSchedules = [], nFitnesses = []){
        //calculate fitness - the greater the worse
        let f1 = this.calcFit(schedule);

        //create second schedule and calculate fitness
        let newSchedule = this.neighborshift(schedule,data,nFitnesses);// array passed by reference ?
        //return 1;
        // while loop that loops until a solution is not present on the weak schedule
        // while (!(weakSchedules.find(sc => sc == newSchedule) == "undefined")) {
        //     newSchedule = this.neighborshift(schedule,data,nFitnesses);
        // }
        let f2 = this.calcFit(newSchedule);
        //difference in fitness
        let dif_fit = f1 - f2;
        let p = Math.exp(-dif_fit/t);
        let r = Math.floor(Math.random() * 1);

        if ( dif_fit < 0) {
            if ( r < p)
            {weakSchedules.push(schedule);
            return newSchedule;}
            else
            {weakSchedules.push(newSchedule);
            return schedule;}
        }
        else
        {weakSchedules.push(schedule);
        return newSchedule;}
    }
    // Random probability for neighborhood solution selection
    randomNS(f1,f2){
        let p1 = 1 - (f1/(f1 + f2));//probability for solution 1 using its fitness
        let num=Math.random();
        if(f1 == f2) return f1;
        else if(num < p1) return f1;  //probability p1
        else return f2;  //probability p2
      }

    neighborS1(schedule = [], courseList = []){
        let i = 0;
        let k = 1;

        // check if there is any conflicts on the meeting times
        while (! (k == schedule.length)) {
            if (schedule[i].start == schedule[k].start && this.findCommonDays(schedule[i].days,schedule[k].days)){

                //get the list of instances of the 0st course
                let filteredCourse0 = courseList.filter(x => x.courseCode == schedule[i].courseCode);
                //if the fitered course has only one instance, check if the other course have alternatives
                if (filteredCourse0.length == 1) {
                    //get the list of instances of the 1nd course
                    let filteredCourse1 = courseList.filter(x => x.courseCode == schedule[k].courseCode);
                    if (filteredCourse1[0] != schedule[k]) {// if instance 0 is not the instance used in the schedule
                        schedule[k] = filteredCourse1[0]// swap instance 0 with the instance used
                    } else {
                        schedule[k] = filteredCourse1[1]// else swap it with instance 1
                    }
                }
                else {// if it has another instance swap it with the one used
                    if (filteredCourse0[0] != schedule[i]) {// if instance 0 is not the instance used in the schedule
                        schedule[i] = filteredCourse0[0]// swap instance 0 with the instance used
                    } else {
                        schedule[i] = filteredCourse0[1]// else swap it with instance 1
                    }
                }

            }
            i++;
            k++;
        }
        // console.log(schedule);
        //         return 1;
        return schedule;
    }
    neighborS2(schedule = [], courseList = []){
        let r = Math.floor(Math.random() * schedule.length); // select a random schedule
        //get the list of instances of the random course
        let filteredRandom = courseList.filter(x => x.courseCode == schedule[r].courseCode);

        // check if its not only one instance
        if (filteredRandom.length != 1){
            if (filteredRandom[0] != schedule[r]) {// if instance 0 is not the instance used in the schedule
                schedule[r] = filteredRandom[0]// swap instance 0 with the instance used
            } else {
                schedule[r] = filteredRandom[1]// else swap it with instance 1
            }
        }
        return schedule;
    }
    // Create an array that hold the weaker schedules, then only accept the new schedule if its better than the last one
    // move on that direction of the neighborhood by only changing it a bit, can add a percentige
    neighborshift(schedule = [], courseList = [], nFitnesses = []){
        let ns1 = [];
        let ns2 = [];
        //console.log(schedule);
        //  Neighbor solution one
        ns1 = this.neighborS1(schedule, courseList);
        //console.log(ns1);
        //return 1;
        // Neighbor solution two
        ns2 = this.neighborS2(schedule, courseList);
        let f = this.calcFit(schedule);
        let f1 = this.calcFit(ns1);
        let f2 = this.calcFit(ns2);
        if(nFitnesses[0] == 0 && nFitnesses[1] == 0){// first attempt
            // update fitnesses
            nFitnesses[0] = f1;
            nFitnesses[1] = f2;
            if(f1 == this.randomNS(f1,f2)) return ns1;
            else return ns2;

        } else if(f1 == this.randomNS(f1,f2)) { // if the 1st neighbor solution is fitter
            // update fitness
            nFitnesses[0] = f1;
            return ns1;
        } else {
            // update fitness
            nFitnesses[1] = f2;
            return ns2;
        }
    }
    randomSchedule(courseList = [], coursesWanted = []){
        //create a return schedule
        let schedule = [];
        //loop through the desired courses
        for(let i = 0; i < coursesWanted.length; i++){
            //get the list of instances of the course
            let filteredCourse = courseList.filter(x => x.courseCode == coursesWanted[i]);
            //get the first instance if there is only one, else choose a random instance
            if (filteredCourse.length == 1) schedule.push(filteredCourse[0]);
            else schedule.push(filteredCourse[Math.floor(Math.random() * filteredCourse.length)]);
            }
        return schedule;
    }

    calcFit(schedule = []){
        let conflicts = 0;
        let course1_Start,course2_Start,course1_end,course2_end;
        // check if there is any conflicts in the meeting times
        for (let i = 0; i < schedule.length; i++) {
          course1_Start = this.getTime(schedule[i].start);
          course1_end = this.getTime(schedule[i].end);
        for (let k = i + 1; k < schedule.length; k++) {
          course2_Start = this.getTime(schedule[k].start);
          course2_end = this.getTime(schedule[k].end);
          // if they are in the same day
            if (this.findCommonDays(schedule[i].days,schedule[k].days)){

              //then check if they start at the same time
              if(course1_Start == course2_Start){
                console.log("if",course1_Start, " = ",course2_Start);
                conflicts++;
                //else check if one of them starts at the middle of the other one
                }else if( this.fp_greater_than(course1_Start,course2_Start) && this.fp_less_than(course1_Start,course2_end) ){
                  console.log(course1_Start, ">" ,course2_Start, "&&" ,course1_Start, "<" ,course2_end);
                  conflicts++;
                }
                else if( this.fp_greater_than(course2_Start,course1_Start) && this.fp_less_than(course2_Start,course1_end)){
                  console.log(course2_Start, ">" ,course1_Start, "&&" ,course2_Start, "<" ,course1_end);
                  conflicts++;
                }
              }
            }
          }
          return (conflicts + 1);
    }

    getTime(time){
      let split1 = time.split(" ");
      let split2 = split1[1].split(":");
      let num = `${split2[0]}.${split2[1]}`;
      //parseFloat(num);
      if (split1[2].toLowerCase() === "pm"){
        if ( split2[0] === "12") {num = `0.${split2[1]}`;}
          num = parseFloat(num) + parseFloat('12.00');
        }
        return num;
      }

      fp_less_than(A, B) {
        let Epsilon = 0.000001;
        return (A - B < Epsilon) && (Math.abs(A - B) > Epsilon);
      };

      fp_greater_than(A, B) {
        let Epsilon = 0.000001;
        return (A - B > Epsilon) && (Math.abs(A - B) > Epsilon);
      };

      findCommonDays(arr1, arr2) {
        return arr1.some(item => arr2.includes(item))
      }

}



export let temperture = 2000;
export const reductionFactor = 50;
export let iterations = 0;
export let weakSchedules = [];
export let nFitnesses = [0,0];

export let output = (g,temperture,iterations,nFitnesses,coursesDB,coursesWanted,reductionFactor) => {
  let initialSchedule = g.randomSchedule(coursesDB,coursesWanted);
  let fitness = g.calcFit(initialSchedule);
  // run until
while (temperture != 0) {
    if (iterations == 100) {
        iterations = 0;
        weakSchedules = [];
        //temperture = 1000;
        nFitnesses = [0,0];
        initialSchedule = g.randomSchedule(coursesDB,coursesWanted);
    } else {
        initialSchedule = g.evolve(coursesDB,initialSchedule,temperture,weakSchedules,nFitnesses);
        iterations++;
        temperture = temperture - reductionFactor;
        console.log(temperture);
        fitness = g.calcFit(initialSchedule);
    }

    if(fitness == 1 ) break

}
    if (temperture == 0){
      initialSchedule = [];
      return initialSchedule;
    }else {
      return initialSchedule;
    }


}

// module.exports = { SA}
// finalSchedule = output(temperture,iterations,nFitnesses,coursesDB,coursesWanted,reductionFactor);

// console.log("***********************Final Schedule***********************\n");
// finalSchedule.forEach(cls => {
    // console.log(`(${finalSchedule.indexOf(cls) + 1}) class: ${cls.code}, Teacher: ${cls.teacher}, time: ${cls.time_room}\n`);
// });
