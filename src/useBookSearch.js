import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  let cancel;

  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        setError(true);
        if (axios.isCancel) return;
      });

    return () => cancel();
  }, [query, pageNumber]);

  return { loading, books, error, hasMore };
}
