import SignIn from "@/components/sign-in/signin.component";

export default function Home() {
  return (
    <div className="flex justify-center p-10 items-center">
      <div className="flex flex-col gap-8">
        <h2>Are You Already have Account, SignIn if not please SignUp</h2>
        <SignIn />
      </div>
    </div>
  );
}
