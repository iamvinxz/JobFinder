import { myAxios } from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

 const deleteJob = async (id: number) => {
        const response = await myAxios.delete(`/listings/${id}`)
        return response.data
    }

const DeleteJobButton = ({id} : {id: number}) => {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteJob, 
        mutationKey: ["jobs"], 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['listing']})
            toast("Job deleted successfuly", {type: "success", theme:"dark"})
        }
    })

    const handleDelete = () => {
        console.log("deleting...")
        mutate(id)
    }

  return (
      <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-start" onClick={handleDelete}>Delete</button>
  )
}
export default DeleteJobButton
