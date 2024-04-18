import * as React from 'react';
import RecordForm from "./RecordForm";
import {Link} from "react-router-dom";

const RecordNew = () => {
  return (
    <>
      <h1 className="text-2xl mb-8">New Arithmetic Operation</h1>
      <div className="mb-4">
        <Link
          className="text-blue-700 font-bold text-sm"
          to="/records"
        >
          &lt; Back to Records List
        </Link>
      </div>
      <RecordForm/>
    </>
  );
}

export default RecordNew;
