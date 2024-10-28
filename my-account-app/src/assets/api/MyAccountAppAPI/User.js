const API_URL = 'http://localhost:5215/api/User';

export const RegisterUserApi = async ({ firstName, lastName, email, password }) => {
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
        const response = await fetch(`${ API_URL }/RegisterUser`, {
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