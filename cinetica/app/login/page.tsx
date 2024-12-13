//app/login/page.tsx
"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importer useRouter
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
import Logo from "../logo1.jpg";
import localFont from "next/font/local";
const anton = localFont({
  src: "../fonts/Anton,Antonio/Anton/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Gestion de l'état de chargement
  const router = useRouter(); // Initialisation de useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);  // Démarrer le chargement

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        console.error(res.error);  // Log l'erreur pour le debug
        setError("L'adresse e-mail ou le mot de passe est incorrect");
      } else {
        router.push("/menu");  // Redirection vers la page menu
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  return (
    <Card className="w-[350px] shadow 
      bg-white
      border-gray-300   
      dark:bg-gray-800     
      dark:border-gray-500
    ">
      <CardHeader className="flex justify-center items-center">
        <Image
          src={Logo}
          alt="Logo Cinetica"
          className="w-24 h-24 items-center rounded-full"
        />
        <CardTitle className={`flex justify-center text-3xl ${anton.className}
          text-black
          dark:text-white
        `}>
          Cinetica
        </CardTitle>
        <CardDescription className="
          text-gray-700
          dark:text-gray-300
        ">
          Connexion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 text-black dark:text-white">
              <Label htmlFor="email">E-mail</Label>
              <Input
                className="bg-[#E8F0FD] rounded-full border-gray-300 dark:bg-[#2f3e52] dark:text-[#8E8FC3] dark:border-gray-600"
                id="email"
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5 text-black dark:text-white">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                className="bg-[#E8F0FD] rounded-full border-gray-300 dark:bg-[#2f3e52] dark:text-[#8E8FC3] dark:border-gray-600"
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ WebkitTextFillColor: "unset" }}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
          <CardFooter className="flex justify-center mt-5">
            <Button 
              className="bg-[#8E8FC3] rounded-full text-white dark:text-black hover:bg-black dark:hover:bg-white" 
              type="submit"
              disabled={loading}  // Désactivation du bouton pendant le chargement
            >
              {loading ? "Chargement..." : "Connexion"}  {/* Affichage de l'état de chargement */}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
