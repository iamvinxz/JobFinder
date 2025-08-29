"use client";
import { myAxios } from "@/lib/axios";
import { RegisterForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetReponse } from "./hooks/FetchData";
import { Job } from "@/types"

export default function Home() {

  const {data:showListJob = []} = useGetReponse();
  const [action, setAction] = useState("login");
  const [showDashBoard, setShowDashBoard] = useState<string | null>(null)

  //for registration
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const registerAccount = async (form: typeof registerForm) => {
    const response = await axios.post('http://localhost:8000/api/register', form)
    return response.data
  }

  const {mutate: createAccount, isSuccess: successfulAccount, isError: errorAccount} = useMutation({mutationFn: registerAccount});

  const handleCreateAccount = (e:any) => {
    e.preventDefault()
    createAccount({name: registerForm.first_name + registerForm.last_name, email: registerForm.email, password: registerForm.password, password_confirmation: registerForm.confirm_password})
  }

  const handleChange = (e: any) => {
    setRegisterForm({...registerForm, [e.target.name]: e.target.value})
  }

  //login 

  const loginAccount = async ({email, password} : {email : string, password: string}) => {
    const response = await axios.post('http://localhost:8000/api/login', {email, password})
    localStorage.setItem("Token", response.data.token)
    return response.data
  }

  const [loginForm, setLoginForm] = useState({
      email: "",
      password: ""
      });
  
  useEffect(() => {
  const token = localStorage.getItem("Token");
  if (token) {
    setShowDashBoard(token)
  }
  }, []);

  const { mutate, isError, isSuccess,error} = useMutation({mutationFn: loginAccount, 
    onError: () => {
      toast("Oops! Wrong credentials", {autoClose: 2000, type: "error", theme:"dark"})
    },onSuccess: (data) => {
      toast("Logged in successfully", {autoClose: 2000, type: "success", theme: "dark"})
      setShowDashBoard(data.token)
    }
  })

  const handleLoginAccount = (e: any) => {
    e.preventDefault()
    if (loginForm.email.trim() === "" || loginForm.password.trim() === "") {
      toast("Please enter your credentials", {type:"error", theme:"dark", autoClose: 1000})
      return;
    }
    mutate(loginForm)
  }

  //logout

  const logoutAccount = async () => {
    const response = await myAxios.post('/logout')
    return response.data
  }

  const {mutate: logout} = useMutation({
    mutationFn: logoutAccount,
    mutationKey: ['logout']
  })

   const handleLogoutAccount = () => {
    localStorage.removeItem("Token");
    logout()
    setShowDashBoard(null);
    toast("Logged out successfully", {type: "success",autoClose: 2000, theme: "dark"})
  }

  return (
    <main className="min-h-[80%]">
    {!showDashBoard ? 
      (<><section className="text-center overflow-auto py-[3rem]">      
            <h1 className="font-bold text-rose-600 text-4xl">JobFinder</h1>
            <p>"Find Your Next Opportunity, Faster."</p>
            <span className="text-xs">by:Project  Zero</span>
          </section>

          {action === "login" &&
            <section>
              <form className="max-w-sm mx-auto" onSubmit={handleLoginAccount}>
                {/* email */}
                  <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" autoComplete="off" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}/>
                  </div>
              
                {/* password */}
                  <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} />
                  </div> 

                  <div className="text-center">
                    <div className="form-buttons">
                      <button type="submit" className={action==="login" && action} onClick={() => setAction("login")}>Login</button>
                      <button type="button" className={action==="register" && "login"} onClick={() => setAction("register")}>Register</button>
                    </div>
                  </div>
              </form>
            </section>
          }

          {/* register */}

          {action === "register" &&  
            <section className="py-[3rem] relative top-[-35]">
              <form className="max-w-md mx-auto" onSubmit={handleCreateAccount}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" autoComplete="off" placeholder=" " required value={registerForm.first_name} onChange={handleChange}/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" autoComplete="off" placeholder=" " required value={registerForm.last_name} onChange={handleChange}/>
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" autoComplete="off" placeholder=" " required value={registerForm.email} onChange={handleChange}/>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={registerForm.password} onChange={handleChange}/>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="confirm_password" id="confirm_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={registerForm.confirm_password} onChange={handleChange}/>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <div className="text-center">
                  <div className="form-buttons">
                    <button type="button" className={action==="login" && action} onClick={() => setAction("login")}>Login</button>
                    <button type="submit" className={action==="register" && "login"} onClick={() => setAction("register")}>Register</button>
                  </div>
                </div>
              </form>
            </section>
          }
        </>): 
        <section className="grid justify-center">   
        <section className="flex justify-around w-5xl">
            <h1 className="my-5 text-2xl">Welcome, <span className="text-red-500"></span>!</h1>
            <button className="text-lg cursor-pointer text-red-500" onClick={handleLogoutAccount}>Logout</button>
        </section>
        <section>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Job Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                  Company
                              </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                  Location
                              </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                  Email
                              </div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                              <span className="sr-only">Edit</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {showListJob.map((list:Job)=>
                      <tr key={list.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {list.title}
                          </th>
                          <td className="px-6 py-4">
                              {list.company}
                          </td>
                          <td className="px-6 py-4">
                              {list.location}
                          </td>
                          <td className="px-6 py-4">
                              {list.email}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                          </td>
                      </tr>
                    )}
                  </tbody>
              </table>
          </div>
        </section>
    </section>}
    </main>
  )}

