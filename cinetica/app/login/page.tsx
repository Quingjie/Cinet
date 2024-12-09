"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

// Composants UI
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

// Import des assets
import Logo from "../logo.webp";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("L'adresse e-mail ou le mot de passe est incorrect");
      } else {
        window.location.href = "./menu";
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <Card className="w-[350px] shadow">
      <CardHeader className="flex justify-center items-center">
        <Image
          src={Logo}
          alt="Logo Cinetica"
          className="w-24 h-24 items-center rounded-full"
        />
        <CardTitle className="flex justify-center text-3xl font-anton">
          Cinetica
        </CardTitle>
        <CardDescription className="flex justify-center">
          Connexion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 text-[#3E1212]">
              <Label htmlFor="email">E-mail</Label>
              <Input
                className="bg-[#C9C9C9] rounded-full"
                id="email"
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 text-[#3E1212]">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                className="bg-[#C9C9C9] rounded-full"
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
          <CardFooter className="flex justify-center mt-5">
            <Button 
              className="bg-[#8E8FC3] rounded-full text-[#000000]" 
              type="submit"
            >
              Connexion
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}