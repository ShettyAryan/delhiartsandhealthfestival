import type { Metadata } from "next";
import LegalDocument from "@/components/legal-document";
import { TERMS_DOC } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "House rules, terms and conditions of entry, and code of conduct for the Delhi Arts & Health Festival, 2 to 6 December 2026.",
};

export default function TermsPage() {
  return <LegalDocument doc={TERMS_DOC} />;
}
