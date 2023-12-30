function LoadMoreBtn({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-primary px-4 py-2 text-white"
    >
      {loading ? "Loading..." : "Load More"}
    </button>
  );
}

export default LoadMoreBtn;
