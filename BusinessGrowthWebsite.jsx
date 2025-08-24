import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Rocket, ArrowRight, BarChart, Users, Target, Mail, Sparkles, Search, TrendingUp, MapPin, Phone, Star, Briefcase, Filter, Calculator, Building2, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper: simple currency formatter
const fmt = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Reusable Section wrapper with motion
const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-10">
      {eyebrow && <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{eyebrow}</div>}
      {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
      {subtitle && <p className="text-gray-600 mt-3">{subtitle}</p>}
    </motion.div>
    {children}
  </section>
);

// HERO
const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white pointer-events-none" />
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="rounded-2xl px-3 py-1 mb-4" variant="secondary"><Sparkles className="w-4 h-4 mr-1"/>Your Growth Co-Pilot</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Grow your business
              <span className="text-indigo-600"> faster</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              A sleek, all-in-one website template designed to attract leads, showcase services, and convert visitors into loyal customers.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#calculator"><Button size="lg" className="rounded-2xl"><Rocket className="w-5 h-5 mr-2"/>Launch Growth Calculator</Button></a>
              <a href="#contact"><Button size="lg" variant="outline" className="rounded-2xl">Book a Free Strategy Call<ArrowRight className="w-5 h-5 ml-2"/></Button></a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 500+ student projects & startups
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <Card className="rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5"/> Real-time Impact</CardTitle>
                <CardDescription>See how your marketing inputs change bottom-line outcomes.</CardDescription>
              </CardHeader>
              <CardContent>
                <GrowthMiniChart />
              </CardContent>
            </Card>
            <div className="absolute -z-10 blur-3xl opacity-50 bg-indigo-200 w-72 h-72 rounded-full -top-10 -right-10"/>
          </motion.div>
        </div>
      </header>
    </div>
  );
};

// Mini chart for hero
const GrowthMiniChart = () => {
  const data = Array.from({ length: 8 }).map((_, i) => ({ month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"][i], leads: 40 + i * 10 + (i%2?8:-4) }));
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="leads" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// SERVICES with filter/search
const servicesCatalog = [
  { id: 1, title: "SEO & Content", cat: "Marketing", desc: "Rank higher and turn searches into sales.", icon: <Search className="w-5 h-5"/> },
  { id: 2, title: "Paid Ads", cat: "Marketing", desc: "Launch data-driven ad campaigns that convert.", icon: <Target className="w-5 h-5"/> },
  { id: 3, title: "CRM & Automations", cat: "Operations", desc: "Automate follow-ups and nurture pipelines.", icon: <Users className="w-5 h-5"/> },
  { id: 4, title: "Brand & Design", cat: "Creative", desc: "Stand out with a brand that customers love.", icon: <Sparkles className="w-5 h-5"/> },
  { id: 5, title: "Analytics Setup", cat: "Data", desc: "Measure what matters, not everything.", icon: <BarChart className="w-5 h-5"/> },
  { id: 6, title: "Go-To-Market", cat: "Strategy", desc: "Positioning, ICP, and launch playbooks.", icon: <Rocket className="w-5 h-5"/> },
];

const Services = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => servicesCatalog.filter(s => (category === "All" || s.cat === category) && s.title.toLowerCase().includes(query.toLowerCase())), [query, category]);

  return (
    <Section id="services" eyebrow="Services" title="What we do" subtitle="Pick a mix, or let us recommend a package for your goals.">
      <div className="flex flex-col md:flex-row items-center gap-3 justify-between mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search services..." className="pl-9 rounded-2xl"/>
          </div>
          <Badge variant="secondary" className="rounded-2xl hidden md:inline-flex"><Filter className="w-4 h-4 mr-1"/>Filters</Badge>
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-56 rounded-2xl"><SelectValue placeholder="Category"/></SelectTrigger>
          <SelectContent>
            {['All','Marketing','Operations','Creative','Data','Strategy'].map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(s => (
          <Card key={s.id} className="rounded-2xl hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{s.icon}{s.title}</CardTitle>
              <CardDescription>{s.cat}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{s.desc}</p>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">#ROI</Badge>
                <Badge variant="outline">#Playbooks</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// CASE STUDIES / SOCIAL PROOF
const CaseStudies = () => {
  const cases = [
    { company: "NovaFit Gyms", result: "+178% lead growth", quote: "Our signups exploded in 8 weeks.", person: "Ananya P., Founder" },
    { company: "QuickKart Grocers", result: "+2.1x revenue", quote: "Campaigns finally started paying back.", person: "Aditya S., CEO" },
    { company: "ByteWorks IT", result: "-35% CAC", quote: "Same budget, more qualified demos.", person: "Riya K., COO" },
  ];
  return (
    <Section id="results" eyebrow="Proof" title="Results that speak" subtitle="A glimpse of impact delivered across industries.">
      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((c, i)=> (
          <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5"/>{c.company}</CardTitle>
                <CardDescription className="font-semibold text-green-600">{c.result}</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="text-gray-700 italic">“{c.quote}”</blockquote>
                <div className="mt-3 text-sm text-gray-500">— {c.person}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// PRICING
const Pricing = () => {
  const tiers = [
    { name: "Starter", price: 49, tagline: "For new businesses testing the waters", features: ["Landing page setup","Basic SEO","Email capture","Monthly report"] },
    { name: "Growth", price: 199, tagline: "For scaling teams that want consistency", features: ["Everything in Starter","CRM automations","A/B testing","Weekly report"] },
    { name: "Pro", price: 499, tagline: "For performance-driven brands", features: ["Everything in Growth","Paid ads management","Conversion design sprints","Daily dashboard"] },
  ];
  return (
    <Section id="pricing" eyebrow="Pricing" title="Simple, transparent plans" subtitle="Start small, upgrade when you see results.">
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t, i)=> (
          <Card key={t.name} className={`rounded-2xl ${i === 1 ? 'border-indigo-500 shadow-2xl' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.name}</span>
                {i === 1 && <Badge className="rounded-2xl">Most popular</Badge>}
              </CardTitle>
              <CardDescription>{t.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold">${t.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
              <ul className="mt-4 space-y-2">
                {t.features.map((f, idx)=> (
                  <li key={idx} className="flex items-center gap-2 text-gray-700"><Check className="w-4 h-4 text-green-600"/>{f}</li>
                ))}
              </ul>
              <Button className="w-full mt-6 rounded-2xl">Choose {t.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// GROWTH CALCULATOR
const CalculatorCard = () => {
  const [visitors, setVisitors] = useState(5000);
  const [conv, setConv] = useState(2.5); // %
  const [value, setValue] = useState(60); // $ avg order value
  const [improve, setImprove] = useState(25); // % improvements

  const leads = useMemo(()=> Math.round(visitors * (conv/100)), [visitors, conv]);
  const improvedLeads = useMemo(()=> Math.round(leads * (1 + improve/100)), [leads, improve]);
  const revenue = useMemo(()=> Math.round(leads * value), [leads, value]);
  const improvedRevenue = useMemo(()=> Math.round(improvedLeads * value), [improvedLeads, value]);

  const chart = useMemo(()=> ([
    { label: "Now", leads, revenue },
    { label: "+Improved", leads: improvedLeads, revenue: improvedRevenue },
  ]), [leads, improvedLeads, revenue, improvedRevenue]);

  return (
    <Section id="calculator" eyebrow="Interactive" title="Growth impact calculator" subtitle="Tweak inputs to estimate how optimization affects your pipeline.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5"/> Your inputs</CardTitle>
            <CardDescription>Estimates update instantly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Monthly visitors</label>
                <Input type="number" min={0} value={visitors} onChange={e=>setVisitors(parseInt(e.target.value||0))} className="rounded-2xl"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Conversion rate (%)</label>
                <Input type="number" min={0} step="0.1" value={conv} onChange={e=>setConv(parseFloat(e.target.value||0))} className="rounded-2xl"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Avg order value ($)</label>
                <Input type="number" min={0} value={value} onChange={e=>setValue(parseInt(e.target.value||0))} className="rounded-2xl"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Projected improvement (%)</label>
                <Input type="number" min={0} value={improve} onChange={e=>setImprove(parseInt(e.target.value||0))} className="rounded-2xl"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatsBox label="Leads / mo" value={leads.toString()} icon={<Users className="w-4 h-4"/>} />
              <StatsBox label="Revenue / mo" value={fmt(revenue)} icon={<TrendingUp className="w-4 h-4"/>} />
              <StatsBox label="Leads w/ improvement" value={improvedLeads.toString()} icon={<Users className="w-4 h-4"/>} />
              <StatsBox label="Revenue w/ improvement" value={fmt(improvedRevenue)} icon={<TrendingUp className="w-4 h-4"/>} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5"/> Visualize impact</CardTitle>
            <CardDescription>Leads and revenue before vs after improvements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip formatter={(v, n)=> n.includes('revenue') ? fmt(Number(v)) : v }/>
                  <Line type="monotone" dataKey="leads" strokeWidth={3} />
                  <Line type="monotone" dataKey="revenue" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

const StatsBox = ({ label, value, icon }) => (
  <div className="rounded-2xl border p-4 shadow-sm">
    <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">{icon}{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

// CONTACT
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name && email.includes("@");

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s plan your next growth leap" subtitle="Tell us about your goals and we’ll reply with a 3-step plan within 24 hours.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5"/> Send a message</CardTitle>
            <CardDescription>We’ll never share your details.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-50 text-green-700 font-medium">Thanks {name.split(' ')[0] || 'there'}! We’ll get back to you shortly.</div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="rounded-2xl"/>
                <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="rounded-2xl"/>
                <Textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="What are you trying to achieve?" className="rounded-2xl min-h-[120px]"/>
                <Button type="submit" disabled={!canSubmit} className="rounded-2xl">Submit</Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5"/> Why choose us?</CardTitle>
              <CardDescription>What you get when we work together.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Proven frameworks for acquisition, activation, and retention",
                  "Clear dashboards so you always know what’s working",
                  "Ethical, privacy-first data practices",
                ].map((x,i)=> (
                  <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 mt-1"/>{x}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5"/> 5.0 average rating</CardTitle>
              <CardDescription>From 100+ client reviews</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-600">
              “The only template we needed for our business website. Clean, fast, and it actually converts.”
            </CardContent>
          </Card>

          <div className="rounded-2xl border p-4 flex items-center gap-4">
            <MapPin className="w-5 h-5"/>
            <div>
              <div className="font-semibold">Pune, India</div>
              <div className="text-sm text-gray-500">Serving clients worldwide</div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Phone className="w-4 h-4"/>
              <a href="tel:+910000000000" className="text-sm">+91 00000 00000</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

// FOOTER
const Footer = () => (
  <footer className="border-t mt-16">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-6">
      <div>
        <div className="text-xl font-extrabold">Growth<span className="text-indigo-600">Lab</span></div>
        <p className="text-gray-600 mt-2">Conversion-focused websites and playbooks.</p>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">Company</div>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li><a href="#services">Services</a></li>
          <li><a href="#results">Case Studies</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">Resources</div>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Growth calculator</li>
          <li>Checklist: Launch in 7 days</li>
          <li>Playbook library</li>
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">Get updates</div>
        <div className="flex gap-2">
          <Input placeholder="Your email" className="rounded-2xl"/>
          <Button className="rounded-2xl">Join</Button>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} GrowthLab. All rights reserved.</div>
  </footer>
);

// NAVBAR
const Navbar = () => (
  <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#" className="text-xl font-extrabold">Growth<span className="text-indigo-600">Lab</span></a>
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
        <a href="#services" className="hover:text-indigo-600">Services</a>
        <a href="#results" className="hover:text-indigo-600">Results</a>
        <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
        <a href="#calculator" className="hover:text-indigo-600">Calculator</a>
        <a href="#contact" className="hover:text-indigo-600">Contact</a>
      </nav>
      <a href="#contact"><Button className="rounded-2xl hidden md:inline-flex">Get a proposal</Button></a>
    </div>
  </div>
);

// MAIN EXPORT
export default function BusinessGrowthWebsite() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />

      <main>
        <Services />
        <CaseStudies />
        <Pricing />
        <CalculatorCard />
        <Contact />
      </main>

      <CTA />
      <Footer />
    </div>
  );
}

const CTA = () => (
  <div className="relative overflow-hidden py-16">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-10" />
    <Section id="cta" title="Ready to grow?" subtitle="Get a free audit and a custom 30-day plan.">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Book a free growth audit</h3>
              <p className="text-gray-600">We’ll review your funnel and send 3 quick wins.</p>
            </div>
            <a href="#contact"><Button size="lg" className="rounded-2xl">Claim your audit <ArrowRight className="w-5 h-5 ml-2"/></Button></a>
          </CardContent>
        </Card>
      </div>
    </Section>
  </div>
);