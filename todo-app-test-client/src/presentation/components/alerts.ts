import Swal from "sweetalert2"

export const SweetAlertError = (text?: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        html: text ? text : "Ocurrió un error al procesar la solicitud",
        confirmButtonColor: "#003876"
    })
}

export const SweetAlertWarning = (text: string) => {
    return Swal.fire({
        icon: 'warning',
        title: 'Aviso',
        text: text,
        confirmButtonColor: "#003876"
    })
}

export const SweetAlertSuccess = (text?: string) => {
    return Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: text ? text : "Proceso realizado correctamente",
        confirmButtonColor: "#003876"
    })
}
