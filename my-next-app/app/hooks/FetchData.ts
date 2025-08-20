import { myAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchData = async () => {
    const response = await myAxios.get('/listings/all')
    return response.data
}

const useGetReponse = () => {
    return useQuery({queryKey: ['listing'], queryFn: fetchData},)
}

export {useGetReponse}