import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = () => (
  <Link
    href="/"
    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Events
  </Link>
);
export default BackButton;