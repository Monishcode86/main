
const userLogin = (userName,password) => {
    return new Promise(async(resolve,reject)=>{
        try {
           resolve(await fetch('https://k2prod.azurewebsites.net/auth/signin',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userName,
              password: password,
            }
            ),
          }).then(res=>res.json())
          ) 
        } catch (error) {
          
            reject(error)
        }
      
          
    })
    
}
  
export default userLogin