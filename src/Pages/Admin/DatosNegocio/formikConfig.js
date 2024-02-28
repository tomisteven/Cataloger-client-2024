export function initialValues(user) {

    return {
        nameShop: "" || user.nameShop,
        description: "" || user.description,
        slogan: "" || user.slogan,
        fracePresentacion: "" || user.fracePresentacion,
        ubicacion: "" || user.ubicacion,
        celular: "" || user.celular,
    }
}