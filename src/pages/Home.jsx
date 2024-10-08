import React, { useEffect, useRef, useState } from "react";
import http from "../../axios";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Home() {
  const [book, setBook] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const minRef = useRef();
  const maxRef = useRef();
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = () => {
      setLoader(true);
      http
        .get("/books")
        .then((response) => {
          setBook(response.data);
          setFilteredBooks(response.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoader(false);
        });
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    const filteredBooks = book.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
  }, [search, book]);

  function handleFilter() {
    let copied = [...book];

    if (minRef.current.value) {
      const minValue = Number(minRef.current.value);
      copied = copied.filter((value) => value.pageCount >= minValue);
    }

    if (maxRef.current.value) {
      const maxValue = Number(maxRef.current.value);
      copied = copied.filter((value) => value.pageCount <= maxValue);
    }

    setFilteredBooks(copied);
  }

  function handleClick(id) {
    navigate(`/books/${id}`);
  }

  return (
    <div className="container p-4">
      {loader && (
        <p className="flex justify-center">
          <FadeLoader />
        </p>
      )}
      <div className="flex gap-3 justify-between mr-20 mb-5">
        <input
          type="text"
          placeholder="Search book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 p-2 rounded-md ml-20 mb-4 w-1/3"
        />
        <div className="flex gap-3">
          <input
            ref={minRef}
            className="border border-gray-400 p-2 rounded-md h-10"
            type="number"
            placeholder="Min..."
          />
          <input
            ref={maxRef}
            className="border border-gray-400 p-2 rounded-md h-10"
            type="number"
            placeholder="Max..."
          />
          <button
            className="p-2 border-none bg-blue-500 rounded-md h-10 text-white w-28"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center">
        {filteredBooks.map((book) => (
          <div
            className="flex flex-col items-center border rounded-md shadow-md p-4 m-2 cursor-pointer hover:shadow-lg transition-all duration-300 w-64"
            key={book.id}
            onClick={() => handleClick(book.id)}
          >
            <img
              src={book.thumbnailUrl}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">
              {book.title}
            </h3>
            <div className="text-gray-700">
              <span className="block mb-1">Pages: {book.pageCount}</span>
              <ul className="list-disc pl-5 mb-2">
                {book.authors?.map((author, index) => (
                  <li key={index}>{author}</li>
                ))}
              </ul>
              <ul className="list-disc pl-5">
                {book.categories?.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
