export interface Job {
  title: string,
  company: string,
  location: string,
  email: string,
  website: string,
  tags?: string,
  description?: string,
  id?:number,
  name?: string,
  user_id?: number
}

export interface CreateJob {
  title: string,
  company: string,
  location: string,
  email: string,
  website: string,
  tags?: string,
  description?: string,
}

export interface RegisterForm{
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirm_password: string,
  name?: string
}