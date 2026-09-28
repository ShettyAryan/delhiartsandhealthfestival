import type { Metadata } from "next";
import LegalDocument from "@/components/legal-document";
import { TERMS_DOC } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Refund Policy",
  description:
    "Registration terms and conditions, refund policy, and transfer policy for the Delhi Arts & Health Festival.",
};

export default function TermsPage() {
  return <LegalDocument doc={TERMS_DOC} />;
}
