"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    onSearch(searchTerm);
    if (!searchTerm) {
      router.push("/client/identify");
    } else {
      router.push(`/client/identify?search=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm]);

  return (
    <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  );
}

export default Search;
