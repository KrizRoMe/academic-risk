"use client"

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ResetPasswordVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleResetPasswordVerifiySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const verificationCode = Array.from(formData.values()).join('');
    const username = searchParams.get('username');

    if(!username) return;

    const response = await fetch('/api/auth/reset-password-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verificationCode, username }),
    });

    if (response.ok) {
      router.push(`/auth/update-password?username=${username}`);
    }
    else{
      alert('Código de verificación incorrecto')
    }
  }

  const handleResendVerificationCode = async () => {
    const username = searchParams.get('username');

    if(!username) return;

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      alert('Código de verificación reenviado')
    }
    else{
      alert('Error al reenviar el código de verificación')
    }
  }

  return (
    <div className="overflow-hidden px-4 dark:bg-boxdark-2 sm:px-8">
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <Link href="/" className="mx-auto mb-10 inline-flex">
                <Image
                  alt="Logo"
                  width={176}
                  height={32}
                  src="/images/logo/logo-dark.svg"
                  className="dark:hidden"
                />
                <Image
                  alt="Logo"
                  width={176}
                  height={32}
                  src="/images/logo/logo.svg"
                  className="hidden dark:block"
                />
              </Link>
              <div className="rounded-xl bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">
                  Verificar Usuario
                </h1>
                <p className="mb-7.5 font-medium">
                  Ingrese el código de verificación que enviamos a su teléfono
                </p>
                <form onSubmit={handleResetPasswordVerifiySubmit}>
                  <div className="flex items-center gap-4.5 mb-5">
                    <input
                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      maxLength={1}
                      required
                      name="verificationCode1"
                    />
                    <input
                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      maxLength={1}
                      required
                      name="verificationCode2"
                    />
                    <input
                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      maxLength={1}
                      required
                      name="verificationCode3"
                    />
                    <input
                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      maxLength={1}
                      required
                      name="verificationCode4"
                    />
                  </div>
                  <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">
                    No recibiste el código? {' '}
                    <button type="button" className="text-primary" onClick={() => handleResendVerificationCode()}>Reenviar</button>
                  </p>
                  <button className="flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90" type="submit">
                    Verificar
                  </button>
                  <span className="mt-5 block text-red">
                  ¡No compartas tu código de verificación con nadie!
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordVerifyPage
