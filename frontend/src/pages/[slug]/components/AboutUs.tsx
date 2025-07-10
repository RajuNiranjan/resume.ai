import React from "react";

export const AboutUs = () => {
  return (
    <div className="space-y-[4rem]">
      <h1 className="text-[1.075rem] font-[400] leading-[1.75rem] ">
        At <b>Resume.AI</b>, we’ve reimagined what a resume can be — not just a
        summary of your past, but a strategic tool for your future. Powered by
        cutting-edge AI and deep career expertise, Resume.AI helps your resume
        <b> speak the language of opportunity</b> — the language hiring
        managers, recruiters, and applicant tracking systems understand.
      </h1>
      <hr className="border border-dashed border-[var(--text-primary)] " />
      {/* WHAT WE DO  */}
      <section className="space-y-[2rem]">
        <h3 className="text-4xl font-medium underline ">What We Do</h3>
        <p className="text-[1rem] font-[400] leading-[1.75rem] ">
          We analyze your resume side-by-side with the job you&apos;re applying
          for — line by line, skill by skill — to deliver precise, personalized
          feedback that actually moves the needle. In just seconds, you&apos;ll
          know how well you match, where you&apos;re falling short, and exactly
          how to fix it.
        </p>
        <p className="text-[1rem] font-[400] leading-[1.75rem] ">
          Whether you&apos;re just starting out, switching industries, or
          chasing that dream role at a top-tier company —{" "}
          <b> we&apos;re here to give you the competitive edge</b> .
        </p>
      </section>
      <hr className="border border-dashed border-[var(--text-primary)] " />
      {/* WHY RESUME.AI STTANDS OUT  */}
      <section className="space-y-[1rem]">
        <h3 className="text-4xl font-medium underline ">
          Why Resume.AI Stands Out
        </h3>

        <div>
          <h6 className="text-[1rem] font-medium ">
            &bull; Smart Resume Scoring
          </h6>
          <p className="text-[1rem] font-[400] leading-[1.75rem] ">
            Instantly see how your resume stacks up against any job — with a
            clear match score that breaks down what works and what doesn&apos;t.
          </p>
        </div>
        <div>
          <h6 className="text-[1rem] font-medium ">
            &bull; AI-Driven Insights
          </h6>
          <p className="text-[1rem] font-[400] leading-[1.75rem] ">
            Uncover missing keywords, vague language, and misalignments that
            cost you interviews — and fix them with clarity.
          </p>
        </div>
        <div>
          <h6 className="text-[1rem] font-medium ">
            &bull; Tailored, Actionable Feedback
          </h6>
          <p className="text-[1rem] font-[400] leading-[1.75rem] ">
            We don&apos;t just tell you what&apos;s wrong. We show you how to
            improve with real, data-backed suggestions.
          </p>
        </div>
        <div>
          <h6 className="text-[1rem] font-medium ">
            &bull; Made for Job Seekers Like You
          </h6>
          <p className="text-[1rem] font-[400] leading-[1.75rem] ">
            Whether you&apos;re applying to a startup, a nonprofit, or a Fortune
            500 — our tools are built to support your journey.
          </p>
        </div>
      </section>
      <hr className="border border-dashed border-[var(--text-primary)] " />
      {/* OUR MISSION  */}
      <section className="space-y-[2rem]">
        <h3 className="text-4xl font-medium underline ">Our Mission</h3>
        <p className="text-[1rem] font-[400] leading-[1.75rem] ">
          Because you&apos;re <b> more than a job title</b>.
          <br />
          Because your resume should <b>open doors</b>, not close them.
          <br />
          Because landing interviews shouldn&apos;t feel like a guessing game.
          <br />
          <br />
          We believe that <b>the right opportunity can change your life </b> —
          and your resume is the first step toward that transformation.
          <br />
          <br />
          Welcome to <b> Resume.AI</b>.
          <br />
          <i>
            Where your ambition meets intelligence — and your next chapter
            begins
          </i>
          .
        </p>
      </section>
    </div>
  );
};
