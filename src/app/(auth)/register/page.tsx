"use client";

export default function RegisterPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const { signUp, isSigningUp, signUpError } = useAuth();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   signUp({ email, password, name });
  // };

  // removed for the moment

  return <p>Register</p>;

  // return (
  //   <div className="flex min-h-screen items-center justify-center">
  //     <Card className="w-[400px]">
  //       <CardHeader>
  //         <CardTitle>Create an account</CardTitle>
  //         <CardDescription>Enter your details to create your account</CardDescription>
  //       </CardHeader>
  //       <form onSubmit={handleSubmit}>
  //         <CardContent className="space-y-4">
  //           <div className="space-y-2">
  //             <label htmlFor="name" className="text-sm font-medium">
  //               Full Name
  //             </label>
  //             <Input
  //               id="name"
  //               type="text"
  //               placeholder="Enter your full name"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="space-y-2">
  //             <label htmlFor="email" className="text-sm font-medium">
  //               Email
  //             </label>
  //             <Input
  //               id="email"
  //               type="email"
  //               placeholder="Enter your email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="space-y-2">
  //             <label htmlFor="password" className="text-sm font-medium">
  //               Password
  //             </label>
  //             <Input
  //               id="password"
  //               type="password"
  //               placeholder="Create a password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //           </div>
  //           {signUpError && <p className="text-sm text-red-500">{signUpError.message}</p>}
  //         </CardContent>
  //         <CardFooter className="flex flex-col space-y-4">
  //           <Button type="submit" className="w-full" disabled={isSigningUp}>
  //             {isSigningUp ? "Creating account..." : "Create account"}
  //           </Button>
  //           <p className="text-sm text-center">
  //             Already have an account?{" "}
  //             <Link href="/login" className="text-primary hover:underline">
  //               Sign in
  //             </Link>
  //           </p>
  //         </CardFooter>
  //       </form>
  //     </Card>
  //   </div>
  // );
}
