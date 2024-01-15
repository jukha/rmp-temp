import SearchCompanyForm from "../components/header/SearchCompanyForm";
import Button from "../ui/Button";

function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('/assets/teamwork-3213924_1280.jpg')] bg-cover bg-center px-4 py-60">
        <h2 className="mb-10 text-3xl text-white lg:text-4xl">
          Enter your <b>company</b> to get started
        </h2>
        <div className="w-full max-w-xl">
          <SearchCompanyForm />
        </div>
      </section>
      {/* <section className="container mx-auto px-4 py-40 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-primary lg:text-4xl">
          Join the RMP Family
        </h2>
        <h4 className="text-xl lg:text-2xl">
          Love RMP? Let's make it official.
        </h4>
        <div className="my-20 grid justify-center gap-10 lg:grid-cols-3">
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
      </section> */}
    </main>
  );
}

export default Home;
