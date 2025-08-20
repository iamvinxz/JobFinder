export interface Job {
  title: string,
  company: string,
  location: string,
  email: string,
  website: string,
  tags?: string,
  description?: string,
  id:number
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