import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, FileQuestion } from "lucide-react";

export default function NotFound() {
 return (
 <div className="flex min-h-screen items-center justify-center bg-background px-4">
 <div className="max-w-md text-center">
 <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-gradient-to-br from-primary/30 to-primary/5 text-primary">
 <FileQuestion className="size-8" />
 </div>
 <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
 <p className="mt-2 text-sm text-muted-foreground">
 The page you&apos;re looking for doesn&apos;t exist or has moved.
 </p>
 <div className="mt-6">
 <Button asChild>
 <Link href="/dashboard">
 Go to dashboard <ArrowRight />
 </Link>
 </Button>
 </div>
 </div>
 </div>
 );
}
