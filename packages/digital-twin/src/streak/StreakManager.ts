export interface StreakState {

  current:number;

  longest:number;

  lastActiveDate:string;

}

export class StreakManager {

  /**
   * Update streak after learning activity
   */
  static update(
    streak:StreakState,
    date:string
  ):StreakState {


    /**
     * First activity
     */
    if(!streak.lastActiveDate){

      return {

        current:1,

        longest:1,

        lastActiveDate:date

      };

    }



    const previous =
      new Date(
        streak.lastActiveDate
      );


    const current =
      new Date(date);



    const difference =
      this.daysBetween(
        previous,
        current
      );



    /**
     * Same day
     */
    if(difference === 0){

      return {

        ...streak

      };

    }



    /**
     * Consecutive day
     */
    if(difference === 1){


      const newCurrent =
        streak.current + 1;



      return {


        current:
          newCurrent,


        longest:
          Math.max(
            streak.longest,
            newCurrent
          ),


        lastActiveDate:
          date


      };

    }



    /**
     * Missed day(s)
     */
    return {

      current:1,

      longest:
        streak.longest,


      lastActiveDate:
        date

    };


  }



  private static daysBetween(
    first:Date,
    second:Date
  ):number {


    const milliseconds =
      second.getTime()
      -
      first.getTime();



    return Math.floor(
      milliseconds /
      (1000 * 60 * 60 * 24)
    );

  }

}