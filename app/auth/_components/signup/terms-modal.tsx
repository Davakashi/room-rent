"use client";

import React from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TermsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="hover:underline">Үйлчилгээний нөхцөл</p>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-gray-600">
          <p>
            Welcome to EZ Learn. These Terms and Conditions outline the rules and regulations for the use of our website
            and services.
          </p>

          <h2 className="text-xl font-semibold">1. License</h2>
          <p>
            Unless otherwise stated, EZ Learn owns the intellectual property rights for all material on the site. All
            intellectual property rights are reserved.
          </p>

          <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
          <p>
            You must not use this website in any way that is damaging, unlawful, or causes harm to the website or any
            person or business entity.
          </p>

          <h2 className="text-xl font-semibold">3. Changes to Terms</h2>
          <p>
            We may revise these terms of service for our website at any time without notice. By using this website you
            are agreeing to be bound by the then-current version.
          </p>

          <p className="text-gray-500 text-sm">Last updated: April 2025</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
