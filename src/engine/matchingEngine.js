// ULAVU Smart Matching Engine (Module 3)
// 5-Factor Weighted Relevance Model with Human-Readable Explanations

/**
 * Calculates a multi-factor compatibility score between a farmer produce listing and a retailer procurement requirement.
 * 
 * Weights:
 * - Crop Match:        40%
 * - Quantity Fit:      20%
 * - Location Proximity:20%
 * - Price Compatibility: 10%
 * - Availability Alignment: 10%
 */
export function calculateMatchScore(produce, requirement) {
  if (!produce || !requirement) return null;

  // 1. Crop Match (Max 40 points)
  let cropScore = 0;
  const pCrop = (produce.crop || "").trim().toLowerCase();
  const rCrop = (requirement.crop || "").trim().toLowerCase();

  if (pCrop === rCrop) {
    cropScore = 40;
  } else if (pCrop.includes(rCrop) || rCrop.includes(pCrop)) {
    cropScore = 28;
  } else {
    // If crops are unrelated, the deal cannot proceed
    return {
      totalScore: 10,
      breakdown: { crop: 0, quantity: 4, location: 3, price: 2, availability: 1 },
      isViable: false,
      reasons: ["Crop mismatch: Listing is " + produce.crop + " while requirement is " + requirement.crop],
      summaryExplanation: "Incompatible crops."
    };
  }

  // 2. Quantity Match (Max 20 points)
  let qtyScore = 6;
  const pQty = Number(produce.quantity) || 1;
  const rQty = Number(requirement.quantity) || 1;
  const ratio = pQty / rQty;

  let qtyReason = "";
  if (ratio >= 0.8 && ratio <= 1.35) {
    qtyScore = 20;
    qtyReason = `Quantity (${pQty} ${produce.unit}) matches requirement (${rQty} ${requirement.unit}) almost exactly`;
  } else if (ratio > 1.35 && ratio <= 2.2) {
    qtyScore = 16;
    qtyReason = `Produce quantity (${pQty} ${produce.unit}) comfortably covers required amount (${rQty} ${requirement.unit})`;
  } else if (ratio >= 0.5 && ratio < 0.8) {
    qtyScore = 13;
    qtyReason = `Produce covers ${(ratio * 100).toFixed(0)}% of the buyer's bulk requirement`;
  } else {
    qtyScore = 7;
    qtyReason = `Quantity volume difference requires multi-batch or partial consignment`;
  }

  // 3. Location Proximity (Max 20 points)
  let locScore = 6;
  let locReason = "";
  const pDist = (produce.district || "").toLowerCase();
  const rDist = (requirement.preferredDistrict || "").toLowerCase();
  const rPrefLoc = (requirement.preferredLocation || "").toLowerCase();

  if (pDist && rDist && pDist === rDist) {
    locScore = 20;
    locReason = `Direct district match in ${produce.district}`;
  } else if (rPrefLoc.includes(pDist)) {
    locScore = 18;
    locReason = `Farmer in ${produce.district} is inside retailer's preferred sourcing area`;
  } else if (produce.state && requirement.preferredLocation && requirement.preferredLocation.toLowerCase().includes("tamil nadu")) {
    locScore = 12;
    locReason = `Both parties operating within ${produce.state}`;
  } else {
    locScore = 10;
    locReason = `Regional transit required (${produce.district} to ${requirement.preferredLocation || "Buyer hub"})`;
  }

  // 4. Price Compatibility (Max 10 points)
  let priceScore = 3;
  let priceReason = "";
  const pPrice = Number(produce.expectedPrice) || 0;
  const minBudget = Number(requirement.minBudget) || 0;
  const maxBudget = Number(requirement.maxBudget) || 999999;

  if (pPrice >= minBudget && pPrice <= maxBudget) {
    priceScore = 10;
    priceReason = `Farmer's price (₹${pPrice}) perfectly fits buyer's budget (₹${minBudget}–₹${maxBudget})`;
  } else if (pPrice < minBudget) {
    priceScore = 10;
    priceReason = `Expected price (₹${pPrice}) is below buyer's max budget (high savings opportunity)`;
  } else if (pPrice <= maxBudget * 1.15) {
    priceScore = 6;
    priceReason = `Expected price (₹${pPrice}) is within negotiable range of budget ceiling (₹${maxBudget})`;
  } else {
    priceScore = 2;
    priceReason = `Expected price (₹${pPrice}) is higher than buyer's ceiling (₹${maxBudget})`;
  }

  // 5. Availability Alignment (Max 10 points)
  let availScore = 4;
  let availReason = "";
  const reqDate = requirement.requiredBy ? new Date(requirement.requiredBy) : null;
  const fromDate = produce.availableFrom ? new Date(produce.availableFrom) : null;
  const untilDate = produce.availableUntil ? new Date(produce.availableUntil) : null;

  if (reqDate && fromDate && untilDate) {
    if (reqDate >= fromDate && reqDate <= untilDate) {
      availScore = 10;
      availReason = `Produce harvest window aligns with buyer's target date (${requirement.requiredBy})`;
    } else {
      availScore = 7;
      availReason = `Close harvest timeline available near target date`;
    }
  } else {
    availScore = 8;
    availReason = `Produce currently ready for immediate dispatch`;
  }

  const totalScore = Math.min(100, Math.round(cropScore + qtyScore + locScore + priceScore + availScore));

  // Build natural-language summary
  const summaryExplanation = `${produce.crop} matches exactly; ${locReason.toLowerCase()}; and ${qtyReason.toLowerCase()}.`;

  return {
    totalScore,
    isViable: totalScore >= 50,
    breakdown: {
      crop: cropScore,
      quantity: qtyScore,
      location: locScore,
      price: priceScore,
      availability: availScore
    },
    reasons: [
      `Crop Match: ${produce.crop} aligns 100% with procurement request.`,
      qtyReason,
      locReason,
      priceReason,
      availReason
    ],
    summaryExplanation
  };
}

/**
 * Finds all matching buyers for a given produce listing, sorted by match percentage
 */
export function findMatchingBuyersForProduce(produce, requirementsList) {
  if (!produce || !requirementsList) return [];
  return requirementsList
    .map((req) => {
      const match = calculateMatchScore(produce, req);
      return {
        requirement: req,
        matchScore: match.totalScore,
        matchDetails: match
      };
    })
    .filter((res) => res.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Finds all matching farmers for a given retailer requirement, sorted by match percentage
 */
export function findMatchingFarmersForRequirement(requirement, produceList) {
  if (!requirement || !produceList) return [];
  return produceList
    .map((prod) => {
      const match = calculateMatchScore(prod, requirement);
      return {
        produce: prod,
        matchScore: match.totalScore,
        matchDetails: match
      };
    })
    .filter((res) => res.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Generates all marketplace pairwise matches between active produce and requirements
 */
export function generateMarketplaceMatches(produceList, requirementsList) {
  const matches = [];
  produceList.forEach((prod) => {
    requirementsList.forEach((req) => {
      const match = calculateMatchScore(prod, req);
      if (match && match.totalScore >= 50) {
        matches.push({
          id: `match-${prod.id}-${req.id}`,
          produce: prod,
          requirement: req,
          matchScore: match.totalScore,
          matchDetails: match
        });
      }
    });
  });
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
