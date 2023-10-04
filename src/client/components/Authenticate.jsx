export default async function Authenticate(){
    try {
        const APIresponse=await fetch ('http://localhost:3000/api/users/me',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        const result = await APIresponse.json();
        console.log('APIresponse:',result);

        if(!APIresponse.ok) {
            throw new Error (result.error || 'Authentication failed');
        }
        if(!result.data) {
            console.error('Unexpected API structure. User data missing.');
            return {success: false, error:'User data is missing from API response'}
        }
        const userData = {
           name: result.data.name || null,
           reviews: result.data.reviews || [],
           comments: result.data.comments || [],
           id: result.data.id || null
        };
        setName(userData.name)
        console.log ('Extracted User Data:', userData);
        return userData;
            
        
    } catch (error) {
        console.log(error);
        return {success: false, error: error.message}
        
    }
    
    
    
}