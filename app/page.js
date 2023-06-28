import SignIn from "@/components/sign-in/signin.component";
import SignUp from "@/components/sign-up/signup.component";
import TodoApp from "@/components/todo-app/todoapp.component";

export default function Home() {
  return (
    <div className="flex justify-between p-10 items-center">
      <div className="flex flex-col gap-8">
        <h2>Are You Already have Account, please SignIn</h2>
        <SignIn />
      </div>
      <div>
        <h2>If You Don't have Account, please SignUp</h2>
        <SignUp />
      </div>
      {/* <TodoApp /> */}
    </div>
  );
}
