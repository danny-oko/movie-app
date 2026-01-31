"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const Input = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const deboucedValue = (event) => {
    const debouncedVal = debounce(handleChange, 300);
    setSearchTerm(debouncedVal);
  };

  useEffect(() => {
    const query = inputValue.trim();
    if (!query) {
      // setMovies([]);
      return;
    }
  });

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-[260px] p-2 border rounded-lg"
      />
    </div>
  );
};

export default Input;
