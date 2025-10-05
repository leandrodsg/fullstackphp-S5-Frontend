/**
 * Utility functions for billing cycle calculations
 */

/**
 * Calculate billing cycle based on start date and next billing date
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} nextBillingDate - Next billing date in YYYY-MM-DD format
 * @returns {string} - 'monthly', 'annual', or 'unknown'
 */
export const calculateBillingCycleFromDates = (startDate, nextBillingDate) => {
  
  if (!startDate || !nextBillingDate) {
    return 'monthly';
  }

  const start = new Date(startDate);
  const next = new Date(nextBillingDate);
  
  if (isNaN(start.getTime()) || isNaN(next.getTime())) {
    return 'monthly';
  }

  // Calcular diferença em dias
  const diffTime = Math.abs(next - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Determinar o ciclo baseado na diferença de dias
  if (diffDays >= 360 && diffDays <= 370) {
    return 'annual';
  } else if (diffDays >= 175 && diffDays <= 185) {
    return 'semi-annual';
  } else if (diffDays >= 85 && diffDays <= 95) {
    return 'quarterly';
  } else if (diffDays >= 28 && diffDays <= 32) {
    return 'monthly';
  } else {
    return 'monthly';
  }
};

/**
 * Get billing cycle display text
 * @param {string} billingCycle - The billing cycle value
 * @returns {string} - Formatted display text
 */
export const getBillingCycleDisplayText = (billingCycle) => {
  if (!billingCycle) return 'Monthly';
  
  const cycleMap = {
    'monthly': 'Monthly',
    'quarterly': 'Quarterly', 
    'semi-annual': 'Semi-Annual',
    'annual': 'Annual',
    'yearly': 'Annual'
  };
  
  return cycleMap[billingCycle.toLowerCase()] || billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1);
};

/**
 * Ensure subscription has a valid billing cycle
 * @param {Object} subscription - Subscription object
 * @returns {Object} - Subscription with guaranteed billing_cycle field
 */
export const ensureBillingCycle = (subscription) => {
  if (!subscription) return subscription;
  
  // If billing_cycle is already present and valid, return as is
  if (subscription.billing_cycle && subscription.billing_cycle.trim() !== '') {
    return subscription;
  }
  
  // Calculate billing cycle from dates
  const calculatedCycle = calculateBillingCycleFromDates(
    subscription.created_at || subscription.start_date, 
    subscription.next_billing_date
  );
  
  return {
    ...subscription,
    billing_cycle: calculatedCycle
  };
};

/**
 * Process array of subscriptions to ensure all have billing cycles
 * @param {Array} subscriptions - Array of subscription objects
 * @returns {Array} - Array of subscriptions with guaranteed billing_cycle fields
 */
export const processSubscriptionsWithBillingCycle = (subscriptions) => {
  if (!Array.isArray(subscriptions)) return subscriptions;
  
  return subscriptions.map(subscription => ensureBillingCycle(subscription));
};