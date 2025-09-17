import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useUrlQuery = (qname) => {
  const search = useLocation().search;
  const q = new URLSearchParams(search).get(qname);
  const [query, setQuery] = useState(false);
  useEffect(() => {
    setQuery(q);
  }, [q]);
  return query;
};

export default useUrlQuery;
