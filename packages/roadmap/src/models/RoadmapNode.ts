export enum RoadmapNodeStatus {

  LOCKED = "LOCKED",

  AVAILABLE = "AVAILABLE",

  CURRENT = "CURRENT",

  COMPLETED = "COMPLETED"

}



export interface RoadmapNode {


  conceptId:string;


  status:RoadmapNodeStatus;


  priority:number;


  estimatedMinutes:number;


}