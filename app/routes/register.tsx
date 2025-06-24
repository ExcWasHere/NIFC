import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  MetaFunction,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { commitSession, getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sembiru | Register" },
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
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("password_confirmation");

  const errors: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  } = {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter";
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.email = "Email tidak valid";
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.password = "Password minimal 6 karakter";
  }

  if (password !== passwordConfirmation) {
    errors.password_confirmation = "Konfirmasi password tidak cocok";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    return json({ errors: { email: data.error } }, { status: 400 });
  }

  const user = await response.json();
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id.toString());
  session.set("userEmail", user.email);
  session.set("userName", user.name);
  return redirect("/dashboard", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-blue-100">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-xl">
        {/* Left panel - Form */}
        <div className="bg-white p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-sky-900">Sembiru</h2>
            <p className="text-sky-700 mt-2">
              Daftar untuk memulai perjalanan kesehatan mental Anda.
            </p>
          </div>

          <Form method="post" className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-sky-800"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.name && (
                <span className="text-sm text-red-600">
                  {actionData.errors.name}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sky-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.email && (
                <span className="text-sm text-red-600">
                  {actionData.errors.email}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sky-800"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.password && (
                <span className="text-sm text-red-600">
                  {actionData.errors.password}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password-confirm"
                className="block text-sm font-medium text-sky-800"
              >
                Konfirmasi Password
              </label>
              <input
                id="password-confirm"
                type="password"
                name="password_confirmation"
                required
                className="mt-1 w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              {actionData?.errors?.password_confirmation && (
                <span className="text-sm text-red-600">
                  {actionData.errors.password_confirmation}
                </span>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? "Memproses..." : "Daftar"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-sky-700">
                Sudah memiliki akun?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-600 hover:text-sky-800"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </Form>
        </div>

        {/* Right panel - Illustration */}
        <div className="hidden lg:block bg-gradient-to-br from-sky-300 to-blue-300 p-10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Logo Sembiru */}
            <div className="text-center z-10">
              <img
                src="/favicon.ico"
                alt="Sembiru Logo"
                className="h-24 w-24 mx-auto mb-6 opacity-90"
              />
              <h3 className="mt-6 text-2xl font-bold text-white">
                Hai! Selamat Datang
              </h3>
              <p className="mt-2 text-white text-opacity-90">
                Ayo Peduli akan Kesehatan Mental Anda Bersama Sembiru!
              </p>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-200 opacity-50"></div>
          <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-sky-200 opacity-50"></div>
          <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-cyan-200 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
