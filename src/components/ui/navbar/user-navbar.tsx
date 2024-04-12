import { logout } from '@/libs/auth';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useTransition } from 'react'
import Swal from 'sweetalert2';
import { Button } from "@nextui-org/react";
import { UserData } from '@/libs/types';
import Link from 'next/link';

export function UserNavbar({
    userdata
} : {
    userdata : UserData
}){
    const [isLoading, startTransition] = useTransition();
    const hdlLogout = async () => {
    startTransition(() => {
        Swal.fire({
        title: 'Warning!',
        text: 'คุณแน่ใจที่จะออกจากระบบ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ออกจากระบบ'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: `ไว้เจอกันนะ`,
          });
          logout();
        }
      });
		});
  }

    return (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {/* สวัสดี {JSON.stringify(userdata, null, 2)} */}
              Hello {userdata.email} <br />
              credits {userdata.credits} baht
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Account settings
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                      href="/topup"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      เติมเงิน
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                      href="/inventory"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      ช่องเก็บของ
                    </a>
                </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                      <Button
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm w-full hover:bg-gray-100"
                        onClick={hdlLogout} isLoading={isLoading}
                      >
                        Sign out
                      </Button>
                  </Menu.Item>
                  </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )
    
}

export function GuestNavBar() {
    return(
        <>
        <li><Link href="/auth/sign-in"><Button className="text-white" color="secondary">Sign in</Button></Link></li>
        <li><Link href="/auth/sign-up"><Button className="text-white" color="secondary">Sign up</Button></Link></li>
        </>
    )
}