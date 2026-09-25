import Image from "next/image";
import { OTHER_FESTIVALS } from "@/lib/content";

/**
 * The sister Arts & Health festivals, as a slow looping band under the Global
 * Ecosystem section (it replaces the mural strip that sat here). Pure CSS
 * motion, so it stays a server component; see .logo-band in globals.css.
 * The second copy of the list is aria-hidden so screen readers get each
 * festival once.
 */
export default function LogoBand() {
  const set = (hidden: boolean) =>
    OTHER_FESTIVALS.map((f) => (
      <li
        key={`${hidden ? "b" : "a"}-${f.city}`}
        aria-hidden={hidden || undefined}
        className="shrink-0"
      >
        <Image
          src={f.src}
          alt={hidden ? "" : `${f.city} Arts & Health Festival`}
          width={128}
          height={128}
          sizes="128px"
          className="h-24 w-24 object-contain md:h-32 md:w-32"
        />
      </li>
    ));

  return (
    <section
      aria-label="Other Arts & Health festivals"
      className="logo-band w-full overflow-hidden bg-cream py-4"
    >
      <ul className="logo-band-track flex w-max items-center gap-10 pr-10 md:gap-14 md:pr-14">
        {set(false)}
        {set(true)}
      </ul>
    </section>
  );
}
