
// Node modules
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Project files
import NavigationBarAdmin from "components/NavigationBarAdmin";
import InputField from "components/InputField";
import StatusError from "components/StatusError";
import StatusLoading from "components/StatusLoading";
import Fields from "data/fields-details-other.json";
import eStatus from "interfaces/eStatus";

export default function AdminDetailsOther() {
  // Global state
  const { code } = useParams();

  // Local state
  const [status, setStatus] = useState(eStatus.LOADING);
  const [data, setData] = useState("");



  // Properties
  const endPoint1: string = "http://localhost:8080/content/details/"+code;
  const endPoint2: string = "http://localhost:8080/content/details/";
  const METHOD = "PUT"
  const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  useEffect(() => {
    fetch(endPoint1)
    .then ((response) => response.json())
    .then((result) => onSuccess(result))
    .catch((error) => onFailure(error));
}, []);

  function onSuccess(data: any) {
    setData(data);
    setStatus(eStatus.READY);
  }

  function onFailure(error: string) {
    console.error(error);
    setStatus(eStatus.ERROR);
  }

  function onSubmit(event: FormEvent) {

    event.preventDefault();

    fetch(endPoint2+"update/",{
      method: METHOD,
      headers: HEADERS, 
      body: JSON.stringify(data),
     })
     .then((response) => onSuccess(response))
     .catch((error)=>onFailure(error));
  }
    

  // Safeguards
  if (status === eStatus.LOADING) return <StatusLoading />;
  if (status === eStatus.ERROR) return <StatusError />;

  return (
    <div id="admin-detail-others" className="admin-pages">
      <NavigationBarAdmin />
      <header>
        <h1>Admin details</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <InputField field={Fields} state={[data, setData]} />
          <hr />
          <button>Save</button>
        </form>
      </header>
    </div>
  );
}
