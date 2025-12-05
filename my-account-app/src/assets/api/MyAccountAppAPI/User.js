const API_URL = import.meta.env.VITE_API_URL;

export const updateUserFetch = async (userId, userUpdatedName, userUpdatedLastName, userType, userEmail) => {
    const url = `${API_URL}/api/User/UpdateUser/${ userId }`;

    try 
    {
        const response = await fetch(url, {
            method: 'put', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id: userId,
                firstName: userUpdatedName,
                lastName: userUpdatedLastName,
                userType: 'STANDAR_USER',
                email: userEmail,
            })
        } ); 

        const data = await response.json()
        console.log(data)

        return { isError: false }
    } 
    catch (error) 
    {
        console.log(error)
        return { isError: true }
    }
}

export const registerUserFetch = async ({ firstName, lastName, email, password }) => {
    const url = `${ API_URL }/api/User/RegisterUser`;

    let result; 

    const userData = {
        firstName,
        lastName,
        userType: "STANDAR_USER",
        email,
        registrationMethod: "MANUAL_AUTH",
        userSecurity: { password }
    }

    try 
    {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if(response.status === 201 || response.status === 400){
            result = await response.json();
        }
        else 
            throw new Error('Error al registrar el usuario');

        return {
            isError: false,
            data: result, 
        };
    } catch (error) {
        return {
            isError: true,
            message: error.message,
        };
    }
};