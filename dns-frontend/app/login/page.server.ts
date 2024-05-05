export const handleLogin = async ({email, password} : {email:string,password:string}) => {
    const response = await fetch('http://localhost:7002/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    const data = await response.json()
    if (data.error) {
        throw new Error(data.error)
    }
    return data
}