import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 items-start justify-center">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-lg rounded-xl p-6",
            headerTitle: "text-xl font-bold text-center",
            formButtonPrimary: "bg-slate-600 hover:bg-slate-700",
            formButtonSecondary: "bg-gray-300 hover:bg-gray-400",
            footerActionLink: "text-blue-600 hover:underline",
            footerActionText: "text-gray-600",
            socialButtonsBlockButtonIconContainer:
              "bg-blue-500 hover:bg-blue-600",
          },
        }}
        signUpUrl="/sign-up"
      />

      <div className="text-sm text-white flex flex-col items-center justify-start w-full">
        <p>¿Quieres probar sin registrarte? </p>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-light">
            <i className="text-xs fa-solid fa-envelope mr-1"></i> demo@demo.com
          </p>
          <p className="font-light">
            <i className="text-xs fa-solid fa-key mr-1"></i> laescuelita25
          </p>
        </div>
      </div>
    </div>
  );
}
