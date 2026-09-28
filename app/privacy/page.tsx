import type { Metadata } from "next";
import LegalDocument from "@/components/legal-document";
import { PRIVACY_DOC } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Delhi Arts & Health Festival collects, uses, and protects personal data.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={PRIVACY_DOC} />;
}
