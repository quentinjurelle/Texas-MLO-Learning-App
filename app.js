(function () {
  const cards = window.MLO_FLASHCARDS || [];
  const storageKey = "texasMloTrainerState.v1";
  const today = new Date();

  const syllabus = [
    {
      day: 1,
      title: "Role, Licensing, Texas Framework, and Exam Map",
      focus: "MLO definition, NMLS, sponsorship, Texas SML/OCCC, exam weights.",
      reading: [
        "Professional handbook: Part I, Chapters 1-2, Appendices C and J.",
        "5-day training guide: Purpose, company plan, Chapter 1, Chapter 4."
      ],
      drills: [
        "Write the MLO definition from memory.",
        "Study flashcards 51-70 and 131-135.",
        "Create three licensing scenarios and classify each one."
      ],
      checkpoint: "Define MLO activity, explain sponsorship, name SML/OCCC, and score 85% on assigned cards."
    },
    {
      day: 2,
      title: "Federal Mortgage Laws, Disclosures, and Timing",
      focus: "RESPA, TILA/TRID, ECOA, FCRA, HMDA, GLBA, UDAAP, advertising, and letters.",
      reading: [
        "Professional handbook: Part II and Appendix F.",
        "Master math/timing manual: Parts 2-6."
      ],
      drills: [
        "Study flashcards 1-50 and 136-142.",
        "Write six TRID application items and three CD restart events.",
        "Complete eight date-counting examples."
      ],
      checkpoint: "Explain RESPA Section 8, LE/CD timing, ECOA classes, and score 85% on federal cards."
    },
    {
      day: 3,
      title: "Products, Borrower Qualification, Underwriting, and Documentation",
      focus: "Product fit, borrower interview, document quality, red flags, and underwriting logic.",
      reading: [
        "Professional handbook: Part III, Appendices D, E, H.",
        "5-day training guide: Chapters 3 and 5."
      ],
      drills: [
        "Study flashcards 71-100 and 144-145.",
        "Build a mock borrower file and document request list.",
        "Explain FHA, VA, USDA, conventional, jumbo, ARM, HELOC."
      ],
      checkpoint: "Identify documentation needs and at least 10 red flags; score 85% on product/workflow cards."
    },
    {
      day: 4,
      title: "Math, Equations, Timing Mastery, and Operational Execution",
      focus: "LTV, CLTV, DTI, income conversion, points, escrow, daily interest, and deadline control.",
      reading: [
        "Master math/timing manual: Parts 1-4, 9-10.",
        "Math and timing cheat sheet: entire document.",
        "Professional handbook: Chapters 9-10."
      ],
      drills: [
        "Write formulas from memory three times.",
        "Complete 20 math questions.",
        "Complete 15 timing questions."
      ],
      checkpoint: "Score at least 18/20 on math and 13/15 on timing."
    },
    {
      day: 5,
      title: "Ethics, Fraud, Mixed Exam Simulation, and Final Readiness",
      focus: "Steering, redlining, UDAAP, fraud, appraisal pressure, privacy, mixed exam performance.",
      reading: [
        "Professional handbook: Parts V-VI, Appendices G, I, J.",
        "5-day training guide: Chapter 6 and trainee workbook."
      ],
      drills: [
        "Study flashcards 101-150.",
        "Complete 10 ethics scenarios.",
        "Run a 75-question mixed simulation."
      ],
      checkpoint: "Score 80% minimum on mixed simulation and explain all misses."
    }
  ];

  const mathDrills = [
    { id: "m1", prompt: "Loan amount $280,000, value $350,000. LTV?", answer: "80", unit: "%", explanation: "$280,000 / $350,000 = 0.80 = 80%." },
    { id: "m2", prompt: "First lien $300,000, second lien $45,000, value $450,000. CLTV?", answer: "76.67", unit: "%", explanation: "$345,000 / $450,000 = 76.67%." },
    { id: "m3", prompt: "Annual income $108,000. Monthly income?", answer: "9000", unit: "$", explanation: "$108,000 / 12 = $9,000." },
    { id: "m4", prompt: "Biweekly gross $2,850. Monthly income?", answer: "6175", unit: "$", explanation: "$2,850 x 26 / 12 = $6,175." },
    { id: "m5", prompt: "Housing $2,850, other debts $1,025, income $9,500. Back-end DTI?", answer: "40.79", unit: "%", explanation: "$3,875 / $9,500 = 40.79%." },
    { id: "m6", prompt: "Loan amount $360,000, 1.25 points. Cost?", answer: "4500", unit: "$", explanation: "$360,000 x 0.0125 = $4,500." },
    { id: "m7", prompt: "Annual escrow disbursements $9,900. Maximum cushion?", answer: "1650", unit: "$", explanation: "$9,900 / 6 = $1,650." },
    { id: "m8", prompt: "Index 4.50%, margin 2.25%. Fully indexed rate?", answer: "6.75", unit: "%", explanation: "4.50% + 2.25% = 6.75%." }
  ];

  const timingDrills = [
    { id: "t1", prompt: "Application received Monday. Creditor open Monday-Friday. LE due?", answer: "Thursday", explanation: "Tuesday day 1, Wednesday day 2, Thursday day 3." },
    { id: "t2", prompt: "CD received Monday. No holidays. Earliest consummation?", answer: "Thursday", explanation: "Tuesday day 1, Wednesday day 2, Thursday day 3." },
    { id: "t3", prompt: "Principal dwelling refinance closes Friday. No holidays. Rescission expires midnight when?", answer: "Tuesday", explanation: "Saturday day 1, Sunday excluded, Monday day 2, Tuesday day 3." },
    { id: "t4", prompt: "Completed application received May 1. ECOA action-taken notice generally due within how many days?", answer: "30", explanation: "ECOA generally requires action-taken notice within 30 calendar days after completed application." },
    { id: "t5", prompt: "Servicing transfer effective July 1. Old servicer notice timing?", answer: "15 days before", explanation: "Transferor notice generally not less than 15 days before effective transfer." },
    { id: "t6", prompt: "Mortgage ownership transfer disclosure due when?", answer: "30 days", explanation: "On or before the 30th calendar day after transfer." }
  ];

  const complianceModules = [
    {
      id: "ethics",
      title: "Ethics, Morals, and MLO Conduct",
      source: "Advanced manual Chapter 3",
      context: {
        what: "Ethics are the business actions that prove your morals under real pressure. In lending, ethics show up in disclosures, recommendations, referral behavior, data handling, and how honestly you explain risk.",
        why: "Mortgage transactions involve high trust, high money, legal disclosures, and commission pressure. One unethical shortcut can create borrower harm, license risk, reputation damage, and compliance exposure.",
        file: "In a live file, ethics means no hidden debt, no inflated income, no unsupported promise of approval, no steering, no pressure on appraisers, and no casual handling of private information.",
        underwriter: "Underwriters do not approve intentions. They approve documented facts. Ethical origination gives underwriting clean, consistent, verifiable information.",
        compliance: "Compliance monitors complaints, advertising, compensation, referral relationships, disclosure timing, and whether the borrower was misled or pressured.",
        exam: "SAFE questions usually reward the answer that protects the borrower, tells the truth, documents the file, refuses illegal compensation, and escalates red flags."
      },
      practice: [
        "Write your personal MLO ethics standard in five rules.",
        "Create a script for refusing to omit a known debt.",
        "Create a script for telling an agent you cannot guarantee closing.",
        "Identify three ways commission pressure could distort borrower advice."
      ],
      examPrompts: [
        "A borrower asks you to increase stated income because they make cash on the side. What is the correct action?",
        "A referral partner asks for a fee per closed loan. What law and ethics issue are triggered?",
        "A borrower qualifies for a lower-cost option but a different product closes faster. What should guide the recommendation?"
      ],
      fieldStandard: "Your reputation is a production asset. The long-term MLO wins by being trusted, documented, consistent, and unafraid to say no."
    },
    {
      id: "trid",
      title: "TRID, LE/CD Timing, and Disclosure Control",
      source: "Advanced manual Chapter 7",
      context: {
        what: "TRID controls the Loan Estimate, Closing Disclosure, application trigger, fee timing, changed circumstances, and closing waiting periods.",
        why: "Borrowers need time and clear information to understand costs before becoming obligated. Regulators look closely at timing, accuracy, and whether the borrower was surprised.",
        file: "The six application items trigger the LE clock. The CD must be received at least three specific business days before consummation. Only three changes restart the CD waiting period.",
        underwriter: "Underwriting changes can affect terms, conditions, cash to close, and redisclosure. The file must stay synchronized between approval, pricing, title, and closing.",
        compliance: "Compliance reviews LE/CD timing, tolerance buckets, changed circumstance documentation, fee cures, and whether the creditor charged fees too early.",
        exam: "Expect questions on the six application items, LE due date, CD waiting period, CD restart events, intent to proceed, and changed circumstances."
      },
      practice: [
        "Write the six TRID application items from memory.",
        "Count LE due dates for Monday, Thursday, and Friday applications.",
        "List the three CD restart events.",
        "Explain the difference between a corrected CD and a new waiting period."
      ],
      examPrompts: [
        "Borrower provides all six application items but has not submitted bank statements. Can the LE be delayed?",
        "CD received Monday. No holidays. What is earliest consummation?",
        "APR becomes inaccurate after CD. What happens next?"
      ],
      fieldStandard: "Treat disclosure timing like a clock, not a suggestion. Once triggered, the file has to move through the right channel."
    },
    {
      id: "fraud",
      title: "Mortgage Fraud Red Flags and Escalation",
      source: "Advanced manual Chapter 14",
      context: {
        what: "Mortgage fraud is a material misstatement, misrepresentation, or omission relied on to originate, fund, insure, purchase, or service a loan.",
        why: "Fraud harms borrowers, lenders, investors, insurers, communities, and the financial system. It can trigger repurchase, criminal exposure, regulatory action, and SAR review.",
        file: "Red flags include altered bank statements, fake VOEs, occupancy conflicts, straw buyers, air loans, gift manipulation, shell-company employment, and undisclosed debts.",
        underwriter: "Underwriters look for consistency across income, assets, credit, occupancy, title, appraisal, identity, and transaction parties.",
        compliance: "Fraud concerns are escalated through manager, QC, fraud, compliance, and BSA channels. MLOs do not warn borrowers about SAR activity.",
        exam: "SAFE fraud questions reward stopping, documenting, escalating, and refusing to rely on false or suspicious information."
      },
      practice: [
        "Build a red-flag checklist for income, assets, occupancy, and identity.",
        "Write a neutral escalation note for a suspicious bank statement.",
        "Explain straw buyer, air loan, and occupancy fraud in plain English.",
        "Create a script for requesting source documentation without accusing the borrower."
      ],
      examPrompts: [
        "Borrowerâ€™s employer uses a free email domain and cannot be verified. What is the concern?",
        "A borrower says gift funds will be repaid later. How should this be treated?",
        "The borrower claims primary residence but lives far away with no relocation plan. What is the risk?"
      ],
      fieldStandard: "Do not accuse casually, but do not ignore inconsistencies. Stop relying on questionable facts and escalate early."
    },
    {
      id: "fair-lending",
      title: "Fair Lending, Redlining, Steering, and HMDA",
      source: "Advanced manual Chapter 5",
      context: {
        what: "Fair lending laws prohibit discrimination and discouragement in credit and housing-related lending activity.",
        why: "Borrowers must receive equal access and treatment based on lawful credit criteria, not protected characteristics, neighborhood stereotypes, or discretionary bias.",
        file: "Fair lending risk appears in pricing, product presentation, documentation requests, denial reasons, marketing geography, branch service patterns, and exceptions.",
        underwriter: "Underwriting discretion must be consistent and documented. Exceptions must not favor or burden protected groups unfairly.",
        compliance: "Compliance reviews HMDA data, pricing disparities, denial rates, exceptions, complaints, marketing geography, and redlining indicators.",
        exam: "Expect protected classes, discouragement, redlining, reverse redlining, steering, disparate treatment, and adverse action questions."
      },
      practice: [
        "Write ECOA protected classes from memory.",
        "Create two examples of discouragement and rewrite them compliantly.",
        "Explain redlining vs reverse redlining.",
        "List three ways pricing discretion can create fair lending risk."
      ],
      examPrompts: [
        "An MLO tells a borrower on public assistance they probably will not qualify. What is wrong?",
        "A lender avoids marketing in majority-minority neighborhoods. What fair lending issue may exist?",
        "Two similarly situated borrowers receive different documentation burdens. What should compliance review?"
      ],
      fieldStandard: "Use consistent criteria, consistent communication, and documented borrower-centered product analysis."
    },
    {
      id: "math-le",
      title: "Loan Estimate, Payment Math, PMI, Points, and DTI",
      source: "Advanced manual Chapter 11",
      context: {
        what: "Mortgage math converts loan structure into payment, cash to close, DTI, MI, escrow, APR context, and borrower affordability.",
        why: "Borrowers often misunderstand payment because they hear P&I but owe PITIA. Underwriting uses qualifying payment and verified income/debt.",
        file: "LE review includes loan amount, rate, APR, projected payment, MI, escrow, closing costs, cash to close, prepaid interest, and services.",
        underwriter: "Underwriting tests whether the borrower can repay using documented income, liabilities, housing payment, MI, taxes, insurance, and reserves.",
        compliance: "Compliance risk appears when payment, APR, points, cash to close, or fee changes are misleading or not disclosed correctly.",
        exam: "Expect points math, PITI/PITIA, DTI, escrow, LE interpretation, PMI vs MIP, and affordability scenarios."
      },
      practice: [
        "Calculate total payment: P&I $761.78 + MI $82 + escrow $206.",
        "Calculate two points on a $150,000 loan.",
        "Explain when discount points make sense using break-even.",
        "Write a borrower-friendly explanation of full payment vs P&I."
      ],
      examPrompts: [
        "What is 1 discount point?",
        "Why is a personal credit card not an acceptable reserve asset?",
        "Borrower has less than 20% down on conventional. What insurance issue may apply?"
      ],
      fieldStandard: "Never sell rate alone. Explain payment, cash to close, points, APR context, and tradeoffs."
    },
    {
      id: "products",
      title: "ARM, HELOC, Reverse Mortgage, PMI, and Product Risk",
      source: "Advanced manual Chapter 10",
      context: {
        what: "Product knowledge means understanding how loan structure affects borrower risk, qualification, disclosures, servicing, and suitability.",
        why: "A product can be lawful but wrong for a borrower if risk, payment behavior, or future adjustment is not understood.",
        file: "ARMs require index/margin/cap analysis. HELOCs require draw/repayment and lien-position analysis. Reverse mortgages require age, counseling, occupancy, tax, insurance, and maintenance obligations.",
        underwriter: "Underwriters evaluate product eligibility, payment shock, collateral, borrower obligations, reserves, and program rules.",
        compliance: "Compliance monitors advertising, disclosures, suitability concerns, high-cost triggers, fair lending, and vulnerable borrower risk.",
        exam: "Expect index plus margin, HELOC revolving structure, PMI vs MIP, reverse mortgage negative amortization and ongoing obligations."
      },
      practice: [
        "Calculate fully indexed ARM rate from index and margin.",
        "Explain HELOC draw period vs repayment period.",
        "Explain why reverse mortgage occupancy is not automatically indefinite.",
        "Compare PMI and FHA MIP."
      ],
      examPrompts: [
        "What causes ARM payment shock?",
        "Why does a reverse mortgage create negative amortization?",
        "What makes a HELOC different from a closed-end second mortgage?"
      ],
      fieldStandard: "Product explanation must include future risk, not just todayâ€™s payment."
    },
    {
      id: "course-execution",
      title: "Two-Week Course Execution and Licensing Path",
      source: "Full manual V2 Chapters 20 and 26",
      context: {
        what: "This module turns the class, course PDFs, workbook, app, and exam prep into a daily operating system.",
        why: "Passing the exam requires more than watching course hours. You need structured recall, workbook correction, form review, and repeated remediation of weak areas.",
        file: "The same discipline used to manage a loan file is used to manage the study file: deadlines, documents, misses, corrections, and final readiness checks.",
        underwriter: "Underwriting thinking trains you to ask what fact is being proven and what evidence supports it. Apply that same logic to exam questions.",
        compliance: "Compliance thinking trains you to identify the rule, trigger, timing, harm, and correct escalation path.",
        exam: "The SAFE exam rewards recognition of role, law, trigger, timing, and compliant action under scenario pressure."
      },
      practice: [
        "Map your Day 1 through Day 14 course schedule.",
        "Create a miss log category for every practice quiz under 80%.",
        "Write the licensing path from course enrollment to active sponsorship.",
        "Convert one workbook miss into a flashcard and one real-file example."
      ],
      examPrompts: [
        "Why does course completion not equal authority to originate?",
        "What additional steps usually occur after passing the NMLS test?",
        "How should a 68% practice score be treated?"
      ],
      fieldStandard: "Treat study like production: track inputs, measure misses, correct defects, and do not move forward with unresolved weak spots."
    },
    {
      id: "safe-nuances",
      title: "Recent SAFE Nuances and High-Yield Traps",
      source: "Full manual V2 Chapter 21",
      context: {
        what: "A focused module for the high-yield details that frequently appear as small but costly exam traps.",
        why: "Many missed SAFE questions are not broad-topic failures. They are precise-detail failures: one percentage, one definition, one timing rule, or one product feature.",
        file: "These details also matter in live files: UFMIP, reverse mortgage obligations, opt-out notices, title policy amounts, reserves, and ownership structures.",
        underwriter: "Underwriters use these details to determine eligibility, risk, reserves, collateral quality, and whether documentation supports the file.",
        compliance: "Compliance monitors whether these details are explained accurately, disclosed properly, and not misrepresented in advertising or borrower conversations.",
        exam: "Expect traps around 4 C's, 1.75% UFMIP, reverse mortgage negative amortization, FACTA/FCRA, GLBA notices, HELOC structure, and formal vesting terms."
      },
      practice: [
        "Write the 4 C's and what each one tests.",
        "Calculate 1.75% UFMIP on three sample loan amounts.",
        "Explain reverse mortgage negative amortization in one paragraph.",
        "List three acceptable reserves and three unacceptable reserve sources."
      ],
      examPrompts: [
        "Which 4 C refers to assets or reserves?",
        "Why is a personal credit card not an acceptable reserve?",
        "What is wrong with calling 'shared tenancy' a formal co-ownership type?"
      ],
      fieldStandard: "Small details become big defects when they affect eligibility, disclosure, borrower understanding, or exam answer selection."
    }
  ];

  const learningPath = [
    {
      day: 1,
      title: "Foundation, Licensing, Role, and Course Setup",
      outcome: "Understand what an MLO does, how licensing works, what the course/exam path requires, and how to study inside this app.",
      sections: [
        {
          category: "Syllabus",
          title: "Set up the study command center",
          items: [
            "Read the 5-Day Self-Paced Syllabus overview.",
            "Open the Full Compliance Master Manual V2 and skim the table of contents.",
            "Create your miss log categories: law, math, forms, ethics, products, timing, underwriting."
          ],
          links: [
            ["5-Day Self-Paced Syllabus", "library/PRINT_THIS_5_day_self_paced_syllabus.pdf"],
            ["Full Master Manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
          ]
        },
        {
          category: "Material",
          title: "Licensing path and MLO role",
          items: [
            "Study SAFE Act purpose, NMLS, sponsorship, temporary authority, and Texas SML/OCCC boundaries.",
            "Study Full Manual V2 Chapters 1, 2, 19, and 20.",
            "Answer: What can you do after course completion vs after passing the exam vs after sponsorship?"
          ],
          links: [
            ["Professional Handbook", "library/PRINT_THIS_professional_handbook.pdf"],
            ["Full Manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
          ]
        },
        {
          category: "Testing",
          title: "Exam map and baseline recall",
          items: [
            "Study flashcards 51-70 and 131-135.",
            "Run one quiz using SAFE/licensing/state categories if available.",
            "Write the NMLS content areas and weights from memory."
          ],
          action: "flashcards"
        },
        {
          category: "Law",
          title: "Licensing law boundaries",
          items: [
            "Define taking an application.",
            "Define offering or negotiating terms.",
            "Explain compensation or gain.",
            "Explain why one-off origination does not automatically avoid licensing."
          ],
          action: "complianceLab:course-execution"
        },
        {
          category: "Professional Practice",
          title: "Borrower-facing explanation",
          items: [
            "Write a 60-second explanation of what a loan officer does.",
            "Write what you can say before an application vs after an application.",
            "Practice explaining the process from borrower to MLO to processor to underwriter to title to closing."
          ],
          action: "misslog"
        }
      ]
    },
    {
      day: 2,
      title: "Federal Law, Disclosures, Timing, and Consumer Protection",
      outcome: "Master TRID, RESPA, TILA, ECOA, FCRA, HMDA, GLBA, UDAAP, adverse action, and disclosure timing.",
      sections: [
        {
          category: "Syllabus",
          title: "Federal law reading block",
          items: [
            "Study Professional Handbook Part II.",
            "Study Master Math/Timing Manual Parts 2-6.",
            "Study Full Manual V2 Chapters 4, 5, 6, 7, 16, and 22."
          ],
          links: [
            ["Master Math/Timing Manual", "library/PRINT_THIS_master_math_timing_manual.pdf"],
            ["Full Manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
          ]
        },
        {
          category: "Law",
          title: "Required law mastery",
          items: [
            "RESPA: Section 8, AfBA, escrow, servicing transfer.",
            "TILA/TRID: LE, CD, APR, finance charge, rescission.",
            "ECOA: protected classes, adverse action, notice timing.",
            "FCRA/FACTA: credit reports, permissible purpose, consumer rights.",
            "GLBA: Privacy, Safeguards, Pretexting.",
            "UDAAP: unfair, deceptive, abusive acts."
          ],
          action: "complianceLab:trid"
        },
        {
          category: "Compliance",
          title: "Timing and letters",
          items: [
            "Write six TRID application items.",
            "Write three CD restart events.",
            "Count LE, CD, rescission, ECOA, servicing transfer, and ownership transfer timing.",
            "Explain hello/goodbye servicing letters."
          ],
          action: "drills:timing"
        },
        {
          category: "Testing",
          title: "Federal law test block",
          items: [
            "Study flashcards 1-50 and 136-142.",
            "Run a 20-question quiz on all categories.",
            "Add every miss to the miss log with the correct rule."
          ],
          action: "quiz"
        },
        {
          category: "Professional Practice",
          title: "Disclosure conversation scripts",
          items: [
            "Explain why the LE cannot wait for bank statements.",
            "Explain CD timing to a borrower.",
            "Explain why a fee changed and what must happen next."
          ],
          action: "complianceLab:trid"
        }
      ]
    },
    {
      day: 3,
      title: "Products, Forms, Underwriting, 4 C's, and File Quality",
      outcome: "Understand product risk, URLA, appraisal, credit reports, income/assets, reserves, and underwriting decision logic.",
      sections: [
        {
          category: "Material",
          title: "Product and form review",
          items: [
            "Study Full Manual V2 Chapters 10, 12, 13, 21, 23, and 24.",
            "Open URLA, Loan Estimate, Closing Disclosure, Appraisal Form 1004, CHARM, FCRA Summary, Home Loan Toolkit.",
            "Identify what each form proves in a loan file."
          ],
          links: [
            ["Full Manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"],
            ["Advanced Compliance Manual", "library/PRINT_THIS_advanced_compliance_safe_exam_master_manual.pdf"]
          ]
        },
        {
          category: "Underwriting",
          title: "4 C's and document logic",
          items: [
            "Credit: credit report, payment history, inquiries, disputes.",
            "Capacity: income, employment, DTI, ATR.",
            "Cash: down payment, reserves, sourced funds, gifts.",
            "Collateral: appraisal, title, property type, occupancy."
          ],
          action: "complianceLab:safe-nuances"
        },
        {
          category: "Products",
          title: "ARM, HELOC, reverse, PMI/MIP",
          items: [
            "Explain ARM index + margin + caps.",
            "Explain HELOC draw period and repayment period.",
            "Explain reverse mortgage negative amortization and borrower obligations.",
            "Compare conventional PMI with FHA MIP and UFMIP."
          ],
          action: "complianceLab:products"
        },
        {
          category: "Testing",
          title: "Products and workflow test block",
          items: [
            "Study flashcards 71-100 and 144-145.",
            "Run a 20-question quiz.",
            "Complete one mock borrower file summary."
          ],
          action: "flashcards"
        },
        {
          category: "Professional Practice",
          title: "Underwriter-ready file thinking",
          items: [
            "Build a document request list for a W-2 borrower.",
            "Build a document request list for a self-employed borrower.",
            "Write a processor handoff note.",
            "Write an underwriter escalation note."
          ],
          action: "misslog"
        }
      ]
    },
    {
      day: 4,
      title: "Math, Loan Estimate Analysis, Reserves, Title, and Closing Mechanics",
      outcome: "Become fast and accurate with formulas, payment interpretation, LE/CD reading, reserves, title, and closing timing.",
      sections: [
        {
          category: "Math",
          title: "Formula mastery",
          items: [
            "Write LTV, CLTV, HCLTV, DTI, hourly income, biweekly income, discount points, daily interest, escrow cushion.",
            "Calculate 1.75% UFMIP on three sample loans.",
            "Calculate full payment using P&I + MI + escrow.",
            "Calculate discount point break-even."
          ],
          action: "drills:math"
        },
        {
          category: "Material",
          title: "Loan Estimate and Closing Disclosure analysis",
          items: [
            "Study Full Manual V2 Chapter 22.",
            "Open Loan Estimate and Closing Disclosure examples.",
            "Identify loan terms, projected payments, APR, TIP, closing costs, cash to close, prepaids, escrow, and servicing disclosure."
          ],
          links: [
            ["Full Manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"],
            ["Math/Timing Cheat Sheet", "library/PRINT_THIS_math_timing_cheat_sheet.pdf"]
          ]
        },
        {
          category: "Compliance",
          title: "Closing, rescission, title, and redisclosure",
          items: [
            "Explain CD timing.",
            "Explain rescission timing.",
            "Explain title insurance and lien priority.",
            "Explain which CD changes restart the waiting period."
          ],
          action: "complianceLab:trid"
        },
        {
          category: "Testing",
          title: "Math and timing benchmark",
          items: [
            "Complete at least 20 math drills.",
            "Complete at least 15 timing drills.",
            "Target 90% formula accuracy before moving on."
          ],
          action: "drills"
        },
        {
          category: "Professional Practice",
          title: "Borrower payment conversation",
          items: [
            "Explain full payment vs P&I.",
            "Explain discount points ethically.",
            "Explain cash to close.",
            "Explain why title can delay closing even if underwriting approves."
          ],
          action: "complianceLab:math-le"
        }
      ]
    },
    {
      day: 5,
      title: "Ethics, Fraud, Fair Lending, Advertising, QC, and Final Exam Simulation",
      outcome: "Integrate exam readiness with professional judgment: borrower harm, fraud escalation, fair lending, marketing rules, QC, and field conduct.",
      sections: [
        {
          category: "Ethics",
          title: "Ethics and borrower trust",
          items: [
            "Study Full Manual V2 Chapters 3, 4, 14, 15, 17, 18, and 25.",
            "Write your personal MLO ethics standard.",
            "Practice scripts for hidden debt, false income, referral fee, appraisal pressure, and closing guarantee pressure."
          ],
          action: "complianceLab:ethics"
        },
        {
          category: "Fraud",
          title: "Fraud red flags and escalation",
          items: [
            "Identify straw buyer, air loan, occupancy fraud, altered bank statements, fake VOE, gift manipulation, shell-company employment.",
            "Write a neutral escalation note.",
            "Explain SAR awareness without tipping off a borrower."
          ],
          action: "complianceLab:fraud"
        },
        {
          category: "Fair Lending",
          title: "Fair lending and marketing controls",
          items: [
            "Explain ECOA protected classes.",
            "Explain redlining vs reverse redlining.",
            "Explain discouragement.",
            "Explain TCPA call/text restrictions and 8 a.m. to 9 p.m. timing concept."
          ],
          action: "complianceLab:fair-lending"
        },
        {
          category: "Testing",
          title: "Final mixed simulation",
          items: [
            "Study flashcards 101-150.",
            "Run at least one 20-question quiz.",
            "Review all miss-log items.",
            "Write the top 25 rules from memory."
          ],
          action: "quiz"
        },
        {
          category: "Professional Practice",
          title: "Field-readiness check",
          items: [
            "Explain the entire loan process from lead to funded file.",
            "Explain how you communicate with underwriters.",
            "Explain what title does.",
            "Explain when you get paid and why funding matters.",
            "Create your first 30-day pipeline plan."
          ],
          action: "complianceLab:course-execution"
        }
      ]
    }
  ];

  const library = [
    ["Printable flashcards", "library/PRINT_THIS_MLO_FLASHCARDS.pdf", "Cut-out duplex flashcards."],
    ["Flashcard study deck", "library/PRINT_THIS_flashcard_study_deck.pdf", "Readable card list."],
    ["Math and timing cheat sheet", "library/PRINT_THIS_math_timing_cheat_sheet.pdf", "Fast formula and deadline review."],
    ["Professional handbook", "library/PRINT_THIS_professional_handbook.pdf", "Primary operational handbook and exam manual."],
    ["Master math/timing manual", "library/PRINT_THIS_master_math_timing_manual.pdf", "Detailed equations, dates, letters, and drills."],
    ["5-day training guide", "library/PRINT_THIS_5_day_training_guide.pdf", "Company-style training guide."],
    ["5-day self-paced syllabus", "library/PRINT_THIS_5_day_self_paced_syllabus.pdf", "Execution plan and tracking sheet."],
    ["Advanced compliance master manual", "library/PRINT_THIS_advanced_compliance_safe_exam_master_manual.pdf", "Enterprise-grade compliance, ethics, fraud, fair lending, underwriting, operations, and SAFE exam manual."],
    ["Codex-ready compliance generation prompt", "library/PRINT_THIS_codex_ready_mortgage_compliance_prompt.pdf", "Implementation prompt for generating future professional mortgage compliance manuals and app-ready PDFs."],
    ["Full compliance master manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf", "Full generated manual with course execution, SAFE nuances, forms, workflows, LE/CD analysis, practice workbook, and app-learning map."]
  ];

  let state = loadState();
  let currentDay = state.currentDay || 1;
  let filteredCards = [];
  let currentCardIndex = 0;
  let showingBack = false;
  let activeDrillType = "math";
  let quiz = null;
  let activeLabModuleId = state.activeLabModuleId || "ethics";

  function loadState() {
    try {
      return normalizeState(JSON.parse(localStorage.getItem(storageKey)) || defaultState());
    } catch {
      return defaultState();
    }
  }

  function defaultState() {
    return {
      cards: {},
      quizScores: [],
      dayChecks: {},
      learningPathChecks: {},
      sectionTestScores: [],
      labChecks: {},
      missLog: [],
      currentDay: 1
    };
  }

  function normalizeState(savedState) {
    return {
      ...defaultState(),
      ...savedState,
      cards: savedState.cards || {},
      quizScores: savedState.quizScores || [],
      dayChecks: savedState.dayChecks || {},
      learningPathChecks: savedState.learningPathChecks || {},
      sectionTestScores: savedState.sectionTestScores || [],
      labChecks: savedState.labChecks || {},
      missLog: savedState.missLog || []
    };
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
    renderDashboard();
  }

  function init() {
    document.getElementById("todayLabel").textContent = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    setupNav();
    renderDayTabs();
    renderSyllabus();
    setupFlashcards();
    setupQuiz();
    setupDrills();
    setupComplianceLab();
    setupMissLog();
    renderLibrary();
    setupUtilityButtons();
    renderDashboard();
  }

  function setupNav() {
    document.querySelectorAll(".nav-button").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.view));
    });
    document.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.jump));
    });
  }

  function showView(id) {
    document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === id));
    document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active-view", view.id === id));
  }

  function renderDashboard() {
    const statuses = Object.values(state.cards);
    const avg = state.quizScores.length
      ? Math.round(state.quizScores.reduce((sum, score) => sum + score, 0) / state.quizScores.length)
      : 0;
    const path = getTotalPathProgress();
    const mastery = getMasteryScore();

    document.getElementById("totalPathProgress").textContent = `${path.percent}%`;
    document.getElementById("masteryScore").textContent = `${mastery.score}%`;
    document.getElementById("currentGrade").textContent = mastery.grade;
    document.getElementById("quizAverage").textContent = `${avg}%`;
    document.getElementById("recommendedDay").textContent = `Day ${currentDay}`;

    const plan = learningPath.find((day) => day.day === currentDay) || learningPath[0];
    const remaining = countLearningPathRemaining(plan.day);
    document.getElementById("todayPlan").innerHTML = `
      <h3>${plan.title}</h3>
      <p>${plan.outcome}</p>
      ${renderProgressBar(remaining.completed, remaining.total, "Today")}
      <ul>${plan.sections.slice(0, 3).map((item) => `<li><strong>${item.category}:</strong> ${item.title}</li>`).join("")}</ul>
    `;

    const weakCategories = cards
      .filter((card) => state.cards[card.id]?.status === "missed")
      .reduce((acc, card) => {
        acc[card.category] = (acc[card.category] || 0) + 1;
        return acc;
      }, {});
    const weakList = Object.entries(weakCategories).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const lowSectionTests = (state.sectionTestScores || [])
      .filter((test) => test.score < 80)
      .slice(0, 5);
    const weakHtml = [];
    if (weakList.length) {
      weakHtml.push(`<ul>${weakList.map(([cat, count]) => `<li><strong>${cat}</strong>: ${count} missed</li>`).join("")}</ul>`);
    }
    if (lowSectionTests.length) {
      weakHtml.push(`<h4>Retest Targets</h4><ul>${lowSectionTests.map((test) => `<li><strong>Day ${test.day} - ${test.category}</strong>: ${test.score}% on ${test.section}</li>`).join("")}</ul>`);
    }
    document.getElementById("weakAreas").innerHTML = weakHtml.length
      ? weakHtml.join("")
      : "<p>No weak areas logged yet. Start with flashcards, section tests, or a quiz.</p>";

    renderMasteryBreakdown();
  }

  function renderDayTabs() {
    const tabs = document.getElementById("dayTabs");
    tabs.innerHTML = learningPath.map((day) => `<button class="segment ${day.day === currentDay ? "active" : ""}" data-day="${day.day}">Day ${day.day}</button>`).join("");
    tabs.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        currentDay = Number(button.dataset.day);
        state.currentDay = currentDay;
        saveState();
        renderDayTabs();
        renderSyllabus();
      });
    });
  }

  function renderSyllabus() {
    const day = learningPath.find((item) => item.day === currentDay);
    document.getElementById("dayDetail").innerHTML = `
      <article class="day-card">
        <p class="eyebrow">Day ${day.day}</p>
        <h2>${day.title}</h2>
        <p>${day.outcome}</p>
        ${renderProgressBar(countLearningPathRemaining(day.day).completed, countLearningPathRemaining(day.day).total, `Day ${day.day}`)}
        <div class="lab-actions">
          <button class="secondary-button" data-mark-day="${day.day}">Mark day review complete</button>
          <button class="secondary-button" data-clear-day="${day.day}">Clear day checks</button>
        </div>
      </article>
      ${day.sections.map((section, sectionIndex) => renderLearningSection(day.day, section, sectionIndex)).join("")}
    `;
    document.querySelectorAll("[data-path-check]").forEach((box) => {
      box.addEventListener("change", () => {
        state.learningPathChecks = state.learningPathChecks || {};
        state.learningPathChecks[box.dataset.pathCheck] = box.checked;
        saveState();
      });
    });
    document.querySelectorAll("[data-path-jump]").forEach((button) => {
      button.addEventListener("click", () => handlePathJump(button.dataset.pathJump));
    });
    document.querySelectorAll("[data-section-test]").forEach((button) => {
      button.addEventListener("click", () => startSectionTest(button.dataset.sectionTest));
    });
    document.querySelectorAll("[data-mark-day]").forEach((button) => {
      button.addEventListener("click", () => {
        const dayNumber = Number(button.dataset.markDay);
        const dayPlan = learningPath.find((item) => item.day === dayNumber);
        state.learningPathChecks = state.learningPathChecks || {};
        dayPlan.sections.forEach((section, sectionIndex) => {
          section.items.forEach((_, itemIndex) => {
            state.learningPathChecks[`day-${dayNumber}-section-${sectionIndex}-item-${itemIndex}`] = true;
          });
        });
        saveState();
        renderSyllabus();
      });
    });
    document.querySelectorAll("[data-clear-day]").forEach((button) => {
      button.addEventListener("click", () => {
        const dayNumber = Number(button.dataset.clearDay);
        const prefix = `day-${dayNumber}-`;
        state.learningPathChecks = Object.fromEntries(Object.entries(state.learningPathChecks || {}).filter(([key]) => !key.startsWith(prefix)));
        saveState();
        renderSyllabus();
      });
    });
  }

  function renderLearningSection(dayNumber, section, sectionIndex) {
    return `
      <article class="day-card path-section">
        <div class="path-section-header">
          <span class="category-badge">${section.category}</span>
          <h3>${section.title}</h3>
        </div>
        ${renderProgressBar(getSectionProgress(dayNumber, sectionIndex).completed, getSectionProgress(dayNumber, sectionIndex).total, "Section")}
        <div class="checklist">
          ${section.items.map((item, itemIndex) => {
            const key = `day-${dayNumber}-section-${sectionIndex}-item-${itemIndex}`;
            const checked = state.learningPathChecks?.[key] ? "checked" : "";
            return `<label class="checkline"><input type="checkbox" data-path-check="${key}" ${checked}> <span>${item}</span></label>`;
          }).join("")}
        </div>
        ${section.links ? `<div class="resource-links">${section.links.map(([label, href]) => `<a href="${href}" target="_blank">${label}</a>`).join("")}</div>` : ""}
        <div class="lab-actions">
          ${section.action ? `<button class="secondary-button small" data-path-jump="${section.action}">Open related app section</button>` : ""}
          <button class="primary-button small" data-section-test="${dayNumber}:${sectionIndex}">Take section test</button>
        </div>
      </article>
    `;
  }

  function handlePathJump(action) {
    if (action.startsWith("complianceLab:")) {
      activeLabModuleId = action.split(":")[1];
      state.activeLabModuleId = activeLabModuleId;
      saveState();
      const select = document.getElementById("labModuleSelect");
      if (select) select.value = activeLabModuleId;
      renderComplianceLab();
      showView("complianceLab");
      return;
    }
    if (action.startsWith("drills:")) {
      activeDrillType = action.split(":")[1];
      document.querySelectorAll("[data-drill]").forEach((button) => {
        button.classList.toggle("active", button.dataset.drill === activeDrillType);
      });
      renderDrills();
      showView("drills");
      return;
    }
    showView(action);
  }

  function startSectionTest(sectionKey) {
    const [dayNumber, sectionIndex] = sectionKey.split(":").map(Number);
    const day = learningPath.find((item) => item.day === dayNumber);
    const section = day?.sections?.[sectionIndex];
    if (!section) return;
    const questionCount = dayNumber === 5 ? 25 : section.category === "Testing" ? 25 : 10;
    const keywordPool = getCardsForSection(section);
    const pool = keywordPool.length >= questionCount ? keywordPool : cards;
    const questions = shuffle(pool).slice(0, questionCount).map((card) => {
      const wrong = shuffle(cards.filter((item) => item.id !== card.id)).slice(0, 3).map((item) => item.back);
      return { card, options: shuffle([card.back, ...wrong]), answered: false, correct: false };
    });
    quiz = {
      questions,
      index: 0,
      correct: 0,
      sectionTest: {
        day: dayNumber,
        section: section.title,
        category: section.category
      }
    };
    showView("quiz");
    renderQuizQuestion();
  }

  function getCardsForSection(section) {
    const haystack = `${section.category} ${section.title} ${section.items.join(" ")}`.toLowerCase();
    const keywords = [
      ["licens", ["SAFE Act / Licensing", "Texas-Specific Focus"]],
      ["texas", ["Texas-Specific Focus", "SAFE Act / Licensing"]],
      ["respa", ["RESPA / Regulation X"]],
      ["trid", ["TRID"]],
      ["tila", ["TILA / Regulation Z"]],
      ["ecoa", ["ECOA / Regulation B"]],
      ["fcra", ["Other Federal Laws"]],
      ["glba", ["Other Federal Laws"]],
      ["timing", ["TRID", "Mixed Final Review"]],
      ["underwriting", ["Origination Workflow", "Mortgage Products and Terms"]],
      ["product", ["Mortgage Products and Terms"]],
      ["arm", ["Mortgage Products and Terms"]],
      ["heloc", ["Mortgage Products and Terms"]],
      ["math", ["Calculations"]],
      ["payment", ["Calculations"]],
      ["ethics", ["Ethics, Fraud, and Prohibited Conduct"]],
      ["fraud", ["Ethics, Fraud, and Prohibited Conduct"]],
      ["fair lending", ["ECOA / Regulation B", "Ethics, Fraud, and Prohibited Conduct"]]
    ];
    const categories = new Set();
    keywords.forEach(([keyword, cats]) => {
      if (haystack.includes(keyword)) cats.forEach((cat) => categories.add(cat));
    });
    if (!categories.size) return [];
    return cards.filter((card) => categories.has(card.category));
  }

  function countLearningPathRemaining(dayNumber) {
    const plan = learningPath.find((item) => item.day === dayNumber);
    if (!plan) return { completed: 0, total: 0 };
    let total = 0;
    let completed = 0;
    plan.sections.forEach((section, sectionIndex) => {
      section.items.forEach((_, itemIndex) => {
        total += 1;
        const key = `day-${dayNumber}-section-${sectionIndex}-item-${itemIndex}`;
        if (state.learningPathChecks?.[key]) completed += 1;
      });
    });
    return { completed, total };
  }

  function getSectionProgress(dayNumber, sectionIndex) {
    const plan = learningPath.find((item) => item.day === dayNumber);
    const section = plan?.sections?.[sectionIndex];
    if (!section) return { completed: 0, total: 0 };
    let completed = 0;
    section.items.forEach((_, itemIndex) => {
      const key = `day-${dayNumber}-section-${sectionIndex}-item-${itemIndex}`;
      if (state.learningPathChecks?.[key]) completed += 1;
    });
    return { completed, total: section.items.length };
  }

  function getTotalPathProgress() {
    let total = 0;
    let completed = 0;
    learningPath.forEach((day) => {
      const result = countLearningPathRemaining(day.day);
      total += result.total;
      completed += result.completed;
    });
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function renderProgressBar(completed, total, label) {
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return `
      <div class="progress-wrap">
        <div class="progress-label"><span>${label}</span><span>${completed}/${total} - ${percent}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
      </div>
    `;
  }

  function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    if (score > 0) return "F";
    return "N/A";
  }

  function getMasteryScore() {
    const path = getTotalPathProgress().percent;
    const known = Object.values(state.cards).filter((item) => item.status === "known").length;
    const cardScore = cards.length ? Math.round((known / cards.length) * 100) : 0;
    const quizScore = state.quizScores.length
      ? Math.round(state.quizScores.reduce((sum, score) => sum + score, 0) / state.quizScores.length)
      : 0;
    const sectionScore = state.sectionTestScores.length
      ? Math.round(state.sectionTestScores.reduce((sum, test) => sum + test.score, 0) / state.sectionTestScores.length)
      : 0;
    const labScore = getLabCompletionPercent();
    const available = [path, cardScore, labScore];
    if (state.quizScores.length) available.push(quizScore);
    if (state.sectionTestScores.length) available.push(sectionScore);
    const score = Math.round(available.reduce((sum, item) => sum + item, 0) / available.length);
    return { score, grade: getGrade(score), path, cardScore, quizScore, sectionScore, labScore };
  }

  function getLabCompletionPercent() {
    const moduleIds = complianceModules.map((module) => module.id);
    let total = 0;
    let completed = 0;
    moduleIds.forEach((id) => {
      const module = complianceModules.find((item) => item.id === id);
      const count = module.practice.length + module.examPrompts.length + 4;
      total += count;
      Object.keys(state.labChecks?.[id] || {}).forEach((key) => {
        if (state.labChecks[id][key]) completed += 1;
      });
    });
    return total ? Math.round((completed / total) * 100) : 0;
  }

  function renderMasteryBreakdown() {
    const sectionAverage = state.sectionTestScores.length
      ? Math.round(state.sectionTestScores.reduce((sum, test) => sum + test.score, 0) / state.sectionTestScores.length)
      : 0;
    const categories = [
      { name: "Pathway", value: getTotalPathProgress().percent, note: "Day 1-Day 5 checklist completion" },
      { name: "Flashcards", value: cards.length ? Math.round((Object.values(state.cards).filter((item) => item.status === "known").length / cards.length) * 100) : 0, note: "Known cards out of full deck" },
      { name: "Compliance Lab", value: getLabCompletionPercent(), note: "Applied module completion" },
      { name: "Section Tests", value: sectionAverage, note: `${state.sectionTestScores.length || 0} pathway tests completed` },
      { name: "Quiz/Test Average", value: state.quizScores.length ? Math.round(state.quizScores.reduce((sum, score) => sum + score, 0) / state.quizScores.length) : 0, note: "Average scored assessments" }
    ];
    document.getElementById("masteryBreakdown").innerHTML = categories.map((item) => `
      <div class="mastery-card">
        <h4>${item.name} <span class="grade-pill">${getGrade(item.value)}</span></h4>
        ${renderProgressBar(item.value, 100, item.note)}
      </div>
    `).join("");
  }

  function setupFlashcards() {
    const categories = [...new Set(cards.map((card) => card.category))];
    const quizCategory = document.getElementById("quizCategory");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      quizCategory.appendChild(option);
    });

    document.getElementById("cardDayFilter").addEventListener("change", renderFlashcards);
    document.getElementById("cardModeFilter").addEventListener("change", renderFlashcards);
    document.getElementById("flipCard").addEventListener("click", () => {
      showingBack = !showingBack;
      renderCurrentCard();
    });
    document.getElementById("nextCard").addEventListener("click", () => moveCard(1));
    document.getElementById("prevCard").addEventListener("click", () => moveCard(-1));
    document.getElementById("markKnown").addEventListener("click", () => markCard("known"));
    document.getElementById("markMissed").addEventListener("click", () => markCard("missed"));
    renderFlashcards();
  }

  function renderFlashcards() {
    const day = document.getElementById("cardDayFilter").value;
    const mode = document.getElementById("cardModeFilter").value;
    filteredCards = cards.filter((card) => {
      const status = state.cards[card.id]?.status || "unknown";
      const dayMatch = day === "all" || String(card.day) === day;
      const modeMatch = mode === "all" || status === mode;
      return dayMatch && modeMatch;
    });
    currentCardIndex = 0;
    showingBack = false;
    renderCurrentCard();
    renderCardList();
  }

  function renderCurrentCard() {
    const card = filteredCards[currentCardIndex];
    if (!card) {
      document.getElementById("cardMeta").textContent = "No cards in this filter.";
      document.getElementById("cardSideLabel").textContent = "Empty";
      document.getElementById("cardText").textContent = "Adjust the filters or reset progress.";
      return;
    }
    document.getElementById("cardMeta").textContent = `#${card.number} â€¢ Day ${card.day} â€¢ ${card.category}`;
    document.getElementById("cardSideLabel").textContent = showingBack ? "Back" : "Front";
    document.getElementById("cardText").textContent = showingBack ? card.back : card.front;
  }

  function renderCardList() {
    const list = document.getElementById("cardList");
    list.innerHTML = filteredCards.map((card, index) => {
      const status = state.cards[card.id]?.status || "unknown";
      const pill = status === "known" ? `<span class="status-pill status-known">known</span>` : status === "missed" ? `<span class="status-pill status-missed">missed</span>` : "";
      return `<button class="${index === currentCardIndex ? "active" : ""}" data-index="${index}">#${card.number} ${card.front.slice(0, 64)}${pill}</button>`;
    }).join("");
    list.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        currentCardIndex = Number(button.dataset.index);
        showingBack = false;
        renderCurrentCard();
        renderCardList();
      });
    });
  }

  function moveCard(step) {
    if (!filteredCards.length) return;
    currentCardIndex = (currentCardIndex + step + filteredCards.length) % filteredCards.length;
    showingBack = false;
    renderCurrentCard();
    renderCardList();
  }

  function markCard(status) {
    const card = filteredCards[currentCardIndex];
    if (!card) return;
    state.cards[card.id] = { status, reviewedAt: new Date().toISOString() };
    if (status === "missed") {
      state.missLog.unshift({
        id: `miss-${Date.now()}`,
        concept: card.front,
        why: "Missed flashcard.",
        rule: card.back,
        example: card.category,
        createdAt: new Date().toISOString()
      });
    }
    saveState();
    renderCurrentCard();
    renderCardList();
    renderMissLog();
  }

  function setupQuiz() {
    document.getElementById("startQuiz").addEventListener("click", startQuiz);
  }

  function startQuiz() {
    const category = document.getElementById("quizCategory").value;
    const pool = cards.filter((card) => category === "all" || card.category === category);
    const questions = shuffle(pool).slice(0, 20).map((card) => {
      const wrong = shuffle(cards.filter((item) => item.id !== card.id)).slice(0, 3).map((item) => item.back);
      return { card, options: shuffle([card.back, ...wrong]), answered: false, correct: false };
    });
    quiz = { questions, index: 0, correct: 0 };
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const area = document.getElementById("quizArea");
    if (!quiz || quiz.index >= quiz.questions.length) {
      if (!quiz) {
        area.innerHTML = `<article class="quiz-card"><h3>Start a quiz</h3><p>Choose a category and run a 20-question set.</p></article>`;
        return;
      }
      const score = Math.round((quiz.correct / quiz.questions.length) * 100);
      state.quizScores.push(score);
      if (quiz.sectionTest) {
        state.sectionTestScores = state.sectionTestScores || [];
        state.sectionTestScores.unshift({
          ...quiz.sectionTest,
          score,
          correct: quiz.correct,
          total: quiz.questions.length,
          takenAt: new Date().toISOString()
        });
        if (score < 80) {
          state.missLog.unshift({
            id: `miss-${Date.now()}`,
            concept: `${quiz.sectionTest.category}: ${quiz.sectionTest.section}`,
            why: `Section test score below target: ${score}%.`,
            rule: "Review the related day section, complete missed flashcards, and retest until 80% or higher.",
            example: `Day ${quiz.sectionTest.day} section test`,
            createdAt: new Date().toISOString()
          });
        }
      }
      saveState();
      const source = quiz.sectionTest ? `<p><strong>Section:</strong> Day ${quiz.sectionTest.day} - ${quiz.sectionTest.category}: ${quiz.sectionTest.section}</p>` : "";
      area.innerHTML = `<article class="quiz-card"><h3>${quiz.sectionTest ? "Section test complete" : "Quiz complete"}</h3>${source}<p>Score: <strong>${score}%</strong> (${quiz.correct}/${quiz.questions.length})</p><p>Grade: <strong>${getGrade(score)}</strong></p><button class="primary-button" id="restartQuiz">Run another quiz</button></article>`;
      document.getElementById("restartQuiz").addEventListener("click", startQuiz);
      return;
    }
    const item = quiz.questions[quiz.index];
    area.innerHTML = `
      <article class="quiz-card">
        <p class="eyebrow">Question ${quiz.index + 1} of ${quiz.questions.length}</p>
        <h3>${item.card.front}</h3>
        <div class="quiz-options">
          ${item.options.map((option) => `<button data-answer="${escapeAttr(option)}">${option}</button>`).join("")}
        </div>
        <div id="quizFeedback" class="feedback"></div>
      </article>
    `;
    area.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => answerQuiz(button, item));
    });
  }

  function answerQuiz(button, item) {
    if (item.answered) return;
    item.answered = true;
    const chosen = button.dataset.answer;
    const correct = chosen === item.card.back;
    item.correct = correct;
    if (correct) quiz.correct += 1;
    button.classList.add(correct ? "correct" : "wrong");
    document.querySelectorAll("[data-answer]").forEach((option) => {
      if (option.dataset.answer === item.card.back) option.classList.add("correct");
    });
    const feedback = document.getElementById("quizFeedback");
    feedback.className = `feedback ${correct ? "good" : "bad"}`;
    feedback.textContent = correct ? "Correct." : `Correct answer: ${item.card.back}`;
    if (!correct) {
      state.cards[item.card.id] = { status: "missed", reviewedAt: new Date().toISOString() };
      state.missLog.unshift({
        id: `miss-${Date.now()}`,
        concept: item.card.front,
        why: "Missed quiz question.",
        rule: item.card.back,
        example: item.card.category,
        createdAt: new Date().toISOString()
      });
      saveState();
      renderMissLog();
    }
    setTimeout(() => {
      quiz.index += 1;
      renderQuizQuestion();
    }, 1400);
  }

  function setupDrills() {
    document.querySelectorAll("[data-drill]").forEach((button) => {
      button.addEventListener("click", () => {
        activeDrillType = button.dataset.drill;
        document.querySelectorAll("[data-drill]").forEach((btn) => btn.classList.toggle("active", btn === button));
        renderDrills();
      });
    });
    renderDrills();
  }

  function setupComplianceLab() {
    const select = document.getElementById("labModuleSelect");
    select.innerHTML = complianceModules.map((module) => `<option value="${module.id}">${module.title}</option>`).join("");
    select.value = activeLabModuleId;
    select.addEventListener("change", () => {
      activeLabModuleId = select.value;
      state.activeLabModuleId = activeLabModuleId;
      saveState();
      renderComplianceLab();
    });
    renderComplianceLab();
  }

  function renderComplianceLab() {
    const module = complianceModules.find((item) => item.id === activeLabModuleId) || complianceModules[0];
    const checks = state.labChecks?.[module.id] || {};
    document.getElementById("labModule").innerHTML = `
      <article class="lab-card">
        <p class="eyebrow">${module.source}</p>
        <h2>${module.title}</h2>
        <p>${module.fieldStandard}</p>
        <div class="lab-actions">
          <a class="secondary-button" href="library/PRINT_THIS_advanced_compliance_safe_exam_master_manual.pdf" target="_blank">Open advanced manual</a>
          <button class="secondary-button" data-lab-miss="${module.id}">Log a miss from this module</button>
        </div>
      </article>
      <div class="lab-grid">
        <article class="lab-card">
          <h3>Context Ladder</h3>
          <div class="context-stack">
            ${Object.entries(module.context).map(([label, text]) => `
              <div class="context-row">
                <strong>${formatContextLabel(label)}</strong>
                <span>${text}</span>
              </div>
            `).join("")}
          </div>
        </article>
        <article class="lab-card">
          <h3>Practice Tasks</h3>
          <div class="prompt-list">
            ${module.practice.map((item, index) => renderLabCheck(module.id, `practice-${index}`, item)).join("")}
          </div>
        </article>
      </div>
      <div class="lab-grid">
        <article class="lab-card">
          <h3>Exam Application</h3>
          <p>Answer these out loud first, then write the rule in your miss log if you hesitate.</p>
          <div class="prompt-list">
            ${module.examPrompts.map((item, index) => renderLabCheck(module.id, `exam-${index}`, item)).join("")}
          </div>
        </article>
        <article class="lab-card">
          <h3>Mastery Standard</h3>
          <p>To clear this module, you should be able to explain it from four angles without notes: borrower, MLO, underwriter, and compliance/QC.</p>
          <div class="prompt-list">
            ${[
              "Explain the topic in plain English to a borrower.",
              "Explain what the MLO must do in the file.",
              "Explain what underwriting or QC would test.",
              "Explain how the SAFE exam is likely to frame the issue."
            ].map((item, index) => renderLabCheck(module.id, `mastery-${index}`, item)).join("")}
          </div>
        </article>
      </div>
    `;

    document.querySelectorAll("[data-lab-check]").forEach((box) => {
      box.addEventListener("change", () => {
        state.labChecks = state.labChecks || {};
        state.labChecks[module.id] = state.labChecks[module.id] || {};
        state.labChecks[module.id][box.dataset.labCheck] = box.checked;
        saveState();
      });
    });

    document.querySelectorAll("[data-lab-miss]").forEach((button) => {
      button.addEventListener("click", () => {
        state.missLog.unshift({
          id: `miss-${Date.now()}`,
          concept: module.title,
          why: "Compliance Lab module needs review.",
          rule: module.context.exam,
          example: module.fieldStandard,
          createdAt: new Date().toISOString()
        });
        saveState();
        renderMissLog();
        showView("misslog");
      });
    });
  }

  function renderLabCheck(moduleId, key, text) {
    const checked = state.labChecks?.[moduleId]?.[key] ? "checked" : "";
    return `<label class="prompt-item checkline"><input type="checkbox" data-lab-check="${key}" ${checked}> <span>${text}</span></label>`;
  }

  function formatContextLabel(label) {
    const labels = {
      what: "What it is",
      why: "Why it exists",
      file: "How it works in a real file",
      underwriter: "How underwriting views it",
      compliance: "How compliance/QC monitors it",
      exam: "How it appears on the exam"
    };
    return labels[label] || label;
  }

  function renderDrills() {
    const items = activeDrillType === "math" ? mathDrills : timingDrills;
    document.getElementById("drillArea").innerHTML = items.map((item) => `
      <article class="drill-card">
        <h3>${item.prompt}</h3>
        <form data-drill-form="${item.id}">
          <input name="answer" placeholder="Your answer" autocomplete="off">
          <button class="primary-button" type="submit">Check</button>
        </form>
        <div class="feedback" id="feedback-${item.id}"></div>
      </article>
    `).join("");
    document.querySelectorAll("[data-drill-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const id = form.dataset.drillForm;
        const item = items.find((drill) => drill.id === id);
        const value = form.answer.value.trim();
        const ok = compareAnswer(value, item.answer);
        const feedback = document.getElementById(`feedback-${id}`);
        feedback.className = `feedback ${ok ? "good" : "bad"}`;
        feedback.textContent = ok ? `Correct. ${item.explanation}` : `Review: ${item.explanation}`;
        if (!ok) {
          state.missLog.unshift({
            id: `miss-${Date.now()}`,
            concept: item.prompt,
            why: `${activeDrillType} drill miss.`,
            rule: item.explanation,
            example: value,
            createdAt: new Date().toISOString()
          });
          saveState();
          renderMissLog();
        }
      });
    });
  }

  function compareAnswer(value, expected) {
    const numericValue = Number(value.replace(/[$,%]/g, ""));
    const numericExpected = Number(String(expected).replace(/[$,%]/g, ""));
    if (!Number.isNaN(numericValue) && !Number.isNaN(numericExpected)) {
      return Math.abs(numericValue - numericExpected) <= 0.05;
    }
    return value.toLowerCase().includes(String(expected).toLowerCase());
  }

  function setupMissLog() {
    document.getElementById("addMiss").addEventListener("click", () => {
      const template = document.getElementById("missFormTemplate");
      const clone = template.content.cloneNode(true);
      const list = document.getElementById("missLogList");
      list.prepend(clone);
      const form = list.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        state.missLog.unshift({
          id: `miss-${Date.now()}`,
          concept: form.concept.value,
          why: form.why.value,
          rule: form.rule.value,
          example: form.example.value,
          createdAt: new Date().toISOString()
        });
        saveState();
        renderMissLog();
      });
      form.querySelector(".cancel-miss").addEventListener("click", renderMissLog);
    });
    renderMissLog();
  }

  function renderMissLog() {
    const list = document.getElementById("missLogList");
    if (!state.missLog.length) {
      list.innerHTML = `<article class="miss-item"><h3>No misses logged yet</h3><p>Missed flashcards, quiz questions, and drills will appear here.</p></article>`;
      return;
    }
    list.innerHTML = state.missLog.map((item) => `
      <article class="miss-item">
        <h3>${item.concept}</h3>
        <p><strong>Why:</strong> ${item.why || "Not recorded."}</p>
        <p><strong>Correct rule:</strong> ${item.rule || "Not recorded."}</p>
        <p><strong>Example:</strong> ${item.example || "Not recorded."}</p>
        <button class="secondary-button small" data-remove-miss="${item.id}">Clear</button>
      </article>
    `).join("");
    list.querySelectorAll("[data-remove-miss]").forEach((button) => {
      button.addEventListener("click", () => {
        state.missLog = state.missLog.filter((item) => item.id !== button.dataset.removeMiss);
        saveState();
        renderMissLog();
      });
    });
  }

  function renderLibrary() {
    document.getElementById("libraryLinks").innerHTML = library.map(([title, href, desc]) => `
      <article class="library-card">
        <h3><a href="${href}" target="_blank">${title}</a></h3>
        <p>${desc}</p>
      </article>
    `).join("");
  }

  function setupUtilityButtons() {
    document.getElementById("exportProgress").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `texas-mlo-progress-${today.toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    });
    document.getElementById("resetProgress").addEventListener("click", () => {
      if (!confirm("Reset all app progress on this browser?")) return;
      state = defaultState();
      saveState();
      renderSyllabus();
      renderFlashcards();
      renderMissLog();
    });
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function escapeAttr(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
  }

  init();
})();

