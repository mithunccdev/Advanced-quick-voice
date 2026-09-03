'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Img from "@/data/company/about-us.json";

const leadershipTeam = [
  {
    name: 'Rick Kreifeldt',
    role: 'Technology Leadership',
    img: Img.leadershipTeam.Rick_Kreifeldt.url,
    bio: 'Former SVP & GM North America at LG and VP at Harman International. Rick drives our AI and healthcare technology innovation.'
  },
  {
    name: 'Joe Weber',
    role: 'Chief Strategy Officer',
    img: Img.leadershipTeam.Joe_Weber.url,
    bio: 'Inventor of predictive typing (US Patent, 1994) and pioneer in healthcare AI. Joe shapes our long-term strategy with decades of experience in innovation and predictive technology.'
  },
  {
    name: 'Dr. David Laith Rawaf',
    role: 'Healthcare Strategist',
    img: Img.leadershipTeam.David_Laith_Rawaf.url,
    bio: 'Surgeon, innovator, and global healthtech leader (Imperial College, WHO, Royal College of Surgeons). Provides strategic direction on medical innovation and healthcare policy.'
  },
  {
    name: 'Dana Sellers',
    role: 'Strategic Advisor',
    img: Img.leadershipTeam.Dana_Sellers.url,
    bio: 'Renowned healthcare IT leader. Offers strategic guidance, leveraging deep expertise in healthcare technology and medical innovation.'
  },
  {
    name: 'Zach Barden',
    role: 'Technology & Product Leadership',
    img: Img.leadershipTeam.Zach_Barden.url,
    bio: 'Expert in AI/ML, data platforms, and enterprise software solutions. Zach brings deep technical expertise in building scalable systems and leading product innovation across complex technology landscapes.'
  },
  {
    name: 'Martin Nowak',
    role: 'Healthcare & Business Strategy',
    img: Img.leadershipTeam.Martin_Nowak.url,
    bio: 'Seasoned healthcare executive with extensive experience in hospital leadership, strategic consulting, and advisory services. Martin provides critical insights into healthcare operations and business transformation.'
  },
  {
    name: 'Axel Perez',
    role: 'Operations & Revenue Cycle Leadership',
    img: Img.leadershipTeam.Axel_Perez.url,
    bio: 'Healthcare operations specialist with proven expertise in health tech and scalable operations. Axel drives operational excellence and revenue cycle optimization across healthcare organizations.'
  },
  {
    name: 'Marcia Leighton',
    role: 'Healthcare Operations & Revenue Cycle Leadership',
    img: Img.leadershipTeam.Marcia_Leighton.url,
    bio: 'Revenue cycle management expert specializing in RCM transformation, AI integration, and SaaS solutions. Marcia brings decades of experience in optimizing healthcare financial operations and driving digital transformation.'
  },
  {
    name: 'Rahul Agrawal',
    role: 'Founder & Chief Executive Officer',
    img: Img.leadershipTeam.Rahul_Agarwal.url,
    bio: 'Visionary entrepreneur with a proven track record in AI and healthcare technology. Founder of Mebelkart (exit $20M) & Styldod (exit $3.7M), IIT Kanpur alumnus.'
  },
  {
    name: 'Haraprasad Bharati',
    role: 'Co-Founder & Chief Technology Officer',
    img: Img.leadershipTeam.Haraprasad_Bharati.url,
    bio: 'Expert in Computer Vision, OCR, and Machine Learning. Leads development of AI systems and product innovation at QuickIntell.'
  }
];

export function AboutUsLeadershipSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl sm:text-center mb-20"
        >
          <div className="relative z-10">
            <h2 className="font-geist text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Bringing decades of global experience to drive healthcare innovation and impact.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}></div>
        </motion.div>
        <hr className="bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-16 h-px w-3/4 max-w-2xl" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/90 p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.25)] hover:border-primary/30"
            >
              {/* Gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Subtle glow effect */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              <div className="relative z-10">
                {/* Profile Image */}
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border/50 shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="144px"
                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-primary/90 font-medium mb-4 text-sm uppercase tracking-wider">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-foreground/70 leading-relaxed min-h-[3.5rem]">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
