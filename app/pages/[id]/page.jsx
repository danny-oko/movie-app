"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import Credits from "../../../components/ui/Credits";

export default async function Page({ params }) {
  

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [movData, setMovData] = useState(null);

  // if (loading) return <div className="container">Loading...</div>;
  // if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <Credits id={params.id} />
    </div>
  );
}
