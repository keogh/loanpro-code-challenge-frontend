import * as React from "react";
import {Link} from "react-router-dom";

const RecordDetails = () => {
  return (
    <>
      <h1 className="text-2xl mb-8">Record Details</h1>
      <Link className="text-blue-700 font-bold" to="/records">
        Back to Records List
      </Link>
    </>
  );
};

export default RecordDetails;
