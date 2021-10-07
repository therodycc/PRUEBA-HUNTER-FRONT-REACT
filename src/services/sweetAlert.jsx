import Swal from "sweetalert2";

class sweetAlertService  {
   sweetAdded(){
    Swal.fire({
      title: "Added!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  sweetUpdated = () => {
    Swal.fire({
      title: "Actualizado!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  sweetQuestionDelete = async () => {
    return Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => result.isConfirmed);
  };

  sweetDeleted = () => {
    Swal.fire({
      title: "Deleted!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  sweetError = (error) => {
    Swal.fire({
      title: error,
      text: `Digite correctamente sus datos`,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  exitsUser = () => {
    Swal.fire({
      title: "YA EXISTE ESTE USUARIO!",
      text: `Usuario existente`,
      icon: "warning",
      showConfirmButton: false,
    });
  };

  fillInFields = () => {
    Swal.fire({
      title: "POR FAVOR LLENE LOS CAMPOS!",
      icon: "warning",
      showConfirmButton: false,
    });
  };

};

const sweetAlertSvc = new sweetAlertService()
export default sweetAlertSvc
