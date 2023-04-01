import { useSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditSet = (prop) => {
  const location = useLocation();
  const [id, setId] = useState(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));

  useEffect(() => {
    axios
      .get(`http://localhost:3001/edit-set?id=${id}`)
      .then((response) => console.log(response.data));
    console.log(id);
  }, []);

  return (
    <div>
      <p>Current id is: {id}</p>
    </div>
  );
};

export default EditSet;
