export class ProductosAPI{

    async getProducts(token){
        const response = await fetch(`http://localhost:8080/product`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" :  token
            }
        });
        const result = await response.json();
        //console.log(result);
        return result;
    }

    async getProduct(id){
        const response = await fetch(`http://localhost:8080/products/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        //console.log(result);
        return result;
    }


    async updateProduct(token, data){
        const response = await fetch(`http://localhost:8080/products`,{
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


    async deleteProduct(token, id){
        const response = await fetch(`http://localhost:8080/product/delete/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const result = await response.json();
        return result;
    }



    async createProduct(token, data){
        const response = await fetch(`http://localhost:8080/product/create`,{
            method: 'POST',
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