import { myAxios } from "@/lib/axios"
import { Job } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"

const editJob = async ({id, jobInfo}: {id: number, jobInfo: Job}) => {
        const response = await myAxios.put(`/listings/${id}`, {
          title: jobInfo.title,
          company: jobInfo.company  ,
          location:  jobInfo.location,
          email: jobInfo.email,
          website: jobInfo.website,
          tags: jobInfo.tags,
          description: jobInfo.description
      })
        return  response.data
    }

const EditJobButton = ({id, jobInfo}: {id: number, jobInfo: Job}) => {

    const [editFormShow, setEditFormShow] = useState(false)
    
    const [updateJob, setUpdateJob] = useState<Job>({
        title: jobInfo.title,
        company: jobInfo.company,
        location: jobInfo.location,
        email: jobInfo.email,
        website: jobInfo.website,
        tags: jobInfo.tags,
        description: jobInfo.description
    })
    
    const handleUpdateJob = (e: any) =>{
        setUpdateJob({...updateJob, [e.target.name]: e.target.value})
    }

    const handleFormShow = () => {
        setEditFormShow(!editFormShow)
    }

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: editJob, 

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['listing']})
            toast("Job updated successfully", {type:"success", theme:"dark" , autoClose: 2000})
        }
    })

    const handleEdit = (e: any) => {
        e.preventDefault()
        console.log(updateJob)
        mutate({id, jobInfo: updateJob})
}
   
  return (
    <>
    <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-start" onClick={handleFormShow}>Edit Job</button>
    {editFormShow && 
        <section className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-900/60'>
            <div className="relative p-4 w-full max-w-md max-h-full">
                      {/* Modal content*/}
                      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                          {/* <!-- Modal header --> */}
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Edit Job Post  
                              </h3>
                              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleFormShow}>
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                          </div>
                          {/* <!-- Modal body --> */}
                          <form className="p-4 md:p-5" onSubmit={handleEdit}>
                              <div className="grid gap-4 mb-4 grid-cols-2">
                                  <div className="col-span-2">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Offer</label>
                                      <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type job offer" value={updateJob.title} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2 sm:col-span-1">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                      <input type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Company name" value={updateJob.company} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2 sm:col-span-1">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                      <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Enter the location" value={updateJob.location} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2 sm:col-span-1">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                      <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="sample@email.com" value={updateJob.email} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2 sm:col-span-1">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                      <input type="text" name="website" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="www.website.com" value={updateJob.website} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Tag</label>
                                      <input type="text" name="tags" id="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Type company tag" value={updateJob.tags} onChange={handleUpdateJob}/>
                                  </div>
                                  <div className="col-span-2">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
                                      <textarea id="description" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write job description here" value={updateJob.description} onChange={handleUpdateJob}></textarea>                    
                                  </div>
                              </div>
                              <div className='text-center'>                          
                                  <button type="submit" className="text-white inline-flex items-center bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Edit Job
                                </button>
                              </div>
                          </form>
                      </div>
                  </div>
            </section>
      }
    </>
  )
}
export default EditJobButton
