"use client";
import { Title } from "@/components/title";
import { Subtitle } from "@/components/subtitle";

export const H1 = ({ children }: { children: React.ReactNode }) => (
  <Title className="my-5 inline-block p-2 text-center text-3xl">
    {children}
  </Title>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-black">{children}</h3>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <Subtitle className="inline-block">{children}</Subtitle>
);

export const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-2xl font-thin italic">{children}</h4>
);

export const H5 = ({ children }: { children: React.ReactNode }) => (
  <h5 className="text-xl font-thin">{children}</h5>
);

export const H6 = ({ children }: { children: React.ReactNode }) => (
  <h6 className="text-md font-black">{children}</h6>
);
