export const groups = [
  { t: 'Manage the Work', d: 'Track projects and their permits, jurisdiction information, statuses and inspections from one place.', items: ['Projects and permits', 'Jurisdiction information', 'Inspection scheduling and follow-up', 'Status at a glance'], mock: 'dashboard' },
  { t: 'Organize Documents', d: 'Keep applications, approvals and supporting files attached to the project and permit they belong to.', items: ['Documents tied to permits', 'Consistent organization', 'Everything findable by the team'], mock: 'documents' },
  { t: 'Coordinate People', d: 'Assign responsibilities, see who owns the next step, and keep team follow-up visible.', items: ['Assignments and owners', 'Team follow-up', 'Contractor requests for expediting firms'], mock: 'assign' },
  { t: 'Track Fees and Reporting', d: 'Record permit fees and expenses, and report on the work. Expediting firms can bill clients from the same record.', items: ['Permit fees and expenses', 'Contractor-specific pricing', 'Reimbursable expenses and invoicing', 'Supported QuickBooks Online exports'], mock: 'fees' },
] as const;

export const steps = [
  { t: 'Create the project', d: 'Start with the job, its location and its jurisdiction.' },
  { t: 'Add permits', d: 'Record each permit the project needs and follow its status.' },
  { t: 'Attach documents', d: 'File applications, approvals and supporting records with the permit.' },
  { t: 'Assign responsibility', d: 'Give every next step an owner on your team.' },
  { t: 'Follow inspections', d: 'Keep inspections scheduled and follow up on what remains.' },
  { t: 'Report', d: 'Review the work across projects, permits, fees and the team.' },
];
