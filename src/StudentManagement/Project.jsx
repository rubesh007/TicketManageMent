import{ useContext, useMemo, useState } from "react";

const Project = () => {

// useContext get to store value
  const{projectStore,setProjectStorre} = useContext(ThemeContext)

  //  add Project details button
  const [addProjectBtn,setAddProjectBtn]=useState(false)

  //edit project purticular index details 
  const [edit,setEdit]=useState(null)

  // search useState
  const [ search , setSearch ]=useState("")


  const [project,setProject]=useState(
    {
      date:"",
      name:"",
      batchcode:"",
      projecttitle:"" ,
      trainer:"",
      status: "",
      email: "",
      review: "",
      projectCompletDate:''
      
    })

// pagenation function
  const [page, setPage] = useState(1); // current page
  const usersPerPage = 5;

  const start = (page - 1) * usersPerPage; 
  const end = start + usersPerPage;       
  const currentUsers = projectStore.slice(start, end); // show 5 users

  const totalPages = Math.ceil(projectStore.length / usersPerPage);
 
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //Student input form valditation 
    const handleProjectInput = (e)=>{
       e.preventDefault()
      const {name ,value} = e.target 
      setProject({...project,[name]:value})
      console.log(project);
      
    }
    // 
    const handleProjectSumbit =(e) => {
        e.preventDefault()
      const { 
          date,
          name,
          batchcode,
          email,
          projecttitle,
          trainer,
          status
      }=project
        if(
              date&&
              name&&
              batchcode&&
              projecttitle&&
              email&&
              status &&
              trainer&&
              status !== ""
        ){
            if(edit!== null){
              const update =[...projectStore]
              update[edit]=project
              setProjectStorre(update)
              localStorage.setItem("projectDetails",JSON.stringify(update))
              setEdit(null)
            }else{
              const UpdateData = [...projectStore, project] 
              setProjectStorre(UpdateData)
              localStorage.setItem("projectDetails",JSON.stringify(UpdateData))
            }
        }else{
          alert('Fill the Student Details')
        }
          setAddProjectBtn(!addProjectBtn)
          setProject(
            {
              date:"",
              name:"",
              batchcode:"",
              projecttitle:"" ,
              trainer:"",
              status: "",
              email: "",
              review: "",
              projectCompletDate:''
            }
          )
    }
    
    
  // student detail detele
  const handleDetele = (indexDetele)=>{
    const deteleProjectDetails = projectStore.filter((_,index)=>index!==indexDetele);
    setProjectStorre(deteleProjectDetails)
    localStorage.setItem("projectDetails",JSON.stringify(deteleProjectDetails))

  }
  // student edit details 
  const handleEdit =(i)=>{
    setProject(projectStore[i])
    setEdit(i) 
    setAddProjectBtn(!addProjectBtn)
  }

  //filter search student details 
   const filterProject = useMemo(()=>{
    if(!search)return currentUsers;
    return projectStore.filter((item)=>{
      return  item.name.toLowerCase().includes(search.toLowerCase())||item.batchcode.toLowerCase().includes(search.toLowerCase())
    })
   },[currentUsers,search])

  
  return(
      <>
        { addProjectBtn ? 
          <div className=" flex  items-center justify-center w-full bg-gray-100 h-screen p-6">
            <form className="w-150 p-8 bg-white rounded-md m-10 shadow-xl overflow-scroll hiddenOverFlow h-162" onSubmit={handleProjectSumbit}>
            <h1 className="text-3xl p-8 text-center font-bold text-black"> Student Project</h1>

              <label className="text-md font-bold text-black">Date:</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="date"  name="date" value={project.date} onChange={handleProjectInput} placeholder="Enter Date"/><br/>

              <label className="text-md font-bold text-black">Name</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="text" name="name"value={project.name} onChange={handleProjectInput} placeholder="Enter Name"/><br/>

              <label className="text-md font-bold text-black">Batch Code :</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="text" name="batchcode"value={project.batchcode} onChange={handleProjectInput} placeholder="Enter Batch Code"/><br/>

              <label className="text-md font-bold text-black">Email</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="text" name="email"value={project.email} onChange={handleProjectInput} placeholder="Enter Email "/><br/>

              <label className="text-md font-bold text-black">Project Title</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="text" name="projecttitle" value={project.projecttitle} onChange={handleProjectInput}placeholder="Enter Project Title"/><br/>

              <label className="text-md font-bold text-black">Trainer</label><br/>
              <input className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 " type="text" name="trainer" value={project.trainer}onChange={handleProjectInput} placeholder="Enter Trainer Name"/><br/>

              <label className="text-md font-bold text-black">Status</label><br/>
              <br />
              <select name="status" value={project.status}  onChange={handleProjectInput} className="w-full text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 ">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              {project.status==="completed" ?
              <textarea name="review" onChange={handleProjectInput} placeholder="Project Explain" value={project.review} 
              className="w-full hight-auto text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 ">
              </textarea>
              
              : null
            }
            {project.status==="completed"?<input type="datetime-local" name="projectCompletDate" value={project.projectCompletDate}
            className="w-full hight-auto text-md text-gray-800 font-bold px-5 py-4 border-2 border-black focus-none focus:outline-none rounded-md mt-1 mb-4 hover:border-blue-500 "
            onChange={handleProjectInput}/>:null}
            
              <button type="sumbit" className="bg-black text-white rounded-md my-5 ml-55 px-4 py-2 border-2 text-md font-bold-2 hover:bg-white  hover:text-black hover:shadow-xl">SUMBIT</button>
            </form>
          </div>:

        <div className="min-h-screen bg-white text-black p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Project List</h1>
          <div className="flex float-right p-5 gap-3">
            <button type="button" className="bg-black text-white rounded-md px-4 py-2 border-2 text-md font-bold-2 hover:bg-white hover:text-black" onClick={() => {setAddProjectBtn(!addProjectBtn)}} >Add Details</button>
            <input type="text" placeholder="search..."
             onChange={(e)=>{setSearch(e.target.value)}} className="lg:w-75 px-3 py-2 border-2 text-md font-bold"/>
          </div>

          {/* table */}
          <table className="w-full border border-black">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2 px-4 border border-black" >S.No</th>
                <th className="py-2 px-4 border border-black">Date</th>
                <th className="py-2 px-4 border border-black">Name</th>
                <th className="py-2 px-4 border border-black">Batch Code</th>
                <th className="py-2 px-4 border border-black">Email</th>
                <th className="py-2 px-4 border border-black">Project Title</th>
                <th className="py-2 px-4 border border-black">Trainer</th>
                <th className="py-2 px-4 border border-black">Status</th>
                <th className="py-2 px-4 border border-black">ACTION</th>
              </tr>
            </thead>
            <tbody>
              { filterProject.length !==0 ? filterProject.map((project,index) => (
                <tr key={index} >
                  <td className="py-2 px-4 border border-black" >{index+1}</td>
                  <td className="py-2 px-4 border border-black">{project.date}</td>
                  <td className="py-2 px-4 border border-black">{project.name}</td>
                  <td className="py-2 px-4 border border-black">{project.batchcode}</td>
                  <td className="py-2 px-4 border border-black">{project.email}</td>
                  <td className="py-2 px-4 border border-black">{project.projecttitle}</td>
                  <td className="py-2 px-4 border border-black">{project.trainer}</td>
                  <td className="py-2 px-4 border border-black">{project.status}</td>

                  <td className="py-2 px-4 border border-black"> 
                    <div className="flex gap-5">
                    <button type="button" className="bg-black text-white rounded-md px-4 py-2 border-2 text-md font-bold-2 hover:bg-white hover:text-black" 
                    onClick={()=>{handleEdit(start +  index)}}>EDIT</button>
                    <button type="button" className="bg-black text-white rounded-md px-4 py-2 border-2 text-md font-bold-2 hover:bg-white hover:text-black" 
                    onClick={()=>{handleDetele(start + index)}}>DETELE</button>
                    </div>
                  </td>
                </tr>
              ))
              :<tr>
                <td className="py-2 px-4 border border-black ">No Data</td>
              </tr>
              }
            </tbody>
          </table>

          {/* pageNation */}
          <div className="flex items-center justify-center">
            <div style={{ marginTop: "20px" }}>
              <button onClick={prevPage} disabled={page === 1}  className=" text-black font-bold py-2 px-4 rounded border-1 border-black hover:bg-gray-800 hover:text-white">
                ⬅ Previous
              </button>

              <span style={{ margin: "0 10px" }} className="font-bold ">
                <span className="bg-black text-white font-bold py-2 px-4 rounded">{page}</span> ... <span className="bg-black text-white font-bold py-2 px-4 rounded">{totalPages}</span>
              </span>

              <button onClick={nextPage} disabled={page === totalPages} className=" text-black font-bold py-2 px-4 rounded border-1 border-black hover:bg-gray-800 hover:text-white">
                Next ➡
              </button>
            </div>
          </div>
        </div>}
    </>
  )

};
export default Project