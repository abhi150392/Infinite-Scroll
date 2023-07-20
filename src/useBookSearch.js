import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
  let cancel;
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel) return;
      });

    return () => cancel();
  }, [query, pageNumber]);

  return null;
}
