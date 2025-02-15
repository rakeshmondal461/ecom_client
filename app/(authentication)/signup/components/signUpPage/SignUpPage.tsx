import { cn } from "@/lib/utils";
import SignUpSection from "../signUpSection/SignUpSection";

const SignupPage = () => {
  return (
    <div className={cn(`w-full h-full`)}>
      <div>
        <SignUpSection />
      </div>
    </div>
  );
};

export default SignupPage;
