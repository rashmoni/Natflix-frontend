// MPM packages
import { FormEvent } from "react";

// Project files
import { useModal } from "state/ModalContext";

interface iProps {
  endPoint: string;
  id: number;
}

export default function FormDelete({ endPoint, id }: iProps) {
  // Global state
  const { setModal } = useModal();


    //Properties
    const METHOD = "DELETE"
    const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("sending data to the server");

    fetch('http://localhost:8080/api/content/detele/'+id, { method: 'DELETE' })
    .then((response) => onSuccess(response))
    .catch((error)=>onFailure(error));
  }

  function onSuccess(response: any) {
    alert("Item deleted!" + response);
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not delete item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Delete information</h2>
      <p>
        Are you sure that you want to delete this item? This action cannot be
        reverted.
      </p>
      <hr />
      <button className="button-gray">Delete</button>
      <button className="button-gray" onClick={() => setModal(null)}>
        Keep
      </button>
    </form>
  );
}
function then(arg0: (response: any) => any) {
  throw new Error("Function not implemented.");
}

