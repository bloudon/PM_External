export const groups = [
  { t: 'Manage the Work', d: 'Track projects and their permits, jurisdiction information, statuses and inspections from one place.', more: 'Each project carries its permits, their statuses and the jurisdiction involved, and inspections are scheduled and followed up against them. The dashboard surfaces what needs action so status does not depend on asking around.', items: ['Projects and permits', 'Jurisdiction information', 'Inspection scheduling and follow-up', 'Status at a glance'], mock: 'dashboard' },
  { t: 'Organize Documents', d: 'Keep applications, approvals and supporting files attached to the project and permit they belong to.', more: 'Applications, approvals and supporting files are attached to the permit they belong to, so the team looks in one place instead of across inboxes and shared drives.', items: ['Documents tied to permits', 'Consistent organization', 'Everything findable by the team'], mock: null },
  { t: 'Coordinate People', d: 'Assign responsibilities, see who owns the next step, and keep team follow-up visible.', more: 'Each permit can be assigned to a team member, so the person responsible for the next step is visible. Expediting firms can also keep contractor requests tied to the work they affect.', items: ['Assignments and owners', 'Team follow-up', 'Contractor requests for expediting firms'], mock: null },
  { t: 'Track Fees and Reporting', d: 'Record permit fees and expenses, and report on the work. Expediting firms can bill clients from the same record.', more: 'Record permit fees and expenses against the work, apply contractor-specific pricing, and carry reimbursable expenses through to invoicing. Supported QuickBooks Online exports are available; ask us in a demo to confirm what fits your accounting setup.', items: ['Permit fees and expenses', 'Contractor-specific pricing', 'Reimbursable expenses and invoicing', 'Supported QuickBooks Online exports'], mock: null },
] as const;

export const steps = [
  { t: 'Create the project', d: 'Start with the job, its location and its jurisdiction.' },
  { t: 'Add permits', d: 'Record each permit the project needs and follow its status.' },
  { t: 'Attach documents', d: 'File applications, approvals and supporting records with the permit.' },
  { t: 'Assign responsibility', d: 'Give every next step an owner on your team.' },
  { t: 'Follow inspections', d: 'Keep inspections scheduled and follow up on what remains.' },
  { t: 'Report', d: 'Review the work across projects, permits, fees and the team.' },
];
