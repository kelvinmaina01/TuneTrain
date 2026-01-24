import React from 'react';
import Layout from '../components/Layout.tsx';
import Hero from '../components/Hero.tsx';
import TrustedBy from '../components/TrustedBy.tsx';
import WhatIf from '../components/WhatIf.tsx';
import FeaturesGrid from '../components/FeaturesGrid.tsx';
import ModelShowcase from '../components/ModelShowcase.tsx';
import Workflow from '../components/Workflow.tsx';
import Architecture from '../components/Architecture.tsx';
import UseCases from '../components/UseCases.tsx';
import ExperienceSection from '../components/ExperienceSection.tsx';
import FinalCTA from '../components/FinalCTA.tsx';
import DetailedFooter from '../components/DetailedFooter.tsx';
import TeamSection from '../components/TeamSection.tsx';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
    return (
        <Layout>
            <div className="landing-wrapper-premium">
                <Hero />
                <TrustedBy />
                <WhatIf />
                <FeaturesGrid />
                <TeamSection />
                <Workflow />
                <ModelShowcase />
                <Architecture />
                <UseCases />
                <ExperienceSection />
                <FinalCTA />
                <DetailedFooter />
            </div>
        </Layout>
    );
};

export default LandingPage;
