import React, { useState, useEffect } from "react";
import http from "../../axios";
import { FadeLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function Details() {
  const [books, setBooks] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      http
        .get(`/books/${id}`)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      {loading && <FadeLoader className="mx-auto mt-3"></FadeLoader>}{" "}
      <h2 className="flex m-5 justify-center  mx-auto font-bold text-4xl ">
        {books.title}
      </h2>
      <div className="container flex m-10 gap-10 items-center justify-center ">
        {" "}
        <div>
          {" "}
          <img
            className="w-full  h-auto object-cover rounded-md shadow-md "
            src={books.thumbnailUrl}
            alt={books.title}
          />{" "}
          <p className="font-semibold">{books.authors}</p>
        </div>
        <div>
          {" "}
          <p className="max-w-2xl font-sans font-semibold py-4">
            {books.longDescription}
          </p>
          <p className="text-gray-800">Categories: {books.categories}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
