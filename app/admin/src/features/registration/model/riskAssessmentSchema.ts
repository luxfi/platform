import * as yup from "yup";

export const RiskAssessmentSchema = yup.object({
  sanction: yup.string(),
  rating: yup.string(),
  apply: yup.string(),
  aml: yup.string(),
  sanctionedJurisdiction: yup.string(),
  highRiskJurisdiction: yup.string(),
  thirdParty: yup.string(),
  understood: yup.string(),
  materialConnection: yup.string(),
  sensitiveActivity: yup.string(),
  volume: yup.string(),
  transactions: yup.string(),
  knowledge: yup.string(),
  pep: yup.string(),
  adverseInformation: yup.string(),
  riskRating: yup.string(),
  completedBy: yup.string(),
  completionDate: yup.date() || undefined,
  director: yup.string() || undefined,
  approvalDate: yup.date(),
  createdAt: yup.date() || undefined,
  updatedAt: yup.date() || undefined,
  notes: yup.string(),

  // for business account
  clientName: yup.string(),
  known: yup.string(),
  yearsKnown: yup.string(),
  metFace: yup.string(),
  numberOfBeneficialOwners: yup.string(),
  applicantForBusiness: yup.string(),
  classifyAsPep: yup.string(),
  automaticallyHigh: yup.string(),
  sanctionedCorporate: yup.string(),
  highRiskCorporate: yup.string(),
  highestRisk: yup.string(),
  publicOrWholly: yup.string(),
  bearer: yup.string(),
  ownershipInfo: yup.string(),
  clientEntityApply: yup.string(),
  considerWhere: yup.string(),
  principalAreaSanction: yup.string(),
  principalAreaRisk: yup.string(),
  principalAreaApply: yup.string(),
  businessPurpose: yup.string(),
  businessPurposeOptions: yup.string(),
  highRiskActivity: yup.string(),
  activityRegulated: yup.string(),
  valueOfEntity: yup.string(),
});
export type RiskAssessmentDto = yup.TypeOf<typeof RiskAssessmentSchema>;
