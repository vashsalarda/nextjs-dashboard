"use client";

import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/(ui)/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/lib/customers";
import Swal from "sweetalert2";
import React from "react";

export default function Form() {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      width: 300,
      padding: 24,
      text: "Processing...",
      background: "rgba(0,0,0,0.7)",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await createCustomer({
      name,
      email,
    }).then(async (res) => {
      setLoading(false);
      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: res?.error?.error ?? "Login error",
          text: res?.error?.message ?? "Invalid email or Password",
        });
      } else {
        Swal.close();
        setLoading(false);
        router.refresh();
        router.push("/dashboard/customers");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm font-medium"
          >
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="name"
                type="text"
                step="0.01"
                placeholder="Enter Customer Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-describedby="customer-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                step="0.01"
                placeholder="Enter Customer Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-describedby="customer-error"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
