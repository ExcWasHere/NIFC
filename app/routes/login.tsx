import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, MetaFunction, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/session.server";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | Login" },
    { name: "description", content: "Welcome to Sembiru!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/dashboard");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: { email?: string; password?: string } = {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.email = "Email tidak valid";
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.password = "Password minimal 6 karakter";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  if (email === "admin@sembiru.com" && password === "password") {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", "1");
    session.set("userEmail", email);
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({
    errors: { email: "Email atau password salah", password: undefined }
  }, { status: 400 });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const unauthorized = searchParams.get("unauthorized");
  const [showPopup, setShowPopup] = useState(!!unauthorized);

  useEffect(() => {
    if (unauthorized) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        window.history.replaceState({}, document.title, "/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [unauthorized]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-blue-100 relative">
      {showPopup && (
        <div className="fixed top-5 right-5 z-50 bg-sky-100 border border-sky-300 text-sky-800 px-4 py-3 rounded-lg shadow-lg transform opacity-0 animate-[fade-slide-right_0.4s_ease-out_forwards]">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 001 1h2a1 1 0 100-2h-1zm-1 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <span>Maaf, login dulu yuk!</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-white p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-sky-900">Sembiru</h2>
            <p className="text-sky-700 mt-2">Masuk untuk melanjutkan perjalanan kesehatan mental Anda.</p>
          </div>
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sky-800">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.email && (
                <span className="text-sm text-red-600">{actionData.errors.email}</span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-sky-800">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.password && (
                <span className="text-sm text-red-600">{actionData.errors.password}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 border-sky-300 rounded focus:ring-sky-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-sky-700">Ingat Saya</label>
              </div>
              <div>
                <Link to="/forgot-password" className="text-sm text-sky-600 hover:text-sky-800">Lupa Password?</Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-sky-700">
                Belum memiliki akun?{" "}
                <Link to="/register" className="font-medium text-sky-600 hover:text-sky-800">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </Form>
        </div>
        <div className="hidden lg:block bg-gradient-to-br from-sky-300 to-blue-300 p-10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <img src="/favicon.ico" alt="Sembiru Logo" className="h-24 w-24 mx-auto mb-6 opacity-90" />
              <h3 className="mt-6 text-2xl font-bold text-white">Hai! Selamat Datang Kembali</h3>
              <p className="mt-2 text-white text-opacity-90">Peduli kesehatan mental Anda bersama Sembiru.</p>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-200 opacity-50"></div>
          <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-sky-200 opacity-50"></div>
          <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-cyan-200 opacity-50"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-slide-right {
            0% {
              opacity: 0;
              transform: translateX(20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-\\[fade-slide-right_0\\.4s_ease-out_forwards\\] {
            animation: fade-slide-right 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
