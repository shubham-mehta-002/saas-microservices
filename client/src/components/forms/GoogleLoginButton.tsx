"use client";

export function GoogleLoginButton() {
    const handleGoogleLogin = () => {
        window.location.href =
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full border px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
        <img src="/google.svg" alt="google" className="w-5 h-5" />
        Continue with Google
    </button>
  );
}
