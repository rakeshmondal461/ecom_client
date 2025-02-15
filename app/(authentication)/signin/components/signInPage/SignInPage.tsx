import { cn } from "@/lib/utils";
import SignInSection from "../signInSection/SignInSection";

const SignInPage = () => {
  return (
    <div className={cn(`w-full h-full `)}>
      <div>
        <SignInSection />
      </div>
    </div>
  );
};

export default SignInPage;
