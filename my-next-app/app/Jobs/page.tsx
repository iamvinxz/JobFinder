"use client"
import {useGetReponse}  from '../hooks/FetchData'
import {useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import JobCard from '@/components/JobCard'
import { CreateJob, Job } from '@/types'
import { toast } from 'react-toastify'
import { myAxios } from '@/lib/axios'

const Jobs = () => {

  const {data: jobs, isLoading} = useGetReponse()
  const [isActive, setIsActive] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const queryClient = useQueryClient()

  const [job, setJob] = useState<CreateJob>(
    {
      title: '',
      company: '',
      location: '',
      email: '',
      website: '',
    }
  )

  const createJob = async (job : CreateJob) => {
    const response = await myAxios.post('/listings', job)  
    return response.data
  }

  const handleInput = (e:any) => {
    setJob({...job, [e.target.name]: e.target.value})
  }

  const {mutate, isPending, isSuccess, isError} = useMutation({mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['listing']})
      toast("mali", {type: 'success', position:"top-center", autoClose: 10000})
      toast("tama")
    }
  }) 

  const addJobPost = (e: any) => {
    console.log("adding job")
    e.preventDefault();
    mutate({title: job.title, company: job.company, location: job.location, email: job.email, website: job.website, tags: job.tags, description: job.description})
  }

  if(isLoading) return (
    <div role="status" className='flex justify-center items-center h-screen'>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )

  const handleAddJob = () => {
    setIsActive(!isActive)
  }

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <>
    <main>
      <section className='absolute top-0 right-0'>
        <section className='flex justify-center my-[40px] relative top-20 right-70'>
          <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer" type="button" onClick={handleAddJob}>
            Add Job
          </button>
        </section>
      </section>

       { isError &&
          <div id="toast-warning" className="absolute right-1 top-3 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                  </svg>
                  <span className="sr-only">Warning icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Something went wrong.</div>
              <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
              </button>
          </div>
        }

        <section className='text-center mt-[20px]'>
          <h1 className='font-bold text-xl'>Job Lists</h1>
        </section>

        <section className='flex justify-center my-[5em]'>
          <section className='grid grid-cols-2 gap-7'>
            {(jobs ?? []).map((job: Job, index : number) => (
              <JobCard key={job.title} job={job}/>
            ))}
        </section>
      </section>

      {isActive && 
      <section>
          <div id="crud-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-900/60">
              <div className="relative p-4 w-full max-w-md max-h-full">
                  {/* Modal content*/}
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Create New Job  
                          </h3>
                          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleAddJob}>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>
                      {/* <!-- Modal body --> */}
                      <form className="p-4 md:p-5" onSubmit={addJobPost}>
                          <div className="grid gap-4 mb-4 grid-cols-2">
                              <div className="col-span-2">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Offer</label>
                                  <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type job offer" value={job.title} onChange={handleInput}/>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                  <input type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Company name" value={job.company} onChange={handleInput}/>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                  <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter the location" value={job.location} onChange={handleInput}/>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                  <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="sample@email.com" value={job.email} onChange={handleInput}/>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                  <input type="text" name="website" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="www.website.com" value={job.website} onChange={handleInput}/>
                              </div>
                               <div className="col-span-2">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comapny Tag</label>
                                  <input type="text" name="tags" id="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type company tag" value={job.tags} onChange={handleInput}/>
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
                  </div>
              </div>
          </div> 
        </section>
      }
        {isSuccess && 
          <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
              <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
              </button>
          </div>
        }

        <section>
        {/* <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Item has been deleted.</div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div> */}
      </section>
      </main>
    </>
  )
}
export default Jobs
