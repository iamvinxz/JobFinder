import { myAxios } from "@/lib/axios"
import { CreateJob } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const editJob = async (id : number, editJobPost: CreateJob) => {
        const response = await myAxios.put(`/listings/${id}`, editJobPost)
        return  response.data
    }

const EditJobButton = ({id}: {id: number}) => {

    const [editJobPost, setEditJob] = useState<CreateJob>(
    {
      title: '',
      company: '',
      location: '',
      email: '',
      website: '',
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({mutationFn: editJob, mutationKey: ['jobs']})


const handleJobChanges = (e: any) => {
    setEditJob()
}

const editJobPost = (e: any) => {
    e.preventDefault()
}
   
  return (
    <form className="p-4 md:p-5" onSubmit={editJobPost}>
        <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Offer</label>
                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type job offer" value={job.title} onChange={handleInput}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                <input type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Company name" value={job.company} onChange={handleInput}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Enter the location" value={job.location} onChange={handleInput}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="sample@email.com" value={job.email} onChange={handleInput}/>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                <input type="text" name="website" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="www.website.com" value={job.website} onChange={handleInput}/>
            </div>
            <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Tag</label>
                <input type="text" name="tags" id="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete='off' placeholder="Type company tag" value={job.tags} onChange={handleInput}/>
            </div>
            <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
                <textarea id="description" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write job description here" value={job.description} onChange={handleInput}></textarea>                    
            </div>
        </div>
        <div className='text-center'>                          
            <button type="submit" className="text-white inline-flex items-center bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
            {isPending ? 'Adding...' : 'Add Job'}
            </button>
        </div>
    </form>
  )
}

export default EditJobButton
