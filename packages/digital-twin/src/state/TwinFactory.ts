import type {DigitalTwin} from "../models/DigitalTwin";


export class TwinFactory {


 static create(
 studentId:string,
 concepts:Record<string,number>
 ):DigitalTwin{


 const mastery={};


 for(const id in concepts){

 mastery[id]={
   conceptId:id,
   mastery:concepts[id],
   attempts:0,
   lastUpdated:new Date()
 };

 }


 return {

 studentId,

 mastery,

 confidence:{},

 learningState:{
   currentConcept:null,
   currentRoadmapNode:null,
   activeLesson:null,
   lastPractice:null,
   lastUpdated:new Date()
 },

 xp:0,

 streak:{
   current:0,
   longest:0,
   lastActiveDate:""
 },

 statistics:{
   totalPractices:0,
   completedConcepts:0,
   averageMastery:0
 },

 history:[],

 updatedAt:new Date()

 };


 }


}