import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("query");

  return (
    <div className="p-6 text-xl dark:text-white">
      Showing results for: <strong>{q}</strong>
    </div>
  );
};

export default Search;