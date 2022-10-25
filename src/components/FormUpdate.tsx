// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { generateFields } from "scripts/formUtilities";
import { useModal } from "state/ModalContext";

interface iProps {
  endPoint: string;
  fields: Array<any>;
  data: any;
}

export default function FormUpdate({ endPoint, fields, data }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  const [form, setForm] = useState(generateFields(fields, data));

  //Properties
  const METHOD = "PUT"
  const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const editedItem = { ...form,  id: data.id };
  

    console.log("sending data to the server", editedItem);

    event.preventDefault();

    
    fetch('http://localhost:8080/api/content/update/',{
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(editedItem),
     })
     .then((response) => onSuccess(response))
     .catch((error)=>onFailure(error));
  }

  function onSuccess(response: any) {
    alert(response);
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not edit item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>New information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button className="button-gray">Update</button>
      <button className="button-gray" onClick={() => setModal(null)}>
        Cancel
      </button>
    </form>
  );
}
