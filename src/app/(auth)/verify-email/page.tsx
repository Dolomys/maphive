import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Vérifier votre email</CardTitle>
          <CardDescription>Nous avons envoyé un lien de vérification à votre adresse email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Veuillez cliquer sur le lien dans votre email pour vérifier votre compte. Si vous ne voyez pas l&apos;email,
            vérifiez votre dossier spam.
          </p>
          <div className="flex justify-center">
            <Link href="/login">
              <Button variant="outline">Retour à la connexion</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
