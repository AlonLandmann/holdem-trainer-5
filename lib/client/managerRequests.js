import toast from 'react-hot-toast'

export default async function handleManagerRequest(route, method = 'GET', setUser, payload = {}) {
  const setContentType = ['POST', 'PATCH', 'PUT'].includes(method)

  try {
    const res = await fetch(route, {
      method,
      headers: setContentType ? { 'Content-Type': 'application/json' } : {},
      credentials: 'include',
      body: JSON.stringify(payload)
    })

    const json = await res.json()

    if (json.success) {
      setUser(json.updatedUser)
      toast.success('Success')
    } else {
      toast.error(json.message || 'An unexpected error occured.')
    }
  } catch (error) {
    console.log(error)
    toast.error('An unexpected error occured.')
  }
}