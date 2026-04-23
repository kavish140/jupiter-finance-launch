import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Mulund & Mumbai", href: "/mulund-mumbai-loans", isRoute: true },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  const secondaryLinks = [
    { label: "Videos", href: "#videos" },
    { label: "Posts", href: "#posts" },
    { label: "EMI Calculator", href: "#emi-calculator" },
    { label: "Home Loan", href: "/home_loan", isRoute: true },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">
            Jupiter<span className="text-gradient-gold"> Fast Finance</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {primaryLinks.concat(secondaryLinks).map((l) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <a
          href="tel:+919757190200"
          className="hidden md:flex items-center gap-2 gradient-gold text-accent-foreground font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" />
          9757190200
        </a>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <SheetContent side="right" className="w-[88vw] sm:max-w-sm px-0">
            <SheetHeader className="px-6 pb-4 text-left">
              <SheetTitle className="text-2xl font-display">
                Jupiter<span className="text-gradient-gold"> Fast Finance</span>
              </SheetTitle>
              <p className="text-sm text-muted-foreground">Quick access to your main pages and support links.</p>
            </SheetHeader>

            <div className="space-y-2 px-4">
              {primaryLinks.map((l) =>
                l.isRoute ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </a>
                )
              )}

              <Accordion type="single" collapsible className="rounded-lg border border-border bg-muted/30 px-4">
                <AccordionItem value="more-links" className="border-b-0">
                  <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
                    More
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 space-y-2">
                    {secondaryLinks.map((l) =>
                      l.isRoute ? (
                        <Link
                          key={l.href}
                          to={l.href}
                          onClick={closeMenu}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          key={l.href}
                          href={l.href}
                          onClick={closeMenu}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                        >
                          {l.label}
                        </a>
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <a
                href="tel:+919757190200"
                className="mt-4 flex items-center justify-center gap-2 gradient-gold text-accent-foreground font-semibold px-4 py-3 rounded-lg text-sm"
              >
                <Phone className="w-4 h-4" />
                9757190200
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
