import { Menu, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { trackEvent } from "@/hooks/useAnalytics";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryLinks = [
    { label: "Home", href: "/#home" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  const serviceLinks = [
    { label: "Home Loans", href: "/home-loan" },
    { label: "Loan Against Property", href: "/loan-against-property" },
    { label: "Loan Against Mutual Funds", href: "/loan-against-mutual-funds" },
    { label: "Health Insurance", href: "/health-insurance" },
    { label: "Life Insurance", href: "/life-insurance" },
    { label: "Mutual Fund SIPs", href: "/mutual-fund-sip" },
  ];

  const locationLinks = [
    { label: "Mulund & Mumbai", href: "/mulund-mumbai-loans" },
    { label: "Thane", href: "/loans-in-thane" },
    { label: "Bhandup", href: "/loans-in-bhandup" },
    { label: "Ghatkopar", href: "/loans-in-ghatkopar" },
    { label: "Powai", href: "/loans-in-powai" },
  ];

  const secondaryLinks = [
    { label: "Videos", href: "/#videos" },
    { label: "EMI Calculator", href: "/#emi-calculator" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="/#home" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-8 h-8 rounded-full" />
          <span className="text-2xl font-display font-bold text-primary">
            Jupiter<span className="text-gradient-gold"> Fast Finance</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {primaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Services <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden py-2">
                {serviceLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Locations <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden py-2">
                {locationLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {secondaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+919757190200"
          onClick={() => trackEvent("phone_click", { location: "header" })}
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
              <SheetTitle className="text-2xl font-display flex items-center gap-2">
                <img src="/favicon.png" alt="Jupiter Finance Logo" className="w-6 h-6 rounded-full" />
                <span>Jupiter<span className="text-gradient-gold"> Fast Finance</span></span>
              </SheetTitle>
              <p className="text-sm text-muted-foreground">Quick access to your main pages and support links.</p>
            </SheetHeader>

            <div className="space-y-2 px-4 overflow-y-auto max-h-[calc(100vh-120px)] pb-20">
              {primaryLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}

              <Accordion type="single" collapsible className="rounded-lg border border-border bg-muted/30 px-4">
                <AccordionItem value="services" className="border-b-border">
                  <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
                    Services
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 space-y-2">
                    {serviceLinks.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        onClick={closeMenu}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="locations" className="border-b-border">
                  <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
                    Locations
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 space-y-2">
                    {locationLinks.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        onClick={closeMenu}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="more-links" className="border-b-0">
                  <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
                    More
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 space-y-2">
                    {secondaryLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={closeMenu}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    ))}
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
