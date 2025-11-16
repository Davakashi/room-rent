import React from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

// import { googleLogin } from "../../_lib/auth";

const GoogleLoginButton = () => {
  return (
    <Button
      type="button"
      className="py-6 flex items-center gap-4 rounded-full"
      variant="outline" /*onClick={googleLogin}*/
    >
      <FcGoogle size={20} />
      Google-ээр нэвтрэх
    </Button>
  );
};

export default GoogleLoginButton;
