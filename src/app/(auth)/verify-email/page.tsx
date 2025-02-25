"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>We&apos;ve sent you a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please click the link in your email to verify your account. If you don&apos;t see the email, check your spam
            folder.
          </p>
          <div className="flex justify-center">
            <Link href="/login">
              <Button variant="outline">Return to login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
