export class User{

    url = `http://localhost:8080/`;


    async getUser(token){
        //console.log(token);
        const response = await fetch(`${this.url}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const result = await response.json();
        return result;
    }

    async getUserId(id){
        const response = await fetch(`${this.url}c/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        //console.log(result);
        return result;
    }


    async updatePersonalData(token, data){
        const response = await fetch(`${this.url}update/user`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }


    async update(token, data){
        console.log(data);
        const response = await fetch(`${this.url}update`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }




}