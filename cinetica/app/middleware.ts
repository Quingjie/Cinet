import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Vérifie si un token existe pour autoriser l'utilisateur
      return !!token;
    },
  },
  pages: {
    signIn: "/login",  // Redirection vers /login si l'utilisateur n'est pas authentifié
    error: "/error",   // (Optionnel) Redirection vers une page d'erreur en cas de problème
  },
});

// Protéger des routes spécifiques (ajoute cette configuration)
export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"], // Routes protégées
};
