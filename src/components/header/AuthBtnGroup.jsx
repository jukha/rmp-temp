import Button from "../../ui/Button";

function AuthBtnGroup() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Button text="Log In" to="/login" />
      </div>
      <div>
        <Button text="Sign Up" type="primary" to="/signup" />
      </div>
    </div>
  );
}

export default AuthBtnGroup;
