import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex mt-5 items-center flex-row justify-center bg-gray-100 border-t shadow text-gray-900 text-sm">
      <div className="mx-3 my-3">
        <Link to="#" className="hover:text-black font-medium">
          Terms
        </Link>
      </div>
      <div className="mx-3 my-3">
        <Link to="#" className="hover:text-black font-medium">
          Privacy
        </Link>
      </div>
      <div className="mx-3 my-3">
        <Link to="#" className="hover:text-black font-medium">
          Help
        </Link>
      </div>
      <div className="mx-3 my-3 text-gray-600">©️2022 The Storynest</div>
    </div>
  );
}

export default Footer;
