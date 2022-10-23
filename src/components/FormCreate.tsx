// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { useModal } from "state/ModalContext";

interface iProps {
  endPoint: string;
  fields: Array<any>;
}

export default function FormUpdate({ endPoint, fields }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  const [form, setForm] = useState({});

    //Properties
    const METHOD = "POST"
    const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("sending data to the server", form);

    fetch('http://localhost:8080/api/create/', {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(form),
     })
    .then((response) => response)
    .then((result) => onSuccess(result))
    .catch((error)=>onFailure(error));
}


  function onSuccess(response: any) {
    alert("Item created!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not create item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Update information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button className="button-gray">Create</button>
      <button className="button-gray" onClick={() => setModal(null)}>
        Cancel
      </button>
    </form>
  );
}
