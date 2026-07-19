export class XPManager {


  /**
   * Diagnostic completion reward
   */
  static diagnosticCompleted(
    currentXP:number
  ):number {


    return currentXP + 100;

  }



  /**
   * Lesson completion reward
   */
  static lessonCompleted(
    currentXP:number
  ):number {


    return currentXP + 25;

  }



  /**
   * Practice completion reward
   */
  static practiceCompleted(
    currentXP:number
  ):number {


    return currentXP + 50;

  }



  /**
   * Daily login reward
   */
  static dailyLogin(
    currentXP:number
  ):number {


    return currentXP + 10;

  }



  /**
   * Safe XP update
   *
   * Prevent negative XP
   */
  static update(
    currentXP:number,
    amount:number
  ):number {


    return Math.max(
      0,
      currentXP + amount
    );


  }


}