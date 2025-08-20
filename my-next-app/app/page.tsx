"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {

  const [action, setAction] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("Token")
    if(token){
      setIsLoggedIn(true)
    } 
  }, [])

  //for registration
  const [registerForm, setRegisterForm] = useState({
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

  //for login
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const loginAccount = async ({email, password} : {email : string, password: string}) => {
    const response = await axios.post('http://localhost:8000/api/login', {email, password})
    localStorage.setItem("Token", response.data.token)
    return response.data
  }

  const { mutate, isError, isSuccess,error} = useMutation({mutationFn: loginAccount, 
    onError: () => {
      toast("Oops! Wrong credentials", {autoClose: 2000, type: "error"})
    }
  })

  const handleLoginAccount = (e: any) => {
      e.preventDefault()
      if (loginForm.email.trim() === "" || loginForm.password.trim() === "") {
        toast("Please enter your credentials", {type:"error", autoClose: 1000})
        return;
      } 
      mutate(loginForm)
  } 

  return (
    <main className="min-h-[80%]">
      <section className="text-center overflow-auto py-[3rem]">      
        <h1 className="font-bold text-rose-600 text-4xl">JobFinder</h1>
        <p>"Find Your Next Opportunity, Faster."</p>
        <span className="text-xs">by:Project  Zero</span>
      </section>

      {/* login */}
      
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
    </main>
  )}

