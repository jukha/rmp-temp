function SearchProfessorForm() {
  return (
    <form className="flex flex-grow gap-4 items-center">
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Professor name"
      />
      <p>at</p>
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Your School"
      />
    </form>
  );
}

export default SearchProfessorForm;
