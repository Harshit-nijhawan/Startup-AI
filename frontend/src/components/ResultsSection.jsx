import { useState } from 'react';
import { motion } from 'framer-motion';
import ResultCard from './ui/ResultCard';
import SectionRow from './ui/SectionRow';
import ConfidenceScore from './ConfidenceScore';
import ImprovePlanButton from './ImprovePlanButton';

export default function ResultsSection({ data }) {
  const { research, plan, critique, idea, budget, confidence } = data;
  const [improvedPlan, setImprovedPlan] = useState(null);
  const [showImproved, setShowImproved] = useState(false);

  const handlePlanImproved = (newPlan) => {
    setImprovedPlan(newPlan);
    setShowImproved(true);
  };

  const displayPlan = showImproved && improvedPlan ? improvedPlan : plan;

  return (
    <div className="flex flex-col gap-5 mt-6">
      {/* Confidence Score – Top Priority */}
      {confidence && (
        <ConfidenceScore
          score={confidence.score}
          reasoning={confidence.reasoning}
        />
      )}

      {/* Meta banner */}
      <div
        className="rounded-xl px-4 py-3 border flex flex-wrap items-center gap-x-6 gap-y-2 text-sm theme-transition"
        style={{ background: 'var(--accent-soft)', borderColor: 'var(--border)' }}
      >
        <span style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--accent)' }}>Idea: </span>
          {idea}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--accent)' }}>Budget: </span>
          ₹{Number(budget).toLocaleString('en-IN')}
        </span>
        <span
          className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}
        >
          ✓ Analysis Complete
        </span>
      </div>

      {/* 3-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Research Card ── */}
        <ResultCard
          title="Market Research"
          icon="📊"
          accentColor="purple"
          delay={0}
        >
          <SectionRow label="Market Demand"  value={research?.market_demand}  accentColor="purple" />
          <SectionRow label="Competitors"    value={research?.competitors}    accentColor="purple" />
          <SectionRow label="Trends"         value={research?.trends}         accentColor="purple" />
          <SectionRow label="Opportunities"  value={research?.opportunities}  accentColor="purple" />
        </ResultCard>

        {/* ── Plan Card ── */}
        <motion.div
          key={showImproved ? 'improved' : 'original'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <ResultCard
            title={showImproved ? "🚀 Improved Plan" : "📈 Startup Plan"}
            icon="📈"
            accentColor="green"
            delay={0.12}
          >
            <SectionRow label="Summary"        value={displayPlan?.summary}       accentColor="green" />
            <SectionRow label="Target Market"  value={displayPlan?.target_market} accentColor="green" />
            <SectionRow label="Features"       value={displayPlan?.features}      accentColor="green" />
            <SectionRow label="Cost Estimate"  value={displayPlan?.cost_estimate} accentColor="green" />

            {/* Improve Plan Button */}
            {!showImproved && (
              <ImprovePlanButton
                idea={idea}
                budget={budget}
                currentPlan={plan}
                currentCritique={critique}
                onPlanImproved={handlePlanImproved}
              />
            )}

            {/* Show "New Improved Plan" badge if showing improved version */}
            {showImproved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 rounded-lg text-sm font-medium text-white text-center"
                style={{ backgroundColor: '#10b981' }}
              >
                ✨ Plan successfully improved!
              </motion.div>
            )}
          </ResultCard>
        </motion.div>

        {/* ── Critique Card ── */}
        <ResultCard
          title="Critique & Risks"
          icon="⚠️"
          accentColor="red"
          delay={0.24}
        >
          <SectionRow label="Risks"         value={critique?.risks}        accentColor="red" />
          <SectionRow label="Weaknesses"    value={critique?.weaknesses}   accentColor="red" />
          <SectionRow label="Improvements"  value={critique?.improvements} accentColor="red" />
        </ResultCard>

      </div>
    </div>
  );
}
