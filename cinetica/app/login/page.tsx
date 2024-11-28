"use client";
import * as React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Logo from "../logo.webp";
import localFont from "next/font/local";

const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf", // Chemin corrigé
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function CardWithForm() {
  const [erreur, setErreur] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setErreur("L'adresse e-mail ou le mot de passe est incorrect");
    } else {
      window.location.href = "./menu"; // Rediriger après connexion réussie
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px] shadow">
        <CardHeader className="flex justify-center items-center">
          <Image
            src={Logo}
            alt="Logo"
            className="w-24 h-24 items-center rounded-full"
          />
          <CardTitle className={`flex justify-center text-3xl ${anton.className}`}>
            Cinetica
          </CardTitle>
          <CardDescription className="flex justify-center">Connexion</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 text-[#3E1212]">
                <Label htmlFor="email">E-mail Address</Label>
                <Input
                  className="bg-[#C9C9C9] rounded-full"
                  id="email"
                  type="email"
                  placeholder="Your e-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-[#3E1212]">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="bg-[#C9C9C9] rounded-full"
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {erreur && <div className="text-red-500 text-sm">{erreur}</div>}
            </div>
            <CardFooter className="flex justify-center mt-5">
              <Button className="bg-[#8E8FC3] rounded-full text-[#000000]" type="submit">
                Log in
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
