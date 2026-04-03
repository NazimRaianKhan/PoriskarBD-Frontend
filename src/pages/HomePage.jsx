import { Link, Navigate } from 'react-router-dom';
import {
  Recycle,
  ShieldCheck,
  MapPinned,
  BarChart3,
  ArrowRight,
  Leaf,
  Truck,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const featureCards = [
  {
    icon: Recycle,
    title: 'Smart Waste Reporting',
    text: 'Citizens can quickly report waste issues with accurate location and descriptive details.',
  },
  {
    icon: Truck,
    title: 'Collector Task Flow',
    text: 'Collectors receive assignments, complete tasks, and maintain collection history digitally.',
  },
  {
    icon: BarChart3,
    title: 'Admin Monitoring',
    text: 'Administrators can monitor reports, zones, schedules, and system-wide operational summaries.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Role Access',
    text: 'Separate role-based dashboards ensure proper access control for all user types.',
  },
];

const quickStats = [
  { label: 'Role-based access', value: '3 Roles' },
  { label: 'Waste workflow', value: 'Report → Assign → Collect' },
  { label: 'Zone support', value: 'Multi-zone' },
  { label: 'Digital records', value: '100% Online' },
];

const steps = [
  {
    title: 'Citizen reports an issue',
    text: 'A citizen submits a waste report with title, location, and description.',
  },
  {
    title: 'Admin assigns a collector',
    text: 'The admin reviews the issue and assigns the task to the appropriate collector.',
  },
  {
    title: 'Collector completes collection',
    text: 'The collector marks the task as collected and the action is stored in the system logs.',
  },
];

export default function HomePage() {
  const { user } = useAuth();

  if (user) {
    const dashboardPath =
      user.role === 'Admin'
        ? '/admin/dashboard'
        : user.role === 'Collector'
        ? '/collector/dashboard'
        : '/citizen/dashboard';

    return <Navigate to={dashboardPath} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-textmain">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,142,60,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,112,67,0.15),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-medium text-primary shadow-soft backdrop-blur">
                <Leaf size={16} />
                Sustainable, organized, and citizen-focused
              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                A smarter way to manage
                <span className="block text-primary">waste reporting and collection</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-secondary md:text-lg">
                Poriskar BD is a modern waste management platform where citizens report issues,
                collectors manage tasks, and administrators monitor operations through a clean,
                centralized, role-based system.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-secondary/30 bg-white px-5 py-3 font-semibold text-textmain shadow-soft transition hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-secondary/15 bg-white/75 p-4 shadow-soft backdrop-blur"
                  >
                    <p className="text-lg font-bold text-primary">{item.value}</p>
                    <p className="mt-1 text-xs text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-soft backdrop-blur">
                <div className="grid gap-4">
                  <div className="rounded-2xl bg-primary p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/80">System overview</p>
                        <h3 className="mt-1 text-2xl font-bold">Clean city workflow</h3>
                      </div>
                      <Recycle size={34} />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="rounded-2xl bg-white/15 px-3 py-4">
                        <p className="font-bold">1</p>
                        <p className="mt-1 text-white/85">Report</p>
                      </div>
                      <div className="rounded-2xl bg-white/15 px-3 py-4">
                        <p className="font-bold">2</p>
                        <p className="mt-1 text-white/85">Assign</p>
                      </div>
                      <div className="rounded-2xl bg-white/15 px-3 py-4">
                        <p className="font-bold">3</p>
                        <p className="mt-1 text-white/85">Collect</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#fdf9f2] p-5 shadow-soft">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                          <Users size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-secondary">Role-based system</p>
                          <h4 className="font-bold">Citizen • Collector • Admin</h4>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-secondary">
                        Each user gets a focused experience with only the actions relevant to their role.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fdf9f2] p-5 shadow-soft">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                          <MapPinned size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-secondary">Zone-based planning</p>
                          <h4 className="font-bold">Organized schedules</h4>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-secondary">
                        Zones and schedules make collection planning more efficient and easier to monitor.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-secondary/15 bg-white p-5 shadow-soft">
                    <p className="text-sm font-medium text-secondary">Why this matters</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        'Reduces manual reporting',
                        'Improves accountability',
                        'Supports environmental sustainability',
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-2 rounded-xl bg-background p-3">
                          <CheckCircle2 className="mt-0.5 text-primary" size={18} />
                          <p className="text-sm text-textmain">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 rounded-full bg-accent/20 blur-2xl md:block" />
              <div className="absolute -right-3 -top-3 hidden h-24 w-24 rounded-full bg-primary/20 blur-2xl md:block" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Core Features
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Built for modern waste management
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-secondary">
            The platform combines usability, accountability, and operational efficiency in a
            simple but structured workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-secondary/15 bg-white/85 p-6 shadow-soft"
            >
              <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/85 p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold">Simple workflow, better coordination</h2>

            <div className="mt-8 space-y-5">
              {steps.map((step, idx) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-secondary">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary to-[#2e7d32] p-8 text-white shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Ready to start?
            </p>
            <h2 className="mt-3 text-3xl font-bold">Join the platform and manage smarter</h2>
            <p className="mt-4 max-w-xl text-white/85">
              Sign up as a citizen to report waste issues, or log in to access your role-based
              dashboard and workflow tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-primary shadow-soft transition hover:-translate-y-0.5"
              >
                Register Now
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}