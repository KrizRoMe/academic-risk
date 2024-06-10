import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isShowUser: boolean;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between gap-2 px-4 py-4 shadow-2 md:px-6 2xl:px-12">
        {/* <!-- Sidebar Toggle Button --> */}
        {props.isShowUser && (
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>
        )}

        {!props.isShowUser && (
          <div className="flex items-center gap-2">
            <>
              <Link href="/">
                <Image
                  className="hidden dark:block"
                  width={60}
                  height={60}
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  priority
                />
                <Image
                  className="block dark:hidden"
                  width={60}
                  height={60}
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  priority
                />
              </Link>
              <h2 className="text-md font-bold text-primary dark:text-white lg:text-xl">
                AcademicRisk
              </h2>
            </>
          </div>
        )}

        {props.isShowUser && (
          <div className="relative z-20 w-30 bg-white dark:bg-form-input sm:w-50 md:w-70">
            <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
              <Image
                width={20}
                height={20}
                src={"/images/header/year.svg"}
                alt="Year"
                priority
              />
            </span>
            <select className="relative z-20 w-full appearance-none rounded border bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ">
              <option value="" className="text-body dark:text-bodydark">
                Seleccionar Año
              </option>
              <option value="1" className="text-body dark:text-bodydark">
                2024
              </option>
              <option value="2" className="text-body dark:text-bodydark">
                2023
              </option>
              <option value="3" className="text-body dark:text-bodydark">
                2022
              </option>
            </select>
            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <Image
                width={20}
                height={20}
                src={"/images/header/select-arrow.svg"}
                alt="Year"
                priority
              />
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          {props.isShowUser && <DropdownUser />}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
