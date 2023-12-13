import Button from "../ui/Button";

function Home() {
  return (
    <main>
      <section className="flex h-[500px] flex-col items-center justify-center bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('/assets/man-reading-book.ec0041cf.jpeg')] bg-cover bg-center">
        <h2 className="mb-10 text-4xl text-white">
          Enter your <b>company</b> to get started
        </h2>
        <form className="relative flex w-full max-w-xl items-center text-xl">
          <input
            type="text"
            placeholder="Your Company"
            className="w-full rounded-3xl px-12 py-4"
          />
          <i className="pi pi-building absolute left-4 bg-white text-2xl"></i>
        </form>
      </section>
      <section className="container mx-auto px-4 py-40 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-primary">
          Join the RMP Family
        </h2>
        <h4 className="text-2xl">Love RMP? Let's make it official.</h4>
        <div className="my-20 grid grid-cols-3 justify-center">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-2/3"
              src="/assets/instructional-slide-pencil-lady.492f2289.svg"
            />
            <h5 className="mt-5 max-w-[300px] text-xl font-bold">
              Manage and edit your ratings
            </h5>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-2/3"
              src="/assets/instructional-slide-mystery-lady.bf022e31.svg"
            />
            <h5 className="mt-5 max-w-[300px] text-xl font-bold">
              Your ratings are always anonymous
            </h5>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-2/3"
              src="/assets/instructional-slide-thumb-war.e03fdb37.svg"
            />
            <h5 className="mt-5 max-w-[300px] text-xl font-bold">
              Like or dislike ratings
            </h5>
          </div>
        </div>
        <div className="mx-auto max-w-max">
          <Button text="Sign Up" type="primary" to="/signup" />
        </div>
      </section>
    </main>
  );
}

export default Home;
