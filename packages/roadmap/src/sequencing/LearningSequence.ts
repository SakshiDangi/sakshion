export interface ConceptDependency {


  conceptId:string;


  prerequisites:string[];


}



export class LearningSequence {



  /**
   * Creates ordered learning path
   */
  static generate(
    concepts:ConceptDependency[]
  ):string[] {


    const visited =
      new Set<string>();


    const result:string[] = [];



    const visit =
      (concept:ConceptDependency)=>{


        if(
          visited.has(
            concept.conceptId
          )
        ){

          return;

        }



        concept.prerequisites
        .forEach(
          prerequisite=>{


            const dependency =
              concepts.find(
                item =>
                  item.conceptId === prerequisite
              );



            if(dependency){

              visit(dependency);

            }


          }
        );



        visited.add(
          concept.conceptId
        );


        result.push(
          concept.conceptId
        );


      };



    concepts.forEach(
      concept=>{

        visit(concept);

      }
    );

    return result;
  }

}