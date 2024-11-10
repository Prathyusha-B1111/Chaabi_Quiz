import SearchIcon from "../icons/searchIcon";

const SearchInput = () => {
  return (
    <div className="h-[40px] w-full rounded-[20px] bg-slate-200 flex justify-start gap-2 items-center px-3">
      <SearchIcon />
      <input
        type="text"
        className="w-full outline-none bg-transparent text-black"
        placeholder="Search within video"
      />
    </div>
  );
};

export default SearchInput;
