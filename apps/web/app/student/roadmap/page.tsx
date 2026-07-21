async function getRoadmap() {

  const res =
    await fetch(
      "http://localhost:3000/api/roadmap",
      {
        cache:"no-store",
      }
    );


  return res.json();

}



export default async function RoadmapPage() {


  const data =
    await getRoadmap();



  return (

    <main className="p-8 space-y-8">


      <h1 className="text-3xl font-bold">
        Learning Roadmap
      </h1>

      <div className="border rounded-xl p-5">

<h2>
Progress
</h2>


<div className="mt-3 h-3 bg-gray-200 rounded">

<div
className="h-3 bg-black rounded"
style={{
 width:`${data.progress}%`
}}
/>

</div>


<p className="mt-2">
{data.progress}% completed
</p>

</div>

      <section
        className="space-y-4"
      >


        {
          data.nodes.map(
            (
              node:{
                id:string;
                title:string;
                completed:boolean;
                unlocked:boolean;
              }
            )=>(


              <div
                key={node.id}
                className="
                  border
                  rounded-xl
                  p-5
                  flex
                  justify-between
                  items-center
                "
              >


                <div>


                  <h2
                    className="text-xl font-semibold"
                  >
                    {node.title}
                  </h2>


                  <p className="text-sm text-gray-500">

                    {
                      node.completed
                      ?
                      "Completed"
                      :
                      node.unlocked
                      ?
                      "Available"
                      :
                      "Locked"
                    }

                  </p>


                </div>



                <div>


                  {
                    node.completed
                    &&
                    <span>
                      ✅
                    </span>
                  }



                  {
                    !node.completed &&
                    node.unlocked &&
                    <span>
                      🔓
                    </span>
                  }



                  {
                    !node.unlocked &&
                    <span>
                      🔒
                    </span>
                  }


                </div>



              </div>


            )
          )
        }


      </section>


    </main>

  );

}