export interface ApprovalChainComment {
  author: string
  date: string
  comment: string
  approved?: boolean
}

export interface ApprovalChainStream {
  key: string
  label: string
  reviewerTitle: string
  unitHeadTitle: string
  reviewerComment: ApprovalChainComment
  unitHeadComment: ApprovalChainComment
}

export const approvalChainStreams: ApprovalChainStream[] = [
  {
    key: 'icsg',
    label: 'ICSG',
    reviewerTitle: 'ICSG Reviewer',
    unitHeadTitle: 'ICSG Unit Head',
    reviewerComment: {
      author: 'ICSG Reviewer',
      date: 'Feb 20, 2026',
      comment:
        'Vendor meets all required standards for approval. All documentation is complete and satisfactory. Risk profile is medium with adequate controls in place across all assessment areas.',
    },
    unitHeadComment: {
      author: 'ICSG Unit Head',
      date: 'Feb 22, 2026',
      comment:
        'Assessment reviewed and validated. All risk parameters meet acceptable thresholds. The vendor demonstrates adequate compliance posture. Approved for escalation to Group Head level.',
      approved: true,
    },
  },
  {
    key: 'operationalRisk',
    label: 'Operational Risk',
    reviewerTitle: 'ORM Reviewer',
    unitHeadTitle: 'Operational Risk Unit Head',
    reviewerComment: {
      author: 'ORM Reviewer',
      date: 'Feb 20, 2026',
      comment:
        'Operational risk assessment completed. Business continuity plans are well-documented and tested regularly. Disaster recovery capabilities meet Bank requirements. Technical infrastructure is robust with appropriate redundancy measures in place.',
    },
    unitHeadComment: {
      author: 'Operational Risk Unit Head',
      date: 'Feb 22, 2026',
      comment:
        'Operational risk assessment is satisfactory. Business continuity plans are adequate. Disaster recovery procedures meet minimum requirements. Approved for next level review.',
      approved: true,
    },
  },
  {
    key: 'compliance',
    label: 'Compliance',
    reviewerTitle: 'Compliance Reviewer',
    unitHeadTitle: 'Compliance Unit Head',
    reviewerComment: {
      author: 'Compliance Reviewer',
      date: 'Feb 20, 2026',
      comment:
        'Compliance review finalized. All regulatory certifications are current and valid. Data privacy policies align with Bank standards and industry best practices. KYC/AML controls are adequately implemented. Vendor demonstrates strong regulatory compliance posture.',
    },
    unitHeadComment: {
      author: 'Compliance Unit Head',
      date: 'Feb 22, 2026',
      comment: 'Compliance review completed. All regulatory requirements are adequately addressed. Data privacy controls are acceptable. Approved for Group Head review.',
      approved: true,
    },
  },
]

export const groupHeadApprovals: Record<'icsg' | 'orm' | 'compliance', ApprovalChainComment> = {
  icsg: {
    author: 'Group Head, ICSG',
    date: 'Feb 24, 2026',
    comment:
      'Reviewed the full assessment across ICSG, Operational Risk, and Compliance streams. All risk parameters are within acceptable thresholds. Approved for escalation to the Operational Risk Group Head.',
    approved: true,
  },
  orm: {
    author: 'Group Head, ORM',
    date: 'Feb 25, 2026',
    comment:
      'Operational risk posture is satisfactory and consistent with the ORM reviewer\'s assessment. No additional concerns identified. Approved for escalation to the Compliance Group Head.',
    approved: true,
  },
  compliance: {
    author: 'Group Head, Compliance',
    date: 'Feb 26, 2026',
    comment:
      'Compliance posture confirmed across all streams. Regulatory and data privacy requirements are adequately met. Approved for final review by the Integrated Reviewer.',
    approved: true,
  },
}
