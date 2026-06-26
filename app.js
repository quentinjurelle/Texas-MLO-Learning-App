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

  const chapterAssignments = [
    {
      id: "chapter-1",
      chapter: "Chapter 1",
      title: "Mortgage Industry, Licensing, and MLO Role",
      objective: "Build the foundation: what an MLO does, how NMLS/SAFE licensing works, and how the loan process moves from lead to funding.",
      reading: [
        "Read the 5-Day Training Guide sections on licensing path, course setup, exam path, and first-week execution.",
        "Read the Professional Handbook introduction and MLO workflow sections.",
        "Review the Full Manual V2 table of contents and identify where licensing, operations, forms, math, and compliance live."
      ],
      practice: [
        "Explain the MLO role in one borrower-friendly paragraph.",
        "Write the sequence: education, exam, licensing application, sponsorship, onboarding, production.",
        "Describe who touches a loan file from lead to closing: borrower, MLO, processor, underwriter, title, closer, servicer."
      ],
      mastery: [
        "You can explain the career path without guessing.",
        "You can distinguish pre-qualification, application, processing, underwriting, closing, and funding.",
        "You can state why an MLO is a licensed advisor, not just a paperwork collector."
      ],
      links: [
        ["5-day training guide", "library/PRINT_THIS_5_day_training_guide.pdf"],
        ["Professional handbook", "library/PRINT_THIS_professional_handbook.pdf"]
      ],
      questions: [
        ["What is the best plain-English description of an MLO's role?", ["Guide borrowers through mortgage options, application, documentation, and closing coordination.", "Perform the title search and issue title insurance.", "Approve loans without underwriting review.", "Set federal interest rates."], 0],
        ["Which sequence best reflects the licensing path?", ["Education, exam, application/background items, sponsorship/onboarding.", "Closing, appraisal, education, sponsorship.", "Title search, exam, appraisal, funding.", "Marketing, commission, sponsorship, education."], 0],
        ["Why is licensing required for MLOs?", ["Because MLOs handle consumer financial decisions and must meet legal competency and character standards.", "Because all real estate agents must also be MLOs.", "Because lenders cannot advertise without title insurance.", "Because the borrower must pay discount points."], 0],
        ["Which party usually makes the underwriting credit decision?", ["Underwriter/lender according to guidelines.", "Title company.", "Listing agent.", "County recorder."], 0],
        ["What happens at funding?", ["Loan proceeds are released according to closing instructions.", "The borrower first applies for credit.", "The appraisal is ordered.", "The credit report is frozen."], 0],
        ["Which task is closest to an MLO's consultative work?", ["Explaining loan options, documentation needs, payment structure, and timeline.", "Recording the deed in county records personally.", "Guaranteeing property value.", "Changing credit report data."], 0],
        ["What is a pipeline?", ["A tracked set of leads, applications, active files, approvals, closings, and follow-ups.", "Only loans that have already funded.", "Only denied applications.", "Only title company files."], 0],
        ["What should a new MLO avoid saying before approval?", ["Guaranteed approval.", "Here is what documentation we need to review.", "Underwriting will make the final decision.", "These are possible loan options."], 0],
        ["Why do referrals matter in mortgage lending?", ["Trust and reputation drive repeat and referred borrower relationships.", "Referrals replace licensing duties.", "Referrals eliminate underwriting.", "Referrals remove disclosure requirements."], 0],
        ["What is the best mindset for Chapter 1?", ["Understand the process and professional role before trying to sell loans.", "Memorize scripts only.", "Skip licensing details.", "Focus only on commission math."], 0]
      ]
    },
    {
      id: "chapter-2",
      chapter: "Chapter 2",
      title: "Federal Law, Disclosures, and Timing Rules",
      objective: "Master the legal framework that protects borrowers and controls MLO conduct: TILA, RESPA, TRID, ECOA, FCRA, HMDA, GLBA, UDAAP, and servicing transfer timing.",
      reading: [
        "Read Master Math/Timing Manual timing charts for LE, CD, rescission, adverse action, servicing transfer, and ECOA/FCRA notices.",
        "Read Professional Handbook federal law sections.",
        "Read Full Manual V2 chapters covering TILA/RESPA/TRID, ECOA, FCRA, GLBA, UDAAP, HMDA, TCPA, and HOEPA."
      ],
      practice: [
        "Create a one-page timing chart with application, LE, intent to proceed, CD, closing, rescission, and servicing transfer milestones.",
        "Explain why disclosures exist from the borrower, lender, compliance, and examiner perspective.",
        "Write one compliant and one non-compliant advertising statement."
      ],
      mastery: [
        "You can identify which law applies to a fact pattern.",
        "You can distinguish LE vs CD timing.",
        "You can explain why misleading omissions create UDAAP risk."
      ],
      links: [
        ["Master math/timing manual", "library/PRINT_THIS_master_math_timing_manual.pdf"],
        ["Full compliance master manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
      ],
      questions: [
        ["What does TRID primarily combine?", ["TILA and RESPA mortgage disclosure requirements.", "HMDA and GLBA cybersecurity rules.", "FCRA and ECOA credit reporting rules.", "SAFE and state sponsorship rules."], 0],
        ["What is the Loan Estimate designed to help a borrower understand?", ["Key loan terms, projected payments, and estimated closing costs.", "Only the final title policy.", "Only the appraisal value.", "Only the real estate commission."], 0],
        ["What is the Closing Disclosure used for?", ["Final loan terms and closing cost details before consummation.", "Initial marketing only.", "Credit reporting disputes only.", "Servicing complaints only."], 0],
        ["Which law is most directly tied to adverse action notice requirements?", ["ECOA/Regulation B.", "GLBA Safeguards Rule only.", "TCPA only.", "RESPA Section 6 only."], 0],
        ["What does FCRA regulate in this context?", ["Use, accuracy, and consumer rights involving credit report information.", "County deed recording.", "Loan officer compensation plans.", "Title vesting only."], 0],
        ["What is GLBA mainly concerned with?", ["Consumer privacy, safeguarding information, and preventing pretexting.", "Appraisal sales comparison grids.", "ARM margin calculation only.", "Foreclosure bidding."], 0],
        ["A misleading payment claim that omits major cost information may create what risk?", ["UDAAP/deceptive practice risk.", "Only title curative risk.", "Only escrow surplus risk.", "Only probate risk."], 0],
        ["What does HMDA help regulators monitor?", ["Mortgage lending patterns, access to credit, and possible discrimination.", "Borrower text message consent only.", "Flood insurance escrow only.", "Credit card reward points."], 0],
        ["In general TCPA calling rules, consumer calls are commonly allowed during what window?", ["8 a.m. to 9 p.m. local time, subject to consent/DNC restrictions.", "Midnight to 6 a.m.", "Only on Sundays.", "Anytime if the lead was purchased."], 0],
        ["Why do timing rules matter operationally?", ["Wrong timing can delay closing, create violations, and trigger redisclosure or liability.", "They replace underwriting.", "They eliminate borrower signatures.", "They determine property taxes."], 0]
      ]
    },
    {
      id: "chapter-3",
      chapter: "Chapter 3",
      title: "Products, 4 C's, URLA, Credit, Capacity, Cash, and Collateral",
      objective: "Understand common mortgage products and how underwriters evaluate loan quality through credit, capacity, cash, and collateral.",
      reading: [
        "Read the Chapter 3 manual if available and the Full Manual V2 underwriting/product sections.",
        "Review URLA/1003 concepts, borrower declarations, identity/alias fields, occupancy, and demographic information.",
        "Study ARM, HELOC, PMI, FHA UFMIP/MIP, reverse mortgage, and conventional product distinctions."
      ],
      practice: [
        "Build a 4 C's worksheet for a hypothetical borrower.",
        "Explain why a personal credit card is not an acceptable reserve asset.",
        "Compare conventional PMI, FHA MIP, HELOCs, ARMs, and reverse mortgages in a table."
      ],
      mastery: [
        "You can explain credit, capacity, cash, and collateral without notes.",
        "You can identify product-specific exam traps.",
        "You can read a URLA fact pattern and spot underwriting concerns."
      ],
      links: [
        ["Professional handbook", "library/PRINT_THIS_professional_handbook.pdf"],
        ["Full compliance master manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
      ],
      questions: [
        ["What are the 4 C's commonly used in underwriting?", ["Credit, capacity, cash, collateral.", "Closing, commission, credit, county.", "Collateral, counseling, churning, cash-out.", "Capacity, compliance, condo, compensation."], 0],
        ["What does capacity measure?", ["The borrower's ability to repay based on income, employment, debts, and DTI.", "Only property value.", "Only title vesting.", "Only credit score."], 0],
        ["What does collateral focus on?", ["The property securing the loan and its value/condition/marketability.", "The borrower's aliases.", "The MLO's compensation.", "The servicing transfer letter."], 0],
        ["Why are personal credit cards not acceptable reserves?", ["They are borrowed debt capacity, not the borrower's available liquid asset reserves.", "They are always title defects.", "They prove occupancy.", "They replace bank statements."], 0],
        ["What is conventional PMI generally tied to?", ["Higher LTV conventional loans, often where down payment is below 20%.", "All reverse mortgages only.", "Only HELOC draw periods.", "Only title policies."], 0],
        ["What does FHA UFMIP currently commonly refer to in study material?", ["Upfront mortgage insurance premium, often tested as 1.75% of base loan amount.", "A title insurance fee.", "A credit report fee.", "A state license renewal fee."], 0],
        ["What is a HELOC?", ["A revolving home-equity line with draw and repayment features.", "A fixed closed-end first mortgage only.", "A reverse mortgage counseling certificate.", "An appraisal form."], 0],
        ["Why can reverse mortgages create negative amortization?", ["Accruing interest and charges may increase the loan balance over time.", "Payments always reduce principal monthly.", "They require no interest.", "They are unsecured loans."], 0],
        ["What does URLA/1003 collect?", ["Borrower, property, income, asset, liability, declaration, and monitoring information.", "Only title commitment exceptions.", "Only final CD fees.", "Only servicing transfer data."], 0],
        ["Which answer best describes an ARM?", ["A mortgage whose rate can adjust based on index, margin, adjustment periods, and caps.", "A loan with no rate terms.", "A title insurance policy.", "A fixed-rate loan that can never change."], 0]
      ]
    },
    {
      id: "chapter-4",
      chapter: "Chapter 4",
      title: "Mortgage Math, Loan Estimate, APR, TIP, Escrow, and Payment Analysis",
      objective: "Become accurate with the equations and disclosure interpretation that appear on exams and in real borrower conversations.",
      reading: [
        "Read the Math and Timing Cheat Sheet.",
        "Read Master Math/Timing Manual formula sections.",
        "Open the Loan Estimate style examples and practice identifying projected payments, APR, TIP, lender fees, title fees, prepaid interest, and escrow setup."
      ],
      practice: [
        "Calculate PITI with MI and escrow.",
        "Calculate discount points and break-even.",
        "Calculate LTV, CLTV, HCLTV, UFMIP, prepaid interest, and escrow cushion examples."
      ],
      mastery: [
        "You can show your math step by step.",
        "You can explain APR vs note rate vs TIP.",
        "You can read the Loan Estimate as both exam material and borrower communication."
      ],
      links: [
        ["Math and timing cheat sheet", "library/PRINT_THIS_math_timing_cheat_sheet.pdf"],
        ["Master math/timing manual", "library/PRINT_THIS_master_math_timing_manual.pdf"]
      ],
      questions: [
        ["If P&I is $761.78, MI is $82, and escrow is $206, what is total payment?", ["$1,049.78", "$967.78", "$843.78", "$1,206.00"], 0],
        ["What is 1 discount point?", ["1% of the loan amount.", "1% of the purchase price only.", "$100 flat.", "The APR."], 0],
        ["Two points on a $150,000 loan equals what?", ["$3,000", "$300", "$1,500", "$30,000"], 0],
        ["What does LTV compare?", ["Loan amount to property value or purchase price as applicable.", "Income to debts.", "Escrow to taxes.", "APR to TIP."], 0],
        ["What does APR represent?", ["Broader cost of credit expressed as an annual rate, including certain finance charges.", "Only the note rate.", "Only property taxes.", "Only the title policy premium."], 0],
        ["What does TIP show on the Loan Estimate?", ["Total interest percentage over the life of the loan.", "Title insurance premium only.", "Temporary interest protection.", "Total inspection percentage."], 0],
        ["What is prepaid interest?", ["Interest paid at closing for the period before the first regular payment cycle begins.", "Interest forgiven by the lender.", "Only mortgage insurance.", "Only escrow cushion."], 0],
        ["Why does escrow matter for affordability?", ["Taxes and insurance can materially change the monthly payment.", "Escrow eliminates principal.", "Escrow replaces underwriting.", "Escrow determines credit score."], 0],
        ["What is DTI used to evaluate?", ["Debt burden relative to qualifying income.", "Property chain of title.", "Appraisal grid adjustments only.", "Servicing transfer timing."], 0],
        ["Best exam strategy for math questions?", ["Write the formula, plug in numbers, solve one step at a time, then check units.", "Guess quickly.", "Ignore decimals.", "Use purchase price for every calculation."], 0]
      ]
    },
    {
      id: "chapter-5",
      chapter: "Chapter 5",
      title: "Processing, Appraisal, Title, Insurance, Closing, and Foreclosure",
      objective: "Understand how the file gets completed: processing conditions, appraisal review, title clearance, CD/closing, rescission, servicing, and foreclosure concepts.",
      reading: [
        "Read Chapter 5 manual if available and Full Manual V2 closing/title/servicing sections.",
        "Study appraisal approaches, title insurance, liens, vesting, rescission, CD redisclosure, and servicing transfer letters.",
        "Review goodbye/hello letter timing, title defects, wire fraud risk, and judicial vs non-judicial foreclosure."
      ],
      practice: [
        "Write a processor condition list for income, assets, credit, appraisal, and title.",
        "Explain what a title company does after underwriting approval.",
        "Create a CD redisclosure and rescission timing timeline."
      ],
      mastery: [
        "You can explain title's role in closing.",
        "You can spot title, appraisal, and closing risks.",
        "You can explain why approval, clear title, signing, funding, and recording are distinct steps."
      ],
      links: [
        ["Full compliance master manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"],
        ["Professional handbook", "library/PRINT_THIS_professional_handbook.pdf"]
      ],
      questions: [
        ["What does the title company primarily verify?", ["Clear ownership, liens, title defects, settlement documents, and closing coordination.", "Borrower's credit score only.", "MLO license sponsorship.", "APR calculation only."], 0],
        ["What does lender's title insurance protect?", ["The lender's lien interest up to the loan amount.", "The MLO's commission.", "The borrower's income.", "The appraiser's license."], 0],
        ["What is an owner’s title policy?", ["Optional owner protection against covered title defects.", "Required mortgage insurance.", "The credit report.", "The note rate lock."], 0],
        ["What is an appraisal used for?", ["Opinion of value and collateral analysis.", "Final loan approval guarantee.", "Borrower identity only.", "Telephone consent."], 0],
        ["What is a condition in underwriting/processing?", ["A requirement that must be satisfied before approval, closing, or funding.", "A guaranteed denial.", "A title policy premium.", "A social media ad."], 0],
        ["What does rescission generally allow on certain refinance transactions?", ["A right to cancel within the required rescission period.", "A right to skip all disclosures.", "A right to avoid appraisal forever.", "A right to ignore title defects."], 0],
        ["What can trigger Closing Disclosure redisclosure/waiting concerns?", ["Certain APR changes, product changes, or adding a prepayment penalty.", "Changing the borrower's phone number only.", "Printing the CD twice.", "Ordering title insurance."], 0],
        ["What are goodbye and hello letters tied to?", ["Mortgage servicing transfers.", "Loan officer compensation.", "Appraisal approach selection.", "ECOA protected classes."], 0],
        ["What is lien priority?", ["The order in which liens may be paid or enforced against a property.", "The order of quiz questions.", "The order of MLO commission splits.", "The order of credit score factors."], 0],
        ["Why does wire fraud matter at closing?", ["Settlement funds are high-value targets and must be verified through secure procedures.", "It only affects credit cards.", "It replaces title insurance.", "It eliminates borrower signatures."], 0]
      ]
    },
    {
      id: "chapter-6",
      chapter: "Chapter 6",
      title: "Ethics, Fraud, Fair Lending, Advertising, LO Comp, UDAAP, ATR/QM, and Professional Conduct",
      objective: "Operate like a licensed professional: protect borrowers, protect your license, avoid fraud, detect red flags, and understand regulator/examiner thinking.",
      reading: [
        "Read Advanced Compliance Master Manual ethics, fraud, fair lending, UDAAP, LO comp, predatory lending, ATR/QM, MARS, TCPA, and advertising sections.",
        "Review Full Manual V2 recent SAFE exam nuances and operational examples.",
        "Study the miss log and retest every weak area until the rule is automatic."
      ],
      practice: [
        "Write your personal ethics standard as an MLO.",
        "Create a red-flag matrix for straw buyer, air loan, occupancy fraud, altered bank statements, fake VOE, and churning.",
        "Write compliant borrower explanations for discount points, ARM risk, PMI, reverse mortgage obligations, and HELOC repayment risk."
      ],
      mastery: [
        "You can distinguish morals from ethics.",
        "You can explain fair lending risk and UDAAP risk in real conduct terms.",
        "You can identify fraud red flags and explain when to escalate."
      ],
      links: [
        ["Advanced compliance master manual", "library/PRINT_THIS_advanced_compliance_safe_exam_master_manual.pdf"],
        ["Full compliance master manual V2", "library/PRINT_THIS_full_mortgage_compliance_safe_exam_master_manual_v2.pdf"]
      ],
      questions: [
        ["Best distinction between morals and ethics?", ["Morals are internal beliefs; ethics are actions/conduct based on those beliefs.", "Ethics are loan fees; morals are title fees.", "They are unrelated to MLO conduct.", "Morals are federal laws only."], 0],
        ["What is UDAAP concerned with?", ["Unfair, deceptive, or abusive acts or practices.", "Only appraisal forms.", "Only title vesting.", "Only property taxes."], 0],
        ["What is fair lending risk?", ["Treating applicants differently, discouraging, steering, or creating discriminatory outcomes based on protected characteristics.", "Charging any interest rate.", "Ordering an appraisal.", "Using a checklist."], 0],
        ["What is churning/loan flipping?", ["Excessive refinancing mainly to generate fees without borrower benefit.", "A normal first-time purchase.", "A title search.", "A servicing transfer notice."], 0],
        ["What is an air loan?", ["Fraud involving nonexistent borrower, property, or transaction elements.", "A loan with high LTV only.", "A HELOC draw.", "An ARM disclosure."], 0],
        ["Why are fake VOEs and altered paystubs serious?", ["They attack income verification and can create fraud/repurchase/legal risk.", "They reduce title premiums.", "They fix credit scores.", "They make PMI optional."], 0],
        ["What does anti-steering logic require?", ["Borrowers should not be pushed into worse terms for originator compensation or improper benefit.", "MLOs should pick the highest commission loan every time.", "Borrowers cannot compare options.", "Only title companies choose loan products."], 0],
        ["What are ATR factors designed to support?", ["A reasonable, good-faith ability-to-repay determination.", "A guaranteed profit.", "No documentation loans.", "Skipping adverse action."], 0],
        ["What is a common advertising compliance risk?", ["Misleading payment/rate claims, missing context, or false government affiliation.", "Using plain English.", "Listing an NMLS number.", "Providing required disclosures."], 0],
        ["What is the professional response to a suspected fraud red flag?", ["Escalate through company procedure without tipping off the borrower.", "Ignore it if the loan may close.", "Tell the borrower how to hide it.", "Delete documents."], 0]
      ]
    }
  ];

  const strategyModules = [
    {
      id: "most-missed-safe-review",
      title: "Most Missed SAFE MLO Review",
      focus: "Federal law, TRID, ethics, and uniform state content review inspired by the Birdsy most-missed topic.",
      tactic: "Most missed questions are usually not pure memorization. They test whether you can identify the law, the triggering fact, the prohibited conduct, and the safest compliance action under exam pressure.",
      scenario: "A question combines an MLO conduct issue with a disclosure timeline or state-law licensing fact. The trap is choosing the familiar term instead of the rule that actually controls the fact pattern.",
      traps: [
        "Picking RESPA when the fact pattern is really TILA/TRID.",
        "Treating ethics as opinion instead of licensed conduct.",
        "Missing that SAFE/uniform state content questions often test authority, sponsorship, records, and prohibited acts.",
        "Confusing borrower-friendly explanation with legal advice.",
        "Ignoring the word except, best, first, or most likely in the question stem."
      ],
      drill: [
        "Underline the tested law or conduct area.",
        "Circle the triggering fact.",
        "Eliminate answers that sound familiar but do not fit the fact pattern.",
        "Choose the safest compliant action, not the fastest closing action."
      ],
      questions: [
        ["A borrower asks why the final cash to close differs from the early estimate. Which answer best reflects compliant MLO conduct?", ["Review the Loan Estimate and Closing Disclosure differences using documented fee/timing facts.", "Tell the borrower fees always change and move on.", "Blame the title company without reviewing.", "Promise the lender will waive all changes."], 0],
        ["A question mentions a required early disclosure after application. Which framework should you consider first?", ["TRID/Loan Estimate timing.", "Only state advertising rules.", "Only servicing transfer letters.", "Only reverse mortgage counseling."], 0],
        ["An MLO changes borrower facts to make the file qualify. What is the core issue?", ["Fraud and unethical licensed conduct.", "Normal processing discretion.", "A title-only issue.", "A harmless formatting issue."], 0],
        ["Uniform state content often tests which area?", ["License authority, prohibited acts, sponsorship, recordkeeping, and regulator powers.", "Only APR math.", "Only title vesting.", "Only appraiser adjustments."], 0],
        ["If a question asks for the best first step after discovering a compliance concern, choose the answer that does what?", ["Stops, documents, escalates, or corrects according to policy before proceeding.", "Rushes closing.", "Deletes the file note.", "Coaches the borrower to change facts."], 0],
        ["A misleading advertisement suggests government affiliation that does not exist. What is the likely risk?", ["UDAAP/advertising compliance and potential state prohibited conduct.", "Only a harmless design choice.", "Only appraisal independence.", "Only escrow analysis."], 0],
        ["Which answer is safest when a question combines fair lending and sales pressure?", ["Avoid discouragement or steering and provide consistent, documented options.", "Use different explanations based on neighborhood.", "Push the product with highest compensation.", "Tell the borrower not to apply without reviewing facts."], 0],
        ["A borrower complains that they were not told about payment shock on an ARM. What should the exam point you toward?", ["ARM disclosure/suitability and ethical communication risk.", "Only title insurance.", "Only HMDA reporting.", "Only credit score calculation."], 0],
        ["Which phrase signals an exam trap?", ["Except, best, first, or most likely.", "Borrower.", "Application.", "Loan."], 0],
        ["Most missed SAFE questions should be approached how?", ["Read the fact pattern twice, identify the controlling rule, eliminate distractors, then choose the most compliant action.", "Pick the longest answer automatically.", "Ignore dates and actors.", "Answer from personal opinion."], 0]
      ]
    },
    {
      id: "timing-strategy",
      title: "Timing Rule Strategy",
      focus: "Disclosure timing, waiting periods, rescission, servicing transfers, and adverse action.",
      tactic: "When a question gives dates, identify the event first, then the rule, then count. Do not start counting before you know whether the rule uses business days, calendar days, or a specific notice window.",
      scenario: "A borrower receives a Closing Disclosure and then the APR changes beyond tolerance. The exam is testing whether you know this is not just a fee-change question; it can become a redisclosure and waiting-period question.",
      traps: [
        "Confusing Loan Estimate timing with Closing Disclosure timing.",
        "Treating every change as a new three-day waiting period.",
        "Forgetting rescission is not the same as the CD waiting period.",
        "Missing servicing transfer goodbye/hello letter timing."
      ],
      drill: [
        "Name the event.",
        "Name the law or disclosure.",
        "Name the clock.",
        "Name what delays or does not delay closing."
      ],
      questions: [
        ["A CD has been delivered, then the loan product changes. What is the safest exam answer?", ["A corrected CD and new waiting period may be required.", "Ignore it if the payment is lower.", "Only the title company decides.", "No borrower disclosure is needed."], 0],
        ["What is the first step in any timing question?", ["Identify the triggering event.", "Add three days automatically.", "Assume calendar days.", "Assume the file is denied."], 0],
        ["Which is a common CD restart trigger?", ["Loan product change.", "Borrower changes phone number.", "Processor reorders the file.", "Title company sends wiring instructions."], 0],
        ["What does rescission generally relate to?", ["Certain refinance transactions secured by a principal dwelling.", "Every home purchase.", "Only rent payments.", "Only appraisal disputes."], 0],
        ["Servicing transfer questions usually test what?", ["Goodbye/hello notices and payment protection during transfer.", "Discount point break-even.", "HMDA demographic collection only.", "Appraiser independence only."], 0]
      ]
    },
    {
      id: "math-strategy",
      title: "Mortgage Math Strategy",
      focus: "LTV, CLTV, DTI, discount points, UFMIP, prepaid interest, and payment composition.",
      tactic: "Write the formula before touching numbers. Most missed math questions come from using the wrong base number, not from arithmetic.",
      scenario: "A borrower asks why the quoted payment is higher than the principal and interest. The exam is checking whether you include mortgage insurance, taxes, insurance, HOA when applicable, and escrow assumptions.",
      traps: [
        "Using purchase price when the question requires appraised value or lesser of price/value.",
        "Forgetting 1 point equals 1 percent of loan amount.",
        "Mixing APR, note rate, and TIP.",
        "Leaving MI or escrow out of total payment."
      ],
      drill: [
        "Write formula.",
        "Circle the base number.",
        "Solve slowly.",
        "Check if the answer should be dollars, percent, or months."
      ],
      questions: [
        ["One discount point on a $280,000 loan equals what?", ["$2,800", "$280", "$28,000", "$1,400"], 0],
        ["If monthly P&I is $1,900, taxes/insurance escrow is $550, and MI is $125, total payment is what?", ["$2,575", "$2,450", "$2,025", "$1,900"], 0],
        ["What is the main danger in LTV questions?", ["Using the wrong value base.", "Reading too slowly.", "Knowing the loan amount.", "Using percentages."], 0],
        ["A borrower pays points to lower rate. What should the MLO help analyze?", ["Break-even period and expected time in the loan.", "Only the MLO commission.", "Only the seller concession.", "Only the title policy."], 0],
        ["What does DTI compare?", ["Monthly debt obligations to qualifying income.", "Loan amount to value.", "APR to TIP.", "Assets to title fees."], 0]
      ]
    },
    {
      id: "fair-lending-strategy",
      title: "Fair Lending Strategy",
      focus: "ECOA, FHA, HMDA, discouragement, steering, redlining, reverse redlining, and comparative treatment.",
      tactic: "On fair lending questions, ask: who was treated differently, what protected class or protected activity is involved, and whether the conduct discouraged, steered, priced, or denied access.",
      scenario: "Two similarly qualified borrowers receive different explanations, different pricing discretion, or different levels of assistance. The exam wants you to spot unequal treatment even when nobody says an explicitly biased statement.",
      traps: [
        "Thinking discrimination requires bad intent every time.",
        "Ignoring discouragement before application.",
        "Missing steering when the borrower technically still received a loan.",
        "Forgetting HMDA is used for pattern analysis."
      ],
      drill: [
        "Identify protected class or protected activity.",
        "Identify conduct.",
        "Identify harm.",
        "Identify proper compliant alternative."
      ],
      questions: [
        ["An MLO tells a borrower from a protected class not to apply because approval is unlikely without reviewing facts. What risk is most direct?", ["Discouragement/fair lending risk.", "Title curative risk.", "Escrow surplus risk.", "Servicing transfer risk."], 0],
        ["What does redlining involve?", ["Limiting credit access in certain areas, often tied to protected-class patterns.", "Charging all borrowers the same fee.", "Ordering an appraisal.", "Explaining APR."], 0],
        ["What is reverse redlining?", ["Targeting protected communities for worse or predatory terms.", "Denying all applications equally.", "Using no marketing.", "Only collecting HMDA data."], 0],
        ["Why does HMDA matter to examiners?", ["It helps identify lending patterns and possible discrimination.", "It replaces underwriting.", "It calculates prepaid interest.", "It cancels rescission."], 0],
        ["Best compliant response when a borrower asks if they should apply?", ["Explain criteria and invite an application without discouragement.", "Say no based on neighborhood.", "Refuse to discuss options.", "Quote only the highest-cost product."], 0]
      ]
    },
    {
      id: "fraud-strategy",
      title: "Fraud Red Flag Strategy",
      focus: "Occupancy fraud, straw buyers, air loans, fake VOE, altered documents, undisclosed debt, gift manipulation, and escalation.",
      tactic: "Fraud questions usually turn on one inconsistency. Compare the application story to documents, bank activity, employment, occupancy intent, and transaction relationships.",
      scenario: "A borrower says they will occupy the property, but paystubs, bank activity, mailing address, and property distance do not support the story. The correct professional move is escalation, not coaching the borrower.",
      traps: [
        "Trying to fix the borrower's story.",
        "Ignoring document alterations because income looks strong.",
        "Missing fraud for profit when multiple parties coordinate.",
        "Tipping off the borrower after a suspicious activity escalation."
      ],
      drill: [
        "Find the inconsistency.",
        "Identify the document or fact source.",
        "Decide whether it is explainable, conditionable, or escalatable.",
        "Document neutrally."
      ],
      questions: [
        ["What is the right response to suspected altered paystubs?", ["Escalate through company procedure and document neutrally.", "Tell the borrower how to revise them.", "Ignore it if DTI works.", "Delete the documents."], 0],
        ["An air loan usually involves what?", ["Nonexistent borrower, property, or transaction elements.", "A standard FHA loan.", "A legitimate HELOC draw.", "Only a high rate."], 0],
        ["Occupancy fraud is most tied to what false statement?", ["Borrower intent to live in the property.", "APR calculation.", "Title insurance premium.", "Flood zone fee."], 0],
        ["Why are large unexplained deposits reviewed?", ["They may indicate undisclosed debt, borrowed funds, or unsourced assets.", "They always reduce DTI.", "They prove title is clear.", "They eliminate need for reserves."], 0],
        ["What should an MLO avoid during fraud escalation?", ["Tipping off the borrower.", "Following company procedure.", "Preserving documents.", "Asking compliance for guidance."], 0]
      ]
    },
    {
      id: "underwriting-strategy",
      title: "Underwriting Mindset Strategy",
      focus: "Credit, capacity, cash, collateral, compensating factors, reserves, conditions, and file strength.",
      tactic: "Think like the underwriter: can the file prove willingness, ability, funds, and property security? If not, what condition would resolve it?",
      scenario: "A borrower has enough income but weak reserves and inconsistent bank deposits. The exam is checking whether you understand that approval is not just income; the whole risk picture matters.",
      traps: [
        "Treating approval as based on credit score alone.",
        "Calling credit cards reserves.",
        "Ignoring collateral issues after income approval.",
        "Not distinguishing a condition from a denial."
      ],
      drill: [
        "Map the issue to one of the 4 C's.",
        "Identify the document needed.",
        "Explain the underwriter concern.",
        "Write the borrower-friendly request."
      ],
      questions: [
        ["Which item is not an acceptable reserve asset?", ["Available credit on a personal credit card.", "Verified checking balance.", "Vested retirement funds subject to guideline treatment.", "Cash value of eligible life insurance if allowed and documented."], 0],
        ["Collateral risk is mainly about what?", ["Property value, condition, lien position, and marketability.", "Borrower password strength.", "LO commission split.", "Phone call timing."], 0],
        ["A condition is best described as what?", ["A requirement needed to support approval, closing, or funding.", "Always a denial.", "A title company marketing item.", "A borrower complaint."], 0],
        ["Capacity focuses on what?", ["Ability to repay from income and debt obligations.", "Only title ownership.", "Only property taxes.", "Only appraisal photos."], 0],
        ["A strong MLO handoff to processing should include what?", ["Clear missing items, context, urgency, and borrower communication status.", "Only the borrower's first name.", "No documentation notes.", "A guarantee of approval."], 0]
      ]
    },
    {
      id: "product-strategy",
      title: "Product and Suitability Strategy",
      focus: "ARMs, HELOCs, PMI, FHA MIP, discount points, reverse mortgages, HOEPA, and anti-steering.",
      tactic: "Product questions are usually suitability questions. Ask what risk the borrower is accepting, whether the MLO explained it, and whether the product choice benefits the borrower.",
      scenario: "A borrower wants a lower payment today through an ARM or points. The correct analysis is not just lower payment; it includes payment shock, break-even, time horizon, and alternatives.",
      traps: [
        "Assuming ARMs are the most common product.",
        "Forgetting reverse mortgage occupancy/tax/insurance duties.",
        "Describing HELOCs as lump-sum closed-end loans.",
        "Pushing points without break-even analysis."
      ],
      drill: [
        "Identify product.",
        "Identify borrower benefit.",
        "Identify borrower risk.",
        "Explain alternative options."
      ],
      questions: [
        ["What should be explained with an ARM?", ["Index, margin, caps, adjustment timing, and payment shock risk.", "Only title fees.", "Only fixed payment forever.", "Only seller concessions."], 0],
        ["What is a defining HELOC feature?", ["Revolving line with draw and repayment periods.", "Always a lump-sum fixed closed-end loan.", "No lien on property.", "No underwriting."], 0],
        ["Reverse mortgage borrowers must generally keep doing what?", ["Occupy the home and stay current on taxes, insurance, and maintenance duties.", "Make no property-related payments ever.", "Rent the property immediately.", "Ignore counseling."], 0],
        ["Discount points should be evaluated with what?", ["Break-even and expected time in the loan.", "Only the property address.", "Only the title vesting.", "Only HMDA data."], 0],
        ["Anti-steering concerns arise when what happens?", ["A borrower is pushed into worse terms or a product for improper compensation or benefit.", "A borrower receives options.", "The MLO explains risks.", "The borrower compares rates."], 0]
      ]
    }
  ];

  const passBridgePlan = [
    {
      id: "score-gap-diagnosis",
      title: "Score Gap Diagnosis",
      focus: "Convert a 70% into a 75%+ by removing avoidable misses.",
      lesson: "A 70% means the foundation is real. The retake work is not starting over; it is finding the five to eight questions that were lost to timing confusion, law mix-ups, ethics wording, and second-guessing.",
      actions: [
        "Write the last exam score at the top of your study page: 70%.",
        "Set the target as 82% in practice, not 75%, so test-day pressure has room.",
        "Sort every miss into one bucket: law, TRID/timing, ethics/conduct, state/licensing, math/forms, products, or underwriting.",
        "Retest weak buckets until each one is 80% or better."
      ],
      questions: [
        ["If your score is 70% and passing is 75%, what is the smartest retake goal in practice?", ["Score 80%+ consistently before retesting.", "Study everything randomly with no tracking.", "Stop practicing because 70 is close.", "Only reread notes without testing."], 0],
        ["What is the main purpose of a miss log?", ["Turn wrong answers into categorized remediation targets.", "Make the app look busy.", "Replace all reading.", "Avoid retesting."], 0],
        ["Which category should a missed question about who can perform licensed activity go into?", ["State/licensing or SAFE authority.", "Escrow math.", "Title insurance only.", "Appraisal methods."], 0],
        ["What practice score gives better margin before a 75% required exam?", ["82% or higher.", "70%.", "50%.", "Any single passing quiz."], 0],
        ["What is the fastest way to improve from 70 to 75?", ["Target repeated weak buckets with short retests and explanations.", "Memorize only acronyms.", "Skip law questions.", "Avoid reviewing mistakes."], 0]
      ]
    },
    {
      id: "federal-law-most-missed",
      title: "Federal Law Most-Missed Rules",
      focus: "TILA, RESPA, ECOA, FCRA, GLBA, HMDA, UDAAP, HOEPA, and TCPA separation.",
      lesson: "Most federal-law misses happen because two laws sound relevant. The exam rewards identifying the controlling fact: credit decision, disclosure, privacy, settlement/service, data reporting, marketing call, high-cost trigger, or deceptive conduct.",
      actions: [
        "For every law question, name the controlling fact before answering.",
        "If the fact is credit decision or adverse action, think ECOA/FCRA.",
        "If the fact is loan costs, APR, LE, CD, or payment disclosure, think TILA/TRID.",
        "If the fact is settlement services, escrow, servicing transfer, or kickbacks, think RESPA.",
        "If the fact is privacy/security/pretexting, think GLBA."
      ],
      questions: [
        ["A borrower is denied and must receive a notice explaining the decision. Which area is most directly implicated?", ["ECOA/adverse action, with FCRA if credit report information was used.", "Only RESPA servicing transfer.", "Only title insurance.", "Only TCPA."], 0],
        ["A question focuses on privacy notices, safeguarding borrower data, and pretexting. Which law controls?", ["GLBA.", "HMDA.", "HOEPA.", "SAFE only."], 0],
        ["A question focuses on kickbacks for settlement service referrals. Which law is most direct?", ["RESPA Section 8.", "FCRA.", "TCPA.", "HMDA."], 0],
        ["A misleading payment advertisement that omits key costs is most likely what risk?", ["UDAAP/deceptive practice risk.", "Only a harmless sales style.", "Only title priority.", "Only appraisal independence."], 0],
        ["A high-cost loan trigger question should point you toward what topic?", ["HOEPA/Section 32 high-cost rules.", "Only ordinary PMI.", "Only HELOC reuse.", "Only state sponsorship."], 0]
      ]
    },
    {
      id: "trid-timing-rebuild",
      title: "TRID and Timing Rebuild",
      focus: "Loan Estimate, Closing Disclosure, changed circumstances, redisclosure, and rescission.",
      lesson: "TRID questions are process questions. The exam gives an event, and your job is to know what disclosure changes, whether timing restarts, and what the MLO must not promise.",
      actions: [
        "Separate LE timing from CD timing.",
        "Memorize that not every change restarts the CD waiting period.",
        "Flag APR tolerance, product change, and prepayment penalty changes as major CD issues.",
        "Separate CD waiting from right of rescission.",
        "Practice explaining LE versus CD in borrower language."
      ],
      questions: [
        ["Which change is a classic CD waiting-period restart issue?", ["Loan product change.", "Borrower updates email address.", "Processor renames a PDF.", "Borrower asks a question."], 0],
        ["What is the Loan Estimate primarily for?", ["Early disclosure of key terms, projected payments, and estimated costs.", "Final signed closing terms only.", "Servicing transfer only.", "Credit score dispute only."], 0],
        ["What is the Closing Disclosure primarily for?", ["Final loan terms and closing costs before consummation.", "Initial marketing.", "Appraisal ordering.", "HMDA demographic collection only."], 0],
        ["Which statement is safest about changed fees?", ["Determine whether tolerance/changed circumstance/redisclosure rules apply.", "All fee changes are illegal.", "No fee changes require disclosure.", "Only the borrower decides the legal timing."], 0],
        ["Right of rescission is best separated from what?", ["The CD waiting period.", "Loan officer compensation.", "Credit report scoring.", "HMDA filing."], 0]
      ]
    },
    {
      id: "ethics-state-conduct",
      title: "Ethics and Uniform State Conduct",
      focus: "Licensed conduct, prohibited acts, sponsorship, records, state authority, and ethical decision-making.",
      lesson: "Ethics/state questions often read like common sense, but the exam wants licensed conduct. Choose the answer that preserves honesty, disclosures, records, supervision, consumer protection, and regulator authority.",
      actions: [
        "When in doubt, choose documentation, disclosure, correction, or escalation.",
        "Do not choose answers that hide, coach, backdate, alter, guarantee, or pressure.",
        "Separate being helpful from giving legal/tax advice outside your role.",
        "Remember that state regulators can investigate, discipline, suspend, revoke, and require records.",
        "Treat advertising and social media as licensed conduct."
      ],
      questions: [
        ["An MLO discovers an application fact is wrong after submission. What is the safest response?", ["Correct/document/escalate according to policy.", "Ignore it if approval is likely.", "Tell the borrower to hide it.", "Backdate the file."], 0],
        ["Which action is a licensing red flag?", ["Originating while not properly licensed or sponsored where required.", "Keeping records as required.", "Explaining disclosures.", "Escalating suspected fraud."], 0],
        ["What is the best answer when ethics and commission conflict?", ["Protect borrower, law, license, and file integrity over commission pressure.", "Close no matter what.", "Let the borrower decide if a law applies.", "Alter documents if the result helps."], 0],
        ["A social media post advertising mortgage terms must be treated as what?", ["Licensed advertising subject to compliance requirements.", "Private speech with no rules.", "A title document.", "A servicing transfer."], 0],
        ["Uniform state content may test regulator authority to do what?", ["Examine records and discipline licensees.", "Set property tax rates.", "Issue title insurance.", "Guarantee borrower approval."], 0]
      ]
    },
    {
      id: "exam-stem-discipline",
      title: "Exam Stem Discipline",
      focus: "Avoid losing points to wording traps, distractors, and overthinking.",
      lesson: "The missing five points often come from rushing. SAFE questions use words like first, best, except, prohibited, required, may, and must. Your job is to answer the exact question asked.",
      actions: [
        "Read the last sentence first to identify what is being asked.",
        "Underline except, not, first, best, required, prohibited, may, and must.",
        "Eliminate two wrong answers before choosing.",
        "Do not change an answer unless you can name the rule that proves it.",
        "After each 25-question set, explain every miss out loud in one sentence."
      ],
      questions: [
        ["If the stem asks for the first step, the best answer usually should be what?", ["The earliest compliant action before proceeding.", "The final closing action.", "The most profitable action.", "A random familiar term."], 0],
        ["What should you do with an except question?", ["Identify the answer that does not belong under the rule.", "Pick the first true statement.", "Ignore the word except.", "Choose the longest answer."], 0],
        ["When should you change an answer?", ["Only when you can name the rule proving the first choice wrong.", "Whenever nervous.", "Always on review.", "Never read the question again."], 0],
        ["What is the best use of practice tests after scoring 70%?", ["Diagnose patterns and retest weak areas.", "Collect scores without review.", "Avoid explanations.", "Only study easy topics."], 0],
        ["The safest answer in compliance questions usually favors what?", ["Disclosure, documentation, correction, escalation, and consumer protection.", "Speed over accuracy.", "Commission over compliance.", "Unwritten verbal promises."], 0]
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
      assignmentChecks: {},
      chapterQuizScores: [],
      strategyChecks: {},
      strategyScores: [],
      passBridgeChecks: {},
      passBridgeScores: [],
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
      assignmentChecks: savedState.assignmentChecks || {},
      chapterQuizScores: savedState.chapterQuizScores || [],
      strategyChecks: savedState.strategyChecks || {},
      strategyScores: savedState.strategyScores || [],
      passBridgeChecks: savedState.passBridgeChecks || {},
      passBridgeScores: savedState.passBridgeScores || [],
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
    renderAssignments();
    renderStrategyCoach();
    setupStrategyCoach();
    renderPassBridge();
    setupPassBridge();
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
    const lowChapterTests = (state.chapterQuizScores || [])
      .filter((test) => test.score < 80)
      .slice(0, 5);
    const lowStrategyTests = (state.strategyScores || [])
      .filter((test) => test.score < 80)
      .slice(0, 5);
    const lowBridgeTests = (state.passBridgeScores || [])
      .filter((test) => test.score < 82)
      .slice(0, 5);
    const weakHtml = [];
    if (weakList.length) {
      weakHtml.push(`<ul>${weakList.map(([cat, count]) => `<li><strong>${cat}</strong>: ${count} missed</li>`).join("")}</ul>`);
    }
    if (lowSectionTests.length) {
      weakHtml.push(`<h4>Retest Targets</h4><ul>${lowSectionTests.map((test) => `<li><strong>Day ${test.day} - ${test.category}</strong>: ${test.score}% on ${test.section}</li>`).join("")}</ul>`);
    }
    if (lowChapterTests.length) {
      weakHtml.push(`<h4>Chapter Quiz Targets</h4><ul>${lowChapterTests.map((test) => `<li><strong>${test.chapter}</strong>: ${test.score}% on ${test.title}</li>`).join("")}</ul>`);
    }
    if (lowStrategyTests.length) {
      weakHtml.push(`<h4>Strategy Retest Targets</h4><ul>${lowStrategyTests.map((test) => `<li><strong>${test.title}</strong>: ${test.score}%</li>`).join("")}</ul>`);
    }
    if (lowBridgeTests.length) {
      weakHtml.push(`<h4>70→75 Bridge Targets</h4><ul>${lowBridgeTests.map((test) => `<li><strong>${test.title}</strong>: ${test.score}% - retest target is 82%+</li>`).join("")}</ul>`);
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

  function renderAssignments() {
    const list = document.getElementById("assignmentList");
    if (!list) return;
    list.innerHTML = chapterAssignments.map((assignment) => renderAssignmentCard(assignment)).join("");
    document.querySelectorAll("[data-assignment-check]").forEach((box) => {
      box.addEventListener("change", () => {
        state.assignmentChecks = state.assignmentChecks || {};
        state.assignmentChecks[box.dataset.assignmentCheck] = box.checked;
        saveState();
        renderAssignments();
      });
    });
    document.querySelectorAll("[data-chapter-quiz]").forEach((button) => {
      button.addEventListener("click", () => startChapterQuiz(button.dataset.chapterQuiz));
    });
    list.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.jump));
    });
  }

  function renderAssignmentCard(assignment) {
    const progress = getAssignmentProgress(assignment);
    const latestScore = (state.chapterQuizScores || []).find((score) => score.id === assignment.id);
    return `
      <article class="day-card assignment-card">
        <div>
          <p class="eyebrow">${assignment.chapter}</p>
          <h3>${assignment.title}</h3>
          <p>${assignment.objective}</p>
          ${renderProgressBar(progress.completed, progress.total, "Assignment")}
          ${latestScore ? `<p><strong>Latest chapter quiz:</strong> ${latestScore.score}% (${latestScore.correct}/${latestScore.total}) - ${getGrade(latestScore.score)}</p>` : ""}
        </div>
        <div class="assignment-grid">
          ${renderAssignmentBlock(assignment, "reading", "Reading Assignment", "read")}
          ${renderAssignmentBlock(assignment, "practice", "Practice Work", "practice")}
          ${renderAssignmentBlock(assignment, "mastery", "Mastery Standard", "mastery")}
        </div>
        <div class="resource-links">
          ${assignment.links.map(([label, href]) => `<a href="${href}" target="_blank">${label}</a>`).join("")}
        </div>
        <div class="assignment-actions">
          <button class="primary-button small" data-chapter-quiz="${assignment.id}">Take ${assignment.questions.length}-question chapter quiz</button>
          <button class="secondary-button small" data-jump="misslog">Review miss log</button>
        </div>
      </article>
    `;
  }

  function renderAssignmentBlock(assignment, key, title, prefix) {
    return `
      <div class="assignment-block">
        <h4>${title}</h4>
        <div class="checklist">
          ${assignment[key].map((item, index) => {
            const checkKey = `${assignment.id}-${prefix}-${index}`;
            const checked = state.assignmentChecks?.[checkKey] ? "checked" : "";
            return `<label class="checkline"><input type="checkbox" data-assignment-check="${checkKey}" ${checked}> <span>${item}</span></label>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function getAssignmentProgress(assignment) {
    const groups = [
      ["reading", "read"],
      ["practice", "practice"],
      ["mastery", "mastery"]
    ];
    let total = 0;
    let completed = 0;
    groups.forEach(([key, prefix]) => {
      assignment[key].forEach((_, index) => {
        total += 1;
        if (state.assignmentChecks?.[`${assignment.id}-${prefix}-${index}`]) completed += 1;
      });
    });
    return { completed, total };
  }

  function getTotalAssignmentProgress() {
    let total = 0;
    let completed = 0;
    chapterAssignments.forEach((assignment) => {
      const progress = getAssignmentProgress(assignment);
      total += progress.total;
      completed += progress.completed;
    });
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function startChapterQuiz(chapterId) {
    const assignment = chapterAssignments.find((item) => item.id === chapterId);
    if (!assignment) return;
    const questions = assignment.questions.map(([front, options, answerIndex]) => ({
      card: { front, back: options[answerIndex], category: assignment.title, id: `${assignment.id}-${front}` },
      options: shuffle(options),
      answered: false,
      correct: false
    }));
    quiz = {
      questions,
      index: 0,
      correct: 0,
      assignmentQuiz: {
        id: assignment.id,
        chapter: assignment.chapter,
        title: assignment.title
      }
    };
    showView("quiz");
    renderQuizQuestion();
  }

  function setupStrategyCoach() {
    const mixedButton = document.getElementById("startStrategyMixed");
    if (mixedButton) mixedButton.addEventListener("click", () => startStrategyQuiz("mixed"));
  }

  function renderStrategyCoach() {
    const list = document.getElementById("strategyCoachList");
    if (!list) return;
    list.innerHTML = strategyModules.map((module) => renderStrategyCard(module)).join("");
    list.querySelectorAll("[data-strategy-check]").forEach((box) => {
      box.addEventListener("change", () => {
        state.strategyChecks = state.strategyChecks || {};
        state.strategyChecks[box.dataset.strategyCheck] = box.checked;
        saveState();
        renderStrategyCoach();
      });
    });
    list.querySelectorAll("[data-strategy-quiz]").forEach((button) => {
      button.addEventListener("click", () => startStrategyQuiz(button.dataset.strategyQuiz));
    });
  }

  function renderStrategyCard(module) {
    const progress = getStrategyProgress(module);
    const latestScore = (state.strategyScores || []).find((score) => score.id === module.id);
    return `
      <article class="day-card strategy-card">
        <div>
          <p class="eyebrow">${module.focus}</p>
          <h3>${module.title}</h3>
          <p>${module.tactic}</p>
          ${renderProgressBar(progress.completed, progress.total, "Strategy")}
          ${latestScore ? `<p><strong>Latest strategy score:</strong> ${latestScore.score}% (${latestScore.correct}/${latestScore.total}) - ${getGrade(latestScore.score)}</p>` : ""}
        </div>
        <div class="strategy-grid">
          <div class="strategy-panel">
            <h4>Scenario Lesson</h4>
            <p>${module.scenario}</p>
            <div class="checklist">
              ${module.drill.map((item, index) => {
                const key = `${module.id}-drill-${index}`;
                const checked = state.strategyChecks?.[key] ? "checked" : "";
                return `<label class="checkline"><input type="checkbox" data-strategy-check="${key}" ${checked}> <span>${item}</span></label>`;
              }).join("")}
            </div>
          </div>
          <div class="strategy-panel">
            <h4>Exam Traps</h4>
            <ul>${module.traps.map((trap) => `<li>${trap}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="strategy-actions">
          <button class="primary-button small" data-strategy-quiz="${module.id}">Take ${module.questions.length}-question strategy quiz</button>
          <button class="secondary-button small" data-strategy-quiz="mixed">Mixed strategy test</button>
        </div>
      </article>
    `;
  }

  function getStrategyProgress(module) {
    let completed = 0;
    module.drill.forEach((_, index) => {
      if (state.strategyChecks?.[`${module.id}-drill-${index}`]) completed += 1;
    });
    return { completed, total: module.drill.length };
  }

  function getTotalStrategyProgress() {
    let total = 0;
    let completed = 0;
    strategyModules.forEach((module) => {
      const progress = getStrategyProgress(module);
      total += progress.total;
      completed += progress.completed;
    });
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function startStrategyQuiz(moduleId) {
    const sourceModules = moduleId === "mixed"
      ? strategyModules
      : strategyModules.filter((module) => module.id === moduleId);
    if (!sourceModules.length) return;
    const rawQuestions = sourceModules.flatMap((module) =>
      module.questions.map(([front, options, answerIndex]) => ({
        module,
        front,
        options,
        answerIndex
      }))
    );
    const targetCount = moduleId === "mixed" ? Math.min(25, rawQuestions.length) : rawQuestions.length;
    const questions = shuffle(rawQuestions).slice(0, targetCount).map((item) => ({
      card: {
        front: item.front,
        back: item.options[item.answerIndex],
        category: item.module.title,
        id: `${item.module.id}-${item.front}`
      },
      options: shuffle(item.options),
      answered: false,
      correct: false
    }));
    const label = moduleId === "mixed"
      ? { id: "mixed", title: "Mixed Strategy Test", focus: "All strategy modules" }
      : sourceModules[0];
    quiz = {
      questions,
      index: 0,
      correct: 0,
      strategyQuiz: {
        id: label.id,
        title: label.title,
        focus: label.focus
      }
    };
    showView("quiz");
    renderQuizQuestion();
  }

  function setupPassBridge() {
    const bridgeButton = document.getElementById("startPassBridgeTest");
    if (bridgeButton) bridgeButton.addEventListener("click", startPassBridgeTest);
  }

  function renderPassBridge() {
    const list = document.getElementById("passBridgeList");
    if (!list) return;
    const latestScore = (state.passBridgeScores || [])[0];
    list.innerHTML = `
      <article class="day-card strategy-card">
        <div>
          <p class="eyebrow">Current target: 70% → 75%+</p>
          <h3>Retake Readiness Command Center</h3>
          <p>This section is designed for the exact gap you described: you reached 70%, need 75%, and now need disciplined remediation after three weeks of study.</p>
          ${renderProgressBar(getTotalPassBridgeProgress().completed, getTotalPassBridgeProgress().total, "Bridge checklist")}
          ${latestScore ? `<p><strong>Latest bridge test:</strong> ${latestScore.score}% (${latestScore.correct}/${latestScore.total}) - ${getGrade(latestScore.score)}</p>` : ""}
        </div>
      </article>
      ${passBridgePlan.map((module) => renderPassBridgeCard(module)).join("")}
    `;
    list.querySelectorAll("[data-pass-bridge-check]").forEach((box) => {
      box.addEventListener("change", () => {
        state.passBridgeChecks = state.passBridgeChecks || {};
        state.passBridgeChecks[box.dataset.passBridgeCheck] = box.checked;
        saveState();
        renderPassBridge();
      });
    });
    list.querySelectorAll("[data-pass-bridge-module]").forEach((button) => {
      button.addEventListener("click", () => startPassBridgeTest(button.dataset.passBridgeModule));
    });
  }

  function renderPassBridgeCard(module) {
    const progress = getPassBridgeModuleProgress(module);
    const latestScore = (state.passBridgeScores || []).find((score) => score.id === module.id);
    return `
      <article class="day-card strategy-card">
        <div>
          <p class="eyebrow">${module.focus}</p>
          <h3>${module.title}</h3>
          <p>${module.lesson}</p>
          ${renderProgressBar(progress.completed, progress.total, "Bridge module")}
          ${latestScore ? `<p><strong>Latest module test:</strong> ${latestScore.score}% (${latestScore.correct}/${latestScore.total}) - ${getGrade(latestScore.score)}</p>` : ""}
        </div>
        <div class="strategy-grid">
          <div class="strategy-panel">
            <h4>Execution Checklist</h4>
            <div class="checklist">
              ${module.actions.map((item, index) => {
                const key = `${module.id}-action-${index}`;
                const checked = state.passBridgeChecks?.[key] ? "checked" : "";
                return `<label class="checkline"><input type="checkbox" data-pass-bridge-check="${key}" ${checked}> <span>${item}</span></label>`;
              }).join("")}
            </div>
          </div>
          <div class="strategy-panel">
            <h4>Why This Moves the Score</h4>
            <p>Each checklist item removes a common avoidable miss: wrong law, wrong clock, wrong conduct standard, or wrong test-taking move.</p>
          </div>
        </div>
        <div class="strategy-actions">
          <button class="primary-button small" data-pass-bridge-module="${module.id}">Take module test</button>
          <button class="secondary-button small" data-pass-bridge-module="mixed">Take mixed bridge test</button>
        </div>
      </article>
    `;
  }

  function getPassBridgeModuleProgress(module) {
    let completed = 0;
    module.actions.forEach((_, index) => {
      if (state.passBridgeChecks?.[`${module.id}-action-${index}`]) completed += 1;
    });
    return { completed, total: module.actions.length };
  }

  function getTotalPassBridgeProgress() {
    let total = 0;
    let completed = 0;
    passBridgePlan.forEach((module) => {
      const progress = getPassBridgeModuleProgress(module);
      total += progress.total;
      completed += progress.completed;
    });
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function startPassBridgeTest(moduleId = "mixed") {
    const sourceModules = moduleId === "mixed"
      ? passBridgePlan
      : passBridgePlan.filter((module) => module.id === moduleId);
    if (!sourceModules.length) return;
    const rawQuestions = sourceModules.flatMap((module) =>
      module.questions.map(([front, options, answerIndex]) => ({
        module,
        front,
        options,
        answerIndex
      }))
    );
    const targetCount = moduleId === "mixed" ? Math.min(25, rawQuestions.length) : rawQuestions.length;
    const questions = shuffle(rawQuestions).slice(0, targetCount).map((item) => ({
      card: {
        front: item.front,
        back: item.options[item.answerIndex],
        category: item.module.title,
        id: `${item.module.id}-${item.front}`
      },
      options: shuffle(item.options),
      answered: false,
      correct: false
    }));
    const label = moduleId === "mixed"
      ? { id: "mixed", title: "Mixed 70→75 Bridge Test", focus: "All pass-bridge modules" }
      : sourceModules[0];
    quiz = {
      questions,
      index: 0,
      correct: 0,
      passBridgeTest: {
        id: label.id,
        title: label.title,
        focus: label.focus
      }
    };
    showView("quiz");
    renderQuizQuestion();
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
    const assignmentScore = getTotalAssignmentProgress().percent;
    const chapterQuizScore = state.chapterQuizScores.length
      ? Math.round(state.chapterQuizScores.reduce((sum, test) => sum + test.score, 0) / state.chapterQuizScores.length)
      : 0;
    const strategyScore = getTotalStrategyProgress().percent;
    const strategyQuizScore = state.strategyScores.length
      ? Math.round(state.strategyScores.reduce((sum, test) => sum + test.score, 0) / state.strategyScores.length)
      : 0;
    const passBridgeScore = getTotalPassBridgeProgress().percent;
    const passBridgeQuizScore = state.passBridgeScores.length
      ? Math.round(state.passBridgeScores.reduce((sum, test) => sum + test.score, 0) / state.passBridgeScores.length)
      : 0;
    const labScore = getLabCompletionPercent();
    const available = [path, assignmentScore, strategyScore, passBridgeScore, cardScore, labScore];
    if (state.quizScores.length) available.push(quizScore);
    if (state.sectionTestScores.length) available.push(sectionScore);
    if (state.chapterQuizScores.length) available.push(chapterQuizScore);
    if (state.strategyScores.length) available.push(strategyQuizScore);
    if (state.passBridgeScores.length) available.push(passBridgeQuizScore);
    const score = Math.round(available.reduce((sum, item) => sum + item, 0) / available.length);
    return { score, grade: getGrade(score), path, assignmentScore, strategyScore, passBridgeScore, cardScore, quizScore, sectionScore, chapterQuizScore, strategyQuizScore, passBridgeQuizScore, labScore };
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
    const chapterQuizAverage = state.chapterQuizScores.length
      ? Math.round(state.chapterQuizScores.reduce((sum, test) => sum + test.score, 0) / state.chapterQuizScores.length)
      : 0;
    const strategyQuizAverage = state.strategyScores.length
      ? Math.round(state.strategyScores.reduce((sum, test) => sum + test.score, 0) / state.strategyScores.length)
      : 0;
    const passBridgeAverage = state.passBridgeScores.length
      ? Math.round(state.passBridgeScores.reduce((sum, test) => sum + test.score, 0) / state.passBridgeScores.length)
      : 0;
    const categories = [
      { name: "Pathway", value: getTotalPathProgress().percent, note: "Day 1-Day 5 checklist completion" },
      { name: "Assignments", value: getTotalAssignmentProgress().percent, note: "Chapter reading and practice completion" },
      { name: "Strategy Coach", value: getTotalStrategyProgress().percent, note: "Scenario strategy drill completion" },
      { name: "70→75 Bridge", value: getTotalPassBridgeProgress().percent, note: "Retake remediation checklist completion" },
      { name: "Flashcards", value: cards.length ? Math.round((Object.values(state.cards).filter((item) => item.status === "known").length / cards.length) * 100) : 0, note: "Known cards out of full deck" },
      { name: "Compliance Lab", value: getLabCompletionPercent(), note: "Applied module completion" },
      { name: "Section Tests", value: sectionAverage, note: `${state.sectionTestScores.length || 0} pathway tests completed` },
      { name: "Chapter Quizzes", value: chapterQuizAverage, note: `${state.chapterQuizScores.length || 0} chapter quizzes completed` },
      { name: "Strategy Quizzes", value: strategyQuizAverage, note: `${state.strategyScores.length || 0} strategy tests completed` },
      { name: "Bridge Tests", value: passBridgeAverage, note: `${state.passBridgeScores.length || 0} pass-bridge tests completed` },
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
      if (quiz.assignmentQuiz) {
        state.chapterQuizScores = state.chapterQuizScores || [];
        state.chapterQuizScores.unshift({
          ...quiz.assignmentQuiz,
          score,
          correct: quiz.correct,
          total: quiz.questions.length,
          takenAt: new Date().toISOString()
        });
        if (score < 80) {
          state.missLog.unshift({
            id: `miss-${Date.now()}`,
            concept: `${quiz.assignmentQuiz.chapter}: ${quiz.assignmentQuiz.title}`,
            why: `Chapter quiz score below target: ${score}%.`,
            rule: "Reread the assignment, complete the practice tasks, review missed questions, and retest until 80% or higher.",
            example: `${quiz.assignmentQuiz.chapter} chapter quiz`,
            createdAt: new Date().toISOString()
          });
        }
      }
      if (quiz.strategyQuiz) {
        state.strategyScores = state.strategyScores || [];
        state.strategyScores.unshift({
          ...quiz.strategyQuiz,
          score,
          correct: quiz.correct,
          total: quiz.questions.length,
          takenAt: new Date().toISOString()
        });
        if (score < 80) {
          state.missLog.unshift({
            id: `miss-${Date.now()}`,
            concept: `Strategy: ${quiz.strategyQuiz.title}`,
            why: `Strategy quiz score below target: ${score}%.`,
            rule: "Review the scenario lesson, memorize the traps, complete the drill checklist, and retest until 80% or higher.",
            example: quiz.strategyQuiz.focus,
            createdAt: new Date().toISOString()
          });
        }
      }
      if (quiz.passBridgeTest) {
        state.passBridgeScores = state.passBridgeScores || [];
        state.passBridgeScores.unshift({
          ...quiz.passBridgeTest,
          score,
          correct: quiz.correct,
          total: quiz.questions.length,
          takenAt: new Date().toISOString()
        });
        if (score < 82) {
          state.missLog.unshift({
            id: `miss-${Date.now()}`,
            concept: `70→75 Bridge: ${quiz.passBridgeTest.title}`,
            why: `Bridge score below retake-readiness target: ${score}%.`,
            rule: "Review the matching bridge module, explain each miss out loud, then retest until 82% or higher.",
            example: quiz.passBridgeTest.focus,
            createdAt: new Date().toISOString()
          });
        }
      }
      saveState();
      const source = quiz.sectionTest
        ? `<p><strong>Section:</strong> Day ${quiz.sectionTest.day} - ${quiz.sectionTest.category}: ${quiz.sectionTest.section}</p>`
        : quiz.assignmentQuiz
          ? `<p><strong>Chapter:</strong> ${quiz.assignmentQuiz.chapter} - ${quiz.assignmentQuiz.title}</p>`
          : quiz.strategyQuiz
            ? `<p><strong>Strategy:</strong> ${quiz.strategyQuiz.title}</p>`
            : quiz.passBridgeTest
              ? `<p><strong>70→75 Bridge:</strong> ${quiz.passBridgeTest.title}</p>`
          : "";
      const title = quiz.sectionTest ? "Section test complete" : quiz.assignmentQuiz ? "Chapter quiz complete" : quiz.strategyQuiz ? "Strategy quiz complete" : quiz.passBridgeTest ? "Bridge test complete" : "Quiz complete";
      area.innerHTML = `<article class="quiz-card"><h3>${title}</h3>${source}<p>Score: <strong>${score}%</strong> (${quiz.correct}/${quiz.questions.length})</p><p>Grade: <strong>${getGrade(score)}</strong></p><button class="primary-button" id="restartQuiz">Run another quiz</button></article>`;
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
      renderAssignments();
      renderStrategyCoach();
      renderPassBridge();
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

