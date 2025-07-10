"use client";
import { Title } from "@/components/title";
import { Subtitle } from "@/components/subtitle";

export const H1 = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-5 flex justify-center first:mt-0">
    <Title noAnim noDecoration className="p-2 text-center text-3xl">
      {children}
    </Title>
  </div>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <Subtitle noAnim className="mt-5 mb-1 text-lg first:mt-0 sm:text-lg">
    {children}
  </Subtitle>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-5 text-center text-2xl font-black first:mt-0">
    {children}
  </h2>
);

export const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mt-5 text-center text-2xl font-thin italic first:mt-0">
    {children}
  </h4>
);

export const H5 = ({ children }: { children: React.ReactNode }) => (
  <h5 className="mt-5 text-center text-xl font-thin first:mt-0">{children}</h5>
);

export const H6 = ({ children }: { children: React.ReactNode }) => (
  <h6 className="text-md mt-5 text-center font-black first:mt-0">{children}</h6>
);
